import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import CalculadoraAirbnb from '@/components/recursos/CalculadoraAirbnb'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

/**
 * La calculadora de Airbnb, dentro de tonyalvarado.com.
 *
 * Es la misma calculadora que Tony tenía publicada aparte, traída al sitio con
 * su plantilla, su menú y su pie de página. Los supuestos, las fórmulas y los
 * textos del método y del caso real se copiaron tal cual: él lo pidió así.
 *
 * A diferencia de los demás recursos, ACÁ NO HAY PUERTA. Se entra y se usa.
 * Lo único que pide datos es el informe por correo, abajo del todo.
 *
 * ⚠️ Todo número que salga de acá es un modelo educativo, nunca una promesa.
 * La advertencia vive en `@/lib/calculadora-airbnb` y se repite en pantalla,
 * en el informe extendido y en el correo.
 */

const TITULO = 'Calculadora de Airbnb — gratis'
const DESCRIPCION =
  '¿Cuánto puedo ganar en Airbnb? Calculá ingresos, gastos, financiamiento y ' +
  'valorización de tu propiedad antes de comprar, construir o transformarla. ' +
  'Sin registro.'

export const metadata = {
  title: `${TITULO} | Tony Alvarado`,
  description: DESCRIPCION,
  alternates: { canonical: '/recursos/calculadora-airbnb' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: `${SITE_URL}/recursos/calculadora-airbnb`,
    siteName: 'Tony Alvarado',
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: '/images/og/tony-alvarado-og.jpg', width: 1600, height: 900, alt: 'Calculadora de Airbnb' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: TITULO,
    description: DESCRIPCION,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

/** El método, tal cual estaba en la calculadora original. */
const METODO = [
  ['01', 'Demanda', 'Identifica quién viajará, qué busca y cuánto está dispuesto a pagar.'],
  ['02', 'Concepto', 'Crea una razón clara para elegirte más allá del precio o la ubicación.'],
  ['03', 'Números', 'Modela costos, ocupación, tarifa, deuda y escenarios antes de ejecutar.'],
  ['04', 'Experiencia', 'Diseña hospedaje, amenidades y momentos que aumenten el valor percibido.'],
  ['05', 'Operación', 'Construye procesos, equipo y estándares capaces de sostener la promesa.'],
  ['06', 'Patrimonio', 'Mide el flujo, la deuda y el valor del activo a través del tiempo.'],
] as const

/**
 * Las preguntas frecuentes, en dos grupos.
 *
 * Las cinco primeras venían de la calculadora original. Las de los indicadores
 * y las del final las pidió Tony el 31-ago-2026: quería que la página resuelva
 * sola la duda de «¿lo hago por mi cuenta o con ellos?».
 *
 * ⚠️ En todo lo que habla de copropiedad se usa SOLO el vocabulario aprobado
 * —copropiedad, fracción, acción, co-dueño, «el activo factura»— y NUNCA
 * rendimiento, retorno, ROI, utilidad, ganancia ni inversión garantizada.
 * Tampoco se publican precios, cantidad de acciones ni condiciones: eso se
 * conversa con documentos, no en una página abierta. Es cumplimiento SUGEVAL,
 * no estilo.
 */
const PREGUNTAS_CALCULADORA = [
  [
    '¿Esto garantiza que mi proyecto será rentable?',
    'No. Esta es una calculadora financiera educativa. Debes validar la demanda, la tarifa, los costos y la ubicación de tu proyecto. Estar lejos de los principales atractivos turísticos —especialmente a más de 10 km— y no contar con un buen equipo de operación puede reducir considerablemente el resultado.',
  ],
  [
    '¿Qué es el ADR?',
    'Es la tarifa diaria promedio que pagaría un huésped por noche. Se calcula dividiendo los ingresos de hospedaje entre las noches vendidas.',
  ],
  [
    '¿Qué es el NOI?',
    'Es la utilidad operativa neta antes de pagar la deuda. Permite ver qué tan eficiente es el activo por sí mismo.',
  ],
  [
    '¿Qué es el cap rate?',
    'Es lo que produce el activo por sí solo, sin contar el préstamo: la utilidad operativa de un año dividida entre lo que costó todo. Si da 7%, quiere decir que el activo genera cerca de $7 al año por cada $100 que costó. Sirve para comparar dos proyectos distintos sin que el financiamiento ensucie la comparación.',
  ],
  [
    '¿Qué es el DSCR y por qué me importa?',
    'Mide cuántas veces la utilidad operativa alcanza para pagar la cuota del banco. En 1.00 apenas alcanza y no queda margen para un mes flojo. Los bancos normalmente quieren ver 1.25 o más. Es el número que más rápido dice si un proyecto aguanta un mal trimestre.',
  ],
  [
    '¿Qué es la ocupación de equilibrio?',
    'El mínimo de noches que tenés que vender para no perder plata. Si tu ocupación de equilibrio es 40% y esperás vender 75%, tenés colchón. Si es 70% y esperás 75%, cualquier temporada floja te deja en rojo. De todos los números de esta pantalla, es el que mejor mide la fragilidad de un proyecto.',
  ],
  [
    '¿Qué es el retorno sobre capital que muestra la calculadora?',
    'Compara el flujo de un año contra el dinero propio que pondrías, sin contar lo que financiaría el banco. Es el resultado de un modelo con los supuestos que vos escribiste: si cambiás ocupación o tarifa, cambia. No es una promesa ni un pronóstico.',
  ],
  [
    '¿Por qué separar flujo y valorización?',
    'Porque el flujo viene de la operación y la valorización es un aumento estimado del patrimonio. Separarlos evita inflar o confundir el rendimiento.',
  ],
  [
    '¿Puedo analizar un alojamiento que ya opera?',
    'Sí. Introduce el valor actual de la propiedad, sus tarifas, ocupación y gastos reales para obtener una lectura más útil.',
  ],
] as const

const PREGUNTAS_NEGOCIO = [
  [
    '¿Me conviene hacerlo por mi cuenta o acompañado?',
    'Depende de qué te falta. Si tenés terreno, quién te construya, quién atienda al huésped y tiempo para estar encima de la operación, se puede solo — y esta calculadora es justo para eso. Lo que suele salir caro no es construir: es operar. Permisos, personal, mantenimiento, responder en menos de una hora, sostener la calificación temporada tras temporada. Si lo que querés es participar de un activo turístico sin cargar con esa operación, ahí es donde tiene sentido que conversemos.',
  ],
  [
    '¿Qué significa ser co-dueño de uno de tus proyectos?',
    'No es tiempo compartido y no es comprar una unidad aparte. Es copropiedad: el proyecto se divide en fracciones —acciones— y cada acción representa una parte del activo real. El activo se opera como un solo hotel, con un solo equipo y una sola marca, no como casas sueltas. Como operador mantengo siempre al menos el 51%, y eso no es una promesa de palabra: el sistema no deja hacer una operación que lo baje de ahí.',
  ],
  [
    '¿Cómo puedo ser co-dueño?',
    'Se conversa primero. Hay proyectos en distintos momentos —uno ya operando y otro en desarrollo— y las condiciones, la estructura legal y los plazos se revisan caso por caso, con documentos en la mano. Nada de eso se define desde una página web. Escribime por el formulario de contacto, contame en qué etapa estás y te digo en qué está cada proyecto hoy.',
  ],
  [
    '¿Esta página es una oferta de inversión?',
    'No. La calculadora es una herramienta educativa y esta página no es una oferta de valores, una recomendación financiera ni una promesa de resultados. Cualquier participación en un proyecto se trata aparte, con documentación y con la asesoría legal y financiera que vos consideres. Los números de esta pantalla son de tu propio escenario, no de ningún proyecto mío.',
  ],
] as const

const PREGUNTAS = [...PREGUNTAS_CALCULADORA, ...PREGUNTAS_NEGOCIO] as const

export default function CalculadoraAirbnbPage() {
  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/recursos/calculadora-airbnb#app`,
    name: 'Calculadora de Airbnb',
    description: DESCRIPCION,
    url: `${SITE_URL}/recursos/calculadora-airbnb`,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    inLanguage: 'es-CR',
    isPartOf: websiteRef,
    author: personRef,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Recursos gratis', item: `${SITE_URL}/recursos` },
      { '@type': 'ListItem', position: 3, name: 'Calculadora de Airbnb', item: `${SITE_URL}/recursos/calculadora-airbnb` },
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PREGUNTAS.map(([pregunta, respuesta]) => ({
      '@type': 'Question',
      name: pregunta,
      acceptedAnswer: { '@type': 'Answer', text: respuesta },
    })),
  }

  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* ── Portada ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px]
                     bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.16),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl">
          <Link
            href="/recursos"
            className="mb-9 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium
                       text-brand-muted transition-colors hover:text-brand-text"
          >
            <ArrowLeft size={15} />
            Recursos gratis
          </Link>

          <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            <span className="h-px w-6 bg-brand-green" />
            Calculadora de Airbnb
          </p>

          <h1 className="mb-5 text-[34px] font-bold leading-[1.08] tracking-tight text-brand-text sm:text-[52px]">
            ¿Cuánto puedo ganar en <em className="not-italic text-brand-green">Airbnb?</em>
          </h1>

          <p className="mb-8 max-w-2xl text-[16px] leading-relaxed text-brand-muted sm:text-[17px]">
            Calculá ingresos, gastos, financiamiento y valorización antes de comprar,
            construir o transformar una propiedad.
          </p>

          <div className="mb-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="#simulador"
              className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-2xl
                         bg-brand-green px-7 text-[15px] font-bold text-brand-bg transition-opacity hover:opacity-90"
            >
              Calcular mis ingresos <ArrowRight size={17} />
            </a>
            <a
              href="#conversar"
              className="inline-flex min-h-[54px] items-center justify-center rounded-2xl border
                         border-brand-border px-7 text-[15px] font-semibold text-brand-text
                         transition-colors hover:border-brand-green/50"
            >
              Quiero valorar mi opción
            </a>
          </div>

          <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-border
                        bg-brand-card px-4 py-2 text-[12.5px] font-medium text-brand-muted">
            <Check size={14} className="text-brand-green" strokeWidth={3} />
            Gratis y sin registro. Los datos solo se piden si querés el informe por correo.
          </p>

          <div className="grid grid-cols-3 gap-4 border-t border-brand-border pt-7">
            {[
              ['≈$200K', 'primeros 11 meses'],
              ['≈75%', 'ocupación real'],
              ['5', 'villas operando'],
            ].map(([dato, pie]) => (
              <div key={pie}>
                <strong className="block text-[22px] font-bold tracking-tight text-brand-text sm:text-[26px]">
                  {dato}
                </strong>
                <span className="mt-0.5 block text-[12px] leading-snug text-brand-muted">{pie}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conversación estratégica ─────────────────────────────────── */}
      <section id="conversar" className="scroll-mt-24 border-y border-brand-border bg-brand-card/40 px-5 py-14 sm:px-6 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
              Conversación estratégica
            </p>
            <h2 className="mb-4 text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
              Conversemos sobre <em className="not-italic text-brand-green">tu proyecto.</em>
            </h2>
            <p className="mb-6 max-w-2xl text-[15px] leading-relaxed text-brand-muted">
              Contame en qué etapa estás, tu experiencia y el capital que tenés disponible.
              Mi equipo revisa tu caso para valorar si podemos ayudarte a convertir una
              propiedad, un terreno o una idea en un activo turístico.
            </p>
            <ul className="grid gap-2.5 sm:grid-cols-3">
              {[
                'Evaluamos tu punto de partida',
                'Revisamos capital y posibilidades',
                'Te orientamos sobre el siguiente paso',
              ].map((x) => (
                <li key={x} className="flex items-start gap-2 text-[13.5px] leading-snug text-brand-muted">
                  <Check size={15} className="mt-0.5 shrink-0 text-brand-green" strokeWidth={2.5} />
                  {x}
                </li>
              ))}
            </ul>
          </div>

          {/* Tony pidió que acá no haya formulario: solo un botón que lleve a
              la página de contacto, que es donde vive el formulario largo. */}
          <div className="rounded-3xl border border-brand-green/25 bg-brand-green/[0.06] p-6 text-center sm:p-7">
            <Link
              href="/contacto"
              className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl
                         bg-brand-green px-6 text-[15px] font-bold uppercase tracking-wide
                         text-brand-bg transition-opacity hover:opacity-90"
            >
              Quiero asesoría / ser codueño
              <ArrowRight size={17} />
            </Link>
            <p className="mt-3.5 text-[12.5px] leading-relaxed text-brand-muted">
              Te lleva al formulario de contacto. Contame tu caso y te respondemos.
            </p>
          </div>
        </div>
      </section>

      {/* ── La calculadora, el informe y la proyección ───────────────── */}
      <CalculadoraAirbnb />

      {/* ── Cómo interpretarla ───────────────────────────────────────── */}
      <section id="metodo" className="scroll-mt-24 border-t border-brand-border px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            El nuevo negocio del turismo
          </p>
          <h2 className="mb-10 max-w-3xl text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
            De una propiedad a una experiencia que la gente quiera{' '}
            <em className="not-italic text-brand-green">vivir y recomendar.</em>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {METODO.map(([numero, titulo, texto]) => (
              <article key={numero} className="rounded-2xl border border-brand-border bg-brand-card p-5">
                <span className="text-[11px] font-bold tracking-[0.14em] text-brand-green">{numero}</span>
                <h3 className="mb-2 mt-2 text-[17px] font-bold text-brand-text">{titulo}</h3>
                <p className="text-[14px] leading-relaxed text-brand-muted">{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Caso real ────────────────────────────────────────────────── */}
      <section id="caso" className="scroll-mt-24 border-t border-brand-border px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-4xl">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            Caso real: Bike &amp; Bed Arenal
          </p>
          <h2 className="mb-5 text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
            Cerca de $200.000 en sus primeros 11 meses.
          </h2>
          <p className="mb-8 text-[15px] leading-relaxed text-brand-muted">
            Bike &amp; Bed nació para unir hospitalidad, naturaleza, ciclismo y experiencias
            en La Fortuna. En un terreno de 1.000 m² se desarrollaron 5 villas con
            aproximadamente 320 m² de construcción. La inversión total fue cercana a
            $600.000, el banco financió $360.000 a una tasa del 10% y los gastos operativos
            representan aproximadamente el 25% de los ingresos.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              ['5', 'villas en primera etapa'],
              ['≈75%', 'ocupación aproximada'],
              ['≈$200K', 'ingresos acumulados en 11 meses*'],
              ['25%', 'gastos operativos aproximados'],
            ].map(([dato, pie]) => (
              <div key={pie} className="rounded-2xl border border-brand-border bg-brand-card p-4">
                <b className="block text-[22px] font-bold tracking-tight text-brand-text">{dato}</b>
                <span className="mt-1 block text-[11.5px] leading-snug text-brand-muted">{pie}</span>
              </div>
            ))}
          </div>

          <div className="mb-7 rounded-2xl border border-brand-green/25 bg-brand-green/[0.06] p-5">
            <b className="mb-1.5 block text-[14px] font-bold text-brand-text">
              Superhost · 4.96 de valoración · respuesta en menos de 1 hora
            </b>
            <span className="text-[13.5px] leading-relaxed text-brand-muted">
              Estos resultados también dependen de un equipo que responda rápido, administre
              bien y mantenga una operación consistente.
            </span>
          </div>

          <p className="text-[11.5px] leading-relaxed text-brand-muted/70">
            *Datos aproximados de los primeros 11 meses de operación. No representan utilidad
            neta ni garantizan resultados futuros.
          </p>
        </div>
      </section>

      {/* ── Preguntas frecuentes ─────────────────────────────────────── */}
      <section className="border-t border-brand-border px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-10 text-[26px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-[34px]">
            Preguntas frecuentes
          </h2>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            Sobre la calculadora y sus números
          </p>
          <div className="mb-12 space-y-3">
            {PREGUNTAS_CALCULADORA.map(([pregunta, respuesta]) => (
              <details
                key={pregunta}
                className="group rounded-2xl border border-brand-border bg-brand-card p-5 open:border-brand-green/30"
              >
                <summary className="cursor-pointer list-none text-[15px] font-bold text-brand-text marker:hidden">
                  {pregunta}
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-brand-muted">{respuesta}</p>
              </details>
            ))}
          </div>

          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-green">
            Sobre hacerlo por tu cuenta o conmigo
          </p>
          <div className="space-y-3">
            {PREGUNTAS_NEGOCIO.map(([pregunta, respuesta]) => (
              <details
                key={pregunta}
                className="group rounded-2xl border border-brand-border bg-brand-card p-5 open:border-brand-green/30"
              >
                <summary className="cursor-pointer list-none text-[15px] font-bold text-brand-text marker:hidden">
                  {pregunta}
                </summary>
                <p className="mt-3 text-[14px] leading-relaxed text-brand-muted">{respuesta}</p>
              </details>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-brand-green/25 bg-brand-green/[0.06] p-6 text-center">
            <p className="mb-1.5 text-[16px] font-bold text-brand-text">
              ¿Te quedó una duda que no está acá?
            </p>
            <p className="mb-5 text-[14px] leading-relaxed text-brand-muted">
              Contame en qué etapa estás y te respondo.
            </p>
            <Link
              href="/contacto"
              className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl
                         bg-brand-green px-6 text-[15px] font-bold uppercase tracking-wide
                         text-brand-bg transition-opacity hover:opacity-90 sm:w-auto"
            >
              Quiero asesoría / ser codueño
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
