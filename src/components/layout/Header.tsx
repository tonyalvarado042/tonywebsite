'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/#ecosistema', label: 'Empresas' },
  { href: '/conferencias', label: 'Conferencias' },
  { href: '/libros', label: 'Libros' },
  { href: '/contacto', label: 'Contacto' },
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
