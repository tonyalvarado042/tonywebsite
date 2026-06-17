import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowRight } from 'lucide-react'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'

export const metadata: Metadata = {
  title: {
    absolute: 'Books by Tony Alvarado — Cycling, Business & Transformation',
  },
  description:
    'Books by Tony Alvarado: "Secretos para ser un empresario exitoso" and "Sigue Pedaleando", both available on Amazon. Cycling, personal transformation, faith and entrepreneurship from Costa Rica.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/books' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/books',
    siteName: 'Tony Alvarado',
    title: 'Books by Tony Alvarado — Cycling, Business & Transformation',
    description:
      '"Sigue Pedaleando" and "Secretos para ser un empresario exitoso". Available on Amazon. Cycling, transformation, faith and entrepreneurship.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'Books by Tony Alvarado — available on Amazon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Books by Tony Alvarado — Cycling, Business & Transformation',
    description:
      '"Sigue Pedaleando" and "Secretos para ser un empresario exitoso". Available on Amazon.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const faqs: PageFAQItem[] = [
  {
    question: 'Where can I buy Tony Alvarado\'s books?',
    answer:
      'Both books are available on Amazon. You will find the direct links on this page. Availability and formats may vary depending on your country.',
  },
  {
    question: 'Who is "Secretos para ser un empresario exitoso" written for?',
    answer:
      'For entrepreneurs and business owners who want to build something solid with leadership, purpose and vision. The book shares principles and lessons forged through years of real-world entrepreneurship, with an honest look at leadership, purpose and legacy.',
  },
  {
    question: 'What is "Sigue Pedaleando" about?',
    answer:
      'It is a book about faith, purpose and resilience built around the bicycle. It shares experiences, setbacks and hope, showing how to keep moving forward even when life gets difficult.',
  },
  {
    question: 'What do both books have in common?',
    answer:
      'Both books share the same thread: purpose, discipline and personal transformation. One from the perspective of entrepreneurship and leadership; the other from faith, resilience and Tony\'s personal story around cycling.',
  },
]

