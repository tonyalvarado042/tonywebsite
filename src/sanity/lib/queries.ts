// GROQ queries for Sanity content

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const testimonialsByPageQuery = `
  *[_type == "testimonial" && page == $page && isActive == true] | order(order asc) {
    name,
    role,
    country,
    quote,
    videoUrl,
    posterUrl,
    featured,
    page,
    order,
    posterImage {
      alt,
      asset
    }
  }
`

export type SanityTestimonial = {
  name: string | null
  role: string | null
  country: string | null
  quote: string | null
  videoUrl: string | null
  posterUrl: string | null
  featured: boolean
  page: string
  order: number
  posterImage: {
    alt?: string
    asset: { _ref: string; _type: string }
  } | null
}

// ─── Metrics ──────────────────────────────────────────────────────────────────

export const homeMetricsQuery = `
  *[_type == "metric" && page == "home" && isActive == true] | order(order asc) {
    value,
    label,
    color
  }
`

export type SanityMetric = {
  value: string
  label: string
  color: string
}

// ─── Blog posts ───────────────────────────────────────────────────────────────

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

export const recentPostsQuery = `
  *[
    _type == "post" &&
    status == "published" &&
    defined(slug.current) &&
    defined(publishedAt)
  ] | order(publishedAt desc) [0..2] {
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    publishedAt,
    readingTime
  }
`

export type SanityRecentPost = {
  _id: string
  title: string
  slug: string
  category: string | null
  summary: string | null
  publishedAt: string
  readingTime: number | null
}

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
