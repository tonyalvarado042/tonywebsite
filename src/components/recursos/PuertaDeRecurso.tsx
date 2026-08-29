'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, Lock } from 'lucide-react'

/**
 * La puerta de un recurso: nombre, correo y WhatsApp antes de entregarlo.
 *
 * Al enviar, el servidor escribe en el CRM (con la fuente y la fecha), manda
 * el recurso por correo y abre el recurso acá mismo — las dos vías, que es lo
 * que pidió Tony.
 *
 * El WhatsApp es obligatorio a propósito: en el CRM **el teléfono es la llave**
 * de la tabla, así que sin él no hay contacto que registrar.
 */

type Props = {
  slug: string
  titulo: string
  /** Adónde se manda a la persona una vez registrada. */
  destino: string
  acento: 'morado' | 'dorado' | 'calido'
}

const ESTILO = {
  morado: { texto: 'text-brand-green', anillo: 'focus:ring-brand-green/50', boton: 'bg-brand-green text-brand-bg' },
  dorado: { texto: 'text-brand-gold', anillo: 'focus:ring-brand-gold/50', boton: 'bg-brand-gold text-brand-bg' },
  calido: { texto: 'text-brand-warm', anillo: 'focus:ring-brand-warm/50', boton: 'bg-brand-warm text-brand-bg' },
} as const

export default function PuertaDeRecurso({ slug, titulo, destino, acento }: Props) {
  const e = ESTILO[acento]
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)

  async function alEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault()
    if (enviando) return

    const datos = new FormData(evento.currentTarget)
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/recursos/registro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: datos.get('nombre'),
          correo: datos.get('correo'),
          whatsapp: datos.get('whatsapp'),
          website: datos.get('website'),
          recurso: slug,
        }),
      })
      const json = await res.json()

      if (!res.ok || !json.ok) {
        setError(json.error ?? 'No se pudo completar el registro.')
        setEnviando(false)
        return
      }

      setListo(true)
      // Se abre el recurso. Un respiro para que se vea el mensaje de éxito.
      setTimeout(() => { window.location.href = json.url ?? destino }, 900)
    } catch {
      setError('No se pudo conectar. Revisá tu internet e intentá de nuevo.')
      setEnviando(false)
    }
  }

  if (listo) {
    return (
      <div className="rounded-2xl border border-brand-green/30 bg-brand-green/[0.07] p-7 text-center">
        <p className={`mb-2 text-lg font-bold ${e.texto}`}>Listo. Abriendo…</p>
        <p className="text-sm leading-relaxed text-brand-muted">
          También te lo mandé al correo para que lo tengás guardado.
        </p>
      </div>
    )
  }

  const campo =
    'min-h-[52px] w-full rounded-xl border border-brand-border bg-brand-bg px-4 text-[16px] ' +
    'text-brand-text placeholder:text-brand-muted/60 outline-none transition-colors ' +
    'focus:border-transparent focus:ring-2 ' + e.anillo

  return (
    <form onSubmit={alEnviar} className="space-y-4" noValidate>
      {/* Honeypot: fuera de pantalla y fuera del tabulador */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu nombre
        </label>
        <input id="nombre" name="nombre" type="text" required autoComplete="name" placeholder="Nombre y apellido" className={campo} />
      </div>

      <div>
        <label htmlFor="correo" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu correo
        </label>
        {/* inputMode email: en móvil sale el teclado con la arroba */}
        <input id="correo" name="correo" type="email" inputMode="email" required autoComplete="email" placeholder="vos@correo.com" className={campo} />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu WhatsApp
        </label>
        <input id="whatsapp" name="whatsapp" type="tel" inputMode="tel" required autoComplete="tel" placeholder="8888 8888" className={campo} />
        <p className="mt-1.5 text-[12px] text-brand-muted/70">
          Si es de Costa Rica bastan los 8 dígitos. De otro país, con el código: +52…
        </p>
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[13.5px] text-red-300">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className={`flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl
                    px-6 text-[15px] font-bold ${e.boton}
                    transition-opacity hover:opacity-90 disabled:opacity-60`}
      >
        {enviando ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Registrando…
          </>
        ) : (
          <>
            Dame acceso a «{titulo}»
            <ArrowRight size={17} />
          </>
        )}
      </button>

      <p className="flex items-start gap-2 text-[12px] leading-relaxed text-brand-muted/70">
        <Lock size={13} className="mt-0.5 shrink-0" />
        <span>
          Es gratis. Te escribo solo para mandarte esto y algún material nuevo, y
          podés salirte con un clic desde cualquier correo.
        </span>
      </p>
    </form>
  )
}
