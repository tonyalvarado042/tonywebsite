'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2, Globe, Users, Zap } from 'lucide-react'

const features = [
  'Plan de entrenamiento personalizado',
  'Nutrición específica para ciclistas',
  'Movilidad y fuerza funcional',
  'Mentalidad y disciplina',
  'Espiritualidad y propósito',
  'Comunidad activa 24/7',
  'Coaches con experiencia real',
  'Programa de transformación en 90 días',
]

const stats = [
  { Icon: Users, value: '+500', label: 'Miembros activos', note: 'aprox.' },
  { Icon: Globe, value: '+30', label: 'Países', note: 'aprox.' },
  { Icon: Zap, value: '90', label: 'Días de transformación' },
]

export default function PureCycling() {
  return (
    <section id="pure-cycling" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="overflow-hidden rounded-3xl border border-brand-accent/30 bg-brand-card">
          <div className="flex flex-col lg:flex-row">

            {/* Contenido */}
            <motion.div
              className="flex flex-1 flex-col justify-center p-10 lg:p-14"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Pure Cycling — Entrenamiento de ciclismo online
              </p>
              <h2 className="mb-4 text-4xl font-bold leading-tight text-brand-text">
                Transforma tu vida<br />en 90 días.<br />
                <span className="text-brand-accent">Sobre dos ruedas.</span>
              </h2>
              <p className="mb-6 text-brand-muted text-left md:text-justify">
                Pure Cycling es la comunidad donde el ciclismo, la nutrición, la mentalidad, la movilidad,
                la fuerza y la fe convergen en un plan de entrenamiento completo. No es solo entrenar
                en bicicleta. Es cambiar tu vida.
              </p>

              <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={14} className="shrink-0 text-brand-accent" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                {/* Pendiente: URL directa de Skool — por ahora redirige a /pure-cycling */}
                <Link
                  href="/pure-cycling"
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
                >
                  Únete a Pure Cycling →
                </Link>
                <p className="text-xs text-brand-muted/60">
                  Comunidad activa en más de 30 países
                </p>
              </div>
            </motion.div>

            {/* Stats laterales */}
            <motion.div
              className="flex flex-col justify-center gap-8 border-t border-brand-border bg-brand-surface p-10 lg:w-64 lg:border-l lg:border-t-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {stats.map(({ Icon, value, label, note }) => (
                <div key={label} className="text-center">
                  <Icon size={22} className="mx-auto mb-2 text-brand-accent" />
                  <p className="text-4xl font-bold text-brand-text">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">{label}</p>
                  {note && <p className="mt-0.5 text-xs text-brand-muted/50">({note})</p>}
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}
