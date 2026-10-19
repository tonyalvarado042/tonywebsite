import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, CalendarPlus, MapPin, MessageCircle, X } from 'lucide-react'
import { VIP, GRUPO_VIP, hayGrupoVip } from '@/data/clase-copropiedad'
import {
  enlaceGoogleVip,
  enlaceOffice365Vip,
  enlaceOutlookVipPersonal,
} from '@/lib/calendario-vip'

/**
 * La página de bienvenida de quien YA COMPRÓ la entrada VIP.
 *
 * ── Por qué es una página aparte y no un bloque en /clase/gracias ───────────
 * Son dos personas distintas en dos momentos distintos. `/clase/gracias` es de
 * quien se acaba de registrar **gratis** a la clase, y todo su trabajo es
 * meterlo al grupo de WhatsApp de la clase: por eso grita «te falta un paso» y
 * lleva la barra del 80%.
 *
 * Quien compró el VIP ya no tiene ningún paso pendiente de ese embudo. Meterle
 * el botón del grupo de la clase acá sería mandarlo a un grupo de 300 personas
 * que no es el suyo, y la barra del «te falta un paso» sería mentira: no le
 * falta nada.
 *
 * Por eso esta página **no lleva** la barra, ni el «te falta un paso», ni el
 * grupo de la clase. Lleva lo suyo: el grupo de Destino Owners, la fecha del
 * presencial con sus botones de calendario, y qué le toca.
 *
 * `noindex` porque solo se llega comprando: es la página de gracias que
 * Hotmart abre después del pago. Ojo con eso — cualquiera con la URL la puede
 * abrir, así que acá no va nada que no se pueda leer sin haber pagado.
 */

export const metadata: Metadata = {
  title: 'Bienvenido a Destino Owners VIP Experience',
  robots: { index: false, follow: false },
}

/** Las mismas seis tomas del boleto. Ver el comentario en `/clase/gracias`. */
const REELS = [
  { archivo: 'bnb-1', etiqueta: 'Bike & Bed', obra: false, alt: 'La piscina y una villa de Bike & Bed' },
  { archivo: 'bnb-2', etiqueta: 'Bike & Bed', obra: false, alt: 'Una bicicleta colgada en la pared dentro de una villa' },
  { archivo: 'bnb-3', etiqueta: 'Bike & Bed', obra: false, alt: 'El interior de una villa con vidrio de piso a techo' },
  { archivo: 'bnb-4', etiqueta: 'Bike & Bed', obra: false, alt: 'El volcán Arenal detrás del jardín de Bike & Bed' },
  { archivo: 'obra-1', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'Un módulo en armazón en la construcción de HUMAYA' },
  { archivo: 'obra-2', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'La hilera de módulos en construcción de HUMAYA' },
]

/**
 * Google y Outlook abren su propia pantalla; Apple y el Outlook de escritorio
 * se llevan el `.ics`. Mismo criterio que en la página de la clase.
 */
const CALENDARIOS = [
  { nombre: 'Google', url: enlaceGoogleVip(), externo: true },
  { nombre: 'Apple / .ics', url: '/api/clase/vip/calendario', externo: false },
  { nombre: 'Outlook', url: enlaceOutlookVipPersonal(), externo: true },
  { nombre: 'Office 365', url: enlaceOffice365Vip(), externo: true },
]

