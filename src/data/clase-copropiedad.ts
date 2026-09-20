/**
 * La clase gratuita «La Revolución de la Copropiedad Turística».
 *
 * ÚNICA FUENTE DE VERDAD de la landing de clase.tonyalvarado.com. Fecha,
 * enlaces, textos, recortes de prensa y preguntas viven acá y en ningún otro
 * lado: cambiar la fecha tiene que ser un renglón, no una cacería por seis
 * archivos.
 *
 * ── El vocabulario que NO puede aparecer ────────────────────────────────────
 * rendimiento · retorno · ROI · utilidad · ganancia · rentable · rentabilidad ·
 * inversión garantizada.
 *
 * No es estética: una landing con formulario de captura que promete un número
 * puede leerse como oferta pública de valores (Ley 7732, SUGEVAL). La regla
 * está escrita en el cerebro de Tony y aplica a TODA pieza de marketing, no
 * solo a contratos. Negar la promesa sí se puede —y hasta protege—; prometerla
 * no.
 *
 * Por eso esta página vende LA CLASE. Ni el precio por participación, ni los
 * escenarios, ni el porcentaje del modelo financiero aparecen acá.
 */

// ── Cuándo ──────────────────────────────────────────────────────────────────

/**
 * Miércoles 21 de octubre de 2026, 7:00 p.m. hora de Costa Rica.
 *
 * Se guarda como instante UTC y no como «fecha + hora local» a propósito: así
 * el contador marca lo mismo desde La Fortuna, Miami o Madrid. Costa Rica es
 * UTC-6 todo el año (no tiene horario de verano), así que 19:00 CR = 01:00 UTC
 * del día siguiente.
 *
 * Verificado: el 21 de octubre de 2026 cae miércoles.
 */
export const CLASE = {
  slug: 'copropiedad-21-oct',
  nombre: 'La Revolución de la Copropiedad Turística',
  instanteUtc: '2026-10-22T01:00:00Z',
  fechaTexto: 'Miércoles 21 de octubre',
  horaTexto: '7:00 p.m. Costa Rica',
  duracionTexto: '80 minutos',
  /** Dónde se transmite. Se le dice a la gente que el enlace llega por correo. */
  plataformaTexto: 'En vivo por internet. El enlace te llega por correo antes de la clase.',
} as const

/** La etiqueta con la que estos contactos se sacan del CRM de una. */
export const ETIQUETA_CRM = `clase:${CLASE.slug}`

// ── La oferta VIP ───────────────────────────────────────────────────────────

/**
 * El encuentro presencial del 8 de noviembre en La Fortuna.
 *
 * ⚠️ `enlacePago` vacío = el bloque NO se muestra en ningún lado. Publicar un
 * botón de compra que no lleva a una pasarela real es peor que no ponerlo.
 * Tony pasa el enlace de Hotmart o Whop, se pone acá, y con eso se prende solo
 * en los dos lugares donde vive: debajo del registro y en la página de gracias.
 */
export const VIP = {
  enlacePago: '',
  nombre: 'DESTINO OWNERS · Experiencia VIP La Fortuna',
  fechaTexto: 'Domingo 8 de noviembre de 2026',
  horarioTexto: 'de 9:00 a.m. a 1:00 p.m.',
  precioTexto: 'US$97 por persona',
  promesa:
    'Vení a ver con tus propios ojos cómo se desarrolla y se opera un destino turístico: recorrés Bike & Bed, conocés el área del proyecto HUMAYA y te sentás con Tony y el equipo.',
  incluye: [
    'Clase presencial «Cómo evaluar los números de un destino turístico».',
    'Recorrido guiado por Bike & Bed y visita al área del proyecto HUMAYA.',
    'Preguntas en grupo con Tony y el equipo sobre operación y desarrollo.',
    'La calculadora educativa y la grabación de la clase.',
    'Café o refrigerio y conexión con los demás asistentes.',
  ],
  noIncluye:
    'No incluye transporte a La Fortuna, hospedaje ni alimentación completa. La entrada es para una persona: quien te acompañe necesita su propio cupo. Comprar la entrada no te convierte en socio de nada.',
} as const

export const hayVip = (): boolean => VIP.enlacePago.trim().length > 0

// ── El grupo de la clase ────────────────────────────────────────

/**
 * El grupo de WhatsApp donde se coordina TODO lo de la clase.
 *
 * Enlace que pasó Tony el 20 de setiembre de 2026.
 *
 * ── Por qué el registro «no está completo» hasta entrar acá ────────────────
 * El lead SÍ queda guardado en el CRM apenas envía el formulario — eso no es
 * mentira ni se pierde. Lo que falta es el canal: el enlace para entrar a la
 * clase, los recordatorios y el material salen por el grupo. Quien no entra al
 * grupo se registró pero no se entera, y para efectos prácticos no llega.
 *
 * Por eso la página de gracias lo dice grande y con todas las letras, y el
 * correo de confirmación lo repite.
 */
