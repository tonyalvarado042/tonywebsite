'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bike, Users, Hotel } from 'lucide-react'

const companies = [
  {
    Icon: Bike,
    name: 'PuroMTB',
    tagline: 'La tienda y comunidad ciclista de referencia en Costa Rica.',
    description:
      'Fundada en 2004, PuroMTB tiene más de 20 años de historia, tienda física, venta online y una amplia comunidad de ciclistas.',
    href: '/#puromtb',
    cta: 'Conocer PuroMTB',
    featured: false,
  },
  {
    Icon: Users,
    name: 'Pure Cycling',
    tagline: 'La comunidad que transforma tu vida a través del ciclismo.',
    description:
      'Programa de transformación con ciclismo, nutrición, mentalidad, movilidad y fe. Con miembros en más de 30 países.',
    href: '/pure-cycling',
    cta: 'Únete a Pure Cycling',
    featured: true,
  },
  {
    Icon: Hotel,
    name: 'Bike & Bed Hotels',
    tagline: 'El modelo de turismo deportivo del futuro.',
    description:
      'Hotel temático de ciclismo con operación profesional y visión de expansión global. Oportunidades para inversionistas.',
    href: '/bike-bed-hotels',
    cta: 'Ver oportunidad',
    featured: false,
  },
]

export default function BusinessEcosystem() {
  return (
    <section id="ecosistema" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Ecosistema empresarial
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            Un ecosistema construido{' '}
            <span className="text-brand-accent">alrededor de una sola misión.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            PuroMTB, Pure Cycling y Bike & Bed Hotels. Cada una distinta. Todas giran alrededor de una bicicleta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {companies.map(({ Icon, name, tagline, description, href, cta, featured }, i) => (
            <motion.div
              key={name}
              className={`flex flex-col rounded-2xl border p-8 ${
                featured
                  ? 'border-brand-accent bg-brand-card ring-1 ring-brand-accent/20'
                  : 'border-brand-border bg-brand-card'
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {featured && (
                <span className="mb-4 w-fit rounded-full bg-brand-accent/10 px-3 py-1 text-xs font-semibold text-brand-accent">
                  Comunidad principal
                </span>
              )}
              <Icon size={28} className="mb-4 text-brand-accent" />
              <h3 className="mb-1 text-xl font-bold text-brand-text">{name}</h3>
              <p className="mb-3 text-sm font-medium text-brand-accent">{tagline}</p>
              <p className="mb-6 flex-1 text-sm text-brand-muted">{description}</p>
              <Link
                href={href}
                className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                  featured
                    ? 'bg-brand-accent text-white'
                    : 'border border-brand-border text-brand-text hover:bg-brand-surface'
                }`}
              >
                {cta} →
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
