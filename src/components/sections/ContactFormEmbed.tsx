'use client'

import { useState } from 'react'
import Link from 'next/link'
import { interesOptions } from '@/components/sections/Contact'
import { pushGTMEvent } from '@/lib/gtm'

const validValues = interesOptions.map((o) => o.value)

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg transition-colors placeholder:text-brand-muted/40 focus:border-brand-green'

type Status = 'idle' | 'sending' | 'success' | 'error'

type ContactApiResponse = {
  success: boolean
  filtered?: boolean
  error?: string
}

type Props = {
  preselectedType?: string
  heading?: string
  subheading?: string
}

export default function ContactFormEmbed({
  preselectedType = 'pure-cycling',
  heading = '¿Listo para empezar?',
  subheading = 'Completa el formulario y nuestro equipo te enviará los detalles del programa y los próximos pasos.',
}: Props) {
  const safeInitial = validValues.includes(preselectedType) ? preselectedType : 'pure-cycling'
  const [status, setStatus] = useState<Status>('idle')
  const [interes, setInteres] = useState(safeInitial)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    const form = e.currentTarget
    const data = new FormData(form)
    const origen = typeof window !== 'undefined' ? window.location.href : '/'

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre:   data.get('nombre'),
          correo:   data.get('correo'),
          whatsapp: data.get('whatsapp'),
          interes,
          origen,
          mensaje:  data.get('mensaje'),
          website:  data.get('website'),
        }),
      })
      const json = await res.json() as ContactApiResponse
      if (json.success) {
        if (!json.filtered) {
          pushGTMEvent('form_submit_success', {
            form_name: 'embedded_contact_form',
            interest: interes,
            page_path: window.location.pathname,
            form_location: 'embedded_section',
          })
        }
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
    <section className="bg-brand-surface py-20">
      <div className="mx-auto max-w-xl px-6 md:px-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-text">{heading}</h2>
          <p className="mx-auto mt-3 text-brand-muted">{subheading}</p>
        </div>

        {status === 'success' ? (
          <div
            role="status"
            aria-live="polite"
            className="flex min-h-[300px] items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-card p-10 text-center"
          >
            <div>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15">
                <span className="text-xl font-bold text-brand-green">✓</span>
              </div>
              <p className="font-semibold text-brand-text">Solicitud recibida.</p>
              <p className="mt-2 text-sm text-brand-muted">
                Recibimos tu consulta sobre{' '}
                <span className="font-semibold text-brand-green">{interesLabel}</span>.{' '}
                El equipo de Tony te responderá pronto.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative space-y-4 rounded-2xl border border-brand-border bg-brand-card p-8"
          >
            {/* Honeypot anti-spam */}
            <div
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
            >
              <label htmlFor="embedded-website">Website</label>
              <input
                id="embedded-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="embedded-nombre" className="mb-1.5 block text-xs font-medium text-brand-muted">
                  Nombre completo
                </label>
                <input
                  id="embedded-nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="embedded-correo" className="mb-1.5 block text-xs font-medium text-brand-muted">
                  Correo electrónico
                </label>
                <input
                  id="embedded-correo"
                  name="correo"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="embedded-whatsapp" className="mb-1.5 block text-xs font-medium text-brand-muted">
                WhatsApp{' '}
                <span className="font-normal text-brand-muted/60">(opcional)</span>
              </label>
              <input
                id="embedded-whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder="+506 0000-0000"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="embedded-interes" className="mb-1.5 block text-xs font-medium text-brand-muted">
                Interés principal
              </label>
              <select
                id="embedded-interes"
                name="interes"
                value={interes}
                onChange={(e) => setInteres(e.target.value)}
                required
                autoComplete="off"
                className={inputClass}
              >
                {interesOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="embedded-mensaje" className="mb-1.5 block text-xs font-medium text-brand-muted">Mensaje</label>
              <textarea
                id="embedded-mensaje"
                name="mensaje"
                required
                rows={4}
                autoComplete="off"
                minLength={5}
                maxLength={3000}
                placeholder="Cuéntanos brevemente qué necesitas: tipo de evento, fecha tentativa, país, audiencia, interés en Pure Cycling, Bike & Bed Hotels o el motivo de tu contacto."
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p role="alert" aria-live="assertive" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                No se pudo enviar el mensaje. Por favor intenta de nuevo.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
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
      </div>
    </section>
  )
}
