import { redirect } from 'next/navigation'

// Redirects to the hosted Sanity Studio.
// Tony can manage blog content at: https://tony-alvarado-cms.sanity.studio/
export default function StudioPage() {
  redirect('https://tony-alvarado-cms.sanity.studio/')
}
