import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Contacto — Tony Alvarado',
  description:
    'Contáctanos para Pure Cycling, Bike & Bed Hotels, conferencias o medios. San José, Costa Rica.',
  alternates: { canonical: '/contacto' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/contacto#webpage`,
  name: 'Contacto — Tony Alvarado',
  description:
    'Contáctanos para Pure Cycling, Bike & Bed Hotels, conferencias o medios. San José, Costa Rica.',
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
    <main className="bg-brand-bg pt-6">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <Contact />
    </main>
  )
}
