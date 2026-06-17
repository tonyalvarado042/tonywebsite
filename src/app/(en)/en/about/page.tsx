import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'

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

const highlights = [
  'Over 22 years of entrepreneurial experience',
  'Founder of PuroMTB, Pure Cycling and Bike & Bed Hotels',
  'Certified cycling coach (Costa Rican Cycling Federation)',
  'John Maxwell Leadership-certified leader',
  'Author published on Amazon',
  'Pure Cycling community: members in 30+ countries',
  'Faith-driven leader, speaker and community builder',
  'Computer engineer by training, entrepreneur by calling',
]

const faqs: PageFAQItem[] = [
  {
    question: 'Who is Tony Alvarado?',
    answer:
      'Tony Alvarado is a cycling coach, entrepreneur and author from Costa Rica. He is the founder of Pure Cycling, PuroMTB and Bike & Bed Hotels, and has spent over 22 years building purpose-driven businesses around the bicycle.',
  },
  {
    question: 'What is Tony\'s personal story?',
    answer:
      'As a teenager, Tony was in a serious cycling accident that left him hospitalized for over a month. That near-death experience became a turning point. What once almost took his life later became the tool God used to rebuild it — and today his mission is to help others transform their lives through cycling.',
  },
  {
    question: 'What certifications does Tony hold?',
    answer:
      'Tony is a certified cycling coach through the Costa Rican Cycling Federation and a certified leader through John Maxwell Leadership. He also holds a computer engineering degree, though his professional focus has been on entrepreneurship and cycling for over two decades.',
  },
  {
    question: 'How can I contact Tony Alvarado?',
    answer:
      'You can reach Tony\'s team through the contact form on this site. For speaking engagements, investment inquiries or collaboration, use the contact page and select the relevant topic.',
  },
]

export default function EnAboutPage() {
  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="relative min-h-[60vh] overflow-hidden">
        <Image
          src="/images/og/ciclista-paisaje-montanoso-luz.png"
          alt="Cyclist on a mountain road"
          fill
          priority
          quality={80}
          className="object-cover object-[65%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg from-[20%] via-brand-bg/75 via-[55%] to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="max-w-2xl space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              About Tony
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-6xl">
              Cycling, Business,<br />
              <span className="text-brand-green">Faith and Purpose.</span>
            </h1>
            <p className="text-base leading-relaxed text-brand-muted md:text-lg">
              From a near-fatal accident at 16 to building a cycling ecosystem that reaches
              over 30 countries — this is the story of a man who chose purpose over comfort.
            </p>
          </div>
        </div>
      </section>

      {/* ── Bio + Highlights ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-start">

            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Background
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                More than 22 years<br />
                <span className="text-brand-green">building around the bicycle.</span>
              </h2>
              <p className="leading-relaxed text-brand-muted">
                Tony Alvarado is the founder of Pure Cycling, PuroMTB and Bike &amp; Bed Hotels —
                three companies united by a single mission: transform lives through cycling.
                Born and based in Costa Rica, Tony has spent over two decades building community,
                content and businesses around the sport he loves.
              </p>
              <p className="leading-relaxed text-brand-muted">
                He is a certified cycling coach, a John Maxwell Leadership-certified leader,
                a published author, and a man of deep faith who attributes the growth of
                everything he has built to God&apos;s guidance.
              </p>
              <ul className="space-y-3 pt-2">
                {highlights.map((item) => (
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

      {/* ── Personal story ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            His story
          </p>
          <h2 className="mb-8 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            The bicycle almost took his life.<br />
            <span className="text-brand-green">Then it became his purpose.</span>
          </h2>
          <div className="space-y-6 text-brand-muted leading-relaxed">
            <p>
              Tony&apos;s connection with cycling began in childhood. He wanted a better bike to
              compete, and his father told him he would have to earn it. He sold apples from
              his grandfather&apos;s land and raised the money himself — an early lesson in
              entrepreneurship and the power of working toward something you believe in.
            </p>
            <p>
              At 16, Tony was in a serious cycling accident. He was hospitalized for over a month,
              spent several days in a coma, and underwent multiple surgeries. The experience
              brought him face to face with his own mortality and left him with one clear
              conviction: he could not waste his life.
            </p>
            <blockquote className="my-8 border-l-2 border-brand-green pl-6">
              <p className="text-xl font-semibold italic leading-relaxed text-brand-text">
                &ldquo;The bicycle almost took my life. Then God used it to rebuild everything.&rdquo;
              </p>
              <footer className="mt-3 text-sm text-brand-muted">— Tony Alvarado</footer>
            </blockquote>
            <p>
              Today Tony&apos;s mission is to help others transform their lives through cycling —
              physically, mentally, spiritually and professionally. Everything he has built
              flows from that conviction.
            </p>
          </div>
        </div>
      </section>

      {/* ── Photos with mentors ── */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            References
          </p>
          <h2 className="mb-10 text-3xl font-bold text-brand-text">
            Learning from the best.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/tony-con-john.png"
                  alt="Tony Alvarado with John Maxwell"
                  fill
                  quality={80}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="font-semibold text-brand-text">John Maxwell</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Leadership author and trainer. Tony holds John Maxwell Leadership certification.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src="/images/tony/tony-spencer-hoffman.jpg"
                  alt="Tony Alvarado with Spencer Hoffman"
                  fill
                  quality={80}
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <p className="font-semibold text-brand-text">Spencer Hoffman</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Mentor and reference in Tony&apos;s entrepreneurial journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <PageFAQ
        faqs={faqs}
        title="Frequently asked questions"
        eyebrow="FAQ"
        accent="green"
      />

      {/* ── CTA ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-text">
            Want to connect with Tony?
          </h2>
          <p className="mb-8 text-brand-muted">
            For speaking, collaboration or general inquiries, reach out through the contact page.
          </p>
          <Link
            href="/en/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Get in touch <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </main>
  )
}
