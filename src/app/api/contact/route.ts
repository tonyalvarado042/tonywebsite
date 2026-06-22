import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  getInteresLabel,
  getInternalSubject,
  buildInternalHtml,
} from '@/lib/email-templates'

const resend = new Resend(process.env.RESEND_API_KEY)

// ── Whitelist de valores permitidos ──────────────────────────────────────────
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

// ── Mapeo de plantillas Resend (solo servidor — nunca expuesto al navegador) ─
// El navegador solo envía el valor de `interes`; el ID de plantilla se
// selecciona aquí a partir del valor ya validado contra VALID_INTERES.
const CONTACT_TEMPLATE_IDS: Record<string, string> = {
  'pure-cycling':       'd18b0bcd-3995-49a6-95c4-7ab4b5a5ab98',
  puromtb:              'ee085399-c743-4615-8c5b-26a254a561f4',
  'bike-bed':           '79091ea9-c80f-4f06-ae75-5ff49c218bc6',
  'bike-bed-inversion': '156fb09f-9cd2-46b0-a3d0-5b8baf6af5cb',
  conferencias:         'c28266ea-e8dc-46d2-9ef2-985e4e033def',
  libros:               '357d4254-800d-4b56-acd2-b2c3ce1a2b8d',
  'contacto-general':   '73fae7c1-a04d-4c11-9e5b-0bbbd913d65b',
  otro:                 '5b5e294f-4f24-4e3f-a4ce-c26c5e447c38',
}

function getTemplateId(interes: string): string {
  return CONTACT_TEMPLATE_IDS[interes] ?? CONTACT_TEMPLATE_IDS['contacto-general']
}

function readString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

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

    // 7. Whitelist de interés: valor válido → usar tal cual; vacío o desconocido → contacto-general.
    //    El navegador nunca puede inyectar un ID de plantilla: solo el valor de `interes`
    //    llega aquí y el ID se resuelve en servidor desde CONTACT_TEMPLATE_IDS.
    const interes = VALID_INTERES.includes(interesRaw) ? interesRaw : 'contacto-general'

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

    const toEmail  = process.env.CONTACT_TO_EMAIL
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

    // 10. Notificación interna — prioritaria; fallo bloquea la respuesta al formulario
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
      console.error('[contact/route] Error enviando notificación interna:', internalError.name)
      return NextResponse.json(
        { success: false, error: 'No se pudo enviar el mensaje.' },
        { status: 500 }
      )
    }

    // 11. Respuesta automática con plantilla Resend
    //
    // Desactivada por defecto (RESEND_CONTACT_AUTOREPLY_ENABLED != 'true') porque
    // el dominio tonyalvarado.com aún no está verificado en Resend.
    // La notificación interna (paso 10) ya fue entregada al equipo, por lo que
    // un fallo en el autoreply no cancela el envío ni devuelve error al formulario.
    const autoReplyEnabled = process.env.RESEND_CONTACT_AUTOREPLY_ENABLED === 'true'

    if (autoReplyEnabled) {
      const autoReplyFrom    = process.env.RESEND_CONTACT_AUTOREPLY_FROM
      const autoReplyReplyTo = process.env.RESEND_CONTACT_AUTOREPLY_REPLY_TO || undefined

      if (!autoReplyFrom) {
        console.warn('[contact/route] Autoreply habilitado pero RESEND_CONTACT_AUTOREPLY_FROM no está configurado.')
      } else {
        try {
          const { error: autoReplyError } = await resend.emails.send({
            from: autoReplyFrom,
            to: correo,
            replyTo: autoReplyReplyTo,
            template: {
              id: getTemplateId(interes),
              variables: { NOMBRE: nombre },
            },
          })
          if (autoReplyError) {
            console.warn('[contact/route] Autoreply no enviado:', autoReplyError.name)
          }
        } catch (autoReplyErr) {
          // El equipo ya recibió el lead. El autoreply no bloquea el flujo.
          console.warn(
            '[contact/route] Error en autoreply:',
            autoReplyErr instanceof Error ? autoReplyErr.name : 'unknown',
          )
        }
      }
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact/route] Error inesperado:', err instanceof Error ? err.name : 'unknown')
    return NextResponse.json(
      { success: false, error: 'Error interno al procesar la solicitud.' },
      { status: 500 }
    )
  }
}
