'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-bg">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-16 md:flex-row md:py-24 md:px-12">

        {/* Contenido */}
        <motion.div
          className="flex-1 space-y-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Coach y entrenador de ciclismo · Empresario · Costa Rica
          </p>

          <h1 className="text-5xl font-bold leading-tight text-brand-text md:text-6xl lg:text-7xl">
            Tu vida puede<br />
            transformarse<br />
            <span className="text-brand-accent">sobre dos ruedas.</span>
          </h1>

          <p className="max-w-lg text-lg text-brand-muted">
            Más de 22 años construyendo tiendas, comunidades y programas alrededor de una bicicleta. Todo desde Costa Rica.
            Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href="/pure-cycling"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Únete a Pure Cycling <ArrowRight size={16} />
            </Link>
            <Link
              href="#historia"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-border px-8 py-3.5 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-card"
            >
              <Play size={16} className="text-brand-accent" />
              Conoce la historia de Tony
            </Link>
          </div>
        </motion.div>

        {/* Fotografía principal */}
        <motion.div
          className="relative w-full max-w-md flex-1"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="relative h-[540px] overflow-hidden rounded-2xl">
            <Image
              src="/images/tony/tony-hero.jpg"
              alt="Tony Alvarado — coach y entrenador de ciclismo en Costa Rica, fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