export default function EnBooksPage() {
  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 h-[500px]
                     bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,162,77,0.15)_0%,transparent_70%)]"
        />
        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
            Books by Tony Alvarado
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-brand-text md:text-7xl">
            Two books.{' '}
            <span className="text-brand-gold">One mission.</span>
          </h1>
          <div className="mx-auto mt-7 h-px w-32 bg-gradient-to-r from-transparent via-brand-gold/55 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Two paths, two chapters and one shared purpose: to inspire, strengthen and
            transform lives through leadership, faith, entrepreneurship and perseverance.
          </p>
        </div>
      </section>

      {/* ── Book cards ── */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

          {/* ── Book 1 — Secretos ── */}
          <article
            className="group relative isolate flex flex-col overflow-hidden rounded-3xl
                       border border-brand-gold/[0.18] bg-brand-card
                       shadow-[0_0_0_1px_rgba(201,162,77,0.10),0_0_60px_-10px_rgba(201,162,77,0.18),0_25px_60px_-20px_rgba(0,0,0,0.5)]
                       transition-shadow duration-500
                       hover:shadow-[0_0_0_1px_rgba(201,162,77,0.18),0_0_80px_-8px_rgba(201,162,77,0.28),0_30px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[#0C0A04]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_105%,rgba(201,162,77,0.30)_0%,transparent_60%)]" />
              <div className="absolute bottom-1/3 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand-gold/[0.22] blur-[75px]" />
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-brand-gold/[0.06] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-gold/[0.06] to-transparent" />
              <div className="absolute bottom-[100px] left-[22%] right-[22%] h-px rounded-full bg-brand-gold/30 blur-[3px]" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <Image
                src="/images/books/secretos-mockup.png"
                alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                width={420}
                height={580}
                className="relative z-10 w-auto max-h-[380px] object-contain pb-6
                           drop-shadow-[0_30px_80px_rgba(201,162,77,0.45)]
                           transition-transform duration-500 group-hover:scale-[1.03]
                           md:max-h-[450px]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-brand-card to-transparent" />
            </div>

            <div className="flex flex-1 flex-col px-9 pb-10 pt-5">
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full
                               bg-brand-gold/10 px-4 py-1.5 ring-1 ring-brand-gold/25">
                <ShoppingCart size={12} className="text-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                  Available on Amazon
                </span>
              </span>

              {/* Official title in Spanish — primary */}
              <h2 className="mb-1 font-bold leading-tight tracking-tight text-brand-text
                             text-2xl md:text-[1.9rem] lg:text-[2.15rem]">
                Secretos para ser un{' '}
                <span className="text-brand-gold">empresario exitoso</span>
              </h2>
              {/* English description — secondary */}
              <p className="mb-4 text-sm text-brand-muted/70 italic">
                Secrets to Becoming a Successful Entrepreneur
              </p>

              <p className="mb-7 text-[15px] leading-[1.78] text-brand-muted">
                A book for those who want to build something solid, lead with vision and
                learn to turn challenges into growth. Tony shares principles and lessons
                forged in the real world of entrepreneurship — an honest look at leadership,
                purpose and legacy. Not theory — hard-won lessons from the field.
              </p>

              <div className="mb-7 flex flex-wrap gap-2">
                {['Business', 'Leadership', 'Learning', 'Purpose'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-gold/10 px-3.5 py-1.5
                               text-[11px] font-semibold tracking-wide text-brand-gold
                               ring-1 ring-brand-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="https://www.amazon.com/dp/B0CCZWJG7S"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-3
                           rounded-2xl bg-brand-gold py-4 text-[15px] font-bold text-brand-bg
                           shadow-[0_8px_32px_rgba(201,162,77,0.35)]
                           transition-all hover:opacity-90 hover:shadow-[0_12px_48px_rgba(201,162,77,0.45)]"
              >
                <ShoppingCart size={17} />
                Buy on Amazon
              </Link>
            </div>
          </article>

          {/* ── Book 2 — Sigue Pedaleando ── */}
          <article
            className="group relative isolate flex flex-col overflow-hidden rounded-3xl
                       border border-brand-warm/[0.18] bg-brand-card
                       shadow-[0_0_0_1px_rgba(215,186,158,0.12),0_0_60px_-10px_rgba(215,186,158,0.2),0_25px_60px_-20px_rgba(0,0,0,0.5)]
                       transition-shadow duration-500
                       hover:shadow-[0_0_0_1px_rgba(215,186,158,0.22),0_0_80px_-8px_rgba(215,186,158,0.32),0_30px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden">
              <div className="absolute inset-0 bg-[#0E0A04]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_105%,rgba(215,186,158,0.32)_0%,transparent_60%)]" />
              <div className="absolute bottom-1/3 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand-warm/[0.18] blur-[75px]" />
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-brand-warm/[0.05] to-transparent" />
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-warm/[0.05] to-transparent" />
              <div className="absolute bottom-[100px] left-[22%] right-[22%] h-px rounded-full bg-brand-warm/25 blur-[3px]" />
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />
              <Image
                src="/images/books/sigue-pedaleando-mockup.png"
                alt="Sigue Pedaleando — Tony Alvarado"
                width={420}
                height={580}
                className="relative z-10 w-auto max-h-[380px] object-contain pb-6
                           drop-shadow-[0_30px_80px_rgba(215,186,158,0.45)]
                           transition-transform duration-500 group-hover:scale-[1.03]
                           md:max-h-[450px]"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-brand-card to-transparent" />
            </div>

            <div className="flex flex-1 flex-col px-9 pb-10 pt-5">
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full
                               bg-brand-warm/10 px-4 py-1.5 ring-1 ring-brand-warm/25">
                <ShoppingCart size={12} className="text-brand-warm" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-warm">
                  Available on Amazon
                </span>
              </span>

              {/* Official title in Spanish — primary */}
              <h2 className="mb-1 font-bold leading-tight tracking-tight text-brand-text
                             text-2xl md:text-[1.9rem] lg:text-[2.15rem]">
                Sigue{' '}
                <span className="text-brand-warm">Pedaleando</span>
              </h2>
              {/* English description — secondary */}
              <p className="mb-4 text-sm text-brand-muted/70 italic">
                Keep Pedaling
              </p>

              <p className="mb-7 text-[15px] leading-[1.78] text-brand-muted">
                A story of faith, purpose and resilience born around the bicycle.
                &ldquo;Sigue Pedaleando&rdquo; shares experiences, setbacks, rebuilding and hope,
                showing how to keep moving forward even when life gets steep.
                A book for those who need to remember that it&apos;s not always about going faster,
                but about not giving up.
              </p>

              <div className="mb-7 flex flex-wrap gap-2">
                {['Faith', 'Purpose', 'Resilience', 'Personal Growth'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-warm/10 px-3.5 py-1.5
                               text-[11px] font-semibold tracking-wide text-brand-warm
                               ring-1 ring-brand-warm/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href="https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-3
                           rounded-2xl border-2 border-brand-warm/35 py-4
                           text-[15px] font-bold text-brand-warm
                           transition-all hover:border-brand-warm/55 hover:bg-brand-warm/10"
              >
                <ShoppingCart size={17} />
                Buy on Amazon
              </Link>
            </div>
          </article>

        </div>
      </section>

      {/* ── FAQ ── */}
      <PageFAQ
        faqs={faqs}
        title="Frequently asked questions"
        eyebrow="FAQ"
        accent="gold"
      />

      {/* ── CTA ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-2xl px-6 text-center md:px-12">
          <h2 className="mb-4 text-2xl font-bold text-brand-text">
            Want to know more about Tony?
          </h2>
          <p className="mb-8 text-brand-muted">
            Discover his full story, companies and speaking topics.
          </p>
          <Link
            href="/en/about"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-4 text-sm font-semibold text-brand-muted transition-colors hover:border-brand-text hover:text-brand-text"
          >
            About Tony <ArrowRight size={15} />
          </Link>
        </div>
      </section>

    </main>
  )
}
