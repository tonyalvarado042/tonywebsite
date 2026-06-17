'use client'

import { usePathname, useRouter } from 'next/navigation'
import { getLocaleFromPathname, navigateTo, type Locale } from '@/lib/i18n'

export default function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const currentLocale = getLocaleFromPathname(pathname)

  function handleSwitch(target: Locale) {
    if (target === currentLocale) return
    document.cookie = `NEXT_LOCALE=${target};path=/;max-age=31536000;SameSite=Lax`
    router.push(navigateTo(pathname, target))
  }

  return (
    <div
      className="flex items-center gap-0.5 text-xs font-semibold"
      role="group"
      aria-label="Language / Idioma"
    >
      <button
        type="button"
        aria-pressed={currentLocale === 'es'}
        onClick={() => handleSwitch('es')}
        className={`rounded px-1.5 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
          currentLocale === 'es' ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'
        }`}
      >
        ES
      </button>
      <span className="text-brand-border" aria-hidden>|</span>
      <button
        type="button"
        aria-pressed={currentLocale === 'en'}
        onClick={() => handleSwitch('en')}
        className={`rounded px-1.5 py-0.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
          currentLocale === 'en' ? 'text-brand-text' : 'text-brand-muted hover:text-brand-text'
        }`}
      >
        EN
      </button>
    </div>
  )
}
