import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { REMITENTE_CON_NOMBRE } from '@/lib/correo'
import {
  getCrm,
  registrarActividad,
  TABLA_INSCRIPCIONES,
  TABLA_PASOS,
} from '@/lib/crm'
import {
  cronAutorizado,
  cronDeVercelAutorizado,
  enlaceDeBaja,
  esBorrador,
  secuenciasActivas,
} from '@/lib/secuencias'

/**
 * Un "tick" de las automatizaciones.
 *
 * Recorre `cta_inscripciones`, manda el correo que toca, lo anota en la
 * bitácora del contacto y adelanta al siguiente paso.
 *
 * ── Los frenos, en orden ───────────────────────────────────────────────────
 * 1. El interruptor `envios_automaticos` del CRM tiene que estar en 'si'.
 *    Viene apagado y se mueve desde Marketing, no desde Vercel.
 * 2. La automatización tiene que estar `activa = true`. Vienen apagadas.
 * 3. Un paso con [BORRADOR] no sale nunca, aunque se quiten los frenos 1 y 2.
 * 4. Solo se escribe a contactos con `baja = false`.
 *
 * `?dry=1` recorre todo y dice a quién LE TOCARÍA, sin enviar ni tocar la base.
 * Esa es la prueba que Tony pide ver antes de autorizar cualquier envío.
 *
 *   curl -X POST https://.../api/secuencias/tick?dry=1 \
 *     -H "x-cron-secret: cron:<CRM_SECRET>"
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'
const MAX_POR_TICK = 200

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

/** Lo comparte el mando del CRM, en `../panel`. */
export async function correrElTick(req: NextRequest) {
  const prueba = new URL(req.url).searchParams.get('dry') === '1'

  if (!prueba && !(await secuenciasActivas())) {
    return NextResponse.json({
      ok: true,
      enviados: 0,
      nota: 'Los envíos automáticos están apagados en el CRM (Marketing → Envíos automáticos). No se envió nada.',
    })
  }

  const crm = getCrm()
  const hoy = new Date().toISOString().slice(0, 10)

  const { data: pendientes, error } = await crm
    .from(TABLA_INSCRIPCIONES)
    .select(`
      id, contacto_id, automatizacion_id, paso_actual, proximo_envio_el,
      cta_contactos!inner ( id, nombre_completo, email, baja ),
      cta_automatizaciones!inner ( id, nombre, activa )
    `)
    .eq('estado', 'activa')
    .lte('proximo_envio_el', hoy)
    .limit(MAX_POR_TICK)

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  const resultado = {
    ok: true,
    prueba,
    candidatos: pendientes?.length ?? 0,
    enviados: 0,
    detalle: [] as { correo: string; paso: number; automatizacion: string; accion: string }[],
  }

  for (const ins of (pendientes ?? []) as unknown as Array<{
    id: string
    contacto_id: string
    automatizacion_id: string
    paso_actual: number
    cta_contactos: { nombre_completo: string | null; email: string | null; baja: boolean }
    cta_automatizaciones: { nombre: string; activa: boolean }
  }>) {
    const contacto = ins.cta_contactos
    const automatizacion = ins.cta_automatizaciones
    const anotar = (accion: string) =>
      resultado.detalle.push({
        correo: contacto.email ?? '(sin correo)',
        paso: ins.paso_actual,
        automatizacion: automatizacion.nombre,
        accion,
      })

    // Freno 4 — la baja manda por encima de todo.
    if (contacto.baja) {
      if (!prueba) {
        await crm.from(TABLA_INSCRIPCIONES)
          .update({ estado: 'detenida', proximo_envio_el: null })
          .eq('id', ins.id)
      }
      anotar('detenida: el contacto está de baja')
      continue
    }

    if (!contacto.email) { anotar('saltado: sin correo'); continue }

    // Freno 2 — la automatización tiene que estar encendida.
    if (!automatizacion.activa) { anotar('bloqueado: automatización apagada'); continue }

    const { data: paso } = await crm
      .from(TABLA_PASOS)
      .select('paso, asunto, cuerpo, activo, dias_despues')
      .eq('automatizacion_id', ins.automatizacion_id)
      .eq('paso', ins.paso_actual)
      .maybeSingle()

    if (!paso) {
      // Se acabaron los pasos: la inscripción termina.
      if (!prueba) {
        await crm.from(TABLA_INSCRIPCIONES)
          .update({ estado: 'terminada', proximo_envio_el: null })
          .eq('id', ins.id)
      }
      anotar('automatización terminada')
      continue
    }

    if (!paso.activo) { anotar('saltado: paso desactivado'); continue }

    // Freno 3 — el relleno no sale nunca.
    if (esBorrador({ asunto: paso.asunto ?? '', cuerpo: paso.cuerpo ?? '' })) {
      anotar('bloqueado: el texto todavía es [BORRADOR]')
      continue
    }

    if (prueba) { anotar('se enviaría'); continue }

    const nombre = primerNombre(contacto.nombre_completo)

    try {
      await getResend().emails.send({
        from: REMITENTE_CON_NOMBRE,
        to: contacto.email,
        subject: personalizar(paso.asunto ?? '', nombre),
        text: [
          nombre ? `Hola ${nombre},` : 'Hola,',
          '',
          personalizar(paso.cuerpo ?? '', nombre),
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          '',
          '—',
          `Si no querés recibir más correos míos: ${enlaceDeBaja(SITIO, ins.contacto_id)}`,
        ].join('\n'),
      })

      await registrarActividad(
        ins.contacto_id,
        'email',
        `${automatizacion.nombre} · correo ${ins.paso_actual} enviado a ${contacto.email}`
      )

      // Adelantar al siguiente paso, si existe.
      const siguiente = ins.paso_actual + 1
      const { data: proximo } = await crm
        .from(TABLA_PASOS)
        .select('dias_despues')
        .eq('automatizacion_id', ins.automatizacion_id)
        .eq('paso', siguiente)
        .maybeSingle()

      if (proximo) {
        // `dias_despues` se cuenta DESDE EL ALTA, no desde el correo anterior:
        // así están escritas las cadenas (1 · 3 · 7 · 12 = «al día 12», no «12
        // días después del tercero»). Para pasar de un paso al siguiente hay que
        // esperar la DIFERENCIA entre los dos.
        //
        // Antes decía `proximo.dias_despues - 0` y contaba el número entero desde
        // hoy: la cadena del ebook, escrita para 16 días, corría en 40.
        //
        // Se resta en vez de calcular sobre `inscrito_el` a propósito. Sobre el
        // alta, a quien lleva semanas en la cadena le quedarían tres o cuatro
        // pasos con fecha vencida y los recibiría en días seguidos. Con la
        // diferencia, el que ya venía en camino conserva sus huecos.
        const hueco = Math.max(1, proximo.dias_despues - (paso.dias_despues ?? 0))
        const cuando = new Date()
        cuando.setUTCDate(cuando.getUTCDate() + hueco)
        await crm.from(TABLA_INSCRIPCIONES).update({
          paso_actual: siguiente,
          proximo_envio_el: cuando.toISOString().slice(0, 10),
          actualizado_el: new Date().toISOString(),
        }).eq('id', ins.id)
      } else {
        await crm.from(TABLA_INSCRIPCIONES).update({
          estado: 'terminada',
          proximo_envio_el: null,
          actualizado_el: new Date().toISOString(),
        }).eq('id', ins.id)
      }

      resultado.enviados += 1
      anotar('enviado')
    } catch (e) {
      console.error('[secuencias/tick] falló el envío a', contacto.email, e)
      anotar('falló el envío')
    }
  }

  return NextResponse.json(resultado)
}

