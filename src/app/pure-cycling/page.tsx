import Link from 'next/link'
import { CheckCircle2, Globe, Users, Zap } from 'lucide-react'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import JsonLd from '@/components/JsonLd'
import PhotoStrip from '@/components/ui/PhotoStrip'
import { SITE_URL, websiteRef, personRef, pureCyclingOrg } from '@/lib/structured-data'

export const metadata = {
  title: 'Pure Cycling — Entrenador de ciclismo online | Tony Alvarado',
  description:
    'Únete a Pure Cycling: programa de entrenamiento de ciclismo online con plan personalizado de MTB y ciclismo de ruta. Coach y entrenador de ciclismo en Costa Rica con miembros en más de 30 países.',
  alternates: { canonical: '/pure-cycling' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/pure-cycling#webpage`,
  name: 'Pure Cycling — Entrenador de ciclismo online | Tony Alvarado',
  description:
    'Únete a Pure Cycling: programa de entrenamiento de ciclismo online con plan personalizado de MTB y ciclismo de ruta. Coach y entrenador de ciclismo en Costa Rica con miembros en más de 30 países.',
  url: `${SITE_URL}/pure-cycling`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#pure-cycling` }],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Pure Cycling', item: `${SITE_URL}/pure-cycling` },
  ],
}

const features = [
  { title: 'Plan de entrenamiento personalizado', description: 'Diseñado para tu nivel, tiempo y objetivo específico.' },
  { title: 'Nutrición específica para ciclistas', description: 'Guías de alimentación adaptadas al rendimiento en la bicicleta.' },
  { title: 'Movilidad y fuerza funcional', description: 'Trabajo fuera de la bicicleta que mejora tu pedaleo.' },
  { title: 'Mentalidad y disciplina', description: 'Herramientas mentales para mantenerte constante y enfocado.' },
  { title: 'Espiritualidad y propósito', description: 'El elemento que conecta todo en un solo proceso.' },
  { title: 'Comunidad activa 24/7', description: 'Ciclistas comprometidos de más de 30 países.' },
  { title: 'Coaches con experiencia real', description: 'Formados por Tony Alvarado y certificados en ciclismo.' },
  { title: 'Programa de transformación en 90 días', description: 'Un proceso estructurado con inicio, progresión y resultado.' },
]

export default function PureCyclingPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={pureCyclingOrg} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Pure Cycling — Entrenamiento de ciclismo online
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Entrena con estructura.<br />
            <span className="text-brand-accent">Vive el ciclismo con más intención.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Pure Cycling integra plan de entrenamiento personalizado, nutrición, mentalidad,
            movilidad, fuerza y espiritualidad. Miembros en más de 30 países.
          </p>

          <div className="mx-auto mt-12 flex max-w-xl flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="text-center">
              <Users size={22} className="mx-auto mb-2 text-brand-accent" />
              <p className="text-4xl font-bold text-brand-text">+500</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Miembros activos</p>
            </div>
            <div className="hidden h-12 w-px bg-brand-border sm:block" />
            <div className="text-center">
              <Globe size={22} className="mx-auto mb-2 text-brand-accent" />
              <p className="text-4xl font-bold text-brand-text">+30</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Países</p>
            </div>
            <div className="hidden h-12 w-px bg-brand-border sm:block" />
            <div className="text-center">
              <Zap size={22} className="mx-auto mb-2 text-brand-accent" />
              <p className="text-4xl font-bold text-brand-text">90</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">Días de transformación</p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="https://www.skool.com/purecycling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(125,38,204,0.4)] transition-opacity hover:opacity-90"
            >
              Únete a la comunidad →
            </Link>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              Todo lo que necesitas para<br />
              <span className="text-brand-accent">transformarte sobre la bicicleta.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <CheckCircle2 size={18} className="mb-3 text-brand-accent" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-accent/30 bg-brand-card p-7">
            <h3 className="mb-2 font-bold text-brand-text">¿Para quién es Pure Cycling?</h3>
            <p className="text-sm text-brand-muted">
              Para principiantes que quieren empezar bien.
              Para ciclistas que quieren mejorar con estructura.
              Para quienes buscan más que kilometraje.
            </p>
          </div>
        </div>
      </section>

      {/* Franja comunidad Pure Cycling */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/pure-cycling/pure-cycling-team-02.jpeg', alt: 'Equipo Pure Cycling', position: 'object-center' },
              { src: '/images/pure-cycling/pure-cycling-community-road-01.webp', alt: 'Comunidad Pure Cycling en ruta', position: 'object-center' },
              { src: '/images/pure-cycling/pure-cycling-transformacion-01.jpeg', alt: 'Transformación a través del ciclismo', position: 'object-center' },
            ]}
          />
          <p className="mt-5 text-center text-xs font-medium uppercase tracking-widest text-brand-muted">
            Comunidad · Disciplina · Transformación
          </p>
        </div>
      </section>

      {/* Bloque visual 90 días */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="overflow-hidden rounded-2xl border border-brand-accent/20 bg-brand-card">
            <div className="grid md:grid-cols-2">

              {/* Texto y beneficios */}
              <div className="border-b border-brand-border p-8 md:border-b-0 md:border-r md:p-12">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Programa Pure Cycling
                </p>
                <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                  Transforma tu vida{' '}
                  <span className="text-brand-accent">en 90 días.</span>
                </h2>
                <p className="mt-2 text-lg font-medium text-brand-text/70">Sobre dos ruedas.</p>
                <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                  Un sistema integrado de entrenamiento, nutrición, movilidad, fuerza, mentalidad,
                  espiritualidad y comunidad. Todo lo que necesitas para transformarte en 90 días
                  sobre la bicicleta.
                </p>
                <ul className="mt-7 space-y-3">
                  {features.map(({ title }) => (
                    <li key={title} className="flex items-center gap-3 text-sm text-brand-muted">
                      <CheckCircle2 size={16} className="shrink-0 text-brand-accent" />
                      {title}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Números */}
              <div className="flex flex-col items-center justify-center gap-10 p-8 md:p-12">
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-text">+500</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">
                    miembros activos
                  </p>
                </div>
                <div className="h-px w-20 bg-brand-border" />
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-text">+30</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">países</p>
                </div>
                <div className="h-px w-20 bg-brand-border" />
                <div className="text-center">
                  <p className="text-6xl font-bold text-brand-accent">90</p>
                  <p className="mt-2 text-xs uppercase tracking-widest text-brand-muted">
                    días de transformación
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Testimonios
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              Historias reales dentro de Pure Cycling
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-brand-muted">
              Personas que decidieron transformar su vida a través del ciclismo, la disciplina y la comunidad.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { n: '01', poster: '/images/testimonials/pure-cycling/testimonio-pure-cycling-01.PNG' },
              { n: '02', poster: '/images/testimonials/pure-cycling/testimonio-pure-cycling-02.PNG' },
              { n: '03', poster: '/images/testimonials/pure-cycling/testimonio-pure-cycling-03.PNG' },
            ].map(({ n, poster }) => (
              <div key={n} className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card">
                <video
                  controls
                  preload="none"
                  poster={poster}
                  className="w-full aspect-video"
                  src={`/videos/testimonials/pure-cycling/testimonio-pure-cycling-${n}.mp4`}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactFormEmbed
        preselectedType="Unirme o conocer Pure Cycling"
        heading="¿Listo para dar el primer paso?"
        subheading="Completa el formulario y nuestro equipo te enviará los detalles del programa y los próximos pasos."
      />

    </main>
  )
}
