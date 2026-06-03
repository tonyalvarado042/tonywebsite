import Image from 'next/image'
import Link from 'next/link'
import { BookOpen, CheckCircle2, Clock } from 'lucide-react'
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

const libro1Bullets = [
  'Construir empresas con propósito y sin atajos',
  'La fe como base de cada decisión empresarial',
  'Disciplina y liderazgo aplicados en la práctica real',
  'Por qué el ciclismo y el emprendimiento comparten el mismo lenguaje',
]

const missionThemes = [
  'Emprendimiento', 'Ciclismo', 'Propósito', 'Disciplina', 'Fe', 'Transformación',
]

export default function LibrosPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookSchema} />
      <JsonLd data={bookSchema2} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Libros de Tony Alvarado
          </p>
          <h1 className="text-4xl font-bold text-brand-text md:text-5xl">
            Dos libros.{' '}
            <span className="text-brand-accent">Dos momentos de su vida.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Dos perspectivas del mismo camino: el empresario que construye con fe y
            el hombre que aprendió a pedalear hacia adelante cuando el terreno se complica.
          </p>
        </div>
      </section>

      {/* Libro 1 */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col items-center gap-14 lg:flex-row">

            <div className="flex justify-center lg:flex-shrink-0">
              <div className="rounded-2xl bg-white p-4 shadow-2xl">
                <Image
                  src="/images/books/libro-secretos-mockup.jpg"
                  alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                  width={300}
                  height={210}
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
              <p className="text-sm text-brand-muted">
                Para quien está construyendo algo y necesita saber que sí se puede.
              </p>
              <ul className="space-y-2 pt-1">
                {libro1Bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-brand-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-1">
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

      {/* Una misma misión */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Una misma misión
          </p>
          <p className="text-lg font-medium leading-relaxed text-brand-text">
            Detrás de cada libro hay un hilo conductor: que la bicicleta, la fe, la disciplina
            y el propósito pueden transformar una vida.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brand-muted">
            Tony no escribe desde la teoría. Escribe desde el campo, con cicatrices
            y victorias incluidas. Sus libros son para quienes quieren construir algo
            real y necesitan saber que el camino sí existe.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {missionThemes.map((theme) => (
              <span
                key={theme}
                className="rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-accent"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Libro 2 */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">

          <div className="flex flex-col items-center gap-14 lg:flex-row-reverse">

            <div className="flex justify-center lg:flex-shrink-0">
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
                  Libro terminado · Publicación próxima en Amazon
                </span>
              </div>
              <h2 className="text-3xl font-bold text-brand-text">
                Sigue<br />
                <span className="text-brand-accent">Pedaleando</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                La bicicleta acompañó a Tony desde niño. A los 16 años, después de un accidente
                que cambió su vida, se convirtió en una herramienta de reconstrucción, fe,
                propósito y perseverancia. <em>Sigue Pedaleando</em> es un libro sobre continuar
                cuando el camino se complica, no rendirse y avanzar con propósito.
              </p>
              <p className="text-brand-muted text-left md:text-justify">
                Un libro sobre ciclismo, fe y vida. Para quienes atraviesan momentos difíciles
                y necesitan recordar que el camino no termina cuando se complica.
              </p>
              <div className="rounded-xl border border-brand-accent/20 bg-brand-card px-5 py-4">
                <p className="text-xs text-brand-muted/70">
                  El libro ya está escrito y pronto estará disponible para compra en Amazon.
                  Déjanos tu contacto para avisarte en cuanto esté publicado.
                </p>
              </div>
              <div>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-1 rounded-full border border-brand-accent/50 px-6 py-2 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
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
