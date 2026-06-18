import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, Globe, Users, Zap, ArrowRight } from 'lucide-react'
import TrackedLink from '@/components/common/TrackedLink'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import PhotoStrip from '@/components/ui/PhotoStrip'

export const metadata: Metadata = {
  title: {
    absolute: 'Pure Cycling — Online Cycling Training | Tony Alvarado',
  },
  description:
    'Join Pure Cycling: an online cycling training program with personalized MTB and road cycling plans. Members in 30+ countries.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/pure-cycling' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/pure-cycling',
    siteName: 'Tony Alvarado',
    title: 'Pure Cycling — Transform Your Life Through Cycling',
    description:
      'Community in 30+ countries. Training, mindset, nutrition and support for cyclists who want to transform their lives.',
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-poca-luz.png',
        width: 1672,
        height: 941,
        alt: 'Pure Cycling — cycling community in 30+ countries',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pure Cycling — Transform Your Life Through Cycling',
    description:
      'Community in 30+ countries. Training, mindset, nutrition and support for cyclists who want to transform their lives.',
    images: ['/images/og/ciclista-paisaje-montanoso-poca-luz.png'],
  },
  robots: { index: false, follow: true },
}

const features = [
  {
    icon: Zap,
    title: 'Personalized training plan',
    description: 'Designed for your level, time and specific goal.',
  },
  {
    icon: Zap,
    title: 'Cycling-specific nutrition',
    description: 'Eating guides adapted to performance on the bike.',
  },
  {
    icon: Zap,
    title: 'Mobility and functional strength',
    description: 'Off-bike work that improves your pedaling.',
  },
  {
    icon: Zap,
    title: 'Mindset and discipline',
    description: 'Mental tools to stay consistent and focused.',
  },
  {
    icon: Zap,
    title: 'Spirituality and purpose',
    description: 'The element that connects everything in one process.',
  },
  {
    icon: Users,
    title: '24/7 active community',
    description: 'Committed cyclists from 30+ countries.',
  },
  {
    icon: CheckCircle2,
    title: 'Experienced coaches',
    description: 'Trained by Tony Alvarado and certified in cycling.',
  },
  {
    icon: ArrowRight,
    title: '90-day transformation program',
    description: 'A structured process with a start, progression and result.',
  },
]

export default function EnPureCyclingPage() {
  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="bg-brand-bg px-6 py-24 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Pure Cycling — Online Cycling Training
              </p>
              <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-6xl">
                Train with structure.{' '}
                <span className="text-brand-green">Live cycling with more intention.</span>
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-brand-muted md:text-lg">
                Pure Cycling integrates a personalized training plan, nutrition, mindset,
                mobility, strength and spirituality. Members in 30+ countries.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 pt-2">
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-green">+500</p>
                  <p className="text-sm text-brand-muted">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-green">30+</p>
                  <p className="text-sm text-brand-muted">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-brand-green">90</p>
                  <p className="text-sm text-brand-muted">Day Program</p>
                </div>
              </div>

              <TrackedLink
                href="https://www.skool.com/purecycling"
                event="click_skool"
                params={{ interest: 'pure-cycling', cta_location: 'pure_cycling_hero' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
              >
                Join the community <ArrowRight size={15} />
              </TrackedLink>
            </div>

            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/pure-cycling/pure-cycling-team-02.jpeg"
                alt="Pure Cycling team — online cycling community"
                width={700}
                height={500}
                quality={90}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-brand-surface py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            What you get
          </p>
          <h2 className="mb-12 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
            Everything you need to transform on the bike.
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-brand-border bg-brand-card p-6"
              >
                <h3 className="mb-2 font-semibold leading-snug text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-brand-green/20 bg-brand-card p-8">
            <p className="mb-2 font-semibold text-brand-text">Who is Pure Cycling for?</p>
            <p className="text-brand-muted">
              For beginners who want to start right. For cyclists who want to improve with
              structure. For those looking for more than mileage.
            </p>
          </div>
        </div>
      </section>

      {/* ── The program ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
            <div className="flex-1 overflow-hidden rounded-2xl">
              <Image
                src="/images/pure-cycling/pure-cycling-community-road-01.webp"
                alt="Pure Cycling community on the road — online cycling training"
                width={700}
                height={500}
                quality={90}
                className="w-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                The program
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Structure you can feel. Results you can see.
              </h2>
              <p className="leading-relaxed text-brand-muted">
                Pure Cycling is not a WhatsApp plan or a spreadsheet with intervals.
                It&apos;s an integrated system with personalized training, nutrition, mindset,
                mobility, strength and spirituality — all in an active community with members
                in 30+ countries.
              </p>
              <ul className="space-y-3">
                {[
                  'Training plan designed for your level and goal',
                  'Active community in 30+ countries',
                  'Support from coaches trained by Tony Alvarado and certified in cycling.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <TrackedLink
                href="https://www.skool.com/purecycling"
                event="click_skool"
                params={{ interest: 'pure-cycling', cta_location: 'pure_cycling_program' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
              >
                Explore the program <ArrowRight size={15} />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo strip ── */}
      <div className="bg-brand-bg px-6 pb-8 md:px-12">
        <div className="mx-auto max-w-6xl">
          <PhotoStrip
            photos={[
              { src: '/images/pure-cycling/pure-cycling-team-02.jpeg',           alt: 'Pure Cycling team' },
              { src: '/images/pure-cycling/pure-cycling-community-road-01.webp', alt: 'Pure Cycling community on the road' },
              { src: '/images/pure-cycling/pure-cycling-transformacion-01.jpeg', alt: 'Transformation through cycling' },
            ]}
          />
          <p className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-brand-muted">
            Community · Discipline · Transformation
          </p>
        </div>
      </div>

      {/* ── 90-day program ── */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row">
            <div className="flex-1 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Pure Cycling Program
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                A structured 90-day cycling program.
              </h2>
              <p className="text-lg font-semibold text-brand-muted">On two wheels.</p>
              <p className="leading-relaxed text-brand-muted">
                An integrated system of training, nutrition, mobility, strength, mindset,
                spirituality and community. Everything you need to make progress in 90 days
                on the bike.
              </p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {features.map(({ title, description }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-brand-border bg-brand-card p-5"
                  >
                    <p className="mb-1 text-sm font-semibold text-brand-text">{title}</p>
                    <p className="text-xs leading-relaxed text-brand-muted">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col justify-center gap-6 lg:w-64">
              {[
                { value: '+500', label: 'members' },
                { value: '30+',  label: 'countries' },
                { value: '90',   label: 'day program' },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-brand-border bg-brand-card p-6 text-center"
                >
                  <p className="text-4xl font-bold text-brand-green">{value}</p>
                  <p className="mt-1 text-sm text-brand-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contact form ── */}
      <ContactFormEmbed
        locale="en"
        preselectedType="pure-cycling"
        heading="Ready to take the first step?"
        subheading="Complete the form and our team will send you the program details and next steps."
      />

    </main>
  )
}
