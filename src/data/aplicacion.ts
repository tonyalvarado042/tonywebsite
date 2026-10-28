/**
 * El formulario de aplicación a la copropiedad de HUMAYA.
 *
 * ── De dónde salió, y qué se corrigió ──────────────────────────────────────
 * El modelo fue el «CUESTIONARIO INVERSIONISTAS BIKE AND BED ARENAL 2025» que
 * pasó Tony. **No se copió.** Ese documento dice, textual:
 *
 *   · «generar ingresos pasivos»
 *   · «una inversión rentable y escalable»
 *   · «una inversión segura con retornos estables»
 *   · «priorizo la rentabilidad»
 *
 * Las cuatro están prohibidas por el vocabulario de la casa, y «segura» es la
 * más delicada: es prometer que no se pierde. Acá no aparece ninguna, y lo que
 * se dice del activo se dice como corresponde — **el activo factura**, nunca
 * «esto te deja».
 *
 * También traía los montos viejos: ofrecía «1 acción de $12.000» y rangos de
 * $12.000 a $50.000. Hoy esto es **solo HUMAYA, a $30.500 la acción**, y los
 * rangos de capital están anclados a ese precio en vez de a números redondos
 * que no corresponden a nada.
 *
 * ── Qué se sacó del original, y por qué ────────────────────────────────────
 * El bloque de «Impacto y Valores» (tres preguntas sobre sostenibilidad y
 * comunidad). Queda bonito y no califica a nadie: todo el mundo contesta que
 * le importa. Y «¿te gustaría recibir más información?» tampoco es una
 * pregunta — quien llena una aplicación ya contestó que sí.
 *
 * ── Qué se agregó, y por qué ───────────────────────────────────────────────
 * Tres que no estaban y que son las que de verdad separan:
 *
 *   · **Cuándo podría avanzar.** El mejor calificador que existe. Alguien con
 *     capital que «está explorando» y alguien con el mismo capital listo para
 *     decidir en un mes no son el mismo lead, y el formulario original los
 *     mezclaba.
 *   · **De dónde saldría el capital.** «Lo tengo disponible» y «sale de vender
 *     algo» son dos conversaciones distintas, y la segunda tiene un plazo que
 *     no depende de Tony.
 *   · **Qué necesitarías saber para decidir que sí.** Texto libre y corto. Es
 *     la pregunta que convierte la llamada de ventas en una respuesta en vez
 *     de un descubrimiento.
 */

export const APLICACION = {
  slug: 'humaya-2026',
  titulo: 'Aplicá para ser co-dueño de HUMAYA',
  entrada:
    'HUMAYA Wellness Hotel está en La Fortuna, frente al Arenal. La copropiedad ' +
    'no es para todo el mundo y por eso hay una conversación antes: esto toma ' +
    'dos minutos y sirve para saber si tiene sentido que hablemos.',
  cierre: 'Gracias. Revisamos cada aplicación a mano y te escribimos.',
} as const

/**
 * La cédula.
 *
 * ⚠️ Se pide porque Tony la necesita para armar el contrato de copropiedad, y
 * se guarda tal cual la escriben: **no se valida el formato**. Una cédula de
 * Costa Rica es 1-2345-6789, pero un panameño trae 8-123-456, un español un
 * NIE y un estadounidense llevaría pasaporte. Un formato tico rechazaría justo
 * a los de afuera, que son los que más cuesta conseguir.
 *
 * ⚠️ Es un dato sensible. **Nunca sale en la pantalla de la rifa ni en ningún
 * correo automático.**
 */
export const CEDULA = {
  etiqueta: 'Cédula o pasaporte',
  ayuda: 'Si vivís fuera de Costa Rica, poné tu documento de identidad o pasaporte.',
} as const

/** El precio de una acción, hoy. Si cambia, cambian los rangos de abajo. */
export const PRECIO_ACCION_TEXTO = 'US$30.500'

export const PREGUNTAS = [
  {
    id: 'capital',
    numero: 1,
    enunciado: '¿Con cuánto capital contás para este proyecto?',
    ayuda: `Una acción de HUMAYA es de ${PRECIO_ACCION_TEXTO}. Los rangos están armados sobre ese precio.`,
    opciones: [
      'Menos de US$30.500',
      'US$30.500 a US$61.000',
      'US$61.000 a US$122.000',
      'Más de US$122.000',
      'Prefiero conversarlo en la llamada',
    ],
  },
  {
    id: 'cuando_avanza',
    numero: 2,
    enunciado: '¿En cuánto tiempo estarías listo para avanzar?',
    opciones: [
      'Estoy listo ahora',
      'En 1 a 3 meses',
      'En 3 a 6 meses',
      'Todavía estoy explorando',
    ],
  },
  {
    id: 'origen_capital',
    numero: 3,
    enunciado: '¿De dónde saldría ese capital?',
    opciones: [
      'Lo tengo disponible',
      'De la venta de un activo',
      'Con financiamiento bancario',
      'Todavía lo estoy armando',
    ],
  },
  {
    id: 'experiencia',
    numero: 4,
    enunciado: '¿Has participado antes en bienes raíces, turismo o proyectos parecidos?',
    opciones: [
      'Sí, tengo experiencia',
      'Algo, pero poco',
      'No, sería la primera vez',
    ],
  },
] as const

/** La abierta. Corta a propósito: pedir un ensayo baja la tasa de respuesta. */
export const PREGUNTA_ABIERTA = {
  id: 'que_necesita',
  numero: 5,
  enunciado: '¿Qué necesitarías saber para decidir que sí?',
  ayuda: 'Lo que te falta entender, o lo que te haría dudar. Una línea alcanza.',
  ejemplo: 'Escribí acá lo que te gustaría resolver…',
  minimo: 5,
} as const

/**
 * El descargo. Va en la página, no escondido.
 *
 * Una aplicación que pregunta por capital disponible se parece mucho a la
 * antesala de una oferta — y legalmente conviene que quede escrito que no lo
 * es. El vocabulario de la casa protege, pero no sustituye al abogado de
 * mercado de valores.
 */
export const DESCARGO =
  'Esta aplicación no es una oferta de valores ni una recomendación de inversión, ' +
  'y no se promete ningún resultado económico. Sirve para saber si tiene sentido ' +
  'conversar. Tus datos los usamos solo para eso y no se los pasamos a nadie más.'
