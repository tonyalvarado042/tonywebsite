'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

const inquiryTypes = [
  'Conferencia / Keynote',
  'Evento corporativo',
  'Inversión en Bike & Bed Hotels',
  'Pure Cycling',
  'Medios / Prensa',
  'Colaboración',
  'Otro',
]

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-muted/40 focus:border-brand-accent'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // Pendiente: integración con Resend en Fase 3
    setSubmitted(true)
  }

  return (
    <section id="contacto" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Contacto
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            <span className="text-brand-accent">¿Empezamos?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand-muted">
            Sea para Pure Cycling, Bike & Bed, una conferencia o medios — escríbenos.
            Respondemos a cada mensaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* Formulario */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {submitted ? (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-card p-10 text-center">
                <div>
                  <p className="text-3xl font-bold text-brand-accent">✓</p>
                  <p className="mt-3 font-semibold text-brand-text">Mensaje enviado</p>
                  <p className="mt-2 text-sm text-brand-muted">Te contactaremos pronto.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-brand-border bg-brand-card p-8"
              >
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-brand-muted">Nombre</label>
                    <input type="text" required placeholder="Tu nombre" className={inputClass} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-brand-muted">Email</label>
                    <input type="email" required placeholder="tu@email.com" className={inputClass} />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    WhatsApp (opcional)
                  </label>
                  <input type="tel" placeholder="+506 0000-0000" className={inputClass} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    Empresa (opcional)
                  </label>
                  <input type="text" placeholder="Nombre de tu empresa" className={inputClass} />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                    Tipo de consulta
                  </label>
                  <select required className={inputClass}>
                    <option value="">Selecciona una opción</option>
                    {inquiryTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-medium text-brand-muted">Mensaje</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-accent py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Enviar mensaje →
                </button>
                <p className="text-center text-xs text-brand-muted/50">
                  Respondemos en un plazo de 24 a 48 horas hábiles.
                </p>
              </form>
            )}
          </motion.div>

          {/* Datos de contacto */}
          <motion.div
            className="flex flex-col justify-center space-y-7"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="flex items-start gap-4">
              <MapPin size={20} className="mt-0.5 shrink-0 text-brand-accent" />
              <div>
                <p className="font-semibold text-brand-text">Ubicación</p>
                <p className="mt-0.5 text-sm text-brand-muted">San José, Costa Rica</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail size={20} className="mt-0.5 shrink-0 text-brand-accent" />
              <div>
                <p className="font-semibold text-brand-text">Email</p>
                <p className="mt-0.5 text-sm text-brand-muted">
                  Usa el formulario — respondemos a cada mensaje.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageCircle size={20} className="mt-0.5 shrink-0 text-brand-accent" />
              <div>
                <p className="font-semibold text-brand-text">WhatsApp</p>
                <p className="mt-0.5 text-sm text-brand-muted">
                  Disponible próximamente para consultas directas.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-brand-border bg-brand-card p-6">
              <p className="mb-1 text-sm font-semibold text-brand-text">Tiempos de respuesta</p>
              <p className="text-sm text-brand-muted">
                Para consultas de inversión o conferencias, el equipo responde en un plazo
                de 24 a 48 horas hábiles.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
