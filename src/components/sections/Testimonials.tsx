'use client'

import { motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

export default function Testimonials() {
  return (
    <section className="bg-brand-bg py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Testimonios
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            Lo que dice{' '}
            <span className="text-brand-accent">la comunidad.</span>
          </h2>
        </motion.div>

        {/* Placeholder para video testimonial */}
        <motion.div
          className="flex aspect-video w-full items-center justify-center rounded-2xl border border-dashed border-brand-border bg-brand-card"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <MessageSquare size={36} className="mx-auto mb-3 text-brand-muted/30" />
            <p className="text-sm font-medium text-brand-muted">Video testimonial o entrevista</p>
            <p className="mt-1 text-xs text-brand-muted/50">[INFORMACIÓN PENDIENTE del cliente]</p>
          </div>
        </motion.div>

        {/* Placeholders para testimonios escritos */}
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="flex h-40 items-center justify-center rounded-xl border border-dashed border-brand-border bg-brand-card text-center text-sm text-brand-muted"
            >
              <div>
                <p className="font-medium">Testimonio {n}</p>
                <p className="mt-1 text-xs text-brand-muted/50">[PENDIENTE del cliente]</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
