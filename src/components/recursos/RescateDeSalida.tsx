'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import InformeAirbnb from './InformeAirbnb'
import { enDolares, enPorcentaje, type EscenarioAirbnb, type Resultado, type Supuestos } from '@/lib/calculadora-airbnb'

/**
 * La ventana de rescate: se ofrece mandar el informe justo cuando la persona
 * está por irse.
 *
 * Tony la pidió el 20-sep-2026. **No es una ventana de spam**, y eso depende de
 * tres reglas que NO se pueden aflojar sin romperla:
 *
 * 1. **Nunca antes de que haya calculado algo.** Si todavía no tocó la
 *    calculadora no hay informe que ofrecerle, y la ventana se lee como
 *    publicidad. `haCalculado` es lo que la habilita.
 *
 * 2. **Nunca mientras está trabajando.** En una calculadora la gente está
 *    metiendo números; taparle los suyos con una ventana es la forma más rápida
 *    de que cierre la pestaña. El reloj solo corre cuando lleva rato SIN tocar
 *    nada, y cualquier tecla o clic lo reinicia.
 *
 * 3. **Una sola vez.** Si la cierra, no vuelve a salir en toda la visita. Queda
 *    anotado en `sessionStorage` para que ni recargando reaparezca.
 *
 * Y lo que la hace funcionar: no ofrece «un PDF», ofrece **los números que la
 * persona acaba de armar**, que son de verdad y se pierden al cerrar.
 */

/** Rato sin tocar nada antes de ofrecer el rescate. */
const QUIETO_MS = 100_000
const YA_SALIO = 'rescate-calculadora-visto'

type Props = {
  supuestos: Supuestos
  escenario: EscenarioAirbnb
  resultado: Resultado
  /** ¿Ya movió la calculadora? Sin esto la ventana no sale nunca. */
  haCalculado: boolean
  /** ¿Ya dejó sus datos? Entonces no hay nada que rescatar. */
  yaRegistrado: boolean
  alRegistrar: () => void
}

export default function RescateDeSalida({
  supuestos,
  escenario,
  resultado,
  haCalculado,
  yaRegistrado,
  alRegistrar,
}: Props) {
  const [abierta, setAbierta] = useState(false)
  // Ref además del estado: los escuchadores del documento se registran una vez
  // y necesitan leer el valor de ahora, no el de cuando se montaron.
  const gastada = useRef(false)

  const cerrar = useCallback(() => {
    setAbierta(false)
    gastada.current = true
    try { sessionStorage.setItem(YA_SALIO, '1') } catch { /* modo privado */ }
  }, [])

  const abrir = useCallback(() => {
    if (gastada.current || !haCalculado || yaRegistrado) return
    try { if (sessionStorage.getItem(YA_SALIO)) return } catch { /* modo privado */ }
    gastada.current = true
    setAbierta(true)
  }, [haCalculado, yaRegistrado])

  useEffect(() => {
    if (!haCalculado || yaRegistrado) return
    try { if (sessionStorage.getItem(YA_SALIO)) { gastada.current = true; return } } catch { /* modo privado */ }

    // ── 1) El mouse se va hacia la barra del navegador ──
    // Solo cuenta si sale POR ARRIBA y hacia afuera de la ventana: salir por
    // los lados es cambiar de aplicación, no irse de la página.
    const alSalirElMouse = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) abrir()
    }

    // ── 2) Vuelve de otra pestaña ──
    // Este es el único de los tres que también sirve en teléfono, donde no
    // existe el «intento de salida» porque no hay mouse.
    let seFue = false
    const alCambiarDeVista = () => {
      if (document.visibilityState === 'hidden') { seFue = true; return }
      if (seFue) { seFue = false; abrir() }
    }

    // ── 3) Lleva rato sin tocar nada ──
    let reloj: ReturnType<typeof setTimeout>
    const reiniciarReloj = () => {
      clearTimeout(reloj)
      reloj = setTimeout(abrir, QUIETO_MS)
    }
    const eventos = ['pointerdown', 'keydown', 'wheel', 'touchstart'] as const
    eventos.forEach((ev) => document.addEventListener(ev, reiniciarReloj, { passive: true }))
    reiniciarReloj()

    document.addEventListener('mouseout', alSalirElMouse)
    document.addEventListener('visibilitychange', alCambiarDeVista)

    return () => {
      clearTimeout(reloj)
      eventos.forEach((ev) => document.removeEventListener(ev, reiniciarReloj))
      document.removeEventListener('mouseout', alSalirElMouse)
      document.removeEventListener('visibilitychange', alCambiarDeVista)
    }
  }, [haCalculado, yaRegistrado, abrir])

  // Con la ventana abierta: fondo bloqueado y Escape la cierra.
  useEffect(() => {
    if (!abierta) return
    const antes = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const alTeclear = (e: KeyboardEvent) => { if (e.key === 'Escape') cerrar() }
    window.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = antes
      window.removeEventListener('keydown', alTeclear)
    }
  }, [abierta, cerrar])

  if (!abierta) return null

  const numeros = [
    { valor: enDolares(resultado.flujoMensual), rotulo: 'al mes' },
    { valor: enPorcentaje(resultado.capRate), rotulo: 'cap rate' },
    {
      valor: Number.isFinite(resultado.recuperacion)
        ? `${resultado.recuperacion.toFixed(1)} años`
        : '—',
      rotulo: 'recuperación',
    },
  ]

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto
                 bg-brand-bg/80 p-4 backdrop-blur-sm sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rescate-titulo"
      onClick={cerrar}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-md rounded-3xl border-2 border-brand-cta/30
                   bg-brand-card p-6 shadow-[0_0_80px_-20px_rgba(34,197,94,0.45)] sm:p-7"
      >
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full
                     text-brand-muted transition-colors hover:bg-brand-bg hover:text-brand-text"
        >
          <X size={18} />
        </button>

        <p className="mb-3">
          <span className="inline-flex items-center rounded-full bg-brand-cta px-3 py-1
                           text-[10.5px] font-extrabold uppercase tracking-[0.14em] text-brand-bg">
            Antes de que se pierda
          </span>
        </p>

        <h2 id="rescate-titulo" className="mb-2 pr-8 text-[22px] font-bold leading-tight text-brand-text">
          ¿Te mando estos números al correo?
        </h2>

        {/* Los números de ELLA, no un folleto. Esto es lo que hace que la
            ventana no se sienta publicidad: se le ofrece su propio trabajo. */}
        <div className="mb-4 flex items-end gap-4 rounded-2xl bg-brand-bg px-4 py-3.5">
          {numeros.map((n) => (
            <div key={n.rotulo}>
              <b className="block text-[18px] font-extrabold leading-none tracking-tight text-brand-text">
                {n.valor}
              </b>
              <span className="mt-1 block text-[10.5px] leading-tight text-brand-muted">
                {n.rotulo}
              </span>
            </div>
          ))}
        </div>

        <p className="mb-5 text-[14px] leading-relaxed text-brand-muted">
          El escenario que armaste vive <strong className="text-brand-text">solo en esta pestaña</strong>.
          Si la cerrás, se pierde y hay que meter todo otra vez.
        </p>

        <InformeAirbnb
          desnudo
          supuestos={supuestos}
          escenario={escenario}
          alRegistrar={alRegistrar}
          alVerAnalisis={cerrar}
        />

        <button
          type="button"
          onClick={cerrar}
          className="mt-3 w-full text-center text-[12.5px] text-brand-muted/70 transition-colors hover:text-brand-muted"
        >
          No, gracias
        </button>
      </div>
    </div>
  )
}
