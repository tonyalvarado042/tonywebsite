import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  altaContacto,
  inscribirEnAutomatizacion,
  normalizarTelefono,
  registrarActividad,
  traerRecursoPorSlug,
} from '@/lib/crm'
import { enlaceDeBaja } from '@/lib/secuencias'

/**
 * Registro para bajar un recurso gratis.
 *
 * Pide nombre, correo y WhatsApp; da de alta en `cta_contactos` (EL CRM que
 * Tony ve) con `fuente_lead = 'recurso_gratis'` y la fecha; inscribe en la
 * automatización que tenga enganchada ese recurso; y entrega el material de
 * dos formas: lo abre en el sitio y lo manda por correo.
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
    const slug = leer(cuerpo.recurso)
    // El país llega aparte del número: el formulario tiene selector de bandera.
    const prefijo = leer(cuerpo.prefijo)
    const telefonoCrudo = leer(cuerpo.whatsapp)

    const recurso = await traerRecursoPorSlug(slug)
    if (!recurso) {
      return NextResponse.json({ ok: false, error: 'Recurso no encontrado.' }, { status: 404 })
    }
    if (recurso.estado !== 'disponible' || !recurso.destino_url) {
      return NextResponse.json(
        { ok: false, error: 'Ese recurso todavía no está disponible.' },
        { status: 409 }
      )
    }

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

    const alta = await altaContacto({
      telefono,
      nombre,
      correo,
      fuente: 'recurso_gratis',
      etiqueta: `recurso:${recurso.slug}`,
      detalle: `Pidió el recurso gratis «${recurso.titulo}» desde el sitio.`,
    })

    // A quien ya se dio de baja NO se le vuelve a encolar nada. El material sí
    // se le entrega: eso lo pidió él.
    if (!alta.estaDeBaja) {
      await inscribirEnAutomatizacion(alta.contactoId, recurso.automatizacion_id, recurso.id)
    }

    // ── Entrega por correo ──
    // Si el correo falla NO se rompe la petición: el recurso igual se abre.
    let correoEnviado = false
    const url = recurso.destino_url.startsWith('http')
      ? recurso.destino_url
      : `${SITIO}${recurso.destino_url}`

    try {
      const de = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
      const baja = alta.estaDeBaja ? '' : enlaceDeBaja(SITIO, alta.contactoId)

      await getResend().emails.send({
        from: `Tony Alvarado <${de}>`,
        to: correo,
        subject: `Aquí está: ${recurso.titulo}`,
        text: [
          `Hola ${nombre},`,
          '',
          `Gracias por pedir «${recurso.titulo}». Lo podés abrir acá:`,
          url,
          '',
          'Cualquier cosa, respondé este correo — lo leo yo.',
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
        `Entrega de «${recurso.titulo}» enviada a ${correo}`
      )
    } catch (e) {
      console.error('[recursos/registro] no se pudo enviar la entrega:', e)
    }

    return NextResponse.json({
      ok: true,
      url: recurso.destino_url,
      correoEnviado,
      yaExistia: alta.yaExistia,
    })
  } catch (e) {
    console.error('[recursos/registro] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar el registro. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
