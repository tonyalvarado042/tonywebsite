'use client'

import { motion } from 'framer-motion'
import { homeMetrics } from '@/data/metrics'

const colorClass = {
  gold:  'text-brand-gold',
  text:  'text-brand-text',
  green: 'text-brand-green',
} as const

export default function MetricsStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-surface py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-wrap items-start justify-around gap-8 text-center">
          {homeMetrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <p className={`text-3xl font-bold md:text-4xl ${colorClass[m.color]}`}>{m.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-brand-muted">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
