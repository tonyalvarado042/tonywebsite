import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  getInteresLabel,
  getInternalSubject,
  getAutoReplySubject,
  buildInternalHtml,
  buildAutoReplyHtml,
} from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

const VALID_INTERES = [
  'pure-cycling',
  'puromtb',
  'bike-bed',
  'bike-bed-inversion',
  'conferencias',
  'libros',
  'contacto-general',
  'otro',
]

// Dominios siempre permitidos
const ALWAYS_ALLOWED_ORIGINS = [
  'https://www.tonyalvarado.com',
  'https://tonyalvarado.com',
]

export async function POST(req: NextRequest) {
  try {
    // 1. Origin — solo cuando está presente; ausente → permitir.
    //    No reemplaza rate limiting ni CAPTCHA.
    const origin = req.headers.get('origin')
    if (origin) {
      const isVercelPreview =
        process.env.VERCEL_ENV === 'preview' &&
        !!process.env.VERCEL_URL &&
        origin === `https://${process.env.VERCEL_URL}`
      const isLocalDev =
        process.env.NODE_ENV !== 'production' &&
        origin === 'http://localhost:3000'

      if (!ALWAYS_ALLOWED_ORIGINS.includes(origin) && !isVercelPreview && !isLocalDev) {
        return NextResponse.json(
          { success: false, error: 'Origen no permitido.' },
          { status: 403 }
        )
      }
    }

    // 2. Content-Type
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json(
        { success: false, error: 'Tipo de contenido no válido.' },
        { status: 415 }
      )
    }

    // 3. Leer body como texto y verificar tamaño real (Content-Length es solo un filtro)
    const rawBody = await req.text()
    if (new TextEncoder().encode(rawBody).byteLength > 20_000) {
      return NextResponse.json(
        { success: false, error: 'Solicitud demasiado grande.' },
        { status: 413 }
      )
    }

    // 4. JSON parse + validar que sea un objeto plano
    let parsed: unknown
    try {
      parsed = JSON.parse(rawBody)
    } catch {
      return NextResponse.json(
        { success: false, error: 'Formato de solicitud no válido.' },
        { status: 400 }
      )
    }
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json(
        { success: false, error: 'Formato de solicitud no válido.' },
        { status: 400 }
      )
    }
    const body = parsed as Record<string, unknown>

    // 5. Normalización — solo acepta strings; ignora otros tipos
    const nombre     = readString(body.nombre)
    const correo     = readString(body.correo)
    const whatsapp   = readString(body.whatsapp)
    const empresa    = readString(body.empresa)
    const interesRaw = readString(body.interes) || readString(body.tipo)
    const origen     = readString(body.origen)
    const mensaje    = readString(body.mensaje)
    const website    = readString(body.website)

    // 6. Honeypot — silent success sin enviar correo y sin loggear contenido
    if (website) {
      return NextResponse.json({ success: true, filtered: true })
    }

    // 7. Whitelist de interés: vacío → contacto-general; inválido → 422
    const interes = interesRaw === ''
      ? 'contacto-general'
      : VALID_INTERES.includes(interesRaw)
        ? interesRaw
        : null
    if (!interes) {
      return NextResponse.json(
        { success: false, error: 'Interés no válido.' },
        { status: 422 }
      )
    }

    // 8. Campos requeridos presentes
    if (!nombre || !correo || !mensaje) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos.' },
        { status: 400 }
      )
    }

    // 9. Longitud y formato
    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Nombre fuera de rango.' },
        { status: 422 }
      )
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json(
        { success: false, error: 'Correo no válido.' },
        { status: 422 }
      )
    }
    if (whatsapp && whatsapp.length > 40) {
      return NextResponse.json(
        { success: false, error: 'WhatsApp fuera de rango.' },
        { status: 422 }
      )
    }
    if (empresa && empresa.length > 120) {
      return NextResponse.json(
        { success: false, error: 'Empresa fuera de rango.' },
        { status: 422 }
      )
    }
    if (origen && origen.length > 500) {
      return NextResponse.json(
        { success: false, error: 'Origen fuera de rango.' },
        { status: 422 }
      )
    }
    if (mensaje.length < 5 || mensaje.length > 3000) {
      return NextResponse.json(
        { success: false, error: 'Mensaje fuera de rango.' },
        { status: 422 }
      )
    }

    const toEmail = process.env.CONTACT_TO_EMAIL
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

    if (!toEmail) {
      console.error('[contact/route] CONTACT_TO_EMAIL no configurado')
      return NextResponse.json(
        { success: false, error: 'Configuración de destino no disponible.' },
        { status: 500 }
      )
    }

    const interesLabel = getInteresLabel(interes)
    const now = new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })

    const { error: internalError } = await resend.emails.send({
      from: `Formulario Web Tony Alvarado <${fromEmail}>`,
      to: toEmail,
      replyTo: correo,
      subject: getInternalSubject(interesLabel),
      html: buildInternalHtml({
        nombre, correo, whatsapp, empresa,
        interes, interesLabel,
        origen: origen || 'tonyalvarado.com',
        now,
        mensaje,
      }),
    })

    if (internalError) {
      console.error('[contact/route] Error enviando email interno:', internalError)
      return NextResponse.json(
        { success: false, error: 'No se pudo enviar el mensaje.' },
        { status: 500 }
      )
    }

    // Auto-respuesta — puede fallar si el dominio no está verificado; no bloquea el flujo.
    try {
      await resend.emails.send({
        from: `Tony Alvarado <${fromEmail}>`,
        to: correo,
        subject: getAutoReplySubject(interes),
        html: buildAutoReplyHtml({ nombre, interes, interesLabel }),
      })
    } catch (autoReplyErr) {
      console.warn('[contact/route] Auto-respuesta no enviada:', autoReplyErr)
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Error inesperado:', err)
    return NextResponse.json(
      { success: false, error: 'Error interno al procesar la solicitud.' },
      { status: 500 }
    )
  }
}
