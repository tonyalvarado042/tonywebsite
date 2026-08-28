import Link from 'next/link'
import { ArrowLeft, BellRing, Hammer, Users, Sparkles, Building2, Network } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import ContactFormEmbed from '@/components/sections/ContactFormEmbed'
import BookCover2027 from '@/components/ui/BookCover2027'
import { SITE_URL, websiteRef, personRef, bookSchema3 } from '@/lib/structured-data'

const TITLE = 'El nuevo negocio del turismo 2027 — el tercer libro de Tony Alvarado'
const DESC =
  'El tercer libro de Tony Alvarado: cómo cambió el negocio de construir y operar hoteles, contado por quien lo está haciendo en La Fortuna de San Carlos. En preparación.'

export const metadata = {
  title: TITLE,
  description: DESC,
  // Sin hreflang a la versión en inglés: hoy /en va en noindex (decisión que ya
  // estaba en el repo). Apuntar un hreflang a una página noindex se contradice.
  // Cuando se abra el inglés, acá va:
  //   languages: { 'es-CR': '...', 'en': '/en/books/the-new-tourism-business-2027' }
  alternates: { canonical: '/libros/el-nuevo-negocio-del-turismo-2027' },
  openGraph: {
    type: 'book',
    locale: 'es_CR',
    url: `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027`,
    siteName: 'Tony Alvarado',
    title: 'El nuevo negocio del turismo 2027 — Tony Alvarado',
    description: DESC,
    images: [
      {
        url: '/images/og/tony-alvarado-og.jpg',
        width: 1600,
        height: 900,
        alt: 'El nuevo negocio del turismo 2027 — un libro de Tony Alvarado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El nuevo negocio del turismo 2027 — Tony Alvarado',
    description: DESC,
    images: ['/images/og/tony-alvarado-og.jpg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027#webpage`,
  name: TITLE,
  description: DESC,
  url: `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Book', '@id': `${SITE_URL}/#nuevo-negocio-turismo-2027` }],
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/og/tony-alvarado-og.jpg`,
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Libros', item: `${SITE_URL}/libros` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'El nuevo negocio del turismo 2027',
      item: `${SITE_URL}/libros/el-nuevo-negocio-del-turismo-2027`,
    },
  ],
}

/* ── Contenido del libro ───────────────────────────────────────────────────── */

const capitulos = [
  {
    n: '01',
    icon: Building2,
    titulo: 'El modelo viejo se está quedando sin aire',
    texto:
      'Cuartos iguales, tarifa por noche y competir contra la casa de al lado por diez dólares. Por qué el hotel genérico dejó de ser un buen negocio, y qué lo está reemplazando.',
  },
  {
    n: '02',
    icon: Sparkles,
    titulo: 'El huésped ya no viene por la habitación',
    texto:
      'La cama es lo de menos. La gente viaja por lo que le pasa adentro: entrenar, recuperarse, dormir bien, volver distinto. El hotel dejó de ser alojamiento y pasó a ser el escenario de algo.',
  },
  {
    n: '03',
    icon: Sparkles,
    titulo: 'Concepto antes que concreto',
    texto:
      'La decisión más cara de un hotel se toma antes de la primera varilla. Cómo se elige un tema, para quién es y quién queda afuera — y por qué un hotel que le habla a todo el mundo no le habla a nadie.',
  },
  {
    n: '04',
    icon: Hammer,
    titulo: 'Construir: la parte más cara de aprender',
    texto:
      'Contratistas, permisos, proveedores y las semanas que se van sin que nadie las note. La parte del negocio de la que casi nadie escribe porque no es glamorosa — y es donde se pierde el dinero.',
  },
  {
    n: '05',
    icon: Users,
    titulo: 'Operar con gente: por qué los sistemas ganan',
    texto:
      'Un hotel no falla por falta de ganas. Falla porque depende de que alguien se acuerde. Cómo se convierte una operación que vive en la cabeza de tres personas en algo que corre solo.',
  },
  {
    n: '06',
    icon: Network,
    titulo: 'La operación invisible',
    texto:
      'Limpieza, supervisión y reseñas: tres tareas que casi todo el mundo sigue haciendo a mano y que hoy se pueden sistematizar. Lo que cuestan de verdad al mes cuando se cuentan bien.',
  },
  {
    n: '07',
    icon: Building2,
    titulo: 'Quién es dueño del activo',
    texto:
      'La copropiedad como forma de construir turismo: fracciones de un activo finito, no tiempo compartido. Qué cambia en el contrato, en la operación y en la conversación con quien entra.',
  },
  {
    n: '08',
    icon: Sparkles,
    titulo: 'Bienestar: el turismo que se paga con salud',
    texto:
      'Termales, sauna, cold plunge, gimnasio, recuperación. Por qué la categoría de bienestar dejó de ser un spa al lado de la piscina y se volvió la razón del viaje.',
  },
  {
    n: '09',
    icon: Network,
    titulo: 'De un hotel a una red',
    texto:
      'Lo que hay que dejar amarrado en el primero para que el segundo no arranque de cero. Marca, sistemas, gente y estándar: el salto de tener un hotel a tener una red.',
  },
]

const pageFaqs: PageFAQItem[] = [
  {
    question: '¿Cuándo sale "El nuevo negocio del turismo 2027"?',
    answer:
      'El libro está en preparación. Todavía no hay fecha de publicación confirmada ni está disponible para la venta. Si dejás tu correo en esta página, te avisamos apenas haya fecha.',
  },
  {
    question: '¿De qué trata el libro?',
    answer:
      'De cómo cambió el negocio de construir y operar hoteles: el huésped que ya no viaja por la habitación sino por la experiencia, el auge del turismo de bienestar, la operación sistematizada en lugar de la manual, y las nuevas formas de propiedad de los activos turísticos. Está contado desde la experiencia directa de Tony Alvarado desarrollando y operando hoteles en La Fortuna de San Carlos, Costa Rica.',
  },
  {
    question: '¿Para quién está escrito?',
    answer:
      'Para quien está construyendo, operando o pensando entrar a un proyecto turístico: hoteleros, desarrolladores, operadores y emprendedores del sector. No es un libro de teoría de turismo, es el registro de lo que se aprende haciéndolo.',
  },
  {
    question: '¿Es el tercer libro de Tony Alvarado?',
    answer:
      'Sí. Los dos anteriores son "Secretos para ser un empresario exitoso", sobre los principios de construir empresa, y "Sigue Pedaleando", sobre fe, propósito y resiliencia alrededor de la bicicleta. Ambos están disponibles en Amazon.',
  },
  {
    question: '¿Va a estar disponible en inglés?',
    answer:
      'La edición en español es la primera. Cualquier otra edición se anunciará en esta misma página cuando esté confirmada.',
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

/* ── Página ────────────────────────────────────────────────────────────────── */

export default function NuevoNegocioTurismoPage() {
  return (
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookSchema3} />
      <JsonLd data={faqSchema} />

      {/* ══ Hero ══ */}
      <section className="relative overflow-hidden px-6 pb-24 pt-16 md:px-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-[640px]
                     bg-[radial-gradient(ellipse_70%_55%_at_50%_0%,rgba(201,162,77,0.16)_0%,transparent_72%)]"
        />

        <div className="relative z-10 mx-auto max-w-6xl">
          {/* Migas */}
          <Link
            href="/libros"
            className="mb-12 inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-gold"
          >
            <ArrowLeft size={15} />
            Todos los libros
          </Link>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20">
            {/* Texto */}
            <div>
              <span
                className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-brand-gold/10
                           px-4 py-1.5 ring-1 ring-brand-gold/30"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-gold opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-gold" />
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Tercer libro · En preparación
                </span>
              </span>

              <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-brand-text md:text-6xl">
                El nuevo negocio<br />
                del turismo{' '}
                <span className="text-brand-gold">2027</span>
              </h1>

              <div className="mt-8 h-px w-28 bg-gradient-to-r from-brand-gold/60 to-transparent" />

              <p className="mt-8 max-w-xl text-lg leading-relaxed text-brand-muted">
                El huésped dejó de viajar por la habitación. El hotel genérico dejó de ser
                un buen negocio. Y la parte difícil nunca fue llenar los cuartos — fue
                construir y operar sin que se le caiga a uno encima.
              </p>

              <p className="mt-5 max-w-xl leading-relaxed text-brand-muted">
                Este libro es el registro de eso, escrito desde adentro: desde La Fortuna
                de San Carlos, mientras se levanta un hotel y se opera otro.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#avisame"
                  className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-brand-gold
                             px-8 py-4 text-[15px] font-bold text-brand-bg
                             shadow-[0_8px_32px_rgba(201,162,77,0.35)]
                             transition-all hover:opacity-90 hover:shadow-[0_12px_48px_rgba(201,162,77,0.45)]"
                >
                  <BellRing size={17} />
                  Avisame cuando salga
                </Link>
                <p className="text-sm text-brand-muted">
                  Sin fecha de publicación todavía.
                </p>
              </div>
            </div>

            {/* Portada */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-10 rounded-full bg-brand-gold/[0.13] blur-[70px]"
                />
                <BookCover2027
                  className="relative w-[260px] rounded-[3px] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85),0_0_70px_-15px_rgba(201,162,77,0.35)]
                             md:w-[330px] lg:w-[360px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ La tesis ══ */}
      <section className="border-y border-brand-border/60 bg-brand-surface px-6 py-20 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
            De qué trata
          </p>
          <blockquote className="text-2xl font-semibold leading-[1.45] text-brand-text md:text-[2rem]">
            &ldquo;Durante veinte años el negocio fue tener cuartos. Ahora el negocio es
            tener{' '}
            <span className="text-brand-gold">un motivo para venir</span>
            {' '}— y una operación que aguante cuando la gente llega.&rdquo;
          </blockquote>
          <p className="mx-auto mt-9 max-w-2xl leading-relaxed text-brand-muted">
            El turismo no se está muriendo: se está reorganizando. El viajero cambió lo
            que busca, el bienestar dejó de ser un extra, y la tecnología volvió
            innecesaria media operación que todavía se hace a mano. Este libro cuenta qué
            cambió, por qué, y qué hay que hacer distinto — sin romantizar la parte que
            duele, que es construir.
          </p>
        </div>
      </section>

      {/* ══ Capítulos ══ */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Contenido
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-text md:text-4xl">
              Nueve capítulos.{' '}
              <span className="text-brand-gold">Ninguno teórico.</span>
            </h2>
          </div>

          <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capitulos.map(({ n, icon: Icon, titulo, texto }) => (
              <li
                key={n}
                className="group flex flex-col rounded-2xl border border-brand-border
                           bg-brand-card p-7 transition-colors duration-300
                           hover:border-brand-gold/35"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl
                               bg-brand-gold/10 ring-1 ring-brand-gold/20"
                  >
                    <Icon size={17} className="text-brand-gold" />
                  </span>
                  <span className="font-mono text-xs font-bold tracking-wider text-brand-gold/45">
                    {n}
                  </span>
                </div>
                <h3 className="mb-3 text-[17px] font-bold leading-snug text-brand-text">
                  {titulo}
                </h3>
                <p className="text-sm leading-[1.7] text-brand-muted">{texto}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-brand-muted">
            El índice puede moverse mientras el libro se termina de escribir.
          </p>
        </div>
      </section>

      {/* ══ Quién lo escribe ══ */}
      <section className="border-y border-brand-border/60 bg-brand-surface px-6 py-24 md:px-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Quién lo escribe
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-brand-text md:text-4xl">
              No es un observador del sector.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brand-muted">
              Tony Alvarado construye y opera hoteles temáticos en La Fortuna de San
              Carlos, Costa Rica. Lo que está en el libro lo aprendió en obra, en
              permisos, en reuniones con contratistas y operando con gente real.
            </p>
          </div>

          <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {[
              {
                dt: 'Bike & Bed Hotels',
                dd: 'Hotel temático de ciclismo en La Fortuna. Etapa 1 en operación desde septiembre de 2025.',
              },
              {
                dt: 'Humaya Costa Rica',
                dd: 'Etapa 2, en construcción: 10 villas con gimnasio, spa, termales, sauna y cold plunge. Apertura prevista para noviembre de 2026.',
              },
              {
                dt: 'PuroMTB',
                dd: 'Tienda y comunidad de ciclismo fundada en 2004. El origen de todo el ecosistema.',
              },
            ].map(({ dt, dd }) => (
              <div
                key={dt}
                className="rounded-2xl border border-brand-border bg-brand-card p-7"
              >
                <dt className="mb-3 text-[15px] font-bold text-brand-gold">{dt}</dt>
                <dd className="text-sm leading-[1.7] text-brand-muted">{dd}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 text-center">
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40
                         px-7 py-3.5 text-sm font-semibold text-brand-gold
                         transition-colors hover:bg-brand-gold/10"
            >
              Conocer la historia completa
            </Link>
          </div>
        </div>
      </section>

      {/* ══ Avisame ══ */}
      <section id="avisame" className="scroll-mt-24 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-3xl">
          <ContactFormEmbed
            heading="Avisame cuando salga el libro"
            subheading="Dejá tu correo y te escribimos apenas haya fecha de publicación. Elegí «Libros» como interés principal."
            locale="es"
          />
        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" />
    </main>
  )
}
