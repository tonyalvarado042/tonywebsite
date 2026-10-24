/**
 * El cálculo de los textos de la clase. **Sin I/O a propósito:** se prueba con
 * `node --test` sin base de datos, sin red y sin alias de TypeScript.
 *
 * Entra un instante UTC y una duración; salen todos los textos que el sitio
 * necesita, ya en hora de Costa Rica. Quien lee el CRM es `clase-ajustes.ts`,
 * que llama acá. Es el mismo molde que `vip-fechas.ts`, y comparten la
 * conversión de zona en `fechas-cr.ts`.
 */
import { MESES, horaTexto, partesCr } from './fechas-cr.ts'

export type ConfigClase = {
  /**
   * ⚠️ Viaja al CRM como etiqueta `clase:<slug>`. Cambiarlo **parte la lista
   * en dos**: quien se registró antes queda con la etiqueta vieja. Al correr
   * la clase del 21 al 28 hubo que reetiquetar a 8 personas a mano.
   */
  slug: string
  nombre: string
  /** Instante de inicio en UTC. Es lo único que se guarda; el resto se deriva. */
  instanteUtc: string
  /** «Miércoles 28 de octubre» — sin año, que es como lo lee la página. */
  fechaTexto: string
  /** «7:00 p.m. Costa Rica» */
  horaTexto: string
  /** «80 minutos» */
  duracionTexto: string
  /** Dónde se transmite. No se deriva de nada: es copy. */
  plataformaTexto: string
  /** El grupo de WhatsApp donde se coordina todo. */
  grupoUrl: string
}

/**
 * Cuánto dura, en palabras.
 *
 * Siempre en minutos, incluso 120. Es feo decir «120 minutos» pudiendo decir
 * «2 horas», pero **predecible le gana a bonito** en un campo que Tony edita:
 * si el texto cambiara de forma al cruzar la hora, tendría que adivinar qué va
 * a salir publicado antes de guardar.
 */
function duracionTexto(min: number): string {
  return `${min} minutos`
}

export function derivarClase(
  instanteUtc: string,
  duracionMin: number,
  nombre: string,
  slug: string,
  grupoUrl: string,
  plataformaTexto: string
): ConfigClase {
  const inicio = new Date(instanteUtc)
  const i = partesCr(inicio)

  return {
    slug,
    nombre,
    instanteUtc: inicio.toISOString(),
    fechaTexto: `${i.diaSemana} ${i.dia} de ${MESES[i.mes - 1]}`,
    horaTexto: `${horaTexto(i.hora, i.minuto)} Costa Rica`,
    duracionTexto: duracionTexto(duracionMin),
    plataformaTexto,
    grupoUrl,
  }
}
