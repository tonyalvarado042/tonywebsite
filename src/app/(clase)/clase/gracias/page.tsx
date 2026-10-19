import Image from 'next/image'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ArrowRight, BadgeCheck, Check, Download, MessageCircle, TriangleAlert, X } from 'lucide-react'
import Contador from '@/components/clase/Contador'
import { META_PIXEL_ID } from '@/lib/meta-pixel'
import { CLASE, GRUPO, GUIA, VIP } from '@/data/clase-copropiedad'
import { leerVip } from '@/lib/vip-ajustes'
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
  { nombre: 'Otro (.ics)', url: '/api/clase/calendario', color: '#9266F7', externo: false },
]

/**
 * Las seis tomas que se mueven dentro del bloque VIP.
 *
 * Salen de los reels de octubre de 2026 recortados a cuadrado **por encima de
 * y=1440**: el material original lleva los subtítulos quemados en la imagen y
 * un recorte descuidado deja una palabra suelta en medio de la miniatura.
 * Sin audio y en bucle: 408 KB las doce piezas juntas.
 */
const REELS = [
  { archivo: 'bnb-1', etiqueta: 'Bike & Bed', obra: false, alt: 'La piscina y una villa de Bike & Bed' },
  { archivo: 'bnb-2', etiqueta: 'Bike & Bed', obra: false, alt: 'Una bicicleta colgada en la pared dentro de una villa' },
  { archivo: 'bnb-3', etiqueta: 'Bike & Bed', obra: false, alt: 'El interior de una villa con vidrio de piso a techo' },
  { archivo: 'bnb-4', etiqueta: 'Bike & Bed', obra: false, alt: 'El volcán Arenal detrás del jardín de Bike & Bed' },
  { archivo: 'obra-1', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'Un módulo en armazón en la construcción de HUMAYA' },
  { archivo: 'obra-2', etiqueta: 'HUMAYA · la obra', obra: true, alt: 'La hilera de módulos en construcción de HUMAYA' },
]

/**
 * Se revalida cada 5 minutos: encender o apagar el VIP desde el CRM, o mover
 * su fecha, se ve acá **sin desplegar**.
 */
export const revalidate = 300

