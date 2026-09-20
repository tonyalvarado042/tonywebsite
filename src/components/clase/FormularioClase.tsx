'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, ArrowRight, Check, Loader2, Lock } from 'lucide-react'
import { PAISES } from '@/data/paises'

/**
 * El formulario de registro a la clase.
 *
 * Vive en tres lugares —el bloque principal, la ventana de salida y el cierre
 * de la página— y es el MISMO componente en los tres. Duplicarlo obligaría a
 * arreglar cada bug tres veces.
 *
 * Calcado de `FormularioRifa`, que ya está probado en producción: selector de
 * país, palomita por campo, honeypot y nada de regañar campos que la persona
 * todavía no llegó a llenar.
 *
 * Al terminar manda a `/clase/gracias`. **Nada personal viaja en la URL**: la
 * página de gracias no necesita saber quién entró.
 */

export default function FormularioClase({
  origen = 'principal',
  compacto = false,
}: {
  origen?: string
  compacto?: boolean
}) {
  const router = useRouter()

  const [prefijo, setPrefijo] = useState('+506')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [website, setWebsite] = useState('') // honeypot

  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [intentado, setIntentado] = useState(false)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

  const okNombre = nombre.trim().length >= 2
  const okCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
  const okTelefono = telefono.replace(/\D/g, '').length >= 7
  const todoListo = okNombre && okCorreo && okTelefono

  async function enviar(e: React.FormEvent) {
    e.preventDefault()
    setIntentado(true)
    if (!todoListo || enviando) return

    setEnviando(true)
    setError(null)

    try {
      const r = await fetch('/api/clase/registro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          prefijo,
          whatsapp: telefono.trim(),
          origen,
          website,
        }),
      })
      const data = await r.json()

      if (!r.ok || !data.ok) {
        setError(data.error || 'No se pudo completar el registro. Intentá de nuevo.')
        setEnviando(false)
        return
      }

      router.push('/clase/gracias')
    } catch {
      setError('Se cayó la conexión. Revisá tu internet y volvé a intentar.')
      setEnviando(false)
    }
  }

  const marca = (ok: boolean) =>
    ok ? (
      <Check className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-cta" aria-hidden />
    ) : null

  /**
   * El campo es MÁS CLARO que la tarjeta que lo contiene, no más oscuro.
   *
   * Venía en `bg-brand-bg/80` — un campo oscuro dentro de una tarjeta oscura se
   * lee como un hueco, no como algo donde escribir. Tony lo reclamó y tenía
   * razón. Los tres valores (`campo`, `campo-borde` y el ejemplo a opacidad
   * completa) están medidos en `tailwind.config.ts`.
   *
   * `min-h-[54px]` es lo mismo que usa la puerta de recursos: en un teléfono un
   * campo más bajo se falla al tocarlo.
   */
  const claseCampo = (ok: boolean) =>
    [
      'min-h-[54px] w-full rounded-xl border-2 bg-brand-campo px-4 py-3 text-[16px] text-brand-text',
      'placeholder:text-brand-muted',
      'outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40',
      intentado && !ok ? 'border-red-400' : 'border-brand-campo-borde',
    ].join(' ')

  return (
    <form onSubmit={enviar} noValidate className={compacto ? 'space-y-3' : 'space-y-4'}>
      {/* Honeypot: invisible para la gente, irresistible para los robots. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`website-${origen}`}>No llenar este campo</label>
        <input
          id={`website-${origen}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="relative">
        <label htmlFor={`nombre-${origen}`} className="mb-1.5 block text-[13px] font-semibold text-brand-text">
          Tu nombre
        </label>
        <input
          id={`nombre-${origen}`}
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
        <label htmlFor={`correo-${origen}`} className="mb-1.5 block text-[13px] font-semibold text-brand-text">
          Tu correo
        </label>
        <input
          id={`correo-${origen}`}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="donde te llega el enlace de la clase"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          className={claseCampo(okCorreo)}
        />
        {marca(okCorreo)}
      </div>

      <div>
        <label htmlFor={`whatsapp-${origen}`} className="mb-1.5 block text-[13px] font-semibold text-brand-text">
          Tu WhatsApp
        </label>
        <div className="flex gap-2">
          <label htmlFor={`pais-${origen}`} className="sr-only">
            País
          </label>
          <select
            id={`pais-${origen}`}
            value={prefijo}
            onChange={(e) => setPrefijo(e.target.value)}
            className="min-h-[54px] shrink-0 rounded-xl border-2 border-brand-campo-borde bg-brand-campo px-3 py-3 text-[16px] text-brand-text outline-none transition focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/40"
          >
            {PAISES.map((p) => (
              <option key={p.codigo + p.corto} value={p.codigo}>
                {p.corto} {p.codigo}
              </option>
            ))}
          </select>
          <div className="relative flex-1">
            <input
              id={`whatsapp-${origen}`}
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
        <p className="mt-1.5 text-xs text-brand-muted">
          Por ahí te mandamos el recordatorio antes de que empiece.
        </p>
      </div>

      {error && (
        <p className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-cta px-6 py-4 text-base font-bold text-brand-bg transition hover:bg-brand-cta-fuerte disabled:cursor-not-allowed disabled:opacity-60"
      >
        {enviando ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            Guardando tu campo…
          </>
        ) : (
          <>
            Guardame mi campo
            <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" aria-hidden />
          </>
        )}
      </button>

      <p className="flex items-start gap-2 text-xs leading-relaxed text-brand-muted">
        <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
        <span>
          Es gratis. Te escribimos solo por esta clase y lo que venga después de ella; te podés salir
          cuando querás con un clic. Tu nombre de pila puede aparecer en el muro de registrados.
        </span>
      </p>
    </form>
  )
}
