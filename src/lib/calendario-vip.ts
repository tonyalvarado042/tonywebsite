import { VIP, GRUPO_VIP, hayGrupoVip } from '@/data/clase-copropiedad'
import type { ConfigVip } from '@/lib/vip-ajustes'
import { compacto, escapar, plegar } from '@/lib/calendario-clase'

/**
 * Los enlaces de calendario del encuentro presencial del VIP.
 *
 * Vive aparte de `calendario-clase` porque son dos eventos distintos: la clase
 * es en vivo por internet y dura 80 minutos; esto es presencial en La Fortuna
 * y dura tres horas. Mezclarlos en una sola función obligaría a pasar banderas
 * por todos lados.
 *
 * Lo que SÍ se comparte son las tres piezas difíciles del `.ics` —el formato
 * compacto, el escapado y el plegado a 75 octetos—, que se importan de
 * `calendario-clase` en vez de volver a escribirse. Esa duplicación es
 * exactamente la que ya causó un problema en este repo.
 */

/**
 * ⚠️ La fecha ya **no vive en el código**: llega como parámetro desde
 * `leerVip()`, que la saca del CRM. Así un lanzamiento nuevo es cambiar un
 * campo en la base, no tocar este archivo. Ver `lib/vip-ajustes.ts`.
 */
const inicio = (v: ConfigVip) => new Date(v.instanteUtc)
const fin = (v: ConfigVip) => new Date(v.instanteFinUtc)

export const TITULO_VIP = `${VIP.nombre} — Bike & Bed, La Fortuna`

/**
 * La dirección va en el cuerpo además de en `LOCATION` porque hay clientes de
 * calendario que no muestran el campo de ubicación en la vista de lista, y
 * alguien manejando a La Fortuna necesita leerla sin abrir el evento.
 */
export const LUGAR_VIP = `Bike and Bed Arenal — ${VIP.lugarTexto}`

export const descripcionVip = (v: ConfigVip) => [
  'Encuentro presencial de Destino Owners VIP con Tony Alvarado y el equipo.',
  '',
  `Dónde: ${LUGAR_VIP}`,
  `Horario: ${v.horarioTexto}`,
  '',
  'Recorrido por Bike & Bed, visita a la obra de HUMAYA y sesión de preguntas',
  'con los fundadores.',
  '',
  'No incluye transporte a La Fortuna ni hospedaje.',
  ...(hayGrupoVip() ? ['', `Grupo de Destino Owners: ${GRUPO_VIP.url}`] : []),
].join('\n')

export function enlaceGoogleVip(v: ConfigVip): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITULO_VIP,
    dates: `${compacto(inicio(v))}/${compacto(fin(v))}`,
    details: descripcionVip(v),
    location: LUGAR_VIP,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function enlaceOutlookVip(dominio: string, v: ConfigVip): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: TITULO_VIP,
    startdt: inicio(v).toISOString(),
    enddt: fin(v).toISOString(),
    body: descripcionVip(v),
    location: LUGAR_VIP,
  })
  return `https://${dominio}/calendar/0/action/compose?${params.toString()}`
}

export const enlaceOutlookVipPersonal = (v: ConfigVip) => enlaceOutlookVip('outlook.live.com', v)
export const enlaceOffice365Vip = (v: ConfigVip) => enlaceOutlookVip('outlook.office.com', v)

/**
 * El `.ics` del presencial.
 *
 * La alarma va a **un día antes**, no a una hora: a este hay que manejar hasta
 * La Fortuna. Un recordatorio a las 8 de la mañana del mismo día no le sirve a
 * nadie que salga de San José.
 */
export function generarIcsVip(v: ConfigVip): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tony Alvarado//Destino Owners VIP//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${v.slug}@tonyalvarado.com`,
    `DTSTAMP:${compacto(new Date())}`,
    `DTSTART:${compacto(inicio(v))}`,
    `DTEND:${compacto(fin(v))}`,
    `SUMMARY:${escapar(TITULO_VIP)}`,
    `DESCRIPTION:${escapar(descripcionVip(v))}`,
    `LOCATION:${escapar(LUGAR_VIP)}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Mañana es el encuentro de Destino Owners VIP en La Fortuna',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  // CRLF obligatorio: hay clientes que con LF a secas no importan el archivo.
  return lineas.map(plegar).join('\r\n') + '\r\n'
}
