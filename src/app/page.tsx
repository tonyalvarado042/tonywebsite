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
      name: '¿Qué es Pure Cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pure Cycling es la comunidad de entrenamiento de ciclismo fundada por Tony Alvarado. Integra un plan de entrenamiento personalizado con nutrición, mentalidad, movilidad, fuerza y espiritualidad en un solo programa, con miembros en más de 30 países. Diseñado para transformar tu vida sobre la bicicleta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Necesito experiencia en ciclismo para unirme a Pure Cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Pure Cycling recibe tanto a principiantes como a ciclistas con experiencia. El programa está diseñado para adaptarse a cada nivel y acompañar a cada persona en su proceso de transformación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es Bike & Bed Hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Bike & Bed Hotels es un modelo de hotel temático para ciclistas en Costa Rica con operación profesional. Está diseñado para ciclistas, viajeros activos y comunidades deportivas. También existe una oportunidad para inversionistas interesados en turismo ciclista en Costa Rica y turismo deportivo a escala global.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo conocer la oportunidad de inversión en Bike & Bed Hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El primer paso es agendar una llamada con el equipo para conocer el modelo, las ubicaciones y las opciones disponibles. Toda información financiera se presenta de forma personalizada. Puedes contactarnos a través del formulario.',
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
    {
      '@type': 'Question',
      name: '¿Cómo puedo comprar el libro de Tony Alvarado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '"Secretos para ser un empresario exitoso" está disponible en Amazon. El enlace de compra directo estará disponible próximamente en esta página.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es PuroMTB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PuroMTB es la tienda y comunidad de mountain bike y ciclismo de ruta fundada por Tony Alvarado en Costa Rica. Desde 2004, ha construido una presencia con tienda física, venta online de bicicletas MTB y de ruta, y una comunidad ciclista de aproximadamente medio millón de seguidores.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué tipo de ciclismo enseña Tony Alvarado en Pure Cycling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pure Cycling trabaja tanto mountain bike como ciclismo de ruta, adaptado al nivel de cada miembro. El plan de entrenamiento personalizado incluye sesiones específicas para cada disciplina, acompañadas por coaches certificados.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede hacer turismo de ciclismo en Costa Rica con Bike & Bed Hotels?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sí. Bike & Bed Hotels es el hotel para ciclistas diseñado para quienes buscan viajes de ciclismo en Costa Rica. Combina turismo deportivo activo, alojamiento temático y acceso a la comunidad ciclista del país en un modelo pensado para deportistas y viajeros activos.',
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
