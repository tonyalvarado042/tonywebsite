'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Loader2, Lock, MessageCircle } from 'lucide-react'
import { PAISES } from '@/data/paises'
import { RIFA } from '@/data/ride-and-reset'

/**
 * El formulario de la rifa RIDE & RESET.
 *
 * Hace DOS trabajos en un solo lugar, que es como lo pidió Tony:
 *  1. Apuntar a la rifa.
 *  2. Levantar la mano de quien quiere ser parte sin esperar el sorteo.
 *
 * El segundo trabajo no es una notita al pie: el bloque de arriba en la página
 * tiene su propio botón, y ese botón prende esta casilla y baja hasta acá. Se
 * comunican por un evento del navegador para que la página siga siendo un
 * componente de servidor.
 *
 * Se parte de `PuertaDeRecurso`, que ya está probado: selector de país,
 * palomita por campo, honeypot y estado de éxito.
 */

export const EVENTO_QUIERO_RESERVAR = 'bnb:quiero-reservar'

type Respuesta = {
  ok: boolean
  yaParticipaba?: boolean
  correoEnviado?: boolean
  quiereReservar?: boolean
  whatsapp?: string | null
  error?: string
}

export default function FormularioRifa() {
  const [prefijo, setPrefijo] = useState('+506')
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [instagram, setInstagram] = useState('')
  const [etiquetoA, setEtiquetoA] = useState('')
  const [compartio, setCompartio] = useState(false)
  const [aceptoBases, setAceptoBases] = useState(false)
  const [quiereReservar, setQuiereReservar] = useState(false)
  const [canal, setCanal] = useState<'email' | 'whatsapp'>('email')

  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [listo, setListo] = useState<Respuesta | null>(null)

  const casillaReservar = useRef<HTMLInputElement>(null)

  const paisActual = PAISES.find((p) => p.codigo === prefijo) ?? PAISES[0]

  // El botón «Quiero ser parte» de más arriba prende la casilla y la resalta un
  // momento, para que se vea que el clic hizo algo.
  const [resaltada, setResaltada] = useState(false)
  useEffect(() => {
    const alPedir = () => {
      setQuiereReservar(true)
      setResaltada(true)
      setTimeout(() => setResaltada(false), 2200)
    }
    window.addEventListener(EVENTO_QUIERO_RESERVAR, alPedir)
    return () => window.removeEventListener(EVENTO_QUIERO_RESERVAR, alPedir)
  }, [])

  // Qué cuenta como «ya está bien».
  const okNombre = nombre.trim().length >= 2
  const okCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())
  const okTelefono = telefono.replace(/\D/g, '').length >= 7
  const okInstagram = instagram.trim().replace(/^@+/, '').length >= 2
  const okEtiqueto = etiquetoA.trim().replace(/^@+/, '').length >= 2
  const todoListo = okNombre && okCorreo && okTelefono && okInstagram && okEtiqueto && aceptoBases

  async function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (enviando || !todoListo) return
    setEnviando(true)
    setError(null)

    try {
      const res = await fetch('/api/rifa/registro', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          nombre: nombre.trim(),
          correo: correo.trim(),
          prefijo,
          whatsapp: telefono,
          instagram: instagram.trim(),
          etiquetoA: etiquetoA.trim(),
          compartio,
          aceptoBases,
          quiereReservar,
          canal,
        }),
      })
      const json: Respuesta = await res.json()

      if (!res.ok || !json.ok) {
        setError(json.error ?? 'No se pudo completar el registro.')
        setEnviando(false)
        return
      }
      setListo(json)
    } catch {
      setError('No se pudo conectar. Revisá tu internet e intentá de nuevo.')
      setEnviando(false)
    }
  }

  const campo =
    'min-h-[54px] w-full rounded-xl border border-bnb-borde bg-bnb-negro px-4 pr-11 ' +
    'text-[16px] text-bnb-blanco placeholder:text-bnb-tenue outline-none transition-colors ' +
    'focus:border-transparent focus:ring-2 focus:ring-bnb-lava'

  // ── Ya quedó adentro ──
  if (listo) {
    return (
      <div className="rounded-3xl border border-bnb-lava/40 bg-bnb-tarjeta p-8 text-center sm:p-10">
        <span className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-bnb-lava">
          <Check size={30} className="text-bnb-lava" strokeWidth={2.5} />
        </span>

        <h3 className="mb-3 font-bnb-titulo text-2xl font-bold text-bnb-blanco">
          {listo.yaParticipaba ? 'Ya estabas adentro' : '¡Quedaste adentro!'}
        </h3>

        <p className="mx-auto mb-2 max-w-md text-[15px] leading-relaxed text-bnb-humo">
          {listo.yaParticipaba
            ? 'Tu participación ya estaba registrada, así que actualizamos tus datos. No hace falta volver a llenarlo.'
            : `Estás participando por uno de los ${RIFA.cupos} cupos de ${RIFA.nombre}.`}
        </p>

        {listo.correoEnviado && (
          <p className="mx-auto mb-6 max-w-md text-[14px] text-bnb-tenue">
            Te mandamos la confirmación a <span className="text-bnb-humo">{correo.trim()}</span>.
            Si no aparece, revisá el correo no deseado.
          </p>
        )}

        {listo.quiereReservar && (
          <p className="mx-auto mb-6 max-w-md rounded-2xl border border-bnb-borde bg-bnb-negro px-5 py-4 text-[14.5px] leading-relaxed text-bnb-humo">
            Anotamos que querés ser parte sin esperar el sorteo. Te vamos a escribir
            con toda la información de la experiencia.
          </p>
        )}

        {listo.whatsapp && (
          <a
            href={listo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl
                       bg-bnb-lava px-7 text-[15px] font-bold text-bnb-negro
                       transition-colors hover:bg-bnb-lava-fuerte"
          >
            <MessageCircle size={18} />
            Escribinos por WhatsApp
          </a>
        )}
      </div>
    )
  }

  // ── El formulario ──
  return (
    <form
      onSubmit={alEnviar}
      noValidate
      className="rounded-3xl border border-bnb-borde bg-bnb-tarjeta p-6 sm:p-8"
    >
      {/* Honeypot: invisible para la gente, irresistible para los robots. */}
      <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
        <label htmlFor="rifa-website">No llenar</label>
        <input id="rifa-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="space-y-5">
        <Campo etiqueta="Tu nombre" ok={okNombre} id="rifa-nombre">
          <input
            id="rifa-nombre" type="text" autoComplete="name" placeholder="Nombre y apellido"
            value={nombre} onChange={(e) => setNombre(e.target.value)} className={campo}
          />
        </Campo>

        <Campo etiqueta="Tu correo" ok={okCorreo} id="rifa-correo">
          <input
            id="rifa-correo" type="email" inputMode="email" autoComplete="email"
            placeholder="vos@correo.com"
            value={correo} onChange={(e) => setCorreo(e.target.value)} className={campo}
          />
        </Campo>

        <div>
          <Etiqueta ok={okTelefono} htmlFor="rifa-telefono">Tu WhatsApp</Etiqueta>
          <div className="flex gap-2">
            <select
              value={prefijo} onChange={(e) => setPrefijo(e.target.value)} aria-label="País"
              className="min-h-[54px] w-[104px] shrink-0 rounded-xl border border-bnb-borde
                         bg-bnb-negro px-3 text-[15px] text-bnb-blanco outline-none
                         transition-colors focus:border-transparent focus:ring-2 focus:ring-bnb-lava"
            >
              {PAISES.map((p) => (
                <option key={p.codigo + p.corto} value={p.codigo}>{p.corto} {p.codigo}</option>
              ))}
            </select>
            <input
              id="rifa-telefono" type="tel" inputMode="tel" autoComplete="tel-national"
              placeholder={paisActual.ejemplo}
              value={telefono} onChange={(e) => setTelefono(e.target.value)} className={campo}
            />
          </div>
          <p className="mt-1.5 text-[12px] text-bnb-tenue">
            {paisActual.pais} · solo tu número, sin el {paisActual.codigo}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo etiqueta="Tu Instagram" ok={okInstagram} id="rifa-instagram">
            <input
              id="rifa-instagram" type="text" autoCapitalize="none" autoCorrect="off"
              placeholder="@tuusuario"
              value={instagram} onChange={(e) => setInstagram(e.target.value)} className={campo}
            />
          </Campo>

          <Campo etiqueta="¿A quién etiquetaste?" ok={okEtiqueto} id="rifa-etiqueto">
            <input
              id="rifa-etiqueto" type="text" autoCapitalize="none" autoCorrect="off"
              placeholder="@supersona"
              value={etiquetoA} onChange={(e) => setEtiquetoA(e.target.value)} className={campo}
            />
          </Campo>
        </div>
        <p className="-mt-2 text-[12px] leading-relaxed text-bnb-tenue">
          Los pedimos para poder verificar tu participación en el post. Si ganás, es
          con esa persona que te vas.
        </p>

        {/* ── Casillas ── */}
        <div className="space-y-3 border-t border-bnb-borde pt-5">
          <Casilla checked={compartio} onChange={setCompartio} id="rifa-compartio">
            Ya compartí el post en mis historias.
          </Casilla>

          <Casilla
            ref={casillaReservar}
            checked={quiereReservar}
            onChange={setQuiereReservar}
            id="rifa-reservar"
            resaltada={resaltada}
          >
            <span className="font-semibold text-bnb-blanco">
              También quiero ser parte sin esperar el sorteo.
            </span>{' '}
            Escribinos y te pasamos la información de la experiencia completa.
          </Casilla>

          <Casilla checked={aceptoBases} onChange={setAceptoBases} id="rifa-bases" obligatoria>
            Acepto las bases de la rifa y que me escriban con novedades de Bike &amp; Bed.
            Me salgo con un clic desde cualquier correo.
          </Casilla>
        </div>

        {/* ── Por dónde le escribimos ── */}
        <fieldset className="border-t border-bnb-borde pt-5">
          <legend className="mb-3 text-[13px] font-semibold text-bnb-humo">
            ¿Por dónde preferís que te escribamos?
          </legend>
          <div className="flex gap-3">
            {([
              { valor: 'email', texto: 'Correo' },
              { valor: 'whatsapp', texto: 'WhatsApp' },
            ] as const).map((op) => (
              <label
                key={op.valor}
                className={`flex min-h-[48px] flex-1 cursor-pointer items-center justify-center
                            gap-2 rounded-xl border px-4 text-[15px] font-medium transition-colors
                            ${canal === op.valor
                              ? 'border-bnb-lava bg-bnb-lava/10 text-bnb-blanco'
                              : 'border-bnb-borde text-bnb-humo hover:border-bnb-tenue'}`}
              >
                <input
                  type="radio" name="canal" value={op.valor}
                  checked={canal === op.valor}
                  onChange={() => setCanal(op.valor)}
                  className="sr-only"
                />
                {op.texto}
              </label>
            ))}
          </div>
        </fieldset>

        {error && (
          <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3
                                     text-[13.5px] text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={enviando || !todoListo}
          className="flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-2xl
                     bg-bnb-lava px-6 text-[16px] font-bold text-bnb-negro
                     transition-colors hover:bg-bnb-lava-fuerte
                     disabled:cursor-not-allowed disabled:opacity-40"
        >
          {enviando ? (
            <><Loader2 size={18} className="animate-spin" /> Un momento…</>
          ) : (
            <>Quiero participar <ArrowRight size={18} /></>
          )}
        </button>

        <p className="flex items-start gap-2 text-[12px] leading-relaxed text-bnb-tenue">
          <Lock size={13} className="mt-0.5 shrink-0" />
          <span>Participar es gratis. Tus datos no se comparten con nadie más.</span>
        </p>
      </div>
    </form>
  )
}

// ── Piezas ──────────────────────────────────────────────────────────────────

function Etiqueta({ ok, htmlFor, children }: {
  ok: boolean
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-2">
      <span className="text-[13px] font-semibold text-bnb-humo">{children}</span>
      {ok && <Check size={14} className="text-bnb-lava" strokeWidth={3} />}
    </label>
  )
}

/** Un campo con su palomita cuando ya está bien lleno. */
function Campo({ etiqueta, ok, id, children }: {
  etiqueta: string
  ok: boolean
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Etiqueta ok={ok} htmlFor={id}>{etiqueta}</Etiqueta>
      <div className="relative">
        {children}
        {ok && (
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
            <Check size={17} className="text-bnb-lava" strokeWidth={3} />
          </span>
        )}
      </div>
    </div>
  )
}

function Casilla({ checked, onChange, id, children, obligatoria, resaltada, ref }: {
  checked: boolean
  onChange: (v: boolean) => void
  id: string
  children: React.ReactNode
  obligatoria?: boolean
  resaltada?: boolean
  ref?: React.Ref<HTMLInputElement>
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 transition-colors
                  ${resaltada
                    ? 'border-bnb-lava bg-bnb-lava/10'
                    : checked
                      ? 'border-bnb-borde bg-bnb-negro'
                      : 'border-transparent hover:border-bnb-borde'}`}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        required={obligatoria}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-bnb-lava"
      />
      <span className="text-[13.5px] leading-relaxed text-bnb-humo">{children}</span>
    </label>
  )
}
