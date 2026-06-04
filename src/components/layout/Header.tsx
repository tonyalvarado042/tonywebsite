'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'

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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-brand-bg/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Tony Alvarado — Inicio">
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
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-brand-muted transition-colors hover:text-brand-text"
              >
                {link.label}
              </Link>
            ))}

            {/* Dropdown Empresas */}
            <div className="group relative">
              <button className="flex items-center gap-1 text-brand-muted transition-colors hover:text-brand-text">
                Empresas
                <ChevronDown size={13} className="mt-px transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-52 overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-2xl">
                  {empresasLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-3 text-sm text-brand-muted transition-colors hover:bg-brand-card hover:text-brand-text"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/pure-cycling"
              className="hidden rounded-full bg-brand-accent px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 md:block"
            >
              Únete a Pure Cycling
            </Link>
            <button
              className="text-brand-muted md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-border bg-brand-bg px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => (
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
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Empresas
              </p>
              <div className="flex flex-col gap-3 pl-2">
                {empresasLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
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
              className="mt-2 rounded-full bg-brand-accent px-5 py-2.5 text-center text-sm font-semibold text-white"
              onClick={() => setMenuOpen(false)}
            >
              Únete a Pure Cycling
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
