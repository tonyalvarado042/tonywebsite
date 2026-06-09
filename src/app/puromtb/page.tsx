import Link from 'next/link'
import Image from 'next/image'
import { Bike, ShoppingBag, Users, Award, ExternalLink, ArrowRight, CheckCircle2 } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PhotoStrip from '@/components/ui/PhotoStrip'
import { SITE_URL, websiteRef, personRef, puroMTBOrg } from '@/lib/structured-data'

export const metadata = {
  title: 'PuroMTB — Tienda y comunidad ciclista en Costa Rica | Tony Alvarado',
  description:
    'PuroMTB es la tienda y comunidad de ciclismo fundada por Tony Alvarado en 2004. Más de 20 años impulsando el ciclismo en Costa Rica. Tienda física, venta online y comunidad activa.',
  alternates: { canonical: '/puromtb' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/puromtb#webpage`,
  name: 'PuroMTB — Tienda y comunidad ciclista en Costa Rica | Tony Alvarado',
  description:
    'PuroMTB es la tienda y comunidad de ciclismo fundada por Tony Alvarado en 2004. Más de 20 años impulsando el ciclismo en Costa Rica.',
  url: `${SITE_URL}/puromtb`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: [personRef, { '@type': 'Organization', '@id': `${SITE_URL}/#puromtb` }],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'PuroMTB', item: `${SITE_URL}/puromtb` },
  ],
}

const pilares = [
  {
    icon: ShoppingBag,
    title: 'Tienda física y online',
    description:
      'Equipamiento completo para ciclismo MTB y ruta. Bicicletas, accesorios y componentes con asesoría especializada.',
  },
  {
    icon: Users,
    title: 'Comunidad ciclista',
    description:
      'Una de las comunidades más activas del ciclismo en Costa Rica, construida durante más de dos décadas.',
  },
  {
    icon: Bike,
    title: 'Asesoría especializada',
    description:
      'El equipo de PuroMTB orienta a cada ciclista — desde principiantes hasta atletas avanzados — para elegir el equipo adecuado.',
  },
  {
    icon: Award,
    title: 'Más de 20 años de historia',
    description:
      'Fundada en 2004 como sitio web y establecida en tienda física desde 2008. Una marca construida con propósito y comunidad.',
  },
]

