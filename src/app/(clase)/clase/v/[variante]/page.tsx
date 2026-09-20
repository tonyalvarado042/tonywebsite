import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PaginaClase from '@/components/clase/PaginaClase'
import { CLASE } from '@/data/clase-copropiedad'
import { VARIANTES_CON_SLUG, buscarVariante } from '@/data/clase-variantes'

/**
 * Las variantes de la landing que cuelgan de un slug propio.
 *
 * `/clase/v/revolucion` en el sitio, `clase.tonyalvarado.com/revolucion` en el
 * subdominio (la reescritura vive en `next.config.ts` y se genera desde el
 * mismo arreglo, así que no hay forma de que una variante exista en un lado y
 * no en el otro).
 *
 * ── Por qué `v/` y no `/clase/<slug>` a secas ──────────────────────────────
 * Porque `/clase/gracias` ya existe. Un segmento dinámico hermano de una ruta
 * estática funciona —Next le da prioridad a la estática— pero es una trampa
 * puesta a propósito: el día que alguien cree una variante con slug `gracias`,
 * deja de existir sin que nada avise. Con `v/` no se pueden chocar nunca.
 *
 * Se prerenderiza cada una (`generateStaticParams`) y se cierra la puerta a
 * cualquier otra (`dynamicParams = false`): una URL inventada da 404 en vez de
 * intentar renderizar una variante que no existe.
 */

export const dynamicParams = false

export function generateStaticParams() {
  return VARIANTES_CON_SLUG.map((v) => ({ variante: v.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variante: string }>
}): Promise<Metadata> {
  const { variante } = await params
  const v = buscarVariante(variante)
  if (!v) return {}

  const canonico = `https://clase.tonyalvarado.com/${v.slug}`

  return {
    title: `${v.meta.titulo} | ${CLASE.fechaTexto}`,
    description: v.meta.descripcion,
    alternates: { canonical: canonico },
    openGraph: {
      type: 'website',
      url: canonico,
      siteName: 'Tony Alvarado',
      title: v.meta.titulo,
      description: v.meta.descripcion,
      images: ['/images/og/tony-alvarado-og.jpg'],
    },
    twitter: {
      card: 'summary_large_image',
      title: v.meta.titulo,
      description: v.meta.descripcion,
      images: ['/images/og/tony-alvarado-og.jpg'],
    },
  }
}

export default async function VariantePage({
  params,
}: {
  params: Promise<{ variante: string }>
}) {
  const { variante } = await params
  const v = buscarVariante(variante)
  if (!v) notFound()

  return <PaginaClase variante={v} />
}
