import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, CalendarPlus, MessageCircle, TriangleAlert } from 'lucide-react'
import Contador from '@/components/clase/Contador'
import { CLASE, GRUPO, GUIA, VIP, hayVip } from '@/data/clase-copropiedad'

/**
 * La página de gracias — en realidad, la página del PASO QUE FALTA.
 *
 * Es la misma para las cinco variantes de la landing: el A/B se mide en la
 * entrada, no en la salida, y una página de gracias distinta por variante
 * metería una segunda diferencia que ensuciaría la medición.
 *
 * ── Por qué grita «te falta un paso» ────────────────────────────────────────
 * Y por qué eso NO es mentira: el lead ya quedó guardado en el CRM apenas
 * envió el formulario — eso está hecho y no se pierde. Lo que falta es el
 * canal: **el enlace para entrar a la clase, los recordatorios y el material
 * salen por el grupo de WhatsApp.** Quien no entra al grupo se registró pero
 * no se entera, y para efectos prácticos no llega.
 *
 * Una página de gracias que solo dice «gracias» desperdicia el único momento
 * en que la persona ya dijo que sí y todavía está mirando.
 *
 * `noindex` porque no tiene nada que hacer en Google: solo se llega enviando el
 * formulario, y si alguien cae acá desde una búsqueda se pierde el registro.
 */

export const metadata: Metadata = {
  title: 'Te falta un paso | Clase con Tony Alvarado',
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
    details: 'El enlace para entrar se comparte en el grupo de WhatsApp de la clase.',
  })
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export default function GraciasPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(139,92,246,0.26)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-12 md:px-12 md:py-20">
        <Image
          src="/images/logos/tony-alvarado-logo-white-horizontal.png"
          alt="Tony Alvarado"
          width={1920}
          height={456}
          priority
          className="mx-auto h-7 w-auto object-contain"
        />

        {/* ───────── El paso que falta ───────── */}
        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/50 bg-brand-gold/10 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            <TriangleAlert size={14} />
            Falta lo más importante
          </span>

          <h1 className="mt-6 text-[34px] font-bold uppercase leading-[1.02] tracking-tight text-brand-text sm:text-6xl">
            Te falta
            <br />
            <span className="text-brand-accent">un paso.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-md text-xl font-semibold leading-snug text-brand-text">
            Aún no completás tu registro.
          </p>

          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-brand-muted">
            Tu campo quedó apartado, pero{' '}
            <strong className="text-brand-text">
              toda la clase se coordina por el grupo de WhatsApp
            </strong>
            : el enlace para entrar, los recordatorios y el material salen por ahí. Si no entrás al
            grupo, no te vas a enterar.
          </p>
        </div>

        {/* ───────── El botón que importa ───────── */}
        <div className="mt-9">
          <a
            href={GRUPO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-cta px-7 py-6 text-center text-lg font-bold text-brand-bg shadow-[0_10px_40px_rgba(34,197,94,0.35)] transition hover:bg-brand-cta-fuerte sm:text-xl"
          >
            <MessageCircle size={26} strokeWidth={2.4} />
            Entrar al grupo de la clase
          </a>
          <p className="mt-3 text-center text-sm text-brand-muted">
            Es un grupo de WhatsApp. Ahí se comunica todo sobre la clase.
          </p>
        </div>

        {/* ───────── Cuándo es ───────── */}
        <div className="mt-12 rounded-3xl border border-brand-accent/25 bg-brand-card/80 p-7 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
            Nos vemos en
          </p>
          <div className="mt-5">
            <Contador />
          </div>
          <a
            href={enlaceCalendario()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2.5 rounded-full border border-brand-border px-6 py-3 text-sm font-semibold text-brand-text transition hover:border-brand-accent/50 hover:bg-white/5"
          >
            <CalendarPlus size={17} />
            Apuntala en mi calendario
          </a>
        </div>

        {/* ───────── El presencial ───────── */}
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

        {/* ───────── Mientras tanto ───────── */}
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

        <p className="mt-10 text-center text-xs leading-relaxed text-brand-muted/60">
          También te mandamos un correo con la confirmación y el enlace del grupo. Si no aparece en
          unos minutos, revisá la carpeta de no deseados.
        </p>

        <p className="mt-6 text-center text-xs leading-relaxed text-brand-muted/60">
          Clase educativa y gratuita. No constituye una oferta pública de valores ni asesoría legal,
          contable o de inversión. No se ofrece ni se garantiza ningún resultado económico.
        </p>
      </div>
    </main>
  )
}
