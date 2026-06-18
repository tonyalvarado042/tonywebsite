import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Bike, ShoppingBag, Users, Award, ArrowRight } from 'lucide-react'
import PhotoStrip from '@/components/ui/PhotoStrip'

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
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-brand-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Cycling Ecosystem — Costa Rica
              </p>
              <div className="mb-4">
                <Image
                  src="/images/logos/puromtb/logo_puro_mtb.png"
                  alt="PuroMTB logo"
                  width={200}
                  height={60}
                  quality={90}
                  className="h-14 w-auto object-contain"
                />
              </div>
              <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-6xl">
                The store and community driving cycling in Costa Rica.
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
                Over 20 years driving cycling. Physical store, online sales and an active
                community built by Tony Alvarado since 2004.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://puromtb.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
                >
                  Visit PuroMTB <ArrowRight size={15} />
                </Link>
                <Link
                  href="/en/contact?interest=puromtb#form"
                  className="inline-flex items-center gap-2 rounded-full border border-brand-border px-7 py-3.5 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-store-interior-01.png"
                alt="PuroMTB store interior — cycling in Costa Rica"
                width={700}
                height={525}
                quality={90}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── History ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-puromtb.jpg"
                alt="Tony Alvarado at PuroMTB"
                width={600}
                height={500}
                quality={90}
                className="w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                History
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Founded with purpose. Built with community.
              </h2>
              <p className="leading-relaxed text-brand-muted">
                PuroMTB was born in 2004 as a digital space for cyclists in Costa Rica.
                Tony Alvarado founded it with a clear vision: bring cycling closer to more
                people, with quality equipment and a community that supports the growth of
                every rider.
              </p>
              <p className="leading-relaxed text-brand-muted">
                In 2008 the first physical store opened. Today it is a cycling brand with
                national presence and an online presence, and a community that continues to grow.
                PuroMTB is the starting point of the ecosystem Tony has built around the bicycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Store images ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-8 overflow-hidden rounded-2xl">
            <Image
              src="/images/puromtb/puromtb-store-interior-01.png"
              alt="PuroMTB store interior — cycling in Costa Rica"
              width={1200}
              height={600}
              quality={90}
              className="w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-online-store-01.png"
                alt="PuroMTB online store"
                width={600}
                height={400}
                quality={90}
                className="w-full object-cover"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-store-interior-02.png"
                alt="PuroMTB store interior"
                width={600}
                height={400}
                quality={90}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Community ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Community
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Over 20 years building a cycling community.
              </h2>
              <p className="leading-relaxed text-brand-muted">
                PuroMTB is more than a store. It is the meeting point for thousands of
                cyclists in Costa Rica and Latin America. Since 2004, Tony Alvarado has
                built a brand that connects people, events, routes and equipment in one
                ecosystem.
              </p>
              <ul className="space-y-3">
                {[
                  'An established digital cycling community.',
                  'Physical store and online sales in Costa Rica',
                  'Part of Tony Alvarado\'s cycling ecosystem',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                      ✓
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="https://puromtb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
              >
                Explore PuroMTB <ArrowRight size={15} />
              </Link>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-puromtb-community.jpg"
                alt="PuroMTB community — cyclists in Costa Rica"
                width={600}
                height={500}
                quality={90}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            What PuroMTB offers
          </p>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            More than a store. A cycling hub.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {pillars.map(({ icon: Icon, title, description }) => (
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

          <div className="mt-10 rounded-2xl border border-brand-green/20 bg-brand-card p-8">
            <p className="mb-2 font-semibold text-brand-text">PuroMTB within Tony&apos;s ecosystem</p>
            <p className="text-brand-muted">
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
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Visit PuroMTB
          </p>
          <h2 className="mb-4 text-3xl font-bold text-brand-text">
            Explore the store and the community.
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-brand-muted">
            Bikes, accessories, components and a cycling community are waiting for you on
            the official PuroMTB platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="https://puromtb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              Go to PuroMTB <ArrowRight size={15} />
            </Link>
            <Link
              href="/en/pure-cycling"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-4 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
            >
              Explore Pure Cycling
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
