/**
 * En qué orden atiende el tick las inscripciones que le tocan hoy.
 *
 * Importa porque una persona recibe **un solo correo por día** (freno 6 de
 * `secuencias-tick.ts`): si está en dos cadenas, el orden decide cuál le
 * llega hoy y cuál espera a mañana.
 *
 * **Gana la que vence antes.** Una cadena atada a un evento tiene fecha de
 * caducidad —después del evento sus correos ya no tienen sentido— y una de
 * goteo no. Esperar un día le cuesta mucho menos a la segunda.
 *
 * Puro y sin I/O a propósito: así se prueba con `node --test`.
 */

type Cadena = { vence_el?: string | null }

/**
 * ⚠️ `cta_automatizaciones` llega como **objeto** en esta consulta, pero
 * PostgREST tipa las relaciones incrustadas como arreglo. Se aceptan las dos
 * formas en vez de forzar un `as`: el día que la consulta cambie a una
 * relación de muchos, esto sigue funcionando en vez de romperse callado.
 */
type ConVencimiento = {
  cta_automatizaciones?: Cadena | Cadena[] | null
}

function vencimientoDe(fila: ConVencimiento): string | null {
  const c = fila.cta_automatizaciones
  if (!c) return null
  const uno = Array.isArray(c) ? c[0] : c
  return uno?.vence_el ?? null
}

export function ordenarPorUrgencia<T extends ConVencimiento>(filas: readonly T[]): T[] {
  return [...filas].sort((x, y) => {
    const vx = vencimientoDe(x)
    const vy = vencimientoDe(y)
    // Las que no vencen van al final: son las que pueden esperar.
    if (vx && vy) return vx < vy ? -1 : vx > vy ? 1 : 0
    if (vx) return -1
    if (vy) return 1
    return 0
  })
}
