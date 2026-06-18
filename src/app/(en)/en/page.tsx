import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: {
    absolute: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
  },
  description:
    'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels. Over 22 years building community and purpose around mountain biking and road cycling.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en',
    siteName: 'Tony Alvarado',
    title: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
    description:
      'Cycling coach and entrepreneur from Costa Rica, founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'Tony Alvarado — cycling coach and entrepreneur from Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
    description:
      'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const credentials = [
  'Certified cycling coach and John Maxwell Leadership-certified leader',
  'Entrepreneur with over 22 years of experience building cycling ecosystems',
  'Author published on Amazon and speaker on cycling and personal transformation',
]

export default function EnHomePage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="relative min-h-[85vh] overflow-hidden">
        <Image
          src="/images/og/ciclista-paisaje-montanoso-luz.png"
          alt="Cyclist on a mountain road"
          fill
          priority
          quality={80}
          className="object-cover object-[65%_center]"
          sizes="100vw"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg from-[20%] via-brand-bg/75 via-[55%] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-2xl space-y-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-6xl">
              Transforming Lives<br />
              <span className="text-brand-green">Through Cycling</span>
            </h1>
            <p className="text-base leading-relaxed text-brand-muted md:text-lg">
              Cycling coach, entrepreneur, and community builder. Over 22 years creating
              purpose-driven businesses around the bicycle — in Costa Rica and beyond.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/en/pure-cycling"
                className="rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
              >
                Join Pure Cycling
              </Link>
              <Link
                href="/en/about"
                className="rounded-full border border-brand-border px-7 py-3.5 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
              >
                Discover Tony&apos;s story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                About Tony
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Cycling, business,<br />
                <span className="text-brand-green">faith and purpose.</span>
              </h2>
              <p className="text-brand-muted">
                Tony Alvarado is the founder of Pure Cycling, PuroMTB and Bike &amp; Bed Hotels —
                three companies united by one mission: to transform lives through cycling.
              </p>
              <ul className="space-y-3">
                {credentials.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-about.jpg"
                alt="Tony Alvarado — cycling coach and entrepreneur"
                width={600}
                height={750}
                quality={80}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pure Cycling CTA ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Online Community
          </p>
          <h2 className="mb-6 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Ready to transform your life<br />through cycling?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-brand-muted">
            Pure Cycling is an online training and transformation community with members in
            over 30 countries. Training, coaching, mindset, nutrition — and a community
            that keeps you moving forward.
          </p>
          <Link
            href="/en/pure-cycling"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Explore Pure Cycling <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── Bike & Bed ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="rounded-2xl border border-brand-border bg-brand-card p-8 md:p-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Investment Opportunity
            </p>
            <h2 className="mb-4 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
              Invest in sports tourism<br />with purpose
            </h2>
            <p className="mb-6 max-w-2xl text-brand-muted">
              Bike &amp; Bed Hotels is a cycling-themed boutique hotel located in La Fortuna,
              near Arenal Volcano. Tony Alvarado is developing this concept with a vision for
              international expansion and is open to connecting with potential partners and
              investors.
            </p>
            <Link
              href="/en/bike-bed-hotels"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 px-7 py-3.5 text-sm font-semibold text-brand-gold transition-colors hover:bg-brand-gold/10"
            >
              Learn about Bike &amp; Bed <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-text">
            Have a question or want to connect?
          </h2>
          <p className="mb-6 text-brand-muted">Reach out directly.</p>
          <a
            href="mailto:info@tonyalvarado.com"
            className="text-brand-green transition-colors hover:text-brand-accent-light"
          >
            info@tonyalvarado.com
          </a>
        </div>
      </section>

    </main>
  )
}
