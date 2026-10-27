import { NextRequest, NextResponse } from 'next/server'
import { getCrm, normalizarTelefono, registrarActividad } from '@/lib/crm'
import { ENCUESTA, PREGUNTAS, PREGUNTA_ABIERTA } from '@/data/clase-encuesta'

/**
 * Las respuestas de la encuesta previa a la clase.
 *
 * ── Qué NO hace, y es a propósito ──────────────────────────────────────────
 * **No crea contactos.** La encuesta se le manda a quien ya se registró; si
 * alguien responde con un correo que no está en el CRM, la respuesta se guarda
 * igual pero sin `contacto_id`. Dar de alta a alguien por contestar una
 * encuesta lo metería a la lista de la clase sin que se haya inscrito, y eso
 * ensucia el conteo y la cadena de correos.
 *
 * **No manda correo de confirmación.** La pantalla ya confirma. Un correo más
 * a dos días de la clase compite con los que sí importan.
 *
 * ── Una respuesta por persona ──────────────────────────────────────────────
 * `upsert` sobre (encuesta, email): si alguien vuelve a contestar se reemplaza
 * su respuesta. Así nadie multiplica sus chances del sorteo repitiendo el
 * formulario, y quien se arrepiente de lo que escribió puede corregirlo.
 */

const TABLA = 'cta_encuesta_respuestas'

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
  const email = leer(cuerpo.correo).toLowerCase()
  const prefijo = leer(cuerpo.prefijo) || '+506'
  const telefonoCrudo = leer(cuerpo.whatsapp)
  const pregunta = leer(cuerpo.pregunta)
  const quiereSorteo = cuerpo.quiereSorteo === true
  const utm = leer(cuerpo.utm).slice(0, 400)

  if (nombre.length < 2 || nombre.length > 100) {
    return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
  }
  if (pregunta.length < PREGUNTA_ABIERTA.minimo) {
    return NextResponse.json(
      { ok: false, error: 'Escribí tu pregunta, aunque sea una línea.' },
      { status: 422 }
    )
  }

  /*
    Las cuatro de opción única se validan CONTRA LA LISTA, no solo «que venga
    algo». El cuerpo de la petición es entrada de afuera: sin esto, cualquiera
    podría guardar texto arbitrario en campos que después se van a contar y
    graficar, y el conteo saldría con categorías que no existen.
  */
  const opciones: Record<string, string> = {}
  for (const p of PREGUNTAS) {
    const valor = leer(cuerpo[p.id])
    if (!(p.opciones as readonly string[]).includes(valor)) {
      return NextResponse.json(
        { ok: false, error: `Falta contestar la pregunta ${p.numero}.` },
        { status: 422 }
      )
    }
    opciones[p.id] = valor
  }

  const telefono = normalizarTelefono(
    telefonoCrudo.startsWith('+') ? telefonoCrudo : `${prefijo}${telefonoCrudo}`
  )

  try {
    const crm = getCrm()

    // A quién corresponde. Primero por correo, que es lo que la persona acaba
    // de escribir; si no calza, por teléfono. Si no aparece, se guarda igual.
    let contactoId: string | null = null
    const { data: porCorreo } = await crm
      .from('cta_contactos')
      .select('id')
      .eq('email', email)
      .maybeSingle()
    contactoId = porCorreo?.id ?? null

    if (!contactoId && telefono) {
      const { data: porTel } = await crm
        .from('cta_contactos')
        .select('id')
        .eq('telefono_whatsapp', telefono)
        .maybeSingle()
      contactoId = porTel?.id ?? null
    }

    const { error } = await crm.from(TABLA).upsert(
      {
        encuesta: ENCUESTA.slug,
        contacto_id: contactoId,
        nombre,
        email,
        telefono,
        perfil: opciones.perfil,
        motivo: opciones.motivo,
        etapa: opciones.etapa,
        despues: opciones.despues,
        pregunta: pregunta.slice(0, 2000),
        quiere_sorteo: quiereSorteo,
        acepto_bases: quiereSorteo,
        origen: 'landing-encuesta',
        utm: utm || null,
        actualizado_el: new Date().toISOString(),
      },
      { onConflict: 'encuesta,email' }
    )

    if (error) {
      console.error('[encuesta] no se pudo guardar:', error.message)
      return NextResponse.json(
        { ok: false, error: 'No se pudo guardar tu respuesta. Intentá de nuevo.' },
        { status: 500 }
      )
    }

    /*
      La pregunta queda también en la bitácora del contacto.

      No es duplicar por duplicar: en la tabla sirve para contar y para el
      sorteo; en la ficha es lo que Tony ve cuando abre a esa persona antes de
      una llamada. Si falla, la respuesta ya está guardada y no se pierde.
    */
    if (contactoId) {
      try {
        await registrarActividad(
          contactoId,
          'nota',
          `Encuesta previa a la clase. Pregunta: «${pregunta.slice(0, 500)}»` +
            ` · Perfil: ${opciones.perfil} · Etapa: ${opciones.etapa}` +
            ` · Después: ${opciones.despues}`
        )
      } catch (e) {
        console.error('[encuesta] no se pudo anotar en la ficha:', e)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[encuesta] falló:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo guardar tu respuesta. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
