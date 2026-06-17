import type { Metadata } from 'next'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import { isValidInterest } from '@/lib/contact-interests'

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
      'Speaking, investment, Pure Cycling, media or general inquiries. Tony\'s team responds within 24 to 48 hours.',
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

export default async function EnContactPage({
  searchParams,
}: {
  searchParams: Promise<{ interest?: string }>
}) {
  const { interest = '' } = await searchParams
  const preselectedType = isValidInterest(interest) ? interest : 'contacto-general'

  return (
    <main className="bg-brand-bg">

      {/* ── Hero ── */}
      <section className="px-6 pb-16 pt-24 text-center md:px-12">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
          Contact
        </p>
        <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-tight text-brand-text md:text-5xl">
          Let&apos;s connect.
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-brand-muted">
          Whether you&apos;re interested in a speaking engagement, investing in Bike &amp; Bed Hotels,
          joining Pure Cycling, media collaboration or simply want to reach out — fill in
          the form and Tony&apos;s team will get back to you within 24 to 48 hours.
        </p>
      </section>

      {/* ── Form — id="form" for anchor navigation ── */}
      <div id="form" className="scroll-mt-24">
        <ContactFormEmbed
          locale="en"
          heading="Ready to take the next step?"
          subheading="Whether you're interested in Pure Cycling, Bike & Bed Hotels, a speaking engagement, or simply want to connect, send us a message."
          preselectedType={preselectedType}
        />
      </div>

    </main>
  )
}
