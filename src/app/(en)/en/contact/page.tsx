import type { Metadata } from 'next'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: {
    absolute: 'Contact Tony Alvarado',
  },
  description:
    'Get in touch with Tony Alvarado. Speaking engagements, investment in Bike & Bed Hotels, Pure Cycling membership, media inquiries or general contact.',
  alternates: { canonical: 'https://www.tonyalvarado.com/en/contact' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.tonyalvarado.com/en/contact',
    siteName: 'Tony Alvarado',
    title: 'Contact Tony Alvarado',
    description:
      "Speaking, investment, Pure Cycling, media or general inquiries. Tony's team responds within 24 to 48 hours.",
    images: [
      {
        url: '/images/og/ciclista-paisaje-montanoso-luz.png',
        width: 1672,
        height: 941,
        alt: 'Tony Alvarado — contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Tony Alvarado',
    description: 'Speaking, investment, Pure Cycling, media or general inquiries.',
    images: ['/images/og/ciclista-paisaje-montanoso-luz.png'],
  },
  robots: { index: false, follow: true },
}

const webPageSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/en/contact#webpage`,
  name: 'Contact Tony Alvarado',
  description:
    'Get in touch with Tony Alvarado. Speaking engagements, investment in Bike & Bed Hotels, Pure Cycling membership, media inquiries or general contact.',
  url: `${SITE_URL}/en/contact`,
  inLanguage: 'en-US',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchemaEn = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/en` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/en/contact` },
  ],
}

export default async function EnContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const params = await searchParams
  const initialInterest = params?.interest

  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchemaEn} />
      <JsonLd data={breadcrumbSchemaEn} />

      {/* ── Hero ── */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Contact
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Let&apos;s talk about the{' '}
            <span className="text-brand-green">next step.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Tell us what you need and Tony Alvarado&apos;s team will review your request
            and give you a clear, focused response.
          </p>
          <p className="mt-3 text-xs text-brand-muted/50">
            Pure Cycling · Speaking · Bike &amp; Bed Hotels · Investment · PuroMTB · Books · Collaborations
          </p>
        </div>
      </section>

      {/* ── Form — id="form" for anchor navigation ── */}
      <div id="form" className="scroll-mt-24">
        <Contact locale="en" initialInterest={initialInterest} />
      </div>

    </main>
  )
}
