'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Loader2, Lock, X } from 'lucide-react'

/**
 * La puerta de un recurso, en ventana emergente.
 *
 * Tony la pidió así: que se vea que llenando el formulario uno RECIBE el
 * material, y que cada campo muestre una palomita al quedar bien.
 *
 * El WhatsApp es obligatorio: en el CRM es la forma principal de reconocer a
 * una persona. El código de país va aparte para que solo escriba su número.
 */

const PAISES = [
  { codigo: '+506', pais: 'Costa Rica',       corto: 'CR', ejemplo: '8888 8888' },
  { codigo: '+1',   pais: 'EE. UU. / Canadá', corto: 'US', ejemplo: '305 555 0123' },
  { codigo: '+52',  pais: 'México',           corto: 'MX', ejemplo: '55 1234 5678' },
  { codigo: '+57',  pais: 'Colombia',         corto: 'CO', ejemplo: '300 1234567' },
  { codigo: '+34',  pais: 'España',           corto: 'ES', ejemplo: '612 34 56 78' },
  { codigo: '+507', pais: 'Panamá',           corto: 'PA', ejemplo: '6123 4567' },
  { codigo: '+503', pais: 'El Salvador',      corto: 'SV', ejemplo: '7123 4567' },
  { codigo: '+502', pais: 'Guatemala',        corto: 'GT', ejemplo: '5123 4567' },
  { codigo: '+504', pais: 'Honduras',         corto: 'HN', ejemplo: '9123 4567' },
  { codigo: '+505', pais: 'Nicaragua',        corto: 'NI', ejemplo: '8123 4567' },
  { codigo: '+54',  pais: 'Argentina',        corto: 'AR', ejemplo: '11 1234 5678' },
  { codigo: '+56',  pais: 'Chile',            corto: 'CL', ejemplo: '9 1234 5678' },
  { codigo: '+51',  pais: 'Perú',             corto: 'PE', ejemplo: '912 345 678' },
  { codigo: '+593', pais: 'Ecuador',          corto: 'EC', ejemplo: '99 123 4567' },
  { codigo: '+58',  pais: 'Venezuela',        corto: 'VE', ejemplo: '412 1234567' },
]

const ESTILO = {
  morado: { texto: 'text-brand-green', anillo: 'focus:ring-brand-green/50', boton: 'bg-brand-green text-brand-bg', borde: 'border-brand-green/30' },
  dorado: { texto: 'text-brand-gold',  anillo: 'focus:ring-brand-gold/50',  boton: 'bg-brand-gold text-brand-bg',  borde: 'border-brand-gold/30' },
  calido: { texto: 'text-brand-warm',  anillo: 'focus:ring-brand-warm/50',  boton: 'bg-brand-warm text-brand-bg',  borde: 'border-brand-warm/30' },
} as const

type Props = {
  slug: string
  titulo: string
  destino: string
  acento: 'morado' | 'dorado' | 'calido'
  /** Texto del botón que abre la ventana. */
  llamado: string
  /**
   * Modo "fila entera": en vez de un botón propio, toda la tarjeta abre la
   * ventana. Se usa en las tarjetas compactas de /recursos, para que un solo
   * clic lleve del listado al formulario.
   */
  comoFila?: { clases: string; contenido: React.ReactNode }
}

