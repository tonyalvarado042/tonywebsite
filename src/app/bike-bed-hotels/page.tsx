import Image from 'next/image'
import Link from 'next/link'
import {
  Star, MapPin, Users, TrendingUp, Shield, Globe,
  CheckCircle2, ArrowRight, Zap, Mountain, Heart, Wrench, Building2,
} from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef, bikeBedOrg } from '@/lib/structured-data'

export const metadata = {
  title: 'Bike & Bed Hotels — Hotel boutique para ciclistas en Arenal, Costa Rica',
  description:
    'Bike & Bed Hotels: el primer hotel creado por y para ciclistas en Costa Rica, ubicado en La Fortuna junto al Volcán Arenal. Ciclismo, bienestar y naturaleza. Oportunidad de inversión en turismo deportivo.',
  alternates: { canonical: '/bike-bed-hotels' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/bike-bed-hotels#webpage`,
  name: 'Bike & Bed Hotels — Hotel boutique para ciclistas en Arenal, Costa Rica',
  description:
    'Bike & Bed Hotels: el primer hotel creado por y para ciclistas en Costa Rica, ubicado en La Fortuna junto al Volcán Arenal. Ciclismo, bienestar y naturaleza. Oportunidad de inversión en turismo deportivo.',
  url: `${SITE_URL}/bike-bed-hotels`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#bike-bed-hotels` }],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Bike & Bed Hotels', item: `${SITE_URL}/bike-bed-hotels` },
  ],
}

const uniquePoints = [
  {
    Icon: Zap,
    title: 'Primero en Costa Rica',
    description:
      'El primer hotel temático de ciclismo del país, con más de 250 reseñas de 5 estrellas en plataformas de viaje.',
  },
  {
    Icon: MapPin,
    title: 'Ubicación privilegiada',
    description:
      'En La Fortuna de San Carlos, a minutos del Volcán Arenal y con acceso a rutas de MTB, gravel y carretera.',
  },
  {
    Icon: Users,
    title: 'Conectado a 400K ciclistas',
    description:
      'Integrado al ecosistema de PuroMTB, una de las comunidades ciclistas más grandes de Latinoamérica.',
  },
  {
    Icon: TrendingUp,
    title: 'Modelo escalable',
    description:
      'Un concepto replicable a nivel global: por inversión directa, franquicia o transformación de hospedajes existentes.',
  },
  {
    Icon: Globe,
    title: 'Turismo activo en auge',
    description:
      'El turismo de aventura y bienestar es el segmento de mayor crecimiento en la industria hotelera mundial.',
  },
  {
    Icon: Shield,
    title: 'Operación probada',
    description:
      'Marca, equipo y know-how ya construidos. No empiezas desde cero — te sumas a algo que ya funciona.',
  },
]

const amenities = [
  { Icon: Wrench, label: 'Estaciones seguras para bicicletas' },
  { Icon: Mountain, label: 'Acceso a rutas ciclistas de nivel' },
  { Icon: Heart, label: 'Jacuzzi y zona de recuperación' },
  { Icon: Building2, label: 'Cabañas modernas con vistas al entorno' },
  { Icon: Users, label: 'Comunidad activa de ciclistas' },
  { Icon: Star, label: 'Hospitalidad de 5 estrellas' },
]

const investmentPillars = [
  {
    title: 'Inversión fraccionada',
    description:
      'Participar en un modelo probado sin construir todo desde cero. Acceso a una operación ya funcionando.',
  },
  {
    title: 'Proyecto operando',
    description:
      'No es una idea. Es un hotel en funcionamiento con huéspedes reales, reseñas verificadas y marca consolidada.',
  },
  {
    title: 'Modelo probado',
    description:
      'Un concepto validado por el mercado, con comunidad, operación estructurada y visión de expansión.',
  },
  {
    title: 'Alta proyección',
    description:
      'El turismo deportivo y de bienestar es el segmento de mayor crecimiento en la hotelería global.',
  },
]

const joinModes = [
  {
    number: '01',
    title: 'Invertir en nuevos destinos',
    description:
      'Participar en la expansión de Bike & Bed a nuevas ubicaciones en Costa Rica y Latinoamérica. Inversión desde US$50,000.',
  },
  {
    number: '02',
    title: 'Franquiciar un Bike & Bed',
    description:
      'Adquirir el modelo, la marca y el know-how de Bike & Bed para operar tu propio hotel temático de ciclismo.',
  },
  {
    number: '03',
    title: 'Transformar tu hospedaje',
    description:
      'Si tienes un alojamiento existente, intégralo al modelo Bike & Bed y accede a la red, la marca y la comunidad.',
  },
]

