import type { Metadata } from 'next'
import Image from 'next/image'
import { CheckCircle2, Globe, Users, Zap, ArrowRight } from 'lucide-react'
import TrackedLink from '@/components/common/TrackedLink'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import PhotoStrip from '@/components/ui/PhotoStrip'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { client } from '@/sanity/lib/client'
import { testimonialsByPageQuery, type SanityTestimonial } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'
import { pureCyclingTestimonials, type TestimonialItem } from '@/data/testimonials'

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

const pureCyclingOrgEn = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#pure-cycling`,
  name: 'Pure Cycling',
  description:
    'An online cycling training community combining training, nutrition, mindset, mobility and purpose, with members in over 30 countries.',
  url: `${SITE_URL}/pure-cycling`,
  founder: personRef,
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/pure-cycling#webpage`,
  name: 'Pure Cycling — Online Cycling Training | Tony Alvarado',
  description:
    'Join Pure Cycling: an online cycling training program with personalized MTB and road cycling plans. Members in 30+ countries.',
  url: `${SITE_URL}/en/pure-cycling`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#pure-cycling` }],
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Pure Cycling', item: `${SITE_URL}/en/pure-cycling` },
  ],
}

const features = [
  { title: 'Personalized training plan',       description: 'Designed for your level, time and specific goal.' },
  { title: 'Cycling-specific nutrition',        description: 'Eating guides adapted to performance on the bike.' },
  { title: 'Mobility and functional strength',  description: 'Off-bike work that improves your pedaling.' },
  { title: 'Mindset and discipline',            description: 'Mental tools to stay consistent and focused.' },
  { title: 'Spirituality and purpose',          description: 'The element that connects everything in one process.' },
  { title: 'Active cycling community',          description: 'Cyclists from 30+ countries.' },
  { title: 'Coaching support',                  description: 'Support from coaches trained by Tony Alvarado.' },
  { title: 'Structured 90-day program',         description: 'A progressive process with clear stages and guidance.' },
]

