import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Contacto — Tony Alvarado | Conferencias, Pure Cycling, Bike & Bed',
  description:
    'Escríbenos para solicitar una conferencia, conocer Pure Cycling, consultar sobre Bike & Bed Hotels, libros o alianzas profesionales. San José, Costa Rica.',
  alternates: { canonical: '/contacto' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/contacto#webpage`,
  name: 'Contacto — Tony Alvarado | Conferencias, Pure Cycling, Bike & Bed',
  description:
    'Escríbenos para solicitar una conferencia, conocer Pure Cycling, consultar sobre Bike & Bed Hotels, libros o alianzas profesionales. San José, Costa Rica.',
  url: `${SITE_URL}/contacto`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${SITE_URL}/contacto` },
  ],
}

export default async function ContactoPage({
  searchParams,
}: {
  searchParams: Promise<{ interes?: string }>
}) {
  const params = await searchParams
  const initialInterest = params?.interes

  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Contacto
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Hablemos del{' '}
            <span className="text-brand-green">próximo paso.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Cuéntanos qué necesitas y el equipo de Tony Alvarado revisará tu solicitud
            para darte una respuesta clara y enfocada.
          </p>
          <p className="mt-3 text-xs text-brand-muted/50">
            Pure Cycling · Conferencias · Bike &amp; Bed Hotels · Inversión · PuroMTB · Libros · Colaboraciones
          </p>
        </div>
      </section>

      <Contact initialInterest={initialInterest} />
    </main>
  )
}
