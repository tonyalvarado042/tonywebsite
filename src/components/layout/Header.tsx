'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import type { Locale } from '@/lib/i18n'

const navLinks = [
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/conferencias', label: 'Conferencias' },
  { href: '/libros', label: 'Libros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

const empresasLinks = [
  { href: '/puromtb', label: 'PuroMTB' },
  { href: '/pure-cycling', label: 'Pure Cycling' },
  { href: '/bike-bed-hotels', label: 'Bike & Bed Hotels' },
]

const empresasLinksEn = [
  { href: '/puromtb', label: 'PuroMTB · ES' },
  { href: '/pure-cycling', label: 'Pure Cycling · ES' },
  { href: '/bike-bed-hotels', label: 'Bike & Bed Hotels · ES' },
]

interface HeaderProps {
  locale?: Locale
}

export default function Header({ locale = 'es' }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const t = locale === 'en'
    ? { companies: 'Companies', cta: 'Join Pure Cycling · ES', menuLabel: 'Open menu' }
    : { companies: 'Empresas',  cta: 'Únete a Pure Cycling', menuLabel: 'Abrir menú' }

  const currentNavLinks = locale === 'en' ? [] : navLinks
  const currentEmpresasLinks = locale === 'en' ? empresasLinksEn : empresasLinks
  const homeHref = locale === 'en' ? '/en' : '/'

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          <Link href={homeHref} className="flex items-center" aria-label="Tony Alvarado — Home">
            <Image
              src="/images/logos/tony-alvarado-logo-white-horizontal.png"
              alt="Tony Alvarado"
              width={160}
              height={40}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm md:flex">
            {currentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-muted transition-colors hover:text-brand-text"
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown Empresas / Companies */}
            <div className="group relative">
              <button type="button" className="flex items-center gap-1 text-brand-muted transition-colors hover:text-brand-text">
                {t.companies}
                <ChevronDown size={13} className="mt-px transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-52 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-2xl">
                  {currentEmpresasLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      {...(locale === 'en' ? { hrefLang: 'es' } : {})}
                      className="block px-4 py-3 text-sm text-brand-muted transition-colors hover:bg-brand-card hover:text-brand-text"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {/* Selector de idioma — desktop */}
            <div className="hidden items-center md:flex">
              <LanguageSwitcher />
            </div>
            <Link
              href="/pure-cycling"
              {...(locale === 'en' ? { hrefLang: 'es' } : {})}
              className="hidden rounded-full bg-brand-green px-5 py-2 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90 md:block"
            >
              {t.cta}
            </Link>
            <button
              type="button"
              className="text-brand-muted md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.menuLabel}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-border bg-brand-bg px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            {currentNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-muted hover:text-brand-text"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Empresas en mobile */}
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-green">
                {t.companies}
              </p>
              <div className="flex flex-col gap-3 pl-2">
                {currentEmpresasLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    {...(locale === 'en' ? { hrefLang: 'es' } : {})}
                    className="text-brand-muted hover:text-brand-text"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/pure-cycling"
              {...(locale === 'en' ? { hrefLang: 'es' } : {})}
              className="mt-2 rounded-full bg-brand-green px-5 py-2.5 text-center text-sm font-semibold text-brand-bg"
              onClick={() => setMenuOpen(false)}
            >
              {t.cta}
            </Link>

            {/* Selector de idioma — mobile */}
            <div className="mt-2 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
