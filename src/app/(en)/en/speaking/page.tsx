import type { Metadata } from 'next'
import Link from 'next/link'
import TrackedLink from '@/components/common/TrackedLink'
import { Mic, CheckCircle2, Users, Target, Heart, TrendingUp, Compass } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

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

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/speaking#webpage`,
  name: 'Speaking & Conferences — Tony Alvarado',
  description:
    'Tony Alvarado is available for keynotes and conferences on cycling, entrepreneurship, leadership, faith and personal transformation.',
  url: `${SITE_URL}/en/speaking`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Speaking', item: `${SITE_URL}/en/speaking` },
  ],
}

const topics = [
  {
    icon: Target,
    title: 'Leadership with purpose',
    tags: ['Leadership', 'Purpose'],
    description:
      'Leading from mission rather than ego. How to build teams, make difficult decisions and stay on course when the road gets complicated.',
    featured: true,
  },
  {
    icon: TrendingUp,
    title: 'Discipline and personal transformation',
    tags: ['Discipline', 'Transformation'],
    description:
      'Cycling as a school of life: how the habits, consistency and mindset of the athlete translate into every area of existence.',
    featured: false,
  },
  {
    icon: Compass,
    title: 'Entrepreneurship around cycling',
    tags: ['Entrepreneurship', 'Cycling'],
    description:
      'How Tony built an ecosystem of companies around a passion. Lessons from 22 years of founding businesses from faith, purpose and discipline.',
    featured: false,
  },
  {
    icon: Heart,
    title: 'Community, faith and perseverance',
    tags: ['Faith', 'Community'],
    description:
      'Why faith and community are the most powerful assets in moments of adversity. An honest perspective from the real life of Tony Alvarado.',
    featured: false,
  },
  {
    icon: Users,
    title: 'Building a life or business on a mission',
    tags: ['Mission', 'Vision'],
    description:
      'The differentiator that separates those who build something lasting from those who only survive the short term. Purpose as strategy.',
    featured: false,
  },
]

const contributions = [
  'A real story of adversity, recovery and faith — told without filters',
  'Over 22 years of real entrepreneurial experience applied in practice',
  'Cycling certification from the Costa Rican Cycling Federation',
  'John Maxwell Leadership certification',
  'A message connecting sport, business, faith and purpose in a single story',
  'Adaptable formats: keynote, panel, workshop, corporate event or community',
]

const eventTypes = [
  'Keynote at business conferences',
  'Corporate leadership event',
  'Business seminar and team development',
  'Leadership and faith communities',
  'In-person and virtual events',
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
      "Use the contact page and select \"Speaking / Conference\" as your topic. Describe your event — type, date, location, audience — and Tony's team will get back to you within 24 to 48 hours.",
  },
]

const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function EnSpeakingPage() {
  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />
      <JsonLd data={faqSchemaEn} />

      {/* ── Hero ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            <Mic size={12} /> Speaking &amp; Conferences
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Tony doesn&apos;t speak about cycling.{' '}
            <span className="text-brand-accent">He speaks from it.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-brand-muted">
            Entrepreneur, certified cycling coach and speaker with over 22 years of
            experience building from faith and discipline. Available for in-person
            and virtual events in Costa Rica and internationally.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <TrackedLink
              href="/en/contact?interest=conferencias#form"
              event="click_contact_conference"
              params={{ cta_text: 'Request speaking engagement', cta_location: 'conferencias_hero', destination_type: 'internal', interest: 'conferencias' }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Mic size={15} /> Request speaking engagement →
            </TrackedLink>
            <Link
              href="/en/about"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Learn Tony&apos;s story →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Topics ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">

          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Topics
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Conference topics
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted">
              Each talk is adapted to the format, audience and context of the event.
              All topics come from Tony&apos;s real experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, tags, description, featured }) => (
              <div
                key={title}
                className={`rounded-xl border p-7 transition-shadow hover:shadow-md ${
                  featured
                    ? 'border-brand-accent/40 bg-brand-card ring-1 ring-brand-accent/20 md:col-span-2 lg:col-span-1'
                    : 'border-brand-border bg-brand-card'
                }`}
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-medium text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── What Tony brings ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Why Tony
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                What Tony brings<br />
                <span className="text-brand-accent">to your event</span>
              </h2>
              <p className="mt-4 text-brand-muted">
                Not theory or generic motivation. Tony brings to the stage a story
                forged in the field, with real setbacks, faith and a vision built
                over more than two decades.
              </p>
            </div>

            <ul className="space-y-3">
              {contributions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* ── Event types ── */}
      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="rounded-xl border border-brand-border bg-brand-card p-8">
            <h3 className="mb-5 font-bold text-brand-text">Types of events</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {eventTypes.map((type) => (
                <li key={type} className="flex items-center gap-2.5 text-sm text-brand-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageFAQ
        faqs={faqs}
        title="Frequently asked questions"
        eyebrow="FAQ"
        accent="gold"
      />

      {/* ── CTA final ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text">
            Want Tony at your event?
          </h2>
          <p className="mt-4 text-brand-muted">
            Share the date, format and topic of interest.
            The team will review your request and follow up directly.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <TrackedLink
              href="/en/contact?interest=conferencias#form"
              event="click_contact_conference"
              params={{ cta_text: 'Request speaking engagement', cta_location: 'conferencias_cta_final', destination_type: 'internal', interest: 'conferencias' }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Mic size={15} /> Request speaking engagement →
            </TrackedLink>
            <Link
              href="/en/about"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Learn Tony&apos;s story →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
