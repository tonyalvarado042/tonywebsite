import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import JsonLd from '@/components/JsonLd'
import { blogPosts, getPostBySlug, formatDate } from '@/lib/blog-posts'
import { SITE_URL, personRef } from '@/lib/structured-data'

type Props = { params: Promise<{ slug: string }> }

const KEYWORDS = [
  'Pure Cycling',
  'PuroMTB',
  'Bike & Bed Hotels',
  'Costa Rica',
  'mountain bike',
  'turismo deportivo',
  'plan de entrenamiento',
  'ciclismo',
  'MTB',
  'entrenamiento',
  'propósito',
  'disciplina',
  'liderazgo',
]

const keywordSet = new Set(KEYWORDS.map(k => k.toLowerCase()))

function renderText(text: string) {
  const sorted = [...KEYWORDS].sort((a, b) => b.length - a.length)
  const escaped = sorted.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, 'gi')
  return text.split(regex).map((part, i) =>
    keywordSet.has(part.toLowerCase())
      ? <span key={i} className="font-medium text-brand-text">{part}</span>
      : part
  )
}

function parseStep(text: string): { num: string; body: string } | null {
  const m = text.match(/^(\d+)\.\s+(.+)$/)
  return m ? { num: m[1], body: m[2] } : null
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Tony Alvarado`,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: personRef,
    url: `${SITE_URL}/blog/${post.slug}`,
    keywords: post.keyword,
  }

  return (
    <main className="bg-brand-bg">
      <JsonLd data={articleSchema} />

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 md:px-12">

          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-accent"
          >
            ← Blog
          </Link>

          {/* Cabecera */}
          <div className="mt-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
              {post.category}
            </span>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-brand-muted/60">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingTime} min de lectura</span>
              <span>·</span>
              <span>Por Tony Alvarado</span>
            </div>
          </div>

          <div className="my-8 border-t border-brand-border" />

          {/* Idea central */}
          <div className="mb-10 rounded-xl border border-brand-accent/20 bg-brand-card px-6 py-5">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-accent">
              Idea central
            </p>
            <p className="text-base font-medium leading-relaxed text-brand-text">
              {post.summary}
            </p>
          </div>

          {/* Contenido */}
          <div className="space-y-7">
            {post.content.map((paragraph, i) => {
              const step = parseStep(paragraph)

              if (step) {
                return (
                  <div
                    key={i}
                    className="rounded-xl border-l-4 border-brand-accent bg-brand-card px-6 py-5"
                  >
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-accent text-xs font-bold text-white">
                        {step.num}
                      </span>
                      <p className="text-base leading-relaxed text-brand-muted text-left md:text-justify">
                        {renderText(step.body)}
                      </p>
                    </div>
                  </div>
                )
              }

              if (i === 0) {
                return (
                  <p
                    key={i}
                    className="text-lg font-medium leading-relaxed text-brand-text text-left md:text-justify"
                  >
                    {renderText(paragraph)}
                  </p>
                )
              }

              return (
                <p
                  key={i}
                  className="text-base leading-relaxed text-brand-muted text-left md:text-justify"
                >
                  {renderText(paragraph)}
                </p>
              )
            })}
          </div>

          {/* CTA */}
          <div className="mt-14 rounded-2xl border border-brand-accent/30 bg-brand-card p-8 text-center">
            <Link
              href={post.cta.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {post.cta.label}
            </Link>
          </div>

          {/* Volver */}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="text-sm text-brand-muted transition-colors hover:text-brand-accent"
            >
              ← Volver al blog
            </Link>
          </div>

        </div>
      </section>
    </main>
  )
}
