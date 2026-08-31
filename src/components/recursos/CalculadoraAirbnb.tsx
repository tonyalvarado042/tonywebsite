'use client'

import { useMemo, useState } from 'react'
import { ArrowRight, Check, Info } from 'lucide-react'
import InformeAirbnb from './InformeAirbnb'
import {
  ADVERTENCIA,
  ESCENARIOS,
  PROYECTOS,
  SUPUESTOS_BASE,
  calcular,
  comparativo,
  enDolares,
  enPorcentaje,
  type Supuestos,
} from '@/lib/calculadora-airbnb'

/**
 * La calculadora de Airbnb.
 *
 * Se usa GRATIS y sin llenar nada — así lo pidió Tony. Lo único que pide datos
 * es el informe por correo, que vive abajo en `InformeAirbnb` y no bloquea
 * ninguno de los números de arriba.
 *
 * La matemática NO está acá: está en `@/lib/calculadora-airbnb`, para que el
 * correo mande exactamente los mismos números que se ven en pantalla.
 */

// ── Un campo numérico ───────────────────────────────────────────────────────

type CampoProps = {
  etiqueta: string
  valor: number
  alCambiar: (n: number) => void
  sufijo?: string
  ayuda?: string
  rapidos?: { etiqueta: string; valor: number }[]
}

