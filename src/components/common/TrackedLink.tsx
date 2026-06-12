'use client'

import Link from 'next/link'
import { pushGTMEvent } from '@/lib/gtm'

type TrackedLinkProps = {
  href: string
  event: string
  params?: Record<string, unknown>
  className?: string
  target?: string
  rel?: string
  children: React.ReactNode
}

export default function TrackedLink({
  href,
  event,
  params = {},
  className,
  target,
  rel,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={() =>
        pushGTMEvent(event, {
          page_path: window.location.pathname,
          ...params,
        })
      }
    >
      {children}
    </Link>
  )
}
