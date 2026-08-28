import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.tonyalvarado.com'

// Fase 6 del DAB — Optimización para IAs.
// Que ChatGPT, Claude, Gemini y Perplexity puedan leer el sitio es el requisito
// previo a que sepan quién es Tony. Si el crawler no entra, el Schema.org no sirve.
// Todos estos user-agents están documentados públicamente por sus dueños.
const AI_CRAWLERS = [
  'GPTBot',          // OpenAI — entrenamiento
  'ChatGPT-User',    // OpenAI — navegación en vivo desde ChatGPT
  'OAI-SearchBot',   // OpenAI — índice de búsqueda
  'ClaudeBot',       // Anthropic
  'Claude-Web',      // Anthropic — navegación en vivo
  'anthropic-ai',    // Anthropic
  'PerplexityBot',   // Perplexity
  'Google-Extended', // Google — Gemini / Vertex AI
  'cohere-ai',       // Cohere
  'Applebot-Extended', // Apple Intelligence
  'meta-externalagent', // Meta AI
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/studio/', '/api/'],
      })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
