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

const interesOptionsEn = [
  { value: 'pure-cycling',        label: 'Pure Cycling' },
  { value: 'puromtb',            label: 'PuroMTB' },
  { value: 'bike-bed',           label: 'Bike & Bed Hotels' },
  { value: 'bike-bed-inversion', label: 'Bike & Bed Investment' },
  { value: 'conferencias',       label: 'Speaking / Conferences' },
  { value: 'libros',             label: 'Books' },
  { value: 'contacto-general',   label: 'General inquiry' },
  { value: 'otro',               label: 'Other' },
]

const validValues = interesOptions.map((o) => o.value)

const canRequest = [
  { icon: Mic,       label: 'Conferencia / keynote' },
  { icon: Bike,      label: 'Entrenamiento con Pure Cycling' },
  { icon: Building2, label: 'Inversión en Bike & Bed Hotels' },
  { icon: BookOpen,  label: 'Libros y entrevistas' },
  { icon: Handshake, label: 'Alianzas profesionales' },
]

const canRequestEn = [
  { icon: Mic,       label: 'Conference / keynote' },
  { icon: Bike,      label: 'Training with Pure Cycling' },
  { icon: Building2, label: 'Investment in Bike & Bed Hotels' },
  { icon: BookOpen,  label: 'Books and interviews' },
  { icon: Handshake, label: 'Professional partnerships' },
]

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg transition-colors placeholder:text-brand-muted/40 focus:border-brand-green'

type Status = 'idle' | 'sending' | 'success' | 'error'

type ContactApiResponse = {
  success: boolean
  filtered?: boolean
  error?: string
}

type Props = {
  initialInterest?: string
  locale?: 'es' | 'en'
}

