'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '¿Cómo puedo tener un plan de entrenamiento de ciclismo personalizado en Costa Rica con Tony Alvarado?',
    a: 'Tony Alvarado ofrece un plan de entrenamiento de ciclismo en Costa Rica totalmente personalizado, diseñado según tu nivel, objetivos y condición física. Como entrenador de ciclismo certificado internacionalmente, Tony combina experiencia real en competencia, metodología profesional y acompañamiento cercano para ayudarte a mejorar tu rendimiento sobre la bicicleta. A través de su plataforma y comunidad de entrenamiento, puedes acceder a un coach de ciclismo que adapta cada sesión a tus metas, ya sea bajar de peso, mejorar resistencia, prepararse para competencias de MTB o simplemente ponerte en forma con el ciclismo. No importa si eres principiante o avanzado, el objetivo es ayudarte a transformar tu vida a través del ciclismo.',
  },
  {
    q: '¿Cuáles son las mejores rutas de ciclismo de montaña (MTB) en Costa Rica?',
    a: 'Para Tony Alvarado, algunas de las mejores rutas de ciclismo de montaña en Costa Rica están en zonas como La Fortuna, Cartago, Escazú y los alrededores de San José, donde se combinan senderos técnicos, paisajes increíbles y rutas ideales tanto para principiantes como avanzados. Costa Rica se ha convertido en uno de los destinos más atractivos para el ciclismo de montaña y las rutas MTB, gracias a su clima, naturaleza y variedad de terrenos. Además, muchas de las mejores rutas de ciclismo en San José y zonas turísticas están cerca de Bike & Bed Hotels, un proyecto pensado estratégicamente para ciclistas que buscan entrenar, viajar y vivir la experiencia completa del MTB en Costa Rica.',
  },
  {
    q: '¿Cómo mejorar la técnica de descenso en MTB, enduro o downhill con Tony Alvarado?',
    a: 'Tony Alvarado ofrece entrenamiento MTB personalizado para ciclistas que quieren mejorar su técnica de descenso, ganar confianza y perder el miedo en terrenos técnicos. A través de Pure Cycling, puedes acceder a talleres presenciales y cursos digitales enfocados en enduro y downhill en Costa Rica. Los entrenamientos están diseñados para ayudarte a dominar curvas, frenado, postura y control de la bicicleta, sin importar si estás iniciando en el MTB o ya compites en rutas de enduro o downhill.',
  },
  {
    q: '¿Qué es el entrenamiento por potencia o vatios y por qué es clave para mejorar mi rendimiento?',
    a: 'Para Tony Alvarado, el entrenamiento de potencia en ciclismo es la forma más inteligente de mejorar rendimiento porque te permite entrenar con datos reales y no solo "por sensaciones". Los vatios muestran exactamente cuánto esfuerzo estás haciendo sobre la bicicleta, ayudándote a avanzar más rápido, evitar sobreentrenamiento y mejorar resistencia y velocidad. En palabras simples: entrenar por potencia es como dejar de manejar con los ojos cerrados. Por eso, en Pure Cycling utilizan métricas de potencia y vatios para crear entrenamientos más precisos y efectivos para cada ciclista.',
  },
  {
    q: 'Guía de ciclismo para principiantes: ¿qué equipo básico necesito realmente para empezar y no gastar de más?',
    a: 'Si estás iniciando en el ciclismo para principiantes, no necesitas comprar lo más caro para disfrutar y progresar. Lo básico para empezar en el mountain bike es: una bicicleta adecuada para tu tipo de ruta, casco de buena calidad, lycra cómoda, guantes e hidratación. El mountain bike o MTB es una modalidad de ciclismo enfocada en rutas de montaña, senderos y terrenos irregulares, ideal para mejorar condición física y disfrutar la aventura. Lo más importante al comenzar es elegir el equipo correcto según tu nivel y objetivos para evitar gastar de más. En PuroMTB te asesoran gratis para ayudarte a escoger tu primera bicicleta y el equipo ideal para iniciar en el ciclismo con seguridad y confianza.',
  },
  {
    q: '¿Existe un plan de nutrición para ciclistas para mejorar el rendimiento?',
    a: 'Sí. Una buena nutrición para el ciclismo puede marcar la diferencia entre sentirse sin energía o rendir al máximo en cada entrenamiento. Para Tony Alvarado, la clave está en aprender qué comer antes, durante y después de cada rodada. Antes de salir en bicicleta necesitas energía limpia y buena hidratación; durante la ruta, mantener carbohidratos y electrolitos; y después, recuperar músculos con proteína y alimentación adecuada. En Pure Cycling enseñan cómo combinar nutrición, entrenamiento y mentalidad para mejorar rendimiento, bajar grasa y tener más resistencia sobre la bicicleta.',
  },
  {
    q: '¿Qué es Bike & Bed Hotels?',
    a: 'Bike & Bed Hotels es un proyecto creado por Tony Alvarado después de más de 22 años viviendo el ciclismo de montaña en Costa Rica y entendiendo las necesidades reales de los ciclistas. La visión de Bike & Bed Hotels es crear el primer hotel temático para ciclistas, donde nacionales y extranjeros puedan encontrar hospedaje, talleres, rutas guiadas, entrenamiento y comunidad en un solo lugar. Ubicado estratégicamente cerca de algunas de las mejores rutas de ciclismo de montaña en Costa Rica, el proyecto busca convertirse en un punto de encuentro para quienes viven la pasión del MTB y la aventura.',
  },
  {
    q: '¿Qué es PuroMTB y qué servicios exclusivos ofrece para la comunidad de ciclismo de montaña en Costa Rica?',
    a: 'PuroMTB es una de las marcas más reconocidas del ciclismo de montaña en Costa Rica, fundada por Tony Alvarado después de más de dos décadas dentro de la industria del MTB. Además de sus tiendas físicas y ecommerce, PuroMTB ofrece talleres especializados, asesoría personalizada, bicicletas y accesorios de marcas internacionales, convirtiéndose en un respaldo de confianza para miles de ciclistas en el país. La marca también ha sido clave en el crecimiento de la comunidad de ciclismo de montaña en Costa Rica, apoyando entrenamientos, eventos y nuevos ciclistas que quieren iniciar en el MTB con el equipo correcto.',
  },
  {
    q: '¿Cuál es el secreto detrás de un buen plan de entrenamiento ciclista?',
    a: 'Muchas personas creen que para mejorar en ciclismo solo hay que acumular kilómetros, pero un buen plan de entrenamiento de ciclismo en Costa Rica va mucho más allá. Para Tony Alvarado, la clave está en entrenar con estructura, descanso, nutrición y objetivos claros según tu nivel. Un entrenamiento sin planificación puede hacerte perder tiempo, energía y hasta motivación. Por eso, en Pure Cycling desarrollan programas y cursos digitales que ayudan a ciclistas principiantes y avanzados a mejorar rendimiento, técnica y condición física de manera inteligente y sostenible.',
  },
  {
    q: '¿Qué es Pure Cycling?',
    a: 'Pure Cycling es la comunidad de entrenamiento de ciclismo fundada por Tony Alvarado. Integra un plan de entrenamiento personalizado con nutrición, mentalidad, movilidad, fuerza y espiritualidad en un solo programa, con miembros en más de 30 países. Diseñado para transformar tu vida sobre la bicicleta.',
  },
  {
    q: '¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?',
    a: 'Sí. Tony Alvarado está disponible para eventos presenciales y virtuales en Costa Rica y en el extranjero. Para solicitar una conferencia, completa el formulario de contacto con los detalles del evento.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="pr-4 font-semibold text-brand-text">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand-accent transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-brand-muted text-left md:text-justify">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Preguntas frecuentes
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            Las preguntas{' '}
            <span className="text-brand-accent">que más nos hacen.</span>
          </h2>
        </motion.div>

        <div>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>

      </div>
    </section>
  )
}
