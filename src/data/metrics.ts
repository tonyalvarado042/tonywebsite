export type MetricItem = {
  value: string
  label: string
  color: 'gold' | 'text' | 'green'
}

export const homeMetrics: MetricItem[] = [
  { value: '22+',  label: 'Años de trayectoria',   color: 'gold' },
  { value: '400K', label: 'Comunidad ciclista',     color: 'text' },
  { value: '+30',  label: 'Países — Pure Cycling',  color: 'text' },
  { value: '+250', label: 'Reseñas 5★ Bike & Bed',  color: 'gold' },
  { value: '3',    label: 'Empresas con propósito', color: 'text' },
]

export const homeMetricsEn: MetricItem[] = [
  { value: '22+',        label: 'Years of experience',      color: 'gold' },
  { value: '2004',       label: 'PuroMTB founded',          color: 'text' },
  { value: '30+',        label: 'Countries — Pure Cycling', color: 'text' },
  { value: '3',          label: 'Purpose-driven companies', color: 'gold' },
  { value: 'Costa Rica', label: 'Home of the ecosystem',    color: 'text' },
]
