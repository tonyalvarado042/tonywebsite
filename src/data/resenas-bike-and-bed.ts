/**
 * Reseñas reales de huéspedes de Bike & Bed.
 *
 * ── De dónde salen ──────────────────────────────────────────────────────────
 * COPIADAS TAL CUAL de los anuncios de Airbnb de Bike & Bed el 11 de setiembre
 * de 2026, verificando los cinco anuncios uno por uno. Este archivo es una
 * selección de seis de las que ya viven en el repo del sitio de Bike & Bed
 * (`bike-and-bed-arenal/src/datos/resenas.ts`). **Ni una palabra reescrita:**
 * retocar el testimonio de alguien es falsificarlo, aunque suene mejor.
 *
 * Varias vienen traducidas al español por el propio Airbnb — es la versión que
 * Airbnb muestra por defecto. Se eligieron las que se leen naturales.
 *
 * ── Por qué están en la landing de la clase ─────────────────────────────────
 * Hablan del HOTEL, no de la clase, y así se rotulan en la página. Sirven para
 * lo único que tienen que probar acá: que la operación cuyos números se van a
 * abrir en la clase existe de verdad y funciona.
 *
 * ⚠️ SIN FOTO DE PERFIL, a propósito. Airbnb tiene la foto de cada huésped,
 * pero bajarla y republicarla en otro sitio es distinto a citar lo que
 * escribieron: son personas reales que subieron su cara a Airbnb, no a
 * tonyalvarado.com. Se usa la inicial en un círculo.
 *
 * Total en Airbnb: 263 reseñas, 4,95 de promedio ponderado entre las cinco
 * villas. Las cinco tienen «Favorito entre huéspedes».
 */

export interface ResenaHuesped {
  nombre: string
  /** Ciudad, o los años que lleva en Airbnb cuando no publicó ciudad. */
  de: string
  bandera?: string
  /** Mes y año, como lo muestra Airbnb. */
  fecha: string
  texto: string
}

export const RESENAS_BNB: ResenaHuesped[] = [
  {
    nombre: 'Kendy De Los Angeles',
    bandera: '🇨🇷',
    de: 'San José, Costa Rica',
    fecha: 'octubre de 2025',
    texto:
      'Es un lugar muy cálido y tranquilo para compartir en pareja o en familia, el trato del anfitrión fue excelente, la casa estaba tal cual como en las fotos publicadas, muy limpio. Está a 5 minutos de la zona donde se pueden encontrar aguas termales, además tiene restaurantes cerca.',
  },
  {
    nombre: 'Christoph',
    bandera: '🇺🇸',
    de: 'Montverde, Florida',
    fecha: 'junio de 2026',
    texto:
      '¡Nos encantó nuestra estadía en este hermoso Airbnb! El espacio es hermoso, limpio y está muy bien cuidado. El jacuzzi en la parte trasera es el lugar PERFECTO para sentarse y disfrutar de la vista o del volcán Arenal que está justo frente a ti. La experiencia es fenomenal y nos sentimos muy bien atendidos.',
  },
  {
    nombre: 'John',
    bandera: '🇨🇦',
    de: 'Toronto, Canadá',
    fecha: 'julio de 2026',
    texto:
      'Todo estuvo perfecto. El lugar es muy agradable y seguro. El personal que tiene es extremadamente servicial y amable. Recomiendo encarecidamente este lugar y sin duda volveremos. La ubicación también está muy céntrica para todo.',
  },
  {
    nombre: 'Alyssa',
    bandera: '🇺🇸',
    de: 'Chatham, Pensilvania',
    fecha: 'octubre de 2025',
    texto:
      'Este Airbnb fue absolutamente perfecto para mi grupo de 5 amigos. La ubicación es exactamente donde quieres estar cuando estés en La Fortuna. Estábamos a 5 minutos de Baldi Hot Springs, a 10 minutos de la cascada de La Fortuna y a menos de 2 minutos de restaurantes, cafeterías y tiendas.',
  },
  {
    nombre: 'Julie',
    bandera: '🇺🇸',
    de: 'San Antonio, Texas',
    fecha: 'agosto de 2026',
    texto:
      '¡Bike and Bed fue un lugar excelente para nuestra estadía en La Fortuna! El equipo proporcionó una excelente comunicación y estuvo disponible de inmediato para responder cualquier pregunta. El espacio estaba muy limpio. A nuestro hijo de 12 años le encantó tener el loft de arriba para él solo. Disfrutamos de los destellos del volcán cuando las nubes se despejaron.',
  },
  {
    nombre: 'Carmina',
    bandera: '🇺🇸',
    de: 'Celina, Texas',
    fecha: 'julio de 2026',
    texto:
      'Excelente estadía con 2 niños de 7 y 10 años. Si bien se trata de un alojamiento de tipo «bike and bed», era muy adecuado para familias. Los niños y los adultos disfrutaron de la piscina, las vistas y el ambiente acogedor. ¡La atención al detalle hizo que nuestra estadía fuera fabulosa! El lugar está impecable.',
  },
]

/** Lo que se puede afirmar del conjunto, verificado el 11 de setiembre de 2026. */
export const RESUMEN_RESENAS = {
  total: 263,
  promedio: '4,95',
  villas: 5,
  distintivo: 'Favorito entre huéspedes',
} as const
