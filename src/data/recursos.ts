import type { LucideIcon } from 'lucide-react'
import { BookOpen, Calculator, FileText, Gift, LayoutTemplate, Link2, Video } from 'lucide-react'
import type { RecursoCrm } from '@/lib/crm'

/**
 * Los recursos gratis.
 *
 * ⚠️ Ya NO se editan acá. Viven en el CRM, en `cta_recursos`, para que Tony
 * los agregue, edite y borre sin tocar código.
 *
 * Este archivo solo guarda lo que la base no puede guardar:
 *   · la traducción nombre de ícono → componente (la base no sabe de React)
 *   · las clases de Tailwind por acento
 *   · un respaldo por si el CRM no responde
 */

// ── Íconos ──────────────────────────────────────────────────────────────────
// Las claves son EXACTAMENTE los valores que permite el CHECK de la columna
// `icono`. Si llega uno desconocido se usa el de regalo: una tarjeta nunca
// debe desaparecer por un valor raro.
const ICONOS: Record<string, LucideIcon> = {
  libro: BookOpen,
  calculadora: Calculator,
  documento: FileText,
  video: Video,
  plantilla: LayoutTemplate,
  enlace: Link2,
  regalo: Gift,
}

export function iconoDe(nombre: string | null | undefined): LucideIcon {
  return ICONOS[nombre ?? ''] ?? Gift
}

// ── Acentos ─────────────────────────────────────────────────────────────────
// Se escriben completos a propósito: Tailwind purga lo que no encuentre como
// texto literal, así que estas clases NO se pueden armar concatenando.
export const acentoClases = {
  morado: {
    texto: 'text-brand-green',
    borde: 'border-brand-green/25',
    bordeHover: 'group-hover:border-brand-green/50',
    fondoSuave: 'bg-brand-green/10',
    anillo: 'ring-brand-green/25',
    resplandor: 'bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgba(139,92,246,0.16)_0%,transparent_70%)]',
    boton: 'bg-brand-green text-brand-bg shadow-[0_6px_24px_rgba(139,92,246,0.32)]',
  },
  dorado: {
    texto: 'text-brand-gold',
    borde: 'border-brand-gold/25',
    bordeHover: 'group-hover:border-brand-gold/50',
    fondoSuave: 'bg-brand-gold/10',
    anillo: 'ring-brand-gold/25',
    resplandor: 'bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgba(201,162,77,0.16)_0%,transparent_70%)]',
    boton: 'bg-brand-gold text-brand-bg shadow-[0_6px_24px_rgba(201,162,77,0.32)]',
  },
  calido: {
    texto: 'text-brand-warm',
    borde: 'border-brand-warm/25',
    bordeHover: 'group-hover:border-brand-warm/50',
    fondoSuave: 'bg-brand-warm/10',
    anillo: 'ring-brand-warm/25',
    resplandor: 'bg-[radial-gradient(ellipse_60%_70%_at_85%_50%,rgba(215,186,158,0.16)_0%,transparent_70%)]',
    boton: 'bg-brand-warm text-brand-bg shadow-[0_6px_24px_rgba(215,186,158,0.32)]',
  },
} as const

export function acentoDe(acento: string | null | undefined) {
  return acentoClases[acento as keyof typeof acentoClases] ?? acentoClases.morado
}

// ── Respaldo ────────────────────────────────────────────────────────────────
/**
 * Si el CRM no responde (llave mal puesta, Supabase caído), la página muestra
 * esto en lugar de quedar vacía. Es el mínimo para que el sitio no se vea roto.
 */
export const recursosRespaldo: RecursoCrm[] = [
  {
    id: 'respaldo-ebook',
    slug: 'ebook-turismo',
    titulo: 'El nuevo negocio del turismo',
    gancho: 'La revolución de la copropiedad turística',
    descripcion:
      'El modelo del anfitrión individual llegó a su techo. Este ebook cambia la pregunta: no cómo administro un alojamiento, sino cómo se construye un activo que factura solo.',
    formato: 'Ebook · lectura en línea',
    imagen_url: '/img/nuevo-negocio-turismo/portada.jpg',
    imagen_alt: 'Villas al atardecer con el volcán Arenal de fondo, en La Fortuna de San Carlos',
    destino_url: '/el-nuevo-negocio-del-turismo.html',
    tipo: 'pagina',
    estado: 'disponible',
    acento: 'morado',
    orden: 10,
    destacado: true,
    automatizacion_id: null,
    icono: 'libro',
  },
]
