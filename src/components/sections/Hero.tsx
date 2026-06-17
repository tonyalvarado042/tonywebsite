'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-brand-bg md:min-h-[700px]">
      {/* Fondo — paisaje montañoso con ciclista */}
      <Image
        src="/images/og/ciclista-paisaje-montanoso-luz.png"
        alt=""
        fill
        priority
        quality={80}
        className="object-cover object-[65%_center]"
        sizes="100vw"
      />
      {/* Overlay izquierda → texto legible, paisaje visible en el lado derecho */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg from-[20%] via-brand-bg/75 via-[55%] to-transparent" />
      {/* Overlay inferior → funde con el resto del sitio */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <motion.div
          className="max-w-2xl space-y-7"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
            Coach y entrenador de ciclismo · Empresario · Costa Rica
          </p>

          <h1 className="text-5xl font-bold leading-tight text-brand-text md:text-6xl lg:text-7xl">
            Tu vida puede<br />
            transformarse<br />
            <span className="text-brand-green">sobre dos ruedas.</span>
          </h1>

          <p className="max-w-lg text-lg text-brand-muted">
            Más de 22 años construyendo tiendas, comunidades y programas alrededor de una bicicleta. Todo desde Costa Rica.
            Fundador de Pure Cycling, PuroMTB y Bike &amp; Bed Hotels.
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href="/pure-cycling"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.35)] transition-opacity hover:opacity-90"
            >
              Únete a Pure Cycling <ArrowRight size={16} />
            </Link>
            <Link
              href="#historia"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-brand-text backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <Play size={16} className="text-brand-green" />
              Conoce la historia de Tony
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
