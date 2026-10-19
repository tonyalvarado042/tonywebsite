import { getCrm } from '@/lib/crm'
import { derivarVip, type ConfigVip } from '@/lib/vip-fechas'

export type { ConfigVip }

/**
 * La configuración de la experiencia VIP, leída del CRM.
 *
 * ── Por qué no está en el código ───────────────────────────────────────────
 * Tony, 19 de octubre de 2026: «esta opción de VIP debería estar en alguna
 * parte de las opciones del CRM para que, si yo activo el VIP, salga ese
 * bloque y, de lo contrario, no. Además, podría editar también la fecha de ese
 * VIP para próximos lanzamientos: nada más cambiar la fecha. Vamos a hacer
 * unos 5 o 10 lanzamientos, aproximadamente cada 15 días.»
 *
 * Es la misma regla que ya está escrita en `secuencias.ts` desde el 20 de
 * setiembre: **los secretos van en Vercel, las decisiones van en el CRM.**
 * Diez lanzamientos con la fecha en el código son diez despliegues; con la
 * fecha en el CRM son diez campos.
 *
 * ── Qué vive acá y qué sigue en el código ──────────────────────────────────
 * En el CRM va lo que **cambia en cada lanzamiento**: si está encendido, el
 * instante, cuánto dura, el enlace de pago, los cupos y el precio.
 *
 * En `data/clase-copropiedad.ts` sigue lo que **no cambia**: el nombre, la
 * promesa, qué incluye, lo que no es, el lugar. Eso es copy, no configuración.
 *
 * ── Si la base falla, el VIP se apaga ──────────────────────────────────────
 * Devuelve `null` ante cualquier error. Mismo criterio que el freno de los
 * envíos: que un problema de base esconda la oferta es molesto; que muestre
 * una fecha vieja o un botón que lleva a un checkout muerto es peor.
 */

/**
 * Lee los ajustes y devuelve la configuración ya derivada, o `null` si el VIP
 * está apagado, le falta un dato esencial, o la base no responde.
 *
 * Quien la llama solo tiene que preguntar `if (!vip) return null` — no hay que
 * repartir banderas por toda la página.
 */
export async function leerVip(): Promise<ConfigVip | null> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('clave, valor')
      .in('clave', [
        'vip_activo',
        'vip_instante',
        'vip_duracion_min',
        'vip_enlace_pago',
        'vip_cupos',
        'vip_precio_usd',
      ])

    if (error) {
      console.error('[vip] no se pudieron leer los ajustes:', error.message)
      return null
    }

    const a = new Map((data ?? []).map((f) => [f.clave as string, (f.valor ?? '').trim()]))
    if (a.get('vip_activo') !== 'si') return null

    const instante = a.get('vip_instante') ?? ''
    const fecha = new Date(instante)
    if (!instante || Number.isNaN(fecha.getTime())) {
      console.error('[vip] vip_instante no es una fecha válida:', instante)
      return null
    }

    // Una duración rota no debe tumbar la página: 180 minutos es lo normal.
    const duracion = Number(a.get('vip_duracion_min'))
    const minutos = Number.isFinite(duracion) && duracion > 0 ? duracion : 180

    const precio = a.get('vip_precio_usd') || ''
    if (!precio) {
      console.error('[vip] falta vip_precio_usd')
      return null
    }

    return derivarVip(
      instante,
      minutos,
      a.get('vip_enlace_pago') ?? '',
      a.get('vip_cupos') ?? '',
      precio
    )
  } catch (e) {
    console.error('[vip] no se pudieron leer los ajustes:', e)
    return null
  }
}
