/**
 * De qué dirección salen los correos del sitio.
 *
 * **`office@tonyalvarado.com`** — lo pidió Tony el 9 de septiembre de 2026.
 * Antes era `tony@tonyalvarado.com`, pero esa es su dirección personal y no
 * debe ser la que manda los automáticos del sitio.
 *
 * Va en el código y no en una variable de entorno porque **no es un secreto**:
 * es una dirección pública que conviene tener a la vista y en el historial, no
 * escondida en un panel donde nadie sabe qué dice.
 *
 * ── El bug que esto arregla ─────────────────────────────────────────────────
 * Antes acá había:
 *
 *     process.env.CONTACT_FROM_EMAIL || 'tony@tonyalvarado.com'
 *
 * Con ese `||`, **cualquier cosa que estuviera en la variable ganaba en
 * silencio**. En algún momento se puso el remitente de pruebas de Resend
 * (`onboarding@resend.dev`) para poder mandar antes de verificar el dominio, y
 * desde entonces los correos salían desde ahí. `resend.dev` es un dominio
 * COMPARTIDO: no alinea con `tonyalvarado.com`, no lo firma el DKIM de Tony, y
 * **cae en spam**. Nadie se enteraba porque el envío sí funcionaba.
 *
 * Ahora la variable **solo puede sobreescribir con un dominio propio**.
 * Cualquier otra cosa se ignora y se grita en el registro. Si de verdad hace
 * falta mandar desde un dominio ajeno (una prueba, una emergencia), hay que
 * ponerlo a propósito con `CONTACT_FROM_FORZAR=si` — que no pasa por accidente.
 *
 * ── El estado del dominio, medido el 9 de septiembre de 2026 ────────────────
 * `tonyalvarado.com` **SÍ está listo para enviar por Resend**. Verificado por
 * DNS, no supuesto:
 *   · `resend._domainkey.tonyalvarado.com` → la llave DKIM publicada
 *   · `send.tonyalvarado.com` TXT → el SPF de Resend
 *   · `send.tonyalvarado.com` MX → `feedback-smtp.us-east-1.amazonses.com`
 *
 * ⚠️ **Pero NO hay DMARC** (`_dmarc.tonyalvarado.com` no existe) y el dominio
 * raíz **no tiene MX**. Las dos cosas son de DNS y las tiene que poner Tony;
 * ninguna se arregla desde acá. Sin DMARC, Gmail manda a spam mucho más fácil
 * aunque el remitente y la firma estén bien.
 */

/** La dirección desde la que sale todo el correo automático del sitio. */
const REMITENTE_OFICIAL = 'office@tonyalvarado.com'

/**
 * Los dominios de Tony. Solo desde estos se permite mandar.
 *
 * Si algún día se suma un dominio nuevo (por ejemplo el de Bike & Bed), va acá
 * — y hay que verificarlo en Resend antes, o los envíos van a fallar.
 */
const DOMINIOS_PROPIOS = ['tonyalvarado.com', 'puromtb.com']

function dominioDe(direccion: string): string {
  // Acepta tanto «algo@dominio.com» como «Nombre <algo@dominio.com>».
  const limpia = direccion.includes('<')
    ? direccion.slice(direccion.indexOf('<') + 1, direccion.indexOf('>'))
    : direccion
  return (limpia.split('@')[1] ?? '').trim().toLowerCase()
}

/** Devuelve true si la dirección es de un dominio de Tony. */
export function esDominioPropio(direccion: string): boolean {
  return DOMINIOS_PROPIOS.includes(dominioDe(direccion))
}

function elegirRemitente(): string {
  const puesta = (process.env.CONTACT_FROM_EMAIL ?? '').trim()
  if (!puesta) return REMITENTE_OFICIAL

  if (esDominioPropio(puesta)) return puesta

  // La escotilla de emergencia: a propósito, nunca por accidente.
  if (process.env.CONTACT_FROM_FORZAR === 'si') {
    console.warn(
      `[correo] CONTACT_FROM_EMAIL="${puesta}" es de un dominio ajeno, pero ` +
        'CONTACT_FROM_FORZAR=si lo permite. Ese correo probablemente caiga en spam.'
    )
    return puesta
  }

  console.error(
    `[correo] ⚠️ CONTACT_FROM_EMAIL="${puesta}" SE IGNORA: no es un dominio de Tony ` +
      `(${DOMINIOS_PROPIOS.join(', ')}). Mandar desde un dominio ajeno cae en spam. ` +
      `Se usa ${REMITENTE_OFICIAL}. Si de verdad lo querés, poné CONTACT_FROM_FORZAR=si.`
  )
  return REMITENTE_OFICIAL
}

export const CORREO_REMITENTE = elegirRemitente()

/** Con nombre, como lo ve quien recibe: «Tony Alvarado <office@…>» */
export const REMITENTE_CON_NOMBRE = `Tony Alvarado <${CORREO_REMITENTE}>`

/**
 * ¿Está el remitente como debe? Lo usa `/api/salud` para que esto se pueda
 * diagnosticar sin adivinar y sin entrar a mirar el panel de Vercel.
 */
export function estadoDelRemitente() {
  const puesta = (process.env.CONTACT_FROM_EMAIL ?? '').trim()
  return {
    remitente: CORREO_REMITENTE,
    esElOficial: CORREO_REMITENTE === REMITENTE_OFICIAL,
    dominioPropio: esDominioPropio(CORREO_REMITENTE),
    variablePuesta: puesta || '(sin poner — se usa el del código)',
    ignorada: Boolean(puesta) && puesta !== CORREO_REMITENTE,
  }
}
