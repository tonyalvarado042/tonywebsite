'use client'

import { useState } from 'react'
import { AlertCircle, Check, Loader2, Lock } from 'lucide-react'
import { PAISES } from '@/data/paises'
import { correoSirve } from '@/lib/correo-valido'
import { APLICACION, CEDULA, PREGUNTAS, PREGUNTA_ABIERTA, DESCARGO } from '@/data/aplicacion'

/**
 * El formulario de aplicación, en una sola pantalla.
 *
 * Sin pasos ni barra de progreso: son diez campos y partirlos en tres pantallas
 * solo agrega tres oportunidades de abandonar. Lo que sí hay es orden — los
 * datos primero, que son fáciles, y las preguntas de capital después, cuando
 * la persona ya invirtió un minuto.
 */
export default function FormularioAplicacion() {
  const [f, setF] = useState<Record<string, string>>({
    nombre: '', apellidos: '', cedula: '', correo: '', whatsapp: '', pais: 'Costa Rica',
    que_necesita: '', website: '',
  })
  const [prefijo, setPrefijo] = useState('+506')
  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)
  const [error, setError] = useState('')

  const pon = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((v) => ({ ...v, [k]: e.target.value }))

  const contestadas = PREGUNTAS.filter((p) => f[p.id]).length
  const completo =
    f.nombre.trim().length >= 2 &&
    f.cedula.trim().length >= 5 &&
    correoSirve(f.correo.trim().toLowerCase()) &&
    contestadas === PREGUNTAS.length &&
    f.que_necesita.trim().length >= PREGUNTA_ABIERTA.minimo

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    if (!completo || enviando) return
    setEnviando(true)
    setError('')
    try {
      const r = await fetch('/api/aplicacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, prefijo, utm: typeof window !== 'undefined' ? window.location.search.slice(1) : '' }),
      })
      const j = await r.json()
      if (!r.ok || !j.ok) throw new Error(j.error || 'No se pudo enviar.')
      setListo(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo enviar.')
    } finally {
      setEnviando(false)
    }
  }

  if (listo) {
    return (
      <div className="rounded-2xl border-2 border-brand-cta/40 bg-brand-cta/[0.07] p-8 text-center">
        <Check className="mx-auto h-10 w-10 text-brand-cta" aria-hidden />
        <h2 className="mt-4 text-2xl font-extrabold text-brand-text">Aplicación recibida</h2>
        <p className="mt-3 leading-relaxed text-brand-muted">{APLICACION.cierre}</p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} className="space-y-8">
      {/* Honeypot: invisible para la gente, irresistible para un robot. */}
      <input
        type="text" name="website" tabIndex={-1} autoComplete="off" value={f.website}
        onChange={pon('website')} aria-hidden className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <section className="space-y-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">Tus datos</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Campo etiqueta="Nombre">
            <input value={f.nombre} onChange={pon('nombre')} required maxLength={100}
                   autoComplete="given-name" className={ENTRADA} />
          </Campo>
          <Campo etiqueta="Apellidos">
            <input value={f.apellidos} onChange={pon('apellidos')} maxLength={100}
                   autoComplete="family-name" className={ENTRADA} />
          </Campo>
        </div>

        <Campo etiqueta={CEDULA.etiqueta}>
          <input value={f.cedula} onChange={pon('cedula')} required maxLength={40}
                 className={ENTRADA} />
          <span className="mt-1 block text-xs text-brand-muted/80">{CEDULA.ayuda}</span>
        </Campo>

        <Campo etiqueta="Correo">
          <input type="email" value={f.correo} onChange={pon('correo')} required maxLength={254}
                 autoComplete="email" className={ENTRADA} />
        </Campo>

        <Campo etiqueta="WhatsApp">
          <div className="flex gap-2">
            <select value={prefijo} onChange={(e) => setPrefijo(e.target.value)}
                    aria-label="País del teléfono"
                    className={`w-[7.5rem] shrink-0 cursor-pointer ${BASE}`}>
              {PAISES.map((p) => (
                <option key={p.codigo} value={p.codigo}>{p.corto} {p.codigo}</option>
              ))}
            </select>
            {/* `min-w-0` es lo que deja al input encogerse dentro del flex en
                vez de desbordar y empujar al selector. */}
            <input value={f.whatsapp} onChange={pon('whatsapp')} inputMode="tel"
                   autoComplete="tel" placeholder={paisActual.ejemplo}
                   className={`min-w-0 flex-1 ${BASE}`} />
          </div>
        </Campo>

        <Campo etiqueta="País donde vivís">
          <input value={f.pais} onChange={pon('pais')} maxLength={60} className={ENTRADA} />
        </Campo>
      </section>

      {PREGUNTAS.map((p) => (
        <section key={p.id} className="space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
            Pregunta {p.numero} de {PREGUNTAS.length + 1}
          </p>
          <p className="text-lg font-semibold leading-snug text-brand-text">{p.enunciado}</p>
          {'ayuda' in p && p.ayuda && (
            <p className="text-sm text-brand-muted">{p.ayuda}</p>
          )}
          <div className="space-y-2">
            {p.opciones.map((o) => (
              <label key={o}
                     className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                       f[p.id] === o
                         ? 'border-brand-cta bg-brand-cta/10 text-brand-text'
                         : 'border-brand-border/70 text-brand-muted hover:border-brand-border'
                     }`}>
                <input type="radio" name={p.id} value={o} checked={f[p.id] === o}
                       onChange={pon(p.id)} className="sr-only" />
                <span aria-hidden
                      className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                        f[p.id] === o ? 'border-brand-cta bg-brand-cta' : 'border-brand-border'
                      }`} />
                {o}
              </label>
            ))}
          </div>
        </section>
      ))}

      <section className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          Pregunta {PREGUNTA_ABIERTA.numero} de {PREGUNTAS.length + 1}
        </p>
        <p className="text-lg font-semibold leading-snug text-brand-text">{PREGUNTA_ABIERTA.enunciado}</p>
        <p className="text-sm text-brand-muted">{PREGUNTA_ABIERTA.ayuda}</p>
        <textarea value={f.que_necesita} onChange={pon('que_necesita')} rows={4}
                  placeholder={PREGUNTA_ABIERTA.ejemplo} maxLength={2000}
                  className={`${ENTRADA} resize-y`} />
      </section>

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <div className="space-y-4">
        <button type="submit" disabled={!completo || enviando}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-cta px-6 py-4 text-base font-bold text-brand-bg transition disabled:cursor-not-allowed disabled:opacity-40">
          {enviando ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Enviando…</> : 'Enviar mi aplicación'}
        </button>

        {!completo && (
          <p className="text-center text-sm text-brand-muted">
            Faltan {PREGUNTAS.length + 1 - contestadas - (f.que_necesita.trim().length >= PREGUNTA_ABIERTA.minimo ? 1 : 0)} de {PREGUNTAS.length + 1} preguntas.
          </p>
        )}

        <p className="flex items-start gap-2 text-xs leading-relaxed text-brand-muted/80">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          {DESCARGO}
        </p>
      </div>
    </form>
  )
}

/**
 * ⚠️ La base NO lleva ancho.
 *
 * La primera versión tenía `w-full` acá dentro, y el `<select>` del prefijo lo
 * heredaba: le puse `w-28` al lado y no sirvió de nada, porque entre dos
 * clases de ancho gana la que Tailwind emite después, no la que se escribe
 * última. El resultado fue un selector que se comía toda la fila y un campo de
 * teléfono reducido a una rendija.
 *
 * Por eso el ancho se declara en cada uso y nunca en la base.
 */
const BASE =
  'rounded-xl border border-brand-border/70 bg-brand-bg/60 px-4 py-3 text-brand-text ' +
  'placeholder:text-brand-muted/60 focus:border-brand-cta focus:outline-none ' +
  'transition-colors'

const ENTRADA = `w-full ${BASE}`

function Campo({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-brand-muted">{etiqueta}</span>
      {children}
    </label>
  )
}
