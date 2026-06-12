'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Mic, Bike, Building2, BookOpen, Handshake } from 'lucide-react'
import { pushGTMEvent } from '@/lib/gtm'

export const interesOptions = [
  { value: 'pure-cycling',        label: 'Pure Cycling' },
  { value: 'puromtb',            label: 'PuroMTB' },
  { value: 'bike-bed',           label: 'Bike & Bed Hotels' },
  { value: 'bike-bed-inversion', label: 'Inversión Bike & Bed' },
  { value: 'conferencias',       label: 'Conferencias' },
  { value: 'libros',             label: 'Libros' },
  { value: 'contacto-general',   label: 'Contacto general' },
  { value: 'otro',               label: 'Otro' },
]

const validValues = interesOptions.map((o) => o.value)

const canRequest = [
  { icon: Mic,       label: 'Conferencia / keynote' },
  { icon: Bike,      label: 'Entrenamiento con Pure Cycling' },
  { icon: Building2, label: 'Inversión en Bike & Bed Hotels' },
  { icon: BookOpen,  label: 'Libros y entrevistas' },
  { icon: Handshake, label: 'Alianzas profesionales' },
]

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-muted/40 focus:border-brand-green'

type Status = 'idle' | 'sending' | 'success' | 'error'

type Props = {
  initialInterest?: string
}

export default function Contact({ initialInterest }: Props) {
  const safeInitial = validValues.includes(initialInterest ?? '') ? initialInterest! : 'contacto-general'

  const [status, setStatus] = useState<Status>('idle')
  const [interes, setInteres] = useState(safeInitial)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)
    const origen = typeof window !== 'undefined' ? window.location.href : '/contacto'

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:  data.get('nombre'),
          correo:  data.get('correo'),
          whatsapp: data.get('whatsapp'),
          empresa: data.get('empresa'),
          interes,
          origen,
          mensaje: data.get('mensaje'),
        }),
      })
      const json = await res.json()
      if (json.success) {
        pushGTMEvent('form_submit_success', {
          form_name: 'contact_form',
          interest: interes,
          page_path: window.location.pathname,
          form_location: 'contact_page',
        })
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const interesLabel = interesOptions.find((o) => o.value === interes)?.label ?? 'tu solicitud'

  return (
    <section id="contacto" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {status === 'success' ? (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-card p-10 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15">
                    <span className="text-xl font-bold text-brand-green">✓</span>
                  </div>
                  <p className="font-semibold text-brand-text">Solicitud recibida.</p>
                  <p className="mt-2 text-sm text-brand-muted">
                    Recibimos tu consulta sobre{' '}
                    <span className="font-semibold text-brand-green">{interesLabel}</span>.{' '}
                    El equipo la revisará y te responderá lo antes posible.
                  </p>
                </div>
              </div>
            ) : (
              <form
                id="formulario"
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-brand-border bg-brand-card p-8"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                      Nombre completo
                    </label>
                    <input
                      name="nombre"
                      type="text"
                      required
                      placeholder="Tu nombre"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                      Correo electrónico
                    </label>
                    <input
                      name="correo"
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    WhatsApp{' '}
                    <span className="font-normal text-brand-muted/60">(opcional)</span>
                  </label>
                  <input name="whatsapp" type="tel" placeholder="+506 0000-0000" className={inputClass} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    Empresa u organización{' '}
                    <span className="font-normal text-brand-muted/60">(opcional)</span>
                  </label>
                  <input
                    name="empresa"
                    type="text"
                    placeholder="Nombre de tu empresa"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    Interés principal
                  </label>
                  <select
                    name="interes"
                    value={interes}
                    onChange={(e) => setInteres(e.target.value)}
                    required
                    className={inputClass}
                  >
                    {interesOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    Mensaje
                  </label>
                  <textarea
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Cuéntanos brevemente qué necesitas: tipo de evento, fecha tentativa, país, audiencia, interés en Pure Cycling, Bike & Bed Hotels o el motivo de tu contacto."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    No se pudo enviar el mensaje. Por favor intenta de nuevo o escríbenos directamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-brand-green py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
                <p className="text-center text-xs text-brand-muted/50">
                  Respondemos en un plazo de 24 a 48 horas hábiles.
                </p>
                <p className="text-center text-xs text-brand-muted/50">
                  Al enviar este formulario aceptas que usemos tus datos para responder tu solicitud.{' '}
                  <Link href="/politica-de-privacidad" className="underline transition-colors hover:text-brand-muted">
                    Política de privacidad
                  </Link>
                  .
                </p>
              </form>
            )}
          </motion.div>

          {/* Columna derecha */}
          <motion.div
            className="flex flex-col justify-center space-y-7"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-green">
                ¿En qué te podemos ayudar?
              </p>
              <h3 className="mb-5 text-xl font-bold text-brand-text">
                Este formulario es la vía directa al equipo de Tony.
              </h3>
              <ul className="space-y-3">
                {canRequest.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green/10">
                      <Icon size={15} className="text-brand-green" />
                    </div>
                    <span className="text-sm text-brand-muted">{label}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-card p-6">
              <p className="mb-1 text-sm font-semibold text-brand-text">Tiempos de respuesta</p>
              <p className="text-sm text-brand-muted">
                Para consultas de conferencias o inversión, el equipo responde
                en un plazo de 24 a 48 horas hábiles.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-green" />
              <div>
                <p className="text-sm font-semibold text-brand-text">Ubicación</p>
                <p className="mt-0.5 text-sm text-brand-muted">San José, Costa Rica</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
