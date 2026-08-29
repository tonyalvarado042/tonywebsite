import type { LucideIcon } from 'lucide-react'
import { BookOpen, Calculator } from 'lucide-react'

/**
 * Los recursos gratis de /recursos.
 *
 * ── Cómo agregar uno nuevo ──────────────────────────────────────────────────
 * Se agrega un objeto a este arreglo y la página lo pinta sola. No hay que
 * tocar el JSX.
 *
 * ── Cómo publicar uno que está en 'proximamente' ────────────────────────────
 * 1. Cambiar `estado` a 'disponible'
 * 2. Poner el `href` (un archivo en /public, o un enlace externo)
 * 3. Ajustar el `cta` a la acción real ("Descargar el PDF", no "Ver más")
 *
 * El primero del arreglo sale destacado, más grande. Ese lugar es para el
 * recurso que se quiera empujar.
 */
export type EstadoRecurso = 'disponible' | 'proximamente'

export type Recurso = {
  slug: string
  titulo: string
  gancho: string
  descripcion: string
  formato: string
  /** Foto de la tarjeta. Es lo que hace que den ganas de tocarla. */
  imagen: string
  /** Texto alternativo de la foto. Obligatorio: es contenido, no decoración. */
  imagenAlt: string
  icono: LucideIcon
  estado: EstadoRecurso
  /** Sólo cuando estado === 'disponible'. Archivo en /public o enlace externo. */
  href?: string
  /** Si el href sale del sitio, abre en pestaña nueva. */
  externo?: boolean
  cta: string
  /** Acento visual de la tarjeta. */
  acento: 'morado' | 'dorado' | 'calido'
}

export const recursos: Recurso[] = [
  {
    slug: 'ebook-turismo',
    titulo: 'El nuevo negocio del turismo',
    gancho: 'La revolución de la copropiedad turística',
    descripcion:
      'El modelo del anfitrión individual llegó a su techo. Este ebook cambia la pregunta: no cómo administro un alojamiento, sino cómo se construye un activo que factura solo.',
    formato: 'Ebook · lectura en línea',
    imagen: '/img/nuevo-negocio-turismo/portada.jpg',
    imagenAlt: 'Villas al atardecer con el volcán Arenal de fondo, en La Fortuna de San Carlos',
    icono: BookOpen,
    estado: 'disponible',
    // La página completa del ebook, servida desde /public.
    href: '/el-nuevo-negocio-del-turismo.html',
    cta: 'Leerlo gratis',
    acento: 'morado',
  },
  {
    slug: 'calculadora-airbnb',
    titulo: 'Calculadora de ingresos para Airbnb',
    gancho: 'Cuánto factura de verdad una propiedad',
    descripcion:
      'Metés ocupación, tarifa por noche y costos, y ves lo que queda. La misma cuenta que hago yo antes de meterme en un proyecto.',
    // ⚠️ PENDIENTE: Tony dijo que ya la tiene armada. Falta que pase el enlace
    // o el archivo. Al llegar: poner el href y cambiar estado a 'disponible'.
    formato: 'Herramienta · gratis',
    imagen: '/img/nuevo-negocio-turismo/aerea-villas.jpg',
    imagenAlt: 'Vista aérea de las villas del proyecto',
    icono: Calculator,
    estado: 'proximamente',
    cta: 'Avisame cuando salga',
    acento: 'dorado',
  },
]

/** Clases de Tailwind por acento. Se resuelven acá y no en el JSX para que
 *  Tailwind no las purgue: tienen que existir como strings completos. */
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
