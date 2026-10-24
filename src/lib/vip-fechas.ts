/**
 * El cálculo de las fechas del VIP. **Sin I/O a propósito:** así se puede
 * probar con `node --test` sin base de datos, sin red y sin alias de
 * TypeScript.
 *
 * Lo que entra es un instante UTC y una duración; lo que sale son todos los
 * textos que la página necesita, ya en hora de Costa Rica. Quien lee el CRM es
 * `vip-ajustes.ts`, que llama acá.
 *
 * La conversión a hora de Costa Rica vive en `fechas-cr.ts`, compartida con la
 * clase: dos copias de esa lógica se separan con el tiempo.
 */
import { MESES, MES_CORTO, horaTexto, partesCr } from './fechas-cr.ts'

export type ConfigVip = {
  /** Instante de inicio y de fin, en UTC. */
  instanteUtc: string
  instanteFinUtc: string
  /** «Miércoles 18 de noviembre de 2026» */
  fechaTexto: string
  /** «Miércoles 18» — primera línea del boleto. */
  fechaCorta: string
  /** «de noviembre» — segunda línea del boleto. */
  fechaCortaMes: string
  /** «18 NOV 2026» — la banda del boleto cuando no hay cupos que mostrar. */
  fechaBoleto: string
  /** «de 9:00 a.m. a 12 mediodía» */
  horarioTexto: string
  /** «9:00 a.m. a 12 mediodía» */
  horarioCorto: string
  /** Vacío = el botón de compra no se dibuja. */
  enlacePago: string
  /** Vacío = la banda no menciona cantidad. */
  cuposTexto: string
  precioNumero: string
  /** «US$97 por persona» */
  precioTexto: string
  /** Para el UID del `.ics`: `vip-18-nov-2026`. */
  slug: string
}

export function derivarVip(
  instanteUtc: string,
  duracionMin: number,
  enlacePago: string,
  cuposTexto: string,
  precioNumero: string
): ConfigVip {
  const inicio = new Date(instanteUtc)
  const fin = new Date(inicio.getTime() + duracionMin * 60 * 1000)
  const i = partesCr(inicio)
  const f = partesCr(fin)

  const desde = horaTexto(i.hora, i.minuto)
  const hasta = horaTexto(f.hora, f.minuto)

  return {
    instanteUtc: inicio.toISOString(),
    instanteFinUtc: fin.toISOString(),
    fechaTexto: `${i.diaSemana} ${i.dia} de ${MESES[i.mes - 1]} de ${i.anno}`,
    fechaCorta: `${i.diaSemana} ${i.dia}`,
    fechaCortaMes: `de ${MESES[i.mes - 1]}`,
    fechaBoleto: `${i.dia} ${MES_CORTO[i.mes - 1]} ${i.anno}`,
    horarioTexto: `de ${desde} a ${hasta}`,
    horarioCorto: `${desde} a ${hasta}`,
    enlacePago,
    cuposTexto,
    precioNumero,
    precioTexto: `US$${precioNumero} por persona`,
    slug: `vip-${i.dia}-${MES_CORTO[i.mes - 1].toLowerCase()}-${i.anno}`,
  }
}
