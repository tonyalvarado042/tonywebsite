'use client'

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
    h2kicker: 'Entrepreneur and cyclist.',
    h2line1: 'He started selling apples to buy a bicycle.',
    h2span: 'Today he leads a group of companies that have generated millions of dollars.',
    sub1Label: 'From engineering to entrepreneurship',
    sub2Label: 'A community without borders',
    ctaLabel: 'Read the full story →',
    ctaHref: '/en/about',
  } : {
    sectionLabel: 'Sobre Tony',
    // Tony lo pidió el 31-ago-2026: quién es, antes de la historia.
    h2kicker: 'Empresario y ciclista.',
    h2line1: 'Empezó vendiendo manzanas para comprarse una bicicleta.',
    h2span: 'Hoy dirige un grupo de empresas que han facturado millones de dólares.',
    sub1Label: 'De la ingeniería al emprendimiento',
    sub2Label: 'Una comunidad sin fronteras',
    ctaLabel: 'Conoce la historia completa →',
    ctaHref: '/sobre-mi',
  }

  const currentHighlights = locale === 'en' ? highlightsEn : highlights

  /* Acá había una foto de Tony a la izquierda, y el texto en la columna
  de al lado. Tony la quitó el 21-set-2026: era **la misma foto del
  hero**, unos píxeles más arriba en la misma página — el hero usa la
  versión recortada sin fondo (`tony-alvarado-recorte.png`) y esta era
  la original (`tony-hero.jpg`). Misma pose, misma sesión.
  Y de paso esa original es hoy el hero de /sobre-mi, así que la imagen
  salía tres veces entre dos páginas.

  ⚠️ Al sacarla NO basta con borrar el bloque: el texto era una columna
  de un `flex` de `max-w-6xl`, y solo quedaba bien angosto porque la foto
  le comía la mitad. Sin foto se estiraría a 1152 px de ancho, que son
  demasiados caracteres por línea para leer cómodo. Por eso pasa a
  `max-w-3xl` centrado, igual que /conferencias y /mentoria.

  La animación también cambió: entraba deslizando desde la derecha
  (`x: 30`) porque llegaba al lado de la foto. Sin nada a la izquierda
  eso se ve raro, así que ahora sube (`y: 20`). */
  return (
    <section id="sobre-mi" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-12">

        <motion.div
          className="space-y-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold leading-tight text-brand-text">
            {t.h2kicker}<br />
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
                  <strong className="font-semibold text-brand-text">John Maxwell Leadership</strong>. Founder of PuroMTB,
                  Pure Cycling, Bike &amp; Bed, Humaya and LideraX10 — all sharing one mission:
                  adding value and transforming lives.
                </p>
              ) : (
                <p className="text-sm leading-relaxed text-brand-muted md:text-base">
                  <strong className="font-semibold text-brand-text">Ingeniero de computación</strong> de formación, empresario de vocación.{' '}
                  <strong className="font-semibold text-brand-text">Coach certificado de ciclismo</strong> y líder formado por{' '}
                  <strong className="font-semibold text-brand-text">John Maxwell Leadership</strong>. Fundador de PuroMTB,
                  Pure Cycling, Bike &amp; Bed, Humaya y LideraX10 que comparten una misión:
                  agregar valor y transformar vidas.
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
          <ul className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2">
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
