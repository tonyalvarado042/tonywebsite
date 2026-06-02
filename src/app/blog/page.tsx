import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { SITE_URL, websiteRef, personRef } from '@/lib/structured-data'
import { blogPosts, formatDate } from '@/lib/blog-posts'
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
  readingTime: number | string
}

function fromSanity(post: SanityBlogPost): DisplayPost {
  return {
    slug: post.slug,
    title: post.title,
    category: post.category || '',
    summary: post.summary || '',
    date: post.publishedAt ? formatDate(post.publishedAt) : '',
    readingTime: post.readingTime ?? '',
  }
}

export default async function BlogPage() {
  let displayPosts: DisplayPost[] = []
  let usingSanity = false

  try {
    const sanityPosts: SanityBlogPost[] = await client.fetch(postsQuery, {}, { next: { revalidate: 60 } })
    if (sanityPosts && sanityPosts.length > 0) {
      usingSanity = true
      displayPosts = sanityPosts.map(fromSanity)
    }
  } catch {
    // Sanity not available — use fallback
  }

  if (!usingSanity) {
    displayPosts = blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      summary: p.summary,
      date: formatDate(p.date),
      readingTime: p.readingTime,
    }))
  }

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

      {/* Lista de artículos */}
      <section className="bg-brand-bg pb-20">
        <div className="mx-auto max-w-3xl px-6 md:px-12">
          <div className="divide-y divide-brand-border">
            {displayPosts.map((post) => (
              <article key={post.slug} className="group py-8">
                <Link href={`/blog/${post.slug}`} className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                    {post.category}
                  </span>
                  <h2 className="mt-2 text-xl font-bold text-brand-text transition-colors group-hover:text-brand-accent md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {post.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-brand-muted/60">
                      {post.date && <span>{post.date}</span>}
                      {post.date && post.readingTime && <span>·</span>}
                      {post.readingTime && <span>{post.readingTime} min de lectura</span>}
                    </div>
                    <span className="text-sm font-semibold text-brand-accent transition-colors group-hover:underline">
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
