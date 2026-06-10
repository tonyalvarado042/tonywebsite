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
        src="/images/og/Ciclista en paisaje montañoso con luz.png"
        alt=""
        fill
        priority
        quality={80}
        className="object-cover object-[60%_30%]"
        sizes="100vw"
      />
      {/* Overlay izquierda → texto siempre legible */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-bg via-brand-bg/90 to-brand-bg/10" />
      {/* Overlay inferior → funde con el resto del sitio */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-brand-bg" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-20 md:flex-row md:items-center md:py-28 md:px-12">

        {/* Texto izquierda */}
        <motion.div
          className="flex-1 space-y-7"
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

        {/* Tony — sin caja/borde visible, fondo oscuro se funde con el hero */}
        <motion.div
          className="relative w-full flex-none md:w-[400px]"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="relative h-[500px] md:h-[580px]">
            <Image
              src="/images/og/tony-alvarado-og-sin-fondo.png"
              alt="Tony Alvarado — coach y entrenador de ciclismo en Costa Rica, fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels"
              fill
              className="object-contain object-top"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
            {/* Fade inferior suave */}
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand-bg/60 to-transparent" />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
