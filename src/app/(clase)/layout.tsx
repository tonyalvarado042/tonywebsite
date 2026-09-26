import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import '../globals.css'
import { CLASE } from '@/data/clase-copropiedad'
import { META_PIXEL_ID } from '@/lib/meta-pixel'

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
      <body className="bg-brand-bg font-sans text-brand-text antialiased">
        {children}

        {/* Píxel de Meta (noscript fallback) */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </body>

      {/*
        Este layout tiene su propio <html>/<body> (ver comentario arriba) y por
        eso NO hereda el GTM de `(es)/layout.tsx`: cada layout raíz es un
        documento HTML aparte. Sin esto, ningún anuncio que aterrice en
        `clase.tonyalvarado.com` deja rastro en Meta — es la misma clase de
        hueco que dejó a tonyalvarado.com sin retargeting (ver memoria
        `el-pixel-no-esta-en-tonyalvarado-com`). Por eso va el píxel de Meta
        directo acá, sin pasar por GTM.
      */}
      <Script
        id="meta-pixel-clase"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
        }}
      />
    </html>
  )
}
