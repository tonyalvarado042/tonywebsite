export type Locale = 'es' | 'en'

const routePairs: Array<{ es: string; en: string }> = [
  { es: '/',             en: '/en' },
  { es: '/sobre-mi',     en: '/en/about' },
  { es: '/libros',       en: '/en/books' },
  { es: '/conferencias', en: '/en/speaking' },
  { es: '/contacto',     en: '/en/contact' },
]

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es'
}

function getEquivalentRoute(currentPath: string, targetLocale: Locale): string | null {
  if (targetLocale === 'en') {
    return routePairs.find((p) => p.es === currentPath)?.en ?? null
  }
  return routePairs.find((p) => p.en === currentPath)?.es ?? null
}

// Si existe par exacto → navegar a él. Si no → raíz del idioma destino.
export function navigateTo(currentPath: string, targetLocale: Locale): string {
  return getEquivalentRoute(currentPath, targetLocale) ?? (targetLocale === 'en' ? '/en' : '/')
}
