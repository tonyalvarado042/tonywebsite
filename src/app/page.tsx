import Hero from '@/components/sections/Hero'
import MetricsStrip from '@/components/sections/MetricsStrip'
import AboutTony from '@/components/sections/AboutTony'
import PersonalStory from '@/components/sections/PersonalStory'
import FaithAndPurpose from '@/components/sections/FaithAndPurpose'
import BusinessEcosystem from '@/components/sections/BusinessEcosystem'
import PureCycling from '@/components/sections/PureCycling'
import PuroMTB from '@/components/sections/PuroMTB'
import BikeAndBed from '@/components/sections/BikeAndBed'
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
        text: 'Tony Alvarado ofrece un plan de entrenamiento de ciclismo en Costa Rica totalmente personalizado, diseñado según tu nivel, objetivos y condición física. Como entrenador de ciclismo certificado internacionalmente, Tony combina experiencia real en competencia, metodología profesional y acompañamiento cercano para ayudarte a mejorar tu rendimiento sobre la bicicleta. A través de su plataforma y comunidad de entrenamiento, puedes acceder a un coach de ciclismo que adapta cada sesión a tus metas, ya sea bajar de peso, mejorar resistencia, prepararse para competencias de MTB o simplemente ponerte en forma con el ciclismo. No importa si eres principiante o avanzado, el objetivo es ayudarte a transformar tu vida a través del ciclismo.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuáles son las mejores rutas de ciclismo de montaña (MTB) en Costa Rica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para Tony Alvarado, algunas de las mejores rutas de ciclismo de montaña en Costa Rica están en zonas como La Fortuna, Cartago, Escazú y los alrededores de San José, donde se combinan senderos técnicos, paisajes increíbles y rutas ideales tanto para principiantes como avanzados. Costa Rica se ha convertido en uno de los destinos más atractivos para el ciclismo de montaña y las rutas MTB, gracias a su clima, naturaleza y variedad de terrenos. Además, muchas de las mejores rutas de ciclismo en San José y zonas turísticas están cerca de Bike & Bed Hotels, un proyecto pensado estratégicamente para ciclistas que buscan entrenar, viajar y vivir la experiencia completa del MTB en Costa Rica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo mejorar la técnica de descenso en MTB, enduro o downhill con Tony Alvarado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tony Alvarado ofrece entrenamiento MTB personalizado para ciclistas que quieren mejorar su técnica de descenso, ganar confianza y perder el miedo en terrenos técnicos. A través de Pure Cycling, puedes acceder a talleres presenciales y cursos digitales enfocados en enduro y downhill en Costa Rica. Los entrenamientos están diseñados para ayudarte a dominar curvas, frenado, postura y control de la bicicleta, sin importar si estás iniciando en el MTB o ya compites en rutas de enduro o downhill.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el entrenamiento por potencia o vatios y por qué es clave para mejorar mi rendimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para Tony Alvarado, el entrenamiento de potencia en ciclismo es la forma más inteligente de mejorar rendimiento porque te permite entrenar con datos reales y no solo "por sensaciones". Los vatios muestran exactamente cuánto esfuerzo estás haciendo sobre la bicicleta, ayudándote a avanzar más rápido, evitar sobreentrenamiento y mejorar resistencia y velocidad. En palabras simples: entrenar por potencia es como dejar de manejar con los ojos cerrados. Por eso, en Pure Cycling utilizan métricas de potencia y vatios para crear entrenamientos más precisos y efectivos para cada ciclista.',
      },
    },
    {
      '@type': 'Question',
      name: 'Guía de ciclismo para principiantes: ¿qué equipo básico necesito realmente para empezar y no gastar de más?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Si estás iniciando en el ciclismo para principiantes, no necesitas comprar lo más caro para disfrutar y progresar. Lo básico para empezar en el mountain bike es: una bicicleta adecuada para tu tipo de ruta, casco de buena calidad, lycra cómoda, guantes e hidratación. El mountain bike o MTB es una modalidad de ciclismo enfocada en rutas de montaña, senderos y terrenos irregulares, ideal para mejorar condición física y disfrutar la aventura. Lo más importante al comenzar es elegir el equipo correcto según tu nivel y objetivos para evitar gastar de más. En PuroMTB te asesoran gratis para ayudarte a escoger tu primera bicicleta y el equipo ideal para iniciar en el ciclismo con seguridad y confianza.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Existe un plan de nutrición para ciclistas para mejorar el rendimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Una buena nutrición para el ciclismo puede marcar la diferencia entre sentirse sin energía o rendir al máximo en cada entrenamiento. Para Tony Alvarado, la clave está en aprender qué comer antes, durante y después de cada rodada. Antes de salir en bicicleta necesitas energía limpia y buena hidratación; durante la ruta, mantener carbohidratos y electrolitos; y después, recuperar músculos con proteína y alimentación adecuada. En Pure Cycling enseñan cómo combinar nutrición, entrenamiento y mentalidad para mejorar rendimiento, bajar grasa y tener más resistencia sobre la bicicleta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es Bike & Bed Hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bike & Bed Hotels es un proyecto creado por Tony Alvarado después de más de 22 años viviendo el ciclismo de montaña en Costa Rica y entendiendo las necesidades reales de los ciclistas. La visión de Bike & Bed Hotels es crear el primer hotel temático para ciclistas, donde nacionales y extranjeros puedan encontrar hospedaje, talleres, rutas guiadas, entrenamiento y comunidad en un solo lugar. Ubicado estratégicamente cerca de algunas de las mejores rutas de ciclismo de montaña en Costa Rica, el proyecto busca convertirse en un punto de encuentro para quienes viven la pasión del MTB y la aventura.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es PuroMTB y qué servicios exclusivos ofrece para la comunidad de ciclismo de montaña en Costa Rica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PuroMTB es una de las marcas más reconocidas del ciclismo de montaña en Costa Rica, fundada por Tony Alvarado después de más de dos décadas dentro de la industria del MTB. Además de sus tiendas físicas y ecommerce, PuroMTB ofrece talleres especializados, asesoría personalizada, bicicletas y accesorios de marcas internacionales, convirtiéndose en un respaldo de confianza para miles de ciclistas en el país. La marca también ha sido clave en el crecimiento de la comunidad de ciclismo de montaña en Costa Rica, apoyando entrenamientos, eventos y nuevos ciclistas que quieren iniciar en el MTB con el equipo correcto.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuál es el secreto detrás de un buen plan de entrenamiento ciclista?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Muchas personas creen que para mejorar en ciclismo solo hay que acumular kilómetros, pero un buen plan de entrenamiento de ciclismo en Costa Rica va mucho más allá. Para Tony Alvarado, la clave está en entrenar con estructura, descanso, nutrición y objetivos claros según tu nivel. Un entrenamiento sin planificación puede hacerte perder tiempo, energía y hasta motivación. Por eso, en Pure Cycling desarrollan programas y cursos digitales que ayudan a ciclistas principiantes y avanzados a mejorar rendimiento, técnica y condición física de manera inteligente y sostenible.',
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

export default function HomePage() {
  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={puroMTBOrg} />
      <JsonLd data={faqSchema} />
      <Hero />
      <MetricsStrip />
      <AboutTony />
      <PersonalStory />
      <FaithAndPurpose />
      <BusinessEcosystem />
      <PureCycling />
      <PuroMTB />
      <BikeAndBed />
      <Books />
      <Mentors />
      <Speaking />
      <FAQ />
      <Contact />
    </main>
  )
}
