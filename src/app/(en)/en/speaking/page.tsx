import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import TrackedLink from '@/components/common/TrackedLink'
import { Mic, CheckCircle2, Building2, Bike, Target, Heart, TrendingUp } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    absolute: 'Speaking & Conferences — Tony Alvarado',
  },
  description:
    'Tony Alvarado is available for keynotes and conferences on the new tourism business and co-ownership, business mentoring, leadership, faith and personal transformation. Based in Costa Rica, available internationally.',
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
    'Tony Alvarado is available for keynotes and conferences on the new tourism business and co-ownership, business mentoring, leadership, faith and personal transformation.',
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

/**
 * Mirror of the Spanish page: co-ownership → mentoring → cycling.
 * Tony approved that order on 21 September 2026. Keep both pages in step —
 * if one changes and the other doesn't, the site contradicts itself.
 *
 * ⚠️ Nothing here may mention returns, ROI, yield, profit or guaranteed
 * investment. Public page, and that is SUGEVAL territory.
 */
const topics = [
  {
    icon: Building2,
    title: 'The new tourism business',
    tags: ['Tourism', 'Co-ownership'],
    description:
      'How active and wellness tourism changed shape, and how you can take part in a tourism asset today without having to build or run it yourself. Told from the inside: Tony develops and operates hotels in La Fortuna.',
    featured: true,
  },
  {
    icon: TrendingUp,
    title: 'A business that runs without you',
    tags: ['Mentoring', 'Teams'],
    description:
      'How to put the company in order, build the team and let go of the day-to-day so the business stops depending on its owner. Five fronts: marketing, leadership, sales, strategy and finance.',
    featured: false,
  },
  {
    icon: Target,
    title: 'Leadership with purpose',
    tags: ['Leadership', 'Purpose'],
    description:
      'Leading from the mission rather than the ego. How to build teams, make hard calls and hold the course when the road gets complicated.',
    featured: false,
  },
  {
    icon: Heart,
    title: 'Community, faith and perseverance',
    tags: ['Faith', 'Community'],
    description:
      'Why faith and community are the most powerful assets in times of adversity. An honest perspective from Tony Alvarado’s real life.',
    featured: false,
  },
  {
    icon: Bike,
    title: 'From cycling to a business ecosystem',
    tags: ['Cycling', 'Entrepreneurship'],
    description:
      'How one passion turned into stores, a community and hotels. Over 22 years founding businesses from faith, purpose and discipline — and the accident that put it all in perspective.',
    featured: false,
  },
]

const contributions = [
  'Tourism projects he operates today in La Fortuna — not someone else’s case studies',
  'Over 22 years of real entrepreneurial experience applied in practice',
  'John Maxwell Leadership certification',
  'A real story of adversity, recovery and faith — told without filters',
  'Cycling certification from the Costa Rican Cycling Federation',
  'A message connecting business, sport, faith and purpose in a single story',
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
      {/* Hero con foto de fondo.

          ⚠️ EL VELO Y EL PANEL VAN EN `style`, NO EN CLASES DE TAILWIND.
          No es capricho. El 21-set-2026 esto se subió con
          `from-brand-bg/74 via-brand-bg/86` y **Tailwind no generó esas
          reglas**: las clases quedaron en el HTML pero el CSS no existía.
          Medido en el navegador, en producción:

              conferencias → backgroundImage: "none"          (sin velo)
              mentoría     → linear-gradient(rgba(..,0.65), rgb(..))
                              — el `via/82` se cayó en silencio

          Las opacidades que ya existían en el proyecto (/30, /55, /65) sí
          funcionan; las nuevas no se generaron. Con `style` no depende de que
          ningún escaneo encuentre la clase, y los números quedan a la vista.

          — Por qué un PANEL y no más velo —
          Tony, 21-set-2026: «ese difuminado no se ve nada, o sea era un
          poquito, no borra todo sino no tiene sentido». Tenía razón.
          Pero el titular lleva un tramo en morado #8B5CF6, luminancia 0,198,
          que se pierde sobre tonos medios: con la foto visible daba 1,0:1.
          Tapar toda la foto lo arregla pero mata la foto.

          La salida es separar las dos cosas: velo general flojo (28%%) para
          que la foto SE VEA, y un panel al 88%% solo detrás del texto.
          Medido sobre la foto entera:

              velo 28%% + panel 88%%  →  morado 3,9:1   gris 6,6:1
              (de referencia: el morado sobre el fondo sólido da 4,56:1)

          El desenfoque va horneado en el JPEG (radio 5, suave a propósito).
          Con radio 12 la foto se perdía; con 4 o menos las caras compiten con
          el titular. */}
      <section className="relative overflow-hidden bg-brand-bg py-24">
        <Image
          src="/images/tony/tony-conferencias-fondo-difuminado.jpg"
          alt="Tony Alvarado speaking to a seated audience under stage lighting"
          fill
          className="object-cover"
          style={{ objectPosition: '50% 35%' }}
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to bottom, rgba(11,14,20,0.28) 0%, rgba(11,14,20,0.28) 68%, rgb(11,14,20) 100%)',
          }}
        />
        <div
          className="relative z-10 mx-auto max-w-3xl rounded-3xl px-6 py-10 text-center
                     backdrop-blur-sm md:px-12"
          style={{ backgroundColor: 'rgba(11,14,20,0.88)' }}
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            <Mic size={12} /> Speaking &amp; Conferences
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Tony doesn&apos;t talk business in theory.{' '}
            <span className="text-brand-accent">He talks from the ones he built.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-brand-muted">
            Tourism project developer, business mentor and speaker with over 22 years
            building from faith and discipline. Available for in-person and virtual
            events in Costa Rica and internationally.
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
