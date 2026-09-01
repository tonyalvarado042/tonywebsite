import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PuertaDeRecurso from '@/components/recursos/PuertaDeRecurso'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { hayCrm, traerRecursoPorSlug } from '@/lib/crm'
import { acentoDe, iconoDe, recursosRespaldo } from '@/data/recursos'

/** La puerta de un recurso: se registra y se lo entregamos. */

// Los recursos se editan desde el CRM, así que esto no puede prerenderizarse.
export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string }> }

async function buscar(slug: string) {
  if (hayCrm()) {
    const r = await traerRecursoPorSlug(slug)
    if (r) return r
  }
  return recursosRespaldo.find((r) => r.slug === slug) ?? null
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const r = await buscar(slug)
  if (!r) return {}

  const titulo = `${r.titulo} — gratis`
  return {
    title: `${titulo} | Tony Alvarado`,
    description: r.descripcion ?? undefined,
    alternates: { canonical: `/recursos/${r.slug}` },
    openGraph: {
      type: 'website',
      locale: 'es_CR',
      url: `${SITE_URL}/recursos/${r.slug}`,
      siteName: 'Tony Alvarado',
      title: titulo,
      description: r.descripcion ?? undefined,
      images: [{ url: '/images/og/tony-alvarado-og.jpg', width: 1600, height: 900, alt: r.titulo }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titulo,
      description: r.descripcion ?? undefined,
      images: ['/images/og/tony-alvarado-og.jpg'],
    },
  }
}

export default async function PuertaPage({ params }: Props) {
  const { slug } = await params
  const recurso = await buscar(slug)
  if (!recurso) notFound()

  const a = acentoDe(recurso.acento)
  const Icono = iconoDe(recurso.icono)
  const disponible = recurso.estado === 'disponible' && Boolean(recurso.destino_url)

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/recursos/${recurso.slug}#webpage`,
    name: recurso.titulo,
    description: recurso.descripcion ?? undefined,
    url: `${SITE_URL}/recursos/${recurso.slug}`,
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
      { '@type': 'ListItem', position: 3, name: recurso.titulo, item: `${SITE_URL}/recursos/${recurso.slug}` },
    ],
  }

  return (
    <main className="relative min-h-screen bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-[420px] ${a.resplandor}`} />

      <section className="relative px-5 pb-20 pt-10 sm:px-6 sm:pt-14">
        <div className="mx-auto max-w-lg">
          <Link
            href="/recursos"
            className="mb-9 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium
                       text-brand-muted transition-colors hover:text-brand-text"
          >
            <ArrowLeft size={15} />
            Recursos gratis
          </Link>

          <span className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl
                            ${a.fondoSuave} ring-1 ${a.anillo}`}>
            <Icono size={24} className={a.texto} strokeWidth={1.75} />
          </span>

          {recurso.formato && (
            <p className={`mb-3 text-[11px] font-bold uppercase tracking-[0.16em] ${a.texto}`}>
              {recurso.formato}
            </p>
          )}

          <h1 className="mb-4 text-[28px] font-bold leading-[1.15] tracking-tight text-brand-text sm:text-4xl">
            {recurso.titulo}
          </h1>

          {recurso.gancho && (
            <p className={`mb-5 text-lg font-semibold leading-snug ${a.texto}`}>{recurso.gancho}</p>
          )}

          <p className="mb-9 text-[15px] leading-[1.75] text-brand-muted">{recurso.descripcion}</p>

          {disponible && recurso.con_registro === false ? (
            /* Recurso de entrada libre: no hay formulario, se entra y ya.
               La calculadora de Airbnb tiene además su propia página, que
               gana sobre esta ruta; esto queda para los que vengan después. */
            <Link
              href={recurso.destino_url!}
              className={`inline-flex min-h-[52px] w-full items-center justify-center gap-2
                          rounded-2xl px-6 text-[15px] font-bold ${a.boton}
                          transition-opacity hover:opacity-90`}
            >
              Abrirla gratis
            </Link>
          ) : disponible ? (
            <PuertaDeRecurso
              slug={recurso.slug}
              titulo={recurso.titulo}
              destino={recurso.destino_url!}
              acento={(recurso.acento as 'morado' | 'dorado' | 'calido') ?? 'morado'}
              llamado={recurso.tipo === 'pdf' ? 'Descargar gratis' : 'Leerlo gratis'}
            />
          ) : (
            <div className="rounded-3xl border border-brand-border bg-brand-card p-7 text-center">
              <p className="mb-2 text-lg font-bold text-brand-text">Todavía no está listo</p>
              <p className="mb-7 text-[15px] leading-relaxed text-brand-muted">
                Estoy terminándolo. Dejá tu correo en la página de recursos y te aviso
                apenas lo publique.
              </p>
              <Link
                href="/recursos#avisame"
                className={`inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl
                            px-6 text-[15px] font-bold ${a.boton} transition-opacity hover:opacity-90`}
              >
                Avisame cuando salga
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
