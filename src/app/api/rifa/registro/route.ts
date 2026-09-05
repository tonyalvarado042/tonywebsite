import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { REMITENTE_CON_NOMBRE } from '@/lib/correo'
import {
  altaContacto,
  getCrm,
  normalizarTelefono,
  registrarActividad,
} from '@/lib/crm'
import { enlaceDeBaja } from '@/lib/secuencias'
import {
  RIFA, RESERVA, VENTAS, EXPERIENCIA, ANFITRIONES, CAMPANA_ID_EXTERNO, enlaceWhatsApp,
} from '@/data/ride-and-reset'

/**
 * Registro de la rifa RIDE & RESET.
 *
 * Da de alta en `cta_contactos` (EL CRM que Tony ve), guarda la participación
 * en `cta_rifa_participaciones` para que el sorteo tenga un registro auditable,
 * anota en la bitácora y manda el correo de confirmación de una.
 *
 * ── Por qué no se reusa /api/recursos/registro ──────────────────────────────
 * Ese endpoint existe para ENTREGAR un recurso: exige `destino_url` y no captura
 * Instagram, ni a quién etiquetó, ni la intención de reservar. Lo que sí se reusa
 * es la librería probada: `altaContacto`, `normalizarTelefono`,
 * `registrarActividad` — nada de eso se reescribe acá.
 *
 * ── Lo que NO hace ──────────────────────────────────────────────────────────
 * No manda WhatsApp. No se puede: la API de Meta todavía no está conectada al
 * CRM (no hay número ni token). Lo que devuelve es un enlace `wa.me` que abre el
 * chat con el mensaje escrito — **lo manda la persona**, así que no necesita
 * plantilla aprobada ni cuesta conversación.
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'
const TABLA_PARTICIPACIONES = 'cta_rifa_participaciones'

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
const marcado = (v: unknown) => v === true || v === 'true' || v === 'on'

/** Un usuario de Instagram, sin arroba y sin la URL completa si la pegaron. */
function limpiarInstagram(entrada: string): string {
  return entrada
    .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
    .replace(/[/?].*$/, '')
    .replace(/^@+/, '')
    .trim()
    .slice(0, 40)
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
    const correo = leer(cuerpo.correo)
    const prefijo = leer(cuerpo.prefijo)
    const telefonoCrudo = leer(cuerpo.whatsapp)
    const instagram = limpiarInstagram(leer(cuerpo.instagram))
    const etiquetoA = limpiarInstagram(leer(cuerpo.etiquetoA))
    const compartio = marcado(cuerpo.compartio)
    const aceptoBases = marcado(cuerpo.aceptoBases)
    const quiereReservar = marcado(cuerpo.quiereReservar)
    const canal = leer(cuerpo.canal) === 'whatsapp' ? 'whatsapp' : 'email'

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
    if (!aceptoBases) {
      return NextResponse.json(
        { ok: false, error: 'Hay que aceptar las bases para participar.' },
        { status: 422 }
      )
    }

    // ── Alta en el CRM ──
    // Las etiquetas son lo que después deja segmentar en Marketing.
    const etiqueta = `rifa:${RIFA.slug}`
    const alta = await altaContacto({
      telefono,
      nombre,
      correo,
      fuente: 'otro',
      etiqueta,
      detalle:
        `Se apuntó a la rifa «${RIFA.nombre}» (${RIFA.slug}) desde la landing.` +
        (instagram ? ` Instagram: @${instagram}.` : '') +
        (etiquetoA ? ` Etiquetó a @${etiquetoA}.` : '') +
        ` Compartió: ${compartio ? 'sí' : 'no'}. Canal preferido: ${canal}.` +
        (quiereReservar ? ' ⭐ QUIERE RESERVAR la experiencia.' : ''),
    })

    const crm = getCrm()

    // ── Enganchar el contacto a la campaña, las etiquetas y el seguimiento ──
    // Todo en UNA lectura y UNA escritura, en vez de tres idas y vueltas.
    const { data: ficha } = await crm
      .from('cta_contactos')
      .select('tags, instagram, campana_id, proximo_seguimiento')
      .eq('id', alta.contactoId)
      .maybeSingle()

    const tags: string[] = Array.isArray(ficha?.tags) ? (ficha!.tags as string[]) : []
    const cambios: Record<string, unknown> = {}

    // La etiqueta que vale plata: quiere la experiencia, no solo el sorteo.
    if (quiereReservar && !tags.includes('bnb:quiere-reservar')) {
      cambios.tags = [...tags, 'bnb:quiere-reservar']
    }

    // El usuario de Instagram va a su columna, que ya existía en la ficha.
    // No se pisa lo que ya había: puede estar mejor trabajado a mano.
    if (instagram && !ficha?.instagram) cambios.instagram = instagram

    // La campaña: así estos contactos se ven juntos en la pantalla Campañas.
    // Se busca por `id_externo` y no por un UUID pegado en el código.
    if (!ficha?.campana_id) {
      const { data: campana } = await crm
        .from('cta_campanas').select('id').eq('id_externo', CAMPANA_ID_EXTERNO).maybeSingle()
      if (campana?.id) cambios.campana_id = campana.id
    }

    // Seguimiento: SOLO a quien pidió la info de la experiencia.
    // Agendárselo a todos llenaría «Mi día» de gente que solo quiso participar
    // en una rifa gratis, y eso vuelve inútil la pantalla.
    if (quiereReservar && !ficha?.proximo_seguimiento) {
      const manana = new Date()
      manana.setUTCDate(manana.getUTCDate() + 1)
      cambios.proximo_seguimiento = manana.toISOString().slice(0, 10)
    }

    if (Object.keys(cambios).length > 0) {
      cambios.actualizado_el = new Date().toISOString()
      const { error } = await crm.from('cta_contactos').update(cambios).eq('id', alta.contactoId)
      if (error) console.error('[rifa/registro] no se pudo completar la ficha:', error.message)
    }

    // ── La participación ──
    // Tabla aparte porque un sorteo necesita un registro auditable: quién entró,
    // cuándo, a quién etiquetó y si aceptó las bases.
    //
    // Se busca y después se escribe, en vez de usar `upsert`. Dos razones:
    // `ON CONFLICT` a través de una vista puente es terreno resbaloso, y así se
    // sabe de verdad si la persona YA estaba adentro — que es lo que hay que
    // decirle en pantalla.
    let yaParticipaba = false
    const campos = {
      instagram: instagram || null,
      etiqueto_a: etiquetoA || null,
      compartio,
      acepto_bases: aceptoBases,
      quiere_reservar: quiereReservar,
      canal_preferido: canal,
    }

    const { data: previa, error: errorBusqueda } = await crm
      .from(TABLA_PARTICIPACIONES)
      .select('id, quiere_reservar')
      .eq('contacto_id', alta.contactoId)
      .eq('rifa', RIFA.slug)
      .maybeSingle()

    if (errorBusqueda) {
      console.error('[rifa/registro] no se pudo buscar la participación:', errorBusqueda.message)
    }

    if (previa) {
      yaParticipaba = true
      // Una segunda vuelta solo puede SUMAR: si ya había dicho que quiere
      // reservar, no se le borra esa intención por volver a mandar el formulario.
      const { error } = await crm
        .from(TABLA_PARTICIPACIONES)
        .update({
          ...campos,
          quiere_reservar: quiereReservar || Boolean(previa.quiere_reservar),
          actualizado_el: new Date().toISOString(),
        })
        .eq('id', previa.id)
      if (error) console.error('[rifa/registro] no se pudo actualizar la participación:', error.message)
    } else {
      const { error } = await crm.from(TABLA_PARTICIPACIONES).insert({
        contacto_id: alta.contactoId,
        rifa: RIFA.slug,
        ...campos,
      })
      // Si esto falla, el lead YA está en el CRM: no se pierde la persona. Pero
      // sin esta fila el sorteo no la incluye, así que tiene que quedar en el log.
      if (error) console.error('[rifa/registro] no se pudo guardar la participación:', error.message)
    }

    // El enlace de WhatsApp: se arma una sola vez y se usa en el correo y en
    // la respuesta. Es null mientras no haya número configurado.
    const enlaceWa = enlaceWhatsApp(
      quiereReservar ? RIFA.whatsapp.mensajeReserva : RIFA.whatsapp.mensajeRifa
    )

    // ── El correo de confirmación ──
    // Sale de una, no es parte de la secuencia: es el acuse de que quedó adentro.
    // Si falla NO se rompe la petición — el lead ya está guardado.
    let correoEnviado = false
    try {
      const baja = alta.estaDeBaja ? '' : enlaceDeBaja(SITIO, alta.contactoId)
      const cierre = RIFA.cierre.texto
      const hayCierre = cierre && !cierre.startsWith('[')

      await getResend().emails.send({
        from: REMITENTE_CON_NOMBRE,
        to: correo,
        // ⚠️ El correo sale desde tonyalvarado.com, que es el dominio verificado
        // en Resend. Ventas va como reply-to, que NO necesita verificación: al
        // darle «Responder», la respuesta llega a ventas@puromtb.com.
        replyTo: VENTAS.correo,
        subject: `Quedaste adentro: rifa de ${RIFA.nombre} — y esto es lo que vas a vivir`,
        text: [
          `Hola ${nombre},`,
          '',
          `Ya quedaste participando por uno de los ${RIFA.cupos} cupos de ${RIFA.nombre}.`,
          ...(etiquetoA ? [`Anotamos que te irías con @${etiquetoA}.`] : []),
          ...(hayCierre ? [`La rifa cierra el ${cierre}, y el sorteo se hace en vivo por Facebook Live.`] : []),
          '',
          `⚠️ Ojo con esto: si salís ganador te vamos a pedir que confirmes los tres`,
          `pasos. Asegurate de haber compartido el post en tus historias ETIQUETANDO A`,
          `${RIFA.cuenta} — sin esa etiqueta no podemos ver tu historia ni comprobarla.`,
          '',
          '───────────────────────────────',
          `${RIFA.nombre.toUpperCase()} · ${RIFA.fechas.texto}`,
          `${RIFA.fechas.dias} días y ${RIFA.fechas.noches} noches en ${RIFA.lugar}`,
          '───────────────────────────────',
          '',
          'Esto es lo que incluye la experiencia:',
          '',
          ...EXPERIENCIA.map((e) => `  · ${e.titulo}`),
          '',
          'Todo mientras te hospedás en Bike & Bed, el primer hotel temático de',
          'ciclismo de Costa Rica, en La Fortuna, a minutos del Volcán Arenal.',
          '',
          'Te acompañan los cuatro días:',
          ...ANFITRIONES.map((a) => `  · ${a.nombre} — ${a.rol}`),
          '',
          '───────────────────────────────',
          '¿NO QUERÉS DEPENDER DE LA SUERTE?',
          '───────────────────────────────',
          '',
          `La experiencia tiene ${RESERVA.cuposTotales} espacios, y solo ${RESERVA.cupos} quedan con`,
          `PRECIO ESPECIAL: $${RESERVA.precio.ahora} en vez de $${RESERVA.precio.antes}.`,
          'Es para quienes prefieren asegurar su lugar y no depender del sorteo.',
          '',
          `Si querés el detalle completo —qué incluye, el precio y cómo reservar—`,
          `respondé este correo o escribinos a ${VENTAS.correo} y te mandamos`,
          'toda la información.',
          '',
          ...(quiereReservar
            ? [
                'Ya nos dijiste que querés ser parte sin esperar el sorteo, así que',
                'te vamos a escribir. Si querés adelantarlo, respondé este correo.',
                '',
              ]
            : []),
          ...(enlaceWa
            ? [
                'También podés escribirnos por WhatsApp y te llega la información',
                'de una:',
                enlaceWa,
                '',
              ]
            : []),
          'Nos vemos en La Fortuna.',
          '',
          'Tony Alvarado',
          'Bike & Bed · tonyalvarado.com',
          ...(baja ? ['', '—', `Si no querés recibir más correos míos: ${baja}`] : []),
        ].join('\n'),
      })
      correoEnviado = true
      await registrarActividad(
        alta.contactoId,
        'email',
        `Confirmación de la rifa «${RIFA.nombre}» enviada a ${correo}`
      )
    } catch (e) {
      console.error('[rifa/registro] no se pudo enviar la confirmación:', e)
    }

    return NextResponse.json({
      ok: true,
      yaExistia: alta.yaExistia,
      yaParticipaba,
      correoEnviado,
      quiereReservar,
      // Siempre se devuelve: Tony pidió que el botón de WhatsApp salga en la
      // pantalla de éxito para todo el mundo, no solo para quien lo eligió.
      whatsapp: enlaceWa,
    })
  } catch (e) {
    console.error('[rifa/registro] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar el registro. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
