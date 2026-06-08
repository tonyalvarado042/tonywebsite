import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2 } from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import PhotoStrip from '@/components/ui/PhotoStrip'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Sobre Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Conoce la historia de Tony Alvarado (Anthony Alvarado): su accidente a los 16 años, cómo el ciclismo de montaña y de ruta transformó su vida y el propósito detrás de sus empresas en Costa Rica.',
  alternates: { canonical: '/sobre-mi' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/sobre-mi#webpage`,
  name: 'Sobre Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Conoce la historia de Tony Alvarado (Anthony Alvarado): su accidente a los 16 años, cómo el ciclismo de montaña y de ruta transformó su vida y el propósito detrás de sus empresas en Costa Rica.',
  url: `${SITE_URL}/sobre-mi`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Sobre Tony Alvarado', item: `${SITE_URL}/sobre-mi` },
  ],
}

const highlights = [
  'Ingeniero de computación y empresario',
  'Coach y entrenador certificado de ciclismo',
  'Certificado por John Maxwell Leadership',
  'Fundador de PuroMTB (desde 2004)',
  'Fundador de Pure Cycling y Bike & Bed Hotels',
  'Más de 22 años de trayectoria empresarial',
  'Autor publicado en Amazon',
  'San José, Costa Rica',
]

export default function SobreMiPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-14 px-6 md:flex-row md:px-12">

          <div className="flex-1 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Sobre Tony Alvarado
            </p>
            <h1 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
              Empezó vendiendo manzanas para comprarse una bicicleta.<br />
              <span className="text-brand-accent">Hoy lleva más de 22 años construyendo con esa misma disciplina.</span>
            </h1>
            <p className="text-brand-muted text-left md:text-justify">
              Ingeniero de computación de formación. Empresario de vocación.
              Fundó PuroMTB en 2004 cuando el ciclismo online en Costa Rica era casi inexistente.
              Hoy tiene tres empresas que han facturado millones de dólares.
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
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                Trayectoria
              </p>
              <h2 className="text-3xl font-bold text-brand-text">
                Coach certificado.<br />
                <span className="text-brand-accent">Empresario con historia real.</span>
              </h2>
              <p className="text-brand-muted text-left md:text-justify">
                Coach certificado de ciclismo y certificado por John Maxwell Leadership.
                Autor de <em>Secretos para ser un empresario exitoso</em>.
                Pure Cycling, su programa online, tiene miembros en más de 30 países.
              </p>
              <p className="text-brand-muted text-left md:text-justify">
                A lo largo de más de 22 años construyó un ecosistema de empresas
                alrededor del ciclismo: tiendas, comunidades digitales, programas de entrenamiento
                y el primer hotel temático de ciclismo en Costa Rica con visión de expansión global.
              </p>
            </div>

            <div className="flex-1">
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-brand-muted">
                    <CheckCircle2 size={15} className="shrink-0 text-brand-accent" />
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              La historia
            </p>
            <h2 className="text-3xl font-bold text-brand-text">
              La bicicleta primero casi le quitó la vida.<br />
              <span className="text-brand-accent">Luego se convirtió en su propósito.</span>
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

          <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
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

          <div className="text-center">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Escríbenos →
            </Link>
          </div>

        </div>
      </section>

    </main>
  )
}
