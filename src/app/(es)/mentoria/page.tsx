import Link from 'next/link'
import Image from 'next/image'
import { Compass, CheckCircle2, Target, Users, TrendingUp, Wallet, Megaphone } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import MentoriaForm from '@/components/sections/MentoriaForm'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Mentoría empresarial — Tony Alvarado | Escalá tu empresa a 6 o 7 cifras',
  description:
    'Acompañamiento y asesoría directa para dueños de empresa que quieren crecer y que el negocio funcione sin ellos. Marketing, liderazgo, ventas, estrategia y finanzas, con más de 22 años de experiencia.',
  alternates: { canonical: '/mentoria' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: `${SITE_URL}/mentoria`,
    siteName: 'Tony Alvarado',
    title: 'Mentoría empresarial — Tony Alvarado',
    description:
      'Acompañamiento directo para escalar tu empresa y soltar la operación. Más de 22 años construyendo negocios, con certificación en liderazgo por John Maxwell Leadership.',
    images: [{ url: '/images/og/tony-alvarado-og-source.jpeg', width: 1600, height: 900, alt: 'Tony Alvarado — mentoría empresarial' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mentoría empresarial — Tony Alvarado',
    description:
      'Acompañamiento directo para escalar tu empresa y soltar la operación, con más de 22 años de experiencia construyendo negocios.',
    images: ['/images/og/tony-alvarado-og-source.jpeg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/mentoria#webpage`,
  name: 'Mentoría empresarial — Tony Alvarado',
  description:
    'Acompañamiento y asesoría directa para dueños de empresa que quieren crecer y que el negocio funcione sin ellos.',
  url: `${SITE_URL}/mentoria`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Mentoría', item: `${SITE_URL}/mentoria` },
  ],
}

const pageFaqs: PageFAQItem[] = [
  {
    question: '¿Para quién es esta mentoría empresarial?',
    answer:
      'Para dueños de empresa que ya venden pero sienten que el negocio depende demasiado de ellos: los que trabajan muchas horas y ven pocos resultados, o los que crecieron y ya no saben cómo ordenar lo que tienen. No es para quien apenas está pensando una idea.',
  },
  {
    question: '¿Qué temas se trabajan en la mentoría?',
    answer:
      'Cinco frentes: marketing (un mensaje claro que traiga clientes), liderazgo (armar un equipo que haga lo que hoy hace el dueño), ventas (un proceso que no dependa del carisma de nadie), estrategia (cliente ideal y oferta) y finanzas (los números que deciden si la empresa crece o se ahoga).',
  },
  {
    question: '¿Qué experiencia respalda a Tony Alvarado?',
    answer:
      'Más de 22 años construyendo y escalando empresas propias, un grupo de negocios que hoy opera con poca intervención suya, y certificación en liderazgo por John Maxwell Leadership. Es también autor y conferencista.',
  },
  {
    question: '¿Cómo empieza el acompañamiento?',
    answer:
      'Se llena el formulario de esta página indicando el tema que más aprieta hoy. El equipo revisa la solicitud y escribe para coordinar una primera conversación, donde se define si tiene sentido trabajar juntos y bajo qué formato.',
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

const pilares = [
  {
    icon: Megaphone,
    title: 'Marketing',
    description: 'Un mensaje claro que sí traiga clientes. Si quien te lee no entiende en cinco segundos a quién servís, el dinero de la pauta se va al vacío.',
  },
  {
    icon: Users,
    title: 'Liderazgo',
    description: 'Un equipo que haga lo que hoy hacés vos. Nadie ha logrado algo grande solo, y ninguna empresa escala con el dueño metido en todo.',
  },
  {
    icon: TrendingUp,
    title: 'Ventas',
    description: 'Un proceso que no dependa del carisma de nadie. Que la venta pase por un sistema y no por quién tuvo buen día.',
  },
  {
    icon: Target,
    title: 'Estrategia',
    description: 'Tener clarísimo quién es tu cliente ideal y armarle una oferta que enganche. Lo demás es ruido.',
  },
  {
    icon: Wallet,
    title: 'Finanzas',
    description: 'Los números que deciden si crecés o te ahogás. No la contabilidad de fin de año: el flujo de caja y los indicadores que se miran cada semana.',
  },
]

const credenciales = [
  'Más de 22 años construyendo y escalando empresas propias',
  'Certificación en liderazgo por John Maxwell Leadership',
  'Un grupo de empresas que hoy opera con poca intervención del dueño',
  'Autor y conferencista, con formación junto a referentes como Spencer Hoffman',
  'Experiencia real en marketing, ventas, equipos y finanzas — no teoría de libro',
]

export default function MentoriaPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      {/* Hero — con foto de negocios difuminada de fondo.
          Tony la pidió el 21-set-2026 y eligió la de «las personas, sin texto».

          Tres decisiones, todas medidas:

          1. El desenfoque va HORNEADO en el archivo, no en CSS. Un `blur()` de
             CSS se recalcula en cada pintada y deja los bordes transparentes
             (hay que compensarlo con `scale-110`). Horneado también comprime
             muchísimo mejor: el PNG original pesaba 1,2 MB y este JPEG pesa 29 kB.

          2. El velo es FUERTE (65-82%) a propósito. El «con alguien que ya lo
             hizo» va en morado #8B5CF6, que tiene luminancia 0,198 — o sea que
             se pierde sobre GRISES MEDIOS (un traje gris, una cara iluminada),
             no sobre el morado de la foto. Oscurecer empuja los medios al negro
             y le devuelve contraste. Medido sobre la banda del titular:
                 velo 62% → 2,62:1  NO llega al mínimo
                 velo 70% → 3,05:1  justo
                 velo 78% → 3,55:1  cómodo
             ⚠️ Si alguien quiere ver más la foto y baja el velo, el titular
             morado se vuelve ilegible. Hay que volver a medir, no tantear.

          3. Recortar la cuña morada de la derecha NO sirvió de nada — se probó
             y dio exactamente el mismo contraste. Por eso la foto entra entera. */}
      <section className="relative overflow-hidden bg-brand-bg py-24">
        <Image
          src="/images/tony/tony-mentoria-fondo-difuminado.jpg"
          alt="Tony Alvarado con un grupo de empresarios — mentoría empresarial en Costa Rica"
          fill
          className="object-cover object-[50%_40%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/65 via-brand-bg/82 to-brand-bg" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-12">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-card px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            <Compass size={12} /> Mentoría empresarial
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            Escalá tu empresa a 6 o 7 cifras,{' '}
            <span className="text-brand-accent">con alguien que ya lo hizo.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-brand-muted">
            No es un curso ni una plantilla. Es acompañamiento y asesoría directa
            para que tu negocio crezca y, sobre todo, para que aprenda a funcionar
            sin que vos tengás que estar en todo.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="#solicitar"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
            >
              <Compass size={15} /> Quiero que me acompañen →
            </Link>
            <Link
              href="/sobre-mi"
              className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 px-8 py-3.5 text-sm font-semibold text-brand-accent transition-colors hover:bg-brand-accent/10"
            >
              Conoce la historia de Tony →
            </Link>
          </div>
        </div>
      </section>

      {/* Los cinco frentes */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              En qué te acompaña
            </p>
            <h2 className="text-3xl font-bold text-brand-text">Los cinco frentes</h2>
            <p className="mx-auto mt-3 max-w-xl text-brand-muted">
              La mayoría de empresas no se estanca por falta de esfuerzo, sino porque
              uno de estos cinco frentes está flojo y arrastra a los demás.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pilares.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-brand-border bg-brand-card p-7 transition-shadow hover:shadow-md"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-brand-accent/10">
                  <Icon size={18} className="text-brand-accent" />
                </div>
                <h3 className="mb-2 font-bold text-brand-text">{title}</h3>
                <p className="text-sm leading-relaxed text-brand-muted">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Tony */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Por qué Tony
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                No te va a enseñar<br />
                <span className="text-brand-accent">lo que leyó en un libro.</span>
              </h2>
              <p className="mt-4 text-brand-muted">
                Tony levantó un grupo de empresas alrededor de una pasión y las llevó
                a operar sin depender de él. Lo que te va a contar lo cometió, lo pagó
                y lo corrigió en su propia operación.
              </p>
            </div>

            <ul className="space-y-3">
              {credenciales.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-brand-muted">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-brand-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* El formulario */}
      <section id="solicitar" className="scroll-mt-24 bg-brand-surface py-20">
        <div className="mx-auto max-w-2xl px-6 md:px-12">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Primer paso
            </p>
            <h2 className="text-3xl font-bold text-brand-text">Contanos qué te está frenando</h2>
            <p className="mx-auto mt-3 max-w-lg text-brand-muted">
              Escogé el tema que más te aprieta hoy y dejanos cómo contactarte.
              Te escribimos para coordinar una primera conversación.
            </p>
          </div>
          <MentoriaForm locale="es" />
        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="gold" />
    </main>
  )
}
