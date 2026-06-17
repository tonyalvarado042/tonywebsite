import Link from 'next/link'
import TrackedLink from '@/components/common/TrackedLink'
import { Mic, CheckCircle2, Users, Target, Heart, TrendingUp, Compass } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Conferencias — Tony Alvarado | Ciclismo, liderazgo y transformación',
  description:
    'Solicita a Tony Alvarado como conferencista para tu evento. Temas de liderazgo con propósito, disciplina, ciclismo, emprendimiento y transformación personal desde Costa Rica.',
  alternates: { canonical: '/conferencias' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.tonyalvarado.com/conferencias',
    siteName: 'Tony Alvarado',
    title: 'Conferencias — Tony Alvarado | Ciclismo, liderazgo y propósito',
    description:
      'Historia real, fe y 22 años de experiencia empresarial. Tony Alvarado disponible para keynotes, eventos corporativos y conferencias presenciales o virtuales.',
    images: [{ url: '/images/og/tony-alvarado-og-source.jpeg', width: 1600, height: 900, alt: 'Tony Alvarado — conferencista de ciclismo, liderazgo y transformación' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Conferencias — Tony Alvarado | Ciclismo, liderazgo y propósito',
    description:
      'Historia real, fe y 22 años de experiencia empresarial. Tony Alvarado disponible para keynotes, eventos corporativos y conferencias presenciales o virtuales.',
    images: ['/images/og/tony-alvarado-og-source.jpeg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/conferencias#webpage`,
  name: 'Conferencias — Tony Alvarado | Ciclismo, liderazgo y transformación',
  description:
    'Solicita a Tony Alvarado como conferencista para tu evento. Temas de liderazgo con propósito, disciplina, ciclismo, emprendimiento y transformación personal desde Costa Rica.',
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

const pageFaqs: PageFAQItem[] = [
  {
    question: '¿Qué temas aborda Tony Alvarado en sus conferencias?',
    answer:
      'Las conferencias de Tony cubren liderazgo con propósito, disciplina y transformación personal, emprendimiento alrededor del ciclismo, comunidad y fe en la adversidad, y cómo construir una vida o negocio desde una misión. Todos los temas nacen de su experiencia real y se adaptan al contexto del evento.',
  },
  {
    question: '¿Tony Alvarado puede participar en eventos fuera de Costa Rica?',
    answer:
      'La disponibilidad se evalúa según la fecha, la ubicación, el formato y las características del evento. Puedes enviar los detalles mediante el formulario de contacto para que el equipo revise la solicitud.',
  },
  {
    question: '¿Cómo solicitar a Tony Alvarado como conferencista?',
    answer:
      'Completa el formulario de contacto en este sitio seleccionando "Conferencia / Keynote" como tipo de consulta. Incluye la fecha tentativa, el formato del evento y el tema de interés. El equipo revisará la solicitud y dará seguimiento.',
  },
  {
    question: '¿Para qué tipo de eventos está disponible Tony?',
    answer:
      'Tony puede participar en keynotes de conferencias empresariales, eventos corporativos de liderazgo, seminarios y formación de equipos, comunidades de liderazgo y fe, y eventos presenciales o virtuales. Cada presentación se adapta al formato y los objetivos del organizador.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pageFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

const topics = [
  {
    icon: Target,
    title: 'Liderazgo con propósito',
    tags: ['Liderazgo', 'Propósito'],
    description:
      'Liderar desde la misión y no desde el ego. Cómo construir equipos, tomar decisiones difíciles y mantener el rumbo cuando el camino se complica.',
    featured: true,
  },
  {
    icon: TrendingUp,
    title: 'Disciplina y transformación personal',
    tags: ['Disciplina', 'Transformación'],
    description:
      'El ciclismo como escuela de vida: cómo los hábitos, la constancia y la mentalidad del deportista se trasladan a cada área de la existencia.',
    featured: false,
  },
  {
    icon: Compass,
    title: 'Emprendimiento alrededor del ciclismo',
    tags: ['Emprendimiento', 'Ciclismo'],
    description:
      'Cómo Tony construyó un ecosistema de empresas alrededor de una pasión. Lecciones de 22 años fundando negocios desde la fe, el propósito y la disciplina.',
    featured: false,
  },
  {
    icon: Heart,
    title: 'Comunidad, fe y perseverancia',
    tags: ['Fe', 'Comunidad'],
    description:
      'Por qué la fe y la comunidad son los activos más poderosos en momentos de adversidad. Una perspectiva honesta desde la vida real de Tony Alvarado.',
    featured: false,
  },
  {
    icon: Users,
    title: 'Construir una vida o negocio sobre una misión',
    tags: ['Misión', 'Visión'],
    description:
      'El diferenciador que separa a quienes construyen algo duradero de quienes solo sobreviven el corto plazo. Propósito como estrategia.',
    featured: false,
  },
]

const contributions = [
  'Una historia real de adversidad, recuperación y fe contada sin filtros',
  'Más de 22 años de experiencia empresarial aplicada en la práctica',
  'Autoridad en ciclismo certificada por la Federación Costarricense de Ciclismo',
  'Certificación en liderazgo por John Maxwell Leadership',
  'Un mensaje que conecta deporte, negocio, fe y propósito en un solo relato',
  'Formatos adaptables: keynote, panel, taller, evento corporativo o comunidad',
]

const eventTypes = [
  'Keynote en conferencias empresariales',
  'Evento corporativo de liderazgo',
  'Seminario empresarial y formación de equipos',
  'Comunidades de liderazgo y fe',
  'Eventos presenciales y virtuales',
]

export default function ConferenciasPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-24">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            <Mic size={12} /> Conferencias
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Tony no habla sobre ciclismo.{' '}
            <span className="text-brand-accent">Habla desde él.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-brand-muted">
            Empresario, coach certificado y conferencista con más de 22 años de
            experiencia construyendo desde la fe y la disciplina. Disponible para
            eventos presenciales y virtuales en Costa Rica y en el extranjero.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <TrackedLink
              href="/contacto?interes=conferencias#formulario"
              event="click_contact_conference"
              params={{ cta_text: 'Solicitar conferencia', cta_location: 'conferencias_hero', destination_type: 'internal', interest: 'conferencias' }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Mic size={15} /> Solicitar conferencia →
            </TrackedLink>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Conoce la historia de Tony →
            </Link>
          </div>
        </div>
      </section>

      {/* Temas de conferencia */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">

          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Temas
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Temas de conferencia
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted">
              Cada conferencia se adapta al formato, el público y el contexto del evento.
              Todos los temas nacen de la experiencia real de Tony.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(({ icon: Icon, title, tags, description, featured }) => (
              <div
                key={title}
                className={`rounded-xl border p-7 transition-shadow hover:shadow-md ${
                  featured
                    ? 'border-brand-accent/40 bg-brand-card ring-1 ring-brand-accent/20 md:col-span-2 lg:col-span-1'
                    : 'border-brand-border bg-brand-card'
                }`}
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-brand-accent/10 px-2.5 py-0.5 text-xs font-medium text-brand-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Qué puede aportar Tony */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Por qué Tony
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                Qué puede aportar<br />
                <span className="text-brand-accent">Tony a tu evento</span>
              </h2>
              <p className="mt-4 text-brand-muted">
                No es teoría ni motivación genérica. Tony lleva al escenario
                una historia forjada en el campo, con fracasos reales, fe
                y una visión construida durante más de dos décadas.
              </p>
            </div>

            <ul className="space-y-3">
              {contributions.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>

          </div>
        </div>
      </section>

      {/* Tipo de eventos */}
      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="rounded-xl border border-brand-border bg-brand-card p-8">
            <h3 className="mb-5 font-bold text-brand-text">Tipo de eventos</h3>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {eventTypes.map((type) => (
                <li key={type} className="flex items-center gap-2.5 text-sm text-brand-muted">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent" />
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" />

      {/* CTA final */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold text-brand-text">
            ¿Quieres a Tony en tu evento?
          </h2>
          <p className="mt-4 text-brand-muted">
            Completa el formulario indicando la fecha, el formato y el tema de interés.
            El equipo revisará la solicitud y dará seguimiento directamente.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <TrackedLink
              href="/contacto?interes=conferencias#formulario"
              event="click_contact_conference"
              params={{ cta_text: 'Solicitar conferencia', cta_location: 'conferencias_cta_final', destination_type: 'internal', interest: 'conferencias' }}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Mic size={15} /> Solicitar conferencia →
            </TrackedLink>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Conoce la historia de Tony →
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
