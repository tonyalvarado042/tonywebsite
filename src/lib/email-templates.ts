// ─── Utility ──────────────────────────────────────────────────────────────────

export function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// ─── Labels ───────────────────────────────────────────────────────────────────

export const interesLabels: Record<string, string> = {
  'pure-cycling':        'Pure Cycling',
  'puromtb':             'PuroMTB',
  'bike-bed':            'Bike & Bed Hotels',
  'bike-bed-inversion':  'Inversión Bike & Bed',
  'conferencias':        'Conferencias',
  'libros':              'Libros',
  'contacto-general':    'Contacto general',
  'otro':                'Otro',
}

export function getInteresLabel(interes: string): string {
  return interesLabels[interes] ?? 'Contacto general'
}

// ─── Priority ─────────────────────────────────────────────────────────────────

type Priority = 'Alta' | 'Media' | 'Normal'

function getPriority(interes: string): Priority {
  if (['bike-bed-inversion', 'conferencias'].includes(interes)) return 'Alta'
  if (['pure-cycling', 'bike-bed', 'puromtb'].includes(interes)) return 'Media'
  return 'Normal'
}

const priorityColor: Record<Priority, string> = {
  Alta:   '#EF4444',
  Media:  '#F59E0B',
  Normal: '#6B7280',
}

// ─── Subjects ─────────────────────────────────────────────────────────────────

export function getInternalSubject(label: string): string {
  return `Nuevo lead — ${label}`
}

export function getAutoReplySubject(interes: string): string {
  const subjects: Record<string, string> = {
    'pure-cycling':        'Recibimos tu solicitud sobre Pure Cycling',
    'puromtb':             'Recibimos tu mensaje sobre PuroMTB',
    'bike-bed':            'Recibimos tu consulta sobre Bike & Bed Hotels',
    'bike-bed-inversion':  'Recibimos tu interés en Bike & Bed Hotels',
    'conferencias':        'Recibimos tu solicitud de conferencia',
    'libros':              'Recibimos tu consulta sobre los libros de Tony Alvarado',
    'contacto-general':    'Recibimos tu mensaje — Tony Alvarado',
    'otro':                'Recibimos tu mensaje — Tony Alvarado',
  }
  return subjects[interes] ?? 'Recibimos tu mensaje — Tony Alvarado'
}

// ─── Internal email ───────────────────────────────────────────────────────────

export type InternalEmailData = {
  nombre: string
  correo: string
  whatsapp: string
  empresa: string
  interes: string
  interesLabel: string
  origen: string
  now: string
  mensaje: string
}

export function buildInternalHtml(d: InternalEmailData): string {
  const priority = getPriority(d.interes)
  const pColor = priorityColor[priority]

  const safe = {
    nombre:   escapeHtml(d.nombre),
    correo:   escapeHtml(d.correo),
    whatsapp: escapeHtml(d.whatsapp || '—'),
    empresa:  escapeHtml(d.empresa  || '—'),
    origen:   escapeHtml(d.origen   || 'tonyalvarado.com'),
    mensaje:  escapeHtml(d.mensaje).replace(/\n/g, '<br>'),
  }

  return `
<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;color:#1a1a1a;border-radius:8px;overflow:hidden">

  <!-- Header -->
  <div style="background:#7D26CC;padding:20px 24px">
    <p style="margin:0;font-size:11px;text-transform:uppercase;letter-spacing:1px;color:rgba(255,255,255,0.65)">
      tonyalvarado.com · formulario web
    </p>
    <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">
      Nuevo lead recibido
    </h1>
  </div>

  <!-- Bloque resumen -->
  <div style="background:#f5f5f5;border:1px solid #e0e0e0;border-top:none;padding:14px 24px">
    <p style="margin:0;font-size:13px;color:#444">
      Interés: <strong>${d.interesLabel}</strong>
    </p>
    <p style="margin:5px 0 0;font-size:12px;color:#555">
      Prioridad sugerida:&nbsp;
      <span style="display:inline-block;background:${pColor};color:#fff;font-weight:700;font-size:11px;padding:2px 9px;border-radius:10px">
        ${priority}
      </span>
    </p>
  </div>

  <!-- Datos del lead -->
  <div style="border:1px solid #e0e0e0;border-top:none;padding:0 24px">
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      <tr>
        <td style="padding:10px 0;color:#888;width:150px;border-bottom:1px solid #f0f0f0">Nombre</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0"><strong>${safe.nombre}</strong></td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0">Correo</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <a href="mailto:${safe.correo}" style="color:#7D26CC;text-decoration:none">${safe.correo}</a>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0">WhatsApp</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safe.whatsapp}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0">Empresa</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${safe.empresa}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0;vertical-align:top">Interés</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0">
          <span style="display:inline-block;background:#39D98A;color:#0B0E14;font-weight:700;font-size:12px;padding:3px 10px;border-radius:20px">
            ${d.interesLabel}
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888;border-bottom:1px solid #f0f0f0">Origen</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:12px;color:#666">${safe.origen}</td>
      </tr>
      <tr>
        <td style="padding:10px 0;color:#888">Fecha</td>
        <td style="padding:10px 0">${d.now}</td>
      </tr>
    </table>
  </div>

  <!-- Mensaje -->
  <div style="border:1px solid #e0e0e0;border-top:none;padding:16px 24px">
    <p style="margin:0 0 10px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;color:#888">
      Mensaje
    </p>
    <div style="background:#f9f9f9;padding:16px;border-radius:6px;font-size:14px;line-height:1.7;color:#333">
      ${safe.mensaje}
    </div>
  </div>

  <!-- Footer -->
  <div style="border:1px solid #e0e0e0;border-top:none;padding:12px 24px;background:#fafafa;border-radius:0 0 8px 8px">
    <p style="margin:0;color:#bbb;font-size:11px">tonyalvarado.com · San José, Costa Rica</p>
  </div>

</div>`
}

