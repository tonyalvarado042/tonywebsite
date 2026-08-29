import { NextRequest, NextResponse } from 'next/server'
import { altaContacto } from '@/lib/crm'

/**
 * Alta al boletín: SOLO nombre y correo.
 *
 * Tony fue claro: este cajón es "avisame cuando salga algo nuevo". Pedirle a
 * alguien que elija un interés y escriba un mensaje para eso mata la
 * conversión. El formulario completo vive en /contacto.
 *
 * Acá NO se pide WhatsApp. `telefono_whatsapp` es nullable en `cta_contactos`,
 * así que un contacto solo-correo es perfectamente válido.
 */

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function POST(req: NextRequest) {
  try {
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Tipo de contenido no válido.' }, { status: 415 })
    }

    const crudo = await req.text()
    if (new TextEncoder().encode(crudo).byteLength > 4_000) {
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
    const desde = leer(cuerpo.desde) || 'recursos'

    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
    }

    await altaContacto({
      telefono: null,
      nombre,
      correo,
      fuente: 'boletin',
      etiqueta: 'boletin',
      detalle: `Se apuntó al boletín desde ${desde}. Autorizó recibir novedades y material.`,
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[boletin] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
