'use client'

import { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import Contador from './Contador'

/**
 * La barra que se pega abajo cuando la persona ya pasó el primer pliegue.
 *
 * El formulario queda arriba y al final; en el medio hay mucha página. Esta
 * barra hace que el botón esté siempre a un dedo de distancia sin tener que
 * repetir el formulario cinco veces.
 *
 * Aparece después de 600 px y **se esconde cuando el formulario está a la
 * vista**: tapar con una barra el mismo formulario al que manda es el error
 * clásico de estas barras, y encima en móvil le come el campo de abajo.
 */

export default function BarraFija() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const formulario = document.getElementById('registro')

    const alRodar = () => {
      const pasoElPliegue = window.scrollY > 600
      let formularioALaVista = false
      if (formulario) {
        const caja = formulario.getBoundingClientRect()
        formularioALaVista = caja.top < window.innerHeight && caja.bottom > 0
      }
      setVisible(pasoElPliegue && !formularioALaVista)
    }

    alRodar()
    window.addEventListener('scroll', alRodar, { passive: true })
    window.addEventListener('resize', alRodar)
    return () => {
      window.removeEventListener('scroll', alRodar)
      window.removeEventListener('resize', alRodar)
    }
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-brand-accent/25 bg-brand-bg/95 backdrop-blur transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      aria-hidden={!visible}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 md:px-12">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-widest text-brand-accent">
            Faltan
          </p>
          <p className="truncate text-sm font-bold text-brand-text">
            <Contador compacto />
          </p>
        </div>
        <a
          href="#registro"
          tabIndex={visible ? 0 : -1}
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-brand-cta px-5 py-3 text-sm font-bold text-brand-bg transition hover:bg-brand-cta-fuerte"
        >
          Guardame mi campo
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  )
}
