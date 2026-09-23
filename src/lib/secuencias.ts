import { createHmac, timingSafeEqual } from 'crypto'
import { getCrm } from '@/lib/crm'

/**
 * Frenos y firmas de las automatizaciones.
 *
 * ⚠️ El CONTENIDO de los correos ya NO vive acá: está en el CRM, en
 * `cta_automatizaciones` + `cta_automatizacion_pasos`, para que Tony los edite
 * sin tocar código. Este archivo solo guarda lo que debe vivir en el servidor:
 * los frenos y la firma de los enlaces.
 */

// ── Freno general ───────────────────────────────────────────────

/**
 * Interruptor maestro. **Viene apagado.**
 *
 * ⚠️ Vive en el CRM, en `cta_ajustes.envios_automaticos`, NO en una variable
 * de entorno. Lo cambió Tony el 20-sep-2026:
 *
 *   «No veo por qué deba salir del sistema para esto. No quiero estar
 *    entrando a Vercel.»
 *
 * La regla que quedó: **los secretos van en Vercel, las decisiones van en el
 * CRM.** Encender los envíos es una decisión suya, no un secreto.
 *
 * Si la consulta falla, devuelve `false`. Que un problema de base apague los
 * envíos es molesto; que los encienda sería grave.
 */
export async function secuenciasActivas(): Promise<boolean> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'envios_automaticos')
      .maybeSingle()

    if (error) {
      console.error('[secuencias] no se pudo leer el interruptor:', error.message)
      return false
    }
    return data?.valor === 'si'
  } catch (e) {
    console.error('[secuencias] no se pudo leer el interruptor:', e)
    return false
  }
}

/** Para prenderlo o apagarlo desde el sitio. Devuelve cómo quedó. */
export async function cambiarSecuencias(encendido: boolean): Promise<boolean> {
  const { error } = await getCrm()
    .from('cta_ajustes')
    .update({ valor: encendido ? 'si' : 'no', actualizado_el: new Date().toISOString() })
    .eq('clave', 'envios_automaticos')
  if (error) throw new Error(`No se pudo cambiar el interruptor: ${error.message}`)
  return encendido
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

// ── La cadena de la clase ───────────────────────────────────────────────────

/**
 * Qué automatización recibe a quien se registra a la clase.
 *
 * Vive en `cta_ajustes.automatizacion_clase`, no en el código ni en Vercel, por
 * la misma regla de arriba: **los secretos van en Vercel, las decisiones van en
 * el CRM.** Así Tony puede cambiar de cadena —o dejar de mandar correos, con
 * borrar el valor— sin desplegar nada.
 *
 * Devuelve `null` si no está puesta o si la consulta falla. Que nadie entre a
 * la cadena es molesto; meter gente en una cadena equivocada es peor.
 */
export async function automatizacionDeLaClase(): Promise<string | null> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'automatizacion_clase')
      .maybeSingle()

    if (error) {
      console.error('[secuencias] no se pudo leer la cadena de la clase:', error.message)
      return null
    }
    const valor = (data?.valor ?? '').trim()
    return valor || null
  } catch (e) {
    console.error('[secuencias] no se pudo leer la cadena de la clase:', e)
    return null
  }
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
