import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Hero from '@/components/sections/Hero'
import MetricsStrip from '@/components/sections/MetricsStrip'
import AboutTony from '@/components/sections/AboutTony'
import FaithAndPurpose from '@/components/sections/FaithAndPurpose'
import BusinessEcosystem from '@/components/sections/BusinessEcosystem'
import PhotoStrip from '@/components/ui/PhotoStrip'
import Books from '@/components/sections/Books'
import Mentors from '@/components/sections/Mentors'
import PedaleaFelicidad from '@/components/sections/PedaleaFelicidad'
import RecentArticles from '@/components/sections/RecentArticles'
import Speaking from '@/components/sections/Speaking'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { puroMTBOrg, SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { type FAQItem } from '@/data/faqs'
import { homeMetricsEn } from '@/data/metrics'

export const metadata: Metadata = {
  title: {
    absolute: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
  },
  description:
    'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels. Over 22 years building community and purpose around mountain biking and road cycling.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en',
    siteName: 'Tony Alvarado',
    title: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
    description:
      'Cycling coach and entrepreneur from Costa Rica, founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
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
    title: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
    description:
      'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en#webpage`,
  name: 'Tony Alvarado — Cycling Coach & Entrepreneur from Costa Rica',
  description:
    'Cycling coach and entrepreneur from Costa Rica. Founder of Pure Cycling, PuroMTB and Bike & Bed Hotels. Over 22 years building community and purpose around mountain biking and road cycling.',
  url: `${SITE_URL}/en`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: personRef,
}

const faqsEn: FAQItem[] = [
  {
    question: 'How can I get a personalized cycling training plan in Costa Rica with Tony Alvarado?',
    answer: [
      {
        type: 'paragraph',
        text: '**Tony Alvarado** offers **personalized training plans** designed for your level, goals and physical condition, with real support through **Pure Cycling**. As a certified coach, he combines professional methodology and close follow-up to help you improve your performance on the bike.',
      },
      {
        type: 'list',
        items: [
          'Plan designed for your level, available time and specific goals',
          'Support from certified coaches — not just a spreadsheet',
          'Covers everything from weight loss and endurance to MTB competition preparation',
          'Integrates nutrition, mobility and mindset — not just pedaling',
          'Works for both beginners and intermediate cyclists',
        ],
      },
    ],
  },
  {
    question: 'What mountain biking (MTB) routes can I find in Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: '**Costa Rica** offers mountain biking routes for all levels, with a climate that allows riding year-round.',
      },
      {
        type: 'list',
        items: [
          'Featured areas: La Fortuna, Cartago, Escazú and the surroundings of San José',
          'Technical trails with volcanic altitudes, forests and unique landscapes',
          'Routes ideal for both beginners and advanced cyclists',
          'Many routes accessible from **Bike & Bed Hotels**, designed for cyclists who want to train, travel and experience MTB in Costa Rica',
          'Active community organized through **PuroMTB**, with events and rides',
        ],
      },
    ],
  },
  {
    question: 'How can I improve my descending technique in MTB, enduro or downhill with Tony Alvarado?',
    answer: [
      {
        type: 'paragraph',
        text: 'Through **Pure Cycling**, **Tony Alvarado** offers personalized **MTB** coaching to improve descending technique, build confidence and overcome fear on technical terrain.',
      },
      {
        type: 'list',
        items: [
          'In-person workshops and digital courses focused on enduro and downhill in Costa Rica',
          'Specific work on cornering, braking, posture and bike control',
          'Designed for MTB beginners and those who already compete on technical routes',
        ],
      },
    ],
  },
  {
    question: 'What is power training (watts) and why is it key to improving my cycling performance?',
    answer: [
      {
        type: 'paragraph',
        text: '**Power training** is the smartest way to improve in cycling because it allows you to train with real data, not just "by feel." Watts show exactly how much effort you are putting in on the bike.',
      },
      {
        type: 'list',
        items: [
          'Allows you to progress faster and avoid overtraining',
          'Improves endurance and speed in a measurable and progressive way',
          'It means training with your eyes open: data guides every session',
          'In **Pure Cycling**, power metrics are used to create precise and effective programs for each cyclist',
        ],
      },
    ],
  },
  {
    question: "Beginner's cycling guide: what basic equipment do I really need to start without overspending?",
    answer: [
      {
        type: 'paragraph',
        text: "To start cycling you don't need to buy the most expensive gear. **MTB** is ideal for those who want mountain trails and varied terrain. The key is choosing the right equipment from the start to progress without overspending.",
      },
      {
        type: 'list',
        items: [
          'Bike suited to your type of route (road or mountain)',
          'Good quality helmet — essential',
          'Comfortable cycling shorts, gloves and basic hydration',
          'At **PuroMTB** they offer specialized advice to help you choose your first bike',
        ],
      },
    ],
  },
  {
    question: 'Is there a nutrition plan for cyclists to improve performance?',
    answer: [
      {
        type: 'paragraph',
        text: 'Yes. Good **cyclist nutrition** can make the difference between feeling drained or performing at your best in every training session.',
      },
      {
        type: 'list',
        items: [
          '**Before riding:** clean energy and proper hydration',
          '**During the ride:** maintain carbohydrates and electrolytes',
          '**After training:** recover muscles with protein and proper nutrition',
          'In **Pure Cycling** you learn to combine nutrition, training and mindset to improve performance and build more endurance on the bike',
        ],
      },
    ],
  },
  {
    question: 'What is Bike & Bed Hotels?',
    answer: [
      {
        type: 'paragraph',
        text: '**Bike & Bed Hotels** is a cycling-themed boutique hotel created by **Tony Alvarado** in **Costa Rica** for cyclists looking for accommodation, workshops, guided routes, coaching and community in one place.',
      },
      {
        type: 'list',
        items: [
          'Located near MTB routes in Costa Rica',
          'Designed for both local and international cyclists who live the passion for cycling',
          'With a vision to expand toward an international network of cycling-themed hotels',
        ],
      },
    ],
  },
  {
    question: 'What is PuroMTB and what services does it offer the mountain biking community in Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: '**PuroMTB** is a mountain biking brand in **Costa Rica** founded by **Tony Alvarado**, with over two decades in the MTB industry.',
      },
      {
        type: 'list',
        items: [
          'Physical stores and e-commerce with bikes and accessories from international brands',
          'Specialized workshops and personalized advice for cyclists of all levels',
          'Over 20 years supporting events, communities and new cyclists in Costa Rica',
          'Over 20 years as part of the Costa Rican cycling community',
        ],
      },
    ],
  },
  {
    question: 'What is the secret behind a good cycling training plan?',
    answer: [
      {
        type: 'paragraph',
        text: "The secret is not accumulating miles. A good cycling **training plan** combines structure, rest, nutrition and clear goals based on your level.",
      },
      {
        type: 'list',
        items: [
          'Without planning, training can waste your time, energy and motivation',
          'In **Pure Cycling**, programs are developed for beginner and advanced cyclists',
          'The focus: improve performance, technique and fitness in an intelligent and sustainable way',
        ],
      },
    ],
  },
  {
    question: 'What is Pure Cycling?',
    answer: [
      {
        type: 'paragraph',
        text: 'Pure Cycling is the cycling training community founded by Tony Alvarado. It integrates a personalized training plan with nutrition, mindset, mobility, strength and spirituality in one program, with members in 30+ countries. Designed to transform your life on the bike.',
      },
    ],
  },
  {
    question: 'Does Tony Alvarado offer in-person conferences outside Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: 'Yes. Tony Alvarado is available for in-person and virtual events in Costa Rica and abroad. To request a speaking engagement, complete the contact form with the event details.',
      },
    ],
  },
]

const faqSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqsEn.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer
        .map((block) => {
          const clean = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1')
          if (block.type === 'paragraph') return clean(block.text)
          if (block.type === 'list') return block.items.map(clean).join('. ')
          return ''
        })
        .filter(Boolean)
        .join(' '),
    },
  })),
}

function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto max-w-4xl px-6 md:px-12"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-brand-border/50 to-transparent" />
    </div>
  )
}

export default function EnHomePage() {
  return (
    <main>
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={puroMTBOrg} />
      <JsonLd data={faqSchemaEn} />

      <Hero locale="en" />
      <MetricsStrip metrics={homeMetricsEn} />
      <AboutTony locale="en" />
      <SectionDivider />
      <FaithAndPurpose locale="en" />
      <SectionDivider />
      <section className="bg-brand-bg py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/tony/tony-ciclismo-bosque-01.jpg', alt: 'Tony Alvarado mountain biking', position: 'object-[50%_65%]' },
              { src: '/images/tony/tony-ciclismo-ruta-01.jpg',   alt: 'Tony Alvarado road cycling',    position: 'object-[50%_58%]' },
              { src: '/images/tony/tony-ciclismo-vacas-02.jpg',  alt: 'Tony Alvarado cycling in the countryside', position: 'object-[50%_65%]' },
            ]}
          />
        </div>
      </section>
      <SectionDivider />
      <BusinessEcosystem locale="en" />
      <SectionDivider />

      {/* Editorial block — Purpose */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/tony/tony-ciclismo-bosque-02.jpg"
                  alt="Tony Alvarado mountain biking — purpose and transformation"
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
                Purpose
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Every pedal stroke<br />
                <span className="text-brand-green">has a purpose.</span>
              </h2>
              <p className="text-brand-muted">
                Tony Alvarado did not build companies by accident. Behind each project
                is a story of faith, discipline and a deep conviction: the bicycle
                can change lives. It did with his, and today he makes it possible for
                thousands of people in 30+ countries.
              </p>
              <ul className="space-y-3">
                {[
                  'Over 22 years transforming lives through cycling',
                  'Active community in Costa Rica and Latin America',
                  'Faith, purpose and discipline as pillars of leadership',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/en/about"
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-7 py-3.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
              >
                Read Tony&apos;s story <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />
      <PedaleaFelicidad locale="en" />
      <SectionDivider />
      <Books locale="en" />
      <SectionDivider />
      <Mentors locale="en" />
      <Speaking locale="en" />
      <SectionDivider />
      <RecentArticles locale="en" />
      <Contact locale="en" />
      <FAQ locale="en" questions={faqsEn} />
    </main>
  )
}
