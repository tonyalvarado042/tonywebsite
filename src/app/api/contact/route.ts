import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const interesLabels: Record<string, string> = {
  'pure-cycling':        'Pure Cycling',
  'puromtb':             'PuroMTB',
  'bike-bed':            'Bike & Bed Hotels',
  'bike-bed-inversion':  'Inversión Bike & Bed',
  'conferencias':        'Conferencias',
  'libros':              'Libros',
  'contacto-general':    'Contacto general',
  'otro':                'Otro',
}

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

    const interesLabel = interesLabels[interes] ?? interes ?? 'Contacto general'
    const subject = `Nuevo lead — ${interesLabel}`
    const now = new Date().toLocaleString('es-CR', { timeZone: 'America/Costa_Rica' })

    const internalHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
        <h2 style="color:#7D26CC;margin-bottom:8px">Nuevo lead — tonyalvarado.com</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:8px 0;color:#666;width:160px">Nombre:</td><td><strong>${nombre}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Correo:</td><td><a href="mailto:${correo}" style="color:#7D26CC">${correo}</a></td></tr>
          <tr><td style="padding:8px 0;color:#666">WhatsApp:</td><td>${whatsapp || '—'}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Empresa:</td><td>${empresa || '—'}</td></tr>
          <tr>
            <td style="padding:8px 0;color:#666;vertical-align:top">Interés principal:</td>
            <td>
              <span style="display:inline-block;background:#39D98A;color:#0B0E14;font-weight:700;font-size:12px;padding:3px 10px;border-radius:20px">
                ${interesLabel}
              </span>
            </td>
          </tr>
          <tr><td style="padding:8px 0;color:#666">Origen:</td><td style="font-size:12px;color:#555">${origen || 'tonyalvarado.com'}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Fecha:</td><td>${now}</td></tr>
        </table>
        <h3 style="margin-top:20px;margin-bottom:8px;color:#333">Mensaje:</h3>
        <div style="background:#f5f5f5;padding:16px;border-radius:8px;font-size:14px;line-height:1.6">
          ${mensaje.replace(/\n/g, '<br>')}
        </div>
        <hr style="margin:20px 0;border:none;border-top:1px solid #e5e5e5">
        <p style="color:#999;font-size:12px">tonyalvarado.com · formulario web</p>
      </div>
    `

    const { error: internalError } = await resend.emails.send({
      from: `Formulario Web Tony Alvarado <${fromEmail}>`,
      to: toEmail,
      replyTo: correo,
      subject,
      html: internalHtml,
    })

    if (internalError) {
      console.error('[contact/route] Error enviando email interno:', internalError)
      return NextResponse.json(
        { success: false, error: 'No se pudo enviar el mensaje.' },
        { status: 500 }
      )
    }

    // Auto-respuesta al usuario — puede fallar si el dominio no está verificado.
    try {
      await resend.emails.send({
        from: `Tony Alvarado <${fromEmail}>`,
        to: correo,
        subject: 'Recibimos tu mensaje — Tony Alvarado',
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a">
            <h2 style="color:#7D26CC">Hola ${nombre},</h2>
            <p style="font-size:15px;line-height:1.6">
              Gracias por escribirnos. El equipo de Tony recibió tu consulta sobre
              <strong>${interesLabel}</strong> y responderá en un plazo de 24 a 48 horas hábiles.
            </p>
            <p style="color:#666;font-size:14px">— Equipo Tony Alvarado</p>
            <hr style="margin:20px 0;border:none;border-top:1px solid #e5e5e5">
            <p style="color:#999;font-size:12px">tonyalvarado.com · San José, Costa Rica</p>
          </div>
        `,
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
