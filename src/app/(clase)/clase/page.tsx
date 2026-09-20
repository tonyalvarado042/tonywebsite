import type { Metadata } from 'next'
import PaginaClase from '@/components/clase/PaginaClase'
import { CLASE } from '@/data/clase-copropiedad'
import { VARIANTE_POR_DEFECTO } from '@/data/clase-variantes'

/**
 * La variante por defecto: lo que sirve `clase.tonyalvarado.com/` a secas.
 *
 * Las otras cuatro cuelgan de `/clase/v/<slug>` y se ven en el subdominio como
 * `clase.tonyalvarado.com/<slug>`. Todas dibujan el MISMO componente, con otro
 * texto de entrada. Ver `data/clase-variantes.ts`.
 */

const v = VARIANTE_POR_DEFECTO
const CANONICO = 'https://clase.tonyalvarado.com/'

export const metadata: Metadata = {
  title: `${v.meta.titulo} | ${CLASE.fechaTexto}`,
  description: v.meta.descripcion,
  alternates: { canonical: CANONICO },
  openGraph: {
    type: 'website',
    url: CANONICO,
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

export default function ClasePage() {
  return <PaginaClase variante={v} />
}
