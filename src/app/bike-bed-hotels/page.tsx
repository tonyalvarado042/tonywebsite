import Link from 'next/link'
import { Shield, Star, Target, TrendingUp } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef, bikeBedOrg } from '@/lib/structured-data'

export const metadata = {
  title: 'Bike & Bed Hotels — Hotel para ciclistas en Costa Rica',
  description:
    'Bike & Bed Hotels: hotel para ciclistas en Costa Rica con operación profesional. Turismo ciclismo Costa Rica con visión de expansión global. Oportunidad de inversión en turismo deportivo.',
  alternates: { canonical: '/bike-bed-hotels' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/bike-bed-hotels#webpage`,
  name: 'Bike & Bed Hotels — Hotel para ciclistas en Costa Rica',
  description:
    'Bike & Bed Hotels: hotel para ciclistas en Costa Rica con operación profesional. Turismo ciclismo Costa Rica con visión de expansión global. Oportunidad de inversión en turismo deportivo.',
  url: `${SITE_URL}/bike-bed-hotels`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#bike-bed-hotels` }],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Bike & Bed Hotels', item: `${SITE_URL}/bike-bed-hotels` },
  ],
}

const points = [
  {
    Icon: Star,
    title: 'Reputación construida con huéspedes reales',
    description:
      'Más de 250 reseñas de 5 estrellas en plataformas de viaje, según información compartida por el cliente.',
  },
  {
    Icon: Target,
    title: 'Turismo deportivo con propósito',
    description:
      'Un segmento en crecimiento: ciclistas y viajeros activos que buscan experiencias deportivas, wellness y comunidad.',
  },
  {
    Icon: TrendingUp,
    title: 'Visión de expansión global',
    description:
      'Tony ha compartido una visión ambiciosa: desarrollar una red de hoteles temáticos de ciclismo antes del año 2050.',
  },
  {
    Icon: Shield,
    title: 'Operación profesional',
    description:
      'Bike & Bed aporta la marca, el equipo, el know-how y la operación. El inversionista no tiene que operar solo.',
  },
]

export default function BikeBedPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bikeBedOrg} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Bike & Bed Hotels — Para inversionistas
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Un hotel para ciclistas.<br />
            <span className="text-brand-accent">Un modelo para inversionistas.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Bike & Bed Hotels es el modelo de turismo deportivo para ciclistas en Costa Rica
            con operación profesional y visión de expansión global.
          </p>
        </div>
      </section>

      {/* Los 4 puntos */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              Por qué Bike & Bed Hotels es<br />
              <span className="text-brand-accent">una oportunidad diferente.</span>
            </h2>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {points.map(({ Icon, title, description }) => (
              <div key={title} className="flex gap-4 rounded-xl border border-brand-border bg-brand-card p-6">
                <Icon size={22} className="mt-0.5 shrink-0 text-brand-accent" />
                <div>
                  <h3 className="mb-1 font-bold text-brand-text">{title}</h3>
                  <p className="text-sm text-brand-muted">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-card p-7">
            <h3 className="mb-2 font-bold text-brand-text">La visión de largo plazo</h3>
            <p className="text-sm text-brand-muted">
              Bike & Bed Hotels representa el primer paso de una visión de largo plazo.
              Un modelo en operación, con marca, equipo y comunidad ya existente.
            </p>
          </div>
        </div>
      </section>

      {/* CTA inversión */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text">
            ¿Quieres conocer la oportunidad?
          </h2>
          <p className="mt-4 text-brand-muted">
            Agenda una llamada con el equipo. Toda información financiera se presenta
            de forma personalizada y confidencial.
          </p>
          <div className="mt-8">
            <Link
              href="/#contacto"
              className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Agenda una llamada →
            </Link>
          </div>
          <p className="mt-5 text-xs text-brand-muted/50">
            Las oportunidades de participación se evalúan caso a caso.
            No se garantizan retornos de inversión.
          </p>
        </div>
      </section>

    </main>
  )
}
