'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Star, Target, TrendingUp } from 'lucide-react'

const BIKE_BED_LOGO = '/images/logos/bike-bed/bike_and_bed_logo.png'

const points = [
  {
    Icon: Star,
    title: 'Modelo con reseñas verificables',
    description:
      'Más de 250 reseñas de 5 estrellas en plataformas de viaje, según información compartida por el cliente.',
  },
  {
    Icon: Target,
    title: 'Turismo deportivo con propósito',
    description:
      'Un segmento en crecimiento: ciclistas y viajeros activos que buscan experiencias deportivas, wellness y comunidad. Un hotel temático para ciclistas en Costa Rica con propósito, comunidad y operación profesional.',
  },
  {
    Icon: TrendingUp,
    title: 'Visión de expansión global',
    description:
      'La visión declarada de Tony es construir más de 1.000 hoteles temáticos de ciclismo antes del año 2050.',
  },
  {
    Icon: Shield,
    title: 'Operación profesional',
    description:
      'Bike & Bed aporta la marca, el equipo, el know-how y la operación. El inversionista no tiene que operar solo.',
  },
]

export default function BikeAndBed() {
  return (
    <section id="bike-bed" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-5 flex justify-center">
            <Image
              src={BIKE_BED_LOGO}
              alt="Bike & Bed Hotels"
              width={180}
              height={54}
              className="h-12 w-auto object-contain opacity-90"
            />
          </div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Para inversionistas
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            El turismo deportivo tiene<br />
            <span className="text-brand-accent">una nueva oportunidad.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            Bike & Bed Hotels es un modelo de hotel temático de ciclismo con operación profesional
            y marca establecida. Un modelo pensado para inversionistas que quieren participar
            en algo con propósito y visión de largo plazo.
          </p>
        </motion.div>

        <motion.div
          className="relative mb-10 h-96 overflow-hidden rounded-2xl lg:h-[440px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src="/images/hotel/bike-bed-exterior-cabana.jpg"
            alt="Bike & Bed Hotels — hotel temático de ciclismo en Costa Rica, arquitectura tropical"
            fill
            className="object-cover object-[50%_40%]"
            sizes="(max-width: 1024px) 100vw, 1152px"
          />
        </motion.div>

        <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {points.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              className="flex gap-4 rounded-xl border border-brand-border bg-brand-card p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Icon size={22} className="mt-0.5 shrink-0 text-brand-accent" />
              <div>
                <h3 className="mb-1 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="rounded-2xl border border-brand-accent/30 bg-brand-card p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="mb-2 text-2xl font-bold text-brand-text">
            ¿Quieres conocer la oportunidad de inversión?
          </h3>
          <p className="mx-auto mb-6 max-w-lg text-sm text-brand-muted">
            Agenda una llamada con el equipo de Bike & Bed Hotels para conocer el modelo,
            las ubicaciones disponibles y las opciones de participación.
          </p>
          <Link
            href="/#contacto"
            className="inline-flex items-center justify-center rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Agenda una llamada de inversión →
          </Link>
          <p className="mt-4 text-xs text-brand-muted/50">
            Toda información financiera se presenta de forma personalizada y confidencial.
            Las oportunidades de participación se evalúan caso a caso.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
