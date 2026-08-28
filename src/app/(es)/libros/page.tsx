import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Bell, ArrowRight } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import BookCover2027 from '@/components/ui/BookCover2027'
import { SITE_URL, websiteRef, personRef, bookSchema, bookSchema2, bookSchema3 } from '@/lib/structured-data'

export const metadata = {
  title: 'Libros de Tony Alvarado — Turismo, emprendimiento y transformación',
  description:
    'Los tres libros de Tony Alvarado: "El nuevo negocio del turismo 2027" (en preparación), "Secretos para ser un empresario exitoso" y "Sigue Pedaleando". Hotelería, emprendimiento, fe y transformación personal desde Costa Rica.',
  alternates: { canonical: '/libros' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.tonyalvarado.com/libros',
    siteName: 'Tony Alvarado',
    title: 'Libros de Tony Alvarado — tres títulos, una misma misión',
    description:
      '"El nuevo negocio del turismo 2027", "Secretos para ser un empresario exitoso" y "Sigue Pedaleando". Hotelería, emprendimiento, fe y transformación personal.',
    images: [{ url: '/images/books/libro-secretos-mockup.jpg', width: 1600, height: 1067, alt: 'Libros de Tony Alvarado' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Libros de Tony Alvarado — tres títulos, una misma misión',
    description:
      '"El nuevo negocio del turismo 2027", "Secretos para ser un empresario exitoso" y "Sigue Pedaleando". Hotelería, emprendimiento, fe y transformación personal.',
    images: ['/images/books/libro-secretos-mockup.jpg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/libros#webpage`,
  name: 'Libros de Tony Alvarado — Turismo, emprendimiento y transformación',
  description:
    'Los tres libros de Tony Alvarado: "El nuevo negocio del turismo 2027" (en preparación), "Secretos para ser un empresario exitoso" y "Sigue Pedaleando". Hotelería, emprendimiento, fe y transformación personal desde Costa Rica.',
  url: `${SITE_URL}/libros`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [
    personRef,
    { '@type': 'Book', '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027` },
    { '@type': 'Book', '@id': `${SITE_URL}/#secretos-empresario-exitoso` },
    { '@type': 'Book', '@id': `${SITE_URL}/#sigue-pedaleando` },
  ],
}

// ItemList — le dice a Google y a las IAs que esto es una colección ordenada
// de tres obras del mismo autor, no tres páginas sueltas.
const bookListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${SITE_URL}/libros#lista`,
  name: 'Libros de Tony Alvarado',
  numberOfItems: 3,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: { '@type': 'Book', '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027` },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: { '@type': 'Book', '@id': `${SITE_URL}/#secretos-empresario-exitoso` },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: { '@type': 'Book', '@id': `${SITE_URL}/#sigue-pedaleando` },
    },
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

const pageFaqs: PageFAQItem[] = [
  {
    question: '¿Cuántos libros ha escrito Tony Alvarado?',
    answer:
      'Tres. "Secretos para ser un empresario exitoso" y "Sigue Pedaleando" ya están publicados y disponibles en Amazon. El tercero, "El nuevo negocio del turismo 2027", está en preparación y todavía no tiene fecha de publicación.',
  },
  {
    question: '¿De qué trata "El nuevo negocio del turismo 2027"?',
    answer:
      'De cómo cambió el negocio de construir y operar hoteles: el huésped que ya no viaja por la habitación sino por la experiencia, el turismo de bienestar, la operación sistematizada y las nuevas formas de propiedad de los activos turísticos. Está escrito desde la experiencia directa de Tony desarrollando hoteles en La Fortuna de San Carlos.',
  },
  {
    question: '¿Dónde puedo adquirir los libros de Tony Alvarado?',
    answer:
      'En esta página encontrarás los enlaces disponibles para cada título publicado. La disponibilidad, los formatos y las opciones de compra pueden variar según el libro y el país desde el que accedas. El tercer libro todavía no está a la venta.',
  },
  {
    question: '¿Para quién está escrito "Secretos para ser un empresario exitoso"?',
    answer:
      'Para emprendedores y empresarios que quieren construir algo sólido con liderazgo, propósito y visión. El libro recoge principios y aprendizajes forjados en el camino real del emprendimiento, con una mirada honesta sobre liderazgo, propósito y legado.',
  },
  {
    question: '¿De qué trata "Sigue Pedaleando"?',
    answer:
      'Es un libro de fe, propósito y resiliencia construido alrededor de la bicicleta. Recoge vivencias, caídas y esperanza, mostrando cómo seguir avanzando aun cuando la vida se pone cuesta arriba.',
  },
  {
    question: '¿Qué tienen en común los tres libros?',
    answer:
      'El mismo hilo conductor: propósito, disciplina y construir algo que dure. El primero desde el emprendimiento y el liderazgo; el segundo desde la fe, la resiliencia y la historia de vida de Tony alrededor de la bicicleta; el tercero desde el oficio de levantar y operar proyectos turísticos.',
  },
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: pageFaqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
}

export default function LibrosPage() {
  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookListSchema} />
      <JsonLd data={bookSchema3} />
      <JsonLd data={bookSchema} />
      <JsonLd data={bookSchema2} />
      <JsonLd data={faqSchema} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
        {/* Glow de fondo — más amplio y visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 h-[500px]
                     bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(201,162,77,0.15)_0%,transparent_70%)]"
        />
        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-gold">
            Libros de Tony Alvarado
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-brand-text md:text-7xl">
            Tres libros.{' '}
            <span className="text-brand-gold">Una misma misión.</span>
          </h1>
          <div className="mx-auto mt-7 h-px w-32 bg-gradient-to-r from-transparent via-brand-gold/55 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Tres caminos, tres etapas y un mismo propósito: inspirar, fortalecer y transformar
            vidas a través del liderazgo, la fe, el emprendimiento y la perseverancia.
          </p>
        </div>
      </section>

      {/* ── Destacado: el tercer libro ── */}
      <section className="px-6 pb-16 md:px-10">
        <article
          className="group relative mx-auto flex max-w-6xl flex-col overflow-hidden rounded-3xl
                     border border-brand-gold/25 bg-brand-card
                     shadow-[0_0_0_1px_rgba(201,162,77,0.12),0_0_70px_-12px_rgba(201,162,77,0.22),0_25px_60px_-20px_rgba(0,0,0,0.55)]
                     lg:flex-row lg:items-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0
                       bg-[radial-gradient(ellipse_55%_85%_at_82%_50%,rgba(201,162,77,0.16)_0%,transparent_68%)]"
          />

          {/* Texto */}
          <div className="relative z-10 flex-1 px-9 py-11 md:px-12 md:py-14">
            <span
              className="mb-6 inline-flex items-center gap-2.5 rounded-full bg-brand-gold/10
                         px-4 py-1.5 ring-1 ring-brand-gold/30"
            >
              <Bell size={12} className="text-brand-gold" />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                Nuevo · En preparación
              </span>
            </span>

            <h2 className="mb-5 text-3xl font-bold leading-[1.12] tracking-tight text-brand-text md:text-[2.6rem]">
              El nuevo negocio<br />
              del turismo{' '}
              <span className="text-brand-gold">2027</span>
            </h2>

            <p className="mb-8 max-w-xl text-[15px] leading-[1.78] text-brand-muted">
              El huésped dejó de viajar por la habitación y el hotel genérico dejó de ser
              un buen negocio. El tercer libro de Tony cuenta qué cambió en el oficio de
              construir y operar hoteles — escrito desde La Fortuna de San Carlos,
              mientras se levanta un hotel y se opera otro.
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {['Turismo', 'Hotelería', 'Bienestar', 'Operación', 'Costa Rica'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-brand-gold/10 px-3.5 py-1.5
                             text-[11px] font-semibold tracking-wide text-brand-gold
                             ring-1 ring-brand-gold/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href="/libros/el-nuevo-negocio-del-turismo-2027"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-brand-gold px-8 py-4
                         text-[15px] font-bold text-brand-bg
                         shadow-[0_8px_32px_rgba(201,162,77,0.35)]
                         transition-all hover:opacity-90 hover:shadow-[0_12px_48px_rgba(201,162,77,0.45)]"
            >
              Ver el libro
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Portada */}
          <div className="relative z-10 flex shrink-0 justify-center px-9 pb-12 lg:px-14 lg:py-14">
            <BookCover2027
              className="w-[190px] rounded-[3px]
                         shadow-[0_30px_70px_-18px_rgba(0,0,0,0.8),0_0_55px_-14px_rgba(201,162,77,0.4)]
                         transition-transform duration-500 group-hover:scale-[1.03]
                         md:w-[220px]"
            />
          </div>
        </article>
      </section>

      {/* ── Showcase de libros ── */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

          {/* ════════════════════════════════
              Card Libro 1 — Secretos (morado)
          ════════════════════════════════ */}
          <article
            className="group relative isolate flex flex-col overflow-hidden rounded-3xl
                       border border-brand-gold/[0.18] bg-brand-card
                       shadow-[0_0_0_1px_rgba(201,162,77,0.10),0_0_60px_-10px_rgba(201,162,77,0.18),0_25px_60px_-20px_rgba(0,0,0,0.5)]
                       transition-shadow duration-500
                       hover:shadow-[0_0_0_1px_rgba(201,162,77,0.18),0_0_80px_-8px_rgba(201,162,77,0.28),0_30px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            {/* ── Zona de imagen ── */}
            <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden">

              {/* z-0 | L1 — base oscura dorada profunda */}
              <div className="absolute inset-0 bg-[#0C0A04]" />

              {/* z-0 | L2 — glow difuso grande desde el suelo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_105%,rgba(201,162,77,0.30)_0%,transparent_60%)]" />

              {/* z-0 | L3 — spotlight esfera detrás del libro */}
              <div className="absolute bottom-1/3 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand-gold/[0.22] blur-[75px]" />

              {/* z-0 | L4 — ambient lateral izquierdo */}
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-brand-gold/[0.06] to-transparent" />

              {/* z-0 | L4 — ambient lateral derecho */}
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-gold/[0.06] to-transparent" />

              {/* z-0 | L5 — línea de suelo / floor glow */}
              <div className="absolute bottom-[100px] left-[22%] right-[22%] h-px rounded-full bg-brand-gold/30 blur-[3px]" />

              {/* z-0 | Textura de puntos sutil */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              {/* z-10 | Mockup del libro */}
              <Image
                src="/images/books/secretos-mockup.png"
                alt="Secretos para ser un empresario exitoso — Tony Alvarado"
                width={420}
                height={580}
                className="relative z-10 w-auto max-h-[380px] object-contain pb-6
                           drop-shadow-[0_30px_80px_rgba(201,162,77,0.45)]
                           transition-transform duration-500
                           group-hover:scale-[1.03]
                           md:max-h-[450px]"
                priority
              />

              {/* z-20 | Fade inferior — fusiona imagen con contenido */}
              <div className="absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-brand-card to-transparent" />
            </div>

            {/* ── Contenido (DOM posterior = encima del image zone) ── */}
            <div className="flex flex-1 flex-col px-9 pb-10 pt-5">

              {/* Badge */}
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full
                               bg-brand-gold/10 px-4 py-1.5 ring-1 ring-brand-gold/25">
                <ShoppingCart size={12} className="text-brand-gold" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-gold">
                  Disponible en Amazon
                </span>
              </span>

              {/* Título */}
              <h2 className="mb-4 font-bold leading-tight tracking-tight text-brand-text
                             text-2xl md:text-[1.9rem] lg:text-[2.15rem]">
                Secretos para ser un{' '}
                <span className="text-brand-gold">empresario exitoso</span>
              </h2>

              {/* Descripción */}
              <p className="mb-7 text-[15px] leading-[1.78] text-brand-muted">
                Un libro para quienes quieren construir algo sólido, liderar con visión y
                aprender a convertir los desafíos en crecimiento. Tony comparte principios,
                aprendizajes y convicciones forjadas en el camino real del emprendimiento,
                con una mirada honesta sobre liderazgo, propósito y legado. No es teoría —
                son lecciones ganadas en el campo, con fracasos y victorias incluidos.
              </p>

              {/* Tags */}
              <div className="mb-7 flex flex-wrap gap-2">
                {['Negocios', 'Liderazgo', 'Aprendizaje', 'Propósito'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-gold/10 px-3.5 py-1.5
                               text-[11px] font-semibold tracking-wide text-brand-gold
                               ring-1 ring-brand-gold/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="https://www.amazon.com/dp/B0CCZWJG7S"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-3
                           rounded-2xl bg-brand-gold py-4
                           text-[15px] font-bold text-brand-bg
                           shadow-[0_8px_32px_rgba(201,162,77,0.35)]
                           transition-all
                           hover:opacity-90 hover:shadow-[0_12px_48px_rgba(201,162,77,0.45)]"
              >
                <ShoppingCart size={17} />
                Comprar en Amazon
              </Link>
            </div>
          </article>

          {/* ════════════════════════════════
              Card Libro 2 — Sigue Pedaleando (dorado)
          ════════════════════════════════ */}
          <article
            className="group relative isolate flex flex-col overflow-hidden rounded-3xl
                       border border-brand-warm/[0.18] bg-brand-card
                       shadow-[0_0_0_1px_rgba(215,186,158,0.12),0_0_60px_-10px_rgba(215,186,158,0.2),0_25px_60px_-20px_rgba(0,0,0,0.5)]
                       transition-shadow duration-500
                       hover:shadow-[0_0_0_1px_rgba(215,186,158,0.22),0_0_80px_-8px_rgba(215,186,158,0.32),0_30px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            {/* ── Zona de imagen ── */}
            <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden">

              {/* z-0 | L1 — base oscura ámbar profunda */}
              <div className="absolute inset-0 bg-[#0E0A04]" />

              {/* z-0 | L2 — glow difuso dorado desde el suelo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_105%,rgba(215,186,158,0.32)_0%,transparent_60%)]" />

              {/* z-0 | L3 — spotlight esfera detrás del libro */}
              <div className="absolute bottom-1/3 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand-warm/[0.18] blur-[75px]" />

              {/* z-0 | L4 — ambient lateral izquierdo */}
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-brand-warm/[0.05] to-transparent" />

              {/* z-0 | L4 — ambient lateral derecho */}
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-warm/[0.05] to-transparent" />

              {/* z-0 | L5 — línea de suelo / floor glow */}
              <div className="absolute bottom-[100px] left-[22%] right-[22%] h-px rounded-full bg-brand-warm/25 blur-[3px]" />

              {/* z-0 | Textura de puntos sutil */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }}
              />

              {/* z-10 | Mockup del libro */}
              <Image
                src="/images/books/sigue-pedaleando-mockup.png"
                alt="Sigue Pedaleando — Tony Alvarado"
                width={420}
                height={580}
                className="relative z-10 w-auto max-h-[380px] object-contain pb-6
                           drop-shadow-[0_30px_80px_rgba(215,186,158,0.45)]
                           transition-transform duration-500
                           group-hover:scale-[1.03]
                           md:max-h-[450px]"
                priority
              />

              {/* z-20 | Fade inferior */}
              <div className="absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-brand-card to-transparent" />
            </div>

            {/* ── Contenido ── */}
            <div className="flex flex-1 flex-col px-9 pb-10 pt-5">

              {/* Badge */}
              <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full
                               bg-brand-warm/10 px-4 py-1.5 ring-1 ring-brand-warm/25">
                <ShoppingCart size={12} className="text-brand-warm" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-warm">
                  Disponible en Amazon
                </span>
              </span>

              {/* Título */}
              <h2 className="mb-4 font-bold leading-tight tracking-tight text-brand-text
                             text-2xl md:text-[1.9rem] lg:text-[2.15rem]">
                Sigue{' '}
                <span className="text-brand-warm">Pedaleando</span>
              </h2>

              {/* Descripción */}
              <p className="mb-7 text-[15px] leading-[1.78] text-brand-muted">
                Una historia de fe, propósito y resiliencia nacida alrededor de la bicicleta.
                &ldquo;Sigue Pedaleando&rdquo; recoge vivencias, caídas, reconstrucción y esperanza,
                mostrando cómo seguir avanzando aun cuando la vida se pone cuesta arriba.
                Un libro para quienes necesitan recordar que no siempre se trata de ir
                más rápido, sino de no rendirse.
              </p>

              {/* Tags */}
              <div className="mb-7 flex flex-wrap gap-2">
                {['Fe', 'Propósito', 'Resiliencia', 'Superación personal'].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-brand-warm/10 px-3.5 py-1.5
                               text-[11px] font-semibold tracking-wide text-brand-warm
                               ring-1 ring-brand-warm/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto flex w-full items-center justify-center gap-3
                           rounded-2xl border-2 border-brand-warm/35
                           py-4 text-[15px] font-bold text-brand-warm
                           transition-all
                           hover:border-brand-warm/55 hover:bg-brand-warm/10"
              >
                <ShoppingCart size={17} />
                Comprar en Amazon
              </Link>
            </div>
          </article>

        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" />

    </main>
  )
}
