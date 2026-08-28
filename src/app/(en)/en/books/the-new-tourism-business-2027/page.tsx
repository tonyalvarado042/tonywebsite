import Link from 'next/link'
import { ArrowLeft, BellRing, Hammer, Users, Sparkles, Building2, Network } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import BookCover2027 from '@/components/ui/BookCover2027'
import { SITE_URL, websiteRef, personRef, bookSchema3 } from '@/lib/structured-data'

const TITLE = 'The New Tourism Business 2027 — Tony Alvarado’s third book'
const DESC =
  'Tony Alvarado’s third book: how the business of building and running hotels changed, told by someone doing it in La Fortuna de San Carlos, Costa Rica. In preparation.'

export const metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: '/en/books/the-new-tourism-business-2027' },
  // Igual que las otras 8 páginas en inglés del repo. No es un descuido:
  // el sitio en inglés está deliberadamente fuera del índice de Google.
  robots: { index: false, follow: true },
  openGraph: {
    type: 'book',
    locale: 'en_US',
    url: `${SITE_URL}/en/books/the-new-tourism-business-2027`,
    siteName: 'Tony Alvarado',
    title: 'The New Tourism Business 2027 — Tony Alvarado',
    description: DESC,
    images: [
      {
        url: '/images/og/tony-alvarado-og.jpg',
        width: 1600,
        height: 900,
        alt: 'The New Tourism Business 2027 — a book by Tony Alvarado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The New Tourism Business 2027 — Tony Alvarado',
    description: DESC,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/books/the-new-tourism-business-2027#webpage`,
  name: TITLE,
  description: DESC,
  url: `${SITE_URL}/en/books/the-new-tourism-business-2027`,
  inLanguage: 'en',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Book', '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027` }],
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/og/tony-alvarado-og.jpg`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Books', item: `${SITE_URL}/en/books` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'The New Tourism Business 2027',
      item: `${SITE_URL}/en/books/the-new-tourism-business-2027`,
    },
  ],
}

/* ── Table of contents ─────────────────────────────────────────────────────── */

const chapters = [
  {
    n: '01',
    icon: Building2,
    title: 'The old model is running out of air',
    text:
      'Identical rooms, a nightly rate, and competing with the place next door over ten dollars. Why the generic hotel stopped being a good business — and what is replacing it.',
  },
  {
    n: '02',
    icon: Sparkles,
    title: 'Guests no longer come for the room',
    text:
      'The bed is the least of it. People travel for what happens to them: training, recovering, sleeping well, going home different. The hotel stopped being lodging and became the setting for something.',
  },
  {
    n: '03',
    icon: Sparkles,
    title: 'Concept before concrete',
    text:
      'A hotel’s most expensive decision is made before the first rebar. How you pick a theme, who it is for, and who it deliberately excludes — because a hotel that talks to everyone talks to no one.',
  },
  {
    n: '04',
    icon: Hammer,
    title: 'Building: the most expensive part to learn',
    text:
      'Contractors, permits, suppliers, and the weeks that disappear without anyone noticing. The part of the business almost nobody writes about because it is not glamorous — and it is where the money goes.',
  },
  {
    n: '05',
    icon: Users,
    title: 'Running it with people: why systems win',
    text:
      'A hotel does not fail for lack of effort. It fails because it depends on somebody remembering. How an operation that lives in three people’s heads becomes one that runs on its own.',
  },
  {
    n: '06',
    icon: Network,
    title: 'The invisible operation',
    text:
      'Housekeeping, supervision, and reviews: three jobs almost everyone still does by hand and that can now be systematized. What they actually cost per month when you count properly.',
  },
  {
    n: '07',
    icon: Building2,
    title: 'Who owns the asset',
    text:
      'Co-ownership as a way to build tourism: fractions of a finite asset, not timeshare. What changes in the contract, in the operation, and in the conversation with whoever comes in.',
  },
  {
    n: '08',
    icon: Sparkles,
    title: 'Wellness: tourism paid for in health',
    text:
      'Hot springs, sauna, cold plunge, gym, recovery. Why wellness stopped being a spa next to the pool and became the reason for the trip.',
  },
  {
    n: '09',
    icon: Network,
    title: 'From one hotel to a network',
    text:
      'What has to be nailed down in the first one so the second does not start from zero. Brand, systems, people, and standard: the jump from having a hotel to having a network.',
  },
]

