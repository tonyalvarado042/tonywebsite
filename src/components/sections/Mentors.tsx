'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

const mentors = [
  {
    image: '/images/tony-con-john.png',
    name: 'John C. Maxwell',
    context:
      'Tony está certificado por John Maxwell Leadership, un programa de liderazgo de amplio reconocimiento internacional.',
    alt: 'Tony Alvarado con John C. Maxwell',
    position: 'object-center',
  },
  {
    image: '/images/tony-con-spencer.png',
    name: 'Spencer Hoffman',
    context:
      'Referente en emprendimiento y mentalidad. Tony ha compartido escenario y formación con Spencer Hoffman en el área de negocios y desarrollo personal.',
    alt: 'Tony Alvarado con Spencer Hoffman',
    position: 'object-[50%_20%]',
  },
]

const mentorsEn = [
  {
    image: '/images/tony-con-john.png',
    name: 'John C. Maxwell',
    context:
      'Tony is certified by John Maxwell Leadership, an internationally recognized leadership program.',
    alt: 'Tony Alvarado with John C. Maxwell',
    position: 'object-center',
  },
  {
    image: '/images/tony-con-spencer.png',
    name: 'Spencer Hoffman',
    context:
      'A reference in entrepreneurship and mindset. Tony has shared the stage and training with Spencer Hoffman in the areas of business and personal development.',
    alt: 'Tony Alvarado with Spencer Hoffman',
    position: 'object-[50%_20%]',
  },
]

export default function Mentors({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Mentors',
    h2text: 'Shaped by those who have built',
    h2span: 'leadership on a world scale.',
    paragraph: 'Tony has learned from global references in leadership, business and cycling. That is a central part of what he shares today.',
  } : {
    sectionLabel: 'Referentes',
    h2text: 'Formado por quienes han construido',
    h2span: 'liderazgo a escala mundial.',
    paragraph: 'Tony ha aprendido de referentes globales del liderazgo, los negocios y el ciclismo. Eso es parte central de lo que hoy transmite.',
  }

  const currentMentors = locale === 'en' ? mentorsEn : mentors

  return (
    <section className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            {t.h2text}{' '}
            <span className="text-brand-gold">{t.h2span}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            {t.paragraph}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {currentMentors.map(({ image, name, context, alt, position }, i) => (
            <motion.div
              key={name}
              className="overflow-hidden rounded-2xl border border-brand-border bg-brand-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  className={`object-cover ${position}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-bold text-brand-text">{name}</h3>
                <p className="text-sm text-brand-muted">{context}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Galería de fotos adicionales — pendiente de imágenes del cliente */}

      </div>
    </section>
  )
}
