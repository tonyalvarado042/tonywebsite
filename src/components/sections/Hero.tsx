'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'

export default function Hero({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    tagline: 'Tourism developer · Hospitality · Costa Rica',
    h1line1: 'We don’t build',
    h1line2: 'hotels.',
    h1span: 'We build reasons to travel.',
    paragraph: 'I develop and run themed hotels in La Fortuna de San Carlos. Bike & Bed has been operating since 2025; Humaya opens in November 2026. All of it from Costa Rica.',
    cta1: 'See the projects',
    cta1Href: '/en/bike-bed-hotels',
    cta2: 'The new book',
    cta2Href: '/en/books/the-new-tourism-business-2027',
    imgAlt: 'Tony Alvarado, tourism developer from Costa Rica',
  } : {
    tagline: 'Desarrollador de proyectos turísticos · Hotelería · Costa Rica',
    h1line1: 'No construimos',
    h1line2: 'hoteles.',
    h1span: 'Construimos razones para viajar.',
    paragraph: 'Desarrollo y opero hoteles temáticos en La Fortuna de San Carlos. Bike & Bed opera desde 2025; Humaya abre en noviembre de 2026. Todo desde Costa Rica.',
    cta1: 'Conocer los proyectos',
    cta1Href: '/bike-bed-hotels',
    cta2: 'El nuevo libro',
    cta2Href: '/libros/el-nuevo-negocio-del-turismo-2027',
    imgAlt: 'Tony Alvarado, desarrollador de proyectos turísticos costarricense',
  }

  return (
    <section className="relative min-h-[620px] overflow-hidden bg-brand-bg md:min-h-[720px]">

      {/* ── Luz de fondo ── */}
      {/* Halo morado detrás de Tony. Es la única fuente de luz de la escena:
          el CLAUDE.md del repo pide sobriedad, nada de neón. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0
                   bg-[radial-gradient(ellipse_46%_78%_at_72%_46%,rgba(139,92,246,0.30)_0%,rgba(124,47,214,0.10)_42%,transparent_72%)]"
      />
      {/* Rebote frío desde el borde derecho, para que el recorte no quede plano */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-1/3
                   bg-gradient-to-l from-brand-pop/[0.12] to-transparent"
      />
      {/* Textura de puntos muy tenue */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '34px 34px',
        }}
      />

      <div className="relative z-10 mx-auto grid min-h-[620px] max-w-7xl grid-cols-1 items-end gap-8 px-6 pt-20 md:min-h-[720px] md:px-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:gap-10">

        {/* ── Texto ── */}
        <motion.div
          className="max-w-2xl space-y-7 pb-16 md:pb-24 lg:pb-28"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
            {t.tagline}
          </p>

          <h1 className="text-5xl font-bold leading-tight text-brand-text md:text-6xl lg:text-7xl">
            {t.h1line1}<br />
            {t.h1line2}<br />
            <span className="text-brand-green">{t.h1span}</span>
          </h1>

          <p className="max-w-lg text-lg text-brand-muted">
            {t.paragraph}
          </p>

          <div className="flex flex-col gap-4 pt-2 sm:flex-row">
            <Link
              href={t.cta1Href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-green px-8 py-3.5 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(139,92,246,0.35)] transition-opacity hover:opacity-90"
            >
              {t.cta1} <ArrowRight size={16} />
            </Link>
            <Link
              href={t.cta2Href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-brand-text backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              <BookOpen size={16} className="text-brand-green" />
              {t.cta2}
            </Link>
          </div>
        </motion.div>

        {/* ── Tony ── */}
        {/* Recorte con transparencia, apoyado en el borde inferior.
            Se dimensiona por ALTURA: la foto viene cortada a la altura del muslo,
            así que tiene que asentarse abajo, no escalar por ancho.
            En móvil se oculta — detrás del texto no se leería ninguno de los dos. */}
        <motion.div
          className="relative hidden self-end justify-center lg:flex"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Sombra de piso: lo asienta en vez de dejarlo flotando */}
          <div
            aria-hidden
            className="absolute inset-x-10 bottom-0 h-14 rounded-[50%] bg-black/70 blur-2xl"
          />
          <Image
            src="/images/tony/tony-alvarado-recorte.png"
            alt={t.imgAlt}
            width={1000}
            height={1188}
            priority
            quality={90}
            sizes="(min-width: 1280px) 620px, (min-width: 1024px) 520px, 0px"
            className="relative h-[500px] w-auto max-w-none object-contain object-bottom
                       drop-shadow-[0_24px_50px_rgba(0,0,0,0.65)]
                       xl:h-[580px]"
          />
        </motion.div>
      </div>

      {/* Funde con la sección siguiente */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-bg to-transparent"
      />
    </section>
  )
}
