import Image from 'next/image'
import type { Metadata } from 'next'
import { ArrowRight, BadgeCheck, X } from 'lucide-react'
import { VIP, hayVip } from '@/data/clase-copropiedad'

/**
 * La página de VENTA de la entrada VIP.
 *
 * ── Qué es y qué no es ─────────────────────────────────────────────────────
 * Esto vende la entrada de US$97 al presencial. **No es** la página de gracias
 * del VIP: quien ya compró no tiene nada que hacer acá.
 *
 * Es la misma oferta que vive como bloque dentro de `/clase/gracias`, pero
 * suelta y con aire, para poder mandarle tráfico directo —pauta, el enlace de
 * «Página de Ventas» de Hotmart, un mensaje en el grupo— sin obligar a nadie a
 * pasar primero por el registro de la clase gratuita.
 *
 * Por eso **no lleva** ni el grupo de WhatsApp de la clase, ni la barra del
 * «te falta un paso», ni botones de calendario: agendar es algo que se hace
 * después de comprar, no antes.
 *
 * ── El orden, y por qué ────────────────────────────────────────────────────
 * Nombre del producto → la promesa → la prueba en movimiento → qué incluye →
 * lo que NO es → el boleto → el aviso legal.
 *
 * El bloque «lo que esta entrada NO es» va ANTES del botón a propósito. No es
 * un descargo escondido al final: en un rubro donde todos prometen de más, el
 * que dice en voz alta lo que no da es el que suena cierto, y eso vende.
 */

export const metadata: Metadata = {
  title: 'Destino Owners VIP Experience | Miércoles 18 de noviembre en La Fortuna',
  description:
    'Un día en La Fortuna con Tony Alvarado y el equipo: recorrido por Bike & Bed, visita a la obra de HUMAYA y preguntas con los fundadores. No es una inversión.',
}