export default function PuertaDeRecurso({ slug, titulo, destino, acento, llamado, comoFila }: Props) {
  const e = ESTILO[acento]
  const [abierta, setAbierta] = useState(false)
  const [prefijo, setPrefijo] = useState('+506')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState(false)
  const primerCampo = useRef<HTMLInputElement>(null)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

  // Las palomitas: qué cuenta como "ya está bien".
  const okNombre = nombre.trim().length >= 2
  const okCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
  const okTelefono = telefono.replace(/\D/g, '').length >= 7
  const todoListo = okNombre && okCorreo && okTelefono

  // Al abrir: bloquear el fondo y llevar el cursor al primer campo.
  useEffect(() => {
    if (!abierta) return
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = setTimeout(() => primerCampo.current?.focus(), 80)
    const alTeclear = (ev: KeyboardEvent) => { if (ev.key === 'Escape') setAbierta(false) }
    window.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', alTeclear)
      clearTimeout(t)
    }
  }, [abierta])

  async function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (enviando || !todoListo) return
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/recursos/registro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          prefijo,
          whatsapp: telefono,
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
      setTimeout(() => { window.location.href = json.url ?? destino }, 1100)
    } catch {
      setError('No se pudo conectar. Revisá tu internet e intentá de nuevo.')
      setEnviando(false)
    }
  }

  const campo =
    'min-h-[54px] w-full rounded-xl border border-brand-border bg-brand-bg px-4 pr-11 text-[16px] ' +
    'text-brand-text placeholder:text-brand-muted/50 outline-none transition-colors ' +
    'focus:border-transparent focus:ring-2 ' + e.anillo

  return (
    <>
      {/* ── Lo que abre la ventana ── */}
      {comoFila ? (
        // La fila entera es el botón: un solo clic del listado al formulario.
        <button type="button" onClick={() => setAbierta(true)} className={comoFila.clases}>
          {comoFila.contenido}
        </button>
      ) : (
        <>
          <button
            type="button"
            onClick={() => setAbierta(true)}
            className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl
                        px-6 text-[15px] font-bold ${e.boton}
                        transition-opacity hover:opacity-90`}
          >
            {llamado}
            <ArrowRight size={18} />
          </button>

          {!abierta && (
            <p className="mt-3 flex items-start justify-center gap-2 text-center text-[12.5px] leading-relaxed text-brand-muted/70">
              <Lock size={13} className="mt-0.5 shrink-0" />
              <span>Gratis. Solo te pido tus datos para mandártelo.</span>
            </p>
          )}
        </>
      )}

      {/* ── La ventana ── */}
      {abierta && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0
                     backdrop-blur-sm sm:items-center sm:p-6"
          onClick={() => !enviando && setAbierta(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Recibir ${titulo}`}
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="max-h-[92vh] w-full overflow-y-auto rounded-t-3xl border border-brand-border
                       bg-brand-card p-6 sm:max-w-md sm:rounded-3xl sm:p-8"
          >
            {listo ? (
              // ── Éxito ──
              <div className="py-8 text-center">
                <span className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center
                                  rounded-full border-2 ${e.borde}`}>
                  <Check size={30} className={e.texto} strokeWidth={2.5} />
                </span>
                <p className="mb-2 text-xl font-bold text-brand-text">¡Listo!</p>
                <p className="text-[15px] leading-relaxed text-brand-muted">
                  Abriendo tu material… y también te lo mandé al correo.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-start gap-3">
                  <div className="flex-1">
                    <p className={`mb-1 text-[11px] font-bold uppercase tracking-[0.16em] ${e.texto}`}>
                      Gratis
                    </p>
                    <h2 className="text-[19px] font-bold leading-snug text-brand-text">
                      ¿Adónde te lo mando?
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAbierta(false)}
                    aria-label="Cerrar"
                    className="-mr-2 -mt-2 flex h-11 w-11 shrink-0 items-center justify-center
                               rounded-full text-brand-muted transition-colors hover:text-brand-text"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={alEnviar} className="space-y-4" noValidate>
                  <Campo etiqueta="Tu nombre" ok={okNombre}>
                    <input
                      ref={primerCampo}
                      type="text" autoComplete="name" placeholder="Nombre y apellido"
                      value={nombre} onChange={(ev) => setNombre(ev.target.value)}
                      className={campo}
                    />
                  </Campo>

                  <Campo etiqueta="Tu correo" ok={okCorreo}>
                    <input
                      type="email" inputMode="email" autoComplete="email" placeholder="vos@correo.com"
                      value={correo} onChange={(ev) => setCorreo(ev.target.value)}
                      className={campo}
                    />
                  </Campo>

                  <div>
                    <div className="mb-1.5 flex items-center gap-2">
                      <span className="text-[13px] font-semibold text-brand-muted">Tu WhatsApp</span>
                      {okTelefono && <Check size={14} className="text-brand-green" strokeWidth={3} />}
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={prefijo}
                        onChange={(ev) => setPrefijo(ev.target.value)}
                        aria-label="País"
                        className={`min-h-[54px] w-[104px] shrink-0 rounded-xl border border-brand-border
                                    bg-brand-bg px-3 text-[15px] text-brand-text outline-none
                                    transition-colors focus:border-transparent focus:ring-2 ${e.anillo}`}
                      >
                        {PAISES.map((p) => (
                          <option key={p.codigo + p.corto} value={p.codigo}>
                            {p.corto} {p.codigo}
                          </option>
                        ))}
                      </select>
                      <input
                        type="tel" inputMode="tel" autoComplete="tel-national"
                        placeholder={paisActual.ejemplo}
                        value={telefono} onChange={(ev) => setTelefono(ev.target.value)}
                        className={campo}
                      />
                    </div>
                    <p className="mt-1.5 text-[12px] text-brand-muted/70">
                      {paisActual.pais} · solo tu número, sin el {paisActual.codigo}
                    </p>
                  </div>

                  {error && (
                    <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10
                                               px-4 py-3 text-[13.5px] text-red-300">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={enviando || !todoListo}
                    className={`flex min-h-[56px] w-full items-center justify-center gap-2.5
                                rounded-2xl px-6 text-[15px] font-bold ${e.boton}
                                transition-opacity hover:opacity-90
                                disabled:cursor-not-allowed disabled:opacity-40`}
                  >
                    {enviando ? (
                      <><Loader2 size={18} className="animate-spin" /> Un momento…</>
                    ) : (
                      <>Dame acceso <ArrowRight size={18} /></>
                    )}
                  </button>

                  <p className="flex items-start gap-2 text-[12px] leading-relaxed text-brand-muted/70">
                    <Lock size={13} className="mt-0.5 shrink-0" />
                    <span>
                      Al registrarte autorizás que te escriba con novedades y material
                      nuevo. Te salís con un clic desde cualquier correo.
                    </span>
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

/** Un campo con su palomita cuando ya está bien lleno. */
function Campo({ etiqueta, ok, children }: {
  etiqueta: string
  ok: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="text-[13px] font-semibold text-brand-muted">{etiqueta}</span>
        {ok && <Check size={14} className="text-brand-green" strokeWidth={3} />}
      </div>
      <div className="relative">
        {children}
        {ok && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
            <Check size={17} className="text-brand-green" strokeWidth={3} />
          </span>
        )}
      </div>
    </div>
  )
}
