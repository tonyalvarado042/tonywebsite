import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import FAQ from '@/components/sections/FAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { faqsTodas, faqAnswerToPlainText } from '@/data/faqs'

/**
 * Todas las preguntas frecuentes, en un solo lugar.
 *
 * Tony lo pidió el 31-ago-2026: en la portada quería la copropiedad, que es lo
 * que más le urge, y el resto en una página aparte.
 *
 * ⚠️ Las preguntas de ciclismo, entrenamiento y rutas NO se borraron: se
 * mudaron acá. Están escritas para Google —«mejores rutas de MTB en Costa
 * Rica», «entrenamiento por potencia»— y una página dedicada les rinde más
 * que una sección al fondo de la portada. Borrarlas habría tirado a la basura
 * años de posicionamiento.
 */

const TITULO = 'Preguntas frecuentes'
const DESCRIPCION =
  'Copropiedad turística, Bike & Bed Hotels, Humaya, entrenamiento de ciclismo, ' +
  'rutas de MTB en Costa Rica y conferencias. Las preguntas que más me hacen, respondidas.'

export const metadata = {
  title: `${TITULO} | Tony Alvarado`,
  description: DESCRIPCION,
  alternates: { canonical: '/preguntas-frecuentes' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: `${SITE_URL}/preguntas-frecuentes`,
    siteName: 'Tony Alvarado',
    title: TITULO,
    description: DESCRIPCION,
    images: [{ url: '/images/og/tony-alvarado-og.jpg', width: 1600, height: 900, alt: TITULO }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: TITULO,
    description: DESCRIPCION,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

export default function PreguntasFrecuentesPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/preguntas-frecuentes#faq`,
    inLanguage: 'es-CR',
    isPartOf: websiteRef,
    about: personRef,
    mainEntity: faqsTodas.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerToPlainText(faq.answer),
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: TITULO, item: `${SITE_URL}/preguntas-frecuentes` },
    ],
  }

  return (
    <main className="bg-brand-bg">
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden px-6 pb-10 pt-16 md:px-12 md:pt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[380px]
                     bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.14),transparent_65%)]"
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Preguntas frecuentes
          </p>
          <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-brand-text md:text-5xl">
            Todo lo que me <span className="text-brand-accent">preguntan.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-[16px] leading-relaxed text-brand-muted">
            Copropiedad turística, los proyectos en La Fortuna, entrenamiento de ciclismo,
            rutas en Costa Rica y conferencias. Si tu pregunta no está acá, escribime.
          </p>
        </div>
      </section>

      <FAQ questions={faqsTodas} />

      <section className="px-6 pb-20 md:px-12">
        <div className="mx-auto max-w-3xl rounded-2xl border border-brand-accent/25 bg-brand-accent/[0.06] p-7 text-center">
          <p className="mb-2 text-lg font-bold text-brand-text">
            ¿No encontraste tu pregunta?
          </p>
          <p className="mb-6 text-sm leading-relaxed text-brand-muted">
            Contame en qué etapa estás y te respondo.
          </p>
          <Link
            href="/contacto"
            className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl
                       bg-brand-accent px-7 text-[15px] font-bold text-brand-bg
                       transition-opacity hover:opacity-90"
          >
            Escribime
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  )
}
