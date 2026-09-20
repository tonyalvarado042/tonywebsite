import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, Check, Download, MessageCircle, TriangleAlert } from 'lucide-react'
import Contador from '@/components/clase/Contador'
import { CLASE, GRUPO, GUIA, VIP, hayVip } from '@/data/clase-copropiedad'
import {
  enlaceGoogle,
  enlaceOffice365,
  enlaceOutlookPersonal,
  enlaceYahoo,
} from '@/lib/calendario-clase'

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
 * La barra del 80% cuenta exactamente eso: cuatro quintos hechos, falta uno.
 * No es un número decorativo — es dos pasos de tres y medio, redondeado a algo
 * que se entiende de un vistazo.
 *
 * `noindex` porque no tiene nada que hacer en Google: solo se llega enviando el
 * formulario, y si alguien cae acá desde una búsqueda se pierde el registro.
 */

export const metadata: Metadata = {
  title: 'Te falta un paso | Clase con Tony Alvarado',
  robots: { index: false, follow: false },
}

/**
 * Los calendarios.
 *
 * Google, Outlook y Yahoo abren su propia pantalla; Apple y el Outlook de
 * escritorio se llevan el `.ics`. El color de cada tarjeta es el de su marca:
 * el ojo lo reconoce antes de leer el nombre.
 */
const CALENDARIOS = [
  { nombre: 'Google', url: enlaceGoogle(), color: '#4285F4', externo: true },
  { nombre: 'Apple', url: '/api/clase/calendario', color: '#A3AAAE', externo: false },
  { nombre: 'Outlook', url: enlaceOutlookPersonal(), color: '#0078D4', externo: true },
  { nombre: 'Office 365', url: enlaceOffice365(), color: '#D83B01', externo: true },
  { nombre: 'Yahoo', url: enlaceYahoo(), color: '#6001D2', externo: true },
  { nombre: 'Otro (.ics)', url: '/api/clase/calendario', color: '#8B5CF6', externo: false },
]

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

        {/* ───────── La barra de avance ───────── */}
        <div className="mt-10">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">
              Tu registro
            </p>
            <p className="font-mono text-2xl font-bold tabular-nums text-brand-gold">80%</p>
          </div>

          <div
            className="mt-2.5 h-3 w-full overflow-hidden rounded-full bg-brand-card"
            role="progressbar"
            aria-valuenow={80}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Avance de tu registro"
          >
            <div className="h-full w-[80%] origin-left rounded-full bg-gradient-to-r from-brand-accent to-brand-gold animate-llenar80 motion-reduce:animate-none" />
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-brand-cta">
              <Check size={13} strokeWidth={3} />
              Tus datos quedaron guardados
            </span>
            <span className="text-brand-gold">Falta el último 20%</span>
          </div>
        </div>

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
        {/*
          `animate-latido` es un resplandor que crece y se apaga, no un
          encendido/apagado. El parpadeo duro se lee como banner de los 2000 y
          además molesta a quien tiene sensibilidad a la luz. `motion-reduce`
          lo apaga entero para quien pidió menos movimiento en su sistema.
        */}
        <div className="mt-9">
          <a
            href={GRUPO.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full animate-latido items-center justify-center gap-3 rounded-2xl bg-brand-cta px-7 py-6 text-center text-lg font-bold text-brand-bg transition hover:bg-brand-cta-fuerte motion-reduce:animate-none sm:text-xl"
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
        </div>

        {/* ───────── Los calendarios ───────── */}
        <div className="mt-8">
          <p className="text-center text-sm font-semibold text-brand-text">
            Apuntala en tu calendario
          </p>
          <p className="mt-1.5 text-center text-xs text-brand-muted">
            Elegí el tuyo. El recordatorio de una hora antes ya viene puesto.
          </p>

          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {CALENDARIOS.map((c) => (
              <li key={c.nombre}>
                <a
                  href={c.url}
                  {...(c.externo
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : { download: 'clase-tony-alvarado.ics' })}
                  className="flex h-full items-center gap-2.5 rounded-xl border border-brand-border bg-brand-card/60 px-3 py-3 transition hover:border-brand-accent/50 hover:bg-brand-card"
                >
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: c.color }}
                    aria-hidden
                  >
                    {c.externo ? (
                      <CalendarioGlifo />
                    ) : (
                      <Download size={15} strokeWidth={2.5} color="#0B0E14" />
                    )}
                  </span>
                  <span className="min-w-0 text-[13px] font-semibold text-brand-text">
                    {c.nombre}
                  </span>
                </a>
              </li>
            ))}
          </ul>
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

/**
 * Un glifo de calendario, blanco, sobre la tarjeta del color de cada marca.
 *
 * No se dibujan los logos de Google, Outlook ni Apple: reproducir de memoria el
 * trazo de una marca registrada sale mal —y se nota— además de ser el logo de
 * otro. El color de la marca más el nombre escrito identifican igual de rápido
 * y no hay nada que explicar después. Si Tony quiere los logos oficiales, se
 * ponen los SVG de verdad y se cambia solo este componente.
 */
function CalendarioGlifo() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="3" />
      <path d="M3 10h18M8 2v4M16 2v4" />
    </svg>
  )
}
