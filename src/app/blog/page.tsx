import BlogAccordion from '@/components/sections/BlogAccordion'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

export const metadata = {
  title: 'Blog de ciclismo, liderazgo y vida — Tony Alvarado',
  description:
    'Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike, ciclismo de ruta, emprendimiento, fe y turismo deportivo en Costa Rica. Por Tony Alvarado.',
  alternates: { canonical: '/blog' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/blog#webpage`,
  name: 'Blog de ciclismo, liderazgo y vida — Tony Alvarado',
  description:
    'Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike, ciclismo de ruta, emprendimiento, fe y turismo deportivo en Costa Rica. Por Tony Alvarado.',
  url: `${SITE_URL}/blog`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Blog de Tony Alvarado — Ciclismo, liderazgo y transformación',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Cómo empezar a entrenar ciclismo de forma seria',
      description:
        'El error más común es empezar con demasiada intensidad y sin estructura. Entrenar en serio tiene un método, no solo voluntad.',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Qué debe tener un plan de entrenamiento para ciclistas',
      description:
        'Un plan de entrenamiento serio va mucho más allá de contar kilómetros por semana. Así se estructura uno que realmente funciona.',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Mountain bike en Costa Rica: comunidad, técnica y disciplina',
      description:
        'Costa Rica tiene una geografía hecha para el MTB, y PuroMTB lleva más de 20 años en el centro de esa comunidad ciclista.',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Ciclismo de ruta y MTB: diferencias, beneficios y cómo elegir',
      description:
        'Dos disciplinas con filosofías distintas. La pregunta correcta no es cuál es mejor, sino cuál pedalearás con constancia.',
    },
    {
      '@type': 'ListItem',
      position: 5,
      name: 'Cómo mejorar la resistencia y la mentalidad sobre la bicicleta',
      description:
        'La resistencia en ciclismo se construye en capas: física primero, mental después. Pero las dos están conectadas desde el primer pedalazo.',
    },
    {
      '@type': 'ListItem',
      position: 6,
      name: 'Pure Cycling: entrenamiento de ciclismo online con propósito',
      description:
        'Pure Cycling no es un curso de ciclismo. Es una comunidad de transformación con estructura real, acompañamiento y más de 30 países conectados.',
    },
    {
      '@type': 'ListItem',
      position: 7,
      name: 'PuroMTB: cómo nació una comunidad ciclista en Costa Rica',
      description:
        'En 2004, Tony Alvarado empezó un sitio web de ciclismo cuando nadie más lo hacía en Costa Rica. Hoy es una referencia cultural.',
    },
    {
      '@type': 'ListItem',
      position: 8,
      name: 'Bike & Bed Hotels: turismo deportivo para ciclistas en Costa Rica',
      description:
        'El turismo deportivo de ciclismo crece globalmente. Costa Rica es uno de los mejores destinos del mundo para vivirlo.',
    },
    {
      '@type': 'ListItem',
      position: 9,
      name: 'La bicicleta como herramienta de transformación personal',
      description:
        'A los 16 años, una bicicleta casi le quitó la vida a Tony Alvarado. Años después, fue la misma bicicleta la que Dios usó para reconstruirla.',
    },
    {
      '@type': 'ListItem',
      position: 10,
      name: 'Liderazgo, fe y emprendimiento: lecciones de 22 años',
      description:
        'Más de 22 años construyendo empresas en torno al ciclismo con un hilo conductor que nunca cambió: el propósito.',
    },
  ],
}

export default function BlogPage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Blog
          </p>
          <h1 className="text-4xl font-bold text-brand-text md:text-5xl">
            Ciclismo, liderazgo y vida{' '}
            <span className="text-brand-accent">sobre dos ruedas.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike,
            ciclismo de ruta, emprendimiento, fe, disciplina y turismo deportivo en Costa Rica.
          </p>
        </div>
      </section>

      <BlogAccordion />
    </main>
  )
}
