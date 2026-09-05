import Image from 'next/image'
import Link from 'next/link'
import {
  Bike, Dumbbell, Waves, Snowflake, Salad, Moon, TreePine, Users,
  MapPin, CalendarDays, Flame, Instagram, MessageCircle, Check, X,
} from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import {
  RIFA, RESERVA, OFERTA, ANFITRIONES, EXPERIENCIA, FOTOS, LOGO_BNB,
  enlaceWhatsApp,
} from '@/data/ride-and-reset'

/**
 * La página de reserva de RIDE & RESET — la venta directa.
 *
 * Aparte de la rifa (`/ride-and-reset`), que regala 2 cupos. Acá se compra:
 * de los 10 espacios de la experiencia, 5 con precio especial.
 *
 * ⚠️ TODOS LOS BOTONES VAN A WHATSAPP, a propósito. Hay otra página viva en
 * `arenal-bike-reset.emergent.host` que muestra $1.995, fechas de septiembre y
 * una preventa vencida el 1 de julio de 2026. Enlazarla desde acá haría que la
 * persona vea un precio distinto justo al hacer clic — el peor momento posible.
 * Tony dijo que él se encarga de esa página.
 */

const URL_PAGINA = 'https://www.tonyalvarado.com/ride-and-reset/reservar'

