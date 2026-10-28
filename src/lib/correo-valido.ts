/**
 * ¿Sirve esta dirección de correo?
 *
 * Esto es sobre **validar lo que alguien escribe**. De qué dirección SALEN los
 * correos del sitio es otra cosa y vive en `correo.ts`.
 *
 * ── Por qué no es el regex de siempre ──────────────────────────────────────
 * El 19 de octubre de 2026, el primer envío de verdad por el CRM salió a 408
 * personas: **358 salieron y 50 cayeron en error**. Las 50 direcciones estaban
 * perfectas. La culpable era una sola, con un punto al final:
 *
 *     yerrojas2610@gmail.com.
 *
 * Resend rechaza el LOTE ENTERO si una sola dirección está mal — no manda las
 * buenas y descarta la mala. Como el lote es de 50, **un dedazo le costó el
 * correo a 49 personas buenas**.
 *
 * Y el regex de toda la vida, el que estaba en los catorce formularios del
 * sitio:
 *
 *     /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 *
 * **ACEPTA `gmail.com.`** El punto del final se cuela dentro del último grupo
 * `[^\s@]+`, que acepta puntos. Se ve correcto y no lo es.
 *
 * ── Esto es un ESPEJO, no una implementación nueva ─────────────────────────
 * La fuente de verdad es `crm_tony_alvarado.cta_correo_sirve(text)` en la base.
 * Acá se repiten sus comprobaciones, en el mismo orden, para poder rechazar en
 * el formulario con un mensaje decente en vez de dejar que reviente más
 * adentro.
 *
 * ⚠️ **Si una de las dos cambia, la otra tiene que cambiar el mismo día.** Dos
 * validaciones que no coinciden son peor que una: la de acá deja pasar algo que
 * la base rechaza, y la persona recibe un error feo en vez de un aviso claro.
 * `tests/correo.test.mjs` corre la misma lista de casos que se corrió en SQL, y
 * es lo que debería avisar si se separan.
 *
 * ── Lo que a propósito NO hace ─────────────────────────────────────────────
 * No comprueba que el dominio exista, ni que la casilla reciba. Eso no se sabe
 * sin preguntarle al servidor del otro lado, y un formulario no puede quedarse
 * esperando eso. Acá solo se ataja lo que **con seguridad** va a ser rechazado.
 */

/** El largo máximo de una dirección, según la especificación. */
export const LARGO_MAXIMO_CORREO = 254

export function correoSirve(valor: unknown): boolean {
  if (typeof valor !== 'string') return false
  const c = valor

  if (c.length > LARGO_MAXIMO_CORREO) return false
  // sin espacios a los lados (en SQL: `p_correo = btrim(p_correo)`)
  if (c !== c.trim()) return false
  // ni adentro
  if (/\s/.test(c)) return false
  // exactamente una arroba, con algo a cada lado
  if (!/^[^@]+@[^@]+$/.test(c)) return false
  // no termina en punto  ← el caso que costó 49 correos
  if (/\.$/.test(c)) return false
  // ni empieza
  if (/^\./.test(c)) return false
  // sin dos puntos seguidos
  if (/\.\./.test(c)) return false
  // sin punto pegado antes de la arroba
  if (/\.@/.test(c)) return false
  // ni después
  if (/@\./.test(c)) return false

  const [local, dominio] = c.split('@')
  // el dominio tiene al menos un punto
  if (!dominio.includes('.')) return false
  // el largo de la parte local
  if (local.length < 1 || local.length > 64) return false

  return true
}

/**
 * Lo que se guarda, a partir de lo que la persona escribió.
 *
 * Recorta los espacios de los lados y baja a minúsculas. Va aparte de
 * `correoSirve` a propósito: **primero se limpia, después se valida**. Si se
 * validara el texto crudo, « juan@gmail.com » se rechazaría por un espacio que
 * el sistema sabe quitar, y la persona no entendería qué hizo mal.
 */
export function normalizarCorreo(valor: unknown): string {
  return typeof valor === 'string' ? valor.trim().toLowerCase() : ''
}
