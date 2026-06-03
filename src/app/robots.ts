import { MetadataRoute } from 'next'

// TODO: cambiar a https://tonyalvarado.com cuando el dominio final esté conectado.
const BASE_URL = 'https://tonywebsite-three.vercel.app'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
