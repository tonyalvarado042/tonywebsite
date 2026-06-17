'use client'

import { useState } from 'react'
import Link from 'next/link'
import { pushGTMEvent } from '@/lib/gtm'
import { interestOptions } from '@/lib/contact-interests'

const validValues = interestOptions.map((o) => o.value) as readonly string[]

const dict = {
  es: {
    defaultHeading: '¿Listo para empezar?',
    defaultSubheading:
      'Completa el formulario y nuestro equipo te enviará los detalles del programa y los próximos pasos.',
    labelNombre: 'Nombre completo',
    placeholderNombre: 'Tu nombre',
    labelCorreo: 'Correo electrónico',
    placeholderCorreo: 'tu@email.com',
    labelWhatsapp: 'WhatsApp',
    optionalSuffix: '(opcional)',
    placeholderWhatsapp: '+506 0000-0000',
    labelInteres: 'Interés principal',
    labelMensaje: 'Mensaje',
    placeholderMensaje:
      'Cuéntanos brevemente qué necesitas: tipo de evento, fecha tentativa, país, audiencia, interés en Pure Cycling, Bike & Bed Hotels o el motivo de tu contacto.',
    submitIdle: 'Enviar mensaje →',
    submitSending: 'Enviando...',
    successTitle: 'Solicitud recibida.',
    successBodyBefore: 'Recibimos tu consulta sobre',
    successBodyAfter: '. El equipo de Tony te responderá pronto.',
    errorMsg: 'No se pudo enviar el mensaje. Por favor intenta de nuevo.',
    responseTime: 'Respondemos en un plazo de 24 a 48 horas hábiles.',
    privacyText:
      'Al enviar este formulario aceptas que usemos tus datos para responder tu solicitud.',
    privacyLink: 'Política de privacidad',
    privacyHref: '/politica-de-privacidad',
  },
  en: {
    defaultHeading: 'Ready to get started?',
    defaultSubheading:
      'Complete the form and our team will send you the details and next steps.',
    labelNombre: 'Full name',
    placeholderNombre: 'Your name',
    labelCorreo: 'Email address',
    placeholderCorreo: 'you@email.com',
    labelWhatsapp: 'WhatsApp',
    optionalSuffix: '(optional)',
    placeholderWhatsapp: '+1 000-000-0000',
    labelInteres: 'Topic of interest',
    labelMensaje: 'Message',
    placeholderMensaje:
      'Briefly describe what you need: type of event, tentative date, country, audience, interest in Pure Cycling, Bike & Bed Hotels, or reason for reaching out.',
    submitIdle: 'Send message →',
    submitSending: 'Sending...',
    successTitle: 'Request received.',
    successBodyBefore: 'We received your inquiry about',
    successBodyAfter: ". Tony's team will get back to you soon.",
    errorMsg: 'Message could not be sent. Please try again.',
    responseTime: 'We respond within 24 to 48 business hours.',
    privacyText:
      'By submitting this form you agree that we use your data to respond to your inquiry.',
    privacyLink: 'Privacy Policy · ES',
    privacyHref: '/politica-de-privacidad',
  },
}

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
  locale?: 'es' | 'en'
}

export default function ContactFormEmbed({
  preselectedType = 'pure-cycling',
  heading,
  subheading,
  locale = 'es',
}: Props) {
  const t = dict[locale]
  const safeInitial = validValues.includes(preselectedType) ? preselectedType : 'pure-cycling'
  const [status, setStatus] = useState<Status>('idle')
  const [interes, setInteres] = useState(safeInitial)

  const resolvedHeading = heading ?? t.defaultHeading
  const resolvedSubheading = subheading ?? t.defaultSubheading

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

  const interesLabel =
    interestOptions.find((o) => o.value === interes)?.[locale] ?? interes

  return (
    <section className="bg-brand-surface py-20">
      <div className="mx-auto max-w-xl px-6 md:px-12">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-brand-text">{resolvedHeading}</h2>
          <p className="mx-auto mt-3 text-brand-muted">{resolvedSubheading}</p>
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
              <p className="font-semibold text-brand-text">{t.successTitle}</p>
              <p className="mt-2 text-sm text-brand-muted">
                {t.successBodyBefore}{' '}
                <span className="font-semibold text-brand-green">{interesLabel}</span>
                {t.successBodyAfter}
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
                  {t.labelNombre}
                </label>
                <input
                  id="embedded-nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  minLength={2}
                  maxLength={100}
                  placeholder={t.placeholderNombre}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="embedded-correo" className="mb-1.5 block text-xs font-medium text-brand-muted">
                  {t.labelCorreo}
                </label>
                <input
                  id="embedded-correo"
                  name="correo"
                  type="email"
                  required
                  autoComplete="email"
                  maxLength={254}
                  placeholder={t.placeholderCorreo}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="embedded-whatsapp" className="mb-1.5 block text-xs font-medium text-brand-muted">
                {t.labelWhatsapp}{' '}
                <span className="font-normal text-brand-muted/60">{t.optionalSuffix}</span>
              </label>
              <input
                id="embedded-whatsapp"
                name="whatsapp"
                type="tel"
                autoComplete="tel"
                maxLength={40}
                placeholder={t.placeholderWhatsapp}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="embedded-interes" className="mb-1.5 block text-xs font-medium text-brand-muted">
                {t.labelInteres}
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
                {interestOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o[locale]}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="embedded-mensaje" className="mb-1.5 block text-xs font-medium text-brand-muted">
                {t.labelMensaje}
              </label>
              <textarea
                id="embedded-mensaje"
                name="mensaje"
                required
                rows={4}
                autoComplete="off"
                minLength={5}
                maxLength={3000}
                placeholder={t.placeholderMensaje}
                className={`${inputClass} resize-none`}
              />
            </div>

            {status === 'error' && (
              <p role="alert" aria-live="assertive" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {t.errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              aria-busy={status === 'sending'}
              className="w-full rounded-full bg-brand-green py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' ? t.submitSending : t.submitIdle}
            </button>
            <p className="text-center text-xs text-brand-muted/50">
              {t.responseTime}
            </p>
            <p className="text-center text-xs text-brand-muted/50">
              {t.privacyText}{' '}
              <Link href={t.privacyHref} className="underline transition-colors hover:text-brand-muted">
                {t.privacyLink}
              </Link>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
