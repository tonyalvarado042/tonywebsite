import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { REMITENTE_CON_NOMBRE } from '@/lib/correo'
import { altaContacto, getCrm, normalizarTelefono, registrarActividad } from '@/lib/crm'
import { enlaceDeBaja } from '@/lib/secuencias'
import { CLASE, ETIQUETA_CRM } from '@/data/clase-copropiedad'
import { PAISES } from '@/data/paises'

/**
 * Registro a la clase gratuita «La Revolución de la Copropiedad Turística».
 *
 * Calcado de `/api/rifa/registro`, que lleva meses en producción con leads
 * reales. Se reusa la librería probada —`altaContacto`, `normalizarTelefono`,
 * `registrarActividad`— y no se reescribe una sola línea de ella.
 *
 * ── Por qué no se reusa /api/recursos/registro ──────────────────────────────
 * Ese endpoint existe para ENTREGAR un recurso: exige `destino_url`, inscribe
 * en una automatización de correos y su fuente es `recurso_gratis`. Acá no hay
 * archivo que entregar y la fuente tiene que ser `masterclass` para que Tony
 * filtre la clase en el CRM.
 *
 * ── Orden de operaciones ────────────────────────────────────────────────────
 * Primero el CRM; si eso falla, la petición falla. Después el correo, en
 * try/catch que no tumba nada. El lead es lo único irrecuperable: perderlo
 * porque no salió un correo sería absurdo.
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const marcado = (v: unknown) => v === true || v === 'true' || v === 'on'

/**
 * El país sale del prefijo que la persona eligió en el selector, no de un campo
 * nuevo. Sirve para dos cosas: el muro de registrados y saber a quién se le
 * escribe en qué horario.
 */
function paisDelPrefijo(prefijo: string): string | null {
  const encontrado = PAISES.find((p) => p.codigo === prefijo)
  return encontrado ? encontrado.pais : null
}

