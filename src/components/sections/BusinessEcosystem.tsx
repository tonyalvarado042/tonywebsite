'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bike, Building2, Globe, Users } from 'lucide-react'

const pillars = [
  {
    Icon: Users,
    label: 'Comunidad',
    desc: 'Conectamos personas con la misma pasión por el ciclismo.',
  },
  {
    Icon: Bike,
    label: 'Transformación',
    desc: 'Impulsamos vidas a través del deporte, la fe y el propósito.',
  },
  {
    Icon: Globe,
    label: 'Impacto Global',
    desc: 'Creamos oportunidades que trascienden fronteras.',
  },
]

export default function BusinessEcosystem() {
  return (
    <section id="ecosistema" className="relative overflow-hidden bg-brand-surface py-20">

      {/* Glow de fondo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72
                   bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(57,217,138,0.07)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12">

        {/* ── Header ── */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-accent">
            Ecosistema empresarial
          </p>
          <h2 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Un ecosistema construido{' '}
            <span className="text-brand-accent">alrededor de una sola misión.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            PuroMTB, Pure Cycling y Bike &amp; Bed Hotels. Cada una distinta. Todas giran alrededor de una bicicleta.
          </p>
        </motion.div>

        {/* ── Grid de empresas ── */}
        <div className="relative">

          {/* Línea de conexión — desktop only */}
          <div
            aria-hidden
            className="absolute hidden md:block top-[96px] left-4 right-4 h-px
                       bg-gradient-to-r from-transparent via-brand-accent/35 to-transparent"
          />
          {/* Nodo izquierdo (unión col1-col2) */}
          <div
            aria-hidden
            className="absolute hidden md:block top-[92px] left-[33%] h-[10px] w-[10px]
                       -translate-x-1/2 rounded-full bg-brand-accent/55
                       shadow-[0_0_8px_rgba(57,217,138,0.60)]"
          />
          {/* Nodo derecho (unión col2-col3) */}
          <div
            aria-hidden
            className="absolute hidden md:block top-[92px] right-[33%] h-[10px] w-[10px]
                       translate-x-1/2 rounded-full bg-brand-accent/55
                       shadow-[0_0_8px_rgba(57,217,138,0.60)]"
          />

          {/*
            HTML order: Pure Cycling → PuroMTB → Bike & Bed
            Mobile: Pure Cycling primero (HTML order)
            Desktop: PuroMTB (order-1) | Pure Cycling (order-2) | Bike & Bed (order-3)
          */}
          <div className="relative z-10 grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">

            {/* ══════ Pure Cycling — centro protagonista ══════ */}
            <motion.article
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl
                         border border-brand-accent bg-brand-card p-8
                         shadow-[0_0_50px_rgba(57,217,138,0.14),inset_0_0_0_1px_rgba(57,217,138,0.08)]
                         transition-all duration-300
                         hover:scale-[1.02] hover:-translate-y-1
                         hover:shadow-[0_0_80px_rgba(57,217,138,0.25),inset_0_0_0_1px_rgba(57,217,138,0.14)]
                         md:order-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(57,217,138,0.12)_0%,transparent_65%)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-black text-brand-accent/[0.06]"
              >
                02
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                {/* Header: ícono + logo en línea */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                  bg-brand-accent/15 ring-1 ring-brand-accent/30">
                    <Users size={19} className="text-brand-accent" />
                  </div>
                  <Image
                    src="/images/logos/pure-cycling/pure-cycling-logo2.png"
                    alt="Pure Cycling"
                    width={140}
                    height={42}
                    className="h-9 w-auto object-contain opacity-90"
                  />
                </div>

                <h3 className="mb-2 text-xl font-bold text-brand-text">Pure Cycling</h3>
                <p className="mb-3 text-sm font-semibold text-brand-accent">
                  La comunidad que transforma tu vida a través del ciclismo.
                </p>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-brand-muted">
                  Programa de transformación con ciclismo, nutrición, mentalidad, movilidad y fe.
                  Con miembros en más de 30 países.
                </p>

                <Link
                  href="/pure-cycling"
                  className="inline-flex items-center justify-center rounded-full bg-brand-accent
                             px-7 py-3 text-sm font-semibold text-white
                             shadow-[0_6px_20px_rgba(57,217,138,0.35)]
                             transition-opacity hover:opacity-90"
                >
                  Únete a Pure Cycling →
                </Link>
              </div>
            </motion.article>

            {/* ══════ PuroMTB — izquierda ══════ */}
            <motion.article
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl
                         border border-brand-border bg-brand-card p-8
                         transition-all duration-300
                         hover:scale-[1.02] hover:-translate-y-1
                         hover:border-brand-accent/30 hover:shadow-[0_0_40px_rgba(57,217,138,0.10)]
                         md:order-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(57,217,138,0.06)_0%,transparent_65%)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-black text-brand-accent/[0.05]"
              >
                01
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                {/* Header: ícono + logo en línea */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                  bg-brand-accent/10 ring-1 ring-brand-accent/20">
                    <Bike size={19} className="text-brand-accent" />
                  </div>
                  <Image
                    src="/images/logos/puromtb/logo_puro_mtb.png"
                    alt="PuroMTB"
                    width={130}
                    height={40}
                    className="h-9 w-auto object-contain opacity-90"
                  />
                </div>

                <h3 className="mb-2 text-xl font-bold text-brand-text">PuroMTB</h3>
                <p className="mb-3 text-sm font-semibold text-brand-accent">
                  La tienda y comunidad ciclista de referencia en Costa Rica.
                </p>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-brand-muted">
                  Fundada en 2004, PuroMTB tiene más de 20 años de historia, tienda física,
                  venta online y una amplia comunidad de ciclistas.
                </p>

                <Link
                  href="/puromtb"
                  className="inline-flex items-center justify-center rounded-full border border-brand-border
                             px-6 py-2.5 text-sm font-semibold text-brand-text
                             transition-colors hover:bg-brand-surface"
                >
                  Conocer PuroMTB →
                </Link>
              </div>
            </motion.article>

            {/* ══════ Bike & Bed Hotels — derecha ══════ */}
            <motion.article
              className="group relative isolate flex flex-col overflow-hidden rounded-2xl
                         border border-brand-border bg-brand-card p-8
                         transition-all duration-300
                         hover:scale-[1.02] hover:-translate-y-1
                         hover:border-brand-accent/30 hover:shadow-[0_0_40px_rgba(57,217,138,0.10)]
                         md:order-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(57,217,138,0.06)_0%,transparent_65%)]"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute right-4 top-4 select-none text-5xl font-black text-brand-accent/[0.05]"
              >
                03
              </span>

              <div className="relative z-10 flex flex-1 flex-col">
                {/* Header: ícono + logo en línea */}
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                                  bg-brand-accent/10 ring-1 ring-brand-accent/20">
                    <Building2 size={19} className="text-brand-accent" />
                  </div>
                  <Image
                    src="/images/logos/bike-bed/bike_and_bed_logo.png"
                    alt="Bike & Bed Hotels"
                    width={140}
                    height={42}
                    className="h-9 w-auto object-contain opacity-90"
                  />
                </div>

                <h3 className="mb-2 text-xl font-bold text-brand-text">Bike &amp; Bed Hotels</h3>
                <p className="mb-3 text-sm font-semibold text-brand-accent">
                  El modelo de turismo deportivo del futuro.
                </p>
                <p className="mb-8 flex-1 text-sm leading-relaxed text-brand-muted">
                  Hotel temático de ciclismo con operación profesional y visión de expansión global.
                  Oportunidades para inversionistas.
                </p>

                <Link
                  href="/bike-bed-hotels"
                  className="inline-flex items-center justify-center rounded-full border border-brand-border
                             px-6 py-2.5 text-sm font-semibold text-brand-text
                             transition-colors hover:bg-brand-surface"
                >
                  Ver oportunidad →
                </Link>
              </div>
            </motion.article>

          </div>
        </div>

        {/* ── Strip inferior de pilares ── */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-6
                     border-t border-brand-border pt-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {pillars.map(({ Icon, label, desc }) => (
            <div key={label} className="flex max-w-[210px] items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center
                              rounded-lg bg-brand-accent/10 ring-1 ring-brand-accent/15">
                <Icon size={15} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-bold text-brand-text">{label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-brand-muted">{desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
