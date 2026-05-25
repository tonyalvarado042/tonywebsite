'use client'

import { motion } from 'framer-motion'

const metrics = [
  { value: '22+', label: 'Años de trayectoria' },
  { value: '~500K', label: 'Comunidad ciclista', note: 'aprox.' },
  { value: '+30', label: 'Países — Pure Cycling', note: 'aprox.' },
  { value: '+250', label: 'Reseñas 5★ Bike & Bed', note: 'aprox.' },
  { value: '3', label: 'Empresas con propósito' },
]

export default function MetricsStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-surface py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-wrap items-start justify-around gap-8 text-center">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className="text-3xl font-bold text-brand-text md:text-4xl">{m.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">{m.label}</p>
              {m.note && (
                <p className="mt-0.5 text-xs text-brand-muted/50">{m.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