/** Enlace de Google Calendar. Un archivo adjunto lo bloquean más clientes. */
function enlaceCalendario(): string {
  const inicio = new Date(CLASE.instanteUtc)
  const fin = new Date(inicio.getTime() + 90 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Clase en vivo: ${CLASE.nombre} — Tony Alvarado`,
    dates: `${fmt(inicio)}/${fmt(fin)}`,
    details: 'El enlace para entrar llega por correo antes de la clase.',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export async function POST(req: NextRequest) {
  try {
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Tipo de contenido no válido.' }, { status: 415 })
    }

    const crudo = await req.text()
    if (new TextEncoder().encode(crudo).byteLength > 8_000) {
      return NextResponse.json({ ok: false, error: 'Solicitud demasiado grande.' }, { status: 413 })
    }

    let cuerpo: Record<string, unknown>
    try {
      const p = JSON.parse(crudo)
      if (p === null || typeof p !== 'object' || Array.isArray(p)) throw new Error()
      cuerpo = p as Record<string, unknown>
    } catch {
      return NextResponse.json({ ok: false, error: 'Formato no válido.' }, { status: 400 })
    }

    // Honeypot — éxito silencioso, sin escribir nada.
    if (leer(cuerpo.website)) return NextResponse.json({ ok: true, filtrado: true })

    const nombre = leer(cuerpo.nombre)
    const correo = leer(cuerpo.correo).toLowerCase()
    const prefijo = leer(cuerpo.prefijo) || '+506'
    const telefonoCrudo = leer(cuerpo.whatsapp)
    /** De dónde entró: 'principal', 'salida' (la ventana) o 'barra'. */
    const origen = leer(cuerpo.origen) || 'principal'

    // ── Validación ──
    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
    }
    const telefono = normalizarTelefono(
      telefonoCrudo.startsWith('+') ? telefonoCrudo : `${prefijo}${telefonoCrudo}`
    )
    if (!telefono) {
      return NextResponse.json(
        { ok: false, error: 'Ese número no se ve válido. Revisá el país y el número.' },
        { status: 422 }
      )
    }

    // ── Alta en el CRM ──
    const alta = await altaContacto({
      telefono,
      nombre,
      correo,
      fuente: 'masterclass',
      etiqueta: ETIQUETA_CRM,
      detalle:
        `Se registró a la clase «${CLASE.nombre}» del ${CLASE.fechaTexto}, ${CLASE.horaTexto}.` +
        ` Entró por: ${origen}.`,
    })

    // ── El país, solo si el contacto no lo traía ──
    // No se pisa lo que ya había: puede estar mejor trabajado a mano desde el CRM.
    const pais = paisDelPrefijo(prefijo)
    if (pais) {
      const crm = getCrm()
      const { data: ficha } = await crm
        .from('cta_contactos')
        .select('pais')
        .eq('id', alta.contactoId)
        .maybeSingle()

      if (!ficha?.pais) {
        const { error } = await crm
          .from('cta_contactos')
          .update({ pais, actualizado_el: new Date().toISOString() })
          .eq('id', alta.contactoId)
        if (error) console.error('[clase/registro] no se pudo guardar el país:', error.message)
      }
    }

    // ── El correo de confirmación ──
    // Sale de una; no es parte de ninguna secuencia. Si falla NO se rompe la
    // petición: el lead ya está guardado.
    let correoEnviado = false
    try {
      const baja = alta.estaDeBaja ? '' : enlaceDeBaja(SITIO, alta.contactoId)

      await getResend().emails.send({
        from: REMITENTE_CON_NOMBRE,
        to: correo,
        subject: `Quedaste adentro: ${CLASE.fechaTexto}, ${CLASE.horaTexto}`,
        text: [
          `Hola ${nombre.split(' ')[0]},`,
          '',
          `Ya tenés tu campo en la clase «${CLASE.nombre}».`,
          '',
          '───────────────────────────────',
          `${CLASE.fechaTexto.toUpperCase()} · ${CLASE.horaTexto}`,
          `${CLASE.duracionTexto} en vivo`,
          '───────────────────────────────',
          '',
          'Apuntala en tu calendario ahora, que después se olvida:',
          enlaceCalendario(),
          '',
          `${CLASE.plataformaTexto}`,
          '',
          'Lo que vamos a ver:',
          '',
          '  · Los doce meses de un hotel de cinco villas en La Fortuna,',
          '    uno por uno, con lo que entró cada mes.',
          '  · Qué son ADR y ocupación, y cómo se leen sin que te vendan humo.',
          '  · Qué se lleva la operadora, qué se llevan las plataformas y qué',
          '    queda después.',
          '  · Las cinco preguntas que hago antes de entrar en un proyecto',
          '    turístico.',
          '  · Qué es la copropiedad, en qué se diferencia del tiempo',
          '    compartido y cuándo no tiene ningún sentido.',
          '',
          'Te lo digo desde ahora para que no te agarre de sorpresa: al final',
          'te voy a contar de HUMAYA, el proyecto que abrimos en noviembre en',
          'La Fortuna. La clase vale por sí sola aunque eso no te interese.',
          '',
          'Y una advertencia que va en serio: acá no se garantiza ningún',
          'número. Si alguien te promete uno, desconfiá — incluido yo.',
          '',
          'Nos vemos el miércoles.',
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          ...(baja ? ['', '—', `Si no querés recibir más correos míos: ${baja}`] : []),
        ].join('\n'),
      })
      correoEnviado = true
      await registrarActividad(
        alta.contactoId,
        'email',
        `Confirmación de la clase «${CLASE.nombre}» enviada a ${correo}`
      )
    } catch (e) {
      console.error('[clase/registro] no se pudo enviar la confirmación:', e)
    }

    return NextResponse.json({
      ok: true,
      yaExistia: alta.yaExistia,
      correoEnviado,
      calendario: enlaceCalendario(),
    })
  } catch (e) {
    console.error('[clase/registro] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar el registro. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
