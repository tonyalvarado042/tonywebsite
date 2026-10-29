/**
 * La encuesta que se manda a quienes ya se registraron a la clase.
 *
 * ── Para qué existe ────────────────────────────────────────────────────────
 * Tony, 26 de octubre de 2026: «quiero conocer sus intereses y, sobre todo,
 * saber qué les gustaría aprender para adaptar parte de la clase a sus
 * preguntas reales».
 *
 * **La pregunta 4 es la razón de ser de todo esto.** Las otras cuatro son de
 * opción única y sirven para segmentar; esa es texto libre y es la que se lee
 * antes de armar la clase. El sorteo está para que la gente llegue hasta esa
 * pregunta, no al revés.
 *
 * ── Qué vive acá y qué no ──────────────────────────────────────────────────
 * Acá va el TEXTO: las preguntas, las opciones, el copy del sorteo. La fecha y
 * la hora de la clase salen de `leerClase()`, no se repiten acá — si se
 * escribieran dos veces, el día que Tony mueva la clase una de las dos queda
 * vieja y nadie lo nota.
 */

export const ENCUESTA = {
  /** Identifica a qué lanzamiento pertenecen las respuestas. */
  slug: 'clase-28-oct',
  titulo: 'Contame qué querés que cubra en la clase',
  /**
   * ⚠️ Sin número de comunidad escrito a mano.
   *
   * El borrador de Tony decía «casi 500» arriba y «los primeros 200» abajo, y
   * el dato real del CRM era otro. Un número inventado en la cabecera de una
   * encuesta es justo lo que hace dudar del resto. Si se quiere poner una
   * cifra, que salga de la base.
   */
  entrada:
    'Estoy armando la clase ahora mismo y quiero que te sirva de verdad. ' +
    'Son 5 preguntas y toma menos de dos minutos.',
  cierre: 'Gracias por tomarte los dos minutos. Nos vemos en la clase.',
} as const

export const PREGUNTAS = [
  {
    id: 'perfil',
    numero: 1,
    enunciado: '¿Cuál de estas opciones te describe mejor?',
    opciones: [
      'Empresario o dueño de negocio',
      'Profesional independiente',
      'Ejecutivo o colaborador de empresa',
      'Inversionista',
      'Emprendedor o interesado en emprender',
    ],
  },
  {
    id: 'motivo',
    numero: 2,
    enunciado: '¿Qué te motivó a inscribirte en esta clase?',
    opciones: [
      'Aprender cómo funciona la copropiedad turística',
      'Conocer oportunidades de inversión en hoteles',
      'Aprender a generar ingresos con Airbnb',
      'Diversificar mis inversiones y construir patrimonio',
      'Conocer proyectos turísticos reales en Costa Rica',
    ],
  },
  {
    id: 'etapa',
    numero: 3,
    enunciado: '¿En qué etapa estás actualmente?',
    opciones: [
      'Ya tengo inversiones inmobiliarias',
      'Tengo capital y estoy evaluando dónde invertir',
      'Estoy ahorrando para mi primera inversión',
      'Por ahora quiero aprender y conocer oportunidades',
    ],
  },
  {
    id: 'despues',
    numero: 5,
    enunciado: '¿Qué te gustaría hacer después de la clase?',
    opciones: [
      'Conocer oportunidades concretas de copropiedad turística',
      'Recibir información de proyectos como HUMAYA',
      'Aprender a desarrollar mi propio Airbnb u hotel',
      'Seguir aprendiendo antes de tomar decisiones',
    ],
  },
] as const

/** La pregunta 4 va aparte porque es de otro tipo y tiene otro peso. */
export const PREGUNTA_ABIERTA = {
  id: 'pregunta',
  numero: 4,
  enunciado: 'Si pudieras hacerle UNA pregunta a Tony durante la clase, ¿cuál sería?',
  ayuda:
    'Lo que te gustaría entender o resolver sobre Airbnb, hoteles, copropiedad ' +
    'turística o cómo se arma un proyecto así.',
  ejemplo: 'Escribí acá tu pregunta…',
  minimo: 10,
} as const

/**
 * El sorteo.
 *
 * ⚠️ **El premio se redime cuando HUMAYA abra**, y el texto lo dice. Prometer
 * una noche en un hotel que todavía está en obra sería prometer algo que no se
 * puede cumplir en la fecha que la gente va a suponer.
 *
 * ⚠️ «Valor de referencia» y no «vale»: es lo que Tony escribió y es lo
 * correcto: un precio de lista no es una promesa de precio.
 */
export const SORTEO = {
  premio: 'Una noche en HUMAYA Wellness Hotel, en La Fortuna',
  /**
   * La misma cosa, escrita para ir DENTRO de una frase.
   *
   * Existe porque la primera versión metía `premio` en medio de una oración y
   * le pasaba un `.toLowerCase()` para que no chocara la mayúscula inicial —
   * y eso convertía HUMAYA en «humaya». Bajar a minúsculas un texto que
   * contiene un nombre propio siempre termina así.
   */
  premioEnFrase: 'una noche en HUMAYA Wellness Hotel',
  valorTexto: 'Valor de referencia superior a US$400 la noche',
  cuando: 'Se rifa en vivo durante la clase, entre quienes hayan respondido y estén conectados.',
  /**
   * ⚠️ **Estas son las reglas que Tony escribió, publicadas tal cual.**
   *
   * 29 de octubre de 2026. Tony las pasó para la pantalla de la rifa y pidió:
   * *«Publicá así como te lo envié»*. Se publican palabra por palabra, sin
   * reescribir — es un texto de condiciones y cambiarle la redacción le
   * cambia el alcance.
   *
   * ── Lo que hay que saber, y no se puede tapar ────────────────────────────
   * **Estas reglas son MÁS estrictas que las que estaban publicadas antes**, y
   * veinte personas ya habían respondido leyendo las viejas. Lo que se agregó:
   *
   *   · una fecha de inicio (25 de noviembre) que antes no existía;
   *   · que el premio es para dos personas (antes no se decía);
   *   · que no se puede reprogramar;
   *   · que se pierde si no se usa.
   *
   * Publicarlas acá es lo correcto —mejor un solo texto público que dos que se
   * contradicen— pero **no borra que cambiaron después de que la gente
   * entrara**. Si alguno de esos veinte reclama por una condición que no
   * estaba cuando respondió, lo justo es atenderlo.
   */
  bases: [
    'Participan quienes completen la encuesta y asistan a la clase en vivo.',
    'El premio incluye una noche para la persona ganadora y un acompañante, máximo dos personas.',
    'Válido únicamente para una estadía entre el 25 de noviembre y el 6 de diciembre de 2026, previa reserva y sujeto a disponibilidad.',
    'Una vez confirmada la fecha, no se permiten cambios ni reprogramaciones.',
    'El premio es personal e intransferible. No se permite cederlo, venderlo, modificarlo ni agregar personas.',
    'No es canjeable por dinero, otros servicios ni estadías fuera del período indicado.',
    'Si la persona ganadora no utiliza el premio dentro del plazo o no se presenta en la fecha reservada, lo pierde sin compensación.',
  ],
  /** El cierre, también literal. Va debajo de la lista. */
  cierreBases: 'Participar implica aceptar estas condiciones.',
} as const
