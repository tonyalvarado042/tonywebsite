import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

/**
 * Layout raíz de la aplicación a la copropiedad.
 *
 * Propio, con su `<html>` y su `<body>`, igual que `(clase)`, `(bnb)` y
 * `(studio)`. No se reusó el de `(clase)` por dos razones concretas:
 *
 *  1. Ese layout trae la metadata de la clase y un **canónico al subdominio**
 *     `clase.tonyalvarado.com`. Una aplicación que se anuncia como la clase
 *     del 28 de octubre es, además de confuso, falso.
 *  2. Lleva el píxel de Meta. Acá **no va**: esta página se reparte por enlace
 *     privado a gente que Tony elige, no se pauta. Meter un píxel de
 *     retargeting en un formulario que pregunta por capital disponible es
 *     mandarle a un tercero una señal sobre la plata de alguien.
 *
 * Sin `Header` ni `Footer`, como las demás páginas de captación: un menú es
 * por donde la gente se va.
 */

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tonyalvarado.com'),
  title: 'Aplicá para ser co-dueño de HUMAYA | Tony Alvarado',
  description:
    'Aplicación para participar como co-dueño de HUMAYA Wellness Hotel, en La Fortuna. ' +
    'Dos minutos. No es una oferta de valores.',
  // Enlace privado: no tiene por qué estar en Google ni en ningún índice.
  robots: { index: false, follow: false, nocache: true },
}

export default function AplicarLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="bg-brand-bg font-sans text-brand-text antialiased">{children}</body>
    </html>
  )
}
