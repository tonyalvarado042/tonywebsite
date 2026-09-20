import Image from 'next/image'
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ExternalLink,
  Quote,
  Star,
  X as Equis,
} from 'lucide-react'
import Contador from '@/components/clase/Contador'
import FormularioClase from '@/components/clase/FormularioClase'
import SalidaIntencion from '@/components/clase/SalidaIntencion'
import MuroEnVivo from '@/components/clase/MuroEnVivo'
import BarraFija from '@/components/clase/BarraFija'
import {
  CLASE,
  CREDENCIALES,
  GUIA,
  LO_QUE_VAS_A_VER,
  PARA_QUIEN,
  PREGUNTAS,
  RECORTES,
  VIP,
  hayVip,
} from '@/data/clase-copropiedad'
import { RESENAS_BNB, RESUMEN_RESENAS } from '@/data/resenas-bike-and-bed'

/**
 * La landing de registro a la clase — clase.tonyalvarado.com
 *
 * Es un componente de SERVIDOR. Lo único que corre en el navegador son cuatro
 * islas: el contador, el formulario, la ventana de salida, el muro y la barra
 * fija. Todo lo demás es HTML plano, que es lo que hace que cargue rápido en un
 * teléfono con datos móviles — que es donde va a caer la mayoría del tráfico
 * pagado.
 *
 * ── La regla que manda sobre el texto ───────────────────────────────────────
 * Cero promesas de número. Ni porcentajes, ni precio por participación, ni las
 * palabras rendimiento / retorno / ROI / ganancia / rentabilidad. La página
 * vende LA CLASE. Ver el encabezado de `data/clase-copropiedad.ts`.
 *
 * ── Por qué NO hay botón flotante de WhatsApp ───────────────────────────────
 * Regla ya aprendida y escrita: el WhatsApp va DESPUÉS de enviar, nunca al lado
 * del botón. Si está al lado, media gente se va por ahí sin dejar el dato y el
 * lead no queda en el CRM. Acá vive en `/clase/gracias`.
 */

const MARCAS = [
  {
    // Lo pasó Tony el 20 de setiembre de 2026. Fondo transparente verificado
    // (alfa 0 en las cuatro esquinas), así que no hay caja blanca sobre el
    // fondo oscuro. Es la marca de la clase: va de primera.
    src: '/images/logos/destino-owners/destino-owners-lockup-dorado.png',
    alt: 'Destino Owners',
    width: 1942,
    height: 809,
    clase: 'h-9 w-auto object-contain opacity-90 sm:h-10',
  },
  {
    src: '/images/logos/bike-bed/bike_and_bed_logo.png',
    alt: 'Bike & Bed Hotels',
    width: 286,
    height: 76,
    // Igual que en el pie del sitio: se fuerza a blanco puro.
    clase: 'h-6 w-auto object-contain brightness-0 invert opacity-70',
  },
  {
    src: '/images/logos/humaya/humaya-lockup-blanco.png',
    alt: 'Humaya Costa Rica',
    width: 1875,
    height: 1075,
    clase: 'h-10 w-auto object-contain opacity-70',
  },
]

/**
 * Fotos de las villas por dentro y de la zona.
 *
 * Son las MISMAS que ya sirve `/ride-and-reset`: se reusan por ruta, no se
 * vuelven a subir. Una copia más del mismo JPG es peso muerto en el repo y una
 * foto que después hay que acordarse de cambiar en dos lados.
 */
const FOTOS_VILLAS = [
  {
    src: '/images/ride-and-reset/portada-pareja-volcan.jpg',
    alt: 'El Volcán Arenal desde La Fortuna',
    width: 2000,
    height: 1333,
    ancha: true,
  },
  {
    src: '/images/ride-and-reset/villa-dormitorio-alto.jpg',
    alt: 'El dormitorio alto de una villa de Bike & Bed',
    width: 1200,
    height: 1800,
    ancha: false,
  },
  {
    src: '/images/ride-and-reset/villa-cocina.jpg',
    alt: 'La cocina de una villa de Bike & Bed',
    width: 1600,
    height: 1067,
    ancha: false,
  },
]

