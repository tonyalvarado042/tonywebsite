'use client'

import { useState } from 'react'
import { ArrowRight, Loader2, Lock } from 'lucide-react'

/**
 * La puerta de un recurso: nombre, correo y WhatsApp antes de entregarlo.
 *
 * El WhatsApp es obligatorio a propósito: en el CRM `telefono_whatsapp` tiene
 * índice único y es la forma principal de reconocer a una persona.
 *
 * El código de país va en un selector aparte — Tony pidió que la persona solo
 * escriba su número, sin pelear con el "+506".
 */

/** Los países de donde llega gente a Tony. Costa Rica primero, por defecto. */
const PAISES = [
  { codigo: '+506', pais: 'Costa Rica',   bandera: '🇨🇷', ejemplo: '8888 8888' },
  { codigo: '+1',   pais: 'EE. UU. / Canadá', bandera: '🇺🇸', ejemplo: '305 555 0123' },
  { codigo: '+52',  pais: 'México',       bandera: '🇲🇽', ejemplo: '55 1234 5678' },
  { codigo: '+57',  pais: 'Colombia',     bandera: '🇨🇴', ejemplo: '300 1234567' },
  { codigo: '+34',  pais: 'España',       bandera: '🇪🇸', ejemplo: '612 34 56 78' },
  { codigo: '+507', pais: 'Panamá',       bandera: '🇵🇦', ejemplo: '6123 4567' },
  { codigo: '+503', pais: 'El Salvador',  bandera: '🇸🇻', ejemplo: '7123 4567' },
  { codigo: '+502', pais: 'Guatemala',    bandera: '🇬🇹', ejemplo: '5123 4567' },
  { codigo: '+504', pais: 'Honduras',     bandera: '🇭🇳', ejemplo: '9123 4567' },
  { codigo: '+505', pais: 'Nicaragua',    bandera: '🇳🇮', ejemplo: '8123 4567' },
  { codigo: '+54',  pais: 'Argentina',    bandera: '🇦🇷', ejemplo: '11 1234 5678' },
  { codigo: '+56',  pais: 'Chile',        bandera: '🇨🇱', ejemplo: '9 1234 5678' },
  { codigo: '+51',  pais: 'Perú',         bandera: '🇵🇪', ejemplo: '912 345 678' },
  { codigo: '+593', pais: 'Ecuador',      bandera: '🇪🇨', ejemplo: '99 123 4567' },
  { codigo: '+58',  pais: 'Venezuela',    bandera: '🇻🇪', ejemplo: '412 1234567' },
]

type Props = {
  slug: string
  titulo: string
  destino: string
  acento: 'morado' | 'dorado' | 'calido'
}

const ESTILO = {
  morado: { texto: 'text-brand-green', anillo: 'focus:ring-brand-green/50', boton: 'bg-brand-green text-brand-bg' },
  dorado: { texto: 'text-brand-gold',  anillo: 'focus:ring-brand-gold/50',  boton: 'bg-brand-gold text-brand-bg' },
  calido: { texto: 'text-brand-warm',  anillo: 'focus:ring-brand-warm/50',  boton: 'bg-brand-warm text-brand-bg' },
} as const

export default function PuertaDeRecurso({ slug, titulo, destino, acento }: Props) {
  const e = ESTILO[acento]
  const [prefijo, setPrefijo] = useState('+506')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

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
          prefijo,
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
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">No llenar</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="nombre" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu nombre
        </label>
        <input id="nombre" name="nombre" type="text" required autoComplete="name"
               placeholder="Nombre y apellido" className={campo} />
      </div>

      <div>
        <label htmlFor="correo" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu correo
        </label>
        <input id="correo" name="correo" type="email" inputMode="email" required
               autoComplete="email" placeholder="vos@correo.com" className={campo} />
      </div>

      <div>
        <label htmlFor="whatsapp" className="mb-1.5 block text-[13px] font-semibold text-brand-muted">
          Tu WhatsApp
        </label>
        {/* País aparte del número: la persona solo escribe su teléfono. */}
        <div className="flex gap-2">
          <select
            value={prefijo}
            onChange={(ev) => setPrefijo(ev.target.value)}
            aria-label="País"
            className={`min-h-[52px] w-[124px] shrink-0 rounded-xl border border-brand-border
                        bg-brand-bg px-3 text-[15px] text-brand-text outline-none
                        transition-colors focus:border-transparent focus:ring-2 ${e.anillo}`}
          >
            {PAISES.map((p) => (
              <option key={p.codigo + p.pais} value={p.codigo}>
                {p.bandera} {p.codigo}
              </option>
            ))}
          </select>
          <input
            id="whatsapp" name="whatsapp" type="tel" inputMode="tel" required
            autoComplete="tel-national" placeholder={paisActual.ejemplo} className={campo}
          />
        </div>
        <p className="mt-1.5 text-[12px] text-brand-muted/70">
          {paisActual.pais} · escribí solo tu número, sin el {paisActual.codigo}.
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
          <><Loader2 size={17} className="animate-spin" /> Registrando…</>
        ) : (
          <>Dame acceso <ArrowRight size={17} /></>
        )}
      </button>

      {/* Lo que de verdad va a pasar. Sin promesas de respuesta en 24 horas. */}
      <p className="flex items-start gap-2 text-[12px] leading-relaxed text-brand-muted/70">
        <Lock size={13} className="mt-0.5 shrink-0" />
        <span>
          Es gratis. Al registrarte autorizás que te escriba con novedades y
          material nuevo, y podés salirte con un clic desde cualquier correo.
        </span>
      </p>
    </form>
  )
}
