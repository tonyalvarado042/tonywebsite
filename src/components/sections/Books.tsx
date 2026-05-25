'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { BookOpen } from 'lucide-react'

export default function Books() {
  return (
    <section id="libros" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Libros
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            22 años de empresas.{' '}
            <span className="text-brand-accent">Un libro para contarlo.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col items-center gap-14 lg:flex-row">

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Image
              src="/images/libro-secretos.png"
              alt="Secretos para ser un empresario exitoso — Tony Alvarado"
              width={280}
              height={400}
              className="rounded-xl shadow-2xl"
            />
          </motion.div>

          <motion.div
            className="flex-1 space-y-5"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <BookOpen size={15} className="text-brand-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Publicado en Amazon
              </span>
            </div>
            <h3 className="text-3xl font-bold text-brand-text">
              Secretos para ser un<br />
              <span className="text-brand-accent">empresario exitoso</span>
            </h3>
            <p className="text-brand-muted">
              En este libro, Tony Alvarado comparte los principios que utilizó para construir
              un ecosistema de empresas alrededor del ciclismo durante más de dos décadas.
              No es teoría. Son lecciones aprendidas en el campo, con fracasos, victorias
              y fe en el proceso.
            </p>
            <p className="text-brand-muted">
              Para quien está construyendo algo y necesita saber que sí se puede.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent">
                Próximamente en Amazon
              </span>
              <p className="text-xs text-brand-muted/60">
                El enlace de compra estará disponible pronto en esta página.
              </p>
            </div>

            {/* Segundo libro en desarrollo */}
            <div className="mt-2 rounded-xl border border-dashed border-brand-border p-5">
              <p className="text-sm font-semibold text-brand-text">Próximamente</p>
              <p className="mt-1 text-sm text-brand-muted">
                Tony está desarrollando un segundo libro sobre ciclismo, transformación
                personal y su historia de vida. El título está en definición.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
