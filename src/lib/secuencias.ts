import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Frenos y firmas de las automatizaciones.
 *
 * ⚠️ El CONTENIDO de los correos ya NO vive acá: está en el CRM, en
 * `cta_automatizaciones` + `cta_automatizacion_pasos`, para que Tony los edite
 * sin tocar código. Este archivo solo guarda lo que debe vivir en el servidor:
 * los frenos y la firma de los enlaces.
 */

// ── Freno general ───────────────────────────────────────────────────────────

/**
 * Interruptor maestro. **Viene apagado.** Para encender hay que poner
 * `SECUENCIAS_ACTIVAS=si` en Vercel.
 *
 * Es a propósito: la regla de Tony es que ningún envío masivo sale sin que él
 * vea la prueba y dé el OK. Cada automatización tiene además su propio
 * interruptor (`activa`) en la base.
 */
export function secuenciasActivas(): boolean {
  return process.env.SECUENCIAS_ACTIVAS === 'si'
}

// ── Guardarraíl del borrador ────────────────────────────────────────────────

/**
 * Un correo marcado [BORRADOR] no sale NUNCA, aunque estén quitados todos los
 * demás frenos. Es la última red antes de escribirle a personas reales.
 */
export function esBorrador(correo: { asunto?: string | null; cuerpo?: string | null }): boolean {
  const a = correo.asunto ?? ''
  const c = correo.cuerpo ?? ''
  return a.includes('[BORRADOR]') || c.includes('[BORRADOR]') || (!a.trim() && !c.trim())
}

// ── Firma de los enlaces de baja ────────────────────────────────────────────

/**
 * El id del contacto ya es un UUID inadivinable, pero se firma igual para que
 * nadie pueda dar de baja a otro probando ids.
 *
 * Se usa `CRM_SECRET` con prefijo de dominio ('baja:' vs 'cron:') para no
 * mezclar propósitos entre la baja y el cron.
 */
function secreto(): string {
  const s = process.env.CRM_SECRET
  if (!s) throw new Error('CRM_SECRET no está configurada en el entorno.')
  return s
}

export function firmarBaja(contactoId: string): string {
  return createHmac('sha256', secreto()).update(`baja:${contactoId}`).digest('hex').slice(0, 32)
}

export function verificarBaja(contactoId: string, firma: string): boolean {
  try {
    const esperada = Buffer.from(firmarBaja(contactoId))
    const recibida = Buffer.from(firma ?? '')
    if (esperada.length !== recibida.length) return false
    return timingSafeEqual(esperada, recibida)
  } catch {
    return false
  }
}

export function enlaceDeBaja(sitioUrl: string, contactoId: string): string {
  return `${sitioUrl}/baja?id=${contactoId}&f=${firmarBaja(contactoId)}`
}

function comparaSeguro(esperado: string, recibido: string | null): boolean {
  const a = Buffer.from(esperado)
  const b = Buffer.from(recibido ?? '')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

/**
 * Para llamarlo a mano (pruebas). Se manda el encabezado `x-cron-secret`
 * con el valor `cron:<CRM_SECRET>`.
 */
export function cronAutorizado(encabezado: string | null): boolean {
  const s = process.env.CRM_SECRET
  if (!s) return false
  return comparaSeguro(`cron:${s}`, encabezado)
}

/**
 * Para el reloj automático de Vercel.
 *
 * Vercel llama solo, una vez al día, mandando `Authorization: Bearer <valor>`
 * donde el valor es su variable `CRON_SECRET`.
 *
 * Se compara contra `CRM_SECRET` a propósito: así Tony pone **el mismo valor**
 * que ya tiene, sin generar ni recordar otro secreto distinto.
 */
export function cronDeVercelAutorizado(encabezadoAuth: string | null): boolean {
  const s = process.env.CRM_SECRET
  if (!s) return false
  return comparaSeguro(`Bearer ${s}`, encabezadoAuth)
}
