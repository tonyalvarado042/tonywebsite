/**
 * El cálculo de las fechas del VIP. **Sin dependencias y sin I/O a propósito:**
 * así se puede probar con `node --test` sin base de datos, sin red y sin
 * alias de TypeScript.
 *
 * Lo que entra es un instante UTC y una duración; lo que sale son todos los
 * textos que la página necesita, ya en hora de Costa Rica. Quien lee el CRM es
 * `vip-ajustes.ts`, que llama acá.
 */

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

const ZONA = 'America/Costa_Rica'

const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
]
const MES_CORTO = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

/**
 * Las partes de una fecha **en hora de Costa Rica**, no en la del servidor.
 *
 * ⚠️ Esto importa de verdad: Vercel corre en UTC. Un `getDate()` a secas sobre
 * las 15:00Z del 18 de noviembre devolvería el 18 por casualidad, pero un
 * evento a las 7 p.m. CR cae al día siguiente en UTC y el sitio anunciaría la
 * fecha equivocada. Por eso todo pasa por `Intl` con la zona fija.
 */
function partesCr(d: Date) {
  const f = new Intl.DateTimeFormat('en-CA', {
    timeZone: ZONA,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    weekday: 'short',
  }).formatToParts(d)
  const p = (t: string) => f.find((x) => x.type === t)?.value ?? ''
  return {
    anno: Number(p('year')),
    mes: Number(p('month')),
    dia: Number(p('day')),
    hora: Number(p('hour')) % 24,
    minuto: Number(p('minute')),
    // El día de la semana se saca aparte para no depender del idioma del runtime.
    diaSemana: DIAS[
      new Date(
        Date.UTC(Number(p('year')), Number(p('month')) - 1, Number(p('day')))
      ).getUTCDay()
    ],
  }
}

/** «9:00 a.m.», «12 mediodía», «1:00 p.m.» */
function horaTexto(hora: number, minuto: number): string {
  if (hora === 12 && minuto === 0) return '12 mediodía'
  if (hora === 0 && minuto === 0) return 'medianoche'
  const sufijo = hora < 12 ? 'a.m.' : 'p.m.'
  const h12 = hora % 12 === 0 ? 12 : hora % 12
  return `${h12}:${String(minuto).padStart(2, '0')} ${sufijo}`
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
