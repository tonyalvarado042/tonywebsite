'use client'

import { useState } from 'react'
import { AlertCircle, ArrowRight, Check, Gift, Loader2 } from 'lucide-react'
import { PAISES } from '@/data/paises'
import { PREGUNTAS, PREGUNTA_ABIERTA, SORTEO } from '@/data/clase-encuesta'

/**
 * La encuesta previa a la clase.
 *
 * Calcado de `FormularioClase`: mismos campos, misma palomita, mismo honeypot,
 * mismo criterio de no regañar lo que la persona todavía no llegó a llenar.
 *
 * ── Dos decisiones de forma ────────────────────────────────────────────────
 * **Todo en una sola pantalla, sin pasos.** Un asistente de cinco pasos se ve
 * más bonito y se abandona más: la persona no sabe cuánto falta. Con todo a la
 * vista, «menos de dos minutos» se puede comprobar de un vistazo en vez de
 * tener que creerlo.
 *
 * **La pregunta abierta va de último y con más aire.** Es la que vale, y es la
 * única que cuesta trabajo: ponerla antes de las de opción única haría que
 * mucha gente se fuera sin contestar ninguna.
 */

function leerUtm(): string {
  try {
    const p = new URLSearchParams(window.location.search)
    const partes: string[] = []
    for (const llave of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const valor = p.get(llave)
      if (valor) partes.push(`${llave}=${valor.slice(0, 120)}`)
    }
    return partes.join(' · ')
  } catch {
    return ''
  }
}

