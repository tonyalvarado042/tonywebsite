import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { CLASE } from '@/data/clase-copropiedad'

/**
 * Layout raíz de la landing de la clase.
 *
 * Es un layout raíz PROPIO —con su `<html>` y su `<body>`— igual que el de
 * `(bnb)` y `(studio)`. A propósito: acá NO entran el `Header` ni el `Footer`
 * del sitio. Una página de registro con menú es una página de la que la gente
 * se va por el menú.
 *
 * La marca sí es la de Tony Alvarado: Inter, fondo `brand-bg` y el morado de
 * siempre. No es otra marca como Bike & Bed; es la misma, en modo campaña.
 *
 * ── El canónico apunta al subdominio ────────────────────────────────────────
 * La misma página se sirve en `clase.tonyalvarado.com/` (por la reescritura de
 * `next.config.ts`) y en `www.tonyalvarado.com/clase`. Sin canónico, Google las
 * ve como contenido duplicado. El canónico es el subdominio, que es la
 * dirección que se pone en los anuncios.
 */

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const CANONICO = 'https://clase.tonyalvarado.com/'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tonyalvarado.com'),
  title: `Clase gratuita: te abro los números de mi hotel | ${CLASE.fechaTexto}`,
  description:
    'Clase en vivo y gratuita con Tony Alvarado. Los ingresos mes por mes de un hotel que ya opera en La Fortuna, qué se lleva la operadora y qué queda. Sin promesas de ningún número.',
  alternates: { canonical: CANONICO },
  openGraph: {
    type: 'website',
    url: CANONICO,
    siteName: 'Tony Alvarado',
    title: 'Te voy a abrir los números de mi hotel',
    description: `Clase en vivo y gratuita. ${CLASE.fechaTexto}, ${CLASE.horaTexto}.`,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Te voy a abrir los números de mi hotel',
    description: `Clase en vivo y gratuita. ${CLASE.fechaTexto}, ${CLASE.horaTexto}.`,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

export default function ClaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-brand-bg font-sans text-brand-text antialiased">{children}</body>
    </html>
  )
}
