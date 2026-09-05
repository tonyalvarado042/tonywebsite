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
import { RIFA, enlaceWhatsApp } from '@/data/ride-and-reset'

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

    // Segunda etiqueta: la intención de reservar es la que vale plata.
    if (quiereReservar) {
      const { data } = await crm
        .from('cta_contactos').select('tags').eq('id', alta.contactoId).maybeSingle()
      const tags: string[] = Array.isArray(data?.tags) ? (data!.tags as string[]) : []
      const quiere = 'bnb:quiere-reservar'
      if (!tags.includes(quiere)) {
        await crm.from('cta_contactos')
          .update({ tags: [...tags, quiere], actualizado_el: new Date().toISOString() })
          .eq('id', alta.contactoId)
      }
    }

    // El usuario de Instagram va a su columna, que ya existía en la ficha.
    if (instagram) {
      const { data } = await crm
        .from('cta_contactos').select('instagram').eq('id', alta.contactoId).maybeSingle()
      // No se pisa lo que ya había: puede estar mejor trabajado a mano.
      if (!data?.instagram) {
        await crm.from('cta_contactos').update({ instagram }).eq('id', alta.contactoId)
      }
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
        subject: `Quedaste adentro: rifa de ${RIFA.nombre}`,
        text: [
          `Hola ${nombre},`,
          '',
          `Ya quedaste participando por uno de los ${RIFA.cupos} cupos de ${RIFA.nombre} en ${RIFA.lugar}.`,
          `${RIFA.fechas.texto} — ${RIFA.fechas.dias} días y ${RIFA.fechas.noches} noches en Bike & Bed.`,
          '',
          ...(etiquetoA ? [`Anotamos que te irías con @${etiquetoA}.`, ''] : []),
          ...(hayCierre ? [`La rifa cierra el ${cierre}.`, ''] : []),
          ...(quiereReservar
            ? [
                'Además nos dijiste que querés ser parte sin esperar el sorteo:',
                'te vamos a escribir con toda la información de la experiencia.',
                '',
              ]
            : []),
          'Cualquier cosa, respondé este correo — lo leo yo.',
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
      // El enlace para quien eligió WhatsApp. Null si Tony todavía no puso el número.
      whatsapp: enlaceWhatsApp(
        quiereReservar ? RIFA.whatsapp.mensajeReserva : RIFA.whatsapp.mensajeRifa
      ),
    })
  } catch (e) {
    console.error('[rifa/registro] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar el registro. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
