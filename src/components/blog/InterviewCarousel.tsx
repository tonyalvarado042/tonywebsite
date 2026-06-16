'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

const INTERVIEWS = [
  {
    id: '9-xIPjZcF98',
    guest: 'Jason Huertas',
    title: 'Venció a los mejores… pero casi nadie lo sabe',
    image: '/images/blog/entrevistas/entrevista-jason-huertas.jpg',
  },
  {
    id: 'uinZLgW8Mdg',
    guest: 'Doctor Vatio',
    title: 'Poco tiempo, grandes resultados en la bici',
    image: '/images/blog/entrevistas/entrevista-doctor-vatio-tiempo.jpg',
  },
  {
    id: '_nUsw96V48I',
    guest: 'Carlos Jiménez',
    title: 'Core ciclista: ¿entrenas o solo haces abdominales?',
    image: '/images/blog/entrevistas/entrevista-carlos-jimenez-core.jpg',
  },
  {
    id: '4XMVxkHw3U8',
    guest: 'Alex Quesada',
    title: 'El error de nutrición que frena tu rendimiento',
    image: '/images/blog/entrevistas/entrevista-alex-quesada-nutricion.jpg',
  },
  {
    id: 's5zaXlo31wQ',
    guest: 'Pablo Docal',
    title: 'Biomecánica en el ciclismo: el secreto del pedal',
    image: '/images/blog/entrevistas/entrevista-pablo-docal-biomecanica.jpg',
  },
  {
    id: 'iFNozKnhfl0',
    guest: 'Alex Quesada',
    title: 'Salud digestiva y rendimiento deportivo',
    image: '/images/blog/entrevistas/entrevista-alex-quesada-rendimiento.jpg',
  },
] as const

export default function InterviewCarousel() {
  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const prefersReducedMotion = useRef(false)

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const handleVisibility = () => setIsHidden(document.visibilityState !== 'visible')
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const goTo = useCallback((i: number) => setCurrent(i), [])
  const goNext = useCallback(() => setCurrent((c) => (c + 1) % INTERVIEWS.length), [])
  const goPrev = useCallback(
    () => setCurrent((c) => (c - 1 + INTERVIEWS.length) % INTERVIEWS.length),
    []
  )

  useEffect(() => {
    if (isHovered || isFocused || isHidden || prefersReducedMotion.current) return
    const id = setInterval(goNext, 5000)
    return () => clearInterval(id)
  }, [isHovered, isFocused, isHidden, goNext, current])

  const slide = INTERVIEWS[current]

  return (
    <section
      className="border-b border-brand-border bg-brand-surface py-12"
      aria-label="Entrevistas con expertos del ciclismo"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocusCapture={() => setIsFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
          setIsFocused(false)
        }
      }}
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {/* Header */}
        <div className="mb-8 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Entrevistas
          </p>
          <h2 className="text-3xl font-bold text-brand-text">
            Conversaciones que inspiran
          </h2>
        </div>

        {/* Slide area */}
        <div className="relative px-8 md:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid grid-cols-1 items-center gap-6 md:grid-cols-5"
            >
              {/* Thumbnail — clicable */}
              <a
                href={`https://www.youtube.com/watch?v=${slide.id}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver entrevista con ${slide.guest} en YouTube`}
                className="relative block aspect-video overflow-hidden rounded-xl md:col-span-3
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green
                           focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
              >
                <Image
                  src={slide.image}
                  alt={`Entrevista con ${slide.guest} — Tony Alvarado`}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 560px"
                  priority={current === 0}
                />
                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-brand-bg/30 transition-colors hover:bg-brand-bg/20">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-bg/75 backdrop-blur-sm">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-6 w-6 text-brand-green"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>

              {/* Content */}
              <div className="flex flex-col gap-4 md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-green">
                  Con {slide.guest}
                </p>
                <h3 className="text-xl font-bold leading-snug text-brand-text md:text-2xl">
                  {slide.title}
                </h3>
                <a
                  href={`https://www.youtube.com/watch?v=${slide.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver entrevista con ${slide.guest} en YouTube`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-green px-5 py-2.5 text-sm font-semibold text-brand-green transition-colors hover:bg-brand-green/10"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Ver entrevista
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Entrevista anterior"
            className="absolute left-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-brand-border bg-brand-card text-brand-muted transition-colors hover:border-brand-green hover:text-brand-green"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={goNext}
            aria-label="Siguiente entrevista"
            className="absolute right-0 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-brand-border bg-brand-card text-brand-muted transition-colors hover:border-brand-green hover:text-brand-green"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Dots */}
        <div
          className="mt-6 flex items-center justify-center gap-2"
          role="group"
          aria-label="Navegación del carrusel"
        >
          {INTERVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a entrevista ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current
                  ? 'w-6 bg-brand-green'
                  : 'w-2 bg-brand-border hover:bg-brand-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
