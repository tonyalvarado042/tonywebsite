/**
 * De qué dirección salen los correos del sitio.
 *
 * Tony lo pidió el 29-ago-2026: `tony@tonyalvarado.com`.
 *
 * Va en el código y no en una variable de entorno porque **no es un secreto**:
 * es una dirección pública que conviene tener a la vista y en el historial, no
 * escondida en un panel donde nadie sabe qué dice.
 *
 * `CONTACT_FROM_EMAIL` sigue funcionando y manda por encima de esto, por si
 * hay que cambiarla de urgencia sin desplegar.
 *
 * ⚠️ REQUISITO: el dominio `tonyalvarado.com` tiene que estar VERIFICADO en
 * Resend (resend.com → Domains, con sus registros DNS en GoDaddy). Si no lo
 * está, Resend rechaza el envío y los correos no salen.
 * Mientras no lo esté, poner `CONTACT_FROM_EMAIL=onboarding@resend.dev` en
 * Vercel para volver al remitente de pruebas.
 */
export const CORREO_REMITENTE =
  process.env.CONTACT_FROM_EMAIL || 'tony@tonyalvarado.com'

/** Con nombre, como lo ve quien recibe: «Tony Alvarado <tony@…>» */
export const REMITENTE_CON_NOMBRE = `Tony Alvarado <${CORREO_REMITENTE}>`
