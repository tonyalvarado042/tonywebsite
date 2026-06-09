'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mic, Bike, Building2, BookOpen, Handshake } from 'lucide-react'

const inquiryTypes = [
  'Solicitar conferencia / evento',
  'Unirme o conocer Pure Cycling',
  'Información sobre Bike & Bed Hotels',
  'Consulta sobre PuroMTB',
  'Libros / entrevistas / prensa',
  'Alianza profesional',
  'Otro',
]

const canRequest = [
  { icon: Mic, label: 'Conferencia / keynote' },
  { icon: Bike, label: 'Entrenamiento con Pure Cycling' },
  { icon: Building2, label: 'Inversión en Bike & Bed Hotels' },
  { icon: BookOpen, label: 'Libros y entrevistas' },
  { icon: Handshake, label: 'Alianzas profesionales' },
]

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-muted/40 focus:border-brand-accent'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return

    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: data.get('nombre'),
          correo: data.get('correo'),
          whatsapp: data.get('whatsapp'),
          empresa: data.get('empresa'),
          tipo: data.get('tipo'),
          mensaje: data.get('mensaje'),
        }),
      })
      const json = await res.json()
      setStatus(json.success ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

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
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-card p-10 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/15">
                    <span className="text-xl font-bold text-brand-accent">✓</span>
                  </div>
                  <p className="font-semibold text-brand-text">Mensaje enviado</p>
                  <p className="mt-2 text-sm text-brand-muted">
                    El equipo de Tony lo revisará y te responderá pronto.
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
                    ¿En qué te podemos ayudar?
                  </label>
                  <select name="tipo" required className={inputClass}>
                    <option value="">Selecciona una opción</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
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
                  className="w-full rounded-full bg-brand-accent py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje →'}
                </button>
                <p className="text-center text-xs text-brand-muted/50">
                  Respondemos en un plazo de 24 a 48 horas hábiles.
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
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                ¿Qué puedes solicitar?
              </p>
              <h3 className="mb-5 text-xl font-bold text-brand-text">
                Este formulario es la vía directa al equipo de Tony.
              </h3>
              <ul className="space-y-3">
                {canRequest.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10">
                      <Icon size={15} className="text-brand-accent" />
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
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-accent" />
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
