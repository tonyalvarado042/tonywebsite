import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/JsonLd'
import { websiteSchema, personSchema } from '@/lib/structured-data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Coach y entrenador de ciclismo en Costa Rica. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels. Más de 22 años construyendo comunidad y propósito alrededor del mountain bike y el ciclismo de ruta.',
  metadataBase: new URL('https://www.tonyalvarado.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.tonyalvarado.com',
    siteName: 'Tony Alvarado',
    title: 'Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
    description:
      'Coach y entrenador de ciclismo en Costa Rica, fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels.',
    images: [{ url: '/images/og/tony-alvarado-og.jpg', width: 1200, height: 630, alt: 'Tony Alvarado — coach y entrenador de ciclismo en Costa Rica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
    description: 'Coach y entrenador de ciclismo en Costa Rica. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels.',
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
