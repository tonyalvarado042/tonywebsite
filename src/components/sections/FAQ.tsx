'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { faqs, type FAQAnswerBlock, type FAQItem } from '@/data/faqs'

function renderInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-semibold text-brand-text">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  )
}

function renderAnswer(answer: FAQAnswerBlock[]) {
  return (
    <>
      {answer.map((block, i) => {
        if (block.type === 'paragraph') {
          return <p key={i}>{renderInlineText(block.text)}</p>
        }
        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2">
              {block.items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent/70" />
                  <span>{renderInlineText(item)}</span>
                </li>
              ))}
            </ul>
          )
        }
        return null
      })}
    </>
  )
}

function FAQRow({ question, answer }: { question: string; answer: FAQAnswerBlock[] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-brand-border">
      <button
        className="flex w-full items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="pr-4 font-semibold text-brand-text">{question}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-brand-accent transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pb-5 text-sm text-brand-muted">
              {renderAnswer(answer)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type FAQProps = {
  locale?: 'es' | 'en'
  questions?: FAQItem[]
}

export default function FAQ({ locale = 'es', questions }: FAQProps) {
  const t = locale === 'en' ? {
    sectionLabel: 'Frequently asked questions',
    h2text: 'The questions',
    h2span: 'we hear most.',
  } : {
    sectionLabel: 'Preguntas frecuentes',
    h2text: 'Las preguntas',
    h2span: 'que más nos hacen.',
  }

  const currentFaqs = questions ?? faqs

  return (
    <section id="faq" className="bg-brand-bg py-20">
      <div className="mx-auto max-w-3xl px-6 md:px-12">

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            {t.sectionLabel}
          </p>
          <h2 className="text-4xl font-bold text-brand-text">
            {t.h2text}{' '}
            <span className="text-brand-accent">{t.h2span}</span>
          </h2>
        </motion.div>

        <div>
          {currentFaqs.map((faq) => (
            <FAQRow key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>

      </div>
    </section>
  )
}
