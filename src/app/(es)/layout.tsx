import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
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
  title: 'Tony Alvarado — Desarrollador de proyectos turísticos en Costa Rica',
  description:
    'Desarrollador de proyectos turísticos en Costa Rica. Construye y opera hoteles temáticos en La Fortuna de San Carlos: Bike & Bed Hotels y Humaya Costa Rica. Autor de tres libros y conferencista.',
  metadataBase: new URL('https://www.tonyalvarado.com'),
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.tonyalvarado.com',
    siteName: 'Tony Alvarado',
    title: 'Tony Alvarado — Desarrollador de proyectos turísticos en Costa Rica',
    description:
      'Construye y opera hoteles temáticos en La Fortuna de San Carlos: Bike & Bed Hotels y Humaya Costa Rica. Autor y conferencista.',
    images: [{ url: '/images/og/tony-alvarado-og-source.jpeg', width: 1600, height: 900, alt: 'Tony Alvarado — desarrollador de proyectos turísticos en Costa Rica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tony Alvarado — Desarrollador de proyectos turísticos en Costa Rica',
    description: 'Construye y opera hoteles temáticos en La Fortuna de San Carlos: Bike & Bed Hotels y Humaya Costa Rica.',
    images: ['/images/og/tony-alvarado-og-source.jpeg'],
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
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KFXDNGNV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <JsonLd data={websiteSchema} />
        <JsonLd data={personSchema} />
        <Header />
        {children}
        <Footer />
      </body>
      {/* Google Tag Manager — GA4 y otros tags se configuran dentro de GTM, no aquí */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KFXDNGNV');`,
        }}
      />
    </html>
  )
}
