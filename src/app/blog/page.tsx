import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { blogPosts, formatDate } from '@/lib/blog-posts'
import type { BlogPost } from '@/lib/blog-posts'
import { client } from '@/sanity/lib/client'
import { postsQuery } from '@/sanity/lib/queries'
import type { SanityBlogPost } from '@/sanity/lib/queries'

export const metadata = {
  title: 'Blog de ciclismo, liderazgo y vida — Tony Alvarado',
  description:
    'Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike, ciclismo de ruta, emprendimiento, fe y turismo deportivo en Costa Rica. Por Tony Alvarado.',
  alternates: { canonical: '/blog' },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${SITE_URL}/blog#webpage`,
  name: 'Blog de Tony Alvarado — Ciclismo, liderazgo y transformación',
  description:
    'Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike, ciclismo de ruta, emprendimiento, fe y turismo deportivo en Costa Rica. Por Tony Alvarado.',
  url: `${SITE_URL}/blog`,
  inLanguage: 'es-CR',
  isPartOf: websiteRef,
  about: personRef,
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE_URL },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
  ],
}

type DisplayPost = {
  slug: string
  title: string
  category: string
  summary: string
  date: string
  rawDate: string
  readingTime: number | string
}

function fromSanity(post: SanityBlogPost): DisplayPost {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category || '',
    summary: post.summary || '',
    date: post.publishedAt ? formatDate(post.publishedAt) : '',
    rawDate: post.publishedAt || '',
    readingTime: post.readingTime ?? '',
  }
}

function fromLocal(p: BlogPost): DisplayPost {
  return {
    slug: p.slug,
    title: p.title,
    category: p.category,
    summary: p.summary,
    date: formatDate(p.date),
    rawDate: p.date,
    readingTime: p.readingTime,
  }
}

export default async function BlogPage() {
  let sanityPosts: SanityBlogPost[] = []

  try {
    const fetched: SanityBlogPost[] = await client.fetch(
      postsQuery,
      {},
      { next: { revalidate: 60 } }
    )
    if (fetched?.length) sanityPosts = fetched
  } catch {
    // Sanity not reachable — continue with local only
  }

  // Merge: Sanity posts + local posts whose slug isn't already in Sanity
  const sanitySlugSet = new Set(sanityPosts.map((p) => p.slug))
  const localOnly = blogPosts.filter((p) => !sanitySlugSet.has(p.slug))

  const displayPosts: DisplayPost[] = [
    ...sanityPosts.map(fromSanity),
    ...localOnly.map(fromLocal),
  ].sort((a, b) => (b.rawDate > a.rawDate ? 1 : -1))

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog de Tony Alvarado — Ciclismo, liderazgo y transformación',
    itemListElement: displayPosts.map((post, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: post.title,
      description: post.summary,
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  }

  return (
    <main>
      <JsonLd data={webPageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={itemListSchema} />

      {/* Hero */}
      <section className="bg-brand-bg py-20">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-accent">
            Blog
          </p>
          <h1 className="text-4xl font-bold text-brand-text md:text-5xl">
            Ciclismo, liderazgo y vida{' '}
            <span className="text-brand-accent">sobre dos ruedas.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-brand-muted">
            Reflexiones, guías y respuestas prácticas sobre entrenamiento, mountain bike,
            ciclismo de ruta, emprendimiento, fe, disciplina y turismo deportivo en Costa Rica.
          </p>
        </div>
      </section>

      {/* Tarjetas de artículos */}
      <section className="bg-brand-bg pb-24">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="grid gap-4">
            {displayPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="block rounded-xl border border-brand-border bg-brand-card p-6 transition-all duration-200 hover:border-brand-accent/40 hover:shadow-[0_0_28px_-8px_rgba(139,92,246,0.18)] md:p-8"
                >
                  {post.category && (
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                      {post.category}
                    </span>
                  )}
                  <h2 className="mt-2.5 text-xl font-bold leading-snug text-brand-text transition-colors group-hover:text-brand-accent md:text-2xl">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-muted">
                      {post.summary}
                    </p>
                  )}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-brand-muted/60">
                      {post.date && <span>{post.date}</span>}
                      {post.date && post.readingTime && (
                        <span className="text-brand-muted/30">·</span>
                      )}
                      {post.readingTime && (
                        <span>{post.readingTime} min de lectura</span>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-brand-accent transition-opacity group-hover:opacity-70">
                      Leer →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
