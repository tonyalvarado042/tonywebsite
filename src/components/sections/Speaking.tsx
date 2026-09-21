'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { pushGTMEvent } from '@/lib/gtm'

/**
 * Los cuatro temas del teaser del home, en el orden de prioridad del sitio:
 * copropiedad turística → mentoría → ciclismo. Tony lo aprobó el 21 de
 * septiembre de 2026.
 *
 * Antes abría con «Transformación personal a través del ciclismo» y el turismo
 * iba de último. Esto tiene que quedar en línea con `/conferencias`: son la
 * misma oferta contada dos veces, y si una dice una cosa y la otra otra, el
 * sitio se contradice solo.
 *
 * ⚠️ Página pública: nada de rendimiento, retorno, ROI, utilidad, ganancia ni
 * inversión garantizada (SUGEVAL).
 */
const topics = [
  {
    title: 'El nuevo negocio del turismo',
    tags: ['Turismo', 'Copropiedad'],
    description:
      'Cómo participar en un activo turístico sin construirlo ni operarlo, contado por alguien que desarrolla y opera hoteles en La Fortuna.',
  },
  {
    title: 'Que el negocio funcione sin vos',
    tags: ['Mentoría', 'Equipos'],
    description:
      'Ordenar la empresa, armar el equipo y soltar la operación para que deje de depender del dueño.',
  },
  {
    title: 'Construir negocios con propósito y fe',
    tags: ['Liderazgo', 'Emprendimiento'],
    description:
      'Lecciones de más de 22 años construyendo empresas desde la fe, la disciplina y el propósito.',
  },
  {
    title: 'Del ciclismo a un ecosistema de empresas',
    tags: ['Ciclismo', 'Transformación'],
    description:
      'Cómo una pasión se convirtió en tiendas, comunidad y hoteles — y el accidente que lo puso todo en perspectiva.',
  },
]

const topicsEn = [
  {
    title: 'The new tourism business',
    tags: ['Tourism', 'Co-ownership'],
    description:
      'How to take part in a tourism asset without building or running it, told by someone who develops and operates hotels in La Fortuna.',
  },
  {
    title: 'A business that runs without you',
    tags: ['Mentoring', 'Teams'],
    description:
      'Putting the company in order, building the team and letting go of the day-to-day so it stops depending on its owner.',
  },
  {
    title: 'Building businesses with purpose and faith',
    tags: ['Leadership', 'Entrepreneurship'],
    description:
      'Lessons from 22+ years building companies from faith, discipline and purpose.',
  },
  {
    title: 'From cycling to a business ecosystem',
    tags: ['Cycling', 'Transformation'],
    description:
      'How one passion turned into stores, a community and hotels — and the accident that put it all in perspective.',
  },
]

export default function Speaking({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Speaking',
    h2text: "Tony doesn't speak from a pretty idea. He speaks from a story",
    h2span: 'that almost stopped him',
    h2suffix: 'and 22+ years of building.',
    paragraph: 'Tourism project developer, business mentor and speaker with over 22 years of experience in Costa Rica.',
    ctaLabel: 'Request a speaking engagement',
    ctaHref: '/en/contact?interest=conferencias#form',
  } : {
    sectionLabel: 'Conferencias',
    h2text: 'Tony no habla desde una idea bonita. Habla desde una historia',
    h2span: 'que casi lo detuvo',
    h2suffix: 'y más de 22 años construyendo.',
    paragraph: 'Desarrollador de proyectos turísticos, mentor empresarial y conferencista con más de 22 años de trayectoria en Costa Rica.',
    ctaLabel: 'Solicitar una conferencia',
    ctaHref: '/contacto?interes=conferencias#formulario',
  }

  const currentTopics = locale === 'en' ? topicsEn : topics

  return (
    <section id="conferencias" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            {t.h2text}{' '}
            <span className="text-brand-accent">{t.h2span}</span>
            {' '}{t.h2suffix}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            {t.paragraph}
          </p>
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {currentTopics.map(({ title, tags, description }, i) => (
            <motion.div
              key={title}
              className={`rounded-xl border p-7 ${i === 0 ? 'border-brand-accent/40 bg-brand-card ring-1 ring-brand-accent/20' : 'border-brand-border bg-brand-card'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
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
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={t.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            onClick={() => pushGTMEvent('click_contact_conference', { cta_text: locale === 'en' ? 'Request a speaking engagement' : 'Solicitar una conferencia', cta_location: 'speaking_section', destination_type: 'internal', interest: 'conferencias', page_path: window.location.pathname })}
          >
            <Mic size={16} /> {t.ctaLabel}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
