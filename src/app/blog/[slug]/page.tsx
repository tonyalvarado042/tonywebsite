import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import JsonLd from '@/components/JsonLd'
import { blogPosts, getPostBySlug, formatDate } from '@/lib/blog-posts'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { SanityBlogPost } from '@/sanity/lib/queries'
import { SITE_URL, personRef } from '@/lib/structured-data'

type Props = { params: Promise<{ slug: string }> }

// ─── Local-post helpers (fallback) ───────────────────────────────────────────

const KEYWORDS = [
  'Pure Cycling', 'PuroMTB', 'Bike & Bed Hotels', 'Costa Rica',
  'mountain bike', 'turismo deportivo', 'plan de entrenamiento',
  'ciclismo', 'MTB', 'entrenamiento', 'propósito', 'disciplina', 'liderazgo',
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

// ─── PortableText components (Sanity posts) ──────────────────────────────────

const ptComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-base leading-relaxed text-brand-muted text-left md:text-justify">
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 className="mt-12 mb-4 text-2xl font-bold leading-tight text-brand-text md:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-8 mb-3 text-xl font-bold leading-tight text-brand-text">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-6 mb-2 text-lg font-semibold text-brand-text">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="my-8 rounded-r-lg border-l-4 border-brand-accent bg-brand-card py-4 pl-5 pr-4 italic text-brand-muted">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-5 space-y-2 pl-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="my-5 space-y-2 pl-5">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="list-disc text-sm leading-relaxed text-brand-muted marker:text-brand-accent">
        {children}
      </li>
    ),
    number: ({ children }: any) => (
      <li className="list-decimal text-sm leading-relaxed text-brand-muted marker:text-brand-accent/70">
        {children}
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-brand-text">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic text-brand-text/80">{children}</em>
    ),
    link: ({ value, children }: any) => {
      const target = value?.blank ? '_blank' : undefined
      return (
        <a
          href={value?.href || '#'}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-brand-accent underline decoration-brand-accent/40 underline-offset-2 transition-colors hover:decoration-brand-accent"
        >
          {children}
        </a>
      )
    },
  },
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      const src = urlForImage(value)?.width(800).url() || ''
      return (
        <figure className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={value.alt || ''}
            className="w-full max-h-[480px] rounded-xl object-cover"
            loading="lazy"
          />
          {value.caption && (
            <figcaption className="mt-3 text-center text-xs text-brand-muted/60">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const localParams = blogPosts.map((p) => ({ slug: p.slug }))

  try {
    const sanityData: { slug: string }[] = await client.fetch(postSlugsQuery)
    if (sanityData?.length) {
      const seen = new Set(localParams.map((p) => p.slug))
      sanityData.forEach(({ slug }) => {
        if (slug && !seen.has(slug)) {
          localParams.push({ slug })
          seen.add(slug)
        }
      })
    }
  } catch {
    // Sanity not reachable — use local params only
  }

  return localParams
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const post: SanityBlogPost | null = await client.fetch(postBySlugQuery, { slug })
    if (post) {
      return {
        title: `${post.seoTitle || post.title} — Tony Alvarado`,
        description: post.seoDescription || post.summary || '',
        alternates: { canonical: `/blog/${post.slug}` },
      }
    }
  } catch { /* fall through */ }

  const local = getPostBySlug(slug)
  if (!local) return {}
  return {
    title: `${local.title} — Tony Alvarado`,
    description: local.summary,
    alternates: { canonical: `/blog/${local.slug}` },
  }
}

// ─── Shared article header ────────────────────────────────────────────────────

function ArticleHeader({
  category,
  title,
  publishedAt,
  readingTime,
}: {
  category?: string
  title: string
  publishedAt: string
  readingTime?: number | string | null
}) {
  return (
    <div className="mt-6">
      {category && (
        <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
          {category}
        </span>
      )}
      <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
        {title}
      </h1>
      <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-brand-muted/60">
        {publishedAt && <span>{publishedAt}</span>}
        {publishedAt && readingTime && <span>·</span>}
        {readingTime && <span>{readingTime} min de lectura</span>}
        <span>·</span>
        <span>Por Tony Alvarado</span>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  // Try Sanity first
  let sanityPost: SanityBlogPost | null = null
  try {
    sanityPost = await client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } })
  } catch { /* fall through */ }

  // Fall back to local
  const localPost = sanityPost ? null : getPostBySlug(slug)

  if (!sanityPost && !localPost) notFound()

  // ── Sanity post render ────────────────────────────────────────────────────
  if (sanityPost) {
    const post = sanityPost
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.summary || '',
      datePublished: post.publishedAt,
      author: personRef,
      url: `${SITE_URL}/blog/${post.slug}`,
      keywords: post.keywords?.join(', ') || '',
    }
    const mainImageUrl = post.mainImage
      ? urlForImage(post.mainImage)?.width(1200).url()
      : null

    return (
      <main className="bg-brand-bg">
        <JsonLd data={articleSchema} />

        <section className="py-16">
          <div className="mx-auto max-w-3xl px-6 md:px-12">

            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-accent"
            >
              ← Blog
            </Link>

            <ArticleHeader
              category={post.category ?? undefined}
              title={post.title}
              publishedAt={post.publishedAt ? formatDate(post.publishedAt) : ''}
              readingTime={post.readingTime}
            />

            <div className="my-8 border-t border-brand-border" />

            {/* Imagen principal */}
            {mainImageUrl && (
              <div className="mb-10 overflow-hidden rounded-xl">
                <Image
                  src={mainImageUrl}
                  alt={post.mainImage?.alt || post.title}
                  width={800}
                  height={450}
                  className="w-full object-cover"
                  priority
                />
              </div>
            )}

            {/* Contenido Portable Text */}
            {post.body && post.body.length > 0 && (
              <div className="space-y-5">
                <PortableText value={post.body as any} components={ptComponents} />
              </div>
            )}

            {/* CTA */}
            {post.ctaLabel && post.ctaHref && (
              <div className="mt-14 rounded-2xl border border-brand-accent/30 bg-brand-card p-8 text-center">
                <Link
                  href={post.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {post.ctaLabel}
                </Link>
              </div>
            )}

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

  // ── Local post render (fallback) ─────────────────────────────────────────
  const post = localPost!
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
            className="inline-flex items-center gap-1 text-sm text-brand-muted transition-colors hover:text-brand-accent"
          >
            ← Blog
          </Link>

          <ArticleHeader
            category={post.category}
            title={post.title}
            publishedAt={formatDate(post.date)}
            readingTime={post.readingTime}
          />

          <div className="my-8 border-t border-brand-border" />

          {/* Contenido local */}
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
                  <p key={i} className="text-lg font-medium leading-relaxed text-brand-text text-left md:text-justify">
                    {renderText(paragraph)}
                  </p>
                )
              }
              return (
                <p key={i} className="text-base leading-relaxed text-brand-muted text-left md:text-justify">
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
