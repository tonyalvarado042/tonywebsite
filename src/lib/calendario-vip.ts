import { VIP, GRUPO_VIP, hayGrupoVip } from '@/data/clase-copropiedad'
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

const inicio = () => new Date(VIP.instanteUtc)
const fin = () => new Date(VIP.instanteFinUtc)

export const TITULO_VIP = `${VIP.nombre} — Bike & Bed, La Fortuna`

/**
 * La dirección va en el cuerpo además de en `LOCATION` porque hay clientes de
 * calendario que no muestran el campo de ubicación en la vista de lista, y
 * alguien manejando a La Fortuna necesita leerla sin abrir el evento.
 */
export const LUGAR_VIP = `Bike and Bed Arenal — ${VIP.lugarTexto}`

export const DESCRIPCION_VIP = [
  'Encuentro presencial de Destino Owners VIP con Tony Alvarado y el equipo.',
  '',
  `Dónde: ${LUGAR_VIP}`,
  `Horario: ${VIP.horarioTexto}`,
  '',
  'Recorrido por Bike & Bed, visita a la obra de HUMAYA y sesión de preguntas',
  'con los fundadores.',
  '',
  'No incluye transporte a La Fortuna ni hospedaje.',
  ...(hayGrupoVip() ? ['', `Grupo de Destino Owners: ${GRUPO_VIP.url}`] : []),
].join('\n')

export function enlaceGoogleVip(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITULO_VIP,
    dates: `${compacto(inicio())}/${compacto(fin())}`,
    details: DESCRIPCION_VIP,
    location: LUGAR_VIP,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

function enlaceOutlookVip(dominio: string): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: TITULO_VIP,
    startdt: inicio().toISOString(),
    enddt: fin().toISOString(),
    body: DESCRIPCION_VIP,
    location: LUGAR_VIP,
  })
  return `https://${dominio}/calendar/0/action/compose?${params.toString()}`
}

export const enlaceOutlookVipPersonal = () => enlaceOutlookVip('outlook.live.com')
export const enlaceOffice365Vip = () => enlaceOutlookVip('outlook.office.com')

/**
 * El `.ics` del presencial.
 *
 * La alarma va a **un día antes**, no a una hora: a este hay que manejar hasta
 * La Fortuna. Un recordatorio a las 8 de la mañana del mismo día no le sirve a
 * nadie que salga de San José.
 */
export function generarIcsVip(): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tony Alvarado//Destino Owners VIP//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${VIP.slug}@tonyalvarado.com`,
    `DTSTAMP:${compacto(new Date())}`,
    `DTSTART:${compacto(inicio())}`,
    `DTEND:${compacto(fin())}`,
    `SUMMARY:${escapar(TITULO_VIP)}`,
    `DESCRIPTION:${escapar(DESCRIPCION_VIP)}`,
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
