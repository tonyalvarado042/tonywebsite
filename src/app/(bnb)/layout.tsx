import type { Metadata } from 'next'
import { DM_Sans, Poppins } from 'next/font/google'
import '../globals.css'

/**
 * Layout raíz de BIKE & BED.
 *
 * Es un layout raíz PROPIO — con su `<html>` y su `<body>` — igual que el de
 * `(studio)`. A propósito: acá no entra el `Header` ni el `Footer` de Tony
 * Alvarado, porque esta es otra marca. Nada morado.
 *
 * Las fuentes son las mismas que usa el sitio real de Bike & Bed
 * (bikeandbedhotels.com): DM Sans para leer, Poppins para los títulos.
 *
 * El fondo es `#000000` EXACTO. El logo de Bike & Bed viene blanco sobre negro
 * sólido y sin transparencia: sobre cualquier otro tono se le vería la caja.
 */

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tonyalvarado.com'),
}

export default function BnbLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${dmSans.variable} ${poppins.variable}`}>
      <body className="bg-bnb-negro font-bnb text-bnb-blanco antialiased">
        {children}
      </body>
    </html>
  )
}
