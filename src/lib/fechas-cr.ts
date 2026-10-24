/**
 * Las fechas en hora de Costa Rica. **Sin dependencias y sin I/O a propósito:**
 * así se prueba con `node --test` sin base de datos, sin red y sin alias.
 *
 * ── Por qué existe este archivo ────────────────────────────────────────────
 * Esta lógica nació dentro de `vip-fechas.ts`. Cuando la clase también pasó a
 * leerse del CRM hizo falta lo mismo, y **dos copias de una conversión de zona
 * horaria son dos copias que se van a separar**: alguien arregla un borde en
 * una y la otra sigue mal durante meses, sin tirar ningún error.
 *
 * Una sola implementación, dos usuarios: `vip-fechas.ts` y `clase-fechas.ts`.
 */

export const ZONA = 'America/Costa_Rica'

export const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
]
export const MES_CORTO = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SET', 'OCT', 'NOV', 'DIC']
export const DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

/**
 * Las partes de una fecha **en hora de Costa Rica**, no en la del servidor.
 *
 * ⚠️ Esto importa de verdad: Vercel corre en UTC. Un `getDate()` a secas sobre
 * las 15:00Z del 18 de noviembre devolvería el 18 por casualidad, pero un
 * evento a las 7 p.m. CR cae al día siguiente en UTC y el sitio anunciaría la
 * fecha equivocada. Por eso todo pasa por `Intl` con la zona fija.
 */
export function partesCr(d: Date) {
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
export function horaTexto(hora: number, minuto: number): string {
  if (hora === 12 && minuto === 0) return '12 mediodía'
  if (hora === 0 && minuto === 0) return 'medianoche'
  const sufijo = hora < 12 ? 'a.m.' : 'p.m.'
  const h12 = hora % 12 === 0 ? 12 : hora % 12
  return `${h12}:${String(minuto).padStart(2, '0')} ${sufijo}`
}
