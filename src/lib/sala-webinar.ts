/**
 * La lógica de la sala del webinar pregrabado. **Sin I/O a propósito:** se
 * prueba con `node --test` sin base de datos, sin red y sin reloj real.
 *
 * Tony, 1 de noviembre de 2026: «vamos a hacer la primera prueba de un
 * webinar pregrabado para ver cómo funciona […] simplemente va a ver un
 * contador ahí y va a lanzarse todo lo que es el webinar».
 *
 * ── Lo que hace que se sienta en vivo ───────────────────────────────────
 * **El video NO arranca en cero.** Arranca en el segundo que corresponde
 * según el reloj: quien entra a las 7:12 ve el minuto 12, igual que si
 * llegara tarde a una sala de verdad. Si arrancara en cero, dos personas
 * verían cosas distintas al mismo tiempo y el chat no cuadraría con nada.
 *
 * Acá vive ese cálculo y nada más. Quién entró, qué se dijo y cuándo sale
 * del CRM; el reproductor y el chat lo dibuja la página.
 */

/** Los cuatro momentos de una sala. */
export type Estado =
  /** Falta mucho: solo el contador. */
  | 'antes'
  /** Ya se puede entrar, pero no empezó: contador fino y el chat abierto. */
  | 'puerta'
  /** Corriendo. */
  | 'envivo'
  /** Terminó. */
  | 'despues'

export type Sala = {
  /** Cuándo empieza, en UTC. */
  instanteUtc: string
  /** Cuánto dura la clase, en minutos. */
  duracionMin: number
  /** Cuántos minutos antes se abre la puerta. */
  puertaMin: number
}

const MIN = 60_000

/**
 * En qué momento está la sala.
 *
 * ⚠️ `ahora` entra como parámetro y no se lee de `Date.now()` adentro: sin
 * eso no hay forma de probar «faltan dos horas» sin esperar dos horas.
 */
export function estadoDeLaSala(sala: Sala, ahora: Date): Estado {
  const inicio = new Date(sala.instanteUtc).getTime()
  const fin = inicio + sala.duracionMin * MIN
  const puerta = inicio - sala.puertaMin * MIN
  const t = ahora.getTime()

  if (t >= fin) return 'despues'
  if (t >= inicio) return 'envivo'
  if (t >= puerta) return 'puerta'
  return 'antes'
}

/**
 * En qué segundo del video hay que poner la aguja.
 *
 * Antes de empezar es 0. Después del final se queda en el último segundo, no
 * sigue creciendo: si no, el reproductor pediría un segundo que no existe.
 */
export function segundoDelVideo(sala: Sala, ahora: Date): number {
  const inicio = new Date(sala.instanteUtc).getTime()
  const transcurrido = Math.floor((ahora.getTime() - inicio) / 1000)
  if (transcurrido <= 0) return 0
  return Math.min(transcurrido, sala.duracionMin * 60)
}

/** Cuántos milisegundos faltan para que empiece. 0 si ya empezó. */
export function faltaPara(sala: Sala, ahora: Date): number {
  return Math.max(0, new Date(sala.instanteUtc).getTime() - ahora.getTime())
}

/**
 * «2 h 14 min» · «14 min 30 s» · «ya empieza»
 *
 * Cambia de forma según cuánto falta porque a dos horas los segundos no le
 * importan a nadie, y a dos minutos sí.
 */
export function faltaTexto(ms: number): string {
  if (ms <= 0) return 'ya empieza'
  const s = Math.floor(ms / 1000)
  const dias = Math.floor(s / 86400)
  const horas = Math.floor((s % 86400) / 3600)
  const min = Math.floor((s % 3600) / 60)
  const seg = s % 60

  if (dias > 0) return `${dias} ${dias === 1 ? 'día' : 'días'} ${horas} h`
  if (horas > 0) return `${horas} h ${min} min`
  if (min > 0) return `${min} min ${seg} s`
  return `${seg} s`
}

/**
 * Cómo se llama alguien en el chat.
 *
 * Tony: «sale como user y le pone un número, por ejemplo user 1765».
 *
 * ⚠️ El nombre escrito gana, pero **el número no desaparece**: si solo se
 * mostrara el nombre, dos personas podrían ponerse el mismo y el chat se
 * volvería confuso justo cuando más se está mirando.
 */
export function comoSeLlama(nombre: string | null | undefined, numero: number): string {
  const n = (nombre ?? '').trim()
  return n ? n : `user ${numero}`
}

/**
 * Los mensajes que YA se dijeron, ordenados, listos para pintar.
 *
 * ⚠️ Esto es lo único que la sala le manda al navegador. El guion completo
 * **no sale nunca**: si saliera, cualquiera abre las herramientas de
 * desarrollo y ve los ciento y pico de comentarios con su segundo exacto, y
 * queda a la vista que la sala está escrita.
 */
export type Comentario = {
  id: string
  segundo: number
  autor: string
  texto: string
  respondeA?: string | null
  /** `true` si lo escribió alguien de verdad, ahora. */
  deVerdad?: boolean
}

export function loQueYaSeDijo(
  guion: Comentario[],
  mensajes: Comentario[],
  hastaElSegundo: number
): Comentario[] {
  return [...guion, ...mensajes]
    .filter((c) => c.segundo <= hastaElSegundo)
    .sort((a, b) => (a.segundo - b.segundo) || a.id.localeCompare(b.id))
}

/**
 * ¿Ya toca enseñar el botón de aplicar?
 *
 * Null en `ctaSegundo` quiere decir «todavía no se definió», y entonces no
 * sale nunca. Tony todavía no decide si vende inversión, asesoría o el curso
 * de Airbnb, y un botón a medio llenar es peor que ninguno.
 */
export function toca(ctaSegundo: number | null | undefined, segundoActual: number): boolean {
  return typeof ctaSegundo === 'number' && ctaSegundo >= 0 && segundoActual >= ctaSegundo
}
