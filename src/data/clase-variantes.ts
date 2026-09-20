/**
 * Las variantes de la landing, para probar ángulos en Meta.
 *
 * **Una sola página, cinco textos.** Lo único que cambia es la entrada — el
 * ante-título, el titular, la bajada y el bloque del problema— porque es lo
 * único que decide si la persona se queda. Los recortes de prensa, las reseñas,
 * el contador, el formulario y las preguntas son los mismos en las cinco: si
 * cambiaran también, no se sabría cuál de los dos cambios movió la aguja, y el
 * A/B dejaría de medir algo.
 *
 * ── Dónde vive cada una ─────────────────────────────────────────────────────
 * `clase.tonyalvarado.com/` es la A. Las otras cuelgan de su slug:
 * `clase.tonyalvarado.com/revolucion`, `/comunidad`, `/airbnb`, `/record`.
 * Las reescrituras se generan **desde este arreglo** en `next.config.ts`, así
 * que agregar una variante es agregar un objeto acá y nada más.
 *
 * ── Cómo se mide ────────────────────────────────────────────────────────────
 * Cada registro cae al CRM con la etiqueta `variante:<slug>` además de la de la
 * clase. **Sin eso el A/B no se puede medir**: Meta dice quién hizo clic, pero
 * quién se registró de verdad solo lo sabe el CRM.
 *
 * ── El vocabulario ──────────────────────────────────────────────────────────
 * Las cinco respetan lo mismo: cero `rendimiento / retorno / ROI / utilidad /
 * ganancia / rentabilidad`. Se puede hablar de ser co-dueño y de participar;
 * no se puede prometer un número.
 */

export type Variante = {
  /** El slug de la URL. Es también la etiqueta en el CRM: `variante:<slug>`. */
  slug: string
  /** Para que Tony sepa cuál es cuál cuando vea las etiquetas. */
  nombre: string
  /** En una línea: qué ángulo está probando. */
  angulo: string
  /** El chip de arriba. Si queda vacío se usa el de la fecha. */
  kicker: string
  /** El titular, partido: la segunda línea va en morado. */
  h1: { linea1: string; linea2: string }
  /** La bajada bajo el titular. */
  bajada: string
  /** El bloque del problema, más abajo. */
  problema: { titulo1: string; titulo2: string; parrafo1: string; parrafo2: string }
  /** El título de la pestaña y el de compartir. */
  meta: { titulo: string; descripcion: string }
}

