import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  MapPin, Users, Globe,
  ArrowRight, Mountain, Heart, Wrench, Building2, Star, TrendingUp, Shield,
} from 'lucide-react'
import TrackedLink from '@/components/common/TrackedLink'

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

const uniquePoints = [
  {
    icon: Star,
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
    icon: Globe,
    title: 'Scalable model',
    description:
      'A concept designed to be replicable: through direct investment, franchise or conversion of existing properties.',
  },
  {
    icon: TrendingUp,
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

const visionCards = [
  { value: 'Global', label: 'Vision for international expansion' },
  { value: 'Cycling', label: 'Community at the core' },
  { value: 'Purpose', label: 'Wellness and hospitality with meaning' },
]

export default function EnBikeBedHotelsPage() {
  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-brand-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-border px-4 py-2 text-xs text-brand-muted">
                <MapPin size={12} className="text-brand-green" />
                La Fortuna · Arenal Volcano · Costa Rica
              </div>
              <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-6xl">
                A boutique cycling hotel in La Fortuna, Costa Rica.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
                Cycling, wellness, nature and hospitality in one destination.
              </p>
              <div className="flex flex-wrap gap-4">
                <TrackedLink
                  href="https://www.bikeandbedhotels.com/"
                  event="click_bike_bed"
                  params={{ cta_location: 'bike_bed_hero' }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
                >
                  Visit the hotel <ArrowRight size={15} />
                </TrackedLink>
                <Link
                  href="#investment"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 px-7 py-3.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold/10"
                >
                  Explore investment
                </Link>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/bike-bed/bike-bed-aerial-volcano-01.png"
                alt="Bike & Bed Hotels — aerial view with Arenal Volcano, La Fortuna, Costa Rica"
                width={700}
                height={525}
                quality={90}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: 'Cycling', label: 'Themed hotel concept', gold: true },
              { value: 'MTB',     label: 'Road · Gravel routes nearby', gold: false },
              { value: 'Arenal',  label: 'La Fortuna, Costa Rica', gold: true },
              { value: 'Global',  label: 'Long-term expansion vision', gold: false },
            ].map(({ value, label, gold }) => (
              <div key={label} className="rounded-2xl border border-brand-border bg-brand-card p-6 text-center">
                <p className={`text-3xl font-bold ${gold ? 'text-brand-gold' : 'text-brand-green'}`}>
                  {value}
                </p>
                <p className="mt-1 text-sm text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Concept ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/bike-bed/bike-bed-cyclists-couple-01.jpg"
                alt="Cyclists enjoying Bike & Bed Hotels in La Fortuna, Costa Rica"
                width={600}
                height={500}
                quality={90}
                className="w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                The concept
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Not just a hotel. A transformative experience.
              </h2>
              <p className="leading-relaxed text-brand-muted">
                Bike &amp; Bed Arenal was born from a clear idea: create accommodation where
                cyclists can rest, recover and connect with other passionate riders — without
                sacrificing comfort or authenticity.
              </p>
              <p className="leading-relaxed text-brand-muted">
                Located in La Fortuna de San Carlos, minutes from Arenal Volcano and some of
                the best cycling routes in the country. A destination where cycling, wellness,
                nature and hospitality merge in one place.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Cycling', 'Nature', 'Wellness', 'Community', 'Adventure', 'Hospitality'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why unique ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Differentiators
          </p>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Why Bike &amp; Bed is a different proposition.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {uniquePoints.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-card p-7"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <h3 className="mb-2 font-semibold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            The hotel
          </p>
          <h2 className="mb-10 text-3xl font-bold text-brand-text">
            Designed for the complete cycling experience.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              { src: '/images/bike-bed/bike-bed-interior-01.jpg',       alt: 'Bike & Bed Hotels interior — kitchen and social area' },
              { src: '/images/bike-bed/bike-bed-jacuzzi-01.jpg',        alt: 'Jacuzzi and wellness area at Bike & Bed Hotels' },
              { src: '/images/bike-bed/bike-bed-cabin-exterior-01.jpg', alt: 'Bike & Bed Hotels cabin in La Fortuna, Arenal' },
              { src: '/images/bike-bed/bike-bed-aerial-volcano-01.png', alt: 'Bike & Bed Hotels with Arenal Volcano in the background' },
            ].map(({ src, alt }) => (
              <div key={src} className="overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={alt}
                  width={600}
                  height={400}
                  quality={90}
                  className="w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Amenities ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Accommodation
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Designed from the ground up for the modern cyclist.
          </h2>
          <p className="mb-10 max-w-2xl text-brand-muted">
            Every detail of Bike &amp; Bed is designed for the cyclist: specialized
            infrastructure, real comfort and an environment that invites rest and recovery.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {amenities.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-brand-border bg-brand-card p-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <p className="text-sm font-medium text-brand-text">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wellness ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Wellness · Nature · Community
          </p>
          <h2 className="mb-6 text-3xl font-bold text-brand-text md:text-4xl">
            Pedal. Rest. Reconnect.
          </h2>
          <p className="mx-auto mb-8 max-w-2xl leading-relaxed text-brand-muted">
            Bike &amp; Bed doesn&apos;t just think about the bicycle. It thinks about everything
            around it. Thermal waters, jacuzzi, volcanic nature, silence and the right community
            to make every stay a complete wellness experience.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Post-ride recovery',
              'Jacuzzi and thermal waters',
              'Volcanic nature',
              'Cycling community',
              'Routes for all levels',
              'Silence and disconnection',
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-brand-border px-4 py-2 text-sm text-brand-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment ── */}
      <section id="investment" className="scroll-mt-20 bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Investment opportunity
          </p>
          <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Bike &amp; Bed as an investment.<br />
            A global vision, already in operation.
          </h2>
          <p className="mb-12 max-w-2xl text-brand-muted">
            Tony Alvarado is open to connecting with potential partners and investors who
            share the vision of expanding the Bike &amp; Bed concept. Commercial and financial
            information is shared directly in individual conversations.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {investmentPillars.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-card p-7"
              >
                <h3 className="mb-2 font-semibold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-card">
            <div className="flex flex-col md:flex-row">
              <div className="relative h-64 md:h-auto md:w-80 md:shrink-0">
                <Image
                  src="/images/bike-bed/bike-bed-investment-01.jpeg"
                  alt="Bike & Bed Hotels — investment opportunity"
                  fill
                  quality={90}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-center p-8">
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
                  Connect with the team
                </p>
                <p className="mb-6 text-sm leading-relaxed text-brand-muted">
                  If you are interested in the expansion of Bike &amp; Bed Hotels — as an
                  investor, partner or franchisee — reach out and the team will share the
                  relevant information with you directly.
                </p>
                <TrackedLink
                  href="/en/contact?interest=bike-bed-inversion#form"
                  event="click_contact_investment"
                  params={{ interest: 'bike-bed-inversion', cta_location: 'bike_bed_investment' }}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
                >
                  Request information <ArrowRight size={15} />
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 ways to join ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            How to participate
          </p>
          <h2 className="mb-12 text-3xl font-bold text-brand-text">
            3 ways to join Bike &amp; Bed.
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {joinWays.map(({ number, title, description }) => (
              <div
                key={number}
                className="rounded-2xl border border-brand-border bg-brand-card p-8"
              >
                <p className="mb-4 text-4xl font-bold text-brand-gold">{number}</p>
                <h3 className="mb-3 font-semibold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision 2050 ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Long-term vision
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            A global vision for cycling hospitality.
          </h2>
          <p className="mb-12 max-w-2xl leading-relaxed text-brand-muted">
            Bike &amp; Bed is not just a hotel. It is the first step of a global movement.
            The vision is to build an international network of cycling destinations that
            transforms tourism, strengthens local economies and brings cycling as a wellness
            tool to every corner of the world. One pedal stroke at a time.
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {visionCards.map(({ value, label }) => (
              <div
                key={label}
                className="rounded-2xl border border-brand-gold/20 bg-brand-card p-8 text-center"
              >
                <p className="text-3xl font-bold text-brand-gold">{value}</p>
                <p className="mt-2 text-sm text-brand-muted">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-text">
            Ready for the next step?
          </h2>
          <p className="mb-8 text-brand-muted">
            Whether you want to experience the hotel or explore a collaboration opportunity,
            we&apos;re here to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <TrackedLink
              href="https://www.bikeandbedhotels.com/"
              event="click_bike_bed"
              params={{ cta_location: 'bike_bed_cta_final' }}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              Visit the hotel <ArrowRight size={15} />
            </TrackedLink>
            <TrackedLink
              href="/en/contact?interest=bike-bed-inversion#form"
              event="click_contact_investment"
              params={{ interest: 'bike-bed-inversion', cta_location: 'bike_bed_cta_final' }}
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 px-8 py-4 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              Talk about investment <ArrowRight size={15} />
            </TrackedLink>
          </div>
        </div>
      </section>

    </main>
  )
}
