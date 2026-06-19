'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const highlights = [
  'Ingeniero de computación y empresario',
  'Coach y entrenador certificado de ciclismo',
  'Certificado por John Maxwell Leadership',
  'Fundador de PuroMTB, Pure Cycling y Bike & Bed Hotels',
  'Más de 22 años de trayectoria empresarial',
  'Autor publicado en Amazon',
]

const highlightsEn = [
  'Computer engineer and entrepreneur',
  'Certified cycling coach and trainer',
  'Certified by John Maxwell Leadership',
  'Founder of PuroMTB, Pure Cycling and Bike & Bed Hotels',
  'Over 22 years of entrepreneurial experience',
  'Published author on Amazon',
]

export default function AboutTony({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'About Tony',
    h2line1: 'He started selling apples to buy a bicycle.',
    h2span: 'Today he has three companies that have generated millions of dollars.',
    sub1Label: 'From engineering to entrepreneurship',
    sub2Label: 'A community without borders',
    ctaLabel: 'Read the full story →',
    ctaHref: '/en/about',
    imageAlt: 'Tony Alvarado — cycling coach and trainer in Costa Rica',
  } : {
    sectionLabel: 'Sobre Tony',
    h2line1: 'Empezó vendiendo manzanas para comprarse una bicicleta.',
    h2span: 'Hoy tiene tres empresas que han facturado millones de dólares.',
    sub1Label: 'De la ingeniería al emprendimiento',
    sub2Label: 'Una comunidad sin fronteras',
    ctaLabel: 'Conoce la historia completa →',
    ctaHref: '/sobre-mi',
    imageAlt: 'Tony Alvarado — coach y entrenador de ciclismo en Costa Rica',
  }

  const currentHighlights = locale === 'en' ? highlightsEn : highlights

  return (
    <section id="sobre-mi" className="bg-brand-bg py-20">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 md:flex-row md:px-12">

        <motion.div
          className="w-full flex-1"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/tony/tony-hero.jpg"
              alt={t.imageAlt}
              width={600}
              height={750}
              className="w-full object-cover object-top"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex-1 space-y-6"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold leading-tight text-brand-text">
            {t.h2line1}<br />
            <span className="text-brand-accent">{t.h2span}</span>
          </h2>
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-green">
                {t.sub1Label}
              </p>
              {locale === 'en' ? (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  <strong className="font-semibold text-brand-text">Computer engineer</strong> by training, entrepreneur by calling.{' '}
                  <strong className="font-semibold text-brand-text">Certified cycling coach</strong> and leader trained by{' '}
                  <strong className="font-semibold text-brand-text">John Maxwell Leadership</strong>. Founder of three companies
                  sharing one mission: transforming lives through cycling.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  <strong className="font-semibold text-brand-text">Ingeniero de computación</strong> de formación, empresario de vocación.{' '}
                  <strong className="font-semibold text-brand-text">Coach certificado de ciclismo</strong> y líder formado por{' '}
                  <strong className="font-semibold text-brand-text">John Maxwell Leadership</strong>. Fundador de tres empresas
                  que comparten una misión: transformar vidas a través de la bicicleta.
                </p>
              )}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-green">
                {t.sub2Label}
              </p>
              {locale === 'en' ? (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  Tony Alvarado builds community around mountain biking and road cycling.
                  Pure Cycling, his online program, has members in{' '}
                  <span className="font-semibold text-brand-gold">over 30 countries</span>.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  Tony Alvarado construye comunidad alrededor del mountain bike y el ciclismo de ruta.
                  Pure Cycling, su programa online, tiene miembros en{' '}
                  <span className="font-semibold text-brand-gold">más de 30 países</span>.
                </p>
              )}
            </div>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentHighlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                <CheckCircle2 size={15} className="shrink-0 text-brand-green" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href={t.ctaHref}
            className="inline-flex items-center gap-1 rounded-full border border-brand-green/50 px-6 py-2 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
          >
            {t.ctaLabel}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
