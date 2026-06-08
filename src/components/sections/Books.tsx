'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart, Bell } from 'lucide-react'

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
          <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">
            Desde el emprendimiento con fe hasta la bicicleta como herramienta de transformación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Libro 1 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-accent/20 bg-brand-card p-8 sm:flex-row sm:items-center
                       shadow-[0_0_30px_rgba(125,38,204,0.07)]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Mockup */}
            <div className="flex shrink-0 items-center justify-center sm:min-w-[160px]">
              <Image
                src="/images/books/secretos-mockup.png"
                alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                width={190}
                height={265}
                className="w-auto max-h-[255px] object-contain drop-shadow-[0_8px_24px_rgba(125,38,204,0.35)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart size={13} className="text-brand-accent" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">
                  Disponible en Amazon
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-brand-text">
                Secretos para ser un{' '}
                <span className="text-brand-accent">empresario exitoso</span>
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                Los principios que Tony usó para construir un ecosistema de empresas
                alrededor del ciclismo durante más de dos décadas. No es teoría —
                son lecciones aprendidas con fracasos, victorias y fe en el proceso.
              </p>
              <Link
                href="https://www.amazon.com/dp/B0CCZWJG7S"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                <ShoppingCart size={14} />
                Comprar en Amazon
              </Link>
            </div>
          </motion.div>

          {/* Libro 2 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-warm/20 bg-brand-card p-8 sm:flex-row sm:items-center
                       shadow-[0_0_30px_rgba(215,186,158,0.05)]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Mockup */}
            <div className="flex shrink-0 items-center justify-center sm:min-w-[160px]">
              <Image
                src="/images/books/sigue-pedaleando-mockup.png"
                alt="Sigue Pedaleando — Tony Alvarado"
                width={190}
                height={265}
                className="w-auto max-h-[255px] object-contain drop-shadow-[0_8px_24px_rgba(215,186,158,0.25)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart size={13} className="text-brand-warm" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-warm">
                  Disponible en Amazon
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-brand-text">
                Sigue{' '}
                <span className="text-brand-warm">Pedaleando</span>
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                La bicicleta lo acompañó desde niño, lo puso a prueba a los 16 años
                y después se convirtió en la herramienta que Dios usó para reconstruirlo.
                Un libro sobre fe, propósito y seguir adelante cuando el camino se complica.
              </p>
              <Link
                href="https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-brand-warm/40 px-6 py-2.5 text-sm font-semibold text-brand-warm transition-colors hover:bg-brand-warm/10"
              >
                <ShoppingCart size={14} />
                Comprar en Amazon →
              </Link>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href="/libros"
            className="text-sm font-semibold text-brand-accent hover:underline"
          >
            Ver todos los libros →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
