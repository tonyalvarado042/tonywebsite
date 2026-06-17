// Single source of truth for contact form interest options.
// Values match VALID_INTERES in /api/contact/route.ts — do not change them.
// Labels are consumed by ContactFormEmbed (client) and /en/contact (server).

export const interestOptions = [
  { value: 'pure-cycling',       es: 'Pure Cycling',           en: 'Pure Cycling' },
  { value: 'puromtb',            es: 'PuroMTB',                en: 'PuroMTB' },
  { value: 'bike-bed',           es: 'Bike & Bed Hotels',      en: 'Bike & Bed Hotels' },
  { value: 'bike-bed-inversion', es: 'Inversión Bike & Bed',   en: 'Investment in Bike & Bed' },
  { value: 'conferencias',       es: 'Conferencias',           en: 'Speaking / Conference' },
  { value: 'libros',             es: 'Libros',                 en: 'Books' },
  { value: 'contacto-general',   es: 'Contacto general',       en: 'General Inquiry' },
  { value: 'otro',               es: 'Otro',                   en: 'Other' },
] as const

export type InterestValue = typeof interestOptions[number]['value']

export function isValidInterest(v: string): v is InterestValue {
  return (interestOptions as readonly { value: string }[]).some((o) => o.value === v)
}
