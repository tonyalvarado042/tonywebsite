import { createHmac, timingSafeEqual } from 'crypto'

/**
 * La secuencia de calentamiento: 5 correos después de que alguien pide un
 * recurso gratis.
 *
 * ⚠️ ESTADO: la PLOMERÍA está lista y probada; los TEXTOS son de relleno.
 * Tony decidió (28-ago-2026) armar el sistema primero y escribir el contenido
 * después. Mientras `asunto`/`cuerpo` digan [BORRADOR], **no se manda nada**:
 * lo impide `secuenciasActivas()` más el guardarraíl de `esBorrador()`.
 */

// ── El freno ────────────────────────────────────────────────────────────────

/**
 * Interruptor general. **Viene apagado.** Para prender la secuencia hay que
 * poner `SECUENCIAS_ACTIVAS=si` en Vercel — a propósito: la regla de Tony es
 * que ningún envío masivo sale sin que él vea la prueba y dé el OK.
 */
export function secuenciasActivas(): boolean {
  return process.env.SECUENCIAS_ACTIVAS === 'si'
}

// ── Definición ──────────────────────────────────────────────────────────────

export type CorreoSecuencia = {
  /** Número de correo, 1 a 5. */
  paso: number
  /** Días después del registro en que toca mandarlo. */
  diaRelativo: number
  asunto: string
  /** Texto plano. Se convierte a HTML al enviar. */
  cuerpo: string
}

/**
 * ⚠️ TEXTOS DE RELLENO — no son de Tony y no deben salir así.
 *
 * Cuando se escriban los definitivos, respetar el vocabulario de cumplimiento
 * SUGEVAL de la nota `copropiedad-como-la-vendo`:
 *   SE DICE: copropiedad · fracción · acción · co-dueño · «el activo factura»
 *   PROHIBIDO: rendimiento · retorno · ROI · utilidad · ganancia ·
 *              inversión garantizada · cualquier promesa de retorno personal
 */
export const SECUENCIA: CorreoSecuencia[] = [
  { paso: 1, diaRelativo: 2,  asunto: '[BORRADOR] Correo 1', cuerpo: '[BORRADOR] Pendiente de escribir.' },
  { paso: 2, diaRelativo: 4,  asunto: '[BORRADOR] Correo 2', cuerpo: '[BORRADOR] Pendiente de escribir.' },
  { paso: 3, diaRelativo: 7,  asunto: '[BORRADOR] Correo 3', cuerpo: '[BORRADOR] Pendiente de escribir.' },
  { paso: 4, diaRelativo: 11, asunto: '[BORRADOR] Correo 4', cuerpo: '[BORRADOR] Pendiente de escribir.' },
  { paso: 5, diaRelativo: 16, asunto: '[BORRADOR] Correo 5', cuerpo: '[BORRADOR] Pendiente de escribir.' },
]

/** Guardarraíl: un correo de relleno NUNCA sale, aunque el freno esté quitado. */
export function esBorrador(correo: CorreoSecuencia): boolean {
  return correo.asunto.includes('[BORRADOR]') || correo.cuerpo.includes('[BORRADOR]')
}

export function correoDelPaso(paso: number): CorreoSecuencia | undefined {
  return SECUENCIA.find((c) => c.paso === paso)
}

// ── Estado dentro de la secuencia ───────────────────────────────────────────
// Se guarda en las columnas que ya existían: `proximo_paso` y `proximo_paso_el`.
// No hizo falta tabla nueva.

const PREFIJO = 'secuencia'

export function marcaDePaso(recursoSlug: string, paso: number): string {
  return `${PREFIJO}:${recursoSlug}:${paso}`
}

export function leerMarca(valor: string | null): { slug: string; paso: number } | null {
  if (!valor?.startsWith(`${PREFIJO}:`)) return null
  const partes = valor.split(':')
  if (partes.length !== 3) return null
  const paso = Number(partes[2])
  if (!Number.isInteger(paso) || paso < 1) return null
  return { slug: partes[1], paso }
}

/** Fecha (YYYY-MM-DD) en que toca el paso, contando desde el registro. */
export function fechaDelPaso(desde: Date, paso: number): string | null {
  const correo = correoDelPaso(paso)
  if (!correo) return null
  const f = new Date(desde)
  f.setUTCDate(f.getUTCDate() + correo.diaRelativo)
  return f.toISOString().slice(0, 10)
}

// ── Enlace de baja ──────────────────────────────────────────────────────────

/**
 * Token firmado para el enlace de "no quiero más correos".
 *
 * El id del contacto ya es un UUID inadivinable, pero se firma igual para que
 * nadie pueda dar de baja a otro probando ids. Se usa `CRM_SECRET` con un
 * prefijo de dominio ('baja:') para no mezclar propósitos con el cron.
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

/** Compara el secreto del cron sin filtrar información por tiempo. */
export function cronAutorizado(encabezado: string | null): boolean {
  const s = process.env.CRM_SECRET
  if (!s) return false
  const a = Buffer.from(`cron:${s}`)
  const b = Buffer.from(encabezado ?? '')
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
