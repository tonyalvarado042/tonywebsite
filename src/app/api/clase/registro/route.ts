import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { REMITENTE_CON_NOMBRE } from '@/lib/correo'
import { altaContacto, getCrm, normalizarTelefono, registrarActividad } from '@/lib/crm'
import { enlaceDeBaja } from '@/lib/secuencias'
import { CLASE, ETIQUETA_CRM, GRUPO } from '@/data/clase-copropiedad'
import { PAISES } from '@/data/paises'
import { enlaceGoogle } from '@/lib/calendario-clase'

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

/**
 * Arma la etiqueta del canal a partir de `utm_source` y `utm_medium`.
 *
 * Normaliza a minúsculas y guiones porque así se guardan las etiquetas en este
 * CRM — si no, «Instagram» e «instagram» se vuelven dos etiquetas distintas y el
 * conteo del filtro queda partido.
 *
 * ⚠️ Devuelve `null` si el valor trae llaves. Meta rellena solas cosas como
 * `{{site_source_name}}`, pero **cuando el parámetro no está bien puesto llega
 * el texto literal**. Sin esta guarda, el CRM se llenaría de etiquetas
 * `via:site-source-name`, que no dicen nada y encima ensucian el filtro.
 */
function canalDesdeUtm(fuente?: string, medio?: string): string | null {
  const limpiar = (t?: string) =>
    (t ?? '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40)

  if ((fuente ?? '').includes('{') || (medio ?? '').includes('{')) return null

  const f = limpiar(fuente)
  if (!f) return null
  const m = limpiar(medio)
  return `via:${m ? `${f}-${m}` : f}`
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
    /**
     * De dónde entró: el slug de la variante, con `-salida` pegado si vino por
     * la ventana de intención de salida. Ej.: `revolucion`, `revolucion-salida`.
     */
    const origen = leer(cuerpo.origen) || 'numeros'
    /** La variante sola, sin el sufijo. Es la que se etiqueta en el CRM. */
    const variante = origen.replace(/-salida$/, '')
    const porLaVentana = origen.endsWith('-salida')

    // Los UTM del anuncio. Se aceptan solo los cinco conocidos y recortados:
    // lo que llega de una URL es entrada de afuera, no dato de confianza.
    const utmCrudo = cuerpo.utm
    const utmValores: Record<string, string> = {}
    if (utmCrudo && typeof utmCrudo === 'object' && !Array.isArray(utmCrudo)) {
      for (const llave of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const valor = leer((utmCrudo as Record<string, unknown>)[llave])
        if (valor) utmValores[llave] = valor.slice(0, 120)
      }
    }
    const utm = Object.entries(utmValores).map(([k, v]) => `${k}=${v}`)

    // La etiqueta del canal: `via:instagram-historia`, `via:correo-automatizacion`.
    //
    // La bitácora ya guarda los UTM completos, pero una nota **no se puede
    // filtrar**. Tony pidió que «siempre se registre de dónde viene el lead», y
    // en este CRM lo que se filtra son las ETIQUETAS: la pantalla de Contactos
    // tiene filtro por etiqueta con su conteo. Sin esto, saber cuántos vinieron
    // de historias de Instagram obliga a leer notas a mano.
    const etiquetaVia = canalDesdeUtm(utmValores.utm_source, utmValores.utm_medium)

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
        ` Variante: ${variante}.` +
        (porLaVentana ? ' Entró por la ventana de salida.' : '') +
        (utm.length ? ` Anuncio: ${utm.join(' · ')}.` : ''),
    })

    // ── La etiqueta de la variante y el país ──
    //
    // La etiqueta `variante:<slug>` es LO QUE HACE MEDIBLE EL A/B: Meta reporta
    // clics, pero quién se registró de verdad solo lo sabe el CRM. Sin esto,
    // cinco landings distintas son cinco landings indistinguibles.
    //
    // Todo en UNA lectura y UNA escritura, no tres idas y vueltas.
    const pais = paisDelPrefijo(prefijo)
    const etiquetaVariante = `variante:${variante}`

    const crm = getCrm()
    const { data: ficha } = await crm
      .from('cta_contactos')
      .select('pais, tags')
      .eq('id', alta.contactoId)
      .maybeSingle()

    const cambios: Record<string, unknown> = {}

    const tags: string[] = Array.isArray(ficha?.tags) ? (ficha!.tags as string[]) : []
    const porAgregar = [etiquetaVariante, etiquetaVia].filter(
      (e): e is string => Boolean(e) && !tags.includes(e as string)
    )
    if (porAgregar.length > 0) {
      cambios.tags = [...tags, ...porAgregar]
    }

    // No se pisa lo que ya había: puede estar mejor trabajado a mano desde el CRM.
    if (pais && !ficha?.pais) cambios.pais = pais

    if (Object.keys(cambios).length > 0) {
      cambios.actualizado_el = new Date().toISOString()
      const { error } = await crm.from('cta_contactos').update(cambios).eq('id', alta.contactoId)
      // Si esto falla el lead YA está guardado: no se pierde la persona, pero
      // esa fila queda sin variante y hay que saberlo.
      if (error) console.error('[clase/registro] no se pudo completar la ficha:', error.message)
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
          '⚠️ TE FALTA UN PASO',
          '',
          'Toda la clase se coordina por el grupo de WhatsApp: el enlace para',
          'entrar, los recordatorios y el material salen por ahí. Si no entrás',
          'al grupo, quedaste registrado pero no te vas a enterar.',
          '',
          GRUPO.url,
          '',
          '───────────────────────────────',
          `${CLASE.fechaTexto.toUpperCase()} · ${CLASE.horaTexto}`,
          `${CLASE.duracionTexto} en vivo`,
          '───────────────────────────────',
          '',
          'Apuntala en tu calendario ahora, que después se olvida:',
          `  Google:  ${enlaceGoogle()}`,
          `  Apple / Outlook de escritorio:  ${SITIO}/api/clase/calendario`,
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
      calendario: enlaceGoogle(),
    })
  } catch (e) {
    console.error('[clase/registro] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar el registro. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
