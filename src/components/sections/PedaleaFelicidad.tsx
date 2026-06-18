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

const IMPACT_LINES_EN = [
  {
    icon: Bike,
    title: 'Mobility and access',
    text: 'Providing bicycles to people and communities who truly need them.',
  },
  {
    icon: Activity,
    title: 'Sport and wellbeing',
    text: 'Promoting physical activity, healthy habits and community connection.',
  },
  {
    icon: Users,
    title: 'Opportunities for new generations',
    text: 'Bringing cycling closer to children and young people, including youth leagues and development programs.',
  },
] as const

const GOALS = [
  { year: '2026', count: '50' },
  { year: '2027', count: '100' },
  { year: '2028', count: '150' },
  { year: '2029', count: '250' },
] as const

export default function PedaleaFelicidad({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const t = locale === 'en' ? {
    sectionLabel: 'Social impact',
    h2text: 'Pedalea la Felicidad',
    h2span: 'Foundation',
    missionP1: 'An initiative to transform lives through the bicycle, bringing mobility, sport and new opportunities to children, youth and people with limited resources.',
    missionP2: 'Each bicycle can become a tool of freedom, wellbeing and hope for a person, a family or a community.',
    quote: 'A bicycle can change a story.',
    goalsLabel: 'Bicycle goals',
    goalsSuffix: 'bicycles',
    disclaimer: '* Figures represent projected goals, not achieved results.',
  } : {
    sectionLabel: 'Impacto social',
    h2text: 'Fundación',
    h2span: 'Pedalea la Felicidad',
    missionP1: 'Una iniciativa para transformar vidas a través de la bicicleta, acercando movilidad, deporte y nuevas oportunidades a niños, jóvenes y personas de escasos recursos.',
    missionP2: 'Cada bicicleta puede convertirse en una herramienta de libertad, bienestar y esperanza para una persona, una familia o una comunidad.',
    quote: 'Una bicicleta puede cambiar una historia.',
    goalsLabel: 'Metas de bicicletas',
    goalsSuffix: 'bicicletas',
    disclaimer: '* Cifras corresponden a metas proyectadas, no a resultados alcanzados.',
  }

  const currentImpactLines = locale === 'en' ? IMPACT_LINES_EN : IMPACT_LINES

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
            {t.sectionLabel}
          </p>
          {locale === 'en' ? (
            <h2
              id="pedalea-felicidad-title"
              className="text-3xl font-bold text-brand-text md:text-4xl"
            >
              <span className="text-brand-gold">{t.h2text}</span>{' '}
              {t.h2span}
            </h2>
          ) : (
            <h2
              id="pedalea-felicidad-title"
              className="text-3xl font-bold text-brand-text md:text-4xl"
            >
              {t.h2text}{' '}
              <span className="text-brand-gold">{t.h2span}</span>
            </h2>
          )}
        </div>

        {/* Dos columnas desktop / una columna mobile */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">

          {/* Izquierda: misión + líneas de impacto */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="leading-relaxed text-brand-muted">
                {t.missionP1}
              </p>
              <p className="text-sm leading-relaxed text-brand-muted/80">
                {t.missionP2}
              </p>
            </div>

            <ul className="space-y-5">
              {currentImpactLines.map(({ icon: Icon, title, text }) => (
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
              {t.quote}
            </p>
          </div>

          {/* Derecha: metas anuales */}
          <div className="rounded-2xl border border-brand-border bg-brand-card p-8">
            <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-brand-green">
              {t.goalsLabel}
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
                    <span className="ml-1.5 text-sm text-brand-muted">{t.goalsSuffix}</span>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-xs text-brand-muted">
              {t.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