export const GRUPO = {
  url: 'https://chat.whatsapp.com/IkZS3GSDgA79S97wIPpYZJ',
  nombre: 'el grupo de la clase',
} as const

// ── WhatsApp ──────────────────────────────────────────────────────

/**
 * El número al que puede escribir quien ya se registró.
 *
 * ⚠⚠ Vacío a propósito. En el sitio hay un número configurado
 * (`data/ride-and-reset.ts`), pero ese es el de **ventas de la rifa de RIDE &
 * RESET**: mandar ahí las preguntas de la clase es mandarlas a la persona
 * equivocada. No se inventa un número. Tony dice cuál va y se pone acá.
 *
 * Mientras esté vacío, el botón de WhatsApp no se dibuja.
 *
 * Y ojo con la regla que ya costó leads: **el WhatsApp va DESPUÉS de enviar el
 * formulario, nunca al lado del botón.** Por eso vive solo en `/clase/gracias`.
 */
export const WHATSAPP = {
  numero: '',
  mensaje: 'Hola Tony, me registré a la clase del 21 de octubre y tengo una consulta.',
} as const

export function enlaceWhatsApp(): string | null {
  const n = WHATSAPP.numero.replace(/\D/g, '')
  if (!n) return null
  return `https://wa.me/${n}?text=${encodeURIComponent(WHATSAPP.mensaje)}`
}

// ── El regalo de la ventana de salida ───────────────────────────────────────

/** La guía que ya existe y está publicada. No se promete nada que no exista. */
export const GUIA = {
  titulo: 'El Nuevo Negocio del Turismo',
  bajada: 'La Revolución de la Copropiedad Turística',
  url: '/el-nuevo-negocio-del-turismo.html',
} as const

// ── Qué se ve en la clase ───────────────────────────────────────────────────

export const LO_QUE_VAS_A_VER = [
  {
    numero: '01',
    titulo: 'Los doce meses, uno por uno',
    texto:
      'Cuánto entró cada mes en un hotel de cinco villas en La Fortuna, y por qué diciembre no se parece en nada a setiembre. Sin promedios que tapen la estacionalidad.',
  },
  {
    numero: '02',
    titulo: 'ADR y ocupación, sin humo',
    texto:
      'Las dos cifras con las que se mide un hotel de verdad, qué significan y cómo se leen para que nadie te las maquille.',
  },
  {
    numero: '03',
    titulo: 'A dónde se va la plata',
    texto:
      'Qué se lleva la operadora, qué se llevan las plataformas de reserva y qué queda después. La resta completa, en pantalla.',
  },
  {
    numero: '04',
    titulo: 'Las cinco preguntas',
    texto:
      'Las que yo hago antes de entrar en un proyecto turístico. Si quien te lo ofrece no las contesta, ya sabés qué hacer.',
  },
  {
    numero: '05',
    titulo: 'Qué es —y qué no es— la copropiedad',
    texto:
      'En qué se diferencia del tiempo compartido, qué responsabilidades quedan de tu lado y en qué casos no tiene ningún sentido.',
  },
] as const

// ── Para quién sí, para quién no ────────────────────────────────────────────

/**
 * La calificación es una técnica de cierre y, acá, además es el aviso legal.
 * Decir «no es para quien busca un número garantizado» descarta al que no
 * conviene Y niega la promesa de forma explícita, que es justo lo que protege.
 */
export const PARA_QUIEN = {
  si: [
    'Ya mirás el turismo de Costa Rica y no sabés por dónde se entra.',
    'Pensaste en poner un Airbnb, pero no querés vivir contestando huéspedes.',
    'Querés entender los números de un hotel antes de que alguien te los explique con una presentación bonita.',
    'Te interesa La Fortuna y el Arenal como zona.',
  ],
  no: [
    'Buscás que alguien te garantice un número. Acá no se garantiza ninguno, y si alguien te lo garantiza, desconfiá — incluido yo.',
    'Necesitás poder disponer de tu dinero el mes que viene.',
    'Querés que otro tome la decisión por vos.',
  ],
} as const

// ── Recortes de prensa ──────────────────────────────────────────────────────

/**
 * ⚠️ TODOS VERIFICADOS contra el artículo original el 19 de setiembre de 2026.
 * Ninguna cifra viene de un resumen de buscador: cada una se leyó en la fuente.
 * Si se agrega otro recorte, se verifica igual o no entra.
 *
 * Se cita el dato con su medio, su fecha y su enlace — no se copia el texto del
 * artículo.
 */
