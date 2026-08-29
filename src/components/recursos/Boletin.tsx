'use client'

import { useState } from 'react'
import { ArrowRight, Check, Loader2 } from 'lucide-react'

/**
 * El cajón de "avisame cuando salga algo nuevo".
 *
 * SOLO nombre y correo. Nada de interés ni mensaje: eso mata la conversión en
 * un formulario cuyo único trabajo es sumar a alguien a la lista. El formulario
 * completo vive en /contacto.
 *
 * Tampoco dice "respondemos en 24-48 horas" — acá nadie responde. Dice lo que
 * de verdad va a pasar: que va a recibir novedades y material.
 */
export default function Boletin({ desde = 'recursos' }: { desde?: string }) {
  const [enviando, setEnviando] = useState(false)
  const [listo, setListo] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function alEnviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (enviando) return
    const datos = new FormData(e.currentTarget)
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/boletin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.get('nombre'),
          correo: datos.get('correo'),
          website: datos.get('website'),
          desde,
        }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError(json.error ?? 'No se pudo completar.')
        setEnviando(false)
        return
      }
      setListo(true)
    } catch {
      setError('No se pudo conectar. Revisá tu internet e intentá de nuevo.')
      setEnviando(false)
    }
  }

  if (listo) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-brand-green/30
                      bg-brand-green/[0.07] px-6 py-5">
        <Check size={20} className="shrink-0 text-brand-green" />
        <p className="text-[15px] leading-snug text-brand-text">
          Listo. Te aviso cuando suba el próximo.
        </p>
      </div>
    )
  }

  const campo =
    'min-h-[52px] w-full rounded-xl border border-brand-border bg-brand-bg px-4 text-[16px] ' +
    'text-brand-text placeholder:text-brand-muted/60 outline-none transition-colors ' +
    'focus:border-transparent focus:ring-2 focus:ring-brand-green/50'

  return (
    <form onSubmit={alEnviar} className="space-y-3" noValidate>
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="bol-website">No llenar</label>
        <input id="bol-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          name="nombre" type="text" required autoComplete="name"
          placeholder="Tu nombre" aria-label="Tu nombre" className={campo}
        />
        {/* inputMode email: en móvil sale el teclado con la arroba */}
        <input
          name="correo" type="email" inputMode="email" required autoComplete="email"
          placeholder="tu@correo.com" aria-label="Tu correo" className={campo}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10
                                   px-4 py-3 text-[13.5px] text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl
                   bg-brand-green px-6 text-[15px] font-bold text-brand-bg
                   shadow-[0_6px_24px_rgba(139,92,246,0.32)]
                   transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {enviando ? (
          <><Loader2 size={17} className="animate-spin" /> Apuntando…</>
        ) : (
          <>Avisame de lo nuevo <ArrowRight size={17} /></>
        )}
      </button>

      {/* Lo que de verdad va a pasar. Sin promesas de respuesta que nadie cumple. */}
      <p className="text-center text-[12px] leading-relaxed text-brand-muted/70">
        Al apuntarte autorizás que te escriba con novedades y material nuevo.
        Nada más, y te salís con un clic desde cualquier correo.
      </p>
    </form>
  )
}
