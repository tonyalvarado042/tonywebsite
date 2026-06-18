import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Users, Globe, Star,
  ArrowRight, Mountain, Heart, Wrench, Building2, TrendingUp, Shield,
  CheckCircle2, Zap,
} from 'lucide-react'
import TrackedLink from '@/components/common/TrackedLink'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    absolute: 'Bike & Bed Hotels — Boutique Cycling Hotel in Arenal, Costa Rica | Tony Alvarado',
  },
  description:
    'Bike & Bed Hotels: a cycling-themed boutique hotel in La Fortuna near Arenal Volcano. Cycling, wellness and nature. Investment opportunity in sports tourism.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/bike-bed-hotels' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/bike-bed-hotels',
    siteName: 'Tony Alvarado',
    title: 'Bike & Bed Hotels — Boutique Cycling Hotel in Arenal',
    description:
      'Cycling-themed boutique hotel in La Fortuna near Arenal Volcano. Cycling, wellness and nature.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'Bike & Bed Hotels — boutique cycling hotel in Arenal, Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bike & Bed Hotels — Boutique Cycling Hotel in Arenal',
    description:
      'Cycling-themed boutique hotel in La Fortuna near Arenal Volcano. Cycling, wellness and nature.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const bikeBedOrgEn = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#bike-bed-hotels`,
  name: 'Bike & Bed Hotels',
  description:
    'Cycling-themed boutique hotel in Costa Rica with professional operations and a vision for global expansion.',
  url: `${SITE_URL}/bike-bed-hotels`,
  founder: personRef,
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/bike-bed-hotels#webpage`,
  name: 'Bike & Bed Hotels — Boutique Cycling Hotel in Arenal, Costa Rica | Tony Alvarado',
  description:
    'Bike & Bed Hotels: a cycling-themed boutique hotel in La Fortuna near Arenal Volcano. Cycling, wellness and nature. Investment opportunity in sports tourism.',
  url: `${SITE_URL}/en/bike-bed-hotels`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#bike-bed-hotels` }],
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Bike & Bed Hotels', item: `${SITE_URL}/en/bike-bed-hotels` },
  ],
}

const uniquePoints = [
  {
    icon: Zap,
    title: 'Cycling-focused design',
    description:
      'A hotel concept built around the needs of cyclists: infrastructure, routes, community and hospitality in one place.',
  },
  {
    icon: MapPin,
    title: 'Prime location',
    description:
      'In La Fortuna de San Carlos, minutes from Arenal Volcano and with access to MTB, gravel and road routes.',
  },
  {
    icon: Users,
    title: 'Connected to the PuroMTB ecosystem',
    description:
      'Integrated into the PuroMTB ecosystem — a cycling community and store built by Tony Alvarado since 2004.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable model',
    description:
      'A concept designed to be replicable: through direct investment, franchise or conversion of existing properties.',
  },
  {
    icon: Globe,
    title: 'Active tourism on the rise',
    description:
      'Sports and wellness tourism is a growing segment in the global hotel industry.',
  },
  {
    icon: Shield,
    title: 'Operating model',
    description:
      'A project currently operating in La Fortuna, with brand, team and a cycling-focused hospitality model.',
  },
]

const amenities = [
  { icon: Wrench,    label: 'Secure bicycle stations' },
  { icon: Mountain,  label: 'Access to cycling routes' },
  { icon: Heart,     label: 'Jacuzzi and recovery area' },
  { icon: Building2, label: 'Modern cabins with scenic views' },
  { icon: Users,     label: 'Active cycling community' },
  { icon: Star,      label: 'Personalized hospitality' },
]

const investmentPillars = [
  {
    title: 'Fractional participation',
    description:
      'Participate in an operating model without building everything from scratch. Access to a business already running.',
  },
  {
    title: 'Operating project',
    description:
      'Not an idea. A hotel in operation with real guests and an established brand.',
  },
  {
    title: 'Operating model',
    description:
      'An existing hospitality operation with structured processes and a vision for expansion.',
  },
  {
    title: 'Active tourism sector',
    description:
      'Sports and wellness tourism is a growing segment in global hospitality.',
  },
]

