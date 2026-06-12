declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function pushGTMEvent(event: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...params })
}
