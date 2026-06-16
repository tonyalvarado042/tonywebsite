import { Bike, Activity, Users } from 'lucide-react'

const IMPACT_LINES = [
  {
    icon: Bike,
    title: 'Movilidad y acceso',
    text: 'Facilitar bicicletas a personas y comunidades que realmente las necesitan.',
  },
  {
    icon: Activity,
    title: 'Deporte y bienestar',
    text: 'Promover actividad física, hábitos saludables y conexión comunitaria.',
  },
  {
    icon: Users,
    title: 'Oportunidades para nuevas generaciones',
    text: 'Acercar el ciclismo a niños y jóvenes, incluyendo ligas menores y procesos de formación.',
  },
] as const

const GOALS = [
  { year: '2026', count: '50' },
  { year: '2027', count: '100' },
  { year: '2028', count: '150' },
  { year: '2029', count: '250' },
] as const

export default function PedaleaFelicidad() {
  return (
    <section
      id="fundacion-pedalea-la-felicidad"
      aria-labelledby="pedalea-felicidad-title"
      className="bg-brand-surface py-20"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
            Impacto social
          </p>
          <h2
            id="pedalea-felicidad-title"
            className="text-3xl font-bold text-brand-text md:text-4xl"
          >
            Fundación{' '}
            <span className="text-brand-gold">Pedalea la Felicidad</span>
          </h2>
        </div>

        {/* Dos columnas desktop / una columna mobile */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Izquierda: misión + líneas de impacto */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="leading-relaxed text-brand-muted">
                Una iniciativa para transformar vidas a través de la bicicleta, acercando
                movilidad, deporte y nuevas oportunidades a niños, jóvenes y personas de
                escasos recursos.
              </p>
              <p className="text-sm leading-relaxed text-brand-muted/80">
                Cada bicicleta puede convertirse en una herramienta de libertad, bienestar
                y esperanza para una persona, una familia o una comunidad.
              </p>
            </div>

            <ul className="space-y-5">
              {IMPACT_LINES.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-4">
                  <div className="mt-0.5 shrink-0">
                    <Icon size={18} className="text-brand-green" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-semibold text-brand-text">{title}</p>
                    <p className="text-sm text-brand-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-sm italic text-brand-muted">
              Una bicicleta puede cambiar una historia.
            </p>
          </div>

          {/* Derecha: metas anuales */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Metas de bicicletas
            </p>
            <dl>
              {GOALS.map(({ year, count }) => (
                <div
                  key={year}
                  className="flex items-baseline justify-between gap-4 border-b border-brand-border/50 py-4 last:border-0"
                >
                  <dt className="text-sm text-brand-muted">{year}</dt>
                  <dd className="text-right">
                    <span className="text-2xl font-bold text-brand-gold">{count}</span>
                    <span className="ml-1.5 text-sm text-brand-muted">bicicletas</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-brand-muted">
              * Cifras corresponden a metas proyectadas, no a resultados alcanzados.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
