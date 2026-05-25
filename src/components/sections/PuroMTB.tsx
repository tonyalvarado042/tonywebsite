'use client'

import { motion } from 'framer-motion'
import { Calendar, Globe, ShoppingCart, Users } from 'lucide-react'

const milestones = [
  { Icon: Globe, year: '2004', label: 'Fundación del sitio web' },
  { Icon: ShoppingCart, year: '2008', label: 'Primera tienda física' },
  { Icon: Users, year: '20+ años', label: 'Construyendo comunidad ciclista' },
  { Icon: Calendar, year: 'Hoy', label: 'Tienda física y online, comunidad MTB activa' },
]

export default function PuroMTB() {
  return (
    <section id="puromtb" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="flex flex-col items-center gap-14 lg:flex-row">

          <motion.div
            className="flex-1 space-y-6"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              PuroMTB
            </p>
            <h2 className="text-4xl font-bold leading-tight text-brand-text">
              Más de 20 años<br />construyendo la cultura<br />
              <span className="text-brand-accent">ciclista de Costa Rica.</span>
            </h2>
            <p className="text-brand-muted">
              PuroMTB es, desde hace más de 20 años, una comunidad ciclista reconocida en Costa Rica.
              Tienda física, venta online de bicicletas MTB y de ruta, y contenido para ciclistas de todos los niveles.
            </p>
            <p className="text-brand-muted">
              Con una comunidad de aproximadamente medio millón de seguidores en redes sociales,
              PuroMTB es prueba de que un proyecto construido con constancia puede
              convertirse en algo que dura décadas.
            </p>
            <p className="text-xs text-brand-muted/50">
              Cifras aproximadas.
            </p>
          </motion.div>

          <motion.div
            className="w-full flex-1"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Placeholder: logo e imagen de tienda PuroMTB */}
            <div className="mb-6 flex h-44 items-center justify-center rounded-2xl border border-dashed border-brand-border bg-brand-card text-center text-sm text-brand-muted">
              <div>
                <p className="font-medium">Logo e imagen de tienda PuroMTB</p>
                <p className="mt-1 text-xs text-brand-muted/50">[INFORMACIÓN PENDIENTE del cliente]</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {milestones.map(({ Icon, year, label }) => (
                <div key={label} className="rounded-xl border border-brand-border bg-brand-card p-5">
                  <Icon size={18} className="mb-2 text-brand-accent" />
                  <p className="text-lg font-bold text-brand-text">{year}</p>
                  <p className="text-xs text-brand-muted">{label}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
