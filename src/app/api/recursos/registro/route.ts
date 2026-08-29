import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { altaContactoPorRecurso, normalizarTelefono, registrarEvento, getCrm, TABLA_CONTACTOS } from '@/lib/crm'
import { enlaceDeBaja, fechaDelPaso, marcaDePaso } from '@/lib/secuencias'
import { recursos } from '@/data/recursos'

/**
 * Registro para bajar un recurso gratis.
 *
 * Pide nombre, correo y WhatsApp; escribe en el CRM con la fuente y la fecha;
 * entrega el recurso de dos formas (lo abre en el sitio y además lo manda por
 * correo); y deja al contacto encolado en la secuencia de calentamiento.
 *
 * El cliente de Resend va perezoso — misma lección que tumbó el build antes.
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

function leer(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
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
    if (leer(cuerpo.website)) {
      return NextResponse.json({ ok: true, filtrado: true })
    }

    const nombre = leer(cuerpo.nombre)
    const correo = leer(cuerpo.correo)
    const whatsappCrudo = leer(cuerpo.whatsapp)
    const slug = leer(cuerpo.recurso)

    const recurso = recursos.find((r) => r.slug === slug)
    if (!recurso) {
      return NextResponse.json({ ok: false, error: 'Recurso no encontrado.' }, { status: 404 })
    }
    if (recurso.estado !== 'disponible' || !recurso.href) {
      return NextResponse.json({ ok: false, error: 'Ese recurso todavía no está disponible.' }, { status: 409 })
    }

    // ── Validación ──
    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
    }
    const telefono = normalizarTelefono(whatsappCrudo)
    if (!telefono) {
      return NextResponse.json(
        { ok: false, error: 'Ese WhatsApp no se ve válido. Si es de Costa Rica bastan los 8 dígitos.' },
        { status: 422 }
      )
    }

    // ── CRM ──
    const alta = await altaContactoPorRecurso({
      telefono,
      nombre,
      correo,
      recursoSlug: recurso.slug,
      recursoTitulo: recurso.titulo,
    })

    // ── Secuencia ──
    // A quien ya se dio de baja NO se le vuelve a encolar nada. Se le entrega
    // el recurso que pidió — eso sí lo pidió — pero no entra a la secuencia.
    if (!alta.estaDeBaja) {
      const primera = fechaDelPaso(new Date(), 1)
      await getCrm()
        .from(TABLA_CONTACTOS)
        .update({
          proximo_paso: marcaDePaso(recurso.slug, 1),
          proximo_paso_el: primera,
          ultimo_contacto_el: new Date().toISOString(),
        })
        .eq('id', alta.contactoId)
    }

    // ── Entrega por correo ──
    // Si el correo falla NO se rompe la petición: el recurso igual se abre en
    // el sitio. Perder el lead por un problema de correo sería peor.
    let correoEnviado = false
    const urlRecurso = recurso.externo ? recurso.href : `${SITIO}${recurso.href}`

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
          urlRecurso,
          '',
          'Cualquier cosa, respondé este correo — lo leo yo.',
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          ...(baja ? ['', '—', `Si no querés recibir más correos míos: ${baja}`] : []),
        ].join('\n'),
      })
      correoEnviado = true
      await registrarEvento(alta.contactoId, 'correo_enviado', `Entrega de «${recurso.titulo}» → ${correo}`)
    } catch (e) {
      console.error('[recursos/registro] no se pudo enviar la entrega:', e)
    }

    return NextResponse.json({
      ok: true,
      url: recurso.href,
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
