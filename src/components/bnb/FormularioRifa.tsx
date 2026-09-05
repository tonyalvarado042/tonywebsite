'use client'

import { useEffect, useRef, useState } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2, Lock, MessageCircle } from 'lucide-react'
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

  /**
   * Si ya intentó enviar. Antes de eso NO se marca nada en rojo: nadie quiere
   * un formulario que lo regaña por campos que todavía no llegó a llenar.
   */
  const [intentado, setIntentado] = useState(false)

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

  /**
   * Lo que falta, en el orden en que aparece en pantalla.
   *
   * El botón NO se apaga cuando falta algo: apagado, la persona lo toca, no
   * pasa nada y no sabe por qué. Se toca siempre, y si falta algo el
   * formulario lo dice con nombre y apellido y lleva el cursor al primero.
   */
  const loQueFalta: { id: string; que: string }[] = [
    !okNombre && { id: 'rifa-nombre', que: 'tu nombre' },
    !okCorreo && { id: 'rifa-correo', que: 'tu correo' },
    !okTelefono && { id: 'rifa-telefono', que: 'tu WhatsApp' },
    !okInstagram && { id: 'rifa-instagram', que: 'tu Instagram' },
    !okEtiqueto && { id: 'rifa-etiqueto', que: 'a quién etiquetaste' },
    !aceptoBases && { id: 'rifa-bases', que: 'aceptar las bases' },
  ].filter(Boolean) as { id: string; que: string }[]

  async function alEnviar(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    if (enviando) return

    // ── Falta algo: decirle QUÉ, y llevarlo ahí ──
    if (!todoListo) {
      setIntentado(true)
      const nombres = loQueFalta.map((f) => f.que)
      const lista =
        nombres.length === 1
          ? nombres[0]
          : `${nombres.slice(0, -1).join(', ')} y ${nombres[nombres.length - 1]}`
      setError(
        nombres.length === 1
          ? `Falta ${lista}.`
          : `Faltan ${nombres.length} cosas: ${lista}.`
      )

      const primero = document.getElementById(loQueFalta[0].id)
      const quietito = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      primero?.scrollIntoView({ behavior: quietito ? 'auto' : 'smooth', block: 'center' })
      // El foco después del desplazamiento, para que no lo corte a la mitad.
      setTimeout(() => primero?.focus({ preventScroll: true }), quietito ? 0 : 420)
      return
    }

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

  /**
   * Tony pidió que los campos se vieran más.
   *
   * Antes eran negros sobre una tarjeta gris oscura: se leían como huecos, no
   * como algo donde escribir. Ahora el campo es **más claro que la tarjeta**,
   * el contorno pasa 3:1 (WCAG 1.4.11 para bordes de control) y es de 2px, y
   * el texto de ejemplo subió de 4.94:1 a 6.06:1.
   */
  const campo = (malo = false) =>
    'min-h-[58px] w-full rounded-xl border-2 bg-bnb-campo px-4 pr-11 ' +
    'text-[16px] text-bnb-blanco placeholder:text-bnb-ejemplo outline-none transition-colors ' +
    'focus:border-bnb-lava focus:ring-2 focus:ring-bnb-lava/40 ' +
    (malo ? 'border-red-400' : 'border-bnb-borde-campo hover:border-bnb-humo')

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
        <Campo etiqueta="Tu nombre" ok={okNombre} malo={intentado && !okNombre} id="rifa-nombre">
          <input
            id="rifa-nombre" type="text" autoComplete="name" placeholder="Nombre y apellido"
            value={nombre} onChange={(e) => setNombre(e.target.value)} className={campo(intentado && !okNombre)}
          />
        </Campo>

        <Campo etiqueta="Tu correo" ok={okCorreo} malo={intentado && !okCorreo} id="rifa-correo">
          <input
            id="rifa-correo" type="email" inputMode="email" autoComplete="email"
            placeholder="vos@correo.com"
            value={correo} onChange={(e) => setCorreo(e.target.value)} className={campo(intentado && !okCorreo)}
          />
        </Campo>

        <div>
          <Etiqueta ok={okTelefono} malo={intentado && !okTelefono} htmlFor="rifa-telefono">Tu WhatsApp</Etiqueta>
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
              value={telefono} onChange={(e) => setTelefono(e.target.value)} className={campo(intentado && !okTelefono)}
            />
          </div>
          <p className="mt-1.5 text-[12px] text-bnb-tenue">
            {paisActual.pais} · solo tu número, sin el {paisActual.codigo}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Campo etiqueta="Tu Instagram" ok={okInstagram} malo={intentado && !okInstagram} id="rifa-instagram">
            <input
              id="rifa-instagram" type="text" autoCapitalize="none" autoCorrect="off"
              placeholder="@tuusuario"
              value={instagram} onChange={(e) => setInstagram(e.target.value)} className={campo(intentado && !okInstagram)}
            />
          </Campo>

          <Campo etiqueta="¿A quién etiquetaste?" ok={okEtiqueto} malo={intentado && !okEtiqueto} id="rifa-etiqueto">
            <input
              id="rifa-etiqueto" type="text" autoCapitalize="none" autoCorrect="off"
              placeholder="@supersona"
              value={etiquetoA} onChange={(e) => setEtiquetoA(e.target.value)} className={campo(intentado && !okEtiqueto)}
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

          <Casilla
            checked={aceptoBases}
            onChange={setAceptoBases}
            id="rifa-bases"
            malo={intentado && !aceptoBases}
          >
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

        {/* `aria-live` para que un lector de pantalla también lo cante. */}
        <div aria-live="polite">
          {error && (
            <p role="alert" className="flex items-start gap-2.5 rounded-xl border-2 border-red-400
                                       bg-red-500/15 px-4 py-3.5 text-[14.5px] font-medium text-red-200">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </p>
          )}
        </div>

        {/*
          El botón NO se apaga cuando falta algo. Apagado, la persona lo toca,
          no pasa nada, y no tiene forma de saber por qué — que es justo lo que
          Tony vio. Se toca siempre, y el formulario le dice qué falta.
        */}
        <button
          type="submit"
          disabled={enviando}
          className="flex min-h-[58px] w-full items-center justify-center gap-2.5 rounded-2xl
                     bg-bnb-lava px-6 text-[16px] font-bold text-bnb-negro
                     transition-colors hover:bg-bnb-lava-fuerte
                     disabled:cursor-not-allowed disabled:opacity-60"
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

function Etiqueta({ ok, malo, htmlFor, children }: {
  ok: boolean
  malo?: boolean
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-center gap-2">
      {/* Blanca, no gris: es el nombre del campo, tiene que leerse de un vistazo. */}
      <span className={`text-[14px] font-semibold ${malo ? 'text-red-300' : 'text-bnb-blanco'}`}>
        {children}
      </span>
      {ok && <Check size={14} className="text-bnb-lava" strokeWidth={3} />}
      {malo && <span className="text-[12.5px] font-normal text-red-300">— falta</span>}
    </label>
  )
}

/** Un campo con su palomita cuando ya está bien lleno. */
function Campo({ etiqueta, ok, malo, id, children }: {
  etiqueta: string
  ok: boolean
  malo?: boolean
  id: string
  children: React.ReactNode
}) {
  return (
    <div>
      <Etiqueta ok={ok} malo={malo} htmlFor={id}>{etiqueta}</Etiqueta>
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

function Casilla({ checked, onChange, id, children, malo, resaltada, ref }: {
  checked: boolean
  onChange: (v: boolean) => void
  id: string
  children: React.ReactNode
  /** Obligatoria y todavía sin marcar, después de haber intentado enviar. */
  malo?: boolean
  resaltada?: boolean
  ref?: React.Ref<HTMLInputElement>
}) {
  return (
    <label
      htmlFor={id}
      className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5 transition-colors
                  ${malo
                    ? 'border-red-400 bg-red-500/10'
                    : resaltada
                      ? 'border-bnb-lava bg-bnb-lava/10'
                      : checked
                        ? 'border-bnb-borde-campo bg-bnb-campo'
                        : 'border-transparent hover:border-bnb-borde'}`}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-bnb-lava"
      />
      <span className="text-[13.5px] leading-relaxed text-bnb-humo">
        {children}
        {malo && <span className="ml-1 font-semibold text-red-300">— falta esto</span>}
      </span>
    </label>
  )
}
