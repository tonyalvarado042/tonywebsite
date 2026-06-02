'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

function B({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-brand-text">{children}</strong>
}

function Li({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent/70" />
      <span>{children}</span>
    </li>
  )
}

type FAQEntry = { q: string; a: ReactNode }

const faqs: FAQEntry[] = [
  {
    q: '¿Cómo puedo tener un plan de entrenamiento de ciclismo personalizado en Costa Rica con Tony Alvarado?',
    a: (
      <>
        <p>
          <B>Tony Alvarado</B> ofrece planes de <B>entrenamiento personalizado</B> diseñados
          según tu nivel, objetivos y condición física, con acompañamiento real a través de{' '}
          <B>Pure Cycling</B>. Como entrenador certificado, combina metodología profesional y
          seguimiento cercano para ayudarte a mejorar tu rendimiento sobre la bicicleta.
        </p>
        <ul className="space-y-2">
          <Li>Plan diseñado para tu nivel, tiempo disponible y metas específicas</Li>
          <Li>Acompañamiento de coaches certificados — no solo un documento de Excel</Li>
          <Li>Cubre desde bajar de peso y mejorar resistencia hasta prepararte para competencias de MTB</Li>
          <Li>Integrado con nutrición, movilidad y mentalidad, no solo el pedaleo</Li>
          <Li>Funciona tanto para principiantes como para ciclistas intermedios</Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Cuáles son las mejores rutas de ciclismo de montaña (MTB) en Costa Rica?',
    a: (
      <>
        <p>
          <B>Costa Rica</B> es uno de los destinos más atractivos de Latinoamérica para el
          ciclismo de montaña, con rutas para todos los niveles y clima que permite rodar
          durante todo el año.
        </p>
        <ul className="space-y-2">
          <Li>Zonas destacadas: La Fortuna, Cartago, Escazú y los alrededores de San José</Li>
          <Li>Senderos técnicos con alturas volcánicas, bosques y paisajes únicos</Li>
          <Li>Rutas ideales tanto para principiantes como para ciclistas avanzados</Li>
          <Li>
            Muchas rutas accesibles desde <B>Bike & Bed Hotels</B>, diseñado estratégicamente
            para ciclistas que buscan entrenar, viajar y vivir el MTB en Costa Rica
          </Li>
          <Li>
            Comunidad activa organizada a través de <B>PuroMTB</B>, con eventos y guías locales
          </Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Cómo mejorar la técnica de descenso en MTB, enduro o downhill con Tony Alvarado?',
    a: (
      <>
        <p>
          A través de <B>Pure Cycling</B>, <B>Tony Alvarado</B> ofrece entrenamiento{' '}
          <B>MTB</B> personalizado para mejorar la técnica de descenso, ganar confianza y
          perder el miedo en terrenos técnicos.
        </p>
        <ul className="space-y-2">
          <Li>Talleres presenciales y cursos digitales enfocados en enduro y downhill en Costa Rica</Li>
          <Li>Trabajo específico en curvas, frenado, postura y control de la bicicleta</Li>
          <Li>Diseñado para principiantes en MTB y para quienes ya compiten en rutas técnicas</Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Qué es el entrenamiento por potencia o vatios y por qué es clave para mejorar mi rendimiento?',
    a: (
      <>
        <p>
          El <B>entrenamiento por potencia</B> es la forma más inteligente de mejorar en
          ciclismo porque permite entrenar con datos reales y no solo &ldquo;por
          sensaciones&rdquo;. Los vatios muestran exactamente cuánto esfuerzo estás haciendo
          sobre la bicicleta.
        </p>
        <ul className="space-y-2">
          <Li>Permite avanzar más rápido y evitar el sobreentrenamiento</Li>
          <Li>Mejora la resistencia y la velocidad de forma medible y progresiva</Li>
          <Li>Es dejar de entrenar con los ojos cerrados: los datos guían cada sesión</Li>
          <Li>
            En <B>Pure Cycling</B> se usan métricas de potencia para crear programas precisos
            y efectivos para cada ciclista
          </Li>
        </ul>
      </>
    ),
  },
  {
    q: 'Guía de ciclismo para principiantes: ¿qué equipo básico necesito realmente para empezar y no gastar de más?',
    a: (
      <>
        <p>
          Para empezar en ciclismo no necesitas comprar lo más caro. El <B>MTB</B> es ideal
          para quienes buscan rutas de montaña, senderos y terrenos variados. Lo esencial es
          elegir el equipo correcto desde el inicio para progresar sin gastar de más.
        </p>
        <ul className="space-y-2">
          <Li>Bicicleta adecuada para tu tipo de ruta (asfalto o montaña)</Li>
          <Li>Casco de buena calidad — imprescindible</Li>
          <Li>Lycra cómoda, guantes e hidratación básica</Li>
          <Li>
            En <B>PuroMTB</B> asesoran gratis para elegir tu primera bicicleta con seguridad
            y confianza
          </Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Existe un plan de nutrición para ciclistas para mejorar el rendimiento?',
    a: (
      <>
        <p>
          Sí. Una buena <B>nutrición para ciclistas</B> puede marcar la diferencia entre
          sentirte sin energía o rendir al máximo en cada entrenamiento.
        </p>
        <ul className="space-y-2">
          <Li>
            <span className="font-medium text-brand-text">Antes de salir:</span>{' '}
            energía limpia y buena hidratación
          </Li>
          <Li>
            <span className="font-medium text-brand-text">Durante la ruta:</span>{' '}
            mantener carbohidratos y electrolitos
          </Li>
          <Li>
            <span className="font-medium text-brand-text">Después del entreno:</span>{' '}
            recuperar músculos con proteína y alimentación adecuada
          </Li>
          <Li>
            En <B>Pure Cycling</B> se enseña a combinar nutrición, entrenamiento y mentalidad
            para mejorar rendimiento y tener más resistencia sobre la bicicleta
          </Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Qué es Bike & Bed Hotels?',
    a: (
      <>
        <p>
          <B>Bike & Bed Hotels</B> es un hotel temático creado por <B>Tony Alvarado</B> en{' '}
          <B>Costa Rica</B> para ciclistas que buscan hospedaje, talleres, rutas guiadas,
          entrenamiento y comunidad en un solo lugar.
        </p>
        <ul className="space-y-2">
          <Li>Estratégicamente ubicado cerca de las mejores rutas de MTB del país</Li>
          <Li>Pensado para nacionales y extranjeros que viven la pasión por la bicicleta</Li>
          <Li>Con visión de expandirse hacia una red de hoteles temáticos de ciclismo a nivel internacional</Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Qué es PuroMTB y qué servicios exclusivos ofrece para la comunidad de ciclismo de montaña en Costa Rica?',
    a: (
      <>
        <p>
          <B>PuroMTB</B> es una de las marcas más reconocidas del ciclismo de montaña en{' '}
          <B>Costa Rica</B>, fundada por <B>Tony Alvarado</B> con más de dos décadas dentro
          de la industria del MTB.
        </p>
        <ul className="space-y-2">
          <Li>Tiendas físicas y ecommerce con bicicletas y accesorios de marcas internacionales</Li>
          <Li>Talleres especializados y asesoría personalizada para ciclistas de todos los niveles</Li>
          <Li>Más de 20 años apoyando eventos, comunidades y nuevos ciclistas en Costa Rica</Li>
          <Li>Un referente cultural del ciclismo costarricense, no solo una tienda</Li>
        </ul>
      </>
    ),
  },
  {
    q: '¿Cuál es el secreto detrás de un buen plan de entrenamiento ciclista?',
    a: (
      <>
        <p>
          El secreto no está en acumular kilómetros. Un buen <B>plan de entrenamiento</B>{' '}
          en ciclismo combina estructura, descanso, nutrición y objetivos claros según tu nivel.
        </p>
        <ul className="space-y-2">
          <Li>Sin planificación, el entrenamiento puede hacerte perder tiempo, energía y motivación</Li>
          <Li>
            En <B>Pure Cycling</B> se desarrollan programas para ciclistas principiantes y avanzados
          </Li>
          <Li>El enfoque: mejorar rendimiento, técnica y condición de forma inteligente y sostenible</Li>
        </ul>
      </>
    ),
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

function FAQItem({ q, a }: FAQEntry) {
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
            <div className="space-y-3 pb-5 text-sm text-brand-muted">{a}</div>
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