const galleryImages = [
  { src: '/images/bike-bed/bike-bed-interior-01.jpg', alt: 'Interior premium de Bike & Bed Hotels — cocina y área social', position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-jacuzzi-01.jpg', alt: 'Jacuzzi y zona de bienestar en Bike & Bed Hotels', position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-cabin-exterior-01.jpg', alt: 'Cabaña exterior de Bike & Bed Hotels en La Fortuna, Arenal', position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-aerial-volcano-01.png', alt: 'Vista desde Bike & Bed Hotels con Volcán Arenal al fondo', position: 'object-[50%_70%]' },
]

export default function BikeBedPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bikeBedOrg} />

      {/* ─── HERO ─── */}
      <section className="relative bg-brand-bg">
        <div className="relative h-[560px] overflow-hidden md:h-[640px]">
          <Image
            src="/images/bike-bed/bike-bed-aerial-volcano-01.png"
            alt="Bike & Bed Hotels — vista aérea con Volcán Arenal, La Fortuna, Costa Rica"
            fill
            priority
            quality={90}
            className="object-cover object-[50%_40%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/55 via-brand-bg/30 to-brand-bg" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-brand-bg/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-green backdrop-blur-sm">
              <MapPin size={11} />
              La Fortuna · Volcán Arenal · Costa Rica
            </span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              El primer hotel creado<br />
              <span className="text-brand-green">por y para ciclistas.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/70 md:text-lg">
              Ciclismo, bienestar, naturaleza y hospitalidad en un solo destino.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="https://www.bikeandbedhotels.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.4)] transition-opacity hover:opacity-90"
              >
                Conocer el hotel <ArrowRight size={15} />
              </Link>
              <Link
                href="#inversion"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Explorar inversión <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="bg-brand-surface py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '+250', label: 'Reseñas de 5 estrellas', gold: false },
              { value: '1°', label: 'Hotel ciclista en Costa Rica', gold: true },
              { value: 'Arenal', label: 'La Fortuna, Costa Rica', gold: true },
              { value: '2050', label: 'Meta: red global de hoteles', gold: false },
            ].map(({ value, label, gold }) => (
              <div key={label} className="text-center">
                <p className={`text-3xl font-bold md:text-4xl ${gold ? 'text-brand-gold' : 'text-brand-text'}`}>{value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONCEPTO ─── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                El concepto
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                No es solo un hotel.<br />
                <span className="text-brand-green">Es una experiencia transformadora.</span>
              </h2>
              <p className="text-brand-muted">
                Bike & Bed Arenal nació de una idea clara: crear un alojamiento donde los ciclistas
                puedan descansar, recuperarse y conectar con otros apasionados, sin sacrificar
                comodidad ni autenticidad.
              </p>
              <p className="text-brand-muted">
                Ubicado en La Fortuna de San Carlos, a pocos minutos del Volcán Arenal y de algunas
                de las mejores rutas ciclistas del país. Un destino donde el ciclismo, el bienestar,
                la naturaleza y la hospitalidad se fusionan en un concepto único en Costa Rica.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {['Ciclismo', 'Naturaleza', 'Bienestar', 'Comunidad', 'Aventura', 'Hospitalidad'].map((tag) => (
                  <div key={tag} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={14} className="shrink-0 text-brand-green" />
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/bike-bed/bike-bed-cyclists-couple-01.jpg"
                  alt="Ciclistas disfrutando de Bike & Bed Hotels en La Fortuna, Costa Rica"
                  fill
                  quality={100}
                  loading="lazy"
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── POR QUÉ ES ÚNICO ─── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Diferenciadores
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Por qué Bike & Bed es<br />
              <span className="text-brand-green">una propuesta diferente.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uniquePoints.map(({ Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <Icon size={20} className="mb-3 text-brand-green" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALERÍA ─── */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              El hotel
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Diseñado para vivir<br />
              <span className="text-brand-green">el ciclismo completo.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {galleryImages.map(({ src, alt, position }) => (
              <div
                key={src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-brand-border/40 bg-brand-card"
              >
                <Image
                  src={src}
                  alt={alt}
                  fill
                  loading="lazy"
                  quality={100}
                  className={`object-cover ${position}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOSPEDAJE PARA CICLISTAS ─── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Hospedaje
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Diseñado desde cero<br />
              <span className="text-brand-green">para el ciclista moderno.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              Cada detalle de Bike & Bed está pensado para el ciclista: infraestructura especializada,
              comodidad real y un entorno que invita al descanso y a la recuperación.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-brand-border bg-brand-card p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <span className="font-medium text-brand-text">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BIENESTAR ─── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Bienestar · Naturaleza · Comunidad
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            Pedalea. Descansa.<br />
            <span className="text-brand-green">Reconéctate.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-muted">
            Bike & Bed no solo piensa en la bicicleta. Piensa en todo lo que hay alrededor.
            Aguas termales, jacuzzi, naturaleza volcánica, silencio y la comunidad adecuada
            para que cada estadía sea una experiencia completa de bienestar.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              'Recuperación post-ride',
              'Jacuzzi y aguas termales',
              'Naturaleza volcánica',
              'Comunidad de ciclistas',
              'Rutas de todos los niveles',
              'Silencio y desconexión',
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-brand-border bg-brand-card px-4 py-1.5 text-xs font-medium text-brand-muted"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INVERSIÓN ─── */}
      <section id="inversion" className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Oportunidad de inversión
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Bike & Bed como inversión.<br />
              <span className="text-brand-gold">Un modelo probado, con visión global.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              No estás invirtiendo en una idea. Estás participando en un modelo que ya opera,
              que tiene marca, comunidad, reputación y visión de expansión internacional.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {investmentPillars.map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <div className="mb-3 h-1 w-8 rounded-full bg-brand-gold" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-card">
            <div className="flex flex-col lg:flex-row">
              <div className="relative h-64 shrink-0 overflow-hidden lg:h-auto lg:w-72">
                <Image
                  src="/images/bike-bed/bike-bed-investment-01.jpeg"
                  alt="Oportunidad de inversión — Bike & Bed Hotels"
                  fill
                  loading="lazy"
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 288px"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Participación desde
                </p>
                <p className="text-5xl font-bold text-brand-text">US$50,000</p>
                <p className="mt-4 max-w-lg text-sm text-brand-muted">
                  Toda la información financiera se presenta de forma personalizada y confidencial
                  directamente con el equipo de Bike & Bed. Las oportunidades de participación
                  se evalúan caso a caso.
                </p>
                <p className="mt-2 text-xs text-brand-muted/50">
                  No se garantizan retornos de inversión. La información es referencial y no
                  constituye una oferta pública de valores.
                </p>
                <div className="mt-7">
                  <Link
                    href="/contacto#formulario"
                    className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
                  >
                    Solicitar información <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3 MANERAS ─── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Cómo participar
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              3 maneras de unirte a<br />
              <span className="text-brand-green">Bike & Bed.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {joinModes.map(({ number, title, description }) => (
              <div key={number} className="rounded-xl border border-brand-border bg-brand-card p-7">
                <p className="mb-4 text-4xl font-bold text-brand-gold/30">{number}</p>
                <h3 className="mb-3 text-lg font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VISIÓN GLOBAL ─── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Visión 2050
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            1,000 bicicletas y camas<br />
            <span className="text-brand-green">en todo el mundo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-muted">
            Bike & Bed no es solo un hotel. Es el primer paso de un movimiento global.
            La visión es construir una red internacional de destinos para ciclistas que
            transforme el turismo, fortalezca las economías locales y lleve el ciclismo
            como herramienta de bienestar a todos los rincones del mundo. Pedalada a pedalada.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 text-center sm:grid-cols-3">
            {[
              { value: '1,000', label: 'Hoteles planeados para 2050' },
              { value: 'Global', label: 'Expansión en múltiples países' },
              { value: '+400K', label: 'Red de ciclistas conectados' },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <p className="text-2xl font-bold text-brand-gold">{value}</p>
                <p className="mt-1 text-xs text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            ¿Listo para el siguiente paso?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            Tanto si quieres vivir la experiencia de hospedaje como si quieres explorar
            la oportunidad de inversión, estamos para atenderte.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="https://www.bikeandbedhotels.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.35)] transition-opacity hover:opacity-90"
            >
              Visitar el hotel <ArrowRight size={15} />
            </Link>
            <Link
              href="/contacto#formulario"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-surface"
            >
              Hablar sobre inversión <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
