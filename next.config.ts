import type { NextConfig } from 'next'

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
   * Se reescriben SOLO las dos rutas de la landing, no `/:path*`. Con un
   * comodín, `/_next/...`, `/images/...` y `/api/...` también se reescribirían
   * y el subdominio quedaría sin estáticos ni formulario.
   *
   * El redirect de abajo (apex → www) compara el host EXACTO `tonyalvarado.com`,
   * así que no se lleva puesto este subdominio.
   */
  async rewrites() {
    const enElSubdominio = [{ type: 'host' as const, value: 'clase.tonyalvarado.com' }]
    return [
      { source: '/', has: enElSubdominio, destination: '/clase' },
      { source: '/gracias', has: enElSubdominio, destination: '/clase/gracias' },
    ]
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
