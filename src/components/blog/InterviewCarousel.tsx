'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'

type CarouselSlide =
  | { type: 'editorial'; image: string; alt: string }
  | { type: 'interview'; id: string; guest: string; title: string; image: string }
  | { type: 'youtube-cta'; image: string; alt: string; href: string }

const SLIDES: CarouselSlide[] = [
  {
    type: 'editorial',
    image: '/images/blog/entrevistas/1.jpg',
    alt: 'Identidad visual de PuroMTB presentada en el contenido destacado de Tony Alvarado.',
  },
  {
    type: 'editorial',
    image: '/images/blog/entrevistas/2.jpg',
    alt: 'Cifras de la comunidad Pure Cycling y su alcance en plataformas digitales.',
  },
  {
    type: 'editorial',
    image: '/images/blog/entrevistas/3.jpg',
    alt: 'Presentación de las conversaciones en vivo con invitados de Pure Cycling.',
  },
  {
    type: 'interview',
    id: '9-xIPjZcF98',
    guest: 'Jason Huertas',
    title: 'Venció a los mejores… pero casi nadie lo sabe',
    image: '/images/blog/entrevistas/entrevista-jason-huertas.jpg',
  },
  {
    type: 'interview',
    id: 'uinZLgW8Mdg',
    guest: 'Doctor Vatio',
    title: 'Poco tiempo, grandes resultados en la bici',
    image: '/images/blog/entrevistas/entrevista-doctor-vatio-tiempo.jpg',
  },
  {
    type: 'interview',
    id: '_nUsw96V48I',
    guest: 'Carlos Jiménez',
    title: 'Core ciclista: ¿entrenas o solo haces abdominales?',
    image: '/images/blog/entrevistas/entrevista-carlos-jimenez-core.jpg',
  },
  {
    type: 'interview',
    id: '4XMVxkHw3U8',
    guest: 'Alex Quesada',
    title: 'El error de nutrición que frena tu rendimiento',
    image: '/images/blog/entrevistas/entrevista-alex-quesada-nutricion.jpg',
  },
  {
    type: 'interview',
    id: 's5zaXlo31wQ',
    guest: 'Pablo Docal',
    title: 'Biomecánica en el ciclismo: el secreto del pedal',
    image: '/images/blog/entrevistas/entrevista-pablo-docal-biomecanica.jpg',
  },
  {
    type: 'interview',
    id: 'iFNozKnhfl0',
    guest: 'Alex Quesada',
    title: 'Salud digestiva y rendimiento deportivo',
    image: '/images/blog/entrevistas/entrevista-alex-quesada-rendimiento.jpg',
  },
  {
    type: 'youtube-cta',
    image: '/images/blog/entrevistas/10.jpg',
    alt: 'Invitación para ver más entrevistas y contenidos de Pure Cycling en YouTube.',
    href: 'https://www.youtube.com/playlist?list=PLDA9TunkmxScIM_9eVlFHAzxO2tGEMelu',
  },
]

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
  const goNext = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), [])
  const goPrev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (isHovered || isFocused || isHidden || prefersReducedMotion.current) return
    const id = setInterval(goNext, 5000)
    return () => clearInterval(id)
  }, [isHovered, isFocused, isHidden, goNext, current])

  function renderSlideContent(slide: CarouselSlide, isFirst: boolean) {
    if (slide.type === 'editorial') {
      return (
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative aspect-video overflow-hidden rounded-xl bg-[#0A0800]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 900px"
              priority={isFirst}
            />
          </div>
        </div>
      )
    }

    if (slide.type === 'youtube-cta') {
      return (
        <div className="mx-auto w-full max-w-5xl">
          <a
            href={slide.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver más entrevistas de Pure Cycling en YouTube"
            className="relative block aspect-video overflow-hidden rounded-xl bg-[#0A0800]
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green
                       focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              className="object-contain transition-opacity duration-300 hover:opacity-90"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </a>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-5">
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
          />
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
      </div>
    )
  }

  return (
    <section
      className="border-b border-brand-border bg-brand-surface py-12"
      aria-label="Contenido destacado: ciclismo, comunidad y conversaciones"
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
            Contenido destacado
          </p>
          <h2 className="text-3xl font-bold text-brand-text">
            Ciclismo, comunidad y conversaciones
          </h2>
        </div>

        {/* Slide area — layout="size" suaviza cambios de altura entre variantes */}
        <motion.div
          layout="size"
          transition={{ layout: { duration: 0.3, ease: 'easeInOut' } }}
          className="relative px-8 md:px-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {renderSlideContent(SLIDES[current], current === 0)}
            </motion.div>
          </AnimatePresence>

          {/* Prev button */}
          <button
            type="button"
            onClick={goPrev}
            aria-label="Diapositiva anterior"
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
            aria-label="Siguiente diapositiva"
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
        </motion.div>

        {/* Dots */}
        <div
          className="mt-6 flex items-center justify-center gap-1.5"
          role="group"
          aria-label="Navegación del carrusel"
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ir a diapositiva ${i + 1}`}
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
