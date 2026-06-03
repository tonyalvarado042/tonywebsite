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

export default function ContactoPage() {
  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Contacto
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Hablemos de tu evento,{' '}
            <span className="text-brand-accent">tu proceso</span>
            {' '}o tu próxima oportunidad.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Usa el formulario para solicitar una conferencia, conocer Pure Cycling, consultar
            sobre Bike & Bed Hotels, preguntar por libros o proponer una alianza.
            Respondemos a cada mensaje.
          </p>
        </div>
      </section>

      <Contact />
    </main>
  )
}
