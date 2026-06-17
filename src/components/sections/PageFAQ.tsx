import { ChevronDown } from 'lucide-react'

export type PageFAQItem = {
  question: string
  answer: string
}

type PageFAQProps = {
  faqs: PageFAQItem[]
  title?: string
  eyebrow?: string
  accent?: 'green' | 'gold'
}

export default function PageFAQ({
  faqs,
  title = 'Preguntas frecuentes',
  eyebrow = 'FAQ',
  accent = 'green',
}: PageFAQProps) {
  const accentClass = accent === 'gold' ? 'text-brand-gold' : 'text-brand-green'

  return (
    <section className="bg-brand-surface py-16" aria-labelledby="page-faq-heading">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <div className="mb-10 text-center">
          <p className={`mb-2 text-xs font-semibold uppercase tracking-widest ${accentClass}`}>
            {eyebrow}
          </p>
          <h2 id="page-faq-heading" className="text-3xl font-bold text-brand-text">
            {title}
          </h2>
        </div>
        <div className="divide-y divide-brand-border">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between py-5 [&::-webkit-details-marker]:hidden">
                <span className="pr-4 font-semibold text-brand-text">{question}</span>
                <ChevronDown
                  size={18}
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-200 group-open:rotate-180 ${accentClass}`}
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-brand-muted">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
