import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Bell } from 'lucide-react'
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
    <main className="bg-brand-bg">
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={bookSchema} />
      <JsonLd data={bookSchema2} />

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center">
        {/* Glow de fondo — más amplio y visible */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-16 h-[500px]
                     bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(125,38,204,0.22)_0%,transparent_70%)]"
        />
        <div className="relative z-10">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-brand-accent">
            Libros de Tony Alvarado
          </p>
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-[1.1] tracking-tight text-brand-text md:text-7xl">
            Dos libros.{' '}
            <span className="text-brand-accent">Una misma misión.</span>
          </h1>
          <div className="mx-auto mt-7 h-px w-32 bg-gradient-to-r from-transparent via-brand-accent/55 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-brand-muted md:text-lg">
            Dos caminos, dos etapas y un mismo propósito: inspirar, fortalecer y transformar
            vidas a través del liderazgo, la fe, el emprendimiento y la perseverancia.
          </p>
        </div>
      </section>

      {/* ── Showcase de libros ── */}
      <section className="px-6 pb-32 md:px-10">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2">

          {/* ════════════════════════════════
              Card Libro 1 — Secretos (morado)
          ════════════════════════════════ */}
          <article
            className="group relative isolate flex flex-col overflow-hidden rounded-3xl
                       border border-brand-accent/[0.18] bg-brand-card
                       shadow-[0_0_0_1px_rgba(125,38,204,0.15),0_0_60px_-10px_rgba(125,38,204,0.28),0_25px_60px_-20px_rgba(0,0,0,0.5)]
                       transition-shadow duration-500
                       hover:shadow-[0_0_0_1px_rgba(125,38,204,0.26),0_0_80px_-8px_rgba(125,38,204,0.44),0_30px_70px_-15px_rgba(0,0,0,0.6)]"
          >
            {/* ── Zona de imagen ── */}
            <div className="relative flex min-h-[460px] items-end justify-center overflow-hidden">

              {/* z-0 | L1 — base oscura violeta profunda */}
              <div className="absolute inset-0 bg-[#07041A]" />

              {/* z-0 | L2 — glow difuso grande desde el suelo */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_105%,rgba(125,38,204,0.52)_0%,transparent_60%)]" />

              {/* z-0 | L3 — spotlight esfera detrás del libro */}
              <div className="absolute bottom-1/3 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-brand-accent/[0.22] blur-[75px]" />

              {/* z-0 | L4 — ambient lateral izquierdo */}
              <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-brand-accent/[0.06] to-transparent" />

              {/* z-0 | L4 — ambient lateral derecho */}
              <div className="absolute inset-y-0 right-0 w-2/5 bg-gradient-to-l from-brand-accent/[0.06] to-transparent" />

              {/* z-0 | L5 — línea de suelo / floor glow */}
              <div className="absolute bottom-[100px] left-[22%] right-[22%] h-px rounded-full bg-brand-accent/30 blur-[3px]" />

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
                           drop-shadow-[0_30px_80px_rgba(125,38,204,0.65)]
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
                               bg-brand-accent/10 px-4 py-1.5 ring-1 ring-brand-accent/25">
                <ShoppingCart size={12} className="text-brand-accent" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-accent">
                  Disponible en Amazon
                </span>
              </span>

              {/* Título */}
              <h2 className="mb-4 font-bold leading-tight tracking-tight text-brand-text
                             text-2xl md:text-[1.9rem] lg:text-[2.15rem]">
                Secretos para ser un{' '}
                <span className="text-brand-accent">empresario exitoso</span>
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
                    className="rounded-full bg-brand-accent/10 px-3.5 py-1.5
                               text-[11px] font-semibold tracking-wide text-brand-accent
                               ring-1 ring-brand-accent/20"
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
                           rounded-2xl bg-brand-accent py-4
                           text-[15px] font-bold text-white
                           shadow-[0_8px_32px_rgba(125,38,204,0.38)]
                           transition-all
                           hover:opacity-90 hover:shadow-[0_12px_48px_rgba(125,38,204,0.55)]"
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
                <Bell size={12} className="text-brand-warm" />
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-warm">
                  Próximamente en Amazon
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
                href="/contacto"
                className="mt-auto flex w-full items-center justify-center gap-3
                           rounded-2xl border-2 border-brand-warm/35
                           py-4 text-[15px] font-bold text-brand-warm
                           transition-all
                           hover:border-brand-warm/55 hover:bg-brand-warm/10"
              >
                <Bell size={17} />
                Avísame cuando esté disponible
              </Link>
            </div>
          </article>

        </div>
      </section>

    </main>
  )
}
