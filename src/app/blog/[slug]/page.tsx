import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { PortableText } from '@portabletext/react'
import JsonLd from '@/components/JsonLd'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries'
import type { SanityBlogPost } from '@/sanity/lib/queries'
import { SITE_URL, personRef } from '@/lib/structured-data'

type Props = { params: Promise<{ slug: string }> }

// ─── Utility ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const date = dateStr.includes('T') ? new Date(dateStr) : new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ─── PortableText components ──────────────────────────────────────────────────

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
    highlightPurple: ({ children }: any) => (
      <span className="font-medium text-brand-accent">{children}</span>
    ),
    highlightGold: ({ children }: any) => (
      <span className="font-medium text-yellow-400">{children}</span>
    ),
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
    callout: ({ value }: any) => {
      const styles: Record<string, string> = {
        tip: 'border-brand-accent/50',
        highlight: 'border-brand-accent',
        warning: 'border-yellow-400/60',
      }
      const icons: Record<string, string> = {
        tip: '💡',
        highlight: '⚡',
        warning: '⚠️',
      }
      const variant: string = value?.variant || 'tip'
      return (
        <div className={`my-8 rounded-r-lg border-l-4 ${styles[variant] ?? styles.tip} bg-brand-card px-5 py-4`}>
          <div className="flex items-start gap-3">
            <span className="mt-0.5 shrink-0 text-base">{icons[variant] ?? icons.tip}</span>
            <p className="text-sm leading-relaxed text-brand-muted">{value?.text}</p>
          </div>
        </div>
      )
    },
    ctaBlock: ({ value }: any) => {
      if (!value?.label || !value?.href) return null
      return (
        <div className="my-10 text-center">
          <a
            href={value.href}
            className="inline-flex items-center gap-2 rounded-full bg-brand-accent px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {value.label}
          </a>
        </div>
      )
    },
  },
}

// ─── Static params — solo Sanity ──────────────────────────────────────────────

export async function generateStaticParams() {
  try {
    const data: { slug: string }[] = await client.fetch(postSlugsQuery)
    return (data ?? [])
      .filter((p) => Boolean(p.slug))
      .map((p) => ({ slug: p.slug }))
  } catch {
    return []
  }
}

// ─── Metadata — solo Sanity ───────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const fallbackImage = '/images/og/tony-alvarado-og-source.jpeg'
  try {
    const post: SanityBlogPost | null = await client.fetch(postBySlugQuery, { slug })
    if (post) {
      const postTitle = `${post.seoTitle || post.title} — Tony Alvarado`
      const postDescription = post.seoDescription || post.summary || ''
      const postUrl = `https://www.tonyalvarado.com/blog/${post.slug}`
      let ogImageUrl = fallbackImage
      try {
        if (post.mainImage) {
          const resolved = urlForImage(post.mainImage)?.width(1200).height(630).url()
          if (resolved) ogImageUrl = resolved
        }
      } catch { /* usa fallback */ }
      return {
        title: postTitle,
        description: postDescription,
        alternates: { canonical: `/blog/${post.slug}` },
        openGraph: {
          type: 'article',
          locale: 'es_CR',
          url: postUrl,
          siteName: 'Tony Alvarado',
          title: postTitle,
          description: postDescription,
          images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
          card: 'summary_large_image',
          title: postTitle,
          description: postDescription,
          images: [ogImageUrl],
        },
      }
    }
  } catch { /* fall through to notFound */ }
  return {}
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post: SanityBlogPost | null = null
  try {
    post = await client.fetch(postBySlugQuery, { slug }, { next: { revalidate: 60 } })
  } catch { /* fall through */ }

  if (!post) notFound()

  const mainImageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1200).url()
    : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.title,
    description: post.summary || '',
    datePublished: post.publishedAt,
    author: personRef,
    publisher: personRef,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    inLanguage: 'es-CR',
    keywords: post.keywords?.join(', ') || '',
    ...(mainImageUrl && {
      image: {
        '@type': 'ImageObject',
        url: mainImageUrl,
        contentUrl: mainImageUrl,
      },
    }),
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

          {/* Cabecera */}
          <div className="mt-6">
            {post.category && (
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                {post.category}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-bold leading-tight text-brand-text md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-brand-muted/60">
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
              {post.publishedAt && post.readingTime && <span>·</span>}
              {post.readingTime && <span>{post.readingTime} min de lectura</span>}
              <span>·</span>
              <span>Por Tony Alvarado</span>
            </div>
          </div>

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

          {/* CTA principal */}
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
