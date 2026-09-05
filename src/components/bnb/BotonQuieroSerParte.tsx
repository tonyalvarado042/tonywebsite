'use client'

import { ArrowDown } from 'lucide-react'
import { EVENTO_QUIERO_RESERVAR } from './FormularioRifa'

/**
 * El botón del bloque «no quiero dejarlo a la suerte».
 *
 * Tony fue explícito: esta parte es importante y no puede ser una notita al pie.
 * Por eso tiene su propio bloque arriba — pero manda al MISMO formulario, con la
 * casilla ya prendida. Un solo formulario, dos caminos.
 *
 * Se avisa por un evento del navegador para que la página siga siendo un
 * componente de servidor: no hace falta subir el estado hasta la página entera.
 */
export default function BotonQuieroSerParte({ children }: { children: React.ReactNode }) {
  function alTocar() {
    window.dispatchEvent(new CustomEvent(EVENTO_QUIERO_RESERVAR))

    const destino = document.getElementById('participar')
    if (!destino) return

    // Respeta a quien pidió menos movimiento en su sistema.
    const quietito = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    destino.scrollIntoView({ behavior: quietito ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <button
      type="button"
      onClick={alTocar}
      className="inline-flex min-h-[58px] items-center justify-center gap-2.5 rounded-2xl
                 border-2 border-bnb-lava px-8 text-[16px] font-bold text-bnb-lava
                 transition-colors hover:bg-bnb-lava hover:text-bnb-negro"
    >
      {children}
      <ArrowDown size={18} />
    </button>
  )
}
