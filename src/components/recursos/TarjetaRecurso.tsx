'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Bell } from 'lucide-react'
import PuertaDeRecurso from './PuertaDeRecurso'
import { acentoDe, iconoDe } from '@/data/recursos'
import type { RecursoCrm } from '@/lib/crm'

/**
 * Una tarjeta de recurso en /recursos.
 *
 * ⚠️ La ventana de registro se abre DESDE AQUÍ, sin pasar por otra página.
 * Antes la tarjeta llevaba a /recursos/<slug> y ahí adentro había otro botón:
 * eran dos clics para lo mismo. Tony lo corrigió — cada clic de más es gente
 * que se cae por el camino.
 *
 * La página /recursos/<slug> sigue existiendo para enlaces directos y para
 * Google, pero ya no es paso obligatorio.
 */

export default function TarjetaRecurso({
  recurso,
  destacada,
}: {
  recurso: RecursoCrm
  destacada: boolean
}) {
  const a = acentoDe(recurso.acento)
  const Icono = iconoDe(recurso.icono)
  const disponible = recurso.estado === 'disponible' && Boolean(recurso.destino_url)
  // `con_registro === false` es entrada libre: se entra sin formulario. Se
  // compara contra `false` a propósito — si la columna viniera vacía, el
  // recurso sigue pidiendo datos, que es lo seguro.
  const sinPuerta = recurso.con_registro === false
  const llamado = recurso.tipo === 'pdf' ? 'Descargar gratis' : 'Leerlo gratis'

  // ── La destacada: foto grande, texto, y la ventana se abre desde el botón ──
  if (destacada) {
    return (
      <article
        className={`group relative overflow-hidden rounded-3xl border ${a.borde}
                    bg-brand-card p-6 transition-colors duration-300 sm:p-8`}
      >
        {recurso.imagen_url && (
          <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden sm:-mx-8 sm:-mt-8">
            <Image
              src={recurso.imagen_url}
              alt={recurso.imagen_alt ?? recurso.titulo}
              fill
              priority
              quality={90}
              sizes="(min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-card to-transparent" />

            <span className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center
                              rounded-2xl bg-brand-bg/80 backdrop-blur-sm ring-1 ${a.anillo}`}>
              <Icono size={20} className={a.texto} strokeWidth={1.75} />
            </span>

            <span className={`absolute right-4 top-4 rounded-full bg-brand-bg/80 px-3 py-1
                              text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm
                              ${a.texto} ring-1 ${a.anillo}`}>
              {disponible ? recurso.formato : 'Próximamente'}
            </span>
          </div>
        )}

        <p className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${a.texto}`}>
          {recurso.titulo}
        </p>
        <h2 className="mb-3 text-[22px] font-bold leading-[1.2] tracking-tight text-brand-text sm:text-[26px]">
          {recurso.gancho ?? recurso.titulo}
        </h2>
        <p className="mb-7 text-[15px] leading-[1.7] text-brand-muted">{recurso.descripcion}</p>

        {disponible && sinPuerta ? (
          <Link
            href={recurso.destino_url!}
            className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl
                        px-6 text-[15px] font-bold ${a.boton} transition-opacity hover:opacity-90`}
          >
            Abrirla gratis
            <ArrowRight size={16} />
          </Link>
        ) : disponible ? (
          <PuertaDeRecurso
            slug={recurso.slug}
            titulo={recurso.titulo}
            destino={recurso.destino_url!}
            acento={(recurso.acento as 'morado' | 'dorado' | 'calido') ?? 'morado'}
            llamado={llamado}
          />
        ) : (
          <a
            href="#avisame"
            className={`flex min-h-[56px] w-full items-center justify-center gap-2.5 rounded-2xl
                        px-6 text-[15px] font-bold ${a.boton} transition-opacity hover:opacity-90`}
          >
            <Bell size={16} />
            Avisame cuando salga
          </a>
        )}
      </article>
    )
  }

  // ── Las demás: fila compacta. Toda la fila abre la ventana. ──
  const contenido = (
    <>
      <span className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl
                        ring-1 ${a.anillo} sm:h-[76px] sm:w-[76px]`}>
        {recurso.imagen_url ? (
          <>
            <Image
              src={recurso.imagen_url}
              alt={recurso.imagen_alt ?? recurso.titulo}
              fill
              quality={80}
              sizes="76px"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
            />
            <span aria-hidden className="absolute inset-0 flex items-center justify-center bg-brand-bg/45">
              <Icono size={20} className={a.texto} strokeWidth={2} />
            </span>
          </>
        ) : (
          <span className={`flex h-full w-full items-center justify-center ${a.fondoSuave}`}>
            <Icono size={20} className={a.texto} strokeWidth={2} />
          </span>
        )}
      </span>

      <div className="relative min-w-0 flex-1 text-left">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="text-[15px] font-bold leading-snug text-brand-text sm:text-base">
            {recurso.titulo}
          </h2>
          {!disponible && (
            <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${a.texto}`}>
              Próximamente
            </span>
          )}
        </div>
        <p className="mt-1 text-[13.5px] leading-snug text-brand-muted">
          {recurso.gancho ?? recurso.formato}
        </p>
      </div>

      <ArrowRight size={18} className={`relative shrink-0 ${a.texto} transition-transform duration-300 group-hover:translate-x-0.5`} />
    </>
  )

  const clases = `group relative flex min-h-[92px] w-full items-center gap-4 overflow-hidden
                  rounded-2xl border ${a.borde} ${a.bordeHover} bg-brand-card
                  p-5 transition-colors duration-300 sm:gap-5 sm:p-6`

  if (!disponible) {
    return <a href="#avisame" className={clases}>{contenido}</a>
  }

  if (sinPuerta) {
    return <Link href={recurso.destino_url!} className={clases}>{contenido}</Link>
  }

  return (
    <PuertaDeRecurso
      slug={recurso.slug}
      titulo={recurso.titulo}
      destino={recurso.destino_url!}
      acento={(recurso.acento as 'morado' | 'dorado' | 'calido') ?? 'morado'}
      llamado={llamado}
      comoFila={{ clases, contenido }}
    />
  )
}
