import type { EscenarioAirbnb, Resultado, Supuestos } from './calculadora-airbnb'

export const NUMERO_WHATSAPP_AIRBNB = '50664417867'
export const ORIGEN_WHATSAPP_AIRBNB = 'recursos/calculadora-airbnb'
export const LIMITE_URL_WHATSAPP = 4096

const MARCA_ARI = '[ARI:CALCULADORA_AIRBNB]'
const NOMBRE_POR_DEFECTO = 'visitante'
const MAX_CARACTERES_NOMBRE = 80
const ADVERTENCIA_WHATSAPP =
  'Estas cifras son estimaciones educativas, no una promesa de ingresos, ocupación, ' +
  'valorización ni retornos. Los supuestos deben validarse para cada proyecto.'

export type DatosMensajeWhatsApp = {
  nombre: string
  escenario: EscenarioAirbnb
  supuestos: Supuestos
  resultado: Resultado
}

export type EnlaceWhatsApp = {
  mensaje: string
  url: string
  compacto: boolean
  longitud: number
}

const nombreEscenario: Record<EscenarioAirbnb, string> = {
  conservador: 'Conservador',
  base: 'Base',
  optimista: 'Optimista',
}

function numeroSeguro(valor: number): number {
  return Number.isFinite(valor) ? valor : 0
}

function numero(valor: number, decimales = 2): string {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimales,
    minimumFractionDigits: 0,
  }).format(numeroSeguro(valor))
}

function dolares(valor: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(numeroSeguro(valor))
}

function porcentaje(valor: number): string {
  return `${numero(valor, 1)}%`
}

function multiplicador(valor: number): string {
  return `${numero(valor, 2)}x`
}

function dscr(valor: number): string {
  return Number.isFinite(valor) && valor > 20 ? 'Sin deuda' : multiplicador(valor)
}

function anios(valor: number): string {
  return Number.isFinite(valor) ? `${numero(valor, 1)} años` : 'No aplica'
}

/**
 * Conserva Unicode visible, pero evita que el nombre inyecte líneas o controles
 * en la estructura que posteriormente reconocerá Ari.
 */
export function sanitizarNombreWhatsApp(nombre: string): string {
  const limpio = String(nombre ?? '')
    // encodeURIComponent rechaza sustitutos UTF-16 aislados. Un nombre puede
    // llegar por un POST directo, aunque el navegador normal no los produzca.
    .replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, '\uFFFD')
    .normalize('NFKC')
    .replace(/[\p{Cc}\p{Cf}\p{Zl}\p{Zp}]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

  return Array.from(limpio).slice(0, MAX_CARACTERES_NOMBRE).join('') || NOMBRE_POR_DEFECTO
}

function encabezado(datos: DatosMensajeWhatsApp): string[] {
  return [
    `Hola, soy ${sanitizarNombreWhatsApp(datos.nombre)}.`,
    '',
    'Acabo de usar la calculadora Airbnb de Tony Alvarado y quiero orientación sobre mi proyecto.',
    '',
    MARCA_ARI,
    `Origen: ${ORIGEN_WHATSAPP_AIRBNB}`,
    `Escenario: ${nombreEscenario[datos.escenario]}`,
  ]
}

