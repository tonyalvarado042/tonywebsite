import type { Metadata } from 'next'
import Link from 'next/link'
import { Compass, CheckCircle2, Target, Users, TrendingUp, Wallet, Megaphone } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import MentoriaForm from '@/components/sections/MentoriaForm'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: { absolute: 'Business Mentoring — Tony Alvarado' },
  description:
    'Direct guidance and advisory for business owners who want to grow and have the company run without them. Marketing, leadership, sales, strategy and finance, backed by 22+ years building companies.',
  alternates: { canonical: `${SITE_URL}/en/mentoring` },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${SITE_URL}/en/mentoring`,
    siteName: 'Tony Alvarado',
    title: 'Business Mentoring — Tony Alvarado',
    description:
      'Direct guidance to scale your company and let go of the day-to-day. 22+ years building businesses, certified in leadership by John Maxwell Leadership.',
    images: [{ url: '/images/og/tony-alvarado-og-source.jpeg', width: 1600, height: 900, alt: 'Tony Alvarado — business mentoring' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Mentoring — Tony Alvarado',
    description: 'Direct guidance to scale your company and let go of the day-to-day.',
    images: ['/images/og/tony-alvarado-og-source.jpeg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/mentoring#webpage`,
  name: 'Business Mentoring — Tony Alvarado',
  description:
    'Direct guidance and advisory for business owners who want to grow and have the company run without them.',
  url: `${SITE_URL}/en/mentoring`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Mentoring', item: `${SITE_URL}/en/mentoring` },
  ],
}

const pageFaqs: PageFAQItem[] = [
  {
    question: 'Who is this business mentoring for?',
    answer:
      'For business owners who already sell but feel the company depends too much on them: those working long hours for thin results, or those who grew and no longer know how to organise what they have. It is not for someone still thinking through an idea.',
  },
  {
    question: 'What topics does the mentoring cover?',
    answer:
      'Five fronts: marketing (a clear message that actually brings customers), leadership (building a team that does what the owner does today), sales (a process that does not depend on anyone’s charisma), strategy (ideal customer and offer) and finance (the numbers that decide whether the company grows or drowns).',
  },
  {
    question: 'What is Tony Alvarado’s background?',
    answer:
      'More than 22 years building and scaling his own companies, a group of businesses that today runs with little day-to-day involvement from him, and a leadership certification from John Maxwell Leadership. He is also an author and speaker.',
  },
  {
    question: 'How does it start?',
    answer:
      'Fill in the form on this page and pick the topic squeezing you most right now. The team reviews the request and writes to set up a first conversation, where you both decide whether it makes sense to work together and in what format.',
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

const pillars = [
  { icon: Megaphone, title: 'Marketing', description: 'A clear message that actually brings customers. If a reader cannot tell who you serve in five seconds, your ad spend goes nowhere.' },
  { icon: Users, title: 'Leadership', description: 'A team that does what you do today. Nobody built anything great alone, and no company scales with the owner in the middle of everything.' },
  { icon: TrendingUp, title: 'Sales', description: 'A process that does not depend on anyone’s charisma. Sales should run on a system, not on who had a good day.' },
  { icon: Target, title: 'Strategy', description: 'Absolute clarity on who your ideal customer is, and an offer built to land with them. The rest is noise.' },
  { icon: Wallet, title: 'Finance', description: 'The numbers that decide whether you grow or drown. Not year-end accounting: cash flow and the indicators you check every week.' },
]

const credentials = [
  'More than 22 years building and scaling his own companies',
  'Leadership certification from John Maxwell Leadership',
  'A group of companies that today runs with little owner involvement',
  'Author and speaker, trained alongside references such as Spencer Hoffman',
  'Real experience in marketing, sales, teams and finance — not textbook theory',
]

export default function MentoringPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            <Compass size={12} /> Business mentoring
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Scale your company to 6 or 7 figures,{' '}
            <span className="text-brand-accent">with someone who already did it.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-brand-muted">
            Not a course, not a template. Direct guidance and advisory so your business
            grows and — above all — learns to run without you in the middle of everything.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="#request"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Compass size={15} /> I want guidance →
            </Link>
            <Link
              href="/en/about"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Read Tony&rsquo;s story →
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              What we work on
            </p>
            <h2 className="text-3xl font-bold text-brand-text">The five fronts</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted">
              Most companies do not stall for lack of effort, but because one of these
              five fronts is weak and drags the rest down with it.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-7 transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Why Tony
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                He will not teach you<br />
                <span className="text-brand-accent">what he read in a book.</span>
              </h2>
              <p className="mt-4 text-brand-muted">
                Tony built a group of companies around a passion and got them running
                without depending on him. What he will tell you, he made, paid for and
                fixed inside his own operation.
              </p>
            </div>

            <ul className="space-y-3">
              {credentials.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-24 bg-brand-surface py-20">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              First step
            </p>
            <h2 className="text-3xl font-bold text-brand-text">Tell us what is holding you back</h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-muted">
              Pick the topic squeezing you most right now and leave us a way to reach you.
              We will write to set up a first conversation.
            </p>
          </div>
          <MentoriaForm locale="en" />
        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" />
    </main>
  )
}