export default function Contact({ initialInterest, locale = 'es' }: Props) {
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
          nombre:   data.get('nombre'),
          correo:   data.get('correo'),
          whatsapp: data.get('whatsapp'),
          empresa:  data.get('empresa'),
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
            form_name: 'contact_form',
            interest: interes,
            page_path: window.location.pathname,
            form_location: 'contact_page',
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

  const t = locale === 'en' ? {
    sectionLabelRight: 'How can we help you?',
    headingRight: "This form is the direct line to Tony's team.",
    responseTitle: 'Response times',
    responseText: 'For speaking or investment inquiries, the team responds within 24 to 48 business hours.',
    locationLabel: 'Location',
    successTitle: 'Request received.',
    successDefaultLabel: 'your inquiry',
    labelName: 'Full name',
    placeholderName: 'Your name',
    labelEmail: 'Email address',
    placeholderEmail: 'you@email.com',
    labelWhatsapp: 'WhatsApp',
    optionalSuffix: '(optional)',
    labelCompany: 'Company or organization',
    placeholderCompany: 'Your company name',
    labelInteres: 'Main interest',
    labelMessage: 'Message',
    placeholderMessage: 'Tell us briefly about your inquiry: type of event, tentative date, country, audience, interest in Pure Cycling, Bike & Bed Hotels or the reason for your contact.',
    errorText: 'The message could not be sent. Please try again or write to us directly.',
    submitSending: 'Sending...',
    submitIdle: 'Send message →',
    responseNote: 'We respond within 24 to 48 business hours.',
    privacyPre: 'By submitting this form you agree to the use of your data to respond to your inquiry.',
    privacyLabel: 'Privacy Policy · ES',
    privacyHref: '/politica-de-privacidad',
    privacyHrefLang: 'es' as string | undefined,
  } : {
    sectionLabelRight: '¿En qué te podemos ayudar?',
    headingRight: 'Este formulario es la vía directa al equipo de Tony.',
    responseTitle: 'Tiempos de respuesta',
    responseText: 'Para consultas de conferencias o inversión, el equipo responde en un plazo de 24 a 48 horas hábiles.',
    locationLabel: 'Ubicación',
    successTitle: 'Solicitud recibida.',
    successDefaultLabel: 'tu solicitud',
    labelName: 'Nombre completo',
    placeholderName: 'Tu nombre',
    labelEmail: 'Correo electrónico',
    placeholderEmail: 'tu@email.com',
    labelWhatsapp: 'WhatsApp',
    optionalSuffix: '(opcional)',
    labelCompany: 'Empresa u organización',
    placeholderCompany: 'Nombre de tu empresa',
    labelInteres: 'Interés principal',
    labelMessage: 'Mensaje',
    placeholderMessage: 'Cuéntanos brevemente qué necesitas: tipo de evento, fecha tentativa, país, audiencia, interés en Pure Cycling, Bike & Bed Hotels o el motivo de tu contacto.',
    errorText: 'No se pudo enviar el mensaje. Por favor intenta de nuevo o escríbenos directamente.',
    submitSending: 'Enviando...',
    submitIdle: 'Enviar mensaje →',
    responseNote: 'Respondemos en un plazo de 24 a 48 horas hábiles.',
    privacyPre: 'Al enviar este formulario aceptas que usemos tus datos para responder tu solicitud.',
    privacyLabel: 'Política de privacidad',
    privacyHref: '/politica-de-privacidad',
    privacyHrefLang: undefined as string | undefined,
  }

  const currentOptions = locale === 'en' ? interesOptionsEn : interesOptions
  const currentCanRequest = locale === 'en' ? canRequestEn : canRequest
  const interesLabel = currentOptions.find((o) => o.value === interes)?.label ?? t.successDefaultLabel

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
              <div
                role="status"
                aria-live="polite"
                className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border border-brand-green/20 bg-brand-card p-10 text-center"
              >
                <div>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/15">
                    <span className="text-xl font-bold text-brand-green">✓</span>
                  </div>
                  <p className="font-semibold text-brand-text">{t.successTitle}</p>
                  {locale === 'en' ? (
                    <p className="mt-2 text-sm text-brand-muted">
                      We received your inquiry about{' '}
                      <span className="font-semibold text-brand-green">{interesLabel}</span>.{' '}
                      The team will review it and respond as soon as possible.
                    </p>
                  ) : (
                    <p className="mt-2 text-sm text-brand-muted">
                      Recibimos tu consulta sobre{' '}
                      <span className="font-semibold text-brand-green">{interesLabel}</span>.{' '}
                      El equipo la revisará y te responderá lo antes posible.
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <form
                id="formulario"
                onSubmit={handleSubmit}
                className="relative space-y-4 rounded-2xl border border-brand-border bg-brand-card p-8"
              >
                {/* Honeypot anti-spam */}
                <div
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                >
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-nombre" className="mb-1.5 block text-xs font-medium text-brand-muted">
                      {t.labelName}
                    </label>
                    <input
                      id="contact-nombre"
                      name="nombre"
                      type="text"
                      required
                      autoComplete="name"
                      minLength={2}
                      maxLength={100}
                      placeholder={t.placeholderName}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-correo" className="mb-1.5 block text-xs font-medium text-brand-muted">
                      {t.labelEmail}
                    </label>
                    <input
                      id="contact-correo"
                      name="correo"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={254}
                      placeholder={t.placeholderEmail}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-whatsapp" className="mb-1.5 block text-xs font-medium text-brand-muted">
                    {t.labelWhatsapp}{' '}
                    <span className="font-normal text-brand-muted/60">{t.optionalSuffix}</span>
                  </label>
                  <input
                    id="contact-whatsapp"
                    name="whatsapp"
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    placeholder="+506 0000-0000"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-empresa" className="mb-1.5 block text-xs font-medium text-brand-muted">
                    {t.labelCompany}{' '}
                    <span className="font-normal text-brand-muted/60">{t.optionalSuffix}</span>
                  </label>
                  <input
                    id="contact-empresa"
                    name="empresa"
                    type="text"
                    autoComplete="organization"
                    maxLength={120}
                    placeholder={t.placeholderCompany}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="contact-interes" className="mb-1.5 block text-xs font-medium text-brand-muted">
                    {t.labelInteres}
                  </label>
                  <select
                    id="contact-interes"
                    name="interes"
                    value={interes}
                    onChange={(e) => setInteres(e.target.value)}
                    required
                    autoComplete="off"
                    className={inputClass}
                  >
                    {currentOptions.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-mensaje" className="mb-1.5 block text-xs font-medium text-brand-muted">
                    {t.labelMessage}
                  </label>
                  <textarea
                    id="contact-mensaje"
                    name="mensaje"
                    required
                    rows={4}
                    autoComplete="off"
                    minLength={5}
                    maxLength={3000}
                    placeholder={t.placeholderMessage}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === 'error' && (
                  <p role="alert" aria-live="assertive" className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {t.errorText}
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
                  {t.responseNote}
                </p>
                <p className="text-center text-xs text-brand-muted/50">
                  {t.privacyPre}{' '}
                  <Link
                    href={t.privacyHref}
                    {...(t.privacyHrefLang ? { hrefLang: t.privacyHrefLang } : {})}
                    className="underline transition-colors hover:text-brand-muted"
                  >
                    {t.privacyLabel}
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
                {t.sectionLabelRight}
              </p>
              <h3 className="mb-5 text-xl font-bold text-brand-text">
                {t.headingRight}
              </h3>
              <ul className="space-y-3">
                {currentCanRequest.map(({ icon: Icon, label }) => (
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
              <p className="mb-1 text-sm font-semibold text-brand-text">{t.responseTitle}</p>
              <p className="text-sm text-brand-muted">
                {t.responseText}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-green" />
              <div>
                <p className="text-sm font-semibold text-brand-text">{t.locationLabel}</p>
                <p className="mt-0.5 text-sm text-brand-muted">San José, Costa Rica</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
