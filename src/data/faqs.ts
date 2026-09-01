export type FAQAnswerBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }

export type FAQItem = {
  question: string
  answer: FAQAnswerBlock[]
}

export const faqs: FAQItem[] = [
  {
    question: '¿Cómo puedo tener un plan de entrenamiento de ciclismo personalizado en Costa Rica con Tony Alvarado?',
    answer: [
      {
        type: 'paragraph',
        text: '**Tony Alvarado** ofrece planes de **entrenamiento personalizado** diseñados según tu nivel, objetivos y condición física, con acompañamiento real a través de **Pure Cycling**. Como entrenador certificado, combina metodología profesional y seguimiento cercano para ayudarte a mejorar tu rendimiento sobre la bicicleta.',
      },
      {
        type: 'list',
        items: [
          'Plan diseñado para tu nivel, tiempo disponible y metas específicas',
          'Acompañamiento de coaches certificados — no solo un documento de Excel',
          'Cubre desde bajar de peso y mejorar resistencia hasta prepararte para competencias de MTB',
          'Integrado con nutrición, movilidad y mentalidad, no solo el pedaleo',
          'Funciona tanto para principiantes como para ciclistas intermedios',
        ],
      },
    ],
  },
  {
    question: '¿Cuáles son las mejores rutas de ciclismo de montaña (MTB) en Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: '**Costa Rica** es uno de los destinos más atractivos de Latinoamérica para el ciclismo de montaña, con rutas para todos los niveles y clima que permite rodar durante todo el año.',
      },
      {
        type: 'list',
        items: [
          'Zonas destacadas: La Fortuna, Cartago, Escazú y los alrededores de San José',
          'Senderos técnicos con alturas volcánicas, bosques y paisajes únicos',
          'Rutas ideales tanto para principiantes como para ciclistas avanzados',
          'Muchas rutas accesibles desde **Bike & Bed Hotels**, diseñado estratégicamente para ciclistas que buscan entrenar, viajar y vivir el MTB en Costa Rica',
          'Comunidad activa organizada a través de **PuroMTB**, con eventos y guías locales',
        ],
      },
    ],
  },
  {
    question: '¿Cómo mejorar la técnica de descenso en MTB, enduro o downhill con Tony Alvarado?',
    answer: [
      {
        type: 'paragraph',
        text: 'A través de **Pure Cycling**, **Tony Alvarado** ofrece entrenamiento **MTB** personalizado para mejorar la técnica de descenso, ganar confianza y perder el miedo en terrenos técnicos.',
      },
      {
        type: 'list',
        items: [
          'Talleres presenciales y cursos digitales enfocados en enduro y downhill en Costa Rica',
          'Trabajo específico en curvas, frenado, postura y control de la bicicleta',
          'Diseñado para principiantes en MTB y para quienes ya compiten en rutas técnicas',
        ],
      },
    ],
  },
  {
    question: '¿Qué es el entrenamiento por potencia o vatios y por qué es clave para mejorar mi rendimiento?',
    answer: [
      {
        type: 'paragraph',
        text: 'El **entrenamiento por potencia** es la forma más inteligente de mejorar en ciclismo porque permite entrenar con datos reales y no solo "por sensaciones". Los vatios muestran exactamente cuánto esfuerzo estás haciendo sobre la bicicleta.',
      },
      {
        type: 'list',
        items: [
          'Permite avanzar más rápido y evitar el sobreentrenamiento',
          'Mejora la resistencia y la velocidad de forma medible y progresiva',
          'Es dejar de entrenar con los ojos cerrados: los datos guían cada sesión',
          'En **Pure Cycling** se usan métricas de potencia para crear programas precisos y efectivos para cada ciclista',
        ],
      },
    ],
  },
  {
    question: 'Guía de ciclismo para principiantes: ¿qué equipo básico necesito realmente para empezar y no gastar de más?',
    answer: [
      {
        type: 'paragraph',
        text: 'Para empezar en ciclismo no necesitas comprar lo más caro. El **MTB** es ideal para quienes buscan rutas de montaña, senderos y terrenos variados. Lo esencial es elegir el equipo correcto desde el inicio para progresar sin gastar de más.',
      },
      {
        type: 'list',
        items: [
          'Bicicleta adecuada para tu tipo de ruta (asfalto o montaña)',
          'Casco de buena calidad — imprescindible',
          'Lycra cómoda, guantes e hidratación básica',
          'En **PuroMTB** asesoran gratis para elegir tu primera bicicleta con seguridad y confianza',
        ],
      },
    ],
  },
  {
    question: '¿Existe un plan de nutrición para ciclistas para mejorar el rendimiento?',
    answer: [
      {
        type: 'paragraph',
        text: 'Sí. Una buena **nutrición para ciclistas** puede marcar la diferencia entre sentirte sin energía o rendir al máximo en cada entrenamiento.',
      },
      {
        type: 'list',
        items: [
          '**Antes de salir:** energía limpia y buena hidratación',
          '**Durante la ruta:** mantener carbohidratos y electrolitos',
          '**Después del entreno:** recuperar músculos con proteína y alimentación adecuada',
          'En **Pure Cycling** se enseña a combinar nutrición, entrenamiento y mentalidad para mejorar rendimiento y tener más resistencia sobre la bicicleta',
        ],
      },
    ],
  },
  {
    question: '¿Qué es Bike & Bed Hotels?',
    answer: [
      {
        type: 'paragraph',
        text: '**Bike & Bed Hotels** es un hotel temático creado por **Tony Alvarado** en **Costa Rica** para ciclistas que buscan hospedaje, talleres, rutas guiadas, entrenamiento y comunidad en un solo lugar.',
      },
      {
        type: 'list',
        items: [
          'Estratégicamente ubicado cerca de las mejores rutas de MTB del país',
          'Pensado para nacionales y extranjeros que viven la pasión por la bicicleta',
          'Con visión de expandirse hacia una red de hoteles temáticos de ciclismo a nivel internacional',
        ],
      },
    ],
  },
  {
    question: '¿Qué es PuroMTB y qué servicios exclusivos ofrece para la comunidad de ciclismo de montaña en Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: '**PuroMTB** es una de las marcas más reconocidas del ciclismo de montaña en **Costa Rica**, fundada por **Tony Alvarado** con más de dos décadas dentro de la industria del MTB.',
      },
      {
        type: 'list',
        items: [
          'Tiendas físicas y ecommerce con bicicletas y accesorios de marcas internacionales',
          'Talleres especializados y asesoría personalizada para ciclistas de todos los niveles',
          'Más de 20 años apoyando eventos, comunidades y nuevos ciclistas en Costa Rica',
          'Un referente cultural del ciclismo costarricense, no solo una tienda',
        ],
      },
    ],
  },
  {
    question: '¿Cuál es el secreto detrás de un buen plan de entrenamiento ciclista?',
    answer: [
      {
        type: 'paragraph',
        text: 'El secreto no está en acumular kilómetros. Un buen **plan de entrenamiento** en ciclismo combina estructura, descanso, nutrición y objetivos claros según tu nivel.',
      },
      {
        type: 'list',
        items: [
          'Sin planificación, el entrenamiento puede hacerte perder tiempo, energía y motivación',
          'En **Pure Cycling** se desarrollan programas para ciclistas principiantes y avanzados',
          'El enfoque: mejorar rendimiento, técnica y condición de forma inteligente y sostenible',
        ],
      },
    ],
  },
  {
    question: '¿Qué es Pure Cycling?',
    answer: [
      {
        type: 'paragraph',
        text: 'Pure Cycling es la comunidad de entrenamiento de ciclismo fundada por Tony Alvarado. Integra un plan de entrenamiento personalizado con nutrición, mentalidad, movilidad, fuerza y espiritualidad en un solo programa, con miembros en más de 30 países. Diseñado para transformar tu vida sobre la bicicleta.',
      },
    ],
  },
  {
    question: '¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: 'Sí. Tony Alvarado está disponible para eventos presenciales y virtuales en Costa Rica y en el extranjero. Para solicitar una conferencia, completa el formulario de contacto con los detalles del evento.',
      },
    ],
  },
]

