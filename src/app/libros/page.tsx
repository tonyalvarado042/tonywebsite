import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, Clock } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef, bookSchema, bookSchema2 } from '@/lib/structured-data'

export const metadata = {
  title: 'Libros de Tony Alvarado — Ciclismo, transformación y liderazgo',
  description:
    'Libros de Tony Alvarado: "Secretos para ser un empresario exitoso" (Amazon) y "Sigue Pedaleando", próximamente. Ciclismo, transformación personal, fe y emprendimiento desde Costa Rica.',
  alternates: { canonical: '/libros' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/libros#webpage`,
  name: 'Libros de Tony Alvarado — Ciclismo, transformación y liderazgo',
  description:
    'Libros de Tony Alvarado: "Secretos para ser un empresario exitoso" (Amazon) y "Sigue Pedaleando", próximamente. Ciclismo, transformación personal, fe y emprendimiento desde Costa Rica.',
  url: `${SITE_URL}/libros`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [
    personRef,
    { '@type': 'Book', '@id': `${SITE_URL}/#secretos-empresario-exitoso` },
    { '@type': 'Book', '@id': `${SITE_URL}/#sigue-pedaleando` },
  ],
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
      <JsonLd data={bookSchema2} />

      {/* Hero + Libro 1 */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Libros de Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold text-brand-text md:text-5xl">
              Dos libros.{' '}
              <span className="text-brand-accent">Dos momentos de su vida.</span>
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
                  Disponible en Amazon
                </span>
              </div>
              <h2 className="text-3xl font-bold text-brand-text">
                Secretos para ser un<br />
                <span className="text-brand-accent">empresario exitoso</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                En este libro, Tony Alvarado comparte los principios que utilizó para construir
                un ecosistema de empresas alrededor del ciclismo durante más de dos décadas.
                No es teoría. Son lecciones aprendidas en el campo, con fracasos, victorias
                y fe en el proceso.
              </p>
              <p className="text-brand-muted">
                Para quien está construyendo algo y necesita saber que sí se puede.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="https://www.amazon.com/dp/B0CCZWJG7S"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Comprar en Amazon
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Libro 2 */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">

          <div className="flex flex-col items-center gap-14 lg:flex-row-reverse">

            <div className="flex justify-center">
              <Image
                src="/images/books/sigue-pedaleando-tony-alvarado.jpg"
                alt="Sigue Pedaleando — Tony Alvarado"
                width={220}
                height={310}
                className="rounded-xl shadow-2xl"
              />
            </div>

            <div className="flex-1 space-y-5">
              <div className="flex items-center gap-2">
                <Clock size={15} className="text-brand-accent" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                  Próximamente en Amazon
                </span>
              </div>
              <h2 className="text-3xl font-bold text-brand-text">
                Sigue<br />
                <span className="text-brand-accent">Pedaleando</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                Sigue Pedaleando es el libro donde Tony Alvarado conecta su historia personal
                con la bicicleta, la disciplina, la fe, la transformación y el propósito.
                Un relato para quienes están atravesando procesos difíciles y necesitan
                recordar que el camino no termina cuando se complica: se sigue pedaleando.
              </p>
              <p className="text-sm text-brand-muted/70">
                Un libro sobre ciclismo, fe y vida.
              </p>
              <div>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-brand-accent hover:underline"
                >
                  Avísame cuando esté disponible →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
