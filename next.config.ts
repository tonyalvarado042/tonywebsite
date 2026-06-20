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