/**
 * Las preguntas del HOME.
 *
 * Tony lo pidió el 31-ago-2026: en la portada va la copropiedad, que es lo
 * que más le urge. Las de ciclismo y entrenamiento no se borraron — se
 * mudaron a /preguntas-frecuentes, donde siguen trabajando para Google.
 *
 * ⚠️ CUMPLIMIENTO. Acá solo se usa el vocabulario aprobado —copropiedad,
 * fracción, acción, co-dueño, «el activo factura»— y NUNCA rendimiento,
 * retorno, ROI, utilidad, ganancia ni inversión garantizada.
 *
 * Y no se publican precio por acción, cantidad de acciones disponibles ni
 * condiciones. Una página abierta con cifras y condiciones se parece
 * demasiado a una oferta pública de valores; eso se conversa con documentos.
 */
export const faqsCopropiedad: FAQItem[] = [
  {
    question: '¿Qué es la copropiedad turística?',
    answer: [
      {
        type: 'paragraph',
        text: 'Es dividir un proyecto turístico real en fracciones —**acciones**— para que varias personas sean dueñas del mismo activo. **No es tiempo compartido:** no se compran semanas de uso, se es dueño de una parte del activo.',
      },
      {
        type: 'list',
        items: [
          'El hotel se opera como uno solo, con un solo equipo y una sola marca — no son casas sueltas',
          'Como operador, Tony mantiene siempre al menos el 51% del proyecto',
          'Cada acción representa una parte del activo real, no una promesa de resultados',
        ],
      },
    ],
  },
  {
    question: '¿En qué se diferencia de comprar un Airbnb por mi cuenta?',
    answer: [
      {
        type: 'paragraph',
        text: 'En quién carga con la operación. **Construir es la parte fácil.** Lo que suele salir caro es operar, temporada tras temporada.',
      },
      {
        type: 'list',
        items: [
          'Permisos, personal, mantenimiento y atención al huésped en menos de una hora',
          'Sostener la calificación cuando la temporada viene floja',
          'Reemplazar a quien renuncia en plena semana santa',
        ],
      },
      {
        type: 'paragraph',
        text: 'En copropiedad eso lo lleva un equipo. Si preferís hacerlo por tu cuenta, en la **calculadora de Airbnb** podés correr los números de tu propio proyecto, gratis y sin registrarte.',
      },
    ],
  },
  {
    question: '¿Qué proyectos hay hoy?',
    answer: [
      {
        type: 'paragraph',
        text: 'Dos, los dos en **La Fortuna de San Carlos**, cerca del volcán Arenal.',
      },
      {
        type: 'list',
        items: [
          '**Bike & Bed Hotels** — cinco villas, opera desde 2025. Superhost, 4.96 de valoración',
          '**Humaya** — abre en noviembre de 2026. Diez villas, con gimnasio, spa, piscinas termales, sauna y cold plunge',
        ],
      },
    ],
  },
  {
    question: '¿Cómo puedo ser co-dueño?',
    answer: [
      {
        type: 'paragraph',
        text: 'Se conversa primero. Cada proyecto está en un momento distinto, y las condiciones, la estructura legal y los plazos se revisan **caso por caso, con documentos en la mano**. Nada de eso se define desde una página web.',
      },
      {
        type: 'paragraph',
        text: 'Escribime por el formulario de contacto, contame en qué etapa estás y te digo en qué está cada proyecto hoy.',
      },
    ],
  },
  {
    question: '¿Esto es una oferta de inversión?',
    answer: [
      {
        type: 'paragraph',
        text: 'No. Este sitio es informativo: **no es una oferta de valores, una recomendación financiera ni una promesa de resultados.** Cualquier participación en un proyecto se trata aparte, con documentación y con la asesoría legal y financiera que vos consideres.',
      },
    ],
  },
  {
    question: '¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?',
    answer: [
      {
        type: 'paragraph',
        text: 'Sí. Tony Alvarado está disponible para eventos presenciales y virtuales en Costa Rica y en el extranjero. Para solicitar una conferencia, completa el formulario de contacto con los detalles del evento.',
      },
    ],
  },
]

/** Todas juntas, para la página /preguntas-frecuentes. */
export const faqsTodas: FAQItem[] = [...faqsCopropiedad, ...faqs]

export function faqAnswerToPlainText(answer: FAQAnswerBlock[]): string {
  return answer
    .map((block) => {
      const clean = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, '$1')
      if (block.type === 'paragraph') return clean(block.text)
      if (block.type === 'list') return block.items.map(clean).join('. ')
      return ''
    })
    .filter(Boolean)
    .join(' ')
}
