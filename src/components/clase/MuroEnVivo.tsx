'use client'

import { useEffect, useState } from 'react'

/**
 * El muro de quienes ya se apuntaron.
 *
 * Prueba social que sale del CRM de verdad, no de una lista escrita a mano. Si
 * todavía no hay nadie —o si el CRM no contesta— la sección **no se dibuja**.
 * Un «ya van 0 registrados» no convence a nadie, y un número inventado es
 * exactamente lo que no se hace acá.
 *
 * Del servidor solo llega nombre de pila y país. Ver `api/clase/muro`.
 */

type Persona = { nombre: string; pais: string | null }

const COLORES = [
  'bg-brand-accent/20 text-brand-accent',
  'bg-brand-pop/25 text-brand-accent-light',
  'bg-brand-cta/15 text-brand-cta',
  'bg-white/10 text-brand-text',
]

export default function MuroEnVivo() {
  const [total, setTotal] = useState(0)
  const [gente, setGente] = useState<Persona[]>([])

  useEffect(() => {
    let vivo = true
    fetch('/api/clase/muro')
      .then((r) => r.json())
      .then((d) => {
        if (!vivo) return
        setTotal(typeof d.total === 'number' ? d.total : 0)
        setGente(Array.isArray(d.gente) ? d.gente : [])
      })
      .catch(() => {
        /* que el muro falle no puede romper la página */
      })
    return () => {
      vivo = false
    }
  }, [])

  if (total === 0 || gente.length === 0) return null

  return (
    <section className="border-y border-brand-border/60 bg-brand-surface/40 py-14">
      <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          Se están apuntando
        </p>
        <p className="mt-3 text-2xl font-bold text-brand-text sm:text-3xl">
          Ya van{' '}
          <span className="text-brand-accent">{total.toLocaleString('es-CR')}</span>{' '}
          {total === 1 ? 'persona registrada' : 'personas registradas'}
        </p>

        <ul className="mt-7 flex flex-wrap justify-center gap-2.5">
          {gente.map((p, i) => (
            <li
              key={`${p.nombre}-${i}`}
              className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/80 py-1.5 pl-1.5 pr-4"
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  COLORES[i % COLORES.length]
                }`}
                aria-hidden
              >
                {p.nombre.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm text-brand-text">
                {p.nombre}
                {p.pais && <span className="text-brand-muted">, {p.pais}</span>}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs text-brand-muted/70">
          Los últimos en apuntarse. Solo el nombre de pila y el país.
        </p>
      </div>
    </section>
  )
}
