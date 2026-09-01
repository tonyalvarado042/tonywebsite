/**
 * La matemática de la calculadora de Airbnb.
 *
 * Está aparte de React a propósito: los MISMOS números tienen que salir en la
 * pantalla y en el informe que se manda por correo. Si esto viviera dentro del
 * componente, el correo tendría que recalcular por su lado y tarde o temprano
 * los dos dirían cosas distintas.
 *
 * Las fórmulas se copiaron una a una de la calculadora que Tony ya tenía
 * publicada en `destino-rentable.tonyalvaradocr.chatgpt.site`. No se cambió
 * ningún supuesto ni ningún valor por defecto: él pidió que fuera igual.
 *
 * ⚠️ Nada de esto es una promesa de rendimiento. Es un modelo educativo.
 * El texto de advertencia va en `ADVERTENCIA` y acompaña todo resultado.
 */

export type Supuestos = {
  // Propiedad
  landArea: number
  landPrice: number
  buildArea: number
  buildCost: number
  furniture: number
  amenities: number
  permits: number
  contingency: number
  // Operación
  units: number
  adr: number
  occupancy: number
  extraMonthly: number
  opex: number
  revenueGrowth: number
  // Capital
  downPayment: number
  interest: number
  term: number
  appreciation: number
  sp500: number
  nasdaq: number
  fixedIncome: number
}

export const SUPUESTOS_BASE: Supuestos = {
  landArea: 600,
  landPrice: 75,
  buildArea: 80,
  buildCost: 1000,
  furniture: 15000,
  amenities: 12000,
  permits: 8000,
  contingency: 10,
  units: 1,
  adr: 180,
  occupancy: 75,
  extraMonthly: 700,
  opex: 42,
  downPayment: 35,
  interest: 9,
  term: 20,
  appreciation: 5,
  revenueGrowth: 3,
  sp500: 10,
  nasdaq: 12,
  fixedIncome: 5,
}

/** Los tres escenarios del interruptor: solo tocan ocupación, tarifa y valorización. */
export const ESCENARIOS: Record<string, Partial<Supuestos>> = {
  conservador: { occupancy: 55, adr: 145, appreciation: 3 },
  base: { occupancy: 75, adr: 180, appreciation: 5 },
  optimista: { occupancy: 85, adr: 225, appreciation: 7 },
}

/** Proyectos de ejemplo para arrancar sin escribir nada. */
export const PROYECTOS: Record<string, Supuestos> = {
  villa: SUPUESTOS_BASE,
  doble: {
    ...SUPUESTOS_BASE,
    landArea: 900, landPrice: 85, buildArea: 150,
    furniture: 28000, amenities: 22000, permits: 14000,
    units: 2, adr: 195, occupancy: 68, extraMonthly: 1400,
  },
  boutique: {
    ...SUPUESTOS_BASE,
    landArea: 3000, landPrice: 90, buildArea: 420,
    furniture: 90000, amenities: 95000, permits: 45000,
    units: 5, adr: 185, occupancy: 70, extraMonthly: 6500,
    opex: 48, downPayment: 40,
  },
  /** El proyecto real de La Fortuna, con sus cifras. */
  bikeBed: {
    ...SUPUESTOS_BASE,
    landArea: 1000, landPrice: 100, buildArea: 320, buildCost: 1000,
    furniture: 70000, amenities: 50000, permits: 28000, contingency: 10,
    units: 5, adr: 160, occupancy: 75, extraMonthly: 0,
    opex: 25, downPayment: 40, interest: 10, term: 20,
  },
}

export const ADVERTENCIA =
  'Estos resultados son estimaciones educativas y no garantizan ingresos, ocupación, ' +
  'valorización ni retornos. Cada supuesto debe validarse según la zona, la demanda y ' +
  'la distancia a los principales atractivos turísticos; proyectos ubicados a más de ' +
  '10 km pueden comportarse de forma muy diferente. Los resultados también dependen ' +
  'de una administración profesional, una operación consistente y una atención rápida ' +
  'al huésped.'

/** Noches promedio que trae un mes. 365 / 12. */
const NOCHES_POR_MES = 30.42

/** Cuota mensual de un crédito con amortización francesa. */
export function cuotaMensual(monto: number, tasaAnual: number, plazoAnios: number): number {
  if (monto <= 0) return 0
  const meses = Math.max(1, plazoAnios * 12)
  const i = tasaAnual / 100 / 12
  if (i === 0) return monto / meses
  return (monto * i * (1 + i) ** meses) / ((1 + i) ** meses - 1)
}

