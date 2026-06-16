'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function StoryTeaser() {
  return (
    <section className="bg-brand-bg py-16">
      <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            La historia de Tony
          </p>
          <blockquote className="text-2xl font-bold italic leading-snug text-brand-text md:text-3xl">
            "La bicicleta casi me quitó la vida.{' '}
            <span className="text-brand-accent">
              Luego fue la herramienta que Dios usó para reconstruirla."
            </span>
          </blockquote>
          <p className="mx-auto mt-6 max-w-lg text-brand-muted">
            A los 16 años, un accidente en bicicleta cambió todo.
            Lo que vino después es la historia de cómo el dolor se convirtió en propósito
            y el propósito en tres empresas.
          </p>
          <Link
            href="/sobre-mi"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-accent/50 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-all hover:bg-brand-accent hover:text-brand-bg"
          >
            Conoce la historia completa →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
