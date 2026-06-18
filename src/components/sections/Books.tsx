'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { pushGTMEvent } from '@/lib/gtm'

export default function Books({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Books',
    h2text: 'Two books.',
    h2span: 'One mission.',
    paragraph: 'From entrepreneurship with faith to the bicycle as a tool for transformation.',
    book1Available: 'Available on Amazon',
    book1Alt: 'Secretos para ser un empresario exitoso — Tony Alvarado',
    book1Desc: 'The principles Tony used to build an ecosystem of companies around cycling for over two decades. Not theory — lessons learned through failures, victories and faith in the process.',
    book1Cta: 'Buy on Amazon',
    book2Available: 'Available on Amazon',
    book2Alt: 'Sigue Pedaleando — Tony Alvarado',
    book2Desc: 'The bicycle was with him from childhood, put him to the test at age 16 and then became the tool God used to rebuild him. A book about faith, purpose and keeping going when the road gets hard.',
    book2Cta: 'Buy on Amazon →',
    allBooks: 'See all books →',
    allBooksHref: '/en/books',
  } : {
    sectionLabel: 'Libros',
    h2text: 'Dos libros.',
    h2span: 'Una misma misión.',
    paragraph: 'Desde el emprendimiento con fe hasta la bicicleta como herramienta de transformación.',
    book1Available: 'Disponible en Amazon',
    book1Alt: 'Secretos para ser un empresario exitoso — Tony Alvarado',
    book1Desc: 'Los principios que Tony usó para construir un ecosistema de empresas alrededor del ciclismo durante más de dos décadas. No es teoría — son lecciones aprendidas con fracasos, victorias y fe en el proceso.',
    book1Cta: 'Comprar en Amazon',
    book2Available: 'Disponible en Amazon',
    book2Alt: 'Sigue Pedaleando — Tony Alvarado',
    book2Desc: 'La bicicleta lo acompañó desde niño, lo puso a prueba a los 16 años y después se convirtió en la herramienta que Dios usó para reconstruirlo. Un libro sobre fe, propósito y seguir adelante cuando el camino se complica.',
    book2Cta: 'Comprar en Amazon →',
    allBooks: 'Ver todos los libros →',
    allBooksHref: '/libros',
  }

  return (
    <section id="libros" className="bg-brand-surface py-20">
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            {t.h2text}{' '}
            <span className="text-brand-gold">{t.h2span}</span>
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">
            {t.paragraph}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Libro 1 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-gold/20 bg-brand-card p-8 sm:flex-row sm:items-center
                       shadow-[0_0_30px_rgba(201,162,77,0.07)]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            {/* Mockup */}
            <div className="flex shrink-0 items-center justify-center sm:min-w-[160px]">
              <Image
                src="/images/books/secretos-mockup.png"
                alt={t.book1Alt}
                width={190}
                height={265}
                className="w-auto max-h-[255px] object-contain drop-shadow-[0_8px_24px_rgba(201,162,77,0.30)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart size={13} className="text-brand-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">
                  {t.book1Available}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-brand-text">
                Secretos para ser un{' '}
                <span className="text-brand-gold">empresario exitoso</span>
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                {t.book1Desc}
              </p>
              <Link
                href="https://www.amazon.com/dp/B0CCZWJG7S"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
                onClick={() => pushGTMEvent('click_amazon', { cta_text: locale === 'en' ? 'Buy on Amazon' : 'Comprar en Amazon', cta_location: 'books_secretos', destination_type: 'external', interest: 'libros', page_path: window.location.pathname })}
              >
                <ShoppingCart size={14} />
                {t.book1Cta}
              </Link>
            </div>
          </motion.div>

          {/* Libro 2 */}
          <motion.div
            className="flex flex-col gap-6 rounded-2xl border border-brand-warm/20 bg-brand-card p-8 sm:flex-row sm:items-center
                       shadow-[0_0_30px_rgba(215,186,158,0.05)]"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Mockup */}
            <div className="flex shrink-0 items-center justify-center sm:min-w-[160px]">
              <Image
                src="/images/books/sigue-pedaleando-mockup.png"
                alt={t.book2Alt}
                width={190}
                height={265}
                className="w-auto max-h-[255px] object-contain drop-shadow-[0_8px_24px_rgba(215,186,158,0.25)]"
              />
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <ShoppingCart size={13} className="text-brand-warm" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-warm">
                  {t.book2Available}
                </span>
              </div>
              <h3 className="text-xl font-bold leading-tight text-brand-text">
                Sigue{' '}
                <span className="text-brand-warm">Pedaleando</span>
              </h3>
              <p className="text-sm leading-relaxed text-brand-muted">
                {t.book2Desc}
              </p>
              <Link
                href="https://www.amazon.com/-/es/Tony-Alvarado/dp/B0H2QD8PPD/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 rounded-full border border-brand-warm/40 px-6 py-2.5 text-sm font-semibold text-brand-warm transition-colors hover:bg-brand-warm/10"
                onClick={() => pushGTMEvent('click_amazon', { cta_text: locale === 'en' ? 'Buy on Amazon' : 'Comprar en Amazon', cta_location: 'books_sigue_pedaleando', destination_type: 'external', interest: 'libros', page_path: window.location.pathname })}
              >
                <ShoppingCart size={14} />
                {t.book2Cta}
              </Link>
            </div>
          </motion.div>

        </div>

        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link
            href={t.allBooksHref}
            className="text-sm font-semibold text-brand-gold hover:underline"
          >
            {t.allBooks}
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
