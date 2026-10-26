import Image from 'next/image'
import type { Metadata } from 'next'
import { Clock, Gift, MessageSquareQuote } from 'lucide-react'
import { leerClase } from '@/lib/clase-ajustes'
import { ENCUESTA, SORTEO } from '@/data/clase-encuesta'
import FormularioEncuesta from '@/components/clase/FormularioEncuesta'

/**
 * La encuesta previa a la clase.
 *
 * ── Qué es ─────────────────────────────────────────────────────────────────
 * Tony, 26 de octubre de 2026: «quiero conocer sus intereses y, sobre todo,
 * saber qué les gustaría aprender para adaptar parte de la clase a sus
 * preguntas reales». Con un sorteo de una noche en HUMAYA para que la gente
 * llegue hasta la pregunta abierta, que es la que vale.
 *
 * ── Por qué este esquema y no el de la landing de registro ─────────────────
 * Mismo molde visual que `/clase/vip`: logo, un titular, el bloque, el aviso.
 * Pero **sin contador, sin barra fija y sin ventana de intención de salida**.
 * Esto no se le manda a un desconocido para que se convenza: se le manda a
 * alguien que YA se registró. Meterle urgencia a quien ya dijo que sí es
 * ruido, y encima compite con el correo que sí lo tiene que mover el día de
 * la clase.
 *
 * ── La fecha sale de `leerClase()` ─────────────────────────────────────────
 * No se escribe a mano acá. Si se escribiera dos veces, el día que Tony mueva
 * la clase una de las dos queda vieja y nadie lo nota hasta que alguien llega
 * el día equivocado.
 */
export const revalidate = 300

export const metadata: Metadata = {
  title: 'Contame qué querés que cubra en la clase | Tony Alvarado',
  description:
    'Cinco preguntas, menos de dos minutos. Tu respuesta define parte de la clase. ' +
    'Entre quienes respondan se sortea una noche en HUMAYA, en La Fortuna.',
  // No tiene por qué aparecer en Google: se reparte por correo y por WhatsApp.
  robots: { index: false, follow: false },
}

export default async function EncuestaPage() {
  const clase = await leerClase()

  return (
    <main className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_50%_0%,rgba(201,162,77,0.16)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 pb-24 pt-12 md:px-8 md:pt-16">
        <Image
          src="/images/logos/tony-alvarado-logo-white-horizontal.png"
          alt="Tony Alvarado"
          width={1920}
          height={456}
          priority
          className="h-7 w-auto object-contain"
        />

        {/* ── Titular ──────────────────────────────────────────────── */}
        <p className="mt-12 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
          <Clock className="h-3.5 w-3.5" aria-hidden />
          Menos de dos minutos
        </p>
        <h1 className="mt-4 text-3xl font-extrabold leading-[1.1] tracking-[-0.02em] text-brand-text sm:text-4xl">
          {ENCUESTA.titulo}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-brand-muted">{ENCUESTA.entrada}</p>
        <p className="mt-4 leading-relaxed text-brand-muted">
          La clase es el{' '}
          <span className="font-semibold text-brand-text">{clase.fechaTexto}</span> a las{' '}
          <span className="font-semibold text-brand-text">{clase.horaTexto}</span>. Lo que
          escribás acá lo leo antes de armarla.
        </p>

        {/* ── El sorteo, arriba porque es el incentivo ─────────────── */}
        <section className="mt-9 rounded-2xl border-2 border-brand-cta/35 bg-brand-cta/[0.07] p-5 sm:p-6">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cta">
            <Gift className="h-3.5 w-3.5" aria-hidden />
            Y hay sorteo
          </p>
          <p className="mt-3 text-xl font-extrabold leading-snug text-brand-text">{SORTEO.premio}</p>
          <p className="mt-2 text-sm text-brand-muted">
            {SORTEO.valorTexto}. {SORTEO.cuando}
          </p>
        </section>

        {/* ── El formulario ────────────────────────────────────────── */}
        <section className="mt-10">
          <FormularioEncuesta />
        </section>

        {/* ── Las bases ────────────────────────────────────────────── */}
        <section className="mt-14 border-t border-brand-border/60 pt-8">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">
            <MessageSquareQuote className="h-3.5 w-3.5" aria-hidden />
            Bases del sorteo
          </p>
          <ul className="mt-4 space-y-2.5">
            {SORTEO.bases.map((b) => (
              <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-brand-muted">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-brand-muted/70" />
                {b}
              </li>
            ))}
          </ul>

          {/*
            El mismo descargo que lleva toda la familia de páginas de la clase.
            Acá importa más de lo normal: la encuesta pregunta por inversiones y
            por capital, y eso puede leerse como una antesala de una oferta.
          */}
          <p className="mt-8 text-xs leading-relaxed text-brand-muted/80">
            Esta encuesta es para preparar una clase educativa. No es una oferta ni una
            recomendación de inversión, y no se promete ningún resultado económico. Tus
            respuestas las usamos para armar el contenido de la clase y para el sorteo;
            no se las pasamos a nadie más.
          </p>
        </section>
      </div>
    </main>
  )
}
