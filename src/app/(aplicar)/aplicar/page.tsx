import Image from 'next/image'
import { Clock, MapPin } from 'lucide-react'
import { APLICACION, PRECIO_ACCION_TEXTO } from '@/data/aplicacion'
import FormularioAplicacion from '@/components/aplicar/FormularioAplicacion'

/**
 * `tonyalvarado.com/aplicar` — el paso entre la clase y la llamada.
 *
 * ⚠️ **«Privada» acá significa que no está enlazada ni indexada, no que esté
 * protegida.** Cualquiera con la dirección la puede abrir y llenar. Para un
 * formulario de aplicación eso está bien —el punto es repartirlo— pero no hay
 * que confundirlo con una puerta con llave: si alguna vez hace falta de
 * verdad, se le pone una clave, y eso es otro trabajo.
 *
 * El dato que sí protege: esto **no muestra nada** de nadie. Solo recibe.
 */
export const revalidate = 300

export default function AplicarPage() {
  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(201,162,77,0.16)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-24 pt-12 md:px-8 md:pt-16">
        <Image
          src="/images/logos/tony-alvarado-logo-white-horizontal.png"
          alt="Tony Alvarado"
          width={1920}
          height={456}
          priority
          className="h-7 w-auto object-contain"
        />

        <p className="mt-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          Dos minutos
        </p>

        <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-text sm:text-4xl">
          {APLICACION.titulo}
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{APLICACION.entrada}</p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 rounded-2xl border border-brand-border/60 bg-brand-bg/40 px-5 py-4 text-sm">
          <span className="flex items-center gap-2 text-brand-muted">
            <MapPin className="h-4 w-4 text-brand-accent" aria-hidden />
            La Fortuna, frente al Arenal
          </span>
          <span className="text-brand-muted">
            Una acción: <b className="text-brand-text">{PRECIO_ACCION_TEXTO}</b>
          </span>
        </div>

        <section className="mt-10">
          <FormularioAplicacion />
        </section>
      </div>
    </main>
  )
}
