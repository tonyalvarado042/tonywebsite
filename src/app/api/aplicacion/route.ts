import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { altaContacto, getCrm, normalizarTelefono } from '@/lib/crm'
import { correoSirve, normalizarCorreo, LARGO_MAXIMO_CORREO } from '@/lib/correo-valido'
import { REMITENTE_CON_NOMBRE, destinosDeAviso } from '@/lib/correo'
import { APLICACION, PREGUNTAS, PREGUNTA_ABIERTA } from '@/data/aplicacion'

/**
 * Las aplicaciones a la copropiedad de HUMAYA.
 *
 * ── Qué SÍ hace, al revés que la encuesta ──────────────────────────────────
 * **Crea el contacto.** La encuesta previa a la clase a propósito no lo hacía:
 * se le mandaba a gente que ya estaba inscrita, y dar de alta a alguien por
 * contestarla habría ensuciado el conteo. Acá es al revés — quien llena esto
 * es exactamente la persona que Tony quiere en el CRM, aunque nunca hubiera
 * entrado por otro lado.
 *
 * ── Qué NO hace, y es a propósito ──────────────────────────────────────────
 * **No aprueba a nadie ni le escribe al que aplica.** La aplicación entra como
 * `nueva` y ahí se queda hasta que una persona la mire. Regla de la casa: nada
 * sale solo. El correo de felicitación lo dispara Tony desde el CRM.
 *
 * El único correo que sale de acá es **el aviso a Tony** de que entró una.
 *
 * ── Si el aviso falla, la aplicación NO se pierde ──────────────────────────
 * El orden importa: primero se guarda, después se avisa. Si Resend está caído,
 * la persona ya quedó registrada y se ve en el CRM igual. Al revés, un fallo
 * de correo se llevaría un lead que costó una clase entera conseguir.
 */

