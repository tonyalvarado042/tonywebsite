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
 * ⚠️ **Eso quedó viejo.** Medido de nuevo por DNS el 20 de septiembre de 2026,
 * las dos cosas que faltaban YA ESTÁN:
 *   · `_dmarc.tonyalvarado.com` → `v=DMARC1; p=none; rua=mailto:office@tonyalvarado.com`
 *   · `tonyalvarado.com` MX → `mx10/20/30.antispam.mailspamprotection.com`
 *
 * El MX importa para algo más que enviar: significa que **`office@tonyalvarado.com`
 * SÍ RECIBE correo**, que es lo que permite que sea el destino de los
 * formularios (abajo). Sin MX, mandar los leads ahí hubiera sido botarlos.
 *
 * El `p=none` del DMARC es modo observación: reporta pero no rechaza nada.
 * Endurecerlo a `quarantine` es decisión de Tony y se hace en el DNS, no acá.
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

/**
 * A qué bandeja llegan los leads de los formularios del sitio.
 *
 * ── Por qué está acá y no en Vercel ────────────────────────────────────────
 * Tony: «solo las llaves van en vercel, los correos van en código, total así
 * debe ser». Esto no es un secreto — es una dirección de su propio dominio.
 *
 * ── El día que se cayó ─────────────────────────────────────────────────────
 * El 20 de septiembre de 2026 el formulario de contacto devolvía 500 y
 * «No se pudo enviar el mensaje». La causa: `CONTACT_TO_EMAIL` no existía en
 * producción, y la ruta cortaba ahí mismo con «Configuración de destino no
 * disponible». Nadie se enteró de cuándo empezó: el sitio se veía perfecto y
 * el único síntoma era gente que escribía y nunca llegaba.
 *
 * Por eso ahora **el valor del código alcanza solo**. La variable de entorno
 * sigue pudiendo mandar (para una prueba, o si cambia la bandeja sin querer
 * tocar código), pero si no está NO PASA NADA: se usa esta. Un formulario de
 * captación no se puede caer porque falte una variable.
 *
 * ── Por qué office@ ────────────────────────────────────────────────────────
 * Verificado por DNS el 20-set-2026: `tonyalvarado.com` tiene MX, así que esta
 * casilla recibe de verdad. Además es la que ya usa el DMARC como `rua`.
 * Si Tony quiere los leads en otra bandeja, se cambia esta línea y ya.
 */
const DESTINO_OFICIAL = 'office@tonyalvarado.com'

/** La bandeja que recibe los leads. Nunca vacía. */
export const CORREO_DESTINO = (process.env.CONTACT_TO_EMAIL ?? '').trim() || DESTINO_OFICIAL

/** ¿El destino sale del código o de una variable? Lo reporta `/api/salud`. */
export function estadoDelDestino() {
  const puesta = (process.env.CONTACT_TO_EMAIL ?? '').trim()
  return {
    destino: CORREO_DESTINO,
    esElOficial: CORREO_DESTINO === DESTINO_OFICIAL,
    variablePuesta: puesta || '(sin poner — se usa el del código)',
  }
}

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
