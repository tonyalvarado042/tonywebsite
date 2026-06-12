import Link from 'next/link'
import Image from 'next/image'

const companyLogos = [
  {
    src: '/images/logos/puromtb/logo_puro_mtb.png',
    alt: 'PuroMTB',
    name: 'PuroMTB',
    href: 'https://puromtb.com',
    external: true,
    width: 100,
    height: 30,
    className: 'h-7 w-auto object-contain opacity-70 transition-opacity hover:opacity-95',
  },
  {
    src: '/images/logos/pure-cycling/pure-cycling-logo.png',
    alt: 'Pure Cycling',
    name: 'Pure Cycling',
    href: '/pure-cycling',
    external: false,
    width: 110,
    height: 32,
    className: 'h-7 w-auto object-contain brightness-0 invert opacity-60 transition-opacity hover:opacity-90',
  },
  {
    src: '/images/logos/bike-bed/bike_and_bed_logo.png',
    alt: 'Bike & Bed Hotels',
    name: 'Bike & Bed Hotels',
    href: '/bike-bed-hotels',
    external: false,
    width: 120,
    height: 36,
    className: 'h-7 w-auto object-contain brightness-0 invert opacity-60 transition-opacity hover:opacity-90',
  },
]

const footerLinks = [
  { href: '/sobre-mi', label: 'Sobre mí' },
  { href: '/pure-cycling', label: 'Pure Cycling' },
  { href: '/bike-bed-hotels', label: 'Bike & Bed Hotels' },
  { href: '/libros', label: 'Libros' },
  { href: '/blog', label: 'Blog' },
  { href: '/conferencias', label: 'Conferencias' },
  { href: '/contacto', label: 'Contacto' },
]

const socialLinks = [
  {
    href: 'https://www.facebook.com/profile.php?id=100090599181641',
    label: 'Facebook de Tony Alvarado',
    text: 'f',
  },
  {
    href: 'https://www.linkedin.com/in/tony-alvarado-a1b3a820/',
    label: 'LinkedIn de Tony Alvarado',
    text: 'in',
  },
  {
    href: 'https://www.instagram.com/tony_purecycling/',
    label: 'Instagram de Tony Alvarado',
    text: 'ig',
  },
  {
    href: 'https://x.com/TonyAlvaradocr',
    label: 'X de Tony Alvarado',
    text: 'X',
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">

        {/* Fila superior: logo + redes sociales */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:items-start">
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
            <a
              href="mailto:info@tonyalvarado.com"
              className="mt-2 text-sm text-brand-muted transition-colors hover:text-brand-accent"
            >
              info@tonyalvarado.com
            </a>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, text }) => (
              <Link
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-border bg-brand-card text-sm font-semibold text-brand-muted transition-all duration-200 hover:border-brand-accent hover:text-brand-accent"
              >
                {text}
              </Link>
            ))}
          </div>
        </div>

        {/* Fila media: navegación + empresas */}
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
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
              Legal
            </p>
            <nav className="flex flex-col gap-2">
              <Link href="/politica-de-privacidad" className="text-sm text-brand-muted transition-colors hover:text-brand-text">
                Política de privacidad
              </Link>
              <Link href="/terminos-y-condiciones" className="text-sm text-brand-muted transition-colors hover:text-brand-text">
                Términos y condiciones
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">
              Empresas
            </p>
            <div className="flex flex-col gap-4">
              {companyLogos.map(({ src, alt, name, href, external, width, height, className }) => (
                <Link
                  key={href}
                  href={href}
                  aria-label={alt}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-3"
                >
                  <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={className}
                  />
                  <span className="text-sm text-brand-muted transition-colors group-hover:text-brand-text">
                    {name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Barra inferior: copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-border pt-6 md:flex-row">
          <p className="text-xs text-brand-muted">
            © 2026 Tony Alvarado. Todos los derechos reservados.
          </p>
          <p className="text-xs text-brand-muted/50">San José, Costa Rica</p>
        </div>

      </div>
    </footer>
  )
}
