import { NextResponse } from 'next/server'
import { getCrm, hayCrm } from '@/lib/crm'
import { ETIQUETA_CRM } from '@/data/clase-copropiedad'

/**
 * El muro de registrados de la clase.
 *
 * Prueba social que NO se inventa: sale del CRM de verdad. Si nadie se ha
 * registrado todavía, devuelve cero y la sección no se dibuja — antes que
 * mostrar un número falso, no se muestra nada.
 *
 * ── Lo que sale de acá, y nada más ──────────────────────────────────────────
 * Nombre de pila y país. **Nunca** teléfono, nunca correo, nunca apellidos,
 * nunca el id. Son personas reales: lo que no necesita salir, no sale.
 *
 * Debajo del formulario la página avisa que el nombre de pila puede aparecer
 * acá, para que nadie se entere después.
 *
 * ── Por qué no se dice «hace 4 minutos» ─────────────────────────────────────
 * Sería mentira a la primera. `ultimo_contacto` se mueve cuando Tony registra
 * una llamada desde el CRM, así que alguien de la semana pasada volvería a
 * salir «recién registrado». Se muestra quiénes son, sin inventar cuándo.
 */

export const dynamic = 'force-dynamic'

const TOPE = 12

/** El primer nombre, venga de `nombre` o partido de `nombre_completo`. */
function primerNombre(fila: { nombre?: unknown; nombre_completo?: unknown }): string | null {
  const directo = typeof fila.nombre === 'string' ? fila.nombre.trim() : ''
  if (directo) return directo.split(/\s+/)[0]

  const completo = typeof fila.nombre_completo === 'string' ? fila.nombre_completo.trim() : ''
  if (!completo) return null
  // Los nombres que vienen de WhatsApp llegan con «~» adelante.
  return completo.replace(/^~/, '').split(/\s+/)[0] || null
}

export async function GET() {
  // Sin llaves el sitio compila y se ve igual; solo queda mudo. Un muro vacío
  // no es un error: es que todavía no hay nadie.
  if (!hayCrm()) return NextResponse.json({ total: 0, gente: [] })

  try {
    const crm = getCrm()

    const { count, error: errorConteo } = await crm
      .from('cta_contactos')
      .select('id', { count: 'exact', head: true })
      .contains('tags', [ETIQUETA_CRM])

    if (errorConteo) throw new Error(errorConteo.message)

    const { data, error } = await crm
      .from('cta_contactos')
      .select('nombre, nombre_completo, pais, ultimo_contacto')
      .contains('tags', [ETIQUETA_CRM])
      .eq('baja', false)
      .order('ultimo_contacto', { ascending: false })
      .limit(TOPE)

    if (error) throw new Error(error.message)

    const gente = (data ?? [])
      .map((fila) => ({
        nombre: primerNombre(fila),
        pais: typeof fila.pais === 'string' && fila.pais.trim() ? fila.pais.trim() : null,
      }))
      .filter((p): p is { nombre: string; pais: string | null } => Boolean(p.nombre))

    return NextResponse.json({ total: count ?? 0, gente })
  } catch (e) {
    // Que el muro falle no puede romper la página: devuelve vacío y se calla.
    console.error('[clase/muro] no se pudo leer:', e)
    return NextResponse.json({ total: 0, gente: [] })
  }
}
