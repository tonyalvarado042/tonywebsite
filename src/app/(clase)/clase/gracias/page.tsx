import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, CalendarPlus, Check, MessageCircle } from 'lucide-react'
import Contador from '@/components/clase/Contador'
import { CLASE, GUIA, VIP, enlaceWhatsApp, hayVip } from '@/data/clase-copropiedad'

/**
 * La página de gracias.
 *
 * Acá —y solo acá— viven tres cosas que NO pueden estar en la landing:
 *  · El WhatsApp. La regla ya costó leads: al lado del botón de enviar, media
 *    gente se va por ahí sin dejar el dato. Después de enviar, es un servicio.
 *  · El calendario. Pedirlo antes de tener el dato es una distracción.
 *  · La oferta del presencial. Una página, una decisión: primero el registro
 *    gratis, después el que quiera más.
 *
 * `noindex` porque no tiene nada que hacer en Google: solo se llega enviando el
 * formulario, y si alguien cae acá desde una búsqueda se pierde el registro.
 */

export const metadata: Metadata = {
  title: 'Quedaste adentro | Clase con Tony Alvarado',
  robots: { index: false, follow: false },
}

/** El mismo enlace de Google Calendar que sale en el correo. */
function enlaceCalendario(): string {
  const inicio = new Date(CLASE.instanteUtc)
  const fin = new Date(inicio.getTime() + 90 * 60 * 1000)
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Clase en vivo: ${CLASE.nombre} — Tony Alvarado`,
    dates: `${fmt(inicio)}/${fmt(fin)}`,
    details: 'El enlace para entrar llega por correo antes de la clase.',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export default function GraciasPage() {
  const whatsapp = enlaceWhatsApp()

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(139,92,246,0.26)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16 md:px-12 md:py-24">
        <Image
          src="/images/logos/tony-alvarado-logo-white-horizontal.png"
          alt="Tony Alvarado"
          width={1920}
          height={456}
          priority
          className="mx-auto h-7 w-auto object-contain"
        />

        <div className="mt-12 text-center">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-cta/15 text-brand-cta">
            <Check size={28} strokeWidth={3} />
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
            Listo. Tenés tu campo.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-brand-muted">
            Te acabo de mandar un correo con la confirmación. Si no aparece en unos minutos, revisá
            la carpeta de no deseados y marcalo como seguro — ahí es donde va a llegar el enlace de
            la clase.
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-brand-accent/25 bg-brand-card/80 p-7 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
            Nos vemos en
          </p>
          <div className="mt-5">
            <Contador />
          </div>
          <p className="mt-5 text-sm text-brand-muted">{CLASE.plataformaTexto}</p>
        </div>

        {/* ── Lo primero que tiene que hacer ── */}
        <div className="mt-8 space-y-3">
          <a
            href={enlaceCalendario()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-brand-accent px-7 py-4 text-[15px] font-bold text-brand-bg shadow-[0_8px_30px_rgba(139,92,246,0.3)] transition hover:opacity-90"
          >
            <CalendarPlus size={18} />
            Apuntala en mi calendario
          </a>
          <p className="text-center text-xs text-brand-muted">
            Hacelo ahora, que después se olvida.
          </p>

          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2.5 rounded-full border border-brand-border px-7 py-4 text-[15px] font-semibold text-brand-text transition hover:border-brand-accent/50 hover:bg-white/5"
            >
              <MessageCircle size={18} />
              Escribime por WhatsApp
            </a>
          )}
        </div>

        {/* ── El presencial ── */}
        {hayVip() && (
          <div className="mt-12 rounded-3xl border border-brand-gold/30 bg-brand-card/70 p-7 sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
              Ya que estás adentro · opcional
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-brand-text">{VIP.nombre}</h2>
            <p className="mt-2 text-sm text-brand-muted">
              {VIP.fechaTexto} · {VIP.horarioTexto} · {VIP.precioTexto}
            </p>
            <p className="mt-5 leading-relaxed text-brand-muted">{VIP.promesa}</p>

            <ul className="mt-6 space-y-2.5">
              {VIP.incluye.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-brand-text/90">
                  <BadgeCheck size={17} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>

            <a
              href={VIP.enlacePago}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-gold px-7 py-3.5 text-sm font-bold text-brand-bg transition hover:opacity-90"
            >
              Quiero la entrada del presencial
              <ArrowRight size={16} />
            </a>

            <p className="mt-4 text-xs leading-relaxed text-brand-muted/70">{VIP.noIncluye}</p>
            <p className="mt-3 text-xs leading-relaxed text-brand-muted/70">
              Tu registro a la clase gratuita ya está hecho y no depende de esto.
            </p>
          </div>
        )}

        {/* ── Mientras tanto ── */}
        <div className="mt-12 rounded-2xl border border-brand-border bg-brand-card/50 p-6 text-center">
          <p className="text-sm font-semibold text-brand-text">Mientras llega el miércoles</p>
          <p className="mt-2 text-sm leading-relaxed text-brand-muted">
            Llevate la guía «{GUIA.titulo}». Es la base de lo que vamos a ver en vivo.
          </p>
          <a
            href={GUIA.url}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-accent underline underline-offset-4 hover:opacity-80"
          >
            Leer la guía
            <ArrowRight size={15} />
          </a>
        </div>

        <p className="mt-12 text-center text-xs leading-relaxed text-brand-muted/60">
          Clase educativa y gratuita. No constituye una oferta pública de valores ni asesoría legal,
          contable o de inversión. No se ofrece ni se garantiza ningún resultado económico.
        </p>
      </div>
    </main>
  )
}
