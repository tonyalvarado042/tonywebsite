'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react'
import { PAISES } from '@/data/paises'
import type { Supuestos } from '@/lib/calculadora-airbnb'

/**
 * El único punto de la calculadora donde se piden datos.
 *
 * Tony fue explícito: la calculadora se usa gratis y sin llenar nada. Los
 * datos se piden SOLO si la persona quiere el informe por correo. Por eso
 * este formulario vive aparte y no bloquea nada de lo de arriba.
 *
 * Lo que se pide es lo mismo que en el resto del sitio — nombre, WhatsApp y
 * correo — para que la persona caiga en el CRM igual que los demás recursos.
 */

type Props = {
  supuestos: Supuestos
  escenario: string
  /** Se llama cuando la solicitud quedó registrada, para abrir el informe. */
  alRegistrar: () => void
}

export default function InformeAirbnb({ supuestos, escenario, alRegistrar }: Props) {
  const [prefijo, setPrefijo] = useState('+506')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [acepta, setAcepta] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

  const okNombre = nombre.trim().length >= 2
  const okCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
  const okTelefono = telefono.replace(/\D/g, '').length >= 7
  const todoListo = okNombre && okCorreo && okTelefono && acepta

  async function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (enviando || !todoListo) return
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/recursos/informe-airbnb', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          prefijo,
          whatsapp: telefono,
          escenario,
          supuestos,
        }),
      })
      const json = await res.json()

      if (!res.ok || !json.ok) {
        setError(json.error ?? 'No se pudo registrar la solicitud.')
        setEnviando(false)
        return
      }

      setListo(true)
      alRegistrar()
    } catch {
      setError('No se pudo conectar. Revisá tu internet e intentá de nuevo.')
      setEnviando(false)
    }
  }

  if (listo) {
    return (
      <div className="rounded-3xl border border-brand-cta/40 bg-brand-cta/[0.09] p-7 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-cta text-brand-bg">
          <Check size={22} strokeWidth={3} />
        </span>
        <p className="mb-2 text-lg font-bold text-brand-text">Solicitud registrada</p>
        <p className="mb-6 text-[15px] leading-relaxed text-brand-muted">
          Te mandamos el informe a <span className="text-brand-text">{correo.trim()}</span> con
          tu escenario, sus supuestos y sus advertencias. Abajo ya podés ver la versión
          extendida en pantalla.
        </p>
        <a
          href="#informe-completo"
          className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl
                     bg-brand-green px-6 text-[15px] font-bold text-brand-bg transition-opacity hover:opacity-90"
        >
          Ver el análisis extendido
          <ArrowRight size={17} />
        </a>
      </div>
    )
  }

  const campo =
    'w-full rounded-xl border border-brand-border bg-brand-bg px-4 py-3 text-[15px] text-brand-text ' +
    'placeholder:text-brand-muted/50 outline-none transition-colors focus:border-brand-green/60 ' +
    'focus:ring-2 focus:ring-brand-green/30'

  const Palomita = ({ ok }: { ok: boolean }) =>
    ok ? (
      <Check size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cta" strokeWidth={3} />
    ) : null

  return (
    <form onSubmit={alEnviar} className="rounded-3xl border border-brand-border bg-brand-card p-6 sm:p-7">
      <p className="mb-1 text-[15px] font-bold text-brand-text">Te lo mandamos por correo</p>
      <p className="mb-6 text-sm leading-relaxed text-brand-muted">
        Dejanos tus datos y preparamos el reporte con el escenario que tenés en pantalla.
      </p>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-brand-muted">Nombre</span>
          <div className="relative">
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              autoComplete="name"
              maxLength={100}
              className={campo}
            />
            <Palomita ok={okNombre} />
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-brand-muted">WhatsApp</span>
          <div className="flex gap-2">
            <select
              value={prefijo}
              onChange={(e) => setPrefijo(e.target.value)}
              aria-label="País"
              className="shrink-0 rounded-xl border border-brand-border bg-brand-bg px-3 py-3 text-[15px]
                         text-brand-text outline-none transition-colors focus:border-brand-green/60"
            >
              {PAISES.map((p) => (
                <option key={p.corto} value={p.codigo}>
                  {p.corto} {p.codigo}
                </option>
              ))}
            </select>
            <div className="relative flex-1">
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                inputMode="tel"
                autoComplete="tel-national"
                placeholder={paisActual.ejemplo}
                maxLength={20}
                className={campo}
              />
              <Palomita ok={okTelefono} />
            </div>
          </div>
        </label>

        <label className="block">
          <span className="mb-1.5 block text-[13px] font-semibold text-brand-muted">Correo electrónico</span>
          <div className="relative">
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="tu@correo.com"
              maxLength={254}
              className={campo}
            />
            <Palomita ok={okCorreo} />
          </div>
        </label>

        <label className="flex cursor-pointer items-start gap-3 pt-1">
          <input
            type="checkbox"
            checked={acepta}
            onChange={(e) => setAcepta(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#8B5CF6]"
          />
          <span className="text-[12.5px] leading-relaxed text-brand-muted">
            Autorizo a Tony Alvarado y su equipo a guardar mis datos y contactarme por
            WhatsApp y correo para enviarme este informe y contenido relacionado. Puedo
            retirarme en cualquier momento.
          </span>
        </label>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </p>
      )}

      {/* Late solo cuando ya se puede enviar. Un botón apagado que parpadea
          invita a darle clic sin poder — eso frustra en vez de convertir. */}
      <button
        type="submit"
        disabled={!todoListo || enviando}
        className={`mt-6 inline-flex min-h-[58px] w-full items-center justify-center gap-2
                    rounded-2xl bg-brand-cta px-6 text-[16px] font-extrabold text-brand-bg
                    transition-transform duration-200 hover:scale-[1.02]
                    disabled:cursor-not-allowed disabled:bg-brand-border disabled:text-brand-muted
                    disabled:hover:scale-100
                    ${todoListo && !enviando ? 'animate-latido' : ''}`}
      >
        {enviando ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Preparando tu informe…
          </>
        ) : (
          <>
            <Mail size={18} strokeWidth={2.5} />
            Enviame el informe GRATIS
          </>
        )}
      </button>

      <p className="mt-3 text-center text-[12px] text-brand-muted/70">
        {todoListo
          ? 'Sin costo. Podés salirte de la lista cuando querás.'
          : 'Completá los tres campos y el botón se activa.'}
      </p>
    </form>
  )
}