const TABLA = 'cta_aplicaciones'
const ETIQUETA = `aplicacion:${APLICACION.slug}`

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function POST(req: NextRequest) {
  let cuerpo: Record<string, unknown>
  try {
    cuerpo = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Petición inválida.' }, { status: 400 })
  }

  // Honeypot — éxito silencioso, sin escribir nada.
  if (leer(cuerpo.website)) return NextResponse.json({ ok: true, filtrado: true })

  const nombre = leer(cuerpo.nombre)
  const apellidos = leer(cuerpo.apellidos)
  const email = normalizarCorreo(cuerpo.correo)
  const prefijo = leer(cuerpo.prefijo) || '+506'
  const telefonoCrudo = leer(cuerpo.whatsapp)
  const pais = leer(cuerpo.pais)
  const queNecesita = leer(cuerpo.que_necesita)
  const utm = leer(cuerpo.utm).slice(0, 400)

  if (nombre.length < 2 || nombre.length > 100) {
    return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
  }
  if (email.length > LARGO_MAXIMO_CORREO || !correoSirve(email)) {
    return NextResponse.json(
      { ok: false, error: 'Ese correo no se ve bien. Revisá que no tenga espacios y que no termine en punto.' },
      { status: 422 }
    )
  }
  if (queNecesita.length < PREGUNTA_ABIERTA.minimo) {
    return NextResponse.json(
      { ok: false, error: 'Contanos qué necesitarías saber, aunque sea una línea.' },
      { status: 422 }
    )
  }

  /*
    Las de opción única se validan CONTRA LA LISTA. El cuerpo de la petición es
    entrada de afuera: sin esto, cualquiera podría guardar texto arbitrario en
    campos que después se van a contar y a usar para decidir a quién llamar.
  */
  const respuestas: Record<string, string> = {}
  for (const p of PREGUNTAS) {
    const valor = leer(cuerpo[p.id])
    if (!(p.opciones as readonly string[]).includes(valor)) {
      return NextResponse.json(
        { ok: false, error: `Falta contestar la pregunta ${p.numero}.` },
        { status: 422 }
      )
    }
    respuestas[p.id] = valor
  }

  const telefono = normalizarTelefono(
    telefonoCrudo.startsWith('+') ? telefonoCrudo : `${prefijo}${telefonoCrudo}`
  )

  let contactoId: string | null = null
  try {
    const crm = getCrm()

    // 1 · El contacto. Si falla, se sigue igual: la aplicación vale más que
    //     el enganche, y un lead sin ficha se arregla a mano en un minuto.
    try {
      /*
        `altaContacto` guarda el nombre en UN campo (`nombre_completo`) y
        **registra la nota por dentro**. Por eso acá se le pasa el nombre ya
        armado y todo el detalle junto: una segunda llamada a
        `registrarActividad` dejaría dos notas iguales en la ficha, y la
        bitácora de un lead que se va a llamar por teléfono tiene que leerse
        de corrido.
      */
      const alta = await altaContacto({
        nombre: [nombre, apellidos].filter(Boolean).join(' '),
        correo: email,
        telefono,
        fuente: 'masterclass',
        etiqueta: ETIQUETA,
        detalle:
          `Aplicó a la copropiedad de HUMAYA. Capital: ${respuestas.capital}. ` +
          `Puede avanzar: ${respuestas.cuando_avanza}. Capital de: ${respuestas.origen_capital}. ` +
          `Experiencia: ${respuestas.experiencia}. ` +
          `Qué necesita para decidir: «${queNecesita.slice(0, 500)}»`,
      })
      contactoId = alta?.contactoId ?? null
    } catch (e) {
      console.error('[aplicacion] no se pudo dar de alta el contacto:', e)
    }

    // 2 · La aplicación. Esto es lo que NO se puede perder.
    const { error } = await crm.from(TABLA).upsert(
      {
        contacto_id: contactoId,
        nombre,
        apellidos: apellidos || null,
        email,
        telefono: telefono || null,
        pais: pais || null,
        capital: respuestas.capital,
        cuando_avanza: respuestas.cuando_avanza,
        origen_capital: respuestas.origen_capital,
        experiencia: respuestas.experiencia,
        que_necesita: queNecesita.slice(0, 2000),
        origen: 'landing-aplicar',
        utm: utm || null,
        actualizado_el: new Date().toISOString(),
      },
      { onConflict: 'email,proyecto_id' }
    )

    if (error) {
      console.error('[aplicacion] no se pudo guardar:', error.message)
      return NextResponse.json(
        { ok: false, error: 'No se pudo guardar tu aplicación. Intentá de nuevo.' },
        { status: 500 }
      )
    }

  } catch (e) {
    console.error('[aplicacion] falló:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar tu aplicación. Intentá de nuevo.' },
      { status: 500 }
    )
  }

  // 3 · El aviso a Tony. Ya guardado: si esto falla, no se pierde nada.
  try {
    const llave = process.env.RESEND_API_KEY
    if (llave) {
      const { para } = await destinosDeAviso('masterclass')
      const quien = [nombre, apellidos].filter(Boolean).join(' ')
      await new Resend(llave).emails.send({
        from: REMITENTE_CON_NOMBRE,
        to: para,
        replyTo: email,
        subject: `Aplicación a HUMAYA — ${quien} · ${respuestas.capital}`,
        text:
          `${quien} aplicó a la copropiedad de HUMAYA.\n\n` +
          `Correo: ${email}\n` +
          `WhatsApp: ${telefono || '(no dejó)'}\n` +
          `País: ${pais || '(no dijo)'}\n\n` +
          `Capital: ${respuestas.capital}\n` +
          `Puede avanzar: ${respuestas.cuando_avanza}\n` +
          `El capital sale de: ${respuestas.origen_capital}\n` +
          `Experiencia: ${respuestas.experiencia}\n\n` +
          `Qué necesita para decidir:\n«${queNecesita}»\n\n` +
          `Revisala y aprobala en el CRM:\n` +
          `https://crm-tony-alvarado.vercel.app/aplicaciones\n`,
      })
    }
  } catch (e) {
    console.error('[aplicacion] no se pudo avisar por correo:', e)
  }

  return NextResponse.json({ ok: true })
}