export function construirMensajeWhatsAppDetallado(datos: DatosMensajeWhatsApp): string {
  const { supuestos: s, resultado: r } = datos

  return [
    ...encabezado(datos),
    '',
    'PROPIEDAD',
    `- Terreno: ${numero(s.landArea)} m²`,
    `- Precio terreno: ${dolares(s.landPrice)}/m²`,
    `- Construcción: ${numero(s.buildArea)} m²`,
    `- Costo construcción: ${dolares(s.buildCost)}/m²`,
    `- Mobiliario/equipo: ${dolares(s.furniture)}`,
    `- Amenidades: ${dolares(s.amenities)}`,
    `- Diseño/permisos/estudios: ${dolares(s.permits)}`,
    `- Contingencia: ${porcentaje(s.contingency)}`,
    '',
    'OPERACIÓN',
    `- Unidades: ${numero(s.units)}`,
    `- Tarifa promedio: ${dolares(s.adr)}/noche`,
    `- Ocupación: ${porcentaje(s.occupancy)}`,
    `- Otros ingresos mensuales: ${dolares(s.extraMonthly)}`,
    `- Gastos operativos: ${porcentaje(s.opex)}`,
    `- Crecimiento anual: ${porcentaje(s.revenueGrowth)}`,
    '',
    'CAPITAL',
    `- Prima inicial simulada: ${porcentaje(s.downPayment)}`,
    `- Interés anual: ${porcentaje(s.interest)}`,
    `- Plazo: ${numero(s.term)} años`,
    `- Valorización del terreno: ${porcentaje(s.appreciation)}`,
    `- S&P 500 supuesto: ${porcentaje(s.sp500)}`,
    `- Nasdaq-100 supuesto: ${porcentaje(s.nasdaq)}`,
    `- Renta fija supuesto: ${porcentaje(s.fixedIncome)}`,
    '',
    'RESULTADOS DEL ESCENARIO',
    `- Costo total estimado: ${dolares(r.total)}`,
    `- Capital inicial estimado: ${dolares(r.capitalInicial)}`,
    `- Crédito estimado: ${dolares(r.credito)}`,
    `- Ingreso mensual: ${dolares(r.ingresoBruto)}`,
    `- Gastos operativos mensuales: ${dolares(r.gastos)}`,
    `- NOI mensual: ${dolares(r.noi)}`,
    `- Cuota estimada: ${dolares(r.cuota)}`,
    `- Flujo mensual estimado: ${dolares(r.flujoMensual)}`,
    `- Cap rate: ${porcentaje(r.capRate)}`,
    `- Ocupación de equilibrio: ${porcentaje(r.ocupacionEquilibrio)}`,
    `- Retorno sobre capital: ${porcentaje(r.retornoSobreCapital)}`,
    `- DSCR: ${dscr(r.dscr)}`,
    `- Recuperación estimada: ${anios(r.recuperacion)}`,
    '',
    ADVERTENCIA_WHATSAPP,
    '',
    'Quiero conocer las opciones de Tony que podrían ayudarme a avanzar.',
  ].join('\n')
}

export function construirMensajeWhatsAppCompacto(datos: DatosMensajeWhatsApp): string {
  const { supuestos: s, resultado: r } = datos

  return [
    ...encabezado(datos),
    '',
    'RESUMEN DEL PROYECTO',
    `- Terreno: ${numero(s.landArea)} m² a ${dolares(s.landPrice)}/m²`,
    `- Construcción: ${numero(s.buildArea)} m² a ${dolares(s.buildCost)}/m²`,
    `- Unidades: ${numero(s.units)}`,
    `- Tarifa promedio: ${dolares(s.adr)}/noche`,
    `- Ocupación: ${porcentaje(s.occupancy)}`,
    `- Prima inicial simulada: ${porcentaje(s.downPayment)}`,
    `- Interés/plazo: ${porcentaje(s.interest)} / ${numero(s.term)} años`,
    '',
    'RESULTADOS PRINCIPALES',
    `- Costo total estimado: ${dolares(r.total)}`,
    `- Capital inicial estimado: ${dolares(r.capitalInicial)}`,
    `- Ingreso mensual: ${dolares(r.ingresoBruto)}`,
    `- NOI mensual: ${dolares(r.noi)}`,
    `- Flujo mensual estimado: ${dolares(r.flujoMensual)}`,
    `- Retorno sobre capital: ${porcentaje(r.retornoSobreCapital)}`,
    `- DSCR: ${dscr(r.dscr)}`,
    '',
    ADVERTENCIA_WHATSAPP,
    '',
    'Quiero conocer las opciones de Tony que podrían ayudarme a avanzar.',
  ].join('\n')
}

export function construirUrlWhatsApp(mensaje: string): string {
  return `https://wa.me/${NUMERO_WHATSAPP_AIRBNB}?text=${encodeURIComponent(mensaje)}`
}

export function construirEnlaceWhatsApp(datos: DatosMensajeWhatsApp): EnlaceWhatsApp {
  const mensajeDetallado = construirMensajeWhatsAppDetallado(datos)
  const urlDetallada = construirUrlWhatsApp(mensajeDetallado)

  if (urlDetallada.length <= LIMITE_URL_WHATSAPP) {
    return {
      mensaje: mensajeDetallado,
      url: urlDetallada,
      compacto: false,
      longitud: urlDetallada.length,
    }
  }

  const mensajeCompacto = construirMensajeWhatsAppCompacto(datos)
  const urlCompacta = construirUrlWhatsApp(mensajeCompacto)

  return {
    mensaje: mensajeCompacto,
    url: urlCompacta,
    compacto: true,
    longitud: urlCompacta.length,
  }
}
