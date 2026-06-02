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

export default function FaithAndPurpose() {
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
            Fe y propósito
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            La fe no es la excepción.{' '}
            <span className="text-brand-accent">Es la base de todo.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Tony Alvarado construye desde la fe. Cree que el propósito de sus empresas va más
            allá del negocio: es un vehículo para transformar comunidades, generar impacto real
            y dejar un legado que trascienda. Estos son los valores que guían cada decisión en
            su vida y en todo lo que construye.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {values.map((value, i) => (
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
            href="/sobre-mi"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent transition-colors hover:underline"
          >
            Conoce la historia de Tony →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
