import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PhotoStrip from '@/components/ui/PhotoStrip'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    absolute: 'About Tony Alvarado — Cyclist, Entrepreneur & Author',
  },
  description:
    'Tony Alvarado is a cycling coach, entrepreneur, author and faith-driven leader from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels, with over 22 years of experience.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/about' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/about',
    siteName: 'Tony Alvarado',
    title: 'About Tony Alvarado — Cyclist, Entrepreneur & Author',
    description:
      'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
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
    title: 'About Tony Alvarado — Cyclist, Entrepreneur & Author',
    description:
      'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/about#webpage`,
  name: 'About Tony Alvarado — Cyclist, Entrepreneur & Author',
  description:
    'Tony Alvarado is a cycling coach, entrepreneur, author and faith-driven leader from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
  url: `${SITE_URL}/en/about`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/en/about` },
  ],
}

const highlights = [
  'Computer engineer by training, entrepreneur by calling',
  'Certified cycling coach',
  'John Maxwell Leadership certification',
  'Founder of PuroMTB (since 2004)',
  'Founder of Pure Cycling and Bike & Bed Hotels',
  'Over 22 years of entrepreneurial experience',
  'Author published on Amazon',
  'San José, Costa Rica',
]

const pageFaqs: PageFAQItem[] = [
  {
    question: 'Who is Tony Alvarado?',
    answer:
      'Tony Alvarado is a cycling coach, entrepreneur and author from Costa Rica. He is the founder of Pure Cycling, PuroMTB and Bike & Bed Hotels, and has spent over 22 years building purpose-driven businesses around the bicycle.',
  },
  {
    question: "What is Tony's personal story?",
    answer:
      'As a teenager, Tony was in a serious cycling accident that left him hospitalized for over a month. That near-death experience became a turning point. What once almost took his life later became the tool God used to rebuild it — and today his mission is to help others transform their lives through cycling.',
  },
  {
    question: 'What certifications does Tony hold?',
    answer:
      'Tony is a certified cycling coach and a John Maxwell Leadership-certified leader. He also holds a computer engineering degree, though his professional focus has been on entrepreneurship and cycling for over two decades.',
  },
  {
    question: 'How can I contact Tony Alvarado?',
    answer:
      "You can reach Tony's team through the contact form on this site. For speaking engagements, investment inquiries or collaboration, use the contact page and select the relevant topic.",
  },
]

const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pageFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function EnAboutPage() {
  return (
    <main>
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />
      <JsonLd data={faqSchemaEn} />

      {/* ── Hero ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 md:flex-row md:px-12">

          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              About Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
              He started selling apples to buy a bicycle.<br />
              <span className="text-brand-green">Today he has spent over 22 years building with that same discipline.</span>
            </h1>
            <p className="text-brand-muted text-left md:text-justify">
              Computer engineer by training. Entrepreneur by calling.
              He founded PuroMTB in 2004, when online cycling in Costa Rica barely existed.
              Today he has three companies that have generated millions of dollars.
            </p>
          </div>

          <div className="w-full flex-1">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-ciclismo-vertical-01.jpg"
                alt="Tony Alvarado on a bicycle — cycling coach and entrepreneur from Costa Rica"
                width={600}
                height={750}
                className="w-full object-cover object-[50%_20%]"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* ── Bio + Highlights ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row">

            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Background
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                Certified coach.<br />
                <span className="text-brand-accent">Entrepreneur with a real story.</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                Certified cycling coach and John Maxwell Leadership-certified leader.
                Author of <em>Secretos para ser un empresario exitoso</em>.
                His online program, Pure Cycling, has members in over 30 countries.
              </p>
              <p className="text-brand-muted text-left md:text-justify">
                Over more than 22 years he built an ecosystem of companies around cycling:
                stores, digital communities, training programs and a cycling-themed hotel
                in Costa Rica with a vision for global expansion.
              </p>
            </div>

            <div className="flex-1">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={15} className="shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* ── Photo strip ── */}
      <section className="bg-brand-bg py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/tony/tony-ciclismo-bosque-01.jpg', alt: 'Tony Alvarado mountain biking', position: 'object-[50%_65%]' },
              { src: '/images/tony/tony-ciclismo-ruta-01.jpg', alt: 'Tony Alvarado road cycling', position: 'object-[50%_58%]' },
              { src: '/images/tony/tony-ciclismo-pradera-01.jpg', alt: 'Tony Alvarado cycling in a meadow', position: 'object-[55%_60%]' },
            ]}
          />
        </div>
      </section>

      {/* ── His story ── */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">

          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              His story
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              The bicycle first almost took his life.<br />
              <span className="text-brand-green">Then it became his purpose.</span>
            </h2>
          </div>

          <div className="space-y-5 text-brand-muted text-left md:text-justify">
            <p>
              From childhood, Tony had a deep connection with the bicycle. He wanted a better one to
              compete. His father told him he would have to earn it. He sold apples from his
              grandfather&apos;s land until he raised the money. That experience taught him the power
              of sales, work and purpose. The bicycle, from that moment, was not just a sport —
              it was life&apos;s first lesson.
            </p>
            <p>
              At 16, a serious cycling accident left him hospitalized for more than 34 days.
              There was a coma. There were surgeries. There was a moment when no one knew if he
              would make it. His family waited. Tony&apos;s body fought. And in that silence,
              something deeper began to move.
            </p>
            <p>
              When he woke up, something changed forever. He understood he could not waste the life
              that remained. The bicycle, which first almost took his life, became the tool God
              used to rebuild it — not as a metaphor. As a concrete reality: movement, discipline,
              the cycling community — all of that was part of his recovery.
            </p>
            <p>
              The recovery took months. But in that process, Tony made decisions that would change
              his path: study computer engineering, learn about business and entrepreneurship, and
              understand that a passion — well channeled — can become an ecosystem of value for
              thousands of people.
            </p>
            <p>
              Today, everything he builds — PuroMTB, Pure Cycling, Bike &amp; Bed Hotels — has one
              reason to exist: so others can transform their lives as he transformed his. It is not
              just cycling. It is cycling as a vehicle of discipline, community, faith and purpose.
              A legacy that began with a bicycle and some apples, and today reaches people in over
              30 countries.
            </p>
          </div>

          <div className="my-10 rounded-2xl border border-brand-border bg-brand-card p-8 md:p-10">
            <blockquote className="text-center text-xl font-semibold italic text-brand-text md:text-2xl">
              &ldquo;The bicycle almost took my life. Then God used it to rebuild everything.
              Today, that is my mission.&rdquo;
            </blockquote>
            <p className="mt-5 text-center text-sm text-brand-accent">— Tony Alvarado</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-brand-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/tony-con-john.png"
                  alt="Tony Alvarado with John Maxwell"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-brand-muted">With John Maxwell</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-brand-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/tony/tony-spencer-hoffman.jpg"
                  alt="Tony Alvarado with Spencer Hoffman"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-brand-muted">With Spencer Hoffman</p>
            </div>
          </div>

        </div>
      </section>

      <PageFAQ faqs={pageFaqs} title="Frequently asked questions" eyebrow="FAQ" accent="green" />

      {/* ── CTA ── */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Get in touch →
          </Link>
        </div>
      </section>

    </main>
  )
}