export default function ClasePage() {
  return (
    <>
      {/* ───────────────── Barra de arriba ───────────────── */}
      <header className="sticky top-0 z-30 border-b border-brand-border/60 bg-brand-bg/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-12">
          <Image
            src="/images/logos/tony-alvarado-logo-white-horizontal.png"
            alt="Tony Alvarado"
            width={1920}
            height={456}
            priority
            className="h-6 w-auto object-contain sm:h-7"
          />
          <div className="flex items-center gap-4">
            <p className="hidden text-sm font-semibold text-brand-muted sm:block">
              Faltan <Contador compacto />
            </p>
            <a
              href="#registro"
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-5 py-2.5 text-[13px] font-bold text-brand-bg shadow-[0_6px_20px_rgba(139,92,246,0.35)] transition hover:opacity-90"
            >
              Guardame mi campo
              <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </header>

      {/* ───────────────── Portada ───────────────── */}
      <section className="relative overflow-hidden">
        {/* Halo morado, la única fuente de luz de la escena. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(139,92,246,0.28)_0%,rgba(124,47,214,0.10)_45%,transparent_72%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '34px 34px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 pt-16 text-center md:px-12 md:pt-24">
          {/* Prueba social real, arriba del todo */}
          <div className="mb-8 flex flex-col items-center gap-3">
            <div className="flex -space-x-2.5">
              {RESENAS_BNB.slice(0, 5).map((r) => (
                <span
                  key={r.nombre}
                  className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-bg bg-brand-accent/25 text-xs font-bold text-brand-accent-light"
                  aria-hidden
                >
                  {r.nombre.charAt(0)}
                </span>
              ))}
            </div>
            <p className="text-sm text-brand-muted">
              <span className="font-bold text-brand-text">
                {RESUMEN_RESENAS.total} reseñas reales
              </span>{' '}
              de huéspedes del hotel · {RESUMEN_RESENAS.promedio} de promedio
            </p>
            <div className="flex gap-1" aria-label={`${RESUMEN_RESENAS.promedio} de 5 estrellas`}>
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={14} className="fill-brand-gold text-brand-gold" aria-hidden />
              ))}
            </div>
          </div>

          <p className="inline-flex items-center gap-2 rounded-full border border-brand-accent/40 bg-brand-accent/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-accent-light">
            <CalendarDays size={13} />
            Clase gratuita en vivo · {CLASE.fechaTexto}
          </p>

          <h1 className="mt-7 text-[40px] font-bold leading-[1.05] tracking-tight text-brand-text sm:text-6xl md:text-7xl">
            Te voy a abrir
            <br />
            <span className="text-brand-accent">los números de mi hotel.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
            Cuánto entró cada mes, la ocupación real, qué se lleva la operadora y qué queda al
            final. En vivo, {CLASE.duracionTexto}, gratis. Y al final te enseño cómo se evalúa un
            proyecto turístico antes de meterle un solo dólar.
          </p>

          <div className="mt-10">
            <Contador />
          </div>

          <div className="mt-9 flex flex-col items-center gap-3">
            <a
              href="#registro"
              className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-brand-cta px-8 py-4 text-base font-bold text-brand-bg shadow-[0_8px_30px_rgba(34,197,94,0.28)] transition hover:bg-brand-cta-fuerte"
            >
              Guardame mi campo
              <ArrowRight size={18} />
            </a>
            <p className="text-xs text-brand-muted">
              Es gratis · {CLASE.plataformaTexto}
            </p>
          </div>

          {/* La foto del hotel del que se van a ver los números */}
          <figure className="relative mt-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-brand-accent/25 blur-2xl"
            />
            <Image
              src="/images/clase/bike-and-bed-capo-atardecer.png"
              alt="Las villas de Bike & Bed en La Fortuna al atardecer, con la piscina iluminada al frente"
              width={1448}
              height={1086}
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="relative w-full rounded-3xl border border-brand-accent/20 object-cover shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]"
            />
            <figcaption className="relative mt-4 text-sm text-brand-muted">
              Bike &amp; Bed, La Fortuna de San Carlos.{' '}
              <span className="text-brand-text">Este es el hotel cuyos números vas a ver.</span>
            </figcaption>
          </figure>

          {/* Las marcas */}
          <div className="mt-16 border-t border-brand-border/60 pt-10">
            <p className="text-[11px] uppercase tracking-[0.18em] text-brand-muted/70">
              Lo que hay detrás de esta clase
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {MARCAS.map((m) => (
                <Image
                  key={m.src}
                  src={m.src}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  className={m.clase}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Recortes de prensa ───────────────── */}
      <section className="relative overflow-hidden border-y border-brand-border/60 bg-gradient-to-b from-brand-pop/20 via-brand-bg to-brand-bg py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              Esto no es una corazonada
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
              Mientras vos lo pensás,
              <br />
              <span className="text-brand-muted">el país se está llenando.</span>
            </h2>
            <p className="mt-5 text-brand-muted">
              Cinco datos de los últimos meses. Ninguno es mío: cada uno lleva su medio, su fecha y
              el enlace para que lo verifiqués vos.
            </p>
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {RECORTES.map((r) => (
              <li key={r.titulo}>
                <a
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl border border-brand-border bg-brand-card/70 p-6 transition hover:border-brand-accent/50 hover:bg-brand-card"
                >
                  <p className="text-3xl font-bold leading-none text-brand-accent">{r.cifra}</p>
                  <p className="mt-3 text-[15px] font-semibold leading-snug text-brand-text">
                    {r.titulo}
                  </p>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-brand-muted">
                    {r.detalle}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-xs text-brand-muted/70">
                    <span className="font-semibold text-brand-muted">{r.medio}</span>
                    <span>·</span>
                    <span>{r.fecha}</span>
                    <ExternalLink
                      size={12}
                      className="ml-auto opacity-0 transition group-hover:opacity-100"
                      aria-hidden
                    />
                  </p>
                </a>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-brand-muted/60">
            Los datos son del sector turístico del país. No describen ningún proyecto en particular
            ni anticipan cómo le puede ir a uno.
          </p>
        </div>
      </section>

      {/* ───────────────── El problema ───────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
            Todo el mundo quiere entrarle al turismo.
            <br />
            <span className="text-brand-muted">Casi nadie sabe leer los números.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted">
            Te muestran una foto del volcán, una proyección bonita en Excel y un porcentaje que suena
            increíble. Y con eso la gente toma decisiones de decenas de miles de dólares.
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-brand-text">
            Yo hago lo contrario: te muestro la hoja completa de un hotel que <em>ya opera</em>,
            incluidos los meses malos. Después decidís vos.
          </p>
        </div>
      </section>

      {/* ───────────────── Lo que vas a ver ───────────────── */}
      <section className="border-y border-brand-border/60 bg-brand-surface/40 py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              {CLASE.duracionTexto} en vivo
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
              Lo que vamos a ver.
            </h2>
          </div>

          <ul className="mt-12 space-y-3">
            {LO_QUE_VAS_A_VER.map((item) => (
              <li
                key={item.numero}
                className="flex gap-5 rounded-2xl border border-brand-border bg-brand-card/60 p-6 transition hover:border-brand-accent/40"
              >
                <span className="font-mono text-sm font-bold text-brand-accent/70">
                  {item.numero}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-brand-text">{item.titulo}</h3>
                  <p className="mt-2 leading-relaxed text-brand-muted">{item.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────────── Reseñas ───────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              El hotel del que vamos a ver los números
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
              No es una maqueta.
              <br />
              <span className="text-brand-muted">Ahí duerme gente todas las noches.</span>
            </h2>
            <p className="mt-5 text-brand-muted">
              {RESUMEN_RESENAS.total} reseñas en Airbnb, {RESUMEN_RESENAS.promedio} de promedio entre
              las {RESUMEN_RESENAS.villas} villas. Las {RESUMEN_RESENAS.villas} tienen el distintivo
              «{RESUMEN_RESENAS.distintivo}». Estas son textuales, sin retocar una palabra.
            </p>
          </div>

          {/* Las villas por dentro. Fotos reales del hotel, las mismas de
              /ride-and-reset — no se vuelven a subir, se reusan. */}
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {FOTOS_VILLAS.map((f) => (
              <li key={f.src} className={f.ancha ? 'col-span-2' : ''}>
                <Image
                  src={f.src}
                  alt={f.alt}
                  width={f.width}
                  height={f.height}
                  /* La ancha ocupa dos columnas: si se le dice 320px, Next
                     sirve una imagen de 338 px para un hueco de 614 y se ve
                     suave. Medido en el navegador con `naturalWidth`. */
                  sizes={
                    f.ancha ? '(max-width: 768px) 100vw, 640px' : '(max-width: 768px) 50vw, 320px'
                  }
                  className="h-44 w-full rounded-2xl border border-brand-border object-cover sm:h-56"
                />
              </li>
            ))}
          </ul>

          <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RESENAS_BNB.map((r) => (
              <li
                key={r.nombre}
                /* `min-w-0` NO es decorativo: adentro hay una línea con `truncate`
                   (o sea `white-space: nowrap`) y un ítem de rejilla trae
                   `min-width: auto`, así que se niega a encogerse por debajo de
                   esa línea sin cortar. Sin esto la tarjeta medía 410 px dentro
                   de un contenedor de 312 y sacaba barra horizontal en el
                   teléfono. Medido en el navegador, no supuesto. */
                className="flex h-full min-w-0 flex-col rounded-2xl border border-brand-border bg-brand-card/60 p-6"
              >
                <Quote size={18} className="text-brand-accent/50" aria-hidden />
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-brand-text/90">
                  {r.texto}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-brand-border pt-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-accent/20 text-sm font-bold text-brand-accent-light"
                    aria-hidden
                  >
                    {r.nombre.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-brand-text">{r.nombre}</p>
                    <p className="truncate text-xs text-brand-muted">
                      {r.bandera && <span className="mr-1">{r.bandera}</span>}
                      {r.de} · {r.fecha}
                    </p>
                  </div>
                  <div className="ml-auto flex shrink-0 gap-0.5" aria-label="5 estrellas">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <Star key={i} size={10} className="fill-brand-gold text-brand-gold" aria-hidden />
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-center text-xs text-brand-muted/60">
            Reseñas de huéspedes de Bike & Bed publicadas en Airbnb, copiadas tal cual. Hablan del
            hospedaje, no de esta clase.
          </p>
        </div>
      </section>

      {/* ───────────────── Muro de registrados ───────────────── */}
      <MuroEnVivo />

      {/* ───────────────── Para quién sí, para quién no ───────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-6 md:px-12">
          <h2 className="text-center text-3xl font-bold leading-tight text-brand-text sm:text-5xl">
            No es para todo el mundo.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-center text-brand-muted">
            Prefiero que no te registrés a que pierdas una noche.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-brand-cta/30 bg-brand-cta/[0.06] p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-cta">
                <Check size={19} /> Entrá si…
              </h3>
              <ul className="mt-5 space-y-3.5">
                {PARA_QUIEN.si.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-brand-text/90">
                    <Check size={17} className="mt-1 shrink-0 text-brand-cta" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-brand-border bg-brand-card/60 p-7">
              <h3 className="flex items-center gap-2 text-lg font-bold text-brand-muted">
                <Equis size={19} /> No entrés si…
              </h3>
              <ul className="mt-5 space-y-3.5">
                {PARA_QUIEN.no.map((t) => (
                  <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-brand-muted">
                    <Equis size={17} className="mt-1 shrink-0 text-brand-muted/60" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────── Quién la da ───────────────── */}
      <section className="border-y border-brand-border/60 bg-brand-surface/40 py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 md:grid-cols-[280px_1fr] md:px-12">
          <div className="relative mx-auto w-[220px] md:w-full">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.35)_0%,transparent_70%)] blur-xl"
            />
            <Image
              src="/images/tony/tony-alvarado-recorte.png"
              alt="Tony Alvarado"
              width={1000}
              height={1188}
              className="relative w-full object-contain"
            />
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-accent">
              Quién te la da
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight text-brand-text sm:text-4xl">
              Tony Alvarado
            </h2>
            <p className="mt-5 leading-relaxed text-brand-muted">
              Desarrollo y opero hoteles temáticos en La Fortuna de San Carlos. Bike & Bed opera
              desde setiembre de 2025 y Humaya —diez villas— abre en noviembre de 2026. Los números
              que vas a ver en la clase son los de mi propia operación, no los de un caso de estudio
              ajeno.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-4">
              {CREDENCIALES.map((c) => (
                <li key={c.dato} className="rounded-xl border border-brand-border bg-brand-card/60 p-4">
                  <p className="text-xl font-bold text-brand-accent">{c.dato}</p>
                  <p className="mt-1 text-[13px] leading-snug text-brand-muted">{c.detalle}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ───────────────── El registro ───────────────── */}
      <section id="registro" className="relative overflow-hidden py-20 scroll-mt-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(139,92,246,0.22)_0%,transparent_70%)]"
        />
        <div className="relative z-10 mx-auto max-w-lg px-6 md:px-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-brand-text sm:text-4xl">
              Guardame mi campo.
            </h2>
            <p className="mt-4 text-brand-muted">
              {CLASE.fechaTexto} · {CLASE.horaTexto} · {CLASE.duracionTexto}
            </p>
          </div>

          <div className="mt-8 rounded-3xl border border-brand-accent/25 bg-brand-card/90 p-6 shadow-[0_0_60px_rgba(139,92,246,0.15)] sm:p-8">
            <FormularioClase origen="principal" />
          </div>

          <div className="mt-6">
            <Contador />
          </div>
        </div>
      </section>

      {/* ───────────────── El VIP presencial ───────────────── */}
      {/* Solo aparece cuando hay un enlace de pago de verdad. */}
      {hayVip() && (
        <section className="border-y border-brand-border/60 bg-brand-surface/40 py-16">
          <div className="mx-auto max-w-3xl px-6 md:px-12">
            <div className="rounded-3xl border border-brand-gold/30 bg-brand-card/70 p-7 sm:p-9">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                Opcional · aparte de la clase gratis
              </p>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-brand-text sm:text-3xl">
                {VIP.nombre}
              </h2>
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
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-gold/60 px-7 py-3.5 text-sm font-bold text-brand-gold transition hover:bg-brand-gold hover:text-brand-bg"
              >
                Quiero la entrada del presencial
                <ArrowRight size={16} />
              </a>

              <p className="mt-4 text-xs leading-relaxed text-brand-muted/70">{VIP.noIncluye}</p>
            </div>
          </div>
        </section>
      )}

      {/* ───────────────── Preguntas ───────────────── */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <h2 className="text-center text-3xl font-bold leading-tight text-brand-text sm:text-4xl">
            Lo que me preguntan siempre.
          </h2>

          <div className="mt-10 space-y-3">
            {PREGUNTAS.map((q) => (
              <details
                key={q.p}
                className="group rounded-2xl border border-brand-border bg-brand-card/60 px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-[16px] font-semibold text-brand-text">
                  {q.p}
                  <span className="shrink-0 text-brand-accent transition group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-relaxed text-brand-muted">{q.r}</p>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="#registro"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-cta px-8 py-4 text-base font-bold text-brand-bg shadow-[0_8px_30px_rgba(34,197,94,0.28)] transition hover:bg-brand-cta-fuerte"
            >
              Guardame mi campo
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* ───────────────── Pie ───────────────── */}
      <footer className="border-t border-brand-border/60 bg-brand-bg pb-28 pt-12 md:pb-12">
        <div className="mx-auto max-w-4xl px-6 md:px-12">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <Image
              src="/images/logos/tony-alvarado-logo-white-horizontal.png"
              alt="Tony Alvarado"
              width={1920}
              height={456}
              className="h-6 w-auto object-contain opacity-70"
            />
            {MARCAS.map((m) => (
              <Image
                key={m.src}
                src={m.src}
                alt={m.alt}
                width={m.width}
                height={m.height}
                className={m.clase.replace('opacity-70', 'opacity-50')}
              />
            ))}
          </div>

          <p className="mt-10 text-center text-xs leading-relaxed text-brand-muted/60">
            Esta es una clase educativa y gratuita. No constituye una oferta pública de valores ni
            asesoría legal, contable o de inversión. No se ofrece ni se garantiza ningún resultado
            económico. Los datos de operación que se muestran son reportados por la propia operación
            y no son estados auditados.
          </p>

          <p className="mt-5 text-center text-xs text-brand-muted/60">
            ¿Preferís leer antes de entrar?{' '}
            <a href={GUIA.url} className="text-brand-accent underline underline-offset-4">
              La guía «{GUIA.titulo}»
            </a>
          </p>

          <p className="mt-6 text-center text-xs text-brand-muted/40">
            © {new Date().getFullYear()} Tony Alvarado · La Fortuna, Costa Rica
          </p>
        </div>
      </footer>

      <BarraFija />
      <SalidaIntencion />
    </>
  )
}