function Campo({ etiqueta, valor, alCambiar, sufijo, ayuda, rapidos }: CampoProps) {
  // Mientras se escribe se guarda el texto crudo: si no, borrar el campo
  // dejaría un «0» pegado que hay que seleccionar para reemplazar.
  const [texto, setTexto] = useState<string | null>(null)

  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[12.5px] font-semibold text-brand-muted">
        {etiqueta}
        {ayuda && (
          <span title={ayuda} className="cursor-help text-brand-green/70">
            <Info size={12.5} />
          </span>
        )}
      </label>

      <div className="relative">
        <input
          value={texto ?? String(valor)}
          onChange={(e) => {
            setTexto(e.target.value)
            const n = parseFloat(e.target.value.replace(',', '.'))
            alCambiar(Number.isFinite(n) ? n : 0)
          }}
          onBlur={() => setTexto(null)}
          inputMode="decimal"
          className="w-full rounded-xl border border-brand-border bg-brand-bg py-2.5 pl-3.5 pr-14
                     text-[15px] font-semibold text-brand-text outline-none transition-colors
                     focus:border-brand-green/60 focus:ring-2 focus:ring-brand-green/25"
        />
        {sufijo && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-[12px] text-brand-muted">
            {sufijo}
          </span>
        )}
      </div>

      {rapidos && (
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {rapidos.map((r) => (
            <button
              key={r.etiqueta}
              type="button"
              onClick={() => { setTexto(null); alCambiar(r.valor) }}
              className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-colors ${
                valor === r.valor
                  ? 'bg-brand-green/15 text-brand-green'
                  : 'bg-brand-bg text-brand-muted hover:text-brand-text'
              }`}
            >
              {r.etiqueta}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Una etiqueta de resultado con su explicación en lenguaje sencillo. */
function Dato({ etiqueta, ayuda }: { etiqueta: string; ayuda: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[12px] font-medium text-brand-muted">
      {etiqueta}
      <span title={ayuda} className="cursor-help text-brand-green/60">
        <Info size={11.5} />
      </span>
    </span>
  )
}

// ── Los tres pasos ──────────────────────────────────────────────────────────

const PASOS = [
  { nombre: 'Propiedad', detalle: 'Terreno y construcción' },
  { nombre: 'Operación', detalle: 'Tarifa, ocupación y gastos' },
  { nombre: 'Capital', detalle: 'Prima, crédito y valorización' },
]

export default function CalculadoraAirbnb() {
  const [s, setS] = useState<Supuestos>(SUPUESTOS_BASE)
  const [escenario, setEscenario] = useState('base')
  const [paso, setPaso] = useState(0)
  const [bikeBedCargado, setBikeBedCargado] = useState(false)
  const [informeAbierto, setInformeAbierto] = useState(false)

  const set = (clave: keyof Supuestos, valor: number) =>
    setS((prev) => ({ ...prev, [clave]: valor }))

  const aplicarEscenario = (nombre: string) => {
    setEscenario(nombre)
    setS((prev) => ({ ...prev, ...ESCENARIOS[nombre] }))
  }

  const cargarBikeBed = () => {
    setS(PROYECTOS.bikeBed)
    setEscenario('base')
    setPaso(0)
    setBikeBedCargado(true)
    requestAnimationFrame(() =>
      document.getElementById('simulador')?.scrollIntoView({ behavior: 'smooth' })
    )
  }

  const r = useMemo(() => calcular(s), [s])

  const tope = Math.max(
    r.anio10.patrimonio,
    comparativo(r.capitalInicial, s.sp500, 10),
    comparativo(r.capitalInicial, s.nasdaq, 10),
    comparativo(r.capitalInicial, s.fixedIncome, 10),
    1
  )

  const barras: { nombre: string; valor: number; propia: boolean }[] = [
    { nombre: 'Tu proyecto turístico', valor: r.anio10.patrimonio, propia: true },
    { nombre: 'Nasdaq-100*', valor: comparativo(r.capitalInicial, s.nasdaq, 10), propia: false },
    { nombre: 'S&P 500*', valor: comparativo(r.capitalInicial, s.sp500, 10), propia: false },
    { nombre: 'Renta fija*', valor: comparativo(r.capitalInicial, s.fixedIncome, 10), propia: false },
  ]

  return (
    <>
      {/* ── El simulador ─────────────────────────────────────────────── */}
      <section id="simulador" className="scroll-mt-24 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">

          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            Modelá antes de construir
          </p>
          <h2 className="mb-3 text-[28px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-4xl">
            Convertí tu idea en <em className="not-italic text-brand-green">números claros.</em>
          </h2>
          <p className="mb-8 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
            Completá los datos o cargá un ejemplo. Todos los supuestos son editables.
          </p>

          {/* Ejemplos rápidos */}
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="text-[12.5px] font-semibold text-brand-muted">Empezar con:</span>
            {([
              ['villa', 'Villa 80 m²'],
              ['doble', '2 villas'],
              ['boutique', 'Hotel boutique'],
            ] as const).map(([clave, nombre]) => (
              <button
                key={clave}
                type="button"
                onClick={() => { setS(PROYECTOS[clave]); setBikeBedCargado(false) }}
                className="rounded-xl border border-brand-border bg-brand-card px-3 py-2 text-[12.5px]
                           font-semibold text-brand-muted transition-colors hover:border-brand-green/40 hover:text-brand-text"
              >
                {nombre}
              </button>
            ))}
          </div>

          {/* El proyecto real */}
          <button
            type="button"
            onClick={cargarBikeBed}
            className="mb-8 block w-full rounded-2xl border border-brand-green/25 bg-brand-green/[0.06]
                       p-5 text-left transition-colors hover:border-brand-green/50"
          >
            <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-green">
              Caso real · La Fortuna
            </span>
            <strong className="mt-1.5 block text-[16px] font-bold text-brand-text">
              Cargar proyecto Bike &amp; Bed
            </strong>
            <small className="mt-1.5 block text-[12.5px] leading-relaxed text-brand-muted">
              5 villas · 1.000 m² de terreno · 320 m² construidos · $600.000 de inversión
              aproximada · $360.000 financiados al 10% · 25% de gastos operativos
            </small>
            <i className="mt-2.5 inline-flex items-center gap-1.5 not-italic text-[12.5px] font-bold text-brand-green">
              {bikeBedCargado ? <><Check size={14} strokeWidth={3} /> Proyecto cargado</> : <>Cargar datos <ArrowRight size={14} /></>}
            </i>
          </button>

          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-start">

            {/* ── Panel de la calculadora ── */}
            <div className="rounded-3xl border border-brand-border bg-brand-card p-5 sm:p-7">

              {/* Pasos */}
              <div className="mb-7 grid gap-2 sm:grid-cols-3">
                {PASOS.map((p, i) => (
                  <button
                    key={p.nombre}
                    type="button"
                    onClick={() => setPaso(i)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                      paso === i
                        ? 'border-brand-green/50 bg-brand-green/10'
                        : 'border-brand-border bg-brand-bg hover:border-brand-border'
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                      paso === i ? 'bg-brand-green text-brand-bg' : 'bg-brand-card text-brand-muted'
                    }`}>
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <b className={`block truncate text-[13px] font-bold ${paso === i ? 'text-brand-text' : 'text-brand-muted'}`}>
                        {p.nombre}
                      </b>
                      <small className="block truncate text-[11px] text-brand-muted/70">{p.detalle}</small>
                    </span>
                  </button>
                ))}
              </div>

              {/* Paso 1 — Propiedad */}
              {paso === 0 && (
                <>
                  <div className="mb-5">
                    <h3 className="text-[17px] font-bold text-brand-text">
                      <span className="mr-2 text-brand-green">01</span>Terreno y construcción
                    </h3>
                    <p className="mt-1 text-[12.5px] text-brand-muted">Valores de referencia editables en USD.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Campo etiqueta="Área del terreno" valor={s.landArea} sufijo="m²" alCambiar={(n) => set('landArea', n)} />
                    <Campo etiqueta="Precio del terreno" valor={s.landPrice} sufijo="$/m²" alCambiar={(n) => set('landPrice', n)}
                      rapidos={[{ etiqueta: '$75 base', valor: 75 }, { etiqueta: '$100 La Fortuna', valor: 100 }]} />
                    <Campo etiqueta="Área de construcción" valor={s.buildArea} sufijo="m²" alCambiar={(n) => set('buildArea', n)} />
                    <Campo etiqueta="Costo de construcción" valor={s.buildCost} sufijo="$/m²" alCambiar={(n) => set('buildCost', n)}
                      rapidos={[{ etiqueta: 'Costa Rica · $1.000', valor: 1000 }, { etiqueta: 'Premium · $1.400', valor: 1400 }]} />
                    <Campo etiqueta="Mobiliario y equipo" valor={s.furniture} sufijo="$" alCambiar={(n) => set('furniture', n)} />
                    <Campo etiqueta="Amenidades" valor={s.amenities} sufijo="$" alCambiar={(n) => set('amenities', n)} />
                    <Campo etiqueta="Diseño, permisos y estudios" valor={s.permits} sufijo="$" alCambiar={(n) => set('permits', n)} />
                    <Campo etiqueta="Contingencia" valor={s.contingency} sufijo="%" alCambiar={(n) => set('contingency', n)}
                      rapidos={[{ etiqueta: '10% sugerido', valor: 10 }]} />
                  </div>
                </>
              )}

              {/* Paso 2 — Operación */}
              {paso === 1 && (
                <>
                  <div className="mb-5">
                    <h3 className="text-[17px] font-bold text-brand-text">
                      <span className="mr-2 text-brand-green">02</span>Modelo de operación
                    </h3>
                    <p className="mt-1 text-[12.5px] text-brand-muted">Proyectá ingresos y gastos mensuales.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Campo etiqueta="Unidades o villas" valor={s.units} alCambiar={(n) => set('units', n)} />
                    <Campo etiqueta="Tarifa promedio por noche" valor={s.adr} sufijo="$" alCambiar={(n) => set('adr', n)}
                      ayuda="ADR: tarifa promedio por noche vendida." />
                    <Campo etiqueta="Ocupación estimada" valor={s.occupancy} sufijo="%" alCambiar={(n) => set('occupancy', n)}
                      rapidos={[{ etiqueta: '55%', valor: 55 }, { etiqueta: '65%', valor: 65 }, { etiqueta: '75%', valor: 75 }]} />
                    <Campo etiqueta="Otros ingresos mensuales" valor={s.extraMonthly} sufijo="$" alCambiar={(n) => set('extraMonthly', n)}
                      ayuda="Tours, wellness, alimentos, bicicletas u otras experiencias." />
                    <Campo etiqueta="Gastos operativos" valor={s.opex} sufijo="%" alCambiar={(n) => set('opex', n)}
                      ayuda="Personal, plataformas, servicios, mantenimiento, administración e impuestos operativos."
                      rapidos={[{ etiqueta: '42% base', valor: 42 }, { etiqueta: '50% conservador', valor: 50 }]} />
                    <Campo etiqueta="Crecimiento anual de ingresos" valor={s.revenueGrowth} sufijo="%" alCambiar={(n) => set('revenueGrowth', n)} />
                  </div>
                </>
              )}

              {/* Paso 3 — Capital */}
              {paso === 2 && (
                <>
                  <div className="mb-5">
                    <h3 className="text-[17px] font-bold text-brand-text">
                      <span className="mr-2 text-brand-green">03</span>Capital y valorización
                    </h3>
                    <p className="mt-1 text-[12.5px] text-brand-muted">Visualizá deuda, flujo y patrimonio.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Campo etiqueta="Prima o capital inicial" valor={s.downPayment} sufijo="%" alCambiar={(n) => set('downPayment', n)}
                      rapidos={[{ etiqueta: '30%', valor: 30 }, { etiqueta: '40%', valor: 40 }]} />
                    <Campo etiqueta="Tasa de interés anual" valor={s.interest} sufijo="%" alCambiar={(n) => set('interest', n)} />
                    <Campo etiqueta="Plazo del crédito" valor={s.term} sufijo="años" alCambiar={(n) => set('term', n)} />
                    <Campo etiqueta="Valorización anual del terreno" valor={s.appreciation} sufijo="%" alCambiar={(n) => set('appreciation', n)}
                      rapidos={[{ etiqueta: '3%', valor: 3 }, { etiqueta: '5% base', valor: 5 }, { etiqueta: '7%', valor: 7 }]} />
                    <Campo etiqueta="S&P 500 · supuesto" valor={s.sp500} sufijo="%" alCambiar={(n) => set('sp500', n)} />
                    <Campo etiqueta="Nasdaq-100 · supuesto" valor={s.nasdaq} sufijo="%" alCambiar={(n) => set('nasdaq', n)} />
                    <Campo etiqueta="Renta fija · supuesto" valor={s.fixedIncome} sufijo="%" alCambiar={(n) => set('fixedIncome', n)} />
                  </div>
                </>
              )}

              {/* Anterior / continuar */}
              <div className="mt-7 flex items-center justify-between gap-3 border-t border-brand-border pt-5">
                <button
                  type="button"
                  disabled={paso === 0}
                  onClick={() => setPaso((p) => Math.max(0, p - 1))}
                  className="min-h-[44px] rounded-xl px-4 text-[13.5px] font-semibold text-brand-muted
                             transition-colors hover:text-brand-text disabled:opacity-30"
                >
                  ← Anterior
                </button>
                {paso < 2 ? (
                  <button
                    type="button"
                    onClick={() => setPaso((p) => Math.min(2, p + 1))}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-green px-5
                               text-[13.5px] font-bold text-brand-bg transition-opacity hover:opacity-90"
                  >
                    Continuar <ArrowRight size={15} />
                  </button>
                ) : (
                  <a
                    href="#resultados"
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-brand-green px-5
                               text-[13.5px] font-bold text-brand-bg transition-opacity hover:opacity-90"
                  >
                    Ver análisis <ArrowRight size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* ── Panel de resultados ── */}
            <aside
              id="resultados"
              className="scroll-mt-24 rounded-3xl border border-brand-border bg-brand-card p-5 sm:p-6 lg:sticky lg:top-24"
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-muted">
                  Resultado en tiempo real
                </p>
                <div className="flex gap-1 rounded-lg bg-brand-bg p-1">
                  {Object.keys(ESCENARIOS).map((nombre) => (
                    <button
                      key={nombre}
                      type="button"
                      onClick={() => aplicarEscenario(nombre)}
                      className={`rounded-md px-2.5 py-1 text-[11px] font-semibold capitalize transition-colors ${
                        escenario === nombre ? 'bg-brand-green text-brand-bg' : 'text-brand-muted hover:text-brand-text'
                      }`}
                    >
                      {nombre}
                    </button>
                  ))}
                </div>
              </div>

              {/* El número grande */}
              <div className="mb-5 rounded-2xl border border-brand-green/20 bg-brand-green/[0.06] p-5">
                <Dato
                  etiqueta="Flujo mensual estimado"
                  ayuda="Lo que podría quedarte cada mes después de gastos operativos y cuota del financiamiento."
                />
                <strong className={`mt-1.5 block text-[34px] font-bold leading-none tracking-tight ${
                  r.flujoMensual < 0 ? 'text-red-400' : 'text-brand-text'
                }`}>
                  {enDolares(r.flujoMensual)}
                </strong>
                <small className="mt-2 block text-[12px] text-brand-muted">
                  En sencillo: dinero mensual estimado que queda libre.
                </small>
              </div>

              {/* Los cuatro de en medio */}
              <div className="mb-5 grid grid-cols-2 gap-3">
                {[
                  { e: 'Ingreso mensual', a: 'Todo lo que produciría el hospedaje y sus ingresos adicionales antes de restar gastos.', v: enDolares(r.ingresoBruto) },
                  { e: 'Gastos operativos', a: 'Personal, comisiones, servicios, mantenimiento, administración y otros costos de operar.', v: enDolares(r.gastos) },
                  { e: 'Cuota estimada', a: 'Pago mensual aproximado del préstamo según prima, tasa y plazo seleccionados.', v: enDolares(r.cuota) },
                  { e: 'Ocupación de equilibrio', a: 'Porcentaje mínimo de noches que necesitás vender para cubrir operación y financiamiento. Cuanto más abajo de tu ocupación esperada, mayor margen.', v: enPorcentaje(r.ocupacionEquilibrio) },
                ].map((x) => (
                  <div key={x.e} className="rounded-xl bg-brand-bg p-3">
                    <Dato etiqueta={x.e} ayuda={x.a} />
                    <b className="mt-1 block text-[16px] font-bold text-brand-text">{x.v}</b>
                  </div>
                ))}
              </div>

              {/* Salud del proyecto */}
              <div className="mb-5 space-y-2.5">
                <div className="rounded-xl bg-brand-bg p-3">
                  <Dato etiqueta="Cap rate" ayuda="Utilidad operativa anual dividida entre el costo total. Ejemplo: 7% significa que el activo produce cerca de $7 al año por cada $100 de costo, antes de deuda." />
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <b className="text-[16px] font-bold text-brand-text">{enPorcentaje(r.capRate)}</b>
                    <small className="text-[11.5px] text-brand-muted">
                      {r.capRate >= 8 ? 'Lectura: sólido' : r.capRate >= 5 ? 'Lectura: moderado' : 'Lectura: revisar'}
                    </small>
                  </div>
                </div>
                <div className="rounded-xl bg-brand-bg p-3">
                  <Dato etiqueta="Retorno sobre capital" ayuda="Flujo anual después de deuda dividido entre el dinero que aportaste de tu bolsillo." />
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <b className="text-[16px] font-bold text-brand-text">{enPorcentaje(r.retornoSobreCapital)}</b>
                    <small className="text-[11.5px] text-brand-muted">
                      {r.retornoSobreCapital > 0 ? 'Sobre tu aporte propio' : 'El flujo no cubre la deuda'}
                    </small>
                  </div>
                </div>
                <div className="rounded-xl bg-brand-bg p-3">
                  <Dato etiqueta="DSCR" ayuda="Mide cuántas veces la utilidad operativa cubre la deuda. Sobre 1 significa que alcanza; más margen suele ser más saludable." />
                  <div className="mt-1 flex items-baseline justify-between gap-2">
                    <b className="text-[16px] font-bold text-brand-text">
                      {r.dscr > 20 ? 'Sin deuda' : `${r.dscr.toFixed(2)}x`}
                    </b>
                    <small className="text-[11.5px] text-brand-muted">
                      {r.dscr >= 1.25 ? 'Cobertura saludable' : r.dscr >= 1 ? 'Cobertura ajustada' : 'No cubre la cuota'}
                    </small>
                  </div>
                </div>
              </div>

              {/* Totales */}
              <div className="mb-5 space-y-px overflow-hidden rounded-xl border border-brand-border">
                {[
                  { e: 'Costo total estimado', a: 'Terreno, construcción, mobiliario, amenidades, permisos y contingencia.', v: enDolares(r.total) },
                  { e: 'Capital inicial', a: 'Dinero propio aproximado que necesitarías aportar como prima.', v: enDolares(r.capitalInicial) },
                  {
                    e: 'Recuperación estimada',
                    a: 'Años aproximados para recuperar el capital inicial únicamente con el flujo proyectado. No incluye una posible venta.',
                    v: Number.isFinite(r.recuperacion) ? `${r.recuperacion.toFixed(1)} años` : 'Flujo negativo',
                  },
                ].map((x) => (
                  <div key={x.e} className="flex items-center justify-between gap-3 bg-brand-bg px-3.5 py-3">
                    <Dato etiqueta={x.e} ayuda={x.a} />
                    <b className="shrink-0 text-[14px] font-bold text-brand-text">{x.v}</b>
                  </div>
                ))}
              </div>

              <a
                href="#solicitar-informe"
                className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl
                           border border-brand-green/40 px-4 text-[13.5px] font-bold text-brand-green
                           transition-colors hover:bg-brand-green/10"
              >
                Solicitar informe completo por correo <ArrowRight size={15} />
              </a>

              <p className="mt-4 text-[11px] leading-relaxed text-brand-muted/70">{ADVERTENCIA}</p>
            </aside>
          </div>
        </div>
      </section>

      {/* ── La puerta del informe ────────────────────────────────────── */}
      <section id="solicitar-informe" className="scroll-mt-24 border-t border-brand-border px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
              Tu informe personalizado
            </p>
            <h2 className="mb-4 text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
              Recibí el análisis completo de tu proyecto.
            </h2>
            <p className="mb-6 text-[15px] leading-relaxed text-brand-muted">
              Los datos básicos quedan visibles siempre. El informe extendido reúne tu
              escenario para que puedas revisarlo con más profundidad.
            </p>
            <ul className="mb-7 space-y-2.5">
              {[
                'Resumen del escenario ingresado',
                'Cap rate, retorno sobre capital y DSCR',
                'Recuperación de la inversión',
                'Valorización y patrimonio a 5 y 10 años',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2.5 text-[14.5px] text-brand-muted">
                  <Check size={16} className="mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                  {x}
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-brand-border bg-brand-card p-4">
              <b className="mb-1 block text-[12.5px] font-bold text-brand-text">Importante:</b>
              <span className="text-[12px] leading-relaxed text-brand-muted">{ADVERTENCIA}</span>
            </div>
          </div>

          <InformeAirbnb
            supuestos={s}
            escenario={escenario}
            alRegistrar={() => setInformeAbierto(true)}
          />
        </div>
      </section>

      {/* ── El informe extendido, ya desbloqueado ────────────────────── */}
      {informeAbierto && (
        <section id="informe-completo" className="scroll-mt-24 border-t border-brand-border px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
                Más que ingresos mensuales
              </p>
              <h2 className="mb-4 text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
                Mirá cómo podría crecer tu <em className="not-italic text-brand-green">patrimonio.</em>
              </h2>
              <p className="mb-7 text-[15px] leading-relaxed text-brand-muted">
                Separamos operación, reducción de deuda y valorización para que entiendas
                exactamente de dónde viene cada resultado.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { t: 'Patrimonio año 5', v: r.anio5.patrimonio, a: r.anio5.anualizado },
                  { t: 'Patrimonio año 10', v: r.anio10.patrimonio, a: r.anio10.anualizado },
                ].map((x) => (
                  <div key={x.t} className="rounded-2xl border border-brand-border bg-brand-card p-4">
                    <span className="text-[12px] font-medium text-brand-muted">{x.t}</span>
                    <b className="mt-1 block text-[22px] font-bold tracking-tight text-brand-text">
                      {enDolares(x.v)}
                    </b>
                    <small className="mt-1 block text-[11.5px] text-brand-muted/80">
                      {enPorcentaje(x.a)} anualizado estimado
                    </small>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-brand-border bg-brand-card p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-muted">
                    Proyección a 10 años
                  </span>
                  <h3 className="mt-1 text-[17px] font-bold text-brand-text">Mismo capital inicial</h3>
                </div>
                <span className="flex items-center gap-1.5 text-[11.5px] text-brand-muted">
                  <i className="h-2.5 w-2.5 rounded-sm bg-brand-green" /> Activo turístico
                </span>
              </div>

              <div className="space-y-3.5">
                {barras.map((b) => (
                  <div key={b.nombre}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-[12.5px] text-brand-muted">{b.nombre}</span>
                      <b className="text-[13px] font-bold text-brand-text">{enDolares(b.valor)}</b>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-brand-bg">
                      <div
                        className={`h-full rounded-full ${b.propia ? 'bg-brand-green' : 'bg-brand-muted/40'}`}
                        style={{ width: `${Math.max(3, (b.valor / tope) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-[11px] leading-relaxed text-brand-muted/70">
                *Tasas ingresadas por vos. No son pronósticos ni garantizan resultados futuros.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-8 max-w-6xl rounded-2xl border border-brand-border bg-brand-card p-4">
            <b className="mb-1 block text-[12.5px] font-bold text-brand-text">
              Advertencia sobre esta proyección
            </b>
            <span className="text-[12px] leading-relaxed text-brand-muted">{ADVERTENCIA}</span>
          </div>
        </section>
      )}
    </>
  )
}
