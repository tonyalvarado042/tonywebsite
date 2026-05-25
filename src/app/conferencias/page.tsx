import Link from 'next/link'
import { Mic } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Conferencias — Tony Alvarado | Coach de ciclismo Costa Rica',
  description:
    'Solicita a Tony Alvarado como conferencista para tu evento en Costa Rica o el extranjero. Coach de ciclismo, empresario y líder con temas de transformación personal, ciclismo y emprendimiento.',
  alternates: { canonical: '/conferencias' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/conferencias#webpage`,
  name: 'Conferencias — Tony Alvarado | Coach de ciclismo Costa Rica',
  description:
    'Solicita a Tony Alvarado como conferencista para tu evento en Costa Rica o el extranjero. Coach de ciclismo, empresario y líder con temas de transformación personal, ciclismo y emprendimiento.',
  url: `${SITE_URL}/conferencias`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Conferencias', item: `${SITE_URL}/conferencias` },
  ],
}

const topics = [
  {
    title: 'Transformación personal a través del ciclismo',
    tags: ['Inspiración', 'Salud', 'Propósito'],
    description:
      'Cómo el ciclismo de montaña y de ruta puede convertirse en una herramienta de cambio físico, mental y espiritual.',
  },
  {
    title: 'Construir negocios con propósito y fe',
    tags: ['Liderazgo', 'Emprendimiento'],
    description:
      'Lecciones de 22+ años construyendo empresas desde la fe, la disciplina y el propósito.',
  },
  {
    title: 'Liderazgo: de la teoría a la cancha',
    tags: ['Liderazgo', 'Equipos'],
    description:
      'El ciclismo como metáfora del liderazgo real: pelotón, estrategia, resistencia y visión de meta.',
  },
  {
    title: 'Turismo deportivo: la oportunidad del siglo XXI',
    tags: ['Negocios', 'Turismo'],
    description:
      'El auge del turismo activo y wellness como modelo de negocio con propósito y alcance global.',
  },
]

const eventTypes = [
  'Keynote en conferencias empresariales',
  'Evento corporativo de liderazgo',
  'Seminario empresarial',
  'Comunidades de liderazgo y fe',
]

export default function ConferenciasPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Conferencias
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Tony no habla sobre ciclismo.<br />
            <span className="text-brand-accent">Habla desde él.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Empresario, coach de ciclismo y conferencista disponible para eventos
            presenciales y virtuales en Costa Rica y en el extranjero.
          </p>
        </div>
      </section>

      {/* Los 4 temas */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">

          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              Temas de conferencia
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted">
              Cada conferencia se adapta al formato, el público y el contexto del evento.
            </p>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {topics.map(({ title, tags, description }, i) => (
              <div
                key={title}
                className={`rounded-xl border p-7 ${i === 0 ? 'border-brand-accent/40 bg-brand-card ring-1 ring-brand-accent/20' : 'border-brand-border bg-brand-card'}`}
              >
                <div className="mb-3 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-accent/10 px-3 py-0.5 text-xs font-medium text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-brand-border bg-brand-card p-7">
            <h3 className="mb-3 font-bold text-brand-text">Tipo de eventos</h3>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {eventTypes.map((type) => (
                <li key={type} className="flex items-center gap-2 text-sm text-brand-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                  {type}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text">
            ¿Quieres a Tony en tu evento?
          </h2>
          <p className="mt-4 text-brand-muted">
            Completa el formulario indicando la fecha, el formato y el tema de interés.
            Nuestro equipo revisará la solicitud y dará seguimiento por el canal correspondiente.
          </p>
          <div className="mt-8">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <Mic size={16} /> Solicitar una conferencia
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
