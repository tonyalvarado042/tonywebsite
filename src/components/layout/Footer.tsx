import Link from 'next/link'
import Image from 'next/image'
import type { Locale } from '@/lib/i18n'

const companyLogos = [
  {
    src: '/images/logos/puromtb/logo_puro_mtb.png',
    alt: 'PuroMTB',
    name: 'PuroMTB',
    href: 'https://puromtb.com',
    hrefEn: '/en/puromtb',
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
    hrefEn: '/en/pure-cycling',
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
    hrefEn: '/en/bike-bed-hotels',
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

const footerLinksEn = [
  { href: '/en',                 label: 'Home',              hrefLang: undefined as string | undefined },
  { href: '/en/about',           label: 'About',             hrefLang: undefined as string | undefined },
  { href: '/en/speaking',        label: 'Speaking',          hrefLang: undefined as string | undefined },
  { href: '/en/books',           label: 'Books',             hrefLang: undefined as string | undefined },
  { href: '/en/contact',         label: 'Contact',           hrefLang: undefined as string | undefined },
  { href: '/en/pure-cycling',    label: 'Pure Cycling',      hrefLang: undefined as string | undefined },
  { href: '/en/bike-bed-hotels', label: 'Bike & Bed Hotels', hrefLang: undefined as string | undefined },
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

export default function Footer({ locale = 'es' }: { locale?: Locale }) {
  const t = locale === 'en'
    ? {
        tagline: 'Cycling, community and Costa Rica.',
        nav: 'Navigation',
        legal: 'Legal',
        companies: 'Companies',
        privacy: 'Privacy Policy · ES',
        terms: 'Terms & Conditions · ES',
        copyright: '© 2026 Tony Alvarado. All rights reserved.',
      }
    : {
        tagline: 'Ciclismo, comunidad y Costa Rica.',
        nav: 'Navegación',
        legal: 'Legal',
        companies: 'Empresas',
        privacy: 'Política de privacidad',
        terms: 'Términos y condiciones',
        copyright: '© 2026 Tony Alvarado. Todos los derechos reservados.',
      }

  const homeHref = locale === 'en' ? '/en' : '/'
  const currentFooterLinks = locale === 'en' ? footerLinksEn : footerLinks.map((l) => ({ ...l, hrefLang: undefined as string | undefined }))

  return (
    <footer className="border-t border-brand-border bg-brand-bg">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">

        {/* Fila superior: logo + redes sociales */}
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-center md:items-start">
            <Link href={homeHref} aria-label="Tony Alvarado — Home">
              <Image
                src="/images/logos/tony-alvarado-logo-white-horizontal.png"
                alt="Tony Alvarado"
                width={150}
                height={38}
                className="h-8 w-auto opacity-90"
              />
            </Link>
            <p className="mt-3 text-sm text-brand-muted">
              {t.tagline}
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
              {t.nav}
            </p>
            <nav className="flex flex-col gap-2 text-sm text-brand-muted">
              {currentFooterLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  {...(link.hrefLang ? { hrefLang: link.hrefLang } : {})}
                  className="transition-colors hover:text-brand-text"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">
              {t.legal}
            </p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/politica-de-privacidad"
                {...(locale === 'en' ? { hrefLang: 'es' } : {})}
                className="text-sm text-brand-muted transition-colors hover:text-brand-text"
              >
                {t.privacy}
              </Link>
              <Link
                href="/terminos-y-condiciones"
                {...(locale === 'en' ? { hrefLang: 'es' } : {})}
                className="text-sm text-brand-muted transition-colors hover:text-brand-text"
              >
                {t.terms}
              </Link>
            </nav>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-accent">
              {t.companies}
            </p>
            <div className="flex flex-col gap-4">
              {companyLogos.map(({ src, alt, name, href, hrefEn, external, width, height, className }) => {
                const resolvedHref = locale === 'en' && hrefEn ? hrefEn : href
                const isExternal = external && !(locale === 'en' && hrefEn)
                return (
                  <Link
                    key={href}
                    href={resolvedHref}
                    aria-label={alt}
                    {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
                )
              })}
            </div>
          </div>
        </div>

        {/* Barra inferior: copyright */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-brand-border pt-6 md:flex-row">
          <p className="text-xs text-brand-muted">
            {t.copyright}
          </p>
          <p className="text-xs text-brand-muted/50">San José, Costa Rica</p>
        </div>

      </div>
    </footer>
  )
}