export default function PuroMTBPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={puroMTBOrg} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 text-center md:px-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Ecosistema de ciclismo — Costa Rica
          </p>

          <div className="mx-auto mb-6 flex justify-center">
            <Image
              src="/images/logos/puromtb/logo_puro_mtb.png"
              alt="PuroMTB"
              width={200}
              height={60}
              className="h-14 w-auto"
            />
          </div>

          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            La tienda y comunidad<br />
            <span className="text-brand-green">que mueve el ciclismo en Costa Rica.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Más de 20 años impulsando el ciclismo. Tienda física, venta online y una comunidad
            activa construida por Tony Alvarado desde 2004.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://puromtb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
            >
              Visitar PuroMTB
              <ExternalLink size={14} />
            </Link>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-7 py-3 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-surface"
            >
              Contactar
            </Link>
          </div>
        </div>
      </section>

      {/* Foto + relación con Tony */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="grid items-center gap-12 md:grid-cols-2">

            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-puromtb.jpg"
                alt="Tony Alvarado en PuroMTB"
                width={600}
                height={450}
                className="h-80 w-full object-cover object-[50%_25%] md:h-96"
              />
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
                Historia
              </p>
              <h2 className="mb-5 text-3xl font-bold leading-tight text-brand-text">
                Fundada con propósito.<br />
                <span className="text-brand-green">Construida con comunidad.</span>
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-brand-muted">
                PuroMTB nació en 2004 como un espacio digital para los ciclistas de Costa Rica.
                Tony Alvarado la fundó con una visión clara: acercar el ciclismo a más personas,
                con equipamiento de calidad y una comunidad que apoya el crecimiento de cada
                corredor.
              </p>
              <p className="text-sm leading-relaxed text-brand-muted">
                En 2008 abrió la primera tienda física. Hoy es una de las marcas de referencia
                del ciclismo en el país, con presencia online y una comunidad que continúa
                creciendo. PuroMTB es el punto de origen del ecosistema que Tony ha construido
                alrededor de la bicicleta.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Tienda — imágenes reales */}
      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="overflow-hidden rounded-2xl">
            <Image
              src="/images/puromtb/puromtb-store-interior-01.png"
              alt="Interior tienda PuroMTB — ciclismo en Costa Rica"
              width={1200}
              height={600}
              className="w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-online-store-01.png"
                alt="Tienda online PuroMTB"
                width={600}
                height={400}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/puromtb/puromtb-store-interior-02.png"
                alt="Interior tienda PuroMTB"
                width={600}
                height={400}
                className="w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bloque editorial — La comunidad */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row-reverse lg:items-center">
            <div className="flex-1">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src="/images/tony/tony-puromtb-community.jpg"
                  alt="Comunidad PuroMTB — ciclistas en Costa Rica"
                  fill
                  loading="lazy"
                  quality={100}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Comunidad
              </p>
              <h2 className="text-3xl font-bold leading-tight text-brand-text md:text-4xl">
                Más de 20 años<br />
                <span className="text-brand-green">construyendo comunidad ciclista.</span>
              </h2>
              <p className="text-brand-muted">
                PuroMTB no es solo una tienda. Es el punto de encuentro de miles de ciclistas
                en Costa Rica y Latinoamérica. Desde 2004, Tony Alvarado construyó una marca
                que conecta personas, eventos, rutas y equipamiento en un solo ecosistema.
              </p>
              <ul className="space-y-3">
                {[
                  'Más de 400K seguidores en redes sociales',
                  'Tienda física y venta online en Costa Rica',
                  'Parte del ecosistema de ciclismo de Tony Alvarado',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="https://puromtb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-green/50 px-7 py-3.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
              >
                Explorar PuroMTB <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-text">
              Más que una tienda.<br />
              <span className="text-brand-green">Un punto de encuentro del ciclismo.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {pilares.map(({ icon: Icon, title, description }) => (
              <div key={title} className="rounded-xl border border-brand-border bg-brand-card p-6">
                <Icon size={20} className="mb-3 text-brand-green" />
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm text-brand-muted">{description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-brand-accent/30 bg-brand-card p-7">
            <h3 className="mb-2 font-bold text-brand-text">PuroMTB dentro del ecosistema de Tony</h3>
            <p className="text-sm text-brand-muted">
              PuroMTB es la base operativa y comunitaria del ecosistema. La tienda, la comunidad
              y la trayectoria de la marca son parte del mismo propósito: transformar vidas a
              través del ciclismo. Junto con Pure Cycling y Bike & Bed Hotels, forman un modelo
              integrado construido con visión de largo plazo.
            </p>
          </div>
        </div>
      </section>


      {/* CTA final */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-3xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Visita PuroMTB
          </p>
          <h2 className="mb-5 text-3xl font-bold text-brand-text">
            Explora la tienda y la comunidad.
          </h2>
          <p className="mb-8 text-brand-muted">
            Bicicletas, accesorios, componentes y una comunidad ciclista esperan por ti en
            la plataforma oficial de PuroMTB.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="https://puromtb.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-brand-bg shadow-[0_6px_20px_rgba(57,217,138,0.3)] transition-opacity hover:opacity-90"
            >
              Ir a PuroMTB
              <ExternalLink size={14} />
            </Link>
            <Link
              href="/pure-cycling"
              className="inline-flex items-center gap-2 rounded-full border border-brand-border px-8 py-3 text-sm font-semibold text-brand-text transition-colors hover:bg-brand-card"
            >
              Conocer Pure Cycling
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}
