'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { pushGTMEvent } from '@/lib/gtm'

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

const topicsEn = [
  {
    title: 'Personal transformation through cycling',
    tags: ['Inspiration', 'Health', 'Purpose'],
    description:
      'How mountain biking and road cycling can become a tool for physical, mental and spiritual change.',
  },
  {
    title: 'Building businesses with purpose and faith',
    tags: ['Leadership', 'Entrepreneurship'],
    description:
      'Lessons from 22+ years building companies from faith, discipline and purpose.',
  },
  {
    title: 'Leadership: from theory to the field',
    tags: ['Leadership', 'Teams'],
    description:
      'Cycling as a metaphor for real leadership: peloton, strategy, endurance and vision of the finish line.',
  },
  {
    title: 'Sports tourism: the opportunity of the 21st century',
    tags: ['Business', 'Tourism'],
    description:
      'The rise of active and wellness tourism as a purpose-driven business model with global reach.',
  },
]

export default function Speaking({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Speaking',
    h2text: "Tony doesn't speak from a pretty idea. He speaks from a story",
    h2span: 'that almost stopped him',
    h2suffix: 'and 22+ years of building.',
    paragraph: 'Entrepreneur, cycling coach and speaker with over 22 years of experience in Costa Rica.',
    ctaLabel: 'Request a speaking engagement',
    ctaHref: '/en/contact?interest=conferencias#form',
  } : {
    sectionLabel: 'Conferencias',
    h2text: 'Tony no habla desde una idea bonita. Habla desde una historia',
    h2span: 'que casi lo detuvo',
    h2suffix: 'y más de 22 años construyendo.',
    paragraph: 'Empresario, coach de ciclismo y conferencista con más de 22 años de trayectoria en Costa Rica.',
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
