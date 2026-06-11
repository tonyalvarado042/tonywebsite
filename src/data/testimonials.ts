export type TestimonialItem = {
  name?: string | null
  role?: string | null
  country?: string | null
  quote?: string | null
  videoUrl?: string | null
  posterUrl?: string | null
  page: string
  order: number
  featured?: boolean
}

export const pureCyclingTestimonials: TestimonialItem[] = [
  {
    videoUrl: '/videos/testimonials/pure-cycling/testimonio-pure-cycling-01.mp4',
    posterUrl: '/images/testimonials/pure-cycling/testimonio-pure-cycling-01.PNG',
    page: 'pure-cycling',
    order: 1,
  },
  {
    videoUrl: '/videos/testimonials/pure-cycling/testimonio-pure-cycling-02.mp4',
    posterUrl: '/images/testimonials/pure-cycling/testimonio-pure-cycling-02.PNG',
    page: 'pure-cycling',
    order: 2,
  },
  {
    videoUrl: '/videos/testimonials/pure-cycling/testimonio-pure-cycling-03.mp4',
    posterUrl: '/images/testimonials/pure-cycling/testimonio-pure-cycling-03.PNG',
    page: 'pure-cycling',
    order: 3,
  },
]
