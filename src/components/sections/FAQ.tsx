'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: '¿Qué es Pure Cycling?',
    a: 'Pure Cycling es la comunidad de entrenamiento de ciclismo fundada por Tony Alvarado. Integra un plan de entrenamiento personalizado con nutrición, mentalidad, movilidad, fuerza y espiritualidad en un solo programa, con miembros en más de 30 países. Diseñado para transformar tu vida sobre la bicicleta.',
  },
  {
    q: '¿Necesito experiencia en ciclismo para unirme a Pure Cycling?',
    a: 'No. Pure Cycling recibe tanto a principiantes como a ciclistas con experiencia. El programa está diseñado para adaptarse a cada nivel y acompañar a cada persona en su proceso de transformación.',
  },
  {
    q: '¿Qué es Bike & Bed Hotels?',
    a: 'Bike & Bed Hotels es un modelo de hotel temático para ciclistas en Costa Rica con operación profesional. Está diseñado para ciclistas, viajeros activos y comunidades deportivas. También existe una oportunidad para inversionistas interesados en turismo ciclista en Costa Rica y turismo deportivo a escala global.',
  },
  {
    q: '¿Cómo puedo conocer la oportunidad de inversión en Bike & Bed Hotels?',
    a: 'El primer paso es agendar una llamada con el equipo para conocer el modelo, las ubicaciones y las opciones disponibles. Toda información financiera se presenta de forma personalizada. Puedes contactarnos a través del formulario.',
  },
  {
    q: '¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?',
    a: 'Sí. Tony Alvarado está disponible para eventos presenciales y virtuales en Costa Rica y en el extranjero. Para solicitar una conferencia, completa el formulario de contacto con los detalles del evento.',
  },
  {
    q: '¿Cómo puedo comprar el libro de Tony Alvarado?',
    a: '"Secretos para ser un empresario exitoso" está disponible en Amazon. El enlace de compra directo estará disponible próximamente en esta página.',
  },
  {
    q: '¿Qué es PuroMTB?',
    a: 'PuroMTB es la tienda y comunidad de mountain bike y ciclismo de ruta fundada por Tony Alvarado en Costa Rica. Desde 2004, ha construido una presencia con tienda física, venta online de bicicletas MTB y de ruta, y una comunidad ciclista de aproximadamente medio millón de seguidores.',
  },
  {
    q: '¿Qué tipo de ciclismo enseña Tony Alvarado en Pure Cycling?',
    a: 'Pure Cycling trabaja tanto mountain bike como ciclismo de ruta, adaptado al nivel de cada miembro. El plan de entrenamiento personalizado incluye sesiones específicas para cada disciplina, acompañadas por coaches certificados.',
  },
  {
    q: '¿Se puede hacer turismo de ciclismo en Costa Rica con Bike & Bed Hotels?',
    a: 'Sí. Bike & Bed Hotels es el hotel para ciclistas diseñado para quienes buscan viajes de ciclismo en Costa Rica. Combina turismo deportivo activo, alojamiento temático y acceso a la comunidad ciclista del país en un modelo pensado para deportistas y viajeros activos.',
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
            <p className="pb-5 text-sm text-brand-muted">{a}</p>
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
