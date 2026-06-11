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