// ─── Auto-reply email ─────────────────────────────────────────────────────────

export type AutoReplyData = {
  nombre: string
  interes: string
  interesLabel: string
}

const autoReplyBody: Record<string, string> = {
  'pure-cycling':
    'El equipo revisará tu solicitud y te responderá con los próximos pasos para conocer el programa, la comunidad y el proceso de ingreso.',
  'puromtb':
    'El equipo revisará tu mensaje y te orientará según tu consulta sobre tienda, comunidad, productos o colaboración.',
  'bike-bed':
    'El equipo revisará tu solicitud y te responderá con información relacionada al hotel, la experiencia ciclista o posibles oportunidades de colaboración.',
  'bike-bed-inversion':
    'El equipo revisará tu solicitud y, si corresponde, te contactará para compartir información adicional y coordinar una conversación.',
  'conferencias':
    'El equipo revisará la información enviada y te contactará para conocer más sobre el evento, fecha, país, audiencia y objetivos.',
  'libros':
    'El equipo revisará tu mensaje y te responderá si tu consulta está relacionada con entrevistas, prensa, colaboraciones, compras o información editorial.',
  'contacto-general':
    'El equipo de Tony Alvarado revisará tu solicitud y te responderá lo antes posible.',
  'otro':
    'Recibimos tu mensaje correctamente y el equipo lo revisará para orientarte con la persona o área correspondiente.',
}

export function buildAutoReplyHtml(d: AutoReplyData): string {
  const safeNombre = escapeHtml(d.nombre)
  const body = autoReplyBody[d.interes] ?? autoReplyBody['contacto-general']

  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a1a;border-radius:8px;overflow:hidden">

  <!-- Header -->
  <div style="background:#7D26CC;padding:24px">
    <h1 style="margin:0;font-size:22px;font-weight:700;color:#fff">Hola ${safeNombre},</h1>
  </div>

  <!-- Cuerpo -->
  <div style="border:1px solid #e0e0e0;border-top:none;padding:24px 24px 20px;border-radius:0 0 8px 8px">
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:#333">
      Gracias por tu mensaje. ${body}
    </p>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#666">
      Respondemos en un plazo de <strong>24 a 48 horas hábiles</strong>.
    </p>
    <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px">
    <p style="margin:0;font-size:14px;color:#555">— Equipo Tony Alvarado</p>
    <p style="margin:6px 0 0;font-size:12px;color:#aaa">
      <a href="https://www.tonyalvarado.com" style="color:#7D26CC;text-decoration:none">tonyalvarado.com</a>
      &nbsp;·&nbsp;San José, Costa Rica
    </p>
  </div>

</div>`
}
