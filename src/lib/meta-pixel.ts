declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

/**
 * El píxel de la clase de copropiedad (act_3597529447143130, negocio
 * liderax10). Vive acá, no en variable de entorno: el mismo patrón que
 * `GTM-KFXDNGNV` en `(es)/layout.tsx` — un solo sitio, un solo dueño.
 */
export const META_PIXEL_ID = '1745839426535163'

export function fbTrack(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  window.fbq('track', event, params)
}
