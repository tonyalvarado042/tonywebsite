/**
 * RIDE & RESET — todos los datos duros de la rifa, en un solo lugar.
 *
 * ⚠️ ESTE ES EL ÚNICO ARCHIVO QUE HAY QUE EDITAR para cambiar fechas, cierre,
 * número de WhatsApp o las bases. Si un dato aparece en la página, sale de acá.
 *
 * Lo marcado con PENDIENTE lo tiene que llenar Tony. La página **no se publica**
 * con un PENDIENTE visible: `pendientesDeLaRifa()` los lista y la página los
 * muestra como aviso en vez de inventarse el dato.
 *
 * Regla de Tony: nunca inventar fechas, precios ni cifras.
 */

/** Marca un dato que falta. Se ve feo a propósito: es para que no se escape. */
export const PENDIENTE = '[PENDIENTE]'

export const RIFA = {
  /** Identificador de esta edición. Va en las etiquetas del CRM y en la tabla. */
  slug: 'ride-reset-oct-2026',

  nombre: 'RIDE & RESET',
  lugar: 'La Fortuna, Costa Rica',

  /** Cuántos cupos se regalan. Son 2 a propósito: nadie va solo. */
  cupos: 2,

  // ── Las fechas de la experiencia ──────────────────────────────────────────
  // Confirmadas por Tony el 4 de septiembre de 2026: «del 5 al 8 de octubre».
  fechas: {
    inicio: '2026-10-05',
    fin: '2026-10-08',
    /** Cómo se lee en la página. */
    texto: 'Del 5 al 8 de octubre de 2026',
    dias: 4,
    noches: 3,
  },

  // ── El cierre de la rifa ──────────────────────────────────────────────────
  // Confirmado por Tony el 4 de septiembre de 2026: «cierra el 20 de set».
  // La HORA la puso el sitio: fin del día, que es la lectura natural de «el 20».
  // Si Tony quiere otra hora, se cambia acá y en `texto`, nada más.
  cierre: {
    /** ISO con hora de Costa Rica (UTC-6). */
    fechaHora: '2026-09-20T23:59:00-06:00',
    /** Cómo se lee. */
    texto: 'Domingo 20 de setiembre, 11:59 p.m.',
  },

  /**
   * Cómo se elige a quien gana y cuándo se anuncia. Va en las bases.
   *
   * Confirmado por Tony: **el sorteo se hace en vivo por Facebook Live.**
   * La fecha y hora exactas del live todavía no las dio; por eso acá dice
   * «después del cierre» y no una fecha inventada.
   */
  comoSeElige:
    'El sorteo se hace en vivo por Facebook Live, entre todas las participaciones ' +
    'válidas recibidas antes del cierre.',
  cuandoSeAnuncia:
    'Los dos nombres se anuncian en ese mismo Facebook Live, después del cierre, ' +
    'y quedan publicados en las redes de Bike & Bed.',

  // ── WhatsApp ──────────────────────────────────────────────────────────────
  // El número al que escribe la gente, en formato internacional sin signos.
  // Confirmado por Tony el 4 de septiembre de 2026: +506 8343 4260.
  whatsapp: {
    numero: '50683434260',
    /**
     * Va precargado en el chat. **Lo manda la persona, no nosotros** — por eso
     * no necesita plantilla aprobada de Meta ni cuesta conversación.
     *
     * 💡 Y por eso mismo la respuesta automática SÍ se puede: si el número está
     * en **WhatsApp Business**, su «mensaje de bienvenida» contesta solo al
     * primer mensaje de cada persona, con el precio y los detalles. Eso se
     * configura en el teléfono, no acá. Ver el LÉEME de la rifa.
     */
    mensajeRifa:
      'Hola, me apunté a la rifa de RIDE & RESET y QUIERO MÁS INFORMACIÓN de la ' +
      'experiencia: precio especial, qué incluye y cómo reservar.',
    mensajeReserva:
      'Hola, quiero ser parte de RIDE & RESET del 5 al 8 de octubre y QUIERO MÁS ' +
      'INFORMACIÓN: precio especial, qué incluye y cómo reservar.',
  },
}

/**
 * Adónde responde la gente cuando quiere la información completa.
 *
 * Decisión de Tony (4 de septiembre de 2026): el correo de confirmación cuenta
 * la experiencia, dice que **hay un precio especial**, y quien quiera el detalle
 * responde a `ventas@puromtb.com`.
 *
 * ⚠️ El correo NO sale desde esa dirección: sale desde `tony@tonyalvarado.com`,
 * que es el dominio verificado en Resend. `ventas@puromtb.com` va como
 * **reply-to**, que no necesita verificación de dominio. Si algún día se quiere
 * que salga *desde* puromtb.com, hay que verificar ese dominio en Resend.
 */
