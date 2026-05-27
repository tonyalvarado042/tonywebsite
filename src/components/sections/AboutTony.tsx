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

export default function AboutTony() {
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
              src="/images/tony/tony-about.jpg"
              alt="Tony Alvarado — coach y entrenador de ciclismo en Costa Rica"
              width={600}
              height={750}
              className="w-full object-cover"
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
            Sobre Tony
          </p>
          <h2 className="text-4xl font-bold leading-tight text-brand-text">
            Empezó vendiendo manzanas para comprarse una bicicleta.<br />
            <span className="text-brand-accent">Hoy tiene tres empresas.</span>
          </h2>
          <p className="text-brand-muted">
            Ingeniero de computación de formación, empresario de vocación. Coach certificado de ciclismo
            y líder formado por John Maxwell Leadership. Fundador de tres empresas que comparten
            una misión: transformar vidas a través de la bicicleta.
          </p>
          <p className="text-brand-muted">
            Tony Alvarado construye comunidad alrededor del mountain bike y el ciclismo de ruta.
            Pure Cycling, su programa online, tiene miembros en más de 30 países.
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                <CheckCircle2 size={15} className="shrink-0 text-brand-accent" />
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/sobre-mi"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:underline"
          >
            Conoce la historia completa →
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