export default function VipPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(201,162,77,0.22)_0%,transparent_70%)]"
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

        {/* ───────── Bienvenida ───────── */}
        <div className="mt-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            <BadgeCheck size={14} aria-hidden />
            Tu lugar está reservado
          </span>

          <h1 className="mt-7 text-[34px] font-extrabold leading-[1.05] tracking-[-0.03em] text-brand-text sm:text-5xl">
            Bienvenido a
            <br />
            <span className="text-brand-gold">Destino Owners VIP</span>
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-brand-text/90">
            Gracias por reservar tu lugar como Destino Owner VIP de Bike &amp; Bed y HUMAYA.
          </p>
        </div>

        <div className="mt-8 space-y-4 leading-relaxed text-brand-muted">
          <p>
            Nos alegra tenerte dentro de este grupo privado de personas que no solo quieren ver el
            proyecto desde lejos, sino vivirlo más de cerca: conocer al equipo, caminar el lugar,
            hacer preguntas y conectar con la visión de Bike &amp; Bed y HUMAYA en La Fortuna.
          </p>
          <p>
            Como Destino Owner VIP tenés acceso al contenido privado y, además, la invitación al
            encuentro presencial en La Fortuna, donde compartimos una experiencia con el equipo
            fundador.
          </p>
          <p>
            En el camino vas a conocer la historia, los avances, los renders, la visión y lo que
            estamos construyendo.
          </p>
          <p className="font-semibold text-brand-text">
            Gracias por ser parte desde el inicio. Bienvenido al círculo VIP de Destino Owners.
          </p>
        </div>

        {/* ───────── Las tomas ───────── */}
        <ul className="mt-10 grid grid-cols-3 gap-2 sm:gap-2.5">
          {REELS.map((r) => (
            <li
              key={r.archivo}
              className={`relative aspect-square overflow-hidden rounded-2xl border bg-brand-bg ${
                r.obra ? 'border-brand-gold/45' : 'border-brand-border'
              }`}
            >
              <video
                src={`/clase/reels/${r.archivo}.mp4`}
                poster={`/clase/reels/${r.archivo}.jpg`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label={r.alt}
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black/85 to-transparent"
              />
              <span
                className={`absolute bottom-2 left-2.5 text-[8.5px] font-bold uppercase tracking-[0.12em] sm:text-[9.5px] ${
                  r.obra ? 'text-brand-gold' : 'text-white'
                }`}
              >
                {r.etiqueta}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-relaxed text-brand-muted/70">
          Tomas de octubre, sin retoque. Las cuatro primeras son Bike &amp; Bed operando hoy; las
          dos doradas son la obra de HUMAYA — lo que vas a caminar.
        </p>

        {/* ───────── El encuentro ───────── */}
        <section className="mt-12 rounded-3xl border border-brand-gold/40 bg-brand-card p-6 sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            Apuntá la fecha
          </p>
          <h2 className="mt-4 text-2xl font-extrabold leading-tight tracking-[-0.02em] text-brand-text sm:text-[28px]">
            {VIP.fechaTexto}
          </h2>
          <p className="mt-1 text-[15px] text-brand-muted">{VIP.horarioTexto}</p>

          <p className="mt-5 flex items-start gap-2.5 text-[15px] leading-snug text-brand-text/90">
            <MapPin size={17} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden />
            <span>
              Bike and Bed Arenal
              <br />
              <span className="text-brand-muted">{VIP.lugarTexto}</span>
            </span>
          </p>

          <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">
            <CalendarPlus size={13} className="mr-1.5 inline align-[-2px]" aria-hidden />
            Agendalo ahora, que después se olvida
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {CALENDARIOS.map((c) => (
              <li key={c.nombre}>
                <a
                  href={c.url}
                  {...(c.externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center justify-center rounded-xl border border-brand-border bg-brand-bg px-3 py-3 text-center text-[13px] font-semibold text-brand-text transition hover:border-brand-gold/60"
                >
                  {c.nombre}
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-xs leading-relaxed text-brand-muted/70">
            No incluye transporte a La Fortuna, hospedaje ni alimentación completa. La entrada es
            para una persona.
          </p>
        </section>

        {/* ───────── El grupo de Destino Owners (NO el de la clase) ───────── */}
        {hayGrupoVip() && (
          <section className="mt-8 rounded-3xl border border-brand-border bg-brand-card/60 p-6 text-center sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
              Tu grupo privado
            </p>
            <p className="mt-4 leading-relaxed text-brand-muted">
              Las actualizaciones semanales, los renders y el detrás de cámaras salen por acá.
              Entrá para no perderte nada.
            </p>
            <a
              href={GRUPO_VIP.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-gold px-6 py-4 text-base font-extrabold text-brand-bg transition hover:opacity-90"
            >
              <MessageCircle size={19} aria-hidden />
              Entrar al grupo de Destino Owners
            </a>
          </section>
        )}

        {/* ───────── Qué incluye ───────── */}
        <section className="mt-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            Qué incluye tu entrada
          </h2>
          <div className="mt-6 grid gap-7 sm:grid-cols-2">
            <div>
              <p className="text-sm font-bold text-brand-text">El día, en La Fortuna</p>
              <ul className="mt-3.5 space-y-2.5">
                {VIP.incluyeDia.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[14.5px] leading-snug text-brand-text/90">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold text-brand-text">Y lo que te queda después</p>
              <ul className="mt-3.5 space-y-2.5">
                {VIP.incluyeDespues.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[14.5px] leading-snug text-brand-text/90">
                    <BadgeCheck size={16} className="mt-0.5 shrink-0 text-brand-gold" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ───────── Lo que no es ───────── */}
        <section className="mt-8 rounded-r-2xl border-l-[3px] border-brand-muted/50 bg-brand-bg/80 p-5">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">
            Y lo que esta entrada NO es
          </p>
          <ul className="mt-3 space-y-2">
            {VIP.noIncluye.map((t) => (
              <li key={t} className="flex gap-2.5 text-[14px] leading-snug text-brand-muted">
                <X size={15} className="mt-0.5 shrink-0" aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/*
          El aviso legal, con todas las letras y sin esconderlo en letra chica.
          No es un trámite: una experiencia que se vende junto a un proyecto
          inmobiliario tiene que decir explícitamente que no es una inversión,
          porque si no, se lee como una. Negarlo protege y además da confianza.
        */}
        <section className="mt-8 rounded-2xl border border-brand-border bg-brand-card/40 p-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-muted">
            Importante
          </p>
          <p className="mt-3 text-[14px] leading-relaxed text-brand-muted">
            Este producto <strong className="text-brand-text">no es una inversión</strong>, no
            representa participación accionaria, no ofrece retornos financieros y no constituye una
            oferta pública ni privada de inversión. Es una experiencia privada de acceso,
            comunidad, educación y conexión con el proyecto.
          </p>
        </section>

        <p className="mt-10 text-center text-xs leading-relaxed text-brand-muted/60">
          Te llega también un correo de Hotmart con el comprobante. Si tenés una consulta,
          respondé ese correo y te contestamos.
        </p>

        <p className="mt-8 text-center text-sm">
          <a
            href="/clase"
            className="inline-flex items-center gap-2 text-brand-muted underline underline-offset-4 transition hover:text-brand-text"
          >
            Volver a la clase
            <ArrowRight size={14} aria-hidden />
          </a>
        </p>
      </div>
    </main>
  )
}
