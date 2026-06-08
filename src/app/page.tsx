import Hero from '@/components/sections/Hero'
import MetricsStrip from '@/components/sections/MetricsStrip'
import AboutTony from '@/components/sections/AboutTony'
import FaithAndPurpose from '@/components/sections/FaithAndPurpose'
import BusinessEcosystem from '@/components/sections/BusinessEcosystem'
import PhotoStrip from '@/components/ui/PhotoStrip'
import Books from '@/components/sections/Books'
import Mentors from '@/components/sections/Mentors'
// import Testimonials from '@/components/sections/Testimonials' — oculto hasta tener testimonios reales
import Speaking from '@/components/sections/Speaking'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'
import JsonLd from '@/components/JsonLd'
import { puroMTBOrg, SITE_URL, websiteRef, personRef } from '@/lib/structured-data'

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  name: 'Tony Alvarado — Coach y entrenador de ciclismo en Costa Rica',
  description:
    'Coach y entrenador de ciclismo en Costa Rica. Fundador de Pure Cycling, PuroMTB y Bike & Bed Hotels. Más de 22 años construyendo comunidad y propósito alrededor del mountain bike y el ciclismo de ruta.',
  url: SITE_URL,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo puedo tener un plan de entrenamiento de ciclismo personalizado en Costa Rica con Tony Alvarado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tony Alvarado ofrece planes de entrenamiento personalizado diseñados según tu nivel, objetivos y condición física, con acompañamiento real a través de Pure Cycling. El plan incluye: diseño para tus metas específicas, coaches certificados, cobertura de nutrición, movilidad y mentalidad, y opciones tanto para principiantes como para ciclistas intermedios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuáles son las mejores rutas de ciclismo de montaña (MTB) en Costa Rica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costa Rica es uno de los destinos más atractivos de Latinoamérica para el ciclismo de montaña, con rutas para todos los niveles y clima que permite rodar todo el año. Zonas destacadas: La Fortuna, Cartago, Escazú y los alrededores de San José. Muchas rutas son accesibles desde Bike & Bed Hotels, diseñado para ciclistas, y la comunidad está organizada a través de PuroMTB, con eventos y guías locales.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo mejorar la técnica de descenso en MTB, enduro o downhill con Tony Alvarado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A través de Pure Cycling, Tony Alvarado ofrece entrenamiento MTB personalizado para mejorar la técnica de descenso. Incluye talleres presenciales y cursos digitales de enduro y downhill, trabajo específico en curvas, frenado, postura y control de bicicleta. Diseñado para principiantes en MTB y para quienes ya compiten en rutas técnicas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el entrenamiento por potencia o vatios y por qué es clave para mejorar mi rendimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El entrenamiento por potencia permite entrenar con datos reales, no solo por sensaciones. Los vatios muestran el esfuerzo exacto sobre la bicicleta, permiten evitar el sobreentrenamiento y mejoran resistencia y velocidad de forma medible. En Pure Cycling se usan métricas de potencia para crear programas precisos y efectivos para cada ciclista.',
      },
    },
    {
      '@type': 'Question',
      name: 'Guía de ciclismo para principiantes: ¿qué equipo básico necesito realmente para empezar y no gastar de más?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para empezar en ciclismo no necesitas lo más caro. El equipo básico para MTB incluye: bicicleta adecuada para tu tipo de ruta, casco de buena calidad, lycra cómoda, guantes e hidratación. En PuroMTB asesoran gratis para elegir tu primera bicicleta con seguridad y confianza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Existe un plan de nutrición para ciclistas para mejorar el rendimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Una buena nutrición para ciclistas es clave para el rendimiento. Antes de salir: energía limpia e hidratación. Durante la ruta: carbohidratos y electrolitos. Después del entreno: proteína y recuperación muscular. En Pure Cycling se enseña a combinar nutrición, entrenamiento y mentalidad para mejorar rendimiento y resistencia.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es Bike & Bed Hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bike & Bed Hotels es un hotel temático creado por Tony Alvarado en Costa Rica para ciclistas que buscan hospedaje, talleres, rutas guiadas, entrenamiento y comunidad en un solo lugar. Está ubicado cerca de las mejores rutas de MTB del país y tiene visión de expansión hacia una red internacional de hoteles temáticos de ciclismo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es PuroMTB y qué servicios exclusivos ofrece para la comunidad de ciclismo de montaña en Costa Rica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PuroMTB es una de las marcas más reconocidas del ciclismo de montaña en Costa Rica, fundada por Tony Alvarado con más de dos décadas en la industria. Ofrece tiendas físicas, ecommerce, talleres especializados y asesoría personalizada para ciclistas de todos los niveles. Más de 20 años apoyando la comunidad ciclista costarricense.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el secreto detrás de un buen plan de entrenamiento ciclista?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El secreto no está en acumular kilómetros. Un buen plan de entrenamiento en ciclismo combina estructura, descanso, nutrición y objetivos claros. Sin planificación, el entrenamiento puede hacerte perder tiempo, energía y motivación. En Pure Cycling se desarrollan programas para mejorar rendimiento, técnica y condición de forma inteligente y sostenible.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es Pure Cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pure Cycling es la comunidad de entrenamiento de ciclismo fundada por Tony Alvarado. Integra un plan de entrenamiento personalizado con nutrición, mentalidad, movilidad, fuerza y espiritualidad en un solo programa, con miembros en más de 30 países. Diseñado para transformar tu vida sobre la bicicleta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Tony Alvarado está disponible para eventos presenciales y virtuales en Costa Rica y en el extranjero. Para solicitar una conferencia, completa el formulario de contacto con los detalles del evento.',
      },
    },
  ],
}

/* ── Separador visual sutil entre secciones ── */
function SectionDivider() {
  return (
    <div
      aria-hidden
      className="mx-auto max-w-4xl px-6 md:px-12"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-brand-border/50 to-transparent" />
    </div>
  )
}

export default function HomePage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={puroMTBOrg} />
      <JsonLd data={faqSchema} />

      <Hero />
      <MetricsStrip />
      <AboutTony />
      <SectionDivider />
      <FaithAndPurpose />
      <SectionDivider />
      <section className="bg-brand-bg py-10">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <PhotoStrip
            photos={[
              { src: '/images/tony/tony-ciclismo-bosque-01.jpg', alt: 'Tony Alvarado ciclismo de montaña', position: 'object-[50%_65%]' },
              { src: '/images/tony/tony-ciclismo-ruta-01.jpg', alt: 'Tony Alvarado ciclismo de ruta', position: 'object-[50%_58%]' },
              { src: '/images/tony/tony-ciclismo-vacas-02.jpg', alt: 'Tony Alvarado ciclismo en el campo', position: 'object-[50%_65%]' },
            ]}
          />
        </div>
      </section>
      <SectionDivider />
      <BusinessEcosystem />
      <SectionDivider />
      <Books />
      <SectionDivider />
      <Mentors />
      <Speaking />
      <Contact />
      <FAQ />
    </main>
  )
}
