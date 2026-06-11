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
// import Testimonials from '@/components/sections/Testimonials' — oculto hasta tener testimonios reales
import Speaking from '@/components/sections/Speaking'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { puroMTBOrg, SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { faqs, faqAnswerToPlainText } from '@/data/faqs'
import { homeMetrics, type MetricItem } from '@/data/metrics'
import { client } from '@/sanity/lib/client'
import { homeMetricsQuery, type SanityMetric } from '@/sanity/lib/queries'

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  name: 'Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Coach y entrenador de ciclismo en Costa Rica. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels. Más de 22 años construyendo comunidad y propósito alrededor del mountain bike y el ciclismo de ruta.',
  url: SITE_URL,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faqAnswerToPlainText(faq.answer),
    },
  })),
}

/* ── Separador visual sutil entre secciones ── */
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

const VALID_COLORS = new Set(['gold', 'text', 'green'])

export default async function HomePage() {
  let metrics: MetricItem[] = homeMetrics

  try {
    const raw: SanityMetric[] = await client.fetch(
      homeMetricsQuery,
      {},
      { next: { revalidate: 60 } }
    )
    if (Array.isArray(raw) && raw.length > 0) {
      const normalized: MetricItem[] = raw
        .filter((m) => m.value?.trim() && m.label?.trim())
        .map((m) => ({
          value: m.value.trim(),
          label: m.label.trim(),
          color: (VALID_COLORS.has(m.color) ? m.color : 'text') as MetricItem['color'],
        }))
      if (normalized.length > 0) metrics = normalized
    }
  } catch {
    // Sanity unavailable — local fallback active
  }

  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={puroMTBOrg} />
      <JsonLd data={faqSchema} />

      <Hero />
      <MetricsStrip metrics={metrics} />
      <AboutTony />
      <SectionDivider />
      <FaithAndPurpose />
      <SectionDivider />
      <section className="bg-brand-bg py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/tony/tony-ciclismo-bosque-01.jpg', alt: 'Tony Alvarado ciclismo de montaña', position: 'object-[50%_65%]' },
              { src: '/images/tony/tony-ciclismo-ruta-01.jpg', alt: 'Tony Alvarado ciclismo de ruta', position: 'object-[50%_58%]' },
              { src: '/images/tony/tony-ciclismo-vacas-02.jpg', alt: 'Tony Alvarado ciclismo en el campo', position: 'object-[50%_65%]' },
            ]}
          />
        </div>
      </section>
      <SectionDivider />
      <BusinessEcosystem />
      <SectionDivider />

      {/* Bloque editorial — Propósito */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/tony/tony-ciclismo-bosque-02.jpg"
                  alt="Tony Alvarado ciclismo de montaña — propósito y transformación"
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
                Propósito
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Cada pedalada<br />
                <span className="text-brand-green">tiene un propósito.</span>
              </h2>
              <p className="text-brand-muted">
                Tony Alvarado no construyó empresas por accidente. Detrás de cada proyecto
                hay una historia de fe, disciplina y una convicción profunda: la bicicleta
                puede cambiar vidas. Lo hizo con la suya, y hoy lo hace posible para
                miles de personas en más de 30 países.
              </p>
              <ul className="space-y-3">
                {[
                  'Más de 22 años transformando vidas a través del ciclismo',
                  'Comunidad activa en Costa Rica y Latinoamérica',
                  'Fe, propósito y disciplina como pilares del liderazgo',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/sobre-mi"
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-7 py-3.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
              >
                Conocer la historia de Tony <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />
      <Books />
      <SectionDivider />
      <Mentors />
      <Speaking />
      <Contact />
      <FAQ />
    </main>
  )
}
