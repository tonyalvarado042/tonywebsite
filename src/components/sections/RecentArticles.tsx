import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { recentPostsQuery, type SanityRecentPost } from '@/sanity/lib/queries'
import { urlForImage } from '@/sanity/lib/image'

function formatDate(iso: string, locale: 'es' | 'en') {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-US' : 'es-CR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function RecentArticles({ locale = 'es' }: { locale?: 'es' | 'en' }) {
  let posts: SanityRecentPost[] = []

  try {
    posts = await client.fetch(recentPostsQuery, {}, { next: { revalidate: 60 } })
  } catch {
    // Sanity unavailable — no renderizar
  }

  if (!Array.isArray(posts) || posts.length === 0) return null

  const t = locale === 'en' ? {
    sectionLabel: 'From the blog',
    h2: 'Latest articles',
    ctaAll: 'All articles · ES',
    readArticle: 'Read · ES →',
    minRead: 'min read',
  } : {
    sectionLabel: 'Del blog',
    h2: 'Últimos artículos',
    ctaAll: 'Ver todos los artículos',
    readArticle: 'Leer artículo →',
    minRead: 'min de lectura',
  }

  return (
    <section
      className="bg-brand-bg py-16"
      aria-labelledby="recent-articles-title"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-12">

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
              {t.sectionLabel}
            </p>
            <h2
              id="recent-articles-title"
              className="text-3xl font-bold text-brand-text md:text-4xl"
            >
              {t.h2}
            </h2>
          </div>
          <Link
            href="/blog"
            {...(locale === 'en' ? { hrefLang: 'es' } : {})}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green transition-colors hover:underline"
          >
            {t.ctaAll} <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const coverUrl = post.mainImage
              ? urlForImage(post.mainImage)?.width(600).height(338).url() ?? null
              : null
            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                {...(locale === 'en' ? { hrefLang: 'es' } : {})}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-card transition-colors hover:border-brand-green/50"
              >
                <div className="relative aspect-video overflow-hidden bg-brand-surface">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={post.mainImage?.alt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <span className="text-xs font-medium uppercase tracking-widest text-brand-muted/30">
                        tonyalvarado.com
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  {post.category && (
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-green">
                      {post.category}{locale === 'en' ? ' · ES' : ''}
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
                      {formatDate(post.publishedAt, locale)}
                      {post.readingTime != null ? ` · ${post.readingTime} ${t.minRead}` : ''}
                    </p>

                    <p className="mt-3 text-sm font-semibold text-brand-green">
                      {t.readArticle}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

      </div>
    </section>
  )
}
