import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Linkedin } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import Boletin from '@/components/recursos/Boletin'
import TarjetaRecurso from '@/components/recursos/TarjetaRecurso'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { hayCrm, traerRecursosPublicos, type RecursoCrm } from '@/lib/crm'
import { recursosRespaldo } from '@/data/recursos'

const TITULO = 'Recursos gratis — Tony Alvarado'
const DESC =
  'Herramientas y material gratuito sobre el negocio del turismo: cómo se construyen y se operan hoteles, y cómo se corren los números antes de meterse en un proyecto.'

// Los recursos los edita Tony desde el CRM, así que la página no puede ser
// estática: se revalida cada 5 minutos.
export const revalidate = 300

export const metadata = {
  title: TITULO,
  description: DESC,
  alternates: { canonical: '/recursos' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: `${SITE_URL}/recursos`,
    siteName: 'Tony Alvarado',
    title: 'Recursos gratis — Tony Alvarado',
    description: DESC,
    images: [{ url: '/images/og/tony-alvarado-og.jpg', width: 1600, height: 900, alt: 'Recursos gratis de Tony Alvarado' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos gratis — Tony Alvarado',
    description: DESC,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

// ⚠️ Solo redes VERIFICADAS — las mismas del `sameAs` del Person schema.
// Falta YouTube: Tony tiene canal, pero la URL no está confirmada en el repo.
const redes = [
  { href: 'https://www.instagram.com/tony_purecycling/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/in/tony-alvarado-a1b3a820/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.facebook.com/profile.php?id=100090599181641', label: 'Facebook', Icon: Facebook },
]

export default async function RecursosPage() {
  // Si el CRM no responde, se muestra el respaldo en vez de una página vacía.
  const desdeCrm = hayCrm() ? await traerRecursosPublicos() : []
  const recursos: RecursoCrm[] = desdeCrm.length > 0 ? desdeCrm : recursosRespaldo

  // El destacado es el marcado como tal; si ninguno lo está, el primero.
  const destacado = recursos.find((r) => r.destacado) ?? recursos[0]
  const resto = recursos.filter((r) => r.id !== destacado?.id)

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/recursos#webpage`,
    name: TITULO,
    description: DESC,
    url: `${SITE_URL}/recursos`,
    inLanguage: 'es-CR',
    isPartOf: websiteRef,
    about: personRef,
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Recursos gratis', item: `${SITE_URL}/recursos` },
    ],
  }

  const listaSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/recursos#lista`,
    name: 'Recursos gratis de Tony Alvarado',
    numberOfItems: recursos.length,
    itemListElement: recursos.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: r.titulo,
      description: r.descripcion ?? undefined,
    })),
  }

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={listaSchema} />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]
                   bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.16)_0%,transparent_70%)]"
      />

      {/* ══ Perfil ══ */}
      <section className="relative px-5 pb-10 pt-12 sm:px-6 md:pt-16">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="relative">
            <div aria-hidden className="absolute -inset-3 rounded-full bg-brand-green/20 blur-2xl" />
            <Image
              src="/images/tony/tony-alvarado-retrato.jpg"
              alt="Tony Alvarado"
              width={629}
              height={629}
              priority
              quality={90}
              sizes="128px"
              className="relative h-32 w-32 rounded-full object-cover ring-2 ring-brand-green/40"
            />
          </div>

          <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand-text sm:text-4xl">
            Recursos <span className="text-brand-green">gratis</span>
          </h1>

          <p className="mt-3 text-[15px] leading-relaxed text-brand-muted sm:text-base">
            Lo que uso para construir y operar hoteles en La Fortuna de San Carlos.
            Sin costo y sin letra chiquita.
          </p>

          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted/70">
            Tony Alvarado · Costa Rica
          </p>
        </div>
      </section>

      {/* ══ Recursos ══ */}
      <section className="relative px-5 pb-4 sm:px-6">
        <div className="mx-auto max-w-xl space-y-4">

          {destacado && <TarjetaRecurso recurso={destacado} destacada />}

          {resto.map((r) => (
            <TarjetaRecurso key={r.id} recurso={r} destacada={false} />
          ))}

        </div>
      </section>

      {/* ══ Boletín — corto a propósito ══ */}
      <section id="avisame" className="scroll-mt-20 px-5 pb-12 pt-10 sm:px-6">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl border border-brand-border bg-brand-card p-6 sm:p-7">
            <h2 className="mb-2 text-lg font-bold text-brand-text">
              Esta lista va creciendo
            </h2>
            <p className="mb-6 text-[14.5px] leading-relaxed text-brand-muted">
              Dejá tu nombre y tu correo, y te aviso cuando suba algo nuevo.
            </p>
            <Boletin desde="recursos" />
          </div>
        </div>
      </section>

      {/* ══ Redes ══ */}
      <section className="px-5 pb-20 sm:px-6">
        <div className="mx-auto flex max-w-xl flex-col items-center gap-5">
          <div className="h-px w-16 bg-brand-border" />
          <div className="flex items-center gap-3">
            {redes.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-12 w-12 items-center justify-center rounded-2xl
                           border border-brand-border bg-brand-card text-brand-muted
                           transition-colors hover:border-brand-green/40 hover:text-brand-green"
              >
                <Icon size={19} strokeWidth={1.75} />
              </a>
            ))}
          </div>
          <Link
            href="/"
            className="-mx-3 flex min-h-[44px] items-center px-3 text-[13px] font-semibold
                       text-brand-muted transition-colors hover:text-brand-green"
          >
            tonyalvarado.com
          </Link>
        </div>
      </section>
    </main>
  )
}