const joinWays = [
  {
    number: '01',
    title: 'Invest in new destinations',
    description:
      'Participate in the expansion of Bike & Bed to new locations in Costa Rica and Latin America.',
  },
  {
    number: '02',
    title: 'Franchise a Bike & Bed',
    description:
      'Acquire the model, the brand and the know-how of Bike & Bed to operate your own cycling-themed hotel.',
  },
  {
    number: '03',
    title: 'Convert your property',
    description:
      'If you own an existing accommodation, integrate it into the Bike & Bed model and access the network, brand and community.',
  },
]

const galleryImages = [
  { src: '/images/bike-bed/bike-bed-interior-01.jpg',       alt: 'Bike & Bed Hotels — premium interior, kitchen and social area',   position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-jacuzzi-01.jpg',        alt: 'Jacuzzi and wellness area at Bike & Bed Hotels',                   position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-cabin-exterior-01.jpg', alt: 'Bike & Bed Hotels cabin exterior in La Fortuna, Arenal',           position: 'object-center' },
  { src: '/images/bike-bed/bike-bed-aerial-volcano-01.png', alt: 'Aerial view of Bike & Bed Hotels with Arenal Volcano in the back', position: 'object-[50%_70%]' },
]

const visionCards = [
  { value: 'Global',  label: 'Vision for international expansion' },
  { value: 'Cycling', label: 'Community at the core' },
  { value: 'Purpose', label: 'Wellness and hospitality with meaning' },
]

