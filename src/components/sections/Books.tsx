'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { BookOpen, Clock } from 'lucide-react'

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
            Dos libros.{' '}
            <span className="text-brand-accent">Una misma misión.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          {/* Libro 1 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-border bg-brand-card p-8 sm:flex-row sm:items-start"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="shrink-0 rounded-xl bg-white p-3 shadow-xl">
              <Image
                src="/images/books/libro-secretos-mockup.jpg"
                alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                width={160}
                height={110}
                className="rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen size={14} className="text-brand-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Publicado en Amazon
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-brand-text">
                Secretos para ser un{' '}
                <span className="text-brand-accent">empresario exitoso</span>
              </h3>
              <p className="text-sm text-brand-muted">
                Los principios que Tony usó para construir un ecosistema de empresas
                alrededor del ciclismo durante más de dos décadas. No es teoría —
                son lecciones aprendidas con fracasos, victorias y fe en el proceso.
              </p>
              <p className="text-xs text-brand-muted/70">
                Para quien está construyendo algo y necesita saber que sí se puede.
              </p>
              <Link
                href="https://www.amazon.com/dp/B0CCZWJG7S"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Comprar en Amazon
              </Link>
            </div>
          </motion.div>

          {/* Libro 2 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-border bg-brand-card p-8 sm:flex-row sm:items-start"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="shrink-0">
              <Image
                src="/images/books/sigue-pedaleando-tony-alvarado.jpg"
                alt="Sigue Pedaleando — Tony Alvarado"
                width={130}
                height={185}
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-brand-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Libro listo · Próximamente en Amazon
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-brand-text">
                Sigue{' '}
                <span className="text-brand-accent">Pedaleando</span>
              </h3>
              <p className="text-sm text-brand-muted">
                La bicicleta lo acompañó desde niño, lo puso a prueba a los 16 años
                y después se convirtió en la herramienta que Dios usó para reconstruirlo.
                Un libro sobre fe, propósito y seguir adelante cuando el camino se complica.
              </p>
              <p className="text-xs text-brand-muted/60">
                Ya está escrito. Pronto estará disponible para compra en Amazon.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
