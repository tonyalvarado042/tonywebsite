import { NextRequest, NextResponse } from 'next/server'
import { altaContacto, normalizarTelefono, getCrm, TABLA_CONTACTOS } from '@/lib/crm'

/**
 * Solicitud de mentoría empresarial → el CRM.
 *
 * Por qué NO va por `/api/contact`: ese endpoint solo manda correo con Resend.
 * Un lead de mentoría tiene que quedar en `cta_contactos` con su bitácora, para
 * que se le pueda dar seguimiento y para que Ari lo trabaje después. Un correo
 * se pierde en una bandeja; un contacto en el CRM no.
 *
 * Mismo camino que ya usan el boletín, los recursos y la rifa.
 *
 * ⚠️ `fuente` es vocabulario CERRADO por CHECK en la base y no existe un valor
 * de mentoría. Se usa `otro` y se distingue por la etiqueta `mentoria`, igual
 * que hace la rifa con `rifa:<slug>` — es como Marketing segmenta de todos
 * modos, y agregar un valor al CHECK obliga a tocar la base Y el filtro del
 * CRM, que es otro repo.
 */

const ETIQUETA = 'mentoria'

const TEMAS = [
  'Marketing',
  'Liderazgo',
  'Ventas',
  'Estrategia',
  'Finanzas',
  'Varios temas',
] as const

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

export async function POST(req: NextRequest) {
  try {
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Tipo de contenido no válido.' }, { status: 415 })
    }

    const crudo = await req.text()
    if (new TextEncoder().encode(crudo).byteLength > 6_000) {
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
    const correo = leer(cuerpo.correo).toLowerCase()
    const empresa = leer(cuerpo.empresa)
    const mensaje = leer(cuerpo.mensaje).slice(0, 1500)
    const telefonoCrudo = leer(cuerpo.telefono)
    const temaCrudo = leer(cuerpo.tema)
    const idioma = leer(cuerpo.idioma) === 'en' ? 'en' : 'es'

    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
    }
    // El tema se valida contra la lista: lo que llega del navegador no se cree.
    const tema = (TEMAS as readonly string[]).includes(temaCrudo) ? temaCrudo : null
    if (!tema) {
      return NextResponse.json({ ok: false, error: 'Escogé un tema.' }, { status: 422 })
    }

    // Si no se puede normalizar, el lead entra igual y el crudo queda en la
    // bitácora: perder un lead bueno por un formato raro sería peor.
    const telefono = telefonoCrudo ? normalizarTelefono(telefonoCrudo) : null

    const detalle = [
      `🎓 Solicitud de MENTORÍA desde tonyalvarado.com (${idioma === 'en' ? 'inglés' : 'español'}).`,
      `Tema: ${tema}.`,
      empresa && `Empresa: ${empresa}.`,
      mensaje && `Lo que quiere resolver: «${mensaje}»`,
      !telefono && telefonoCrudo && `⚠️ Teléfono sin normalizar, tal como lo escribió: ${telefonoCrudo}`,
    ]
      .filter(Boolean)
      .join('\n')

    const alta = await altaContacto({
      telefono,
      nombre,
      correo,
      fuente: 'otro',
      etiqueta: ETIQUETA,
      detalle,
    })

    /* `altaContacto` no maneja `empresa` —su tipo no lo contempla— y en una
       consulta de mentoría empresarial ese dato sirve para filtrar y para
       preparar la conversación. Se guarda aparte, y SOLO si el contacto no
       traía uno: no se pisa un dato bueno con uno nuevo.
       Si falla, no se propaga: el lead ya está guardado, que es lo que importa. */
    if (empresa) {
      try {
        const crm = getCrm()
        const { data } = await crm
          .from(TABLA_CONTACTOS).select('empresa').eq('id', alta.contactoId).maybeSingle()
        if (!data?.empresa) {
          await crm.from(TABLA_CONTACTOS)
            .update({ empresa, actualizado_el: new Date().toISOString() })
            .eq('id', alta.contactoId)
        }
      } catch (e) {
        console.error('[mentoria] no se pudo guardar la empresa:', e)
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[mentoria] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo completar. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