export const VENTAS = {
  correo: 'ventas@puromtb.com',
}

/** La campaña de esta rifa en el CRM. Se busca por acá, no por su UUID. */
export const CAMPANA_ID_EXTERNO = 'rifa:ride-reset-oct-2026'

/**
 * El precio NO se publica.
 *
 * Decisión de Tony, 4 de septiembre de 2026: en vez del monto, la página dice
 * «escribinos si querés ser parte». Y le dio peso: **no es una notita al pie**,
 * es un bloque propio con el mismo tamaño que la rifa.
 */
export const RESERVA = {
  publicaPrecio: false,
  titulo: '¿No querés dejarlo a la suerte?',
  bajada:
    'Los cupos de la rifa son dos. La experiencia tiene más. Si querés ser parte ' +
    'de RIDE & RESET sin esperar el sorteo, escribinos y te pasamos toda la ' +
    'información y las condiciones para esta edición.',
  llamado: 'Quiero ser parte',
}

/**
 * Quiénes acompañan.
 *
 * Lo de Alex sale de su propio sitio (fullpoweralex.com), no de una suposición.
 * Lo de Tony sale del CLAUDE.md de este proyecto.
 *
 * ⚠️ SIN FOTOS A PROPÓSITO. En la sesión del Arenal salen dos ciclistas que no
 * son Alex ni Tony: ponerles el nombre encima sería hacer pasar a un desconocido
 * por otra persona. Las tarjetas son tipográficas hasta que Tony pase una foto
 * real de cada uno. Cuando lleguen, se agrega `foto` y `encuadre` acá.
 */
export const ANFITRIONES = [
  {
    nombre: 'Alex Quesada',
    rol: 'Acondicionamiento físico y nutrición',
    marca: 'Full Power',
    sitio: 'https://fullpoweralex.com',
    bio:
      'Formado en ejercicio físico, nutrición y psicología, y especializado en ' +
      'psiconeuroinmunología. Compitió en motos y bicicletas desde los 12 hasta ' +
      'los 20 años, y esa base es la que hoy aplica con deportistas de élite.',
    detalle:
      'Su enfoque es biopsicosocial: enseña a moverse, alimentarse, descansar y ' +
      'manejar el estrés para rendir más sin hacer más. Ya organiza retiros en ' +
      'Ibiza, Girona y la Costa Brava, y creó Gym & Ride, que combina gimnasio, ' +
      'rutas en bicicleta y nutrición.',
  },
  {
    nombre: 'Tony Alvarado',
    rol: 'Ciclismo, comunidad y hábitos',
    marca: 'PuroMTB · Bike & Bed',
    sitio: 'https://www.tonyalvarado.com',
    bio:
      'Empresario y ciclista costarricense. Construyó un grupo de empresas ' +
      'alrededor de la bicicleta y fundó Bike & Bed, el primer hotel temático de ' +
      'ciclismo del país.',
    detalle:
      'Entrenador certificado de ciclismo por la Federación Costarricense de ' +
      'Ciclismo y coach certificado por John Maxwell Leadership. Autor de tres libros.',
  },
]

/** Lo que incluye la experiencia. Es el copy de Tony, tal cual lo escribió. */
export const EXPERIENCIA = [
  { icono: 'bici',       titulo: 'Rides épicos alrededor del Volcán Arenal' },
  { icono: 'fuerza',     titulo: 'Entrenamiento, fuerza y movilidad' },
  { icono: 'termales',   titulo: 'Termales y protocolos de recovery' },
  { icono: 'frio',       titulo: 'Recuperación y bienestar' },
  { icono: 'nutricion',  titulo: 'Plan de nutrición para sentirte y rendir mejor' },
  { icono: 'sueno',      titulo: 'Sueño, descanso y hábitos de alto rendimiento' },
  { icono: 'naturaleza', titulo: 'Naturaleza, comunidad y experiencias únicas' },
  { icono: 'equipo',     titulo: 'Sesiones y acompañamiento con Alex Quesada y Tony Alvarado' },
]

/** Los tres pasos para participar. */
export const PASOS = [
  {
    numero: 1,
    titulo: 'Etiquetá a tu persona',
    detalle:
      'En el post de Instagram, etiquetá a esa persona con quien vivirías RIDE & RESET.',
  },
  {
    numero: 2,
    titulo: 'Compartí el post en tus historias',
    detalle: 'Subilo a tus historias para que más gente se entere.',
  },
  {
    numero: 3,
    titulo: 'Completá este formulario',
    detalle: 'Es el paso que te deja adentro. Sin esto, los dos anteriores no cuentan.',
  },
]

