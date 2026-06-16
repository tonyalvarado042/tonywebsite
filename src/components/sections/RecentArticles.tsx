import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { recentPostsQuery, type SanityRecentPost } from '@/sanity/lib/queries'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function RecentArticles() {
  let posts: SanityRecentPost[] = []

  try {
    posts = await client.fetch(recentPostsQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — no renderizar
  }

  if (!Array.isArray(posts) || posts.length === 0) return null

  return (
    <section
      className="bg-brand-bg py-16"
      aria-labelledby="recent-articles-title"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
              Del blog
            </p>
            <h2
              id="recent-articles-title"
              className="text-3xl font-bold text-brand-text md:text-4xl"
            >
              Últimos artículos
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:underline"
          >
            Ver todos los artículos <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug}`}
              className="group flex h-full flex-col rounded-xl border border-brand-border bg-brand-card p-5 transition-colors hover:border-brand-green/50 md:p-6"
            >
              {post.category && (
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-green">
                  {post.category}
                </p>
              )}

              <h3 className="line-clamp-3 text-lg font-bold leading-snug text-brand-text transition-colors group-hover:text-brand-green">
                {post.title}
              </h3>

              {post.summary && (
                <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-brand-muted">
                  {post.summary}
                </p>
              )}

              <div className="mt-auto pt-5">
                <p className="text-xs text-brand-muted">
                  {formatDate(post.publishedAt)}
                  {post.readingTime != null ? ` · ${post.readingTime} min de lectura` : ''}
                </p>

                <p className="mt-3 text-sm font-semibold text-brand-green">
                  Leer artículo →
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