export default function EnBikeBedHotelsPage() {
  return (
    <main>
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />
      <JsonLd data={bikeBedOrgEn} />

      {/* ── Hero — editorial full-width ── */}
      <section className="relative bg-brand-bg">
        <div className="relative h-[560px] overflow-hidden md:h-[640px]">
          <Image
            src="/images/bike-bed/bike-bed-aerial-volcano-01.png"
            alt="Bike & Bed Hotels — aerial view with Arenal Volcano, La Fortuna, Costa Rica"
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
              La Fortuna · Arenal Volcano · Costa Rica
            </span>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              A boutique cycling hotel<br />
              <span className="text-brand-green">in La Fortuna, Costa Rica.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-base text-white/70 md:text-lg">
              Cycling, wellness, nature and hospitality in one destination.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <TrackedLink
                href="https://www.bikeandbedhotels.com/"
                event="click_bike_bed"
                params={{ cta_text: 'Visit the hotel', cta_location: 'bike_bed_hero', destination_type: 'external' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.4)] transition-opacity hover:opacity-90"
              >
                Visit the hotel <ArrowRight size={15} />
              </TrackedLink>
              <Link
                href="#investment"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Explore investment <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-brand-surface py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: 'Cycling', label: 'Themed hotel concept',        gold: true  },
              { value: 'MTB',     label: 'Road · Gravel routes nearby',  gold: false },
              { value: 'Arenal',  label: 'La Fortuna, Costa Rica',       gold: true  },
              { value: 'Global',  label: 'Long-term expansion vision',   gold: false },
            ].map(({ value, label, gold }) => (
              <div key={label} className="text-center">
                <p className={`text-3xl font-bold md:text-4xl ${gold ? 'text-brand-gold' : 'text-brand-text'}`}>{value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                The concept
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Not just a hotel.<br />
                <span className="text-brand-green">A transformative experience.</span>
              </h2>
              <p className="text-brand-muted">
                Bike &amp; Bed Arenal was born from a clear idea: create accommodation where
                cyclists can rest, recover and connect with other passionate riders — without
                sacrificing comfort or authenticity.
              </p>
              <p className="text-brand-muted">
                Located in La Fortuna de San Carlos, minutes from Arenal Volcano and some of the
                best cycling routes in the country. A destination where cycling, wellness, nature
                and hospitality come together in one unique concept in Costa Rica.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {['Cycling', 'Nature', 'Wellness', 'Community', 'Adventure', 'Hospitality'].map((tag) => (
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
                  alt="Cyclists enjoying Bike & Bed Hotels in La Fortuna, Costa Rica"
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

      {/* ── Why it's unique ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Differentiators
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Why Bike &amp; Bed is<br />
              <span className="text-brand-green">a different proposition.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {uniquePoints.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <Icon size={20} className="mb-3 text-brand-green" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              The hotel
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Designed to experience<br />
              <span className="text-brand-green">cycling in full.</span>
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

      {/* ── Amenities ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Accommodation
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Designed from the ground up<br />
              <span className="text-brand-green">for the modern cyclist.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              Every detail at Bike &amp; Bed is designed for the cyclist: specialized infrastructure,
              real comfort and an environment that invites rest and recovery.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ icon: Icon, label }) => (
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

      {/* ── Wellness ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Wellness · Nature · Community
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            Pedal. Rest.<br />
            <span className="text-brand-green">Reconnect.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-muted">
            Bike &amp; Bed thinks beyond the bicycle. It thinks about everything around it.
            Thermal waters, jacuzzi, volcanic nature, quiet and the right community to make
            every stay a complete wellness experience.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              'Post-ride recovery',
              'Jacuzzi and thermal waters',
              'Volcanic nature',
              'Cycling community',
              'Routes for all levels',
              'Quiet and disconnection',
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

      {/* ── Investment ── */}
      <section id="investment" className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Investment opportunity
            </p>
            <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
              Bike &amp; Bed as an investment.<br />
              <span className="text-brand-gold">A proven model with global vision.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              You are not investing in an idea. You are participating in a model that already
              operates, with brand, community, reputation and a vision for international expansion.
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
                  alt="Investment opportunity — Bike & Bed Hotels"
                  fill
                  loading="lazy"
                  quality={90}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 288px"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Investment opportunity
                </p>
                <p className="text-2xl font-bold text-brand-text">Sports tourism with purpose</p>
                <p className="mt-4 max-w-lg text-sm text-brand-muted">
                  All financial details are presented in a personalized and confidential way
                  directly with the Bike &amp; Bed team. Participation opportunities are
                  evaluated on a case-by-case basis.
                </p>
                <p className="mt-2 text-xs text-brand-muted/50">
                  No investment returns are guaranteed. This information is referential and does
                  not constitute a public offer of securities.
                </p>
                <div className="mt-7">
                  <TrackedLink
                    href="/en/contact?interest=bike-bed-inversion#form"
                    event="click_contact_investment"
                    params={{ cta_text: 'Request information', cta_location: 'bike_bed_investment', destination_type: 'internal', interest: 'bike-bed-inversion' }}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
                  >
                    Request information <ArrowRight size={15} />
                  </TrackedLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 ways ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              How to participate
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              3 ways to join<br />
              <span className="text-brand-green">Bike &amp; Bed.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {joinWays.map(({ number, title, description }) => (
              <div key={number} className="rounded-xl border border-brand-border bg-brand-card p-7">
                <p className="mb-4 text-4xl font-bold text-brand-gold/30">{number}</p>
                <h3 className="mb-3 text-lg font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Long-term vision
          </p>
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            A global vision<br />
            <span className="text-brand-green">for cycling hospitality.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-brand-muted">
            Bike &amp; Bed is not just a hotel. It is the first step of a global movement.
            The vision is to build an international network of destinations for cyclists that
            transforms tourism, strengthens local economies and brings cycling as a wellness tool
            to every corner of the world. Pedal by pedal.
          </p>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-4 text-center sm:grid-cols-3">
            {visionCards.map(({ value, label }) => (
              <div key={label} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <p className="text-2xl font-bold text-brand-gold">{value}</p>
                <p className="mt-1 text-xs text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text md:text-4xl">
            Ready for the next step?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            Whether you want to experience the hotel or explore the investment opportunity,
            we are here to help.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <TrackedLink
              href="https://www.bikeandbedhotels.com/"
              event="click_bike_bed"
              params={{ cta_text: 'Visit the hotel', cta_location: 'bike_bed_cta_final', destination_type: 'external' }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.35)] transition-opacity hover:opacity-90"
            >
              Visit the hotel <ArrowRight size={15} />
            </TrackedLink>
            <TrackedLink
              href="/en/contact?interest=bike-bed-inversion#form"
              event="click_contact_investment"
              params={{ cta_text: 'Talk about investment', cta_location: 'bike_bed_cta_final', destination_type: 'internal', interest: 'bike-bed-inversion' }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-surface"
            >
              Talk about investment <ArrowRight size={15} />
            </TrackedLink>
          </div>
        </div>
      </section>

    </main>
  )
}