export const metadata = {
  title: `RIDE & RESET — ${RESERVA.cupos} cupos a $${RESERVA.precio.ahora} en Bike & Bed, La Fortuna`,
  description:
    `Asegurá tu lugar en RIDE & RESET: ${RIFA.fechas.dias} días y ${RIFA.fechas.noches} noches ` +
    `en La Fortuna, del 5 al 8 de octubre de 2026. Solo ${RESERVA.cupos} cupos con precio ` +
    `especial de $${RESERVA.precio.ahora}. Rides alrededor del Volcán Arenal, entrenamiento, ` +
    'termales y recuperación, hospedado en Bike & Bed.',
  alternates: { canonical: '/ride-and-reset/reservar' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: URL_PAGINA,
    siteName: 'Bike & Bed',
    title: `RIDE & RESET — solo ${RESERVA.cupos} cupos a $${RESERVA.precio.ahora}`,
    description: `${RIFA.fechas.texto}. Ciclismo, recuperación y rendimiento en el Volcán Arenal.`,
    images: [{ url: FOTOS.portada.src, width: FOTOS.portada.ancho, height: FOTOS.portada.alto, alt: FOTOS.portada.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `RIDE & RESET — solo ${RESERVA.cupos} cupos a $${RESERVA.precio.ahora}`,
    description: `${RIFA.fechas.texto}, en Bike & Bed, La Fortuna.`,
    images: [FOTOS.portada.src],
  },
}

const ICONOS = {
  bici: Bike, fuerza: Dumbbell, termales: Waves, frio: Snowflake,
  nutricion: Salad, sueno: Moon, naturaleza: TreePine, equipo: Users,
} as const

export default function Reservar() {
  const wa = enlaceWhatsApp(OFERTA.mensajeWhatsApp)
  const ahorro = RESERVA.precio.antes - RESERVA.precio.ahora
  const porcentaje = Math.round((ahorro / RESERVA.precio.antes) * 100)

  const producto = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${RIFA.nombre} — ${RIFA.lugar}`,
    description:
      `${RIFA.fechas.dias} días y ${RIFA.fechas.noches} noches de ciclismo, recuperación y ` +
      'rendimiento en La Fortuna, hospedado en Bike & Bed.',
    image: [`https://www.tonyalvarado.com${FOTOS.portada.src}`],
    brand: { '@type': 'Brand', name: 'Bike & Bed' },
    offers: {
      '@type': 'Offer',
      url: URL_PAGINA,
      price: RESERVA.precio.ahora,
      priceCurrency: RESERVA.precio.moneda,
      availability: 'https://schema.org/LimitedAvailability',
      inventoryLevel: { '@type': 'QuantitativeValue', value: RESERVA.cupos },
    },
  }

  return (
    <main className="bg-bnb-negro">
      <JsonLd data={producto} />

      {/* ══ Portada ═══════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[90vh] flex-col justify-end overflow-hidden">
        <Image
          src={FOTOS.portada.src}
          alt={FOTOS.portada.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: FOTOS.portada.encuadre }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bnb-negro via-bnb-negro/80 to-bnb-negro/30" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:pb-24">
          <div className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <Image
              src={LOGO_BNB.src}
              alt={LOGO_BNB.alt}
              width={LOGO_BNB.ancho}
              height={LOGO_BNB.alto}
              priority
              className="h-20 w-auto sm:h-24"
            />
            <a
              href={RIFA.cuentaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border
                         border-bnb-blanco/30 bg-bnb-negro/50 px-4 text-[14px] font-semibold
                         text-bnb-blanco backdrop-blur-sm transition-colors
                         hover:border-bnb-verde hover:text-bnb-verde"
            >
              <Instagram size={16} />
              {RIFA.cuenta}
            </a>
          </div>

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-bnb-verde
                        bg-bnb-negro/60 px-4 py-1.5 font-bnb-titulo text-[12px] font-bold
                        uppercase tracking-[0.16em] text-bnb-verde backdrop-blur-sm">
            <Flame size={14} /> Solo quedan {RESERVA.cupos} cupos con este precio
          </p>

          <h1 className="mb-5 max-w-3xl font-bnb-titulo text-4xl font-extrabold leading-[1.05]
                         text-bnb-blanco sm:text-6xl lg:text-7xl">
            {OFERTA.titulo}
            <span className="block text-bnb-verde">
              en <span className="whitespace-nowrap">{RIFA.nombre}</span>
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-[17px] leading-relaxed text-bnb-humo sm:text-[19px]">
            {OFERTA.bajada}
          </p>

          <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-4">
            <Dato icono={CalendarDays} titulo="Cuándo">{RIFA.fechas.texto}</Dato>
            <Dato icono={MapPin} titulo="Dónde">{RIFA.lugar}</Dato>
            <Dato icono={Users} titulo="Cupos">
              {RESERVA.cupos} de {RESERVA.cuposTotales}
            </Dato>
          </dl>

          <BotonWhatsApp href={wa} grande>Reservar mi cupo</BotonWhatsApp>
        </div>
      </section>

      {/* ══ El precio ═════════════════════════════════════════════════════ */}
      <section className="border-y border-bnb-borde bg-bnb-carbon">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <p className="mb-6 font-bnb-titulo text-[12px] font-bold uppercase tracking-[0.18em] text-bnb-verde">
            Precio especial · {RESERVA.cupos} cupos
          </p>

          <div className="mb-4 flex flex-wrap items-baseline justify-center gap-x-4 gap-y-2">
            <span className="font-bnb-titulo text-[22px] text-bnb-tenue line-through sm:text-[26px]">
              ${RESERVA.precio.antes.toLocaleString('en-US')}
            </span>
            <span className="font-bnb-titulo text-6xl font-extrabold text-bnb-verde sm:text-7xl">
              ${RESERVA.precio.ahora.toLocaleString('en-US')}
            </span>
            <span className="font-bnb-titulo text-[15px] font-semibold text-bnb-humo">
              {RESERVA.precio.moneda}
            </span>
          </div>

          <p className="mb-2 text-[15px] text-bnb-humo">
            Ahorrás <strong className="text-bnb-blanco">${ahorro.toLocaleString('en-US')}</strong>
            {' '}— un {porcentaje}% menos — por persona.
          </p>
          <p className="mb-8 text-[15px] leading-relaxed text-bnb-humo">
            Incluye todo lo de la experiencia completa: {RIFA.fechas.dias} días y{' '}
            {RIFA.fechas.noches} noches de hospedaje en Bike & Bed.
          </p>

          <p className="mb-8 inline-flex items-center gap-2 rounded-xl border border-bnb-verde/40
                        bg-bnb-verde/10 px-5 py-3 text-[14.5px] font-semibold text-bnb-blanco">
            <Flame size={16} className="shrink-0 text-bnb-verde" />
            {OFERTA.urgencia}
          </p>

          <div>
            <BotonWhatsApp href={wa} grande>Quiero reservar ahora</BotonWhatsApp>
          </div>
        </div>
      </section>

      {/* ══ Qué incluye ═══════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <div className="mb-10 max-w-2xl">
          <h2 className="mb-3 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
            Qué incluye
          </h2>
          <p className="text-[16.5px] leading-relaxed text-bnb-humo">
            Una experiencia creada alrededor del ciclismo, la recuperación y el rendimiento.
          </p>
        </div>

        <ul className="mb-10 grid gap-px overflow-hidden rounded-3xl border border-bnb-borde
                       bg-bnb-borde sm:grid-cols-2">
          {EXPERIENCIA.map((item) => {
            const Icono = ICONOS[item.icono as keyof typeof ICONOS] ?? Bike
            return (
              <li key={item.titulo} className="flex items-start gap-4 bg-bnb-carbon p-6">
                <Icono size={22} className="mt-0.5 shrink-0 text-bnb-verde" strokeWidth={1.75} />
                <span className="text-[15.5px] leading-relaxed text-bnb-humo">{item.titulo}</span>
              </li>
            )
          })}
        </ul>

        {/* Lo que NO incluye va a propósito: evita el reclamo después. */}
        <div className="rounded-3xl border border-bnb-borde bg-bnb-carbon p-7">
          <h3 className="mb-4 font-bnb-titulo text-lg font-bold text-bnb-blanco">No incluye</h3>
          <ul className="grid gap-2.5 sm:grid-cols-2">
            {OFERTA.noIncluye.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-bnb-tenue">
                <X size={16} className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ Quiénes te acompañan ══════════════════════════════════════════ */}
      <section className="border-y border-bnb-borde bg-bnb-carbon">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="mb-10 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
            Quiénes te acompañan
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {ANFITRIONES.map((a) => (
              <article key={a.nombre} className="rounded-3xl border border-bnb-borde bg-bnb-negro p-7">
                <p className="mb-1 font-bnb-titulo text-[11.5px] font-bold uppercase tracking-[0.16em] text-bnb-verde">
                  {a.rol}
                </p>
                <h3 className="mb-1 font-bnb-titulo text-2xl font-bold text-bnb-blanco">{a.nombre}</h3>
                <a
                  href={a.sitio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 inline-block text-[13px] text-bnb-tenue underline
                             decoration-bnb-borde underline-offset-4 transition-colors
                             hover:text-bnb-humo hover:decoration-bnb-verde"
                >
                  {a.marca}
                </a>
                <p className="text-[15px] leading-relaxed text-bnb-humo">{a.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ══ Cierre ════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
        <h2 className="mb-5 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
          {RESERVA.cupos} cupos. {RIFA.fechas.dias} días. Una decisión.
        </h2>
        <p className="mx-auto mb-9 max-w-xl text-[17px] leading-relaxed text-bnb-humo">
          Escribinos por WhatsApp y te pasamos los detalles para reservar. Te contestamos
          nosotros, no un robot.
        </p>

        <BotonWhatsApp href={wa} grande>Escribinos por WhatsApp</BotonWhatsApp>

        <div className="mt-14 rounded-3xl border border-bnb-borde bg-bnb-carbon p-8">
          <Image
            src={LOGO_BNB.src}
            alt={LOGO_BNB.alt}
            width={LOGO_BNB.ancho}
            height={LOGO_BNB.alto}
            className="mx-auto mb-5 h-16 w-auto"
          />
          <p className="mx-auto mb-6 max-w-md text-[15px] leading-relaxed text-bnb-humo">
            Seguinos: ahí publicamos los rides, la vida del hotel y cuándo abrimos la
            próxima experiencia.
          </p>
          <a
            href={RIFA.cuentaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-2xl
                       border-2 border-bnb-blanco px-7 text-[15px] font-bold text-bnb-blanco
                       transition-colors hover:border-bnb-verde hover:bg-bnb-verde hover:text-bnb-negro"
          >
            <Instagram size={18} />
            Seguir {RIFA.cuenta}
          </a>
        </div>

        {/* El puente a la rifa: quien no quiere pagar todavía, igual queda en el CRM. */}
        <p className="mt-10 text-[14px] leading-relaxed text-bnb-tenue">
          ¿Preferís intentar la suerte primero? También estamos regalando{' '}
          <Link
            href="/ride-and-reset"
            className="font-semibold text-bnb-humo underline decoration-bnb-borde
                       underline-offset-4 transition-colors hover:text-bnb-verde"
          >
            {RIFA.cupos} cupos gratis en la rifa
          </Link>
          .
        </p>

        <p className="mt-8 text-[12.5px] text-bnb-tenue">
          Bike &amp; Bed · La Fortuna de San Carlos, Costa Rica ·{' '}
          <a
            href={RIFA.cuentaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-bnb-borde underline-offset-4 transition-colors hover:text-bnb-humo"
          >
            {RIFA.cuenta}
          </a>
          {' · '}
          <a
            href="https://www.tonyalvarado.com/politica-de-privacidad"
            className="underline decoration-bnb-borde underline-offset-4 transition-colors hover:text-bnb-humo"
          >
            Política de privacidad
          </a>
        </p>
      </section>
    </main>
  )
}

// ── Piezas ──────────────────────────────────────────────────────────────────

/**
 * El único llamado a la acción de la página.
 *
 * Si todavía no hay número de WhatsApp configurado, no se dibuja un botón
 * muerto: se dice qué falta. Un botón que no hace nada es peor que ninguno.
 */
function BotonWhatsApp({ href, grande, children }: {
  href: string | null
  grande?: boolean
  children: React.ReactNode
}) {
  if (!href) {
    return (
      <p className="inline-block rounded-xl border border-bnb-borde px-5 py-3 text-[14px] text-bnb-tenue">
        Falta configurar el número de WhatsApp en <code>src/data/ride-and-reset.ts</code>.
      </p>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-2xl bg-bnb-verde
                  font-bold text-bnb-negro transition-colors hover:bg-bnb-verde-fuerte
                  ${grande ? 'min-h-[62px] px-9 text-[17px]' : 'min-h-[54px] px-7 text-[15px]'}`}
    >
      <MessageCircle size={grande ? 20 : 18} />
      {children}
    </a>
  )
}

function Dato({ icono: Icono, titulo, children }: {
  icono: typeof MapPin
  titulo: string
  children: React.ReactNode
}) {
  return (
    <div>
      <dt className="mb-1 flex items-center gap-1.5 font-bnb-titulo text-[11px] font-bold
                     uppercase tracking-[0.16em] text-bnb-tenue">
        <Icono size={13} /> {titulo}
      </dt>
      <dd className="text-[15.5px] font-medium text-bnb-blanco">{children}</dd>
    </div>
  )
}
