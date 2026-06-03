'use client'

import { useState } from 'react'

const inquiryTypes = [
  'Solicitar conferencia / evento',
  'Unirme o conocer Pure Cycling',
  'Información sobre Bike & Bed Hotels',
  'Consulta sobre PuroMTB',
  'Libros / entrevistas / prensa',
  'Alianza profesional',
  'Otro',
]

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text outline-none transition-colors placeholder:text-brand-muted/40 focus:border-brand-accent'

type Props = {
  preselectedType?: string
  heading?: string
  subheading?: string
}

export default function ContactFormEmbed({
  preselectedType = 'Unirme o conocer Pure Cycling',
  heading = '¿Listo para empezar?',
  subheading = 'Completa el formulario y nuestro equipo te enviará los detalles del programa y los próximos pasos.',
}: Props) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault()
    // Pendiente: integración con Resend
    setSubmitted(true)
  }

  return (
    <section className="bg-brand-surface py-20">
      <div className="mx-auto max-w-xl px-6 md:px-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-text">{heading}</h2>
          <p className="mx-auto mt-3 text-brand-muted">{subheading}</p>
        </div>

        {submitted ? (
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-brand-accent/30 bg-brand-card p-10 text-center">
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/15">
                <span className="text-xl font-bold text-brand-accent">✓</span>
              </div>
              <p className="font-semibold text-brand-text">Mensaje enviado</p>
              <p className="mt-2 text-sm text-brand-muted">El equipo de Tony te responderá pronto.</p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-2xl border border-brand-border bg-brand-card p-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                  Nombre completo
                </label>
                <input type="text" required placeholder="Tu nombre" className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                  Correo electrónico
                </label>
                <input type="email" required placeholder="tu@email.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                WhatsApp{' '}
                <span className="font-normal text-brand-muted/60">(opcional)</span>
              </label>
              <input type="tel" placeholder="+506 0000-0000" className={inputClass} />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-brand-muted">
                ¿En qué te podemos ayudar?
              </label>
              <select required defaultValue={preselectedType} className={inputClass}>
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
                placeholder="Cuéntanos brevemente qué necesitas: tipo de evento, fecha tentativa, país, audiencia, interés en Pure Cycling, Bike & Bed Hotels o el motivo de tu contacto."
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
      </div>
    </section>
  )
}
