'use client'

import { motion } from 'framer-motion'

export default function PersonalStory() {
  return (
    <section id="historia" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-4xl px-6 md:px-12">

        <motion.div
          className="space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
            La historia de Tony
          </p>
          <h2 className="text-4xl font-bold leading-tight text-brand-text md:text-5xl">
            La bicicleta primero casi<br />me quitó la vida.<br />
            <span className="text-brand-accent">Luego se convirtió en mi propósito.</span>
          </h2>
        </motion.div>

        <motion.div
          className="mt-12 space-y-6 text-lg text-brand-muted text-left md:text-justify"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p>
            Desde niño, Tony tuvo una conexión profunda con la bicicleta. Quería una mejor para competir.
            Su padre le dijo que debía ganársela. Vendió manzanas del terreno de su abuelo hasta reunir
            el dinero. Esa experiencia le enseñó el poder de las ventas, el trabajo y el propósito.
          </p>
          <p>
            A los 16 años, un accidente grave en bicicleta lo dejó hospitalizado más de 34 días.
            Hubo coma. Hubo operaciones. Hubo un momento en que no se sabía si saldría adelante.
          </p>
          <p>
            Cuando despertó, algo cambió para siempre. Entendió que no podía desperdiciar la vida
            que le quedaba. La bicicleta, que primero casi se la quitó, se convirtió en la herramienta
            que Dios usó para reconstruirla.
          </p>
          <p>
            Hoy, todo lo que construye —cada empresa, cada comunidad, cada programa— tiene una sola
            razón de ser: que otros puedan transformar su vida como él transformó la suya.
          </p>
        </motion.div>

        <motion.div
          className="mt-12 rounded-2xl border border-brand-border bg-brand-card p-8 md:p-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <blockquote className="text-center text-xl font-semibold italic text-brand-text md:text-2xl">
            "La bicicleta casi me quitó la vida. Luego fue la herramienta que Dios usó para
            reconstruirla. Hoy es mi misión."
          </blockquote>
          <p className="mt-5 text-center text-sm text-brand-accent">— Tony Alvarado</p>
        </motion.div>

      </div>
    </section>
  )
}
