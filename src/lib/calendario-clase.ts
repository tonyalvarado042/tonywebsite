import { CLASE, GRUPO } from '@/data/clase-copropiedad'

/**
 * Los enlaces para agregar la clase a cada calendario.
 *
 * Vive acá y no dentro de una página porque lo usan TRES lugares: los botones
 * de la página de gracias, el correo de confirmación y la ruta que sirve el
 * archivo `.ics`. Antes la función de Google estaba copiada en dos archivos, y
 * una fecha que cambia en un lado y no en el otro es exactamente el tipo de
 * error que nadie nota hasta que alguien llega tarde.
 *
 * ── Todo sale de un instante UTC ────────────────────────────────────────────
 * `CLASE.instanteUtc` es un momento exacto en el tiempo. Cada calendario lo
 * recibe en su propio formato pero apuntando al mismo instante, así que la
 * persona en Miami y la persona en La Fortuna terminan con la misma cita.
 */

const DURACION_MIN = 90

const inicio = () => new Date(CLASE.instanteUtc)
const fin = () => new Date(inicio().getTime() + DURACION_MIN * 60 * 1000)

/** `20261022T010000Z` — el formato compacto que piden Google, Yahoo e iCal. */
const compacto = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')

export const TITULO_EVENTO = `Clase en vivo: ${CLASE.nombre} — Tony Alvarado`

export const DESCRIPCION_EVENTO = [
  'Clase gratuita en vivo con Tony Alvarado.',
  '',
  'El enlace para entrar, los recordatorios y el material se comparten en el grupo de WhatsApp de la clase:',
  GRUPO.url,
].join('\n')

// ── Google ──────────────────────────────────────────────────────────────────

export function enlaceGoogle(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: TITULO_EVENTO,
    dates: `${compacto(inicio())}/${compacto(fin())}`,
    details: DESCRIPCION_EVENTO,
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// ── Outlook y Office 365 ────────────────────────────────────────────────────

/**
 * Los dos usan el mismo formato y se diferencian solo en el dominio:
 * `outlook.live.com` es la cuenta personal, `outlook.office.com` la del trabajo.
 * Se ofrecen los dos porque mandar a alguien con cuenta corporativa al dominio
 * personal lo deja mirando una pantalla de inicio de sesión que no es la suya.
 */
function enlaceOutlook(dominio: string): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: TITULO_EVENTO,
    startdt: inicio().toISOString(),
    enddt: fin().toISOString(),
    body: DESCRIPCION_EVENTO,
  })
  return `https://${dominio}/calendar/0/deeplink/compose?${params.toString()}`
}

export const enlaceOutlookPersonal = () => enlaceOutlook('outlook.live.com')
export const enlaceOffice365 = () => enlaceOutlook('outlook.office.com')

// ── Yahoo ───────────────────────────────────────────────────────────────────

export function enlaceYahoo(): string {
  const params = new URLSearchParams({
    v: '60',
    title: TITULO_EVENTO,
    st: compacto(inicio()),
    et: compacto(fin()),
    desc: DESCRIPCION_EVENTO,
  })
  return `https://calendar.yahoo.com/?${params.toString()}`
}

// ── El archivo .ics ─────────────────────────────────────────────────────────

/**
 * Escapa un texto para un campo TEXT de iCalendar (RFC 5545 §3.3.11).
 *
 * Las comas, los punto y coma y las barras invertidas son separadores dentro
 * del formato: sin escapar, un título con una coma parte el campo en dos y el
 * evento entra con el nombre cortado.
 */
function escapar(texto: string): string {
  return texto
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

/**
 * Parte las líneas a 75 octetos, como pide el RFC.
 *
 * ⚠️ Se cuenta en OCTETOS, no en caracteres: «ó» ocupa dos bytes en UTF-8. Si
 * se cortara por caracteres, una línea con tildes se pasaría del límite; y si
 * se cortara a ciegas por bytes, se podría partir un carácter a la mitad y el
 * archivo saldría con basura. Por eso se mide con TextEncoder.
 */
function plegar(linea: string): string {
  const enc = new TextEncoder()
  if (enc.encode(linea).length <= 75) return linea

  const salida: string[] = []
  let actual = ''
  let bytes = 0
  let primera = true

  for (const caracter of linea) {
    const n = enc.encode(caracter).length
    const tope = primera ? 75 : 74 // las continuaciones llevan un espacio adelante
    if (bytes + n > tope) {
      salida.push(actual)
      actual = ''
      bytes = 0
      primera = false
    }
    actual += caracter
    bytes += n
  }
  if (actual) salida.push(actual)

  return salida.map((l, i) => (i === 0 ? l : ' ' + l)).join('\r\n')
}

/**
 * El archivo de calendario. Sirve para Apple Calendar, Outlook de escritorio,
 * Thunderbird y en general cualquier cosa que lea un `.ics`.
 *
 * Lleva una alarma a una hora antes: es el recordatorio que no depende de que
 * nosotros mandemos nada.
 */
export function generarIcs(): string {
  const lineas = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tony Alvarado//Clase de copropiedad//ES',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${CLASE.slug}@tonyalvarado.com`,
    `DTSTAMP:${compacto(new Date())}`,
    `DTSTART:${compacto(inicio())}`,
    `DTEND:${compacto(fin())}`,
    `SUMMARY:${escapar(TITULO_EVENTO)}`,
    `DESCRIPTION:${escapar(DESCRIPCION_EVENTO)}`,
    `URL:${GRUPO.url}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:La clase empieza en una hora',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]

  // ⚠️ CRLF obligatorio: el RFC lo exige y hay clientes que con LF a secas
  // simplemente no importan el archivo, sin decir por qué.
  return lineas.map(plegar).join('\r\n') + '\r\n'
}
