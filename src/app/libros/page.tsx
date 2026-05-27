import Image from 'next/image'
import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef, bookSchema } from '@/lib/structured-data'

export const metadata = {
  title: 'Libros de Tony Alvarado — Ciclismo, transformación y liderazgo',
  description:
    'Libros de Tony Alvarado: "Secretos para ser un empresario exitoso", disponible en Amazon. Reflexiones sobre ciclismo, transformación personal y liderazgo empresarial desde Costa Rica.',
  alternates: { canonical: '/libros' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/libros#webpage`,
  name: 'Libros de Tony Alvarado — Ciclismo, transformación y liderazgo',
  description:
    'Libros de Tony Alvarado: "Secretos para ser un empresario exitoso", disponible en Amazon. Reflexiones sobre ciclismo, transformación personal y liderazgo empresarial desde Costa Rica.',
  url: `${SITE_URL}/libros`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Book', '@id': `${SITE_URL}/#secretos-empresario-exitoso` }],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Libros', item: `${SITE_URL}/libros` },
  ],
}

export default function LibrosPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookSchema} />

      {/* Hero + libro */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Libros de Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold text-brand-text md:text-5xl">
              22 años de empresas.{' '}
              <span className="text-brand-accent">Un libro para contarlo.</span>
            </h1>
          </div>

          <div className="flex flex-col items-center gap-14 lg:flex-row">

            <div className="flex justify-center">
              <div className="rounded-2xl bg-white p-4 shadow-2xl">
                <Image
                  src="/images/books/libro-secretos-mockup.jpg"
                  alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                  width={320}
                  height={220}
                  className="rounded-lg"
                />
              </div>
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-brand-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Publicado en Amazon
                </span>
              </div>
              <h2 className="text-3xl font-bold text-brand-text">
                Secretos para ser un<br />
                <span className="text-brand-accent">empresario exitoso</span>
              </h2>
              <p className="text-brand-muted">
                En este libro, Tony Alvarado comparte los principios que utilizó para construir
                un ecosistema de empresas alrededor del ciclismo durante más de dos décadas.
                No es teoría. Son lecciones aprendidas en el campo, con fracasos, victorias
                y fe en el proceso.
              </p>
              <p className="text-brand-muted">
                Para quien está construyendo algo y necesita saber que sí se puede.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <span className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent">
                  Enlace de compra próximamente
                </span>
                <p className="text-xs text-brand-muted/60">
                  El enlace de compra estará disponible pronto en esta página.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Segundo libro */}
      <section className="bg-brand-surface py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              En desarrollo
            </h2>
          </div>
          <div className="rounded-xl border border-dashed border-brand-border bg-brand-card p-7">
            <p className="font-semibold text-brand-text">Próximo libro de Tony Alvarado</p>
            <p className="mt-2 text-sm text-brand-muted">
              Tony está desarrollando un segundo libro sobre ciclismo, transformación
              personal y su historia de vida. El título está en definición.
              Si quieres saber cuándo estará disponible, escríbenos.
            </p>
            <div className="mt-5">
              <Link
                href="/contacto"
                className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:underline"
              >
                Avísame cuando salga →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
