// GROQ queries for Sanity blog posts

export const postsQuery = `
  *[_type == "post" && status == "published"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    mainImage,
    publishedAt,
    readingTime,
    body,
    ctaLabel,
    ctaHref,
    seoTitle,
    seoDescription,
    keywords
  }
`

export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug && status == "published"][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    mainImage,
    publishedAt,
    readingTime,
    body,
    ctaLabel,
    ctaHref,
    seoTitle,
    seoDescription,
    keywords
  }
`

export const postSlugsQuery = `
  *[_type == "post" && status == "published"] {
    "slug": slug.current
  }
`

export type SanityBlogPost = {
  _id: string
  title: string
  slug: string
  category: string | null
  summary: string | null
  mainImage: {
    _type: string
    asset: { _ref: string; _type: string }
    hotspot?: object
    alt?: string
  } | null
  publishedAt: string
  readingTime: number | null
  body: unknown[] | null
  ctaLabel: string | null
  ctaHref: string | null
  seoTitle: string | null
  seoDescription: string | null
  keywords: string[] | null
}
