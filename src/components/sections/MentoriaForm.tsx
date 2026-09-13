'use client'

import { useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

/**
 * Formulario de mentoría. Escribe en `cta_contactos` vía `/api/mentoria`.
 *
 * No reutiliza el de `/contacto` a propósito: ese manda correo con Resend y no
 * toca el CRM. Un lead de mentoría tiene que quedar con bitácora y etiqueta
 * para poder darle seguimiento.
 *
 * Los TEMAS se validan otra vez en el servidor contra la misma lista: lo que
 * llega del navegador no se cree.
 */

export const TEMAS_MENTORIA = [
  'Marketing',
  'Liderazgo',
  'Ventas',
  'Estrategia',
  'Finanzas',
  'Varios temas',
] as const

const inputClass =
  'w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-sm text-brand-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg transition-colors placeholder:text-brand-muted/40 focus:border-brand-accent'

const labelClass = 'mb-1.5 block text-xs font-medium text-brand-muted'

type Estado = 'idle' | 'enviando' | 'listo' | 'error'

export default function MentoriaForm({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const en = locale === 'en'
  const [tema, setTema] = useState('')
  const [estado, setEstado] = useState<Estado>('idle')
  const [error, setError] = useState('')

  const t = en
    ? {
        titulo: 'What do you want to solve?',
        ayuda: 'Tell us what is holding the business back and we will write to set up a call.',
        tema: 'The topic squeezing you most right now',
        nombre: 'Full name',
        empresa: 'Company',
        correo: 'Email',
        telefono: 'WhatsApp',
        opcional: '(optional)',
        mensaje: 'In one line, what do you want to solve?',
        consentimiento: 'I agree to be contacted about this enquiry.',
        enviar: 'Have someone contact me',
        enviando: 'Sending…',
        falta: 'Pick a topic and leave us your name and email.',
        exitoTitulo: 'Done. We have it.',
        exitoTexto: 'Your enquiry is in our system. We will write to the email you gave us to set things up.',
        temas: ['Marketing', 'Leadership', 'Sales', 'Strategy', 'Finance', 'Several topics'],
      }
    : {
        titulo: '¿Qué querés resolver?',
        ayuda: 'Contanos qué está frenando al negocio y te escribimos para coordinar.',
        tema: 'El tema que más te aprieta hoy',
        nombre: 'Nombre completo',
        empresa: 'Empresa',
        correo: 'Correo',
        telefono: 'WhatsApp',
        opcional: '(opcional)',
        mensaje: 'Contanos en una línea qué querés resolver',
        consentimiento: 'Acepto que me contacten sobre esta consulta.',
        enviar: 'Quiero que me contacten',
        enviando: 'Enviando…',
        falta: 'Escogé un tema y dejanos tu nombre y tu correo.',
        exitoTitulo: '¡Listo! Ya lo tenemos.',
        exitoTexto: 'Tu consulta entró a nuestro sistema. Te escribimos al correo que nos diste para coordinar.',
        temas: [...TEMAS_MENTORIA],
      }

  // Lo que se muestra puede estar traducido; lo que se manda, no — el servidor
  // valida contra la lista en español.
  const valorTema = (visible: string) => TEMAS_MENTORIA[t.temas.indexOf(visible)] ?? ''

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (estado === 'enviando') return

    const form = e.currentTarget
    const datos = new FormData(form)
    const nombre = String(datos.get('nombre') ?? '').trim()
    const correo = String(datos.get('correo') ?? '').trim()

    if (!tema || nombre.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      setError(t.falta)
      setEstado('error')
      return
    }

    setEstado('enviando')
    setError('')
    try {
      const res = await fetch('/api/mentoria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          correo,
          empresa: String(datos.get('empresa') ?? '').trim(),
          telefono: String(datos.get('telefono') ?? '').trim(),
          mensaje: String(datos.get('mensaje') ?? '').trim(),
          tema: valorTema(tema),
          idioma: locale,
          website: String(datos.get('website') ?? ''),
        }),
      })
      const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string }
      if (!res.ok || !j.ok) throw new Error(j.error ?? 'fallo')
      setEstado('listo')
      form.reset()
      setTema('')
    } catch (err) {
      setError(err instanceof Error && err.message !== 'fallo' ? err.message : t.falta)
      setEstado('error')
    }
  }

  if (estado === 'listo') {
    return (
      <div className="rounded-xl border border-brand-accent/30 bg-brand-card p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent/10">
          <CheckCircle2 size={22} className="text-brand-accent" />
        </div>
        <h3 className="text-xl font-bold text-brand-text">{t.exitoTitulo}</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-brand-muted">{t.exitoTexto}</p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="rounded-xl border border-brand-border bg-brand-card p-7">
      <h3 className="font-bold text-brand-text">{t.titulo}</h3>
      <p className="mt-1.5 text-sm text-brand-muted">{t.ayuda}</p>

      {/* Honeypot: una persona nunca lo ve ni lo llena. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className={labelClass}>{t.tema} *</legend>
        <div className="flex flex-wrap gap-2">
          {t.temas.map((x) => {
            const on = tema === x
            return (
              <button
                key={x}
                type="button"
                onClick={() => setTema(x)}
                aria-pressed={on}
                className={`rounded-full border px-3.5 py-2 text-sm transition-colors ${
                  on
                    ? 'border-brand-accent bg-brand-accent/15 text-brand-text'
                    : 'border-brand-border text-brand-muted hover:border-brand-accent/50'
                }`}
              >
                {x}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="m-nombre" className={labelClass}>{t.nombre} *</label>
          <input id="m-nombre" name="nombre" type="text" required autoComplete="name"
                 minLength={2} maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="m-empresa" className={labelClass}>{t.empresa}</label>
          <input id="m-empresa" name="empresa" type="text" autoComplete="organization"
                 maxLength={100} className={inputClass} />
        </div>
        <div>
          <label htmlFor="m-correo" className={labelClass}>{t.correo} *</label>
          <input id="m-correo" name="correo" type="email" required autoComplete="email"
                 maxLength={254} className={inputClass} />
        </div>
        <div>
          <label htmlFor="m-telefono" className={labelClass}>
            {t.telefono} <span className="font-normal text-brand-muted/60">{t.opcional}</span>
          </label>
          <input id="m-telefono" name="telefono" type="tel" autoComplete="tel"
                 maxLength={30} className={inputClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="m-mensaje" className={labelClass}>{t.mensaje}</label>
        <textarea id="m-mensaje" name="mensaje" rows={3} maxLength={1500} className={inputClass} />
      </div>

      <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm text-brand-muted">
        <input type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B5CF6]" />
        {t.consentimiento}
      </label>

      {estado === 'error' && error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={estado === 'enviando'}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-accent py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send size={15} />
        {estado === 'enviando' ? t.enviando : t.enviar}
      </button>
    </form>
  )
}
