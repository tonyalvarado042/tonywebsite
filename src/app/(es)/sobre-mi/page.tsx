import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PhotoStrip from '@/components/ui/PhotoStrip'
import PageFAQ, { type PageFAQItem } from '@/components/sections/PageFAQ'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Sobre Tony Alvarado — Copropiedad turística, mentoría y ciclismo en Costa Rica',
  description:
    'Tony Alvarado (Anthony Alvarado) desarrolla proyectos turísticos con copropiedad y acompaña a dueños de empresa a escalar. Más de 22 años construyendo negocios en Costa Rica, desde una historia que empezó sobre una bicicleta.',
  alternates: { canonical: '/sobre-mi' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: 'https://www.tonyalvarado.com/sobre-mi',
    siteName: 'Tony Alvarado',
    title: 'La historia de Tony Alvarado — Ciclismo, fe y transformación',
    description:
      'Desde un accidente a los 16 años hasta fundar un ecosistema de empresas alrededor del ciclismo. La historia real de Tony Alvarado desde Costa Rica.',
    images: [{ url: '/images/og/tony-alvarado-og-source.jpeg', width: 1600, height: 900, alt: 'Tony Alvarado — coach y entrenador de ciclismo en Costa Rica' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'La historia de Tony Alvarado — Ciclismo, fe y transformación',
    description:
      'Desde un accidente a los 16 años hasta fundar un ecosistema de empresas alrededor del ciclismo. La historia real de Tony Alvarado desde Costa Rica.',
    images: ['/images/og/tony-alvarado-og-source.jpeg'],
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/sobre-mi#webpage`,
  name: 'Sobre Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Tony Alvarado (Anthony Alvarado) desarrolla proyectos turísticos con copropiedad y acompaña a dueños de empresa a escalar. Más de 22 años construyendo negocios en Costa Rica, desde una historia que empezó sobre una bicicleta.',
  url: `${SITE_URL}/sobre-mi`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const pageFaqs: PageFAQItem[] = [
  {
    question: '¿Quién es Tony Alvarado?',
    answer:
      'Tony Alvarado es empresario, coach certificado de ciclismo y conferencista costarricense. Fundó PuroMTB en 2004, Pure Cycling y Bike & Bed Hotels. Con más de 22 años de trayectoria construyendo en torno al ciclismo, combina experiencia empresarial real, certificación en entrenamiento y una historia personal de fe y transformación.',
  },
  {
    question: '¿Por qué Tony Alvarado se dedica al ciclismo?',
    answer:
      'Desde niño Tony tuvo una conexión profunda con la bicicleta. A los 16 años sufrió un accidente grave que lo dejó hospitalizado más de 34 días. Esa experiencia transformó su vida: la bicicleta, que primero casi se la quitó, se convirtió en la herramienta que Dios usó para reconstruirla. Hoy su propósito es ayudar a otras personas a transformar su vida a través del ciclismo.',
  },
  {
    question: '¿Qué empresas ha fundado Tony Alvarado?',
    answer:
      'Tony fundó PuroMTB —comunidad y tienda de ciclismo de referencia en Costa Rica, activa desde 2004—, Pure Cycling —comunidad de transformación a través del ciclismo con miembros en más de 30 países— y Bike & Bed Hotels —hotel temático de ciclismo en Costa Rica con visión de expansión global.',
  },
  {
    question: '¿Cómo puedo contactar o trabajar con Tony Alvarado?',
    answer:
      'Puedes escribirnos a través del formulario de contacto en este sitio. Si tu interés es unirte a la comunidad de ciclismo, visita Pure Cycling. Si quieres a Tony como conferencista para un evento, visita la sección de conferencias.',
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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Sobre Tony Alvarado', item: `${SITE_URL}/sobre-mi` },
  ],
}

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': `${SITE_URL}/sobre-mi#profilepage`,
  url: `${SITE_URL}/sobre-mi`,
  name: 'Sobre Tony Alvarado',
  description:
    'Tony Alvarado (Anthony Alvarado) desarrolla proyectos turísticos con copropiedad y acompaña a dueños de empresa a escalar. Más de 22 años construyendo negocios en Costa Rica, desde una historia que empezó sobre una bicicleta.',
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  mainEntity: {
    '@id': `${SITE_URL}/#tony-alvarado`,
  },
}

// Orden fijado por Tony el 13 de septiembre de 2026: copropiedad, mentoría y
// después ciclismo. Ver la sección 3 del CLAUDE.md de este repo.
const highlights = [
  'Desarrollador de proyectos turísticos con copropiedad',
  'Mentor de dueños de empresa que quieren escalar',
  'Certificado por John Maxwell Leadership',
  'Más de 22 años de trayectoria empresarial',
  'Fundador de Bike & Bed Hotels y Humaya',
  'Fundador de PuroMTB (desde 2004) y Pure Cycling',
  'Coach y entrenador certificado de ciclismo',
  'Autor publicado en Amazon · San José, Costa Rica',
]

export default function SobreMiPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={profilePageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 md:flex-row md:px-12">

          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
              Sobre Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
              Empezó vendiendo manzanas para comprarse una bicicleta.<br />
              <span className="text-brand-green">Hoy lleva más de 22 años construyendo con esa misma disciplina.</span>
            </h1>
            <p className="text-brand-muted text-left md:text-justify">
              Hoy desarrolla <strong className="font-semibold text-brand-text">proyectos
              turísticos con copropiedad</strong> en Costa Rica y acompaña a dueños de empresa
              a escalar los suyos. Ingeniero de computación de formación, empresario de vocación,
              y un grupo de negocios que ha facturado millones de dólares — todo nacido de una
              bicicleta y de la disciplina que aprendió sobre ella.
            </p>
          </div>

          <div className="w-full flex-1">
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/tony/tony-ciclismo-vertical-01.jpg"
                alt="Tony Alvarado en bicicleta — coach y entrenador de ciclismo en Costa Rica"
                width={600}
                height={750}
                className="w-full object-cover object-[50%_20%]"
                priority
              />
            </div>
          </div>

        </div>
      </section>

      {/* Bio y credenciales */}
      <section className="bg-brand-surface py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col gap-14 lg:flex-row">

            <div className="flex-1 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                Trayectoria
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                Construye, y después<br />
                <span className="text-brand-accent">enseña lo que construyó.</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                Su frente principal hoy es el <strong className="font-semibold text-brand-text">desarrollo
                de proyectos turísticos con copropiedad</strong>: hacer posible que otros sean
                co-dueños de activos turísticos en Costa Rica, sin tener que construir y operar solos.
              </p>
              <p className="text-brand-muted text-left md:text-justify">
                De ahí sale lo segundo: <strong className="font-semibold text-brand-text">acompañar
                a otros dueños de empresa</strong> a ordenar el negocio, armar el equipo y soltar la
                operación. Certificado por John Maxwell Leadership y autor de
                <em> Secretos para ser un empresario exitoso</em>.
              </p>
              <p className="text-brand-muted text-left md:text-justify">
                Y todo eso nació del ciclismo: más de 22 años construyendo tiendas, comunidades
                digitales, programas de entrenamiento y el primer hotel temático de ciclismo de
                Costa Rica. El deporte sigue siendo de dónde viene todo lo demás.
              </p>
            </div>

            <div className="flex-1">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={15} className="shrink-0 text-brand-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Franja ciclismo */}
      <section className="bg-brand-bg py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/tony/tony-ciclismo-bosque-01.jpg', alt: 'Tony Alvarado en ciclismo de montaña', position: 'object-[50%_65%]' },
              { src: '/images/tony/tony-ciclismo-ruta-01.jpg', alt: 'Tony Alvarado en ciclismo de ruta', position: 'object-[50%_58%]' },
              { src: '/images/tony/tony-ciclismo-pradera-01.jpg', alt: 'Tony Alvarado ciclismo en pradera', position: 'object-[55%_60%]' },
            ]}
          />
        </div>
      </section>

      {/* La historia */}
      <section className="bg-brand-bg py-16">
        <div className="mx-auto max-w-4xl px-6 md:px-12">

          <div className="mb-10 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
              La historia
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              La bicicleta primero casi le quitó la vida.<br />
              <span className="text-brand-green">Luego se convirtió en su propósito.</span>
            </h2>
          </div>

          <div className="space-y-5 text-brand-muted text-left md:text-justify">
            <p>
              Desde niño, Tony tuvo una conexión profunda con la bicicleta. Quería una mejor para competir.
              Su padre le dijo que debía ganársela. Vendió manzanas del terreno de su abuelo hasta reunir
              el dinero. Esa experiencia le enseñó el poder de las ventas, el trabajo y el propósito.
              La bicicleta, desde entonces, no fue solo un deporte: fue la primera lección de vida.
            </p>
            <p>
              A los 16 años, un accidente grave en bicicleta lo dejó hospitalizado más de 34 días.
              Hubo coma. Hubo operaciones. Hubo un momento en que no se sabía si saldría adelante.
              La familia esperaba. El cuerpo de Tony luchaba. Y en ese silencio, algo más profundo
              comenzó a moverse.
            </p>
            <p>
              Cuando despertó, algo cambió para siempre. Entendió que no podía desperdiciar la vida
              que le quedaba. La bicicleta, que primero casi se la quitó, se convirtió en la herramienta
              que Dios usó para reconstruirla. No como metáfora. Como realidad concreta: el movimiento,
              la disciplina, la comunidad ciclista — todo eso fue parte de su recuperación.
            </p>
            <p>
              La recuperación tomó meses. Pero en ese proceso, Tony tomó decisiones que cambiarían su
              trayectoria: estudiar ingeniería en computación, aprender sobre negocios y emprendimiento,
              y entender que una pasión — bien canalizada — puede convertirse en un ecosistema de valor
              para miles de personas.
            </p>
            <p>
              Hoy, todo lo que construye —PuroMTB, Pure Cycling, Bike & Bed Hotels— tiene una sola
              razón de ser: que otros puedan transformar su vida como él transformó la suya. No es
              solo ciclismo. Es el ciclismo como vehículo de disciplina, comunidad, fe y propósito.
              Es un legado que empezó con una bicicleta y unas manzanas, y que hoy alcanza a personas
              en más de 30 países.
            </p>
          </div>

          <div className="my-10 rounded-2xl border border-brand-border bg-brand-card p-8 md:p-10">
            <blockquote className="text-center text-xl font-semibold italic text-brand-text md:text-2xl">
              "La bicicleta casi me quitó la vida. Luego fue la herramienta que Dios usó para
              reconstruirla. Hoy es mi misión."
            </blockquote>
            <p className="mt-5 text-center text-sm text-brand-accent">— Tony Alvarado</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-brand-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/tony-con-john.png"
                  alt="Tony Alvarado con John Maxwell"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-brand-muted">Con John Maxwell</p>
            </div>
            <div className="overflow-hidden rounded-xl border border-brand-border">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/tony/tony-spencer-hoffman.jpg"
                  alt="Tony Alvarado con Spencer Hoffman"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <p className="px-4 py-3 text-sm text-brand-muted">Con Spencer Hoffman</p>
            </div>
          </div>

        </div>
      </section>

      <PageFAQ faqs={pageFaqs} accent="green" />

      <section className="bg-brand-bg py-12">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
          >
            Escríbenos →
          </Link>
        </div>
      </section>

    </main>
  )
}
