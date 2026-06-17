import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Mic, Users, Building2, Heart, Globe } from 'lucide-react'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'

export const metadata: Metadata = {
  title: {
    absolute: 'Speaking & Conferences — Tony Alvarado',
  },
  description:
    'Tony Alvarado is available for keynotes and conferences on cycling, entrepreneurship, leadership, faith and personal transformation. Based in Costa Rica, available internationally.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/speaking' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/speaking',
    siteName: 'Tony Alvarado',
    title: 'Speaking & Conferences — Tony Alvarado',
    description:
      'Keynotes and conferences on cycling, entrepreneurship, leadership, faith and personal transformation.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'Tony Alvarado — speaker and cycling entrepreneur from Costa Rica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speaking & Conferences — Tony Alvarado',
    description:
      'Keynotes and conferences on cycling, entrepreneurship, leadership, faith and personal transformation.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const topics = [
  {
    icon: Mic,
    title: 'Leadership through discipline and purpose',
    description:
      'How building a daily discipline around cycling transforms leadership in business and life. Practical principles drawn from 22+ years of entrepreneurship.',
  },
  {
    icon: Building2,
    title: 'Entrepreneurship built on faith and community',
    description:
      'The story behind PuroMTB, Pure Cycling and Bike & Bed Hotels — how a clear mission and strong values build businesses that outlast their founder\'s daily presence.',
  },
  {
    icon: Heart,
    title: 'Cycling as a tool for personal transformation',
    description:
      'From a near-fatal accident at 16 to a global cycling community. How the bicycle became Tony\'s platform for transformation in body, mind and spirit.',
  },
  {
    icon: Users,
    title: 'How to build systems that work without you',
    description:
      'Operational lessons from scaling multiple companies simultaneously — team, processes and culture that generate results without constant owner intervention.',
  },
  {
    icon: Globe,
    title: 'Business, sport and spirituality: an integrated life',
    description:
      'Tony shares how faith, entrepreneurship and athletic discipline are not competing forces but complementary pillars of a purposeful life.',
  },
]

const contributions = [
  'Personal story with deep emotional resonance and real transformation',
  'Over 22 years of real entrepreneurial experience — not theory',
  'Certified John Maxwell Leadership leader',
  'Active community builder with global reach (Pure Cycling, 30+ countries)',
  'Speaker who connects cycling, faith and business in a unique way',
  'Based in Costa Rica, available for events in Latin America and internationally',
]

const eventTypes = [
  'Corporate conferences and leadership summits',
  'Entrepreneurship and innovation events',
  'Sport, wellness and active lifestyle gatherings',
  'Faith-based leadership forums',
  'University and youth programs',
]

const faqs: PageFAQItem[] = [
  {
    question: 'What topics does Tony Alvarado speak about?',
    answer:
      'Tony speaks about cycling as a tool for personal transformation, leadership, entrepreneurship, faith and purpose. His talks draw on his personal story, 22+ years of building businesses and his work building a global cycling community.',
  },
  {
    question: 'Is Tony available for international events?',
    answer:
      'Tony is based in Costa Rica and is available for events in Latin America and internationally. For details on logistics, dates and availability, use the button on this page to send your event details.',
  },
  {
    question: 'What language does Tony deliver his talks in?',
    answer:
      'Tony delivers his talks in Spanish. For specific language or format requirements, please mention them in your inquiry and his team will review what is possible.',
  },
  {
    question: 'How do I book Tony for an event?',
    answer:
      'Use the contact page and select "Speaking / Conference" as your topic. Describe your event — type, date, location, audience — and Tony\'s team will get back to you within 24 to 48 hours.',
  },
]

export default function EnSpeakingPage() {
  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-brand-surface px-6 py-24 text-center md:px-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
          Speaking &amp; Conferences
        </p>
        <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-bold leading-tight text-brand-text md:text-6xl">
          A speaker who has lived<br />
          <span className="text-brand-green">what he teaches.</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
          Tony Alvarado combines a personal story of resilience, 22+ years of entrepreneurship
          and a global cycling community to deliver talks that move audiences to action.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/en/contact?interest=conferencias#form"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Request Tony for your event <ArrowRight size={15} />
          </Link>
          <Link
            href="/en/about"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-4 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
          >
            Learn about Tony
          </Link>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Topics
          </p>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Conference topics
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-card p-7"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10">
                  <Icon size={18} className="text-brand-green" />
                </div>
                <h3 className="mb-3 font-semibold leading-snug text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Tony brings ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Value proposition
          </p>
          <h2 className="mb-10 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            What Tony brings to your event
          </h2>
          <ul className="space-y-4">
            {contributions.map((item) => (
              <li key={item} className="flex items-start gap-4 text-brand-muted">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Event types ── */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Format
          </p>
          <h2 className="mb-10 text-3xl font-bold text-brand-text">
            Types of events
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {eventTypes.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-brand-border bg-brand-card px-6 py-4 text-sm text-brand-muted"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <PageFAQ
        faqs={faqs}
        title="Frequently asked questions"
        eyebrow="FAQ"
        accent="gold"
      />

      {/* ── CTA final ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-text">
            Ready to bring Tony to your event?
          </h2>
          <p className="mb-8 text-brand-muted">
            Share the details and Tony&apos;s team will get back to you within 24 to 48 hours.
          </p>
          <Link
            href="/en/contact?interest=conferencias#form"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Request Tony for your event <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </main>
  )
}