export default function FormularioEncuesta() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [prefijo, setPrefijo] = useState('+506')
  const [telefono, setTelefono] = useState('')
  const [respuestas, setRespuestas] = useState<Record<string, string>>({})
  const [pregunta, setPregunta] = useState('')
  const [quiereSorteo, setQuiereSorteo] = useState(true)
  const [website, setWebsite] = useState('') // honeypot

  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [intentado, setIntentado] = useState(false)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

  const okNombre = nombre.trim().length >= 2
  const okCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
  const okTelefono = telefono.replace(/\D/g, '').length >= 7
  const okOpciones = PREGUNTAS.every((p) => Boolean(respuestas[p.id]))
  const okPregunta = pregunta.trim().length >= PREGUNTA_ABIERTA.minimo
  const todoListo = okNombre && okCorreo && okTelefono && okOpciones && okPregunta

  /** Cuántas de las seis cosas ya están. Da sensación de avance sin pasos. */
  const hechas = [okNombre && okCorreo && okTelefono, ...PREGUNTAS.map((p) => Boolean(respuestas[p.id])), okPregunta]
  const cuantas = hechas.filter(Boolean).length

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setIntentado(true)
    if (!todoListo || enviando) return

    setEnviando(true)
    setError(null)
    try {
      const r = await fetch('/api/clase/encuesta', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          prefijo,
          whatsapp: telefono.trim(),
          ...respuestas,
          pregunta: pregunta.trim(),
          quiereSorteo,
          utm: leerUtm(),
          website,
        }),
      })
      const data = await r.json()
      if (!r.ok || !data.ok) {
        setError(data.error || 'No se pudo guardar tu respuesta. Intentá de nuevo.')
        setEnviando(false)
        return
      }
      setListo(true)
    } catch {
      setError('Se cayó la conexión. Revisá tu internet y volvé a intentar.')
      setEnviando(false)
    }
  }

  const marca = (ok: boolean) =>
    ok ? (
      <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-cta" aria-hidden />
    ) : null

  const claseCampo = (ok: boolean) =>
    [
      'min-h-[54px] w-full rounded-xl border-2 bg-brand-campo px-4 py-3 text-[16px] text-brand-text',
      'placeholder:text-brand-muted',
      'outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40',
      intentado && !ok ? 'border-red-400' : 'border-brand-campo-borde',
    ].join(' ')

  /* ── Ya respondió ───────────────────────────────────────────────────── */
  if (listo) {
    return (
      <div className="rounded-2xl border-2 border-brand-cta/40 bg-brand-surface/60 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-cta/15">
          <Check className="h-7 w-7 text-brand-cta" aria-hidden />
        </div>
        <h3 className="mt-5 text-2xl font-extrabold text-brand-text">Listo, ya la leí</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-brand-muted">
          Tu pregunta entra en la lista que voy a revisar antes de la clase.
          {quiereSorteo && ' Y quedaste adentro del sorteo.'}
        </p>
        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-brand-muted">
          Si querés cambiar algo, volvé a llenarla con el mismo correo: se
          reemplaza tu respuesta y no se duplica nada.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={enviar} noValidate className="space-y-9">
      {/* Honeypot: invisible para la gente, irresistible para los robots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="website-encuesta">No llenar este campo</label>
        <input
          id="website-encuesta"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* ── Quién sos ─────────────────────────────────────────────────── */}
      <fieldset className="space-y-4">
        <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          Para saber quién preguntó
        </legend>

        <div className="relative">
          <label htmlFor="enc-nombre" className="mb-1.5 block text-[13px] font-semibold text-brand-text">
            Tu nombre
          </label>
          <input
            id="enc-nombre"
            type="text"
            autoComplete="given-name"
            placeholder="Cómo te llamás"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={claseCampo(okNombre)}
          />
          {marca(okNombre)}
        </div>

        <div className="relative">
          <label htmlFor="enc-correo" className="mb-1.5 block text-[13px] font-semibold text-brand-text">
            Tu correo
          </label>
          <input
            id="enc-correo"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="el mismo con el que te registraste"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={claseCampo(okCorreo)}
          />
          {marca(okCorreo)}
        </div>

        <div>
          <label htmlFor="enc-tel" className="mb-1.5 block text-[13px] font-semibold text-brand-text">
            Tu WhatsApp
          </label>
          <div className="flex gap-2">
            <select
              aria-label="País"
              value={prefijo}
              onChange={(e) => setPrefijo(e.target.value)}
              className="min-h-[54px] shrink-0 rounded-xl border-2 border-brand-campo-borde bg-brand-campo px-3 text-[16px] text-brand-text outline-none focus:border-brand-accent"
            >
              {PAISES.map((p) => (
                <option key={p.codigo + p.corto} value={p.codigo}>
                  {p.corto} {p.codigo}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <input
                id="enc-tel"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder={paisActual.ejemplo}
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className={claseCampo(okTelefono)}
              />
              {marca(okTelefono)}
            </div>
          </div>
        </div>
      </fieldset>

      {/* ── Las cuatro de opción única ────────────────────────────────── */}
      {PREGUNTAS.map((p) => {
        const elegida = respuestas[p.id]
        const malo = intentado && !elegida
        return (
          <fieldset key={p.id}>
            <legend className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              Pregunta {p.numero}
            </legend>
            <p className="mb-3 text-lg font-bold leading-snug text-brand-text">{p.enunciado}</p>
            <div className="space-y-2">
              {p.opciones.map((o) => {
                const activa = elegida === o
                return (
                  <label
                    key={o}
                    className={[
                      'flex cursor-pointer items-start gap-3 rounded-xl border-2 px-4 py-3 transition',
                      activa
                        ? 'border-brand-accent bg-brand-accent/10'
                        : malo
                          ? 'border-red-400/70 bg-brand-campo hover:border-brand-accent/60'
                          : 'border-brand-campo-borde bg-brand-campo hover:border-brand-accent/60',
                    ].join(' ')}
                  >
                    <input
                      type="radio"
                      name={p.id}
                      value={o}
                      checked={activa}
                      onChange={() => setRespuestas((r) => ({ ...r, [p.id]: o }))}
                      className="mt-1 h-4 w-4 shrink-0 accent-brand-accent"
                    />
                    <span className="text-[15px] leading-snug text-brand-text">{o}</span>
                  </label>
                )
              })}
            </div>
          </fieldset>
        )
      })}

      {/* ── La que vale ───────────────────────────────────────────────── */}
      <fieldset className="rounded-2xl border-2 border-brand-accent/35 bg-brand-surface/40 p-5 sm:p-6">
        <legend className="px-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          Pregunta {PREGUNTA_ABIERTA.numero} · la más importante
        </legend>
        <p className="text-lg font-bold leading-snug text-brand-text">{PREGUNTA_ABIERTA.enunciado}</p>
        <p className="mt-2 text-sm leading-relaxed text-brand-muted">{PREGUNTA_ABIERTA.ayuda}</p>
        <textarea
          id="enc-pregunta"
          rows={4}
          placeholder={PREGUNTA_ABIERTA.ejemplo}
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          className={[
            'mt-4 w-full rounded-xl border-2 bg-brand-campo px-4 py-3 text-[16px] leading-relaxed text-brand-text',
            'placeholder:text-brand-muted outline-none transition',
            'focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40',
            intentado && !okPregunta ? 'border-red-400' : 'border-brand-campo-borde',
          ].join(' ')}
        />
        {intentado && !okPregunta && (
          <p className="mt-2 text-sm text-red-300">
            Escribí aunque sea una línea. Es la parte que de verdad cambia la clase.
          </p>
        )}
      </fieldset>

      {/* ── El sorteo ─────────────────────────────────────────────────── */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-brand-cta/35 bg-brand-cta/[0.07] px-5 py-4">
        <input
          type="checkbox"
          checked={quiereSorteo}
          onChange={(e) => setQuiereSorteo(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-brand-cta"
        />
        <span className="text-[15px] leading-snug text-brand-text">
          <Gift className="mr-1.5 inline h-4 w-4 text-brand-cta" aria-hidden />
          Quiero entrar al sorteo de <b>{SORTEO.premioEnFrase}</b> y acepto las bases de acá abajo.
        </span>
      </label>

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={enviando}
          className="flex min-h-[58px] w-full items-center justify-center gap-2 rounded-2xl bg-brand-cta px-7 text-[17px] font-extrabold text-brand-bg transition hover:opacity-90 disabled:opacity-60"
        >
          {enviando ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Guardando…
            </>
          ) : (
            <>
              Enviar mi respuesta <ArrowRight className="h-5 w-5" aria-hidden />
            </>
          )}
        </button>
        <p className="mt-3 text-center text-sm text-brand-muted">
          {cuantas === 6 ? 'Todo listo.' : `${cuantas} de 6 ${cuantas === 1 ? 'lista' : 'listas'}.`}{' '}
          No te vamos a escribir por nada que no sea la clase.
        </p>
      </div>
    </form>
  )
}
