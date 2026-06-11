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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nombre, correo, whatsapp, empresa, interes: interesRaw, tipo, origen, mensaje } =
      body as Record<string, string>

    const interes = interesRaw || tipo || 'contacto-general'

    if (!nombre?.trim() || !correo?.trim() || !mensaje?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos.' },
        { status: 400 }
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