export const VARIANTES: Variante[] = [
  // ── A ─────────────────────────────────────────────────────────────────────
  {
    slug: 'numeros',
    nombre: 'A · Los números abiertos',
    angulo: 'Transparencia radical. El gancho es la curiosidad de ver una hoja real.',
    kicker: '',
    h1: { linea1: 'Te voy a abrir', linea2: 'los números de mi hotel.' },
    bajada:
      'Cuánto entró cada mes, la ocupación real, qué se lleva la operadora y qué queda al final. En vivo, 80 minutos, gratis. Y al final te enseño cómo se evalúa un proyecto turístico antes de meterle un solo dólar.',
    problema: {
      titulo1: 'Todo el mundo quiere entrarle al turismo.',
      titulo2: 'Casi nadie sabe leer los números.',
      parrafo1:
        'Te muestran una foto del volcán, una proyección bonita en Excel y un porcentaje que suena increíble. Y con eso la gente toma decisiones de decenas de miles de dólares.',
      parrafo2:
        'Yo hago lo contrario: te muestro la hoja completa de un hotel que ya opera, incluidos los meses malos. Después decidís vos.',
    },
    meta: {
      titulo: 'Clase gratuita: te abro los números de mi hotel',
      descripcion:
        'Los ingresos mes por mes de un hotel que ya opera en La Fortuna, qué se lleva la operadora y qué queda. En vivo y gratis.',
    },
  },

  // ── B ─────────────────────────────────────────────────────────────────────
  {
    slug: 'revolucion',
    nombre: 'B · La revolución de la copropiedad',
    angulo: 'El modelo cambió. Gancho de novedad: ya no hay que comprar el hotel entero.',
    kicker: 'La Revolución de la Copropiedad Turística',
    h1: { linea1: 'Ya no hay que comprar', linea2: 'el hotel entero.' },
    bajada:
      'Durante años, ser dueño de un hotel en Costa Rica requería comprar el terreno, construirlo y operarlo. Eso cambió. En esta clase te explico cómo funciona la copropiedad turística — y te abro los números reales de un hotel que ya opera en La Fortuna.',
    problema: {
      titulo1: 'La vieja forma pedía todo:',
      titulo2: 'terreno, obra, permisos y tu vida entera.',
      parrafo1:
        'Comprar, construir, sacar patentes, contratar, contestar huéspedes a medianoche y rezar para que el algoritmo de la plataforma te acompañe. Así se hacía, y por eso casi nadie lo hacía.',
      parrafo2:
        'La copropiedad parte el activo en fracciones. No es tiempo compartido y no es un título sobre una villa: es otra cosa, y esa diferencia es justo lo que vamos a ver en la clase.',
    },
    meta: {
      titulo: 'La Revolución de la Copropiedad Turística · Clase gratuita',
      descripcion:
        'Ya no hay que comprar el hotel entero. Cómo funciona la copropiedad turística, con los números reales de un hotel que ya opera.',
    },
  },

  // ── C ─────────────────────────────────────────────────────────────────────
  {
    slug: 'comunidad',
    nombre: 'C · DESTINO OWNERS, la comunidad',
    angulo: 'Pertenencia + democratización. El gancho es entrar a algo, no comprar algo.',
    kicker: 'Destino Owners · la comunidad',
    h1: { linea1: 'Ser dueño de turismo en Costa Rica', linea2: 'dejó de ser para unos pocos.' },
    bajada:
      'DESTINO OWNERS es la comunidad que abre la puerta a participar en activos turísticos costarricenses sin tener que construirlos ni operarlos. Empezamos en Costa Rica; Latinoamérica viene después. Esta clase es la puerta de entrada, y es gratis.',
    problema: {
      titulo1: 'El turismo de este país lo construían siempre los mismos.',
      titulo2: 'No porque fuera un club. Porque era carísimo entrar.',
      parrafo1:
        'Un hotel pequeño en una zona buena arranca en cientos de miles de dólares, más años de obra y un equipo que hay que armar desde cero. Con esa barrera, la lista de quiénes podían jugar era corta.',
      parrafo2:
        'Una comunidad cambia esa cuenta: varios co-dueños, un solo activo, una sola operación profesional. En la clase te muestro los números reales de la que ya está funcionando.',
    },
    meta: {
      titulo: 'DESTINO OWNERS · La comunidad de dueños de turismo en Costa Rica',
      descripcion:
        'Participar en activos turísticos costarricenses sin construirlos ni operarlos. Clase gratuita en vivo con Tony Alvarado.',
    },
  },

  // ── D ─────────────────────────────────────────────────────────────────────
  {
    slug: 'airbnb',
    nombre: 'D · El dolor del Airbnb',
    angulo: 'Dolor concreto de quien ya lo intentó o lo pensó. Habla a un público caliente.',
    kicker: 'Para el que pensó en poner un Airbnb',
    h1: { linea1: 'Querías poner un Airbnb.', linea2: 'Nadie te contó lo que viene después.' },
    bajada:
      'Limpieza, mantenimiento, permisos, reseñas, temporada baja, el huésped que escribe a medianoche y el algoritmo que un día decide bajarte. En esta clase te muestro los números reales de un hotel de cinco villas en La Fortuna — los buenos meses y los malos — y cómo se participa sin tener que operar nada.',
    problema: {
      titulo1: 'Un Airbnb no es ingreso pasivo.',
      titulo2: 'Es un trabajo, y encima uno que no elegíste.',
      parrafo1:
        'Todo el mundo hace la cuenta de la tarifa por noche y se emociona. Nadie hace la cuenta de las horas propias, la rotación de personal, el aire acondicionado que se daña un domingo y los meses en que la ocupación se cae.',
      parrafo2:
        'En la clase ves las dos columnas completas de un hotel que ya opera. Con eso podés decidir si querés operar, participar sin operar, o no meterte del todo.',
    },
    meta: {
      titulo: 'Querías poner un Airbnb · Clase gratuita con Tony Alvarado',
      descripcion:
        'Lo que nadie cuenta de operar hospedaje en Costa Rica, y los números reales de un hotel que ya opera en La Fortuna.',
    },
  },

  // ── E ─────────────────────────────────────────────────────────────────────
  {
    slug: 'record',
    nombre: 'E · El récord turístico',
    angulo: 'Oportunidad con dato verificable. El gancho es la cifra de prensa, no la promesa.',
    kicker: 'Costa Rica, enero a abril de 2026',
    h1: { linea1: '1.195.271 turistas entraron', linea2: 'y a vos no te tocó ni uno.' },
    bajada:
      'Es la cifra del Instituto Costarricense de Turismo para el primer cuatrimestre de 2026, un 10,5% más que el año anterior. En esta clase te muestro cómo se ve ese movimiento dentro de la contabilidad de un hotel de verdad: mes por mes, con los buenos y los malos.',
    problema: {
      titulo1: 'La noticia la leyeron todos.',
      titulo2: 'Casi nadie sabe qué hacer con ella.',
      parrafo1:
        'Que entren más turistas no se convierte solo en nada. Hay que saber dónde se quedan, cuánto pagan la noche, qué meses se caen y cuánto se lleva cada intermediario antes de que quede algo.',
      parrafo2:
        'Eso es exactamente lo que vamos a abrir en la clase, con la hoja de un hotel que opera en La Fortuna desde setiembre de 2025.',
    },
    meta: {
      titulo: 'Costa Rica rompió récord turístico · Clase gratuita',
      descripcion:
        '1.195.271 turistas entraron entre enero y abril de 2026. Cómo se ve eso dentro de los números de un hotel real.',
    },
  },
]

/** La que sirve `clase.tonyalvarado.com/` a secas. */
export const VARIANTE_POR_DEFECTO = VARIANTES[0]

export function buscarVariante(slug: string): Variante | undefined {
  return VARIANTES.find((v) => v.slug === slug)
}

/** Las que cuelgan de un slug propio — o sea, todas menos la de por defecto. */
export const VARIANTES_CON_SLUG = VARIANTES.filter((v) => v.slug !== VARIANTE_POR_DEFECTO.slug)