export default async function GraciasPage() {
  const vip = await leerVip()

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/*
        Evento de conversión del píxel de Meta, inline con next/script — igual
        que el snippet base en `(clase)/layout.tsx`. Antes vivía en un Client
        Component aparte (`PixelRegistroCompletado`, montado con useEffect),
        pero ese wiring nunca llegó a producción: se verificó con la
        herramienta "Probar eventos" del Administrador de eventos y con
        Resource Timing en el navegador que solo llegaba `PageView`, nunca
        `CompleteRegistration`, incluso tras un redeploy forzado sin caché.
        Este patrón inline es el que sí está probado en este repo.

        ── Por qué el reintento y no un `if (window.fbq)` a secas ──────────────
        Un `if` a secas fue el SEGUNDO intento y tampoco disparó nada: verificado
        de nuevo con Resource Timing, solo `PageView`. `next/script` con
        `afterInteractive` no garantiza que el snippet base del layout (que
        define `window.fbq`) corra ANTES que el de esta página — son segmentos
        distintos. Si este script se adelanta, `window.fbq` todavía no existe,
        el `if` no entra, y el evento se pierde para siempre sin avisar. El
        reintento cada 100ms (máximo 5s) no depende de ningún orden.
      */}
      <Script
        id="meta-pixel-registro-completado"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function esperar(intento){
  if (window.fbq) { window.fbq('track', 'CompleteRegistration'); }
  else if (intento < 50) { setTimeout(function(){ esperar(intento + 1); }, 100); }
})(0);`,
        }}
      />
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
                      <Download size={15} strokeWidth={2.5} color="#151A24" />
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
        {vip?.enlacePago && (
          <section className="mt-14">
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-brand-border" aria-hidden />
              <span className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">
                Y ya que estás
              </span>
              <div className="h-px flex-1 bg-brand-border" aria-hidden />
            </div>

            {/*
              ⚠️ Sin `overflow-hidden`: las muescas del boleto son círculos
              posicionados fuera de su caja y un overflow los recorta. Y la
              tarjeta va con color SÓLIDO, no translúcido, porque las muescas
              tienen que pintarse del mismo color exacto para que se lean como
              un recorte y no como dos puntos pegados encima.
            */}
            <div className="mt-7 rounded-3xl border border-brand-gold/40 bg-brand-card p-6 sm:p-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                  Opcional
                </span>
                <span className="text-brand-muted" aria-hidden>
                  ·
                </span>
                <span className="text-[11px] uppercase tracking-[0.1em] text-brand-muted">
                  No afecta tu registro
                </span>
              </div>

              {/*
                El titular es el NOMBRE DEL PRODUCTO, no la frase de venta.
                Regla de Tony: la palabra que dice qué es va en el titular
                grande. La frase de venta bajó a subtítulo.
              */}
              <h2 className="mt-5 text-[34px] font-extrabold leading-[1.02] tracking-[-0.03em] text-brand-text sm:text-[46px]">
                {VIP.nombreLinea1}
                <br />
                <span className="text-brand-gold">{VIP.nombreLinea2}</span>
              </h2>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <span aria-hidden className="h-0.5 w-11 shrink-0 bg-brand-gold" />
                <span className="text-[11.5px] font-bold uppercase tracking-[0.13em] text-brand-muted">
                  {vip.fechaTexto} · {VIP.lugarTexto} · {vip.precioTexto}
                </span>
              </div>

              <p className="mt-6 text-xl font-semibold leading-snug tracking-[-0.015em] text-brand-text sm:text-2xl">
                El miércoles ves los números.
                <br />
                <span className="text-brand-muted">
                  El 18 de noviembre podés ver el hotel.
                </span>
              </p>

              <p className="mt-5 leading-relaxed text-brand-muted">{VIP.promesa}</p>

              {/*
                Las seis tomas. Sin audio, en bucle, 408 KB las doce piezas
                (seis clips y seis carátulas). Recortadas por encima de la
                banda de subtítulos quemados del material original.
              */}
              <ul className="mt-7 grid grid-cols-3 gap-2 sm:gap-2.5">
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
                Tomas de octubre, sin retoque. Las cuatro primeras son Bike &amp; Bed operando hoy;
                las dos doradas son la obra de HUMAYA.
              </p>

              {/* Qué incluye, en dos tiempos: el día y lo que queda después. */}
              <div className="mt-8 grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                    El día, en La Fortuna
                  </p>
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                    Y lo que te queda después
                  </p>
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

              {/*
                Esto no es el descargo del final: es parte del argumento. En un
                rubro donde todos prometen de más, el que dice en voz alta lo
                que no da es el que suena cierto.
              */}
              <div className="mt-7 rounded-r-2xl border-l-[3px] border-brand-muted/50 bg-brand-bg/80 p-5">
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
              </div>

              {/* ───────── El boleto: acá se compra ───────── */}
              <div className="relative mt-8 rounded-[20px] bg-[#F7F3E8] text-[#1A1A1A] shadow-[0_20px_56px_rgba(0,0,0,.5)]">
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-t-[20px] bg-brand-gold px-5 py-3 text-brand-bg sm:px-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.1em] sm:text-xs sm:tracking-[0.16em]">
                    Entrada · Destino Owners VIP
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] sm:text-xs">
                    {vip.cuposTexto ? `Solo ${vip.cuposTexto} entradas` : vip.fechaBoleto}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-[1fr_2px_1fr]">
                  <div className="px-5 pb-5 pt-6 sm:pb-6 sm:px-6">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#6B6355]">
                      Precio
                    </p>
                    <p className="mt-1.5 flex items-baseline gap-1">
                      <span className="text-lg font-bold text-[#6B6355] sm:text-[22px]">
                        {VIP.precioMoneda}
                      </span>
                      <span className="text-[46px] font-extrabold leading-[0.9] tracking-[-0.045em] sm:text-[64px]">
                        {vip.precioNumero}
                      </span>
                    </p>
                    <p className="mt-2.5 text-[13px] leading-snug text-[#4A4438]">
                      Por persona. Una entrada vale por una persona — quien te acompañe necesita la
                      suya.
                    </p>
                    {VIP.monedaTexto && (
                      <p className="mt-2 text-[12.5px] leading-snug text-[#6B6355]">
                        {VIP.monedaTexto}
                      </p>
                    )}
                  </div>

                  {/* Vertical en escritorio; en móvil las columnas se apilan y sobra. */}
                  <div
                    aria-hidden
                    className="hidden self-stretch bg-[repeating-linear-gradient(to_bottom,#D2C8B0_0_7px,transparent_7px_14px)] sm:block"
                  />

                  <div className="border-t border-dashed border-[#D2C8B0] px-5 pb-6 pt-5 sm:border-t-0 sm:px-6 sm:pt-6">
                    <p className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#6B6355]">
                      Cuándo y dónde
                    </p>
                    <p className="mt-2 text-[17px] font-extrabold leading-tight tracking-[-0.015em] sm:text-xl">
                      {vip.fechaCorta}
                      <br />
                      {vip.fechaCortaMes}
                    </p>
                    <p className="mt-2 text-[13.5px] leading-snug text-[#4A4438] sm:text-[14.5px]">
                      {vip.horarioCorto}
                      <br />
                      {VIP.lugarTexto}
                    </p>
                  </div>
                </div>

                {/* La perforación con las muescas: esto es lo que lo vuelve un boleto. */}
                <div className="relative border-t-2 border-dashed border-[#C9BFA6] px-5 pb-6 pt-6 sm:px-6">
                  <span
                    aria-hidden
                    className="absolute -left-3.5 -top-[15px] h-7 w-7 rounded-full bg-brand-card"
                  />
                  <span
                    aria-hidden
                    className="absolute -right-3.5 -top-[15px] h-7 w-7 rounded-full bg-brand-card"
                  />

                  <p className="text-[13px] leading-snug text-[#4A4438]">{VIP.limiteTexto}</p>

                  <a
                    href={vip.enlacePago}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-brand-bg px-5 py-5 text-base font-extrabold text-[#F7F3E8] transition hover:opacity-90 sm:text-lg"
                  >
                    Comprar mi entrada — {VIP.precioMoneda}
                    {vip.precioNumero}
                    <ArrowRight size={18} aria-hidden />
                  </a>

                  {(VIP.pagoTexto || VIP.devolucionTexto) && (
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
                  )}
                </div>
              </div>

              <p className="mt-5 text-center text-xs leading-relaxed text-brand-muted/70">
                Tu registro a la clase gratuita del miércoles ya está hecho y no depende de esto.
              </p>
            </div>
          </section>
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

        {/* Exigido por las políticas de anuncios de Meta: deja claro que el sitio no es de Facebook. */}
        <p className="mx-auto mt-4 max-w-xl text-center text-[11px] leading-relaxed text-brand-muted/40">
          Este sitio no forma parte del sitio web de Facebook ni de Meta Platforms, Inc. Además, este
          contenido no está avalado por Facebook de ninguna manera. FACEBOOK es una marca registrada
          de Meta Platforms, Inc.
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
