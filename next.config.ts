import type { NextConfig } from 'next'
import { VARIANTES_CON_SLUG } from './src/data/clase-variantes'

const CANONICAL = 'https://www.tonyalvarado.com'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 90, 100],
    remotePatterns: [
      { hostname: 'cdn.sanity.io' },
    ],
  },
  /**
   * clase.tonyalvarado.com sirve la landing de la clase.
   *
   * Se reescribe una ruta EXACTA por cada página — la raíz, `/gracias` y una
   * por variante— y nunca `/:path*`. Con un comodín, `/_next/...`,
   * `/images/...` y `/api/...` también se reescribirían y el subdominio
   * quedaría sin estáticos ni formulario.
   *
   * El redirect de abajo (apex → www) compara el host EXACTO `tonyalvarado.com`,
   * así que no se lleva puesto este subdominio.
   */
  async rewrites() {
    const enElSubdominio = [{ type: 'host' as const, value: 'clase.tonyalvarado.com' }]

    // ⚠️ `beforeFiles`, NO el arreglo pelado.
    //
    // Un `return [...]` a secas equivale a `afterFiles`: esas reescrituras
    // corren DESPUÉS de que Next busca archivos y rutas. Funcionaba para
    // `/revolucion` y compañía —que no existen como ruta— pero **para `/` no**:
    // la portada del sitio SÍ existe, ganaba el archivo, y
    // `clase.tonyalvarado.com` servía «No construimos hoteles» en vez de la
    // landing. Se vio en producción comparando los títulos de las seis URLs.
    //
    // `beforeFiles` corre antes de todo, así que la raíz del subdominio se
    // reescribe aunque `/` exista. No hay riesgo de tragarse estáticos: cada
    // regla exige el host del subdominio Y una ruta exacta.
    return {
      beforeFiles: [
        { source: '/', has: enElSubdominio, destination: '/clase' },
        { source: '/gracias', has: enElSubdominio, destination: '/clase/gracias' },

      // Una reescritura POR VARIANTE, sacada del mismo arreglo que dibuja las
      // páginas. Nada de `/:slug*`: un comodín se tragaría `/favicon.ico` y
      // cualquier archivo suelto de la raíz. Listarlas una por una también
      // significa que una URL inventada en un anuncio da 404 en vez de servir
      // algo raro.
        ...VARIANTES_CON_SLUG.map((v) => ({
          source: `/${v.slug}`,
          has: enElSubdominio,
          destination: `/clase/v/${v.slug}`,
        })),
      ],
    }
  },
  async redirects() {
    return [
      // Non-www → www (preserves path and query string)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tonyalvarado.com' }],
        destination: `${CANONICAL}/:path*`,
        permanent: true,
      },
      // Legacy page — redirect to home
      {
        source: '/webinar-replay-room',
        destination: CANONICAL,
        permanent: true,
      },
    ]
  },
}

export default nextConfig
