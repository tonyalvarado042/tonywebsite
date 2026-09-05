import Image from 'next/image'
import {
  Bike, Dumbbell, Waves, Snowflake, Salad, Moon, TreePine, Users,
  MapPin, CalendarDays, Flame,
} from 'lucide-react'
import JsonLd from '@/components/JsonLd'
import FormularioRifa from '@/components/bnb/FormularioRifa'
import BotonQuieroSerParte from '@/components/bnb/BotonQuieroSerParte'
import {
  RIFA, RESERVA, ANFITRIONES, EXPERIENCIA, PASOS, FOTOS, LOGO_BNB,
  PENDIENTE, pendientesDeLaRifa,
} from '@/data/ride-and-reset'

/**
 * RIDE & RESET — la landing de la rifa de Bike & Bed.
 *
 * Vive en el grupo de rutas `(bnb)`, con layout raíz propio: acá no entra el
 * encabezado ni el pie de tonyalvarado.com. Es otra marca.
 *
 * Todos los datos duros salen de `src/data/ride-and-reset.ts`. Si un dato
 * todavía no está, la página lo dice — no se lo inventa.
 */

const URL_PAGINA = 'https://www.tonyalvarado.com/ride-and-reset'

export const metadata = {
  title: 'Rifa RIDE & RESET — 2 cupos gratis en Bike & Bed, La Fortuna',
  description:
    'Participá por uno de los 2 cupos gratis para RIDE & RESET: 4 días y 3 noches en La Fortuna, ' +
    'con rides alrededor del Volcán Arenal, entrenamiento, termales y recuperación, hospedado en ' +
    'Bike & Bed, el primer hotel temático de ciclismo de Costa Rica.',
  alternates: { canonical: '/ride-and-reset' },
  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: URL_PAGINA,
    siteName: 'Bike & Bed',
    title: 'Rifa RIDE & RESET — 2 cupos gratis en La Fortuna',
    description:
      '4 días y 3 noches alrededor del Volcán Arenal. Ciclismo, recuperación y rendimiento, con ' +
      'Alex Quesada y Tony Alvarado.',
    images: [{ url: FOTOS.portada.src, width: FOTOS.portada.ancho, height: FOTOS.portada.alto, alt: FOTOS.portada.alt }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rifa RIDE & RESET — 2 cupos gratis en La Fortuna',
    description: '4 días y 3 noches alrededor del Volcán Arenal, en Bike & Bed.',
    images: [FOTOS.portada.src],
  },
}

const ICONOS = {
  bici: Bike, fuerza: Dumbbell, termales: Waves, frio: Snowflake,
  nutricion: Salad, sueno: Moon, naturaleza: TreePine, equipo: Users,
} as const

