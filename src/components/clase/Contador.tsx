'use client'

import { useEffect, useState } from 'react'
import { CLASE } from '@/data/clase-copropiedad'

/**
 * El contador regresivo hacia la clase.
 *
 * ── Por qué cuenta contra un instante UTC ───────────────────────────────────
 * `CLASE.instanteUtc` es un momento exacto en el tiempo, no «21 de octubre a
 * las 7». Así marca lo mismo para alguien en La Fortuna, en Miami o en Madrid:
 * cada quien ve cuánto falta desde SU reloj, y todos llegan a la misma hora.
 *
 * ── Hidratación ─────────────────────────────────────────────────────────────
 * En el servidor no se sabe qué hora es en el navegador, así que el primer
 * render no dibuja números: dibuja el mismo hueco con guiones. Si se calculara
 * en el servidor, React reclamaría que el HTML no coincide y, peor, el primer
 * cuadro mostraría una cuenta vieja.
 */

type Resto = { dias: number; horas: number; minutos: number; segundos: number }

function calcular(): Resto | null {
  const falta = new Date(CLASE.instanteUtc).getTime() - Date.now()
  if (falta <= 0) return null
  const s = Math.floor(falta / 1000)
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    minutos: Math.floor((s % 3600) / 60),
    segundos: s % 60,
  }
}

const dos = (n: number) => String(n).padStart(2, '0')

export default function Contador({ compacto = false }: { compacto?: boolean }) {
  const [montado, setMontado] = useState(false)
  const [resto, setResto] = useState<Resto | null>(null)

  useEffect(() => {
    setMontado(true)
    setResto(calcular())
    const id = setInterval(() => setResto(calcular()), 1000)
    return () => clearInterval(id)
  }, [])

  const empezo = montado && resto === null

  if (compacto) {
    return (
      <span className="font-mono tabular-nums" aria-live="off">
        {!montado ? '--:--:--' : empezo ? 'En vivo ahora' : `${resto!.dias}d ${dos(resto!.horas)}:${dos(resto!.minutos)}:${dos(resto!.segundos)}`}
      </span>
    )
  }

  if (empezo) {
    return (
      <p className="text-center text-xl font-bold text-brand-cta">
        La clase está empezando. Revisá tu correo: ahí está el enlace.
      </p>
    )
  }

  const casillas: Array<[string, string]> = [
    [montado ? dos(resto!.dias) : '--', resto?.dias === 1 ? 'día' : 'días'],
    [montado ? dos(resto!.horas) : '--', 'horas'],
    [montado ? dos(resto!.minutos) : '--', 'min'],
    [montado ? dos(resto!.segundos) : '--', 'seg'],
  ]

  return (
    <div>
      <div className="mx-auto flex max-w-sm justify-center gap-2 sm:gap-3" role="timer" aria-label="Tiempo que falta para la clase">
        {casillas.map(([valor, rotulo]) => (
          <div
            key={rotulo}
            /* Flexibles, no de ancho fijo. Con `min-w-[68px]` los cuatro
               cuadros + sus separaciones + el margen de la sección sumaban
               366 px dentro de 360 y sacaban barra horizontal en un teléfono
               angosto. Medido, no supuesto. El tope evita que se estiren
               feo en escritorio. */
            className="min-w-0 flex-1 rounded-2xl border border-brand-accent/30 bg-brand-card/80 px-2 py-3 text-center sm:max-w-[92px] sm:px-4"
          >
            <div className="font-mono text-3xl font-bold tabular-nums text-brand-accent sm:text-4xl">
              {valor}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-widest text-brand-muted">{rotulo}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-sm text-brand-muted">
        {CLASE.fechaTexto} · {CLASE.horaTexto}
      </p>
    </div>
  )
}