// ── Quién puede llamar esto ─────────────────────────────────────────────────

/**
 * A mano, para probar:
 *   curl -X POST .../api/secuencias/tick?dry=1 -H "x-cron-secret: cron:<CRM_SECRET>"
 */
/**
 * El primer nombre, para saludar como saluda una persona y no un sistema.
 *
 * `nombre_completo` suele venir «Anthony Alvarado»; en un asunto de correo eso
 * se lee raro. Se toma la primera palabra y se le arregla la mayuscula, porque
 * mucha gente se registra escribiendo todo en minúscula o todo en mayuscula.
 */
function primerNombre(completo: string | null): string {
  const limpio = (completo ?? '').trim().replace(/\s+/g, ' ')
  if (!limpio) return ''
  const primero = limpio.split(' ')[0]
  if (primero.length < 2) return ''
  return primero.charAt(0).toUpperCase() + primero.slice(1).toLowerCase()
}

/**
 * Reemplaza `{nombre}` en el asunto y en el cuerpo.
 *
 * Tony lo pidio el 20-sep-2026: el nombre va en el titulo Y en el saludo.
 *
 * ⚠️ Si el contacto no tiene nombre, NO deja el hueco ni escribe «Hola ,».
 * Se limpia el placeholder y de paso se arreglan los restos: la coma o el
 * espacio que quedaba colgando. Un correo que dice «Hola ,» se lee peor que
 * uno que no saluda.
 */
function personalizar(texto: string, nombre: string): string {
  if (nombre) return texto.replace(/\{nombre\}/g, nombre)
  return texto
    // El hueco puede llevar coma ANTES («…, {nombre}») o DESPUÉS
    // («{nombre}, el número…»). Hay que barrer las dos, si no queda una coma
    // suelta al principio de la frase.
    .replace(/\{nombre\}\s*,\s*/g, '')
    .replace(/\s*,?\s*\{nombre\}/g, '')
    .replace(/\s+([,.!?:])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
    // Al quitar el nombre del principio, la frase arrancaba en minúscula.
    .replace(/^([a-záéíóúñ¿¡])/u, (c) => c.toUpperCase())
}

export async function POST(req: NextRequest) {
  if (!cronAutorizado(req.headers.get('x-cron-secret'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }
  return correrElTick(req)
}

/**
 * El reloj automático de Vercel, una vez al día. Llama con GET y su propia
 * cabecera de autorización.
 */
export async function GET(req: NextRequest) {
  if (!cronDeVercelAutorizado(req.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }
  return correrElTick(req)
}
