import Link from 'next/link'
import { Compass, ArrowRight } from 'lucide-react'

/**
 * Bloque corto de mentoría en la home, que lleva a `/mentoria`.
 *
 * Existe porque el enlace desde liderax10.com trae gente buscando quién la
 * ayude a escalar su empresa, y hasta el 13 de setiembre de 2026 caían en una
 * home que solo habla de proyectos turísticos. Acá se enteran de que Tony
 * también acompaña empresas; el detalle vive en la página propia.
 */

const pilares = ['Marketing', 'Liderazgo', 'Ventas', 'Estrategia', 'Finanzas']
const pilaresEn = ['Marketing', 'Leadership', 'Sales', 'Strategy', 'Finance']

export default function MentoriaTeaser({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  const en = locale === 'en'
  const t = en
    ? {
        rotulo: 'Business mentoring',
        titulo: 'Scale your company to 6 or 7 figures,',
        acento: 'with someone who already did it.',
        texto:
          'Not a course, not a template. Direct guidance so your business grows and — above all — learns to run without you in the middle of everything.',
        cta: 'See how it works',
        href: '/en/mentoring',
        pilares: pilaresEn,
      }
    : {
        rotulo: 'Mentoría empresarial',
        titulo: 'Escalá tu empresa a 6 o 7 cifras,',
        acento: 'con alguien que ya lo hizo.',
        texto:
          'No es un curso ni una plantilla. Es acompañamiento directo para que tu negocio crezca y, sobre todo, para que aprenda a funcionar sin que vos tengás que estar en todo.',
        cta: 'Ver cómo funciona',
        href: '/mentoria',
        pilares,
      }

  return (
    <section className="bg-brand-bg py-20">
      <div className="mx-auto max-w-5xl px-6 md:px-12">
        <div className="rounded-2xl border border-brand-accent/25 bg-brand-card p-8 md:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-accent/30 bg-brand-surface px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-accent">
                <Compass size={12} /> {t.rotulo}
              </span>
              <h2 className="text-2xl font-bold leading-tight text-brand-text md:text-3xl">
                {t.titulo}{' '}
                <span className="text-brand-accent">{t.acento}</span>
              </h2>
              <p className="mt-4 max-w-xl text-brand-muted">{t.texto}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {t.pilares.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-brand-border px-3 py-1 text-xs text-brand-muted"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:text-right">
              <Link
                href={t.href}
                className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-7 py-3.5 text-sm font-semibold text-brand-bg transition-opacity hover:opacity-90"
              >
                {t.cta} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