/**
 * Las fotos. Todas salen de la sesión del Arenal que pasó Tony, ya optimizadas
 * (de 76,9 MB a 2,13 MB en total).
 *
 * ⚠️ `encuadre` es el `object-position` calculado para CADA foto. Una vertical
 * dentro de una caja apaisada pierde más de la mitad del alto: si se hereda el
 * encuadre de otra foto, se publica una foto decapitada. Al cambiar una foto hay
 * que recalcularlo y **medirlo en el navegador**.
 */
export const FOTOS = {
  portada: {
    src: '/images/ride-and-reset/portada-pareja-volcan.jpg',
    ancho: 2000, alto: 1333, encuadre: '50% 45%',
    alt: 'Dos ciclistas descansando frente al Volcán Arenal, en La Fortuna de San Carlos',
  },
  salida: {
    src: '/images/ride-and-reset/salida-portabicis-arenal.jpg',
    ancho: 2000, alto: 1333, encuadre: '50% 50%',
    alt: 'Dos ciclistas bajando las bicicletas del portabicicletas con el Volcán Arenal de fondo',
  },
  pareja: {
    src: '/images/ride-and-reset/pareja-retrato-arenal.jpg',
    ancho: 1200, alto: 1800, encuadre: '50% 30%',
    alt: 'Pareja de ciclistas apoyada en su bicicleta frente al Volcán Arenal',
  },
  potrero: {
    src: '/images/ride-and-reset/pareja-potrero-arenal.jpg',
    ancho: 1200, alto: 1800, encuadre: '50% 35%',
    alt: 'Dos ciclistas conversando en un potrero con el Volcán Arenal detrás',
  },
  rodando: {
    src: '/images/ride-and-reset/rodando-carretera-bosque.jpg',
    ancho: 1200, alto: 1800, encuadre: '50% 45%',
    alt: 'Dos ciclistas rodando en carretera rodeados de bosque en La Fortuna',
  },
  ciclista: {
    src: '/images/ride-and-reset/ciclista-solo-arenal.jpg',
    ancho: 1200, alto: 1800, encuadre: '50% 30%',
    alt: 'Ciclista con su bicicleta de gravel frente al Volcán Arenal',
  },
  bicis: {
    src: '/images/ride-and-reset/bicis-portabicis-arenal.jpg',
    ancho: 1200, alto: 1800, encuadre: '50% 40%',
    alt: 'Bicicletas de gravel en el portabicicletas con el Volcán Arenal de fondo',
  },
}

/**
 * El logo de Bike & Bed.
 *
 * ⚠️ El original que pasó Tony es blanco sobre negro SÓLIDO, sin transparencia.
 * Encima de una foto se veía como una caja negra — se vio en el navegador, no
 * se supuso. El que está en `public/` es una versión con alfa: como el logo es
 * monocromo, la luminancia se usó de canal alfa (blanco = opaco, negro =
 * transparente), así que los bordes suavizados se conservan y no queda dentado.
 *
 * Si algún día llega un logo nuevo, hay que repetir ese paso: el original
 * **no sirve directo sobre foto**.
 */
export const LOGO_BNB = {
  src: '/images/ride-and-reset/bike-and-bed-blanco.png',
  ancho: 2000,
  alto: 1801,
  alt: 'Bike & Bed',
}

/**
 * ¿Falta algún dato duro?
 *
 * Recorre `RIFA` entero: si mañana se agrega un campo nuevo con PENDIENTE, este
 * chequeo lo agarra solo. Se usa para no publicar la página a medias.
 */
export function pendientesDeLaRifa(): string[] {
  const faltan: string[] = []
  const recorrer = (valor: unknown, ruta: string) => {
    if (typeof valor === 'string') {
      if (valor === PENDIENTE) faltan.push(ruta)
    } else if (valor && typeof valor === 'object') {
      for (const [k, v] of Object.entries(valor)) {
        recorrer(v, ruta ? `${ruta}.${k}` : k)
      }
    }
  }
  recorrer(RIFA, '')
  return faltan
}

export function hayPendientes(): boolean {
  return pendientesDeLaRifa().length > 0
}

/** El enlace de WhatsApp ya armado. Devuelve null si todavía no hay número. */
export function enlaceWhatsApp(mensaje: string): string | null {
  const n = RIFA.whatsapp.numero
  if (!n || n === PENDIENTE) return null
  return `https://wa.me/${n.replace(/\D/g, '')}?text=${encodeURIComponent(mensaje)}`
}
