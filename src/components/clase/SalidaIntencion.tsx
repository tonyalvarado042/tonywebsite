'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import FormularioClase from './FormularioClase'
import Contador from './Contador'
import { CLASE, GUIA } from '@/data/clase-copropiedad'

/**
 * La ventana que aparece cuando la persona hace ademán de irse.
 *
 * ── Los tres disparos ───────────────────────────────────────────────────────
 *  1. ESCRITORIO — el mouse sale por el borde de ARRIBA de la ventana, que es
 *     donde están la X y la barra de direcciones. Salir por los lados o por
 *     abajo no significa nada.
 *  2. MÓVIL — el botón «atrás». No hay mouse que se vaya, así que se mete una
 *     entrada falsa en el historial: el primer «atrás» consume esa entrada y
 *     abre la ventana en vez de sacar a la persona de la página. El segundo
 *     «atrás» ya la saca de verdad — nadie queda secuestrado.
 *  3. MÓVIL — un tirón fuerte hacia arriba estando cerca del inicio, que es lo
 *     que hace la gente antes de cerrar la pestaña.
 *
 * ── Lo que NO se hace ───────────────────────────────────────────────────────
 * `beforeunload`. Los navegadores ya no dejan poner texto propio ahí: sale un
 * diálogo genérico del sistema que nadie escribió y que solo consigue que la
 * persona se vaya molesta. Además solo dispara si hubo interacción, así que ni
 * siquiera es confiable.
 *
 * ── Se muestra UNA vez ──────────────────────────────────────────────────────
 * Por navegador, guardado en `localStorage`. Una ventana que vuelve a saltar
 * cada vez que movés el mouse no retiene a nadie: espanta.
 *
 * ⚠️ Todo acceso a `localStorage` va en try/catch: en ventana privada, con las
 * cookies bloqueadas o dentro de una vista previa, leerlo puede reventar. Si
 * falla, la ventana simplemente se comporta como si fuera la primera vez.
 */

const LLAVE = 'clase-salida-vista'

/**
 * La trampa del historial se pone UNA sola vez por carga de página.
 *
 * En desarrollo React monta cada efecto dos veces (StrictMode). Sin esta
 * bandera se empujaban DOS entradas falsas y la persona necesitaba tres
 * «atrás» para salir.
 */
let trampaPuesta = false

function yaSeVio(): boolean {
  try {
    return localStorage.getItem(LLAVE) === '1'
  } catch {
    return false
  }
}

function marcarVista() {
  try {
    localStorage.setItem(LLAVE, '1')
  } catch {
    /* sin almacenamiento no se recuerda, y no pasa nada */
  }
}

export default function SalidaIntencion() {
  const [abierta, setAbierta] = useState(false)
  const armada = useRef(true)
  const panel = useRef<HTMLDivElement>(null)
  const ultimoScroll = useRef(0)

  const abrir = useCallback(() => {
    if (!armada.current || yaSeVio()) return
    armada.current = false
    marcarVista()
    setAbierta(true)
  }, [])

  const cerrar = useCallback(() => setAbierta(false), [])

  useEffect(() => {
    if (yaSeVio()) {
      armada.current = false
      return
    }

    // ── 1. Escritorio: el mouse se va por arriba ──
    const alSalirElMouse = (e: MouseEvent) => {
      if (e.clientY <= 0) abrir()
    }

    // ── 2. Móvil: el botón atrás ──
    // Solo en pantallas táctiles: en escritorio ya está el disparo del mouse y
    // no hay por qué meterle mano al historial de nadie.
    const esTactil =
      typeof window.matchMedia === 'function' && window.matchMedia('(pointer: coarse)').matches

    if (esTactil && !trampaPuesta) {
      try {
        history.pushState({ clase: 'trampa' }, '')
        trampaPuesta = true
      } catch {
        /* si el navegador no deja, se pierde este disparo y ya */
      }
    }
    const alVolver = () => {
      if (armada.current) abrir()
    }

    // ── 3. Móvil: tirón hacia arriba cerca del inicio ──
    ultimoScroll.current = window.scrollY
    const alRodar = () => {
      const y = window.scrollY
      const subio = ultimoScroll.current - y
      ultimoScroll.current = y
      if (subio > 120 && y < 400) abrir()
    }

    document.addEventListener('mouseout', alSalirElMouse)
    window.addEventListener('popstate', alVolver)
    window.addEventListener('scroll', alRodar, { passive: true })

    return () => {
      document.removeEventListener('mouseout', alSalirElMouse)
      window.removeEventListener('popstate', alVolver)
      window.removeEventListener('scroll', alRodar)
      // ⚠⚠ La limpieza NO llama a `history.back()`.
      //
      // La primera versión sí lo hacía, «para no dejar basura en el historial»,
      // y el resultado fue que la página se navegaba sola: en desarrollo React
      // monta → limpia → monta, y esa limpieza sacaba a la persona de la
      // landing antes de que alcanzara a verla. Se encontró abriendo la página
      // de verdad, no leyendo el código.
      //
      // La entrada sobrante no molesta a nadie: el primer «atrás» la consume y
      // abre la ventana, y el segundo saca a la persona de verdad.
    }
  }, [abrir])

  // Escape cierra, y mientras está abierta la página de atrás no se mueve.
  useEffect(() => {
    if (!abierta) return
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cerrar()
    }
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', alTeclear)
    panel.current?.focus()
    return () => {
      document.body.style.overflow = overflowPrevio
      document.removeEventListener('keydown', alTeclear)
    }
  }, [abierta, cerrar])

  if (!abierta) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="salida-titulo"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) cerrar()
      }}
    >
      <div
        ref={panel}
        tabIndex={-1}
        className="relative max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-brand-accent/30 bg-brand-card p-6 shadow-[0_0_80px_rgba(139,92,246,0.25)] outline-none sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={cerrar}
          aria-label="Cerrar"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-brand-muted transition hover:bg-white/5 hover:text-brand-text"
        >
          <X size={20} />
        </button>

        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          Un segundo antes de que te vayás
        </p>

        <h2 id="salida-titulo" className="mt-3 text-2xl font-bold leading-tight text-brand-text sm:text-3xl">
          ¿Te vas sin el campo?
        </h2>

        <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
          El {CLASE.fechaTexto.toLowerCase()} abro los números de un hotel que ya opera: cuánto entró
          cada mes, qué se lleva la operadora y qué queda. No lo vuelvo a hacer en abierto.
        </p>

        <div className="my-5 rounded-2xl border border-brand-border bg-brand-bg/60 p-4">
          <Contador />
        </div>

        <FormularioClase origen="salida" compacto />

        <p className="mt-4 text-center text-xs text-brand-muted/80">
          ¿De verdad no es para vos?{' '}
          <a href={GUIA.url} className="text-brand-accent underline underline-offset-4 hover:opacity-80">
            Llevate la guía «{GUIA.titulo}»
          </a>{' '}
          y quedamos a mano.
        </p>
      </div>
    </div>
  )
}