export const RECORTES = [
  {
    cifra: '1.195.271',
    titulo: 'turistas entraron por vía aérea entre enero y abril de 2026',
    detalle:
      'Un 10,5% más que el mismo período de 2025, según el Instituto Costarricense de Turismo.',
    medio: 'Infobae',
    fecha: '22 de mayo de 2026',
    fuente: 'ICT',
    url: 'https://www.infobae.com/costa-rica/2026/05/22/costa-rica-rompe-record-turistico-mas-de-11-millones-de-visitantes-llegaron-por-via-aerea-en-solo-cuatro-meses/',
  },
  {
    cifra: 'US$5.543,7 M',
    titulo: 'dejó el turismo en divisas durante 2025',
    detalle: 'Cifra del Banco Central de Costa Rica para la actividad turística del año.',
    medio: 'Infobae',
    fecha: '22 de mayo de 2026',
    fuente: 'BCCR',
    url: 'https://www.infobae.com/costa-rica/2026/05/22/costa-rica-rompe-record-turistico-mas-de-11-millones-de-visitantes-llegaron-por-via-aerea-en-solo-cuatro-meses/',
  },
  {
    cifra: '653.959',
    titulo: 'llegadas en el mejor primer bimestre desde la pandemia',
    detalle:
      'Enero y febrero de 2026 crecieron 10,4% interanual. Tadeo Morales, presidente de la Cámara de Turismo de Arenal, reportó el repunte en La Fortuna.',
    medio: 'San Carlos Digital',
    fecha: '17 de marzo de 2026',
    fuente: 'Cámara de Turismo de Arenal',
    url: 'https://sancarlosdigital.com/la-fortuna-registra-repunte-turistico-en-el-inicio-de-2026/',
  },
  {
    cifra: 'Arenal-Fortuna',
    titulo: 'ganó el premio «Destino Maduro Sostenible»',
    detalle:
      'En el Sustainable & Social Tourism Summit, en Ciudad de México. La zona suma más de 20.000 camas y más de 150 actividades turísticas.',
    medio: 'Infobae',
    fecha: 'setiembre de 2026',
    fuente: 'Sustainable & Social Tourism Summit',
    url: 'https://www.infobae.com/costa-rica/2026/09/02/arenal-fortuna-uno-de-los-principales-destinos-turisticos-de-costa-rica-gana-premio-iberoamericano-de-sostenibilidad/',
  },
  {
    cifra: 'Top 15',
    titulo: 'La Fortuna, entre los mejores destinos del mundo para viajar solo en 2026',
    detalle: 'Según el equipo de investigación de la plataforma FREETOUR.com.',
    medio: 'Infobae',
    fecha: '17 de abril de 2026',
    fuente: 'FREETOUR.com',
    url: 'https://www.infobae.com/costa-rica/2026/04/17/la-fortuna-en-costa-rica-entre-los-15-mejores-destinos-del-mundo-para-viajar-solo-en-2026/',
  },
] as const

// ── Preguntas ───────────────────────────────────────────────────────────────

export const PREGUNTAS = [
  {
    p: '¿Cuánto cuesta la clase?',
    r: 'Nada. Es gratis y es en vivo. Lo único que te pido es que llegués a la hora, porque los números se explican de corrido.',
  },
  {
    p: '¿Me van a vender algo?',
    r: 'Al final de la clase te voy a contar de HUMAYA, el proyecto de diez villas que abrimos en noviembre en La Fortuna. Te lo digo desde ahora para que no te agarre de sorpresa. La clase vale por sí sola aunque después no volvás a oír de mí.',
  },
  {
    p: '¿Tengo que tener dinero para participar en algo?',
    r: 'No. Esta clase es para aprender a leer los números de un hotel. Si después no hacés nada con eso, igual te llevás cómo se evalúa un proyecto turístico.',
  },
  {
    p: '¿Queda grabada?',
    r: 'Sí. Si te registrás y no podés conectarte, te llega la repetición. Pero en vivo se contestan preguntas, y esa parte no se repone.',
  },
  {
    p: '¿Los números son de verdad?',
    r: 'Son los de Bike & Bed, el hotel de cinco villas que operamos en La Fortuna desde setiembre de 2025: ingresos y noches vendidas mes por mes, reportados por la operación. No son estados auditados, y así se dice en la clase.',
  },
  {
    p: '¿Esto es una inversión garantizada?',
    r: 'No existe tal cosa, y quien te la ofrezca está mintiendo. En la clase vas a ver también qué puede salir mal, por qué un proyecto turístico puede no repartir nada y en qué casos esto no le conviene a nadie.',
  },
] as const

// ── Quién da la clase ───────────────────────────────────────────────────────

/**
 * Solo datos verificables. Nada de facturación ni de seguidores: esas cifras
 * están marcadas «según el cliente» en el CLAUDE.md del proyecto y esta es una
 * página pública.
 */
export const CREDENCIALES = [
  { dato: '22 años', detalle: 'construyendo empresas en Costa Rica' },
  { dato: '263 reseñas', detalle: 'de huéspedes en Airbnb · 4,95 de promedio' },
  { dato: '5 villas', detalle: 'operando hoy en La Fortuna' },
  { dato: '10 villas', detalle: 'más, abriendo en noviembre de 2026' },
] as const
