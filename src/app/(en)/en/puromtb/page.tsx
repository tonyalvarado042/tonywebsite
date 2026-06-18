import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Bike, ShoppingBag, Users, Award, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    absolute: 'PuroMTB — Cycling Store and Community in Costa Rica | Tony Alvarado',
  },
  description:
    'PuroMTB is the cycling store and community founded by Tony Alvarado in 2004. Over 20 years driving cycling in Costa Rica. Physical store, online sales and an active community.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/puromtb' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/puromtb',
    siteName: 'Tony Alvarado',
    title: 'PuroMTB — The Cycling Community of Costa Rica',
    description:
      'Founded in 2004 by Tony Alvarado. Physical store, online sales and an active community. Over 20 years driving cycling in Costa Rica.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'PuroMTB — cycling store and community in Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PuroMTB — The Cycling Community of Costa Rica',
    description:
      'Founded in 2004 by Tony Alvarado. Physical store, online sales and an active community.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const puroMTBOrgEn = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#puromtb`,
  name: 'PuroMTB',
  description:
    'Cycling store and community in Costa Rica, founded by Tony Alvarado in 2004. Over 20 years driving cycling in the region.',
  url: 'https://puromtb.com',
  foundingDate: '2004',
  founder: personRef,
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/puromtb#webpage`,
  name: 'PuroMTB — Cycling Store and Community in Costa Rica | Tony Alvarado',
  description:
    'PuroMTB is the cycling store and community founded by Tony Alvarado in 2004. Over 20 years driving cycling in Costa Rica.',
  url: `${SITE_URL}/en/puromtb`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#puromtb` }],
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'PuroMTB', item: `${SITE_URL}/en/puromtb` },
  ],
}

const pillars = [
  {
    icon: ShoppingBag,
    title: 'Physical and online store',
    description:
      'Complete equipment for MTB and road cycling. Bikes, accessories and components with expert guidance.',
  },
  {
    icon: Users,
    title: 'Cycling community',
    description:
      'An active cycling community in Costa Rica, built over more than two decades.',
  },
  {
    icon: Award,
    title: 'Expert advice',
    description:
      "PuroMTB's team guides every cyclist — from beginners to advanced riders — in choosing the right gear.",
  },
  {
    icon: Bike,
    title: 'Over 20 years of history',
    description:
      'Founded in 2004 as a website and established as a physical store since 2008. A brand built with purpose and community.',
  },
]

export default function EnPuroMTBPage() {
  return (
    <main>
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />
      <JsonLd data={puroMTBOrgEn} />

      {/* ── Hero — editorial full-width ── */}
      <section className="relative bg-brand-bg">
        <div className="relative h-[500px] overflow-hidden md:h-[580px]">
          <Image
            src="/images/puromtb/puromtb-store-interior-01.png"
            alt="PuroMTB store interior — cycling in Costa Rica"
            fill
            priority
            quality={80}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-brand-bg/50 to-brand-bg" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Cycling Ecosystem — Costa Rica
            </p>
            <div className="mb-6">
              <Image
                src="/images/logos/puromtb/logo_puro_mtb.png"
                alt="PuroMTB"
                width={200}
                height={60}
                className="h-14 w-auto"
              />
            </div>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              The store and community<br />
              <span className="text-brand-green">driving cycling in Costa Rica.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Over 20 years driving cycling. Physical store, online sales and an active
              community built by Tony Alvarado since 2004.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="https://puromtb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
              >
                Visit PuroMTB
                <ExternalLink size={14} />
              </Link>
              <Link
                href="/en/contact?interest=puromtb#form"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── History ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid items-center gap-12 md:grid-cols-2">

            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-puromtb.jpg"
                alt="Tony Alvarado at PuroMTB"
                width={600}
                height={450}
                className="h-80 w-full object-cover object-[50%_25%] md:h-96"
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
                History
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-brand-text">
                Founded with purpose.<br />
                <span className="text-brand-green">Built with community.</span>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-brand-muted">
                PuroMTB was born in 2004 as a digital space for cyclists in Costa Rica.
                Tony Alvarado founded it with a clear vision: bring cycling closer to more
                people, with quality equipment and a community that supports the growth of
                every rider.
              </p>
              <p className="text-sm leading-relaxed text-brand-muted">
                A physical store opened in 2008. Today it is a cycling brand with
                national presence and an online presence, and a community that continues to grow.
                PuroMTB is the starting point of the ecosystem Tony has built around the bicycle.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Store images ── */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/puromtb/puromtb-store-interior-01.png"
              alt="PuroMTB store interior — cycling in Costa Rica"
              width={1200}
              height={600}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-online-store-01.png"
                alt="PuroMTB online store"
                width={600}
                height={400}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-store-interior-02.png"
                alt="PuroMTB store interior"
                width={600}
                height={400}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row-reverse lg:items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/tony/tony-puromtb-community.jpg"
                  alt="PuroMTB community — cyclists in Costa Rica"
                  fill
                  loading="lazy"
                  quality={100}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Community
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Over 20 years<br />
                <span className="text-brand-green">building a cycling community.</span>
              </h2>
              <p className="text-brand-muted">
                PuroMTB is more than a store. It is the meeting point for thousands of
                cyclists in Costa Rica and Latin America. Since 2004, Tony Alvarado has
                built a brand that connects people, events, routes and equipment in one
                ecosystem.
              </p>
              <ul className="space-y-3">
                {[
                  'An established cycling community across digital channels.',
                  'Physical store and online sales in Costa Rica',
                  "Part of Tony Alvarado's cycling ecosystem",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="https://puromtb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-7 py-3.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
              >
                Explore PuroMTB <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              More than a store.<br />
              <span className="text-brand-green">A cycling hub.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <Icon size={20} className="mb-3 text-brand-green" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-accent/30 bg-brand-card p-7">
            <h3 className="mb-2 font-bold text-brand-text">PuroMTB within Tony&apos;s ecosystem</h3>
            <p className="text-sm text-brand-muted">
              PuroMTB is the operational and community foundation of the ecosystem.
              The store, the community and the brand&apos;s track record are all part of
              the same mission: transform lives through cycling. Together with Pure Cycling
              and Bike &amp; Bed Hotels, they form an integrated model built with a long-term vision.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Visit PuroMTB
          </p>
          <h2 className="mb-5 text-3xl font-bold text-brand-text">
            Explore the store and the community.
          </h2>
          <p className="mb-8 text-brand-muted">
            Bikes, accessories, components and a cycling community are waiting for you on
            the official PuroMTB platform.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://puromtb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
            >
              Go to PuroMTB
              <ExternalLink size={14} />
            </Link>
            <Link
              href="/en/pure-cycling"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-3 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-card"
            >
              Explore Pure Cycling
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
