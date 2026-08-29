import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Bell, Facebook, Instagram, Linkedin } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { recursos, acentoClases } from '@/data/recursos'

const TITULO = 'Recursos gratis — Tony Alvarado'
const DESC =
  'Herramientas y material gratuito sobre el negocio del turismo: cómo se construyen y se operan hoteles, y cómo se corren los números antes de meterse en un proyecto.'

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
    images: [
      {
        url: '/images/og/tony-alvarado-og.jpg',
        width: 1600,
        height: 900,
        alt: 'Recursos gratis de Tony Alvarado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recursos gratis — Tony Alvarado',
    description: DESC,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

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
    description: r.descripcion,
  })),
}

// ⚠️ Solo redes VERIFICADAS. Son exactamente las mismas del `sameAs` del
// Person schema en src/lib/structured-data.ts — no se agrega ninguna que no
// esté confirmada (regla 24 del CLAUDE.md de este repo).
// Falta YouTube: Tony tiene canal, pero la URL no está confirmada en el repo.
const redes = [
  { href: 'https://www.instagram.com/tony_purecycling/', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.linkedin.com/in/tony-alvarado-a1b3a820/', label: 'LinkedIn', Icon: Linkedin },
  { href: 'https://www.facebook.com/profile.php?id=100090599181641', label: 'Facebook', Icon: Facebook },
]

export default function RecursosPage() {
  const [destacado, ...resto] = recursos

  return (
    <main className="min-h-screen bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={listaSchema} />

      {/* Resplandor de fondo, una sola fuente de luz */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]
                   bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(139,92,246,0.16)_0%,transparent_70%)]"
      />

      {/* ══ Perfil ══ */}
      <section className="relative px-5 pb-10 pt-12 sm:px-6 md:pt-16">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full bg-brand-green/20 blur-2xl"
            />
            <Image
              src="/images/tony/tony-alvarado-retrato.jpg"
              alt="Tony Alvarado"
              width={629}
              height={629}
              priority
              quality={90}
              sizes="128px"
              className="relative h-32 w-32 rounded-full object-cover
                         ring-2 ring-brand-green/40"
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

          {/* ── El destacado: más alto, con gancho grande ── */}
          {destacado && (() => {
            const a = acentoClases[destacado.acento]
            const Icono = destacado.icono
            const disponible = destacado.estado === 'disponible'

            // Siempre a la puerta del recurso, nunca al archivo directo:
            // ahí se pide nombre, correo y WhatsApp antes de entregarlo.
            return (
              <Link
                href={`/recursos/${destacado.slug}`}
                className={`group relative block overflow-hidden rounded-3xl border ${a.borde} ${a.bordeHover}
                            bg-brand-card p-6 transition-colors duration-300 sm:p-8`}
              >
                {/* Foto arriba, a lo ancho. Es lo que hace que den ganas de tocarla. */}
                <div className="relative -mx-6 -mt-6 mb-6 aspect-[16/10] overflow-hidden sm:-mx-8 sm:-mt-8">
                  <Image
                    src={destacado.imagen}
                    alt={destacado.imagenAlt}
                    fill
                    priority
                    quality={90}
                    sizes="(min-width: 640px) 576px, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  {/* Funde la foto con la tarjeta para que no quede un corte duro */}
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-card to-transparent" />

                  <span
                    className={`absolute left-4 top-4 flex h-11 w-11 items-center justify-center
                                rounded-2xl bg-brand-bg/80 backdrop-blur-sm ring-1 ${a.anillo}`}
                  >
                    <Icono size={20} className={a.texto} strokeWidth={1.75} />
                  </span>

                  <span
                    className={`absolute right-4 top-4 rounded-full bg-brand-bg/80 px-3 py-1
                                text-[10px] font-bold uppercase tracking-[0.14em] backdrop-blur-sm
                                ${a.texto} ring-1 ${a.anillo}`}
                  >
                    {disponible ? destacado.formato : 'Próximamente'}
                  </span>
                </div>

                <div className="relative">
                  <p className={`mb-2 text-[11px] font-bold uppercase tracking-[0.16em] ${a.texto}`}>
                    {destacado.titulo}
                  </p>

                  <h2 className="mb-3 text-[22px] font-bold leading-[1.2] tracking-tight text-brand-text sm:text-[26px]">
                    {destacado.gancho}
                  </h2>

                  <p className="mb-7 text-[15px] leading-[1.7] text-brand-muted">
                    {destacado.descripcion}
                  </p>

                  <span
                    className={`flex min-h-[54px] w-full items-center justify-center gap-2.5
                                rounded-2xl px-6 text-[15px] font-bold ${a.boton}
                                transition-opacity group-hover:opacity-90`}
                  >
                    {!disponible && <Bell size={16} />}
                    {destacado.cta}
                    {disponible && (
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    )}
                  </span>
                </div>
              </Link>
            )
          })()}

          {/* ── El resto: fila compacta, mismo peso entre sí ── */}
          {resto.map((r) => {
            const a = acentoClases[r.acento]
            const Icono = r.icono
            const disponible = r.estado === 'disponible'

            return (
              <Link
                key={r.slug}
                href={`/recursos/${r.slug}`}
                className={`group relative flex min-h-[92px] items-center gap-4 overflow-hidden
                            rounded-2xl border ${a.borde} ${a.bordeHover} bg-brand-card
                            p-5 transition-colors duration-300 sm:gap-5 sm:p-6`}
              >
                <div aria-hidden className={`pointer-events-none absolute inset-0 ${a.resplandor}`} />

                {/* Miniatura cuadrada: da cara a la tarjeta sin robarle altura */}
                <span className={`relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl
                                  ring-1 ${a.anillo} sm:h-[76px] sm:w-[76px]`}>
                  <Image
                    src={r.imagen}
                    alt={r.imagenAlt}
                    fill
                    quality={80}
                    sizes="76px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-brand-bg/45"
                  >
                    <Icono size={20} className={a.texto} strokeWidth={2} />
                  </span>
                </span>

                <div className="relative min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h2 className="text-[15px] font-bold leading-snug text-brand-text sm:text-base">
                      {r.titulo}
                    </h2>
                    {!disponible && (
                      <span className={`text-[10px] font-bold uppercase tracking-[0.12em] ${a.texto}`}>
                        Próximamente
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-[13.5px] leading-snug text-brand-muted">
                    {r.gancho}
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className={`relative shrink-0 ${a.texto} transition-transform duration-300
                              group-hover:translate-x-0.5`}
                />
              </Link>
            )
          })}
        </div>
      </section>

      {/* ══ Nota de honestidad ══ */}
      <section className="px-5 pb-10 pt-6 sm:px-6">
        <p className="mx-auto max-w-xl text-center text-[13px] leading-relaxed text-brand-muted/80">
          Esta lista va creciendo. Dejá tu correo abajo y te aviso cuando suba uno nuevo —
          no mando nada más que eso.
        </p>
      </section>

      {/* ══ Avisame ══ */}
      <section id="avisame" className="scroll-mt-20 px-5 pb-12 sm:px-6">
        <div className="mx-auto max-w-xl">
          <ContactFormEmbed
            heading="Avisame de los recursos nuevos"
            subheading="Dejá tu correo y te escribo cuando publique el próximo. Elegí «Contacto general» como interés."
            locale="es"
          />
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
          {/* px/py generosos: en móvil el área de toque tiene que llegar a 44px */}
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