const pageFaqs: PageFAQItem[] = [
  {
    question: 'When does "The New Tourism Business 2027" come out?',
    answer:
      'The book is in preparation. There is no confirmed publication date yet and it is not available for sale. Leave your email on this page and we will let you know as soon as there is a date.',
  },
  {
    question: 'What is the book about?',
    answer:
      'How the business of building and running hotels changed: guests who travel for the experience rather than the room, the rise of wellness tourism, systematized rather than manual operations, and new forms of ownership for tourism assets. It is told from Tony Alvarado’s direct experience developing and operating hotels in La Fortuna de San Carlos, Costa Rica.',
  },
  {
    question: 'Who is it for?',
    answer:
      'Anyone building, operating, or considering entering a tourism project: hoteliers, developers, operators, and entrepreneurs in the sector. It is not a tourism theory book — it is a record of what you learn by doing it.',
  },
  {
    question: 'Is this Tony Alvarado’s third book?',
    answer:
      'Yes. The first two are "Secretos para ser un empresario exitoso", on the principles of building a company, and "Sigue Pedaleando", on faith, purpose, and resilience around the bicycle. Both are available on Amazon.',
  },
  {
    question: 'Will there be an English edition?',
    answer:
      'The Spanish edition comes first. Any other edition will be announced on this page once it is confirmed.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pageFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

/* ── Page ──────────────────────────────────────────────────────────────────── */

export default function NewTourismBusinessPage() {
  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookSchema3} />
      <JsonLd data={faqSchema} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden px-6 pb-24 pt-16 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[640px]
                     bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(201,162,77,0.16)_0%,transparent_72%)]"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          <Link
            href="/en/books"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-gold"
          >
            <ArrowLeft size={15} />
            All books
          </Link>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
            <div>
              <span
                className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-brand-gold/10
                           px-4 py-1.5 ring-1 ring-brand-gold/30"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-gold" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Third book · In preparation
                </span>
              </span>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-text md:text-6xl">
                The New Tourism<br />
                Business{' '}
                <span className="text-brand-gold">2027</span>
              </h1>

              <div className="mt-8 h-px w-28 bg-gradient-to-r from-brand-gold/60 to-transparent" />

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-muted">
                Guests stopped travelling for the room. The generic hotel stopped being a
                good business. And the hard part was never filling the rooms — it was
                building and running the place without it collapsing on you.
              </p>

              <p className="mt-5 max-w-xl leading-relaxed text-brand-muted">
                This book is the record of that, written from the inside: from La Fortuna
                de San Carlos, while one hotel goes up and another one runs.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#notify"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-brand-gold
                             px-8 py-4 text-[15px] font-bold text-brand-bg
                             shadow-[0_8px_32px_rgba(201,162,77,0.35)]
                             transition-all hover:opacity-90 hover:shadow-[0_12px_48px_rgba(201,162,77,0.45)]"
                >
                  <BellRing size={17} />
                  Notify me when it launches
                </Link>
                <p className="text-sm text-brand-muted">No publication date yet.</p>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-10 rounded-full bg-brand-gold/[0.13] blur-[70px]"
                />
                <BookCover2027
                  className="relative w-[260px] rounded-[3px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),0_0_70px_-15px_rgba(201,162,77,0.35)]
                             md:w-[330px] lg:w-[360px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ Thesis ══ */}
      <section className="border-y border-brand-border/60 bg-brand-surface px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            What it is about
          </p>
          <blockquote className="text-2xl font-semibold leading-[1.45] text-brand-text md:text-[2rem]">
            &ldquo;For twenty years the business was having rooms. Now the business is
            having{' '}
            <span className="text-brand-gold">a reason to come</span>
            {' '}— and an operation that holds up once people arrive.&rdquo;
          </blockquote>
          <p className="mx-auto mt-9 max-w-2xl leading-relaxed text-brand-muted">
            Tourism is not dying: it is reorganizing. Travellers changed what they are
            looking for, wellness stopped being an add-on, and technology made half of a
            still-manual operation unnecessary. This book covers what changed, why, and
            what to do differently — without romanticizing the part that hurts, which is
            building.
          </p>
        </div>
      </section>

      {/* ══ Chapters ══ */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Contents
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-text md:text-4xl">
              Nine chapters.{' '}
              <span className="text-brand-gold">None of them theoretical.</span>
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {chapters.map(({ n, icon: Icon, title, text }) => (
              <li
                key={n}
                className="group flex flex-col rounded-2xl border border-brand-border
                           bg-brand-card p-7 transition-colors duration-300
                           hover:border-brand-gold/35"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl
                               bg-brand-gold/10 ring-1 ring-brand-gold/20"
                  >
                    <Icon size={17} className="text-brand-gold" />
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wider text-brand-gold/45">
                    {n}
                  </span>
                </div>
                <h3 className="mb-3 text-[17px] font-bold leading-snug text-brand-text">
                  {title}
                </h3>
                <p className="text-sm leading-[1.7] text-brand-muted">{text}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-brand-muted">
            The table of contents may still shift while the book is being finished.
          </p>
        </div>
      </section>

      {/* ══ Author ══ */}
      <section className="border-y border-brand-border/60 bg-brand-surface px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Who is writing it
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-text md:text-4xl">
              Not an observer of the sector.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-muted">
              Tony Alvarado builds and operates themed hotels in La Fortuna de San Carlos,
              Costa Rica. What is in the book he learned on site, in permit offices, in
              contractor meetings, and running an operation with real people.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                dt: 'Bike & Bed Hotels',
                dd: 'Cycling-themed hotel in La Fortuna. Stage 1 operating since September 2025.',
              },
              {
                dt: 'Humaya Costa Rica',
                dd: 'Stage 2, under construction: 10 villas with gym, spa, hot springs, sauna, and cold plunge. Opening planned for November 2026.',
              },
              {
                dt: 'PuroMTB',
                dd: 'Cycling store and community founded in 2004. Where the whole ecosystem started.',
              },
            ].map(({ dt, dd }) => (
              <div
                key={dt}
                className="rounded-2xl border border-brand-border bg-brand-card p-7"
              >
                <dt className="mb-3 text-[15px] font-bold text-brand-gold">{dt}</dt>
                <dd className="text-sm leading-[1.7] text-brand-muted">{dd}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 text-center">
            <Link
              href="/en/about"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40
                         px-7 py-3.5 text-sm font-semibold text-brand-gold
                         transition-colors hover:bg-brand-gold/10"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Notify ══ */}
      <section id="notify" className="scroll-mt-24 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ContactFormEmbed
            heading="Get notified when the book launches"
            subheading="Leave your email and we will write as soon as there is a publication date. Pick “Books” as your main interest."
            locale="en"
          />
        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" title="Frequently asked questions" />
    </main>
  )
}
