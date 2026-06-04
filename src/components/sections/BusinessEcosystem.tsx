'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bike, Users, Hotel } from 'lucide-react'

const companies = [
  {
    Icon: Bike,
    logoSrc: null as string | null,
    name: 'PuroMTB',
    tagline: 'La tienda y comunidad ciclista de referencia en Costa Rica.',
    description:
      'Fundada en 2004, PuroMTB tiene más de 20 años de historia, tienda física, venta online y una amplia comunidad de ciclistas.',
    href: '/#puromtb',
    cta: 'Conocer PuroMTB',
    featured: false,
    imageSrc: '/images/tony/tony-ciclismo-bosque-01.jpg',
    imageAlt: 'PuroMTB — ciclismo en Costa Rica',
    imagePosition: 'object-[50%_35%]',
  },
  {
    Icon: Users,
    logoSrc: '/images/logos/pure-cycling/pure-cycling-logo.png',
    name: 'Pure Cycling',
    tagline: 'La comunidad que transforma tu vida a través del ciclismo.',
    description:
      'Programa de transformación con ciclismo, nutrición, mentalidad, movilidad y fe. Con miembros en más de 30 países.',
    href: '/pure-cycling',
    cta: 'Únete a Pure Cycling',
    featured: true,
    imageSrc: '/images/tony/tony-ciclismo-pradera-01.jpg',
    imageAlt: 'Pure Cycling — Tony Alvarado ciclismo Costa Rica',
    imagePosition: 'object-[50%_40%]',
  },
  {
    Icon: Hotel,
    logoSrc: '/images/logos/bike-bed/bike-bed-logo.png',
    name: 'Bike & Bed Hotels',
    tagline: 'El modelo de turismo deportivo del futuro.',
    description:
      'Hotel temático de ciclismo con operación profesional y visión de expansión global. Oportunidades para inversionistas.',
    href: '/bike-bed-hotels',
    cta: 'Ver oportunidad',
    featured: false,
    imageSrc: '/images/hotel/bike-bed-exterior-cabana.jpg',
    imageAlt: 'Bike & Bed Hotels — hotel temático ciclismo Costa Rica',
    imagePosition: 'object-[50%_25%]',
  },
]

export default function BusinessEcosystem() {
  return (
    <section id="ecosistema" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Ecosistema empresarial
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            Un ecosistema construido{' '}
            <span className="text-brand-accent">alrededor de una sola misión.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            PuroMTB, Pure Cycling y Bike & Bed Hotels. Cada una distinta. Todas giran alrededor de una bicicleta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {companies.map(({ Icon, logoSrc, name, tagline, description, href, cta, featured, imageSrc, imageAlt, imagePosition }, i) => (
            <motion.div
              key={name}
              className={`group flex flex-col overflow-hidden rounded-2xl border transition-shadow duration-300 ${
                featured
                  ? 'border-brand-accent bg-brand-card shadow-[0_0_40px_rgba(125,38,204,0.12)] hover:shadow-[0_0_60px_rgba(125,38,204,0.22)]'
                  : 'border-brand-border bg-brand-card hover:shadow-[0_0_30px_rgba(0,0,0,0.35)]'
              }`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Zona de imagen con logo overlay */}
              <div className="relative h-52 shrink-0 overflow-hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-[1.05] ${imagePosition}`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay oscuro */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-brand-card" />

                {featured && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-accent/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    Comunidad principal
                  </span>
                )}

                {/* Logo de la empresa — sobre la imagen, esquina inferior izquierda */}
                {logoSrc && (
                  <div className="absolute bottom-3 left-4 z-10">
                    <Image
                      src={logoSrc}
                      alt={`Logo ${name}`}
                      width={110}
                      height={34}
                      className="h-7 w-auto object-contain brightness-0 invert opacity-90"
                    />
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col p-7">
                {!logoSrc && (
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-accent">
                    {name}
                  </p>
                )}
                <Icon size={22} className="mb-3 text-brand-accent" />
                <h3 className="mb-1 text-xl font-bold text-brand-text">{name}</h3>
                <p className="mb-3 text-sm font-medium text-brand-accent">{tagline}</p>
                <p className="mb-6 flex-1 text-sm text-brand-muted">{description}</p>
                <Link
                  href={href}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 ${
                    featured
                      ? 'bg-brand-accent text-white'
                      : 'border border-brand-border text-brand-text hover:bg-brand-surface'
                  }`}
                >
                  {cta} →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