/** Las mismas seis tomas del boleto de `/clase/gracias`. */
const REELS = [
  { archivo: 'bnb-1', etiqueta: 'Bike & Bed', obra: false, alt: 'La piscina y una villa de Bike & Bed' },
  { archivo: 'bnb-2', etiqueta: 'Bike & Bed', obra: false, alt: 'Una bicicleta colgada en la pared dentro de una villa' },
  { archivo: 'bnb-3', etiqueta: 'Bike & Bed', obra: false, alt: 'El interior de una villa con vidrio de piso a techo' },
  { archivo: 'bnb-4', etiqueta: 'Bike & Bed', obra: false, alt: 'El volcán Arenal detrás del jardín de Bike & Bed' },
  { archivo: 'obra-1', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'Un módulo en armazón en la construcción de HUMAYA' },
  { archivo: 'obra-2', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'La hilera de módulos en construcción de HUMAYA' },
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

        {/* ───────── El producto, por su nombre ───────── */}
        <div className="mt-12">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
              Experiencia presencial
            </span>
            <span className="text-brand-muted" aria-hidden>
              ·
            </span>
            <span className="text-[11px] uppercase tracking-[0.1em] text-brand-muted">
              Cupo limitado a {VIP.cuposTexto} entradas
            </span>
          </div>

          <h1 className="mt-5 text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-brand-text sm:text-[52px]">
            {VIP.nombreLinea1}
            <br />
            <span className="text-brand-gold">{VIP.nombreLinea2}</span>
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span aria-hidden className="h-0.5 w-11 shrink-0 bg-brand-gold" />
            <span className="text-[11.5px] font-bold uppercase tracking-[0.13em] text-brand-muted">
              {VIP.fechaTexto} · {VIP.lugarTexto} · {VIP.precioTexto}
            </span>
          </div>

          <p className="mt-7 text-xl font-semibold leading-snug tracking-[-0.015em] text-brand-text sm:text-2xl">
            El miércoles ves los números.
            <br />
            <span className="text-brand-muted">El 18 de noviembre podés ver el hotel.</span>
          </p>

          <div className="mt-6 space-y-4 leading-relaxed text-brand-muted">
            <p>
              En la clase te abro la hoja completa de Bike &amp; Bed: los doce meses, la ocupación
              real, lo que se lleva la operadora y lo que queda después.
            </p>
            <p className="text-brand-text/90">
              Lo que no se puede hacer por pantalla es caminar el lugar. Ver de qué tamaño es una
              villa por dentro. Pararte en el terreno donde va HUMAYA. Preguntarme algo mirándome a
              la cara, y que la respuesta la oigan todos.
            </p>
          </div>

          {hayVip() && (
            <a
              href="#entrada"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-brand-gold underline underline-offset-4 transition hover:opacity-80"
            >
              Ver la entrada — {VIP.precioTexto}
              <ArrowRight size={15} aria-hidden />
            </a>
          )}
        </div>

        {/* ───────── La prueba, en movimiento ───────── */}
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
          dos doradas son la obra de HUMAYA — esto es lo que vas a caminar.
        </p>

        {/* ───────── Qué incluye ───────── */}
        <section className="mt-12">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
            Qué incluye la entrada
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

        {/* Va ANTES del botón: lo que no se promete es lo que hace creíble el resto. */}
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

        {/* ───────── El boleto: acá se compra ───────── */}
        {hayVip() && (
          <div
            id="entrada"
            className="relative mt-10 scroll-mt-8 rounded-[20px] bg-[#F7F3E8] text-[#1A1A1A] shadow-[0_20px_56px_rgba(0,0,0,.5)]"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-[20px] bg-brand-gold px-5 py-3 text-brand-bg sm:px-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.16em]">
                Entrada · Destino Owners VIP
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] sm:text-xs">
                {VIP.cuposTexto ? `Solo ${VIP.cuposTexto} entradas` : VIP.fechaBoleto}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_2px_1fr]">
              <div className="px-5 pb-5 pt-6 sm:px-6 sm:pb-6">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#6B6355]">
                  Precio
                </p>
                <p className="mt-1.5 flex items-baseline gap-1">
                  <span className="text-lg font-bold text-[#6B6355] sm:text-[22px]">
                    {VIP.precioMoneda}
                  </span>
                  <span className="text-[46px] font-extrabold leading-[0.9] tracking-[-0.045em] sm:text-[64px]">
                    {VIP.precioNumero}
                  </span>
                </p>
                <p className="mt-2.5 text-[13px] leading-snug text-[#4A4438]">
                  Por persona. Una entrada vale por una persona — quien te acompañe necesita la
                  suya.
                </p>
                {VIP.monedaTexto && (
                  <p className="mt-2 text-[12.5px] leading-snug text-[#6B6355]">{VIP.monedaTexto}</p>
                )}
              </div>

              <div
                aria-hidden
                className="hidden self-stretch bg-[repeating-linear-gradient(to_bottom,#D2C8B0_0_7px,transparent_7px_14px)] sm:block"
              />

              <div className="border-t border-dashed border-[#D2C8B0] px-5 pb-6 pt-5 sm:border-t-0 sm:px-6 sm:pt-6">
                <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#6B6355]">
                  Cuándo y dónde
                </p>
                <p className="mt-2 text-[17px] font-extrabold leading-tight tracking-[-0.015em] sm:text-xl">
                  {VIP.fechaCorta}
                  <br />
                  {VIP.fechaCortaMes}
                </p>
                <p className="mt-2 text-[13.5px] leading-snug text-[#4A4438] sm:text-[14.5px]">
                  {VIP.horarioCorto}
                  <br />
                  {VIP.lugarTexto}
                </p>
              </div>
            </div>

            <div className="relative border-t-2 border-dashed border-[#C9BFA6] px-5 pb-6 pt-6 sm:px-6">
              <span
                aria-hidden
                className="absolute -left-3.5 -top-[15px] h-7 w-7 rounded-full bg-brand-bg"
              />
              <span
                aria-hidden
                className="absolute -right-3.5 -top-[15px] h-7 w-7 rounded-full bg-brand-bg"
              />

              <p className="text-[13px] leading-snug text-[#4A4438]">{VIP.limiteTexto}</p>

              <a
                href={VIP.enlacePago}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-bg px-5 py-5 text-base font-extrabold text-[#F7F3E8] transition hover:opacity-90 sm:text-lg"
              >
                Comprar mi entrada — {VIP.precioMoneda}
                {VIP.precioNumero}
                <ArrowRight size={18} aria-hidden />
              </a>

              <div className="mt-3.5 flex flex-wrap gap-2 text-[12.5px] text-[#4A4438]">
                {VIP.pagoTexto && (
                  <span className="rounded-full border border-[#D2C8B0] px-3 py-1.5">
                    {VIP.pagoTexto}
                  </span>
                )}
                <span className="rounded-full border border-[#D2C8B0] px-3 py-1.5">
                  Comprobante e indicaciones por correo
                </span>
                {VIP.devolucionTexto && (
                  <span className="rounded-full border border-[#D2C8B0] px-3 py-1.5">
                    {VIP.devolucionTexto}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/*
          El aviso legal, con todas las letras y en tamaño legible. No es un
          trámite: una experiencia que se vende junto a un proyecto turístico
          tiene que decir explícitamente que no es una inversión, porque si no,
          se lee como una. Negarlo protege y además da confianza.
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

        <p className="mt-10 text-center text-sm">
          <a
            href="/clase"
            className="inline-flex items-center gap-2 text-brand-muted underline underline-offset-4 transition hover:text-brand-text"
          >
            Ver la clase gratuita del miércoles 28
            <ArrowRight size={14} aria-hidden />
          </a>
        </p>
      </div>
    </main>
  )
}
