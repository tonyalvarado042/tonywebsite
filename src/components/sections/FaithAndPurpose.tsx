'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const values = [
  {
    label: 'Fe',
    description:
      'Tony atribuye a Dios el crecimiento, la visión y el propósito de lo que ha construido. La fe es parte central de su liderazgo y su vida.',
  },
  {
    label: 'Disciplina',
    description:
      'La misma constancia que exige una etapa de montaña es la que exige construir una empresa. Sin atajos.',
    highlight: true,
  },
  {
    label: 'Comunidad',
    description:
      'Lo que Tony construyó no funcionaría sin las personas que eligieron caminar con él.',
  },
  {
    label: 'Servicio',
    description:
      'No construyó empresas para acumular. Las construyó para que otros pudieran crecer.',
  },
  {
    label: 'Transformación',
    description:
      'No busca seguidores. Busca personas que estén listas para cambiar de verdad.',
  },
  {
    label: 'Legado',
    description:
      'Construir algo que dure más que uno. Eso es lo que impulsa cada decisión de Tony.',
  },
]

const valuesEn = [
  {
    label: 'Faith',
    description:
      'Tony attributes to God the growth, vision and purpose of what he has built. Faith is a central part of his leadership and his life.',
  },
  {
    label: 'Discipline',
    description:
      'The same consistency a mountain stage demands is what building a company demands. No shortcuts.',
    highlight: true,
  },
  {
    label: 'Community',
    description:
      "What Tony built wouldn't work without the people who chose to walk with him.",
  },
  {
    label: 'Service',
    description:
      "He didn't build companies to accumulate. He built them so others could grow.",
  },
  {
    label: 'Transformation',
    description:
      "He doesn't look for followers. He looks for people who are ready to truly change.",
  },
  {
    label: 'Legacy',
    description:
      'Building something that outlasts you. That is what drives every decision Tony makes.',
  },
]

export default function FaithAndPurpose({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Faith and purpose',
    h2text: 'Faith is not the exception.',
    h2span: 'It is the foundation of everything.',
    paragraph: 'Tony Alvarado builds from faith. He believes the purpose of his companies goes beyond business: it is a vehicle to transform communities, generate real impact and leave a lasting legacy. These are the values that guide every decision in his life and everything he builds.',
    ctaLabel: "Read Tony's story →",
    ctaHref: '/en/about',
  } : {
    sectionLabel: 'Fe y propósito',
    h2text: 'La fe no es la excepción.',
    h2span: 'Es la base de todo.',
    paragraph: 'Tony Alvarado construye desde la fe. Cree que el propósito de sus empresas va más allá del negocio: es un vehículo para transformar comunidades, generar impacto real y dejar un legado que trascienda. Estos son los valores que guían cada decisión en su vida y en todo lo que construye.',
    ctaLabel: 'Conoce la historia de Tony →',
    ctaHref: '/sobre-mi',
  }

  const currentValues = locale === 'en' ? valuesEn : values

  return (
    <section className="bg-brand-bg py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-14 text-center"
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
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            {t.paragraph}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {currentValues.map((value, i) => (
            <motion.div
              key={value.label}
              className={`rounded-xl border p-7 ${'highlight' in value && value.highlight ? 'border-brand-accent/40 bg-brand-card ring-1 ring-brand-accent/20' : 'border-brand-border bg-brand-card'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <h3 className="mb-3 text-lg font-bold text-brand-accent">{value.label}</h3>
              <p className="text-sm text-brand-muted">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={t.ctaHref}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent transition-colors hover:underline"
          >
            {t.ctaLabel}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