export default function RideAndReset() {
  const faltan = pendientesDeLaRifa()
  const hayCierre = RIFA.cierre.texto !== PENDIENTE

  const evento = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: `${RIFA.nombre} — La Fortuna`,
    startDate: RIFA.fechas.inicio,
    endDate: RIFA.fechas.fin,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    url: URL_PAGINA,
    image: [`https://www.tonyalvarado.com${FOTOS.portada.src}`],
    description:
      'Cuatro días y tres noches de ciclismo, recuperación y rendimiento en La Fortuna, ' +
      'hospedados en Bike & Bed.',
    location: {
      '@type': 'Place',
      name: 'Bike & Bed',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'La Fortuna de San Carlos',
        addressRegion: 'Alajuela',
        addressCountry: 'CR',
      },
    },
    performer: ANFITRIONES.map((a) => ({ '@type': 'Person', name: a.nombre, url: a.sitio })),
  }

  return (
    <main className="bg-bnb-negro">
      <JsonLd data={evento} />

      {/* ══ Aviso de datos que faltan ══════════════════════════════════════
          Solo se ve mientras haya PENDIENTES. Está a propósito arriba de todo:
          es para que nadie publique la página a medias sin darse cuenta. */}
      {faltan.length > 0 && (
        <div className="border-b-2 border-bnb-lava bg-bnb-lava/10 px-6 py-4 text-center">
          <p className="mx-auto max-w-3xl text-[13.5px] leading-relaxed text-bnb-blanco">
            <strong className="font-bnb-titulo font-bold">Falta llenar {faltan.length} dato{faltan.length > 1 ? 's' : ''}</strong>
            {' '}en <code className="rounded bg-bnb-negro px-1.5 py-0.5 text-bnb-lava">src/data/ride-and-reset.ts</code>:
            {' '}<span className="text-bnb-humo">{faltan.join(' · ')}</span>.
            {' '}Esta página no debería publicarse así.
          </p>
        </div>
      )}

      {/* ══ Portada ═══════════════════════════════════════════════════════ */}
      <section className="relative isolate flex min-h-[92vh] flex-col justify-end overflow-hidden">
        <Image
          src={FOTOS.portada.src}
          alt={FOTOS.portada.alt}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
          style={{ objectPosition: FOTOS.portada.encuadre }}
        />
        {/* El degradado hace legible el texto encima de la foto. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-bnb-negro via-bnb-negro/75 to-bnb-negro/25" />

        <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-28 sm:pb-24">
          <Image
            src={LOGO_BNB.src}
            alt={LOGO_BNB.alt}
            width={LOGO_BNB.ancho}
            height={LOGO_BNB.alto}
            priority
            className="mb-8 h-20 w-auto sm:h-24"
          />

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-bnb-lava/50
                        bg-bnb-negro/60 px-4 py-1.5 font-bnb-titulo text-[12px] font-bold
                        uppercase tracking-[0.18em] text-bnb-lava backdrop-blur-sm">
            <Flame size={14} /> Esto no es una rifa normal
          </p>

          <h1 className="mb-5 max-w-3xl font-bnb-titulo text-4xl font-extrabold leading-[1.05]
                         text-bnb-blanco sm:text-6xl lg:text-7xl">
            {RIFA.cupos} cupos gratis
            <span className="block text-bnb-lava">
              para vivir{' '}
              {/* El nombre no se parte nunca: «RIDE &» arriba y «RESET» solo
                  abajo se lee como un error de maquetación. */}
              <span className="whitespace-nowrap">{RIFA.nombre}</span>
            </span>
          </h1>

          <p className="mb-8 max-w-2xl text-[17px] leading-relaxed text-bnb-humo sm:text-[19px]">
            {RIFA.fechas.dias} días y {RIFA.fechas.noches} noches para desconectarte de la rutina
            y volver a conectar con tu cuerpo, tu mente y tu mejor versión.
          </p>

          <dl className="mb-10 flex flex-wrap gap-x-8 gap-y-4">
            <Dato icono={CalendarDays} titulo="Cuándo">{RIFA.fechas.texto}</Dato>
            <Dato icono={MapPin} titulo="Dónde">{RIFA.lugar}</Dato>
            {hayCierre && <Dato icono={Flame} titulo="Cierra">{RIFA.cierre.texto}</Dato>}
          </dl>

          <a
            href="#participar"
            className="inline-flex min-h-[58px] items-center justify-center rounded-2xl bg-bnb-lava
                       px-8 text-[16px] font-bold text-bnb-negro transition-colors
                       hover:bg-bnb-lava-fuerte"
          >
            Quiero participar
          </a>
        </div>
      </section>

      {/* ══ Qué es RIDE & RESET ═══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Titulo bajada="Una experiencia creada alrededor del ciclismo, la recuperación y el rendimiento.">
          Qué vas a vivir
        </Titulo>

        <ul className="grid gap-px overflow-hidden rounded-3xl border border-bnb-borde
                       bg-bnb-borde sm:grid-cols-2">
          {EXPERIENCIA.map((item) => {
            const Icono = ICONOS[item.icono as keyof typeof ICONOS] ?? Bike
            return (
              <li key={item.titulo} className="flex items-start gap-4 bg-bnb-carbon p-6">
                <Icono size={22} className="mt-0.5 shrink-0 text-bnb-lava" strokeWidth={1.75} />
                <span className="text-[15.5px] leading-relaxed text-bnb-humo">{item.titulo}</span>
              </li>
            )
          })}
        </ul>
      </section>

      {/* ══ No vas solo ═══════════════════════════════════════════════════ */}
      <section className="border-y border-bnb-borde bg-bnb-carbon">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="mb-3 font-bnb-titulo text-[12px] font-bold uppercase tracking-[0.18em] text-bnb-lava">
              Pero hay algo mejor
            </p>
            <h2 className="mb-5 font-bnb-titulo text-4xl font-extrabold leading-tight text-bnb-blanco sm:text-5xl">
              No vas solo.
            </h2>
            <p className="mb-6 text-[17px] leading-relaxed text-bnb-humo">
              Regalamos <strong className="text-bnb-blanco">{RIFA.cupos} cupos</strong>, porque las
              mejores experiencias se viven con alguien más.
            </p>
            <p className="font-bnb-titulo text-[15px] font-semibold uppercase tracking-[0.14em] text-bnb-blanco">
              {RIFA.fechas.dias} días · {RIFA.fechas.noches} noches · {RIFA.cupos} personas
            </p>
            <p className="mt-2 font-bnb-titulo text-[15px] font-semibold uppercase tracking-[0.14em] text-bnb-lava">
              Ride. Recover. Reset.
            </p>
          </div>

          <figure className="overflow-hidden rounded-3xl border border-bnb-borde">
            <Image
              src={FOTOS.pareja.src}
              alt={FOTOS.pareja.alt}
              width={FOTOS.pareja.ancho}
              height={FOTOS.pareja.alto}
              sizes="(min-width: 1024px) 46rem, 100vw"
              className="h-[26rem] w-full object-cover lg:h-[32rem]"
              style={{ objectPosition: FOTOS.pareja.encuadre }}
            />
          </figure>
        </div>
      </section>

      {/* ══ Quiénes te acompañan ══════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Titulo bajada="Dos personas que se dedican a esto todos los días, acompañándote los cuatro días.">
          Quiénes te acompañan
        </Titulo>

        <div className="grid gap-6 md:grid-cols-2">
          {ANFITRIONES.map((a) => (
            <article key={a.nombre} className="rounded-3xl border border-bnb-borde bg-bnb-carbon p-7">
              <p className="mb-1 font-bnb-titulo text-[11.5px] font-bold uppercase tracking-[0.16em] text-bnb-lava">
                {a.rol}
              </p>
              <h3 className="mb-1 font-bnb-titulo text-2xl font-bold text-bnb-blanco">{a.nombre}</h3>
              <a
                href={a.sitio}
                target="_blank"
                rel="noopener noreferrer"
                className="mb-5 inline-block text-[13px] text-bnb-tenue underline
                           decoration-bnb-borde underline-offset-4 transition-colors
                           hover:text-bnb-humo hover:decoration-bnb-lava"
              >
                {a.marca}
              </a>
              <p className="mb-4 text-[15px] leading-relaxed text-bnb-humo">{a.bio}</p>
              <p className="text-[14.5px] leading-relaxed text-bnb-tenue">{a.detalle}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ══ Dónde dormís ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden border-y border-bnb-borde">
        <Image
          src={FOTOS.salida.src}
          alt={FOTOS.salida.alt}
          fill
          sizes="100vw"
          className="-z-10 object-cover opacity-40"
          style={{ objectPosition: FOTOS.salida.encuadre }}
        />
        <div className="absolute inset-0 -z-10 bg-bnb-negro/55" />

        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-32">
          <Image
            src={LOGO_BNB.src}
            alt={LOGO_BNB.alt}
            width={LOGO_BNB.ancho}
            height={LOGO_BNB.alto}
            className="mx-auto mb-7 h-24 w-auto"
          />
          <h2 className="mb-5 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
            El primer hotel temático de ciclismo de Costa Rica
          </h2>
          <p className="text-[17px] leading-relaxed text-bnb-humo">
            En La Fortuna de San Carlos, a minutos del Volcán Arenal. Ahí dormís, ahí
            salen los rides, y ahí vuelve el cuerpo a su lugar.
          </p>
        </div>
      </section>

      {/* ══ Cómo participar ═══════════════════════════════════════════════ */}
      <section className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
        <Titulo bajada="Tres pasos. Los tres cuentan.">Cómo participar</Titulo>

        <ol className="grid gap-6 md:grid-cols-3">
          {PASOS.map((paso) => (
            <li key={paso.numero} className="rounded-3xl border border-bnb-borde bg-bnb-carbon p-7">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full
                               border border-bnb-lava font-bnb-titulo text-lg font-bold text-bnb-lava">
                {paso.numero}
              </span>
              <h3 className="mb-2 font-bnb-titulo text-lg font-bold text-bnb-blanco">{paso.titulo}</h3>
              <p className="text-[14.5px] leading-relaxed text-bnb-humo">{paso.detalle}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ══ No querés dejarlo a la suerte ═════════════════════════════════
          Tony pidió expreso que esta parte tuviera peso, no que fuera una
          notita al pie. Manda al MISMO formulario, con la casilla prendida. */}
      <section className="border-y border-bnb-borde bg-bnb-carbon">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          {/* El número es el gancho: son diez, y son de verdad. */}
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-bnb-lava/50
                        px-4 py-1.5 font-bnb-titulo text-[12px] font-bold uppercase
                        tracking-[0.16em] text-bnb-lava">
            <Flame size={14} /> Solo {RESERVA.cupos} cupos con precio especial
          </p>

          <h2 className="mb-5 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
            {RESERVA.titulo}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-[17px] leading-relaxed text-bnb-humo">
            {RESERVA.bajada}
          </p>
          <BotonQuieroSerParte>{RESERVA.llamado}</BotonQuieroSerParte>
        </div>
      </section>

      {/* ══ El formulario ═════════════════════════════════════════════════ */}
      <section id="participar" className="scroll-mt-8 px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl">
          <div className="mb-9 text-center">
            <p className="mb-3 font-bnb-titulo text-[12px] font-bold uppercase tracking-[0.18em] text-bnb-lava">
              Último paso
            </p>
            <h2 className="mb-4 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
              Dejá tus datos y quedás adentro
            </h2>
            <p className="text-[16px] leading-relaxed text-bnb-humo">
              Es gratis. Toma menos de un minuto.
            </p>
          </div>

          <FormularioRifa />
        </div>
      </section>

      {/* ══ Bases ═════════════════════════════════════════════════════════ */}
      <section className="border-t border-bnb-borde px-6 py-16">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 font-bnb-titulo text-lg font-bold text-bnb-blanco">
            Bases de la rifa
          </h2>
          <ul className="space-y-3 text-[13.5px] leading-relaxed text-bnb-tenue">
            <li>
              Se sortean <strong className="text-bnb-humo">{RIFA.cupos} cupos</strong> para{' '}
              {RIFA.nombre} en {RIFA.lugar}, {RIFA.fechas.texto.toLowerCase()} —{' '}
              {RIFA.fechas.dias} días y {RIFA.fechas.noches} noches de hospedaje en Bike &amp; Bed.
            </li>
            <li>
              Para participar hay que etiquetar a una persona en el post, compartirlo en
              historias y completar este formulario. Los tres pasos son necesarios.
            </li>
            <li>Una participación por persona. Los datos repetidos se unifican.</li>
            <li>
              {hayCierre
                ? `La rifa cierra el ${RIFA.cierre.texto}.`
                : 'La fecha de cierre se anuncia en el post de Instagram.'}
            </li>
            <li>
              {RIFA.comoSeElige !== PENDIENTE
                ? RIFA.comoSeElige
                : 'La forma de elegir a quien gana se publica junto con la fecha de cierre.'}
            </li>
            <li>
              {RIFA.cuandoSeAnuncia !== PENDIENTE
                ? RIFA.cuandoSeAnuncia
                : 'El resultado se anuncia en las redes de Bike & Bed.'}
            </li>
            <li>
              El premio cubre el hospedaje y la experiencia en las fechas indicadas. No
              incluye transporte hasta La Fortuna ni gastos personales.
            </li>
            <li>
              Esta promoción <strong className="text-bnb-humo">no está patrocinada, avalada
              ni administrada por Instagram ni por Meta</strong>, ni asociada a ellos de
              ninguna forma.
            </li>
          </ul>

          <p className="mt-10 text-[12.5px] text-bnb-tenue">
            Bike &amp; Bed · La Fortuna de San Carlos, Costa Rica ·{' '}
            <a
              href="https://www.tonyalvarado.com/politica-de-privacidad"
              className="underline decoration-bnb-borde underline-offset-4 transition-colors hover:text-bnb-humo"
            >
              Política de privacidad
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

// ── Piezas ──────────────────────────────────────────────────────────────────

function Titulo({ children, bajada }: { children: React.ReactNode; bajada: string }) {
  return (
    <div className="mb-10 max-w-2xl">
      <h2 className="mb-3 font-bnb-titulo text-3xl font-extrabold leading-tight text-bnb-blanco sm:text-4xl">
        {children}
      </h2>
      <p className="text-[16.5px] leading-relaxed text-bnb-humo">{bajada}</p>
    </div>
  )
}

function Dato({ icono: Icono, titulo, children }: {
  icono: typeof MapPin
  titulo: string
  children: React.ReactNode
}) {
  return (
    <div>
      <dt className="mb-1 flex items-center gap-1.5 font-bnb-titulo text-[11px] font-bold
                     uppercase tracking-[0.16em] text-bnb-tenue">
        <Icono size={13} /> {titulo}
      </dt>
      <dd className="text-[15.5px] font-medium text-bnb-blanco">{children}</dd>
    </div>
  )
}