export default async function EnPureCyclingPage() {
  let testimonials: TestimonialItem[] = pureCyclingTestimonials

  try {
    const raw: SanityTestimonial[] = await client.fetch(
      testimonialsByPageQuery,
      { page: 'pure-cycling' },
      { next: { revalidate: 60 } }
    )
    if (Array.isArray(raw) && raw.length > 0) {
      const normalized: TestimonialItem[] = raw
        .filter((t) => t.videoUrl?.trim() || t.posterUrl?.trim() || t.posterImage)
        .map((t) => {
          let resolvedPoster = t.posterUrl ?? null
          if (!resolvedPoster && t.posterImage?.asset) {
            try {
              resolvedPoster = urlForImage(t.posterImage).width(800).url()
            } catch {
              resolvedPoster = null
            }
          }
          return {
            name: t.name,
            role: t.role,
            country: t.country,
            quote: t.quote,
            videoUrl: t.videoUrl,
            posterUrl: resolvedPoster,
            page: t.page,
            order: t.order,
            featured: t.featured,
          }
        })
      if (normalized.length > 0) testimonials = normalized
    }
  } catch {
    // Sanity unavailable — local fallback active
  }

  return (
    <main>
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />
      <JsonLd data={pureCyclingOrgEn} />

      {/* ── Hero — editorial full-width ── */}
      <section className="relative bg-brand-bg">
        <div className="relative h-[580px] overflow-hidden md:h-[660px]">
          <Image
            src="/images/pure-cycling/pure-cycling-team-02.jpeg"
            alt="Pure Cycling community — cyclists in training"
            fill
            priority
            quality={90}
            className="object-cover object-[50%_20%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/65 via-brand-bg/45 to-brand-bg" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Pure Cycling — Online Cycling Training
            </p>
            <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-5xl">
              Train with structure.<br />
              <span className="text-brand-green">Live cycling with more intention.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-white/70">
              Pure Cycling integrates a personalized training plan, nutrition, mindset,
              mobility, strength and spirituality. Members in 30+ countries.
            </p>

            <div className="mx-auto mt-10 flex max-w-xl flex-col items-center justify-center gap-8 sm:flex-row">
              <div className="text-center">
                <Users size={20} className="mx-auto mb-2 text-brand-green" />
                <p className="text-3xl font-bold text-white md:text-4xl">Online</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Community platform</p>
              </div>
              <div className="hidden h-10 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <Globe size={20} className="mx-auto mb-2 text-brand-green" />
                <p className="text-3xl font-bold text-white md:text-4xl">30+</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Countries</p>
              </div>
              <div className="hidden h-10 w-px bg-white/20 sm:block" />
              <div className="text-center">
                <Zap size={20} className="mx-auto mb-2 text-brand-green" />
                <p className="text-3xl font-bold text-white md:text-4xl">90</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-white/60">Days of guided training</p>
              </div>
            </div>

            <div className="mt-8">
              <TrackedLink
                href="https://www.skool.com/purecycling"
                event="click_skool"
                params={{ cta_text: 'Join the community', cta_location: 'pure_cycling_hero', destination_type: 'external', interest: 'pure-cycling' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.35)] transition-opacity hover:opacity-90"
              >
                Join the community →
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's included ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              Everything you need to<br />
              <span className="text-brand-green">transform on the bike.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <CheckCircle2 size={18} className="mb-3 text-brand-green" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-green/20 bg-brand-card p-7">
            <h3 className="mb-2 font-bold text-brand-text">Who is Pure Cycling for?</h3>
            <p className="text-sm text-brand-muted">
              For beginners who want to start right.
              For cyclists who want to improve with structure.
              For those looking for more than mileage.
            </p>
          </div>
        </div>
      </section>

      {/* ── The program ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/pure-cycling/pure-cycling-community-road-01.webp"
                  alt="Pure Cycling community on the road — online cycling training"
                  fill
                  loading="lazy"
                  quality={100}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                The program
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Structure you can feel.<br />
                <span className="text-brand-green">Structure you can follow.</span>
              </h2>
              <p className="text-brand-muted">
                Pure Cycling is not a WhatsApp plan or a spreadsheet with intervals.
                It&apos;s an integrated system with personalized training, nutrition, mindset,
                mobility, strength and spirituality — all in an active community with members
                in 30+ countries.
              </p>
              <ul className="space-y-3">
                {[
                  'Training plan designed for your level and goal',
                  'Active community in 30+ countries',
                  'Coaching support from coaches trained by Tony Alvarado',
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
                params={{ cta_text: 'Explore the program', cta_location: 'pure_cycling_program', destination_type: 'external', interest: 'pure-cycling' }}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.35)] transition-opacity hover:opacity-90"
              >
                Explore the program <ArrowRight size={15} />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo strip ── */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/pure-cycling/pure-cycling-team-02.jpeg',           alt: 'Pure Cycling team',                     position: 'object-center' },
              { src: '/images/pure-cycling/pure-cycling-community-road-01.webp', alt: 'Pure Cycling community on the road',     position: 'object-center' },
              { src: '/images/pure-cycling/pure-cycling-transformacion-01.jpeg', alt: 'Transformation through cycling',         position: 'object-center' },
            ]}
          />
          <p className="mt-5 text-center text-xs font-medium uppercase tracking-widest text-brand-muted">
            Community · Discipline · Transformation
          </p>
        </div>
      </section>

      {/* ── 90-day program ── */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-card">
            <div className="grid md:grid-cols-2">

              {/* Text and benefits */}
              <div className="border-b border-brand-border p-8 md:border-b-0 md:border-r md:p-12">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Pure Cycling Program
                </p>
                <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                  Build greater consistency{' '}
                  <span className="text-brand-accent">over 90 days.</span>
                </h2>
                <p className="mt-2 text-lg font-medium text-brand-text/70">On two wheels.</p>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  An integrated system of training, nutrition, mobility, strength, mindset,
                  spirituality and community — designed to help you build consistency,
                  discipline and progress on the bike.
                </p>
                <ul className="mt-7 space-y-3">
                  {features.map(({ title }) => (
                    <li key={title} className="flex items-center gap-3 text-sm text-brand-muted">
                      <CheckCircle2 size={16} className="shrink-0 text-brand-accent" />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Numbers */}
              <div className="flex flex-col items-center justify-center gap-10 p-8 md:p-12">
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-text">30+</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">countries</p>
                </div>
                <div className="h-px w-20 bg-brand-border" />
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-accent">90</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">days of guided training</p>
                </div>
                <div className="h-px w-20 bg-brand-border" />
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-text">Online</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">training platform</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Testimonials
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Real stories inside Pure Cycling
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-muted">
              People who decided to transform their lives through cycling, discipline and community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={t.videoUrl ?? t.posterUrl ?? i} className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card">
                {t.videoUrl ? (
                  <video
                    controls
                    preload="none"
                    playsInline
                    poster={t.posterUrl ?? undefined}
                    className="w-full aspect-video"
                    src={t.videoUrl}
                  />
                ) : t.posterUrl ? (
                  <div className="relative aspect-video w-full">
                    <Image
                      src={t.posterUrl}
                      alt={t.name ? `Testimonial from ${t.name}` : 'Pure Cycling testimonial'}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null}
                {(t.name || t.quote) && (
                  <div className="p-4">
                    {t.quote && (
                      <p className="text-sm text-brand-muted">&ldquo;{t.quote}&rdquo;</p>
                    )}
                    {t.name && (
                      <p className="mt-2 text-xs font-semibold text-brand-text">
                        {t.name}
                        {t.role && <span className="font-normal text-brand-muted"> · {t.role}</span>}
                        {t.country && <span className="font-normal text-brand-muted"> · {t.country}</span>}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormEmbed
        locale="en"
        preselectedType="pure-cycling"
        heading="Ready to take the first step?"
        subheading="Complete the form and our team will send you the program details and next steps."
      />

    </main>
  )
}