/** Lo que todavía se le debe al banco después de `anios` años pagando. */
export function saldoPendiente(
  monto: number, tasaAnual: number, plazoAnios: number, anios: number
): number {
  if (monto <= 0) return 0
  const meses = Math.max(1, plazoAnios * 12)
  const pagados = Math.min(meses, anios * 12)
  const i = tasaAnual / 100 / 12
  const cuota = cuotaMensual(monto, tasaAnual, plazoAnios)
  if (i === 0) return Math.max(0, monto - cuota * pagados)
  return Math.max(0, monto * (1 + i) ** pagados - cuota * (((1 + i) ** pagados - 1) / i))
}

export type Proyeccion = {
  terrenoFuturo: number
  saldo: number
  flujoAcumulado: number
  patrimonio: number
  anualizado: number
}

export type Resultado = {
  total: number
  capitalInicial: number
  credito: number
  cuota: number
  ingresoBruto: number
  gastos: number
  noi: number
  flujoMensual: number
  capRate: number
  retornoSobreCapital: number
  dscr: number
  ocupacionEquilibrio: number
  recuperacion: number
  anio5: Proyeccion
  anio10: Proyeccion
}

export function calcular(s: Supuestos): Resultado {
  const costoTerreno = s.landArea * s.landPrice
  const costoObra = s.buildArea * s.buildCost
  const contingencia = costoObra * (s.contingency / 100)
  const total = costoTerreno + costoObra + s.furniture + s.amenities + s.permits + contingencia

  const capitalInicial = total * (s.downPayment / 100)
  const credito = total - capitalInicial
  const cuota = cuotaMensual(credito, s.interest, s.term)

  const ingresoBruto = s.units * NOCHES_POR_MES * (s.occupancy / 100) * s.adr + s.extraMonthly
  const gastos = ingresoBruto * (s.opex / 100)
  const noi = ingresoBruto - gastos
  const flujoMensual = noi - cuota

  const noiAnual = noi * 12
  const flujoAnual = flujoMensual * 12

  const capRate = total > 0 ? (noiAnual / total) * 100 : 0
  const retornoSobreCapital = capitalInicial > 0 ? (flujoAnual / capitalInicial) * 100 : 0
  const dscr = cuota > 0 ? noi / cuota : 99

  // Ocupación mínima para que el hospedaje cubra la cuota, descontando lo que
  // ya aportan los otros ingresos.
  const porNoches = s.units * NOCHES_POR_MES * s.adr * (1 - s.opex / 100)
  const porExtras = s.extraMonthly * (1 - s.opex / 100)
  const ocupacionEquilibrio =
    porNoches > 0 ? Math.max(0, Math.min(100, ((cuota - porExtras) / porNoches) * 100)) : 0

  const recuperacion = flujoAnual > 0 ? capitalInicial / flujoAnual : Infinity

  const proyectar = (anios: number): Proyeccion => {
    const terrenoFuturo = costoTerreno * (1 + s.appreciation / 100) ** anios
    const resto = total - costoTerreno
    const saldo = saldoPendiente(credito, s.interest, s.term, anios)
    let flujoAcumulado = 0
    for (let n = 1; n <= anios; n++) {
      flujoAcumulado += flujoAnual * (1 + s.revenueGrowth / 100) ** (n - 1)
    }
    const patrimonio = terrenoFuturo + resto - saldo + flujoAcumulado
    const anualizado =
      capitalInicial > 0 && patrimonio > 0
        ? ((patrimonio / capitalInicial) ** (1 / anios) - 1) * 100
        : 0
    return { terrenoFuturo, saldo, flujoAcumulado, patrimonio, anualizado }
  }

  return {
    total, capitalInicial, credito, cuota,
    ingresoBruto, gastos, noi, flujoMensual,
    capRate, retornoSobreCapital, dscr, ocupacionEquilibrio, recuperacion,
    anio5: proyectar(5), anio10: proyectar(10),
  }
}

/** A cuánto llegaría el mismo capital inicial puesto en otra cosa. */
export function comparativo(capitalInicial: number, tasaAnual: number, anios: number): number {
  return capitalInicial * (1 + tasaAnual / 100) ** anios
}

// ── Formatos ────────────────────────────────────────────────────────────────

export const enDolares = (n: number, decimales = 0) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: decimales,
  }).format(Number.isFinite(n) ? n : 0)

export const enPorcentaje = (n: number) =>
  `${Number.isFinite(n) ? n.toFixed(1) : '0.0'}%`
