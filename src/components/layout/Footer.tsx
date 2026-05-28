import Link from 'next/link'
import Image from 'next/image'

const footerLinks = [
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/pure-cycling', label: 'Pure Cycling' },
  { href: '/bike-bed-hotels', label: 'Bike & Bed Hotels' },
  { href: '/libros', label: 'Libros' },
  { href: '/blog', label: 'Blog' },
  { href: '/conferencias', label: 'Conferencias' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-xs">
            <Link href="/" aria-label="Tony Alvarado — Inicio">
              <Image
                src="/images/logos/tony-alvarado-logo-white-horizontal.png"
                alt="Tony Alvarado"
                width={150}
                height={38}
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="mt-3 text-sm text-brand-muted">
              Ciclismo, comunidad y Costa Rica.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Navegación
              </p>
              <nav className="flex flex-col gap-2 text-sm text-brand-muted">
                {footerLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="transition-colors hover:text-brand-text"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">
                Empresas
              </p>
              <div className="flex flex-col gap-2 text-sm text-brand-muted">
                <span>PuroMTB</span>
                <span>Pure Cycling</span>
                <span>Bike & Bed Hotels</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-brand-border pt-6 md:flex-row">
          <p className="text-xs text-brand-muted">
            © 2026 Tony Alvarado. Todos los derechos reservados.
          </p>
          <p className="text-xs text-brand-muted/50">San José, Costa Rica</p>
        </div>
      </div>
    </footer>
  )
}
