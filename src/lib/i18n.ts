export type Locale = 'es' | 'en'

// Ampliar aquí cuando se creen nuevas páginas inglesas.
const routePairs: Array<{ es: string; en: string }> = [
  { es: '/', en: '/en' },
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
