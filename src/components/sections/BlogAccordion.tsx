import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

type BlogPost = {
  title: string
  category: string
  keyword: string
  summary: string
  content: string[]
  cta: { label: string; href: string }
}

const posts: BlogPost[] = [
  {
    title: 'Cómo encontrar tu propósito cuando te sientes perdido',
    category: 'Propósito — Transformación',
    keyword: 'propósito de vida transformación personal',
    summary:
      'Una reflexión práctica sobre dirección, identidad, disciplina y cómo volver a avanzar cuando sientes que perdiste el rumbo.',
    content: [
      'Hay un tipo de cansancio que dormir no puede solucionar. No se trata únicamente del agotamiento físico; es esa incómoda sensación de levantarte cada mañana y sentir que, aunque haces muchas cosas, en el fondo no sabes hacia dónde vas. Cumples responsabilidades, trabajas, estudias, respondes mensajes y avanzas en automático… pero algo dentro de ti se siente apagado.',
      'La realidad es que sentirse perdido es más común de lo que imaginas, pero también puede convertirse en el inicio de una transformación profunda. No estás roto; simplemente llevas demasiado tiempo desconectado de tu propósito de vida.',
      'Antes de convertirme en empresario, mentor y autor, hubo una etapa de mi vida en la que me sentía completamente desconectado. Trabajaba duro, estudiaba ingeniería y pasaba largas horas frente a una computadora. Desde afuera, todo parecía marchar bien, pero por dentro me sentía cansado, presionado y vacío. Estaba sobreviviendo más de lo que realmente estaba viviendo. Mi mente estaba saturada, mi cuerpo agotado y mi visión desenfocada.',
      'Hasta que ocurrió un accidente en bicicleta que cambió mi vida para siempre. Ese momento me obligó a detenerme y a cuestionar la manera en la que estaba viviendo. Me hizo entender que el tiempo es demasiado valioso para desperdiciarlo sin intención. Comprendí que no quería pasar el resto de mi vida simplemente existiendo; quería vivir plenamente, crecer y construir una vida con significado.',
      'Desde entonces, montar en bicicleta dejó de ser únicamente un deporte para convertirse en una metáfora de vida. Porque la vida se parece mucho a pedalear: cuando dejas de avanzar, pierdes el equilibrio; cuando te enfocas únicamente en el cansancio, te detienes; y cuando no sabes hacia dónde vas, cualquier camino termina agotándote.',
      'Si eres un apasionado del ciclismo de montaña o disfrutas recorrer kilómetros en carretera, sabes exactamente de qué tipo de equilibrio hablo. Pero también aprendí algo poderoso: no necesitas tocar fondo para despertar. No necesitas perderlo todo para cambiar. A veces, el cambio comienza con una decisión pequeña pero honesta: volver a pedalear.',
      '1. Sé honesto contigo mismo. El primer paso no es motivarte; es aceptar lo que sientes. Muchas veces intentamos distraernos trabajando de más o refugiándonos en el ruido constante para evitar el vacío interior. Sin embargo, mientras ignores lo que sucede dentro de ti, seguirás estancado. Aceptar que algo necesita cambiar no es debilidad; es madurez.',
      '2. Recupera tu identidad y tus dones. Muchas personas pierden el rumbo porque olvidaron quiénes son realmente. Comienzan a vivir comparándose con otros, intentando encajar o persiguiendo expectativas ajenas. Tu propósito jamás nacerá de copiar la vida de alguien más. Aparece cuando vuelves a descubrir tus capacidades, tus valores y aquello que verdaderamente te apasiona.',
      '3. Vuelve a confiar en tu palabra. Una de las consecuencias más silenciosas del estancamiento es perder credibilidad contigo mismo. La transformación verdadera se construye a través de pequeñas victorias diarias: levantarte temprano, cuidar tu salud, mantener el orden o dedicar tiempo a fortalecer tu vida espiritual. La constancia en los microhábitos es la disciplina diaria que construye a un verdadero campeón.',
      '4. Cambia tus creencias limitantes. Tu vida comienza a cambiar cuando cambia la manera en la que te ves a ti mismo. Las limitaciones más grandes rara vez son externas; casi siempre son mentales. Pensamientos como "No soy suficiente", "Ya es tarde para mí" o "No tengo lo necesario" terminan frenando tu crecimiento. Para avanzar, necesitas reemplazar esas ideas por una mentalidad de crecimiento: "Estoy a tiempo de construir la vida que deseo. Tengo las capacidades y los dones necesarios para salir adelante. Mi pasado no define mi destino; mis decisiones de hoy sí."',
      '5. Rodéate de un entorno que te impulse. Nadie encuentra su propósito completamente solo. Necesitas un entorno que te rete, te inspire y te recuerde tu verdadero potencial. Las personas correctas tienen visión y rumbo, te celebran genuinamente cuando avanzas, y con su ejemplo de disciplina y compromiso te motivan a no abandonar el camino.',
      'Pasar de la reflexión a la acción es lo que marcará la diferencia. Comienza esta semana con tres pasos concretos: identifica tu "fuga de aire" — ese pensamiento, hábito o entorno que drena tu energía y te mantiene estancado; construye un microhábito innegociable para los próximos siete días (leer, madrugar, ejercitarte, cuidar tu nutrición para el ciclismo y el bienestar); y cada noche, antes de dormir, pregúntate: "¿Las acciones que tomé hoy me acercan a la persona que quiero ser mañana?" La consistencia siempre vale más que la intensidad momentánea.',
      'Quizás cometiste errores, perdiste años o tomaste decisiones equivocadas. Tal vez hoy te sientes más confundido que nunca. Pero eso no significa que tu historia haya terminado. El propósito no siempre aparece como un rayo de luz repentino. La mayoría de las veces se revela mientras avanzas, mientras sanas, mientras creces y mientras decides no rendirte. No estás tan perdido como crees. Tal vez simplemente dejaste de pedalear por un tiempo.',
    ],
    cta: { label: 'Conoce Pure Cycling →', href: '/pure-cycling' },
  },
  {
    title: 'Cómo empezar a entrenar ciclismo de forma seria',
    category: 'Ciclismo — Entrenamiento',
    keyword: 'entrenamiento ciclismo Costa Rica',
    summary:
      'El error más común es empezar con demasiada intensidad y sin estructura. Entrenar en serio tiene un método, no solo voluntad.',
    content: [
      'La mayoría de las personas que deciden "empezar a entrenar en serio" en ciclismo cometen el mismo error: salen con demasiada intensidad los primeros días, agotan el cuerpo, y en menos de tres semanas abandonan. No es falta de voluntad. Es falta de estructura.',
      'Entrenar en serio no significa sufrir más. Significa entrenar con inteligencia. Un programa de ciclismo bien diseñado incluye zonas de intensidad definidas, volumen progresivo por semana y ciclos de recuperación planificados. Sin esos tres elementos, no importa cuántas horas acumules en la bicicleta: el cuerpo no progresa de la manera correcta.',
      'Hay cuatro pilares sin los cuales cualquier intento de entrenamiento serio termina en frustración: un plan estructurado que progrese semana a semana, una guía que entienda tu nivel y tus objetivos, una comunidad que te acompañe en los días difíciles, y la constancia como hábito, no como emoción del momento.',
      'Quienes empiezan solos un programa de ciclismo, sin estructura ni acompañamiento real, raramente llegan a los 90 días. No porque el deporte sea difícil, sino porque la soledad del proceso y la falta de retroalimentación hacen que cualquier tropiezo parezca una señal para parar.',
      'Pure Cycling nació exactamente para resolver eso. No es un curso que te manda un plan en Excel. Es una comunidad con estructura, acompañamiento de entrenadores certificados, programas de nutrición y movilidad, y un sistema que te sostiene cuando la motivación sola no alcanza. Si quieres empezar a entrenar ciclismo de forma real, el primer paso es tener un sistema, no solo intención.',
    ],
    cta: { label: 'Conoce Pure Cycling →', href: '/pure-cycling' },
  },
  {
    title: 'Qué debe tener un plan de entrenamiento para ciclistas',
    category: 'Ciclismo — Entrenamiento',
    keyword: 'plan de entrenamiento ciclismo',
    summary:
      'Un plan de entrenamiento serio va mucho más allá de contar kilómetros por semana. Así se estructura uno que realmente funciona.',
    content: [
      'Cuando alguien pregunta "¿cuánto debo pedalear por semana?", la respuesta correcta no es un número. Es una pregunta de regreso: ¿cuál es tu objetivo? ¿Cuánto tiempo tienes? ¿En qué zona de intensidad estás pedaleando esos kilómetros? Un plan de entrenamiento que solo mide volumen por distancia es como una dieta que solo cuenta calorías sin distinguir qué estás comiendo.',
      'La base de cualquier programa de ciclismo bien diseñado son las zonas aeróbicas. La mayoría de los ciclistas aficionados pasan demasiado tiempo entrenando a intensidad media-alta y muy poco tiempo en la zona 2, que es donde realmente se construye la resistencia y la capacidad cardiovascular de largo plazo. Un plan serio invierte esa proporción.',
      'La periodización es el siguiente nivel: organizar el entrenamiento en bloques con objetivos específicos, ciclos de carga y ciclos de recuperación. No se entrena igual en febrero que en julio. Un buen plan anticipa esas curvas y las convierte en progreso medible.',
      'En Pure Cycling, el entrenamiento se basa en cinco pilares integrados: desarrollo físico en bicicleta, nutrición específica para ciclistas, movilidad y prevención de lesiones, mentalidad y disciplina mental, y propósito como combustible de largo plazo. Estos cinco elementos no son opcionales: son los que separan a un ciclista que avanza de uno que se estanca.',
      'El mayor error no es tener un plan imperfecto. Es creer que el plan solo, sin seguimiento ni comunidad, alcanza. Un entrenador que no ve tus datos, que no sabe cómo te sentiste en el último entreno, que no ajusta cuando la vida real interrumpe el plan ideal, no es realmente un entrenador. Es un documento.',
    ],
    cta: { label: 'Conoce Pure Cycling →', href: '/pure-cycling' },
  },
  {
    title: 'Mountain bike en Costa Rica: comunidad, técnica y disciplina',
    category: 'MTB — Costa Rica',
    keyword: 'mountain bike Costa Rica',
    summary:
      'Costa Rica tiene una geografía hecha para el MTB, y PuroMTB lleva más de 20 años en el centro de esa comunidad ciclista.',
    content: [
      'Pocas cosas en Latinoamérica combinan tan bien como Costa Rica y el mountain bike. La geografía del país es una ventaja natural: altitudes que van del nivel del mar a más de 3.000 metros, terreno volcánico, bosques densos, clima que permite rodar durante todo el año, y una red de senderos y rutas que sigue creciendo. Para el ciclista que busca variedad de terreno, Costa Rica es uno de los mejores lugares del mundo.',
      'PuroMTB nació en 2004 como un sitio web de ciclismo cuando el contenido de ciclismo online en Costa Rica era casi inexistente. No había foros, no había grupos, no había información técnica en español orientada a la realidad centroamericana. Tony Alvarado vio ese vacío y lo llenó con consistencia durante más de 20 años. Lo que empezó como un blog se convirtió en comunidad, en tienda, y en el punto de referencia cultural del ciclismo costarricense.',
      'Para progresar en MTB no basta con acumular horas de silla. La técnica va primero: posición del cuerpo en la bicicleta, frenado en bajadas, lectura del terreno, manejo de obstáculos. Un ciclista con mala técnica que entrena mucho solo consolida errores. La práctica consistente con corrección deliberada es lo que genera mejora real.',
      'Lo que hace especial a la comunidad ciclista en Costa Rica es la cultura de apoyo. Los rides grupales, los eventos, las competencias locales, los grupos en redes: hay una red de personas que comparten no solo la pasión por la bicicleta, sino también el conocimiento. Unirse a esa comunidad acelera el aprendizaje de cualquier ciclista, sea principiante o avanzado.',
    ],
    cta: { label: 'Conoce el ecosistema →', href: '/#ecosistema' },
  },
  {
    title: 'Ciclismo de ruta y MTB: diferencias, beneficios y cómo elegir',
    category: 'Ciclismo',
    keyword: 'ciclismo de ruta vs MTB Costa Rica',
    summary:
      'Dos disciplinas con filosofías distintas. La pregunta correcta no es cuál es mejor, sino cuál pedalearás con constancia.',
    content: [
      'La diferencia más obvia entre el ciclismo de ruta y el mountain bike está en el terreno y en la bicicleta. La ruta es asfalto, velocidad, eficiencia aerodinámica, ruedas delgadas y marcos rígidos optimizados para el pedaleo continuo. El MTB es tierra, técnica, adaptabilidad, ruedas anchas con agarre y geometrías diseñadas para absorber impactos y mantener el control en condiciones variables.',
      'Pero la diferencia más importante no es la bicicleta. Es la demanda física y mental de cada disciplina. La ruta exige resistencia cardiovascular sostenida, potencia en llano y en subidas largas, y la capacidad de mantener el ritmo durante horas. El MTB exige reacciones rápidas, técnica de manejo, explosividad en tramos cortos y una concentración mental constante ante el terreno cambiante.',
      'Para un principiante que no sabe cuál elegir, la respuesta depende del objetivo. Si el objetivo principal es mejorar la condición física, perder peso o tener un entrenamiento cardiovascular regular, la ruta suele ser más accesible al inicio: el aprendizaje técnico es menor y el ritmo es más predecible. Si el objetivo es la aventura, el contacto con la naturaleza y el desafío técnico, el MTB ofrece una experiencia completamente diferente.',
      'En Pure Cycling, Tony trabaja con ciclistas de ambas disciplinas porque los principios del entrenamiento son transferibles: la base aeróbica, la nutrición, la movilidad, la mentalidad y la comunidad funcionan sin importar si pedaleas en asfalto o en tierra. Lo que cambia es la aplicación técnica.',
      'La pregunta real no es cuál disciplina es superior. Es cuál vas a pedalear con constancia durante los próximos meses y años. La mejor bicicleta del mundo es la que usas. El mejor programa de entrenamiento es el que sigues.',
    ],
    cta: { label: 'Conoce Pure Cycling →', href: '/pure-cycling' },
  },
  {
    title: 'Cómo mejorar la resistencia y la mentalidad sobre la bicicleta',
    category: 'Ciclismo — Mentalidad',
    keyword: 'resistencia ciclismo mentalidad',
    summary:
      'La resistencia en ciclismo se construye en capas: física primero, mental después. Pero las dos están conectadas desde el primer pedalazo.',
    content: [
      'La resistencia en ciclismo no se construye en días. Se construye en meses de trabajo consistente sobre una base aeróbica sólida. El componente más importante, y el más ignorado por los ciclistas aficionados, es la zona 2: esa intensidad moderada donde puedes mantener una conversación, donde el esfuerzo se siente manejable, y donde el cuerpo aprende a ser eficiente usando las grasas como combustible. Las semanas de zona 2 acumuladas son las que determinan tu techo de rendimiento.',
      'La progresión gradual es el principio que separa el entrenamiento inteligente del entrenamiento que lesiona. Aumentar el volumen semanal en no más del 10% por semana, incluir semanas de descarga cada tres o cuatro semanas, y respetar los días de recuperación: estas no son sugerencias opcionales. Son la diferencia entre llegar a la temporada más fuerte o llegar lesionado.',
      'Pero ninguna base aeróbica perfecta alcanza si la mente cede antes que el cuerpo. En ciclismo, hay un momento en toda subida larga, en todo ride exigente, en todo entreno difícil, donde aparece la voz que dice "para". Esa voz no es una señal de que el cuerpo llegó al límite. Es la mente tratando de protegerte del esfuerzo incómodo. Aprender a reconocerla y a seguir pedaleando es una habilidad que se entrena, como los músculos.',
      'El ciclismo actúa como un espejo psicológico. Lo que muestras sobre la bicicleta cuando el camino se pone difícil es exactamente lo que muestras en la vida cuando las circunstancias se complican. La disciplina de terminar un entreno cuando querías parar, la paciencia de respetar el proceso cuando quieres resultados inmediatos, la confianza de avanzar en una bajada técnica: todas son habilidades que se transfieren más allá del ciclismo. Tony Alvarado lo sabe desde que a los 16 años usó la bicicleta para recuperarse de lo que casi le cuesta la vida.',
    ],
    cta: { label: 'Conoce la historia de Tony →', href: '/sobre-mi' },
  },
  {
    title: 'Pure Cycling: entrenamiento de ciclismo online con propósito',
    category: 'Pure Cycling',
    keyword: 'Pure Cycling Tony Alvarado',
    summary:
      'Pure Cycling no es un curso de ciclismo. Es una comunidad de transformación con estructura real, acompañamiento y más de 30 países conectados.',
    content: [
      'Hay una diferencia fundamental entre un entrenador que te manda un plan en Excel por WhatsApp y una comunidad estructurada de transformación a través del ciclismo. Pure Cycling es lo segundo. No es una lista de entrenamientos. Es un sistema completo diseñado para que las personas transformen su vida física, mental, espiritual y social a través del ciclismo.',
      'Pure Cycling está diseñado para ciclistas principiantes e intermedios que quieren algo más que mejorar su tiempo en una ruta. Para personas que quieren cambiar hábitos, recuperar su condición física, encontrar comunidad, y desarrollar la disciplina que el ciclismo enseña como ningún otro deporte. No es para atletas de alto rendimiento que buscan optimizar su potencia en vatios. Es para personas reales con vidas reales que quieren transformarse.',
      'El programa integra cinco pilares: entrenamiento personalizado en bicicleta adaptado al nivel de cada miembro, nutrición específica para ciclistas en la vida cotidiana, movilidad y ejercicios de prevención de lesiones, trabajo de mentalidad y disciplina mental, y espiritualidad como dimensión del bienestar integral. Estos cinco pilares no son módulos separados: funcionan como un sistema interconectado porque así funciona una persona real.',
      'Pure Cycling tiene miembros activos en más de 30 países. Desde Costa Rica hasta España, desde México hasta Argentina, desde Estados Unidos hasta Colombia. La comunidad opera principalmente en la plataforma Skool, con interacción diaria, sesiones en vivo, y un ambiente donde los miembros se acompañan mutuamente en el proceso.',
      'Lo que diferencia a Pure Cycling de cualquier otra alternativa no es el contenido. Es la comunidad y el acompañamiento. Un plan sin seguimiento es solo papel. Un entrenador que no ve cómo te fue realmente, que no ajusta cuando la semana estuvo difícil, que no te sostiene cuando quieres abandonar, no resuelve el problema de fondo. Pure Cycling resuelve exactamente eso.',
    ],
    cta: { label: 'Únete a Pure Cycling →', href: '/pure-cycling' },
  },
  {
    title: 'PuroMTB: cómo nació una comunidad ciclista en Costa Rica',
    category: 'PuroMTB',
    keyword: 'PuroMTB Costa Rica',
    summary:
      'En 2004, Tony Alvarado empezó un sitio web de ciclismo cuando nadie más lo hacía en Costa Rica. Hoy es una referencia cultural del ciclismo costarricense.',
    content: [
      'En 2004, el contenido de ciclismo en internet en español y orientado a Centroamérica era casi inexistente. No había foros activos, no había recursos técnicos, no había comunidad digital para ciclistas costarricenses. Tony Alvarado decidió llenar ese vacío con un sitio web llamado PuroMTB. Lo construyó con lo que tenía: tiempo, conocimiento y una convicción de que la comunidad ciclista de Costa Rica merecía un espacio propio.',
      'Cuatro años después, en 2008, PuroMTB dejó de ser solo digital y abrió su primera tienda física. Fue el paso natural de una comunidad que había crecido online y pedía un lugar físico donde reunirse, comprar equipamiento de calidad y conectarse con otros ciclistas. La tienda no reemplazó la comunidad digital: la complementó.',
      'Más de 20 años después, PuroMTB sigue siendo el punto de referencia de la cultura ciclista en Costa Rica. Con aproximadamente medio millón de seguidores en redes sociales, PuroMTB es más que una tienda de bicicletas. Es un medio, una comunidad, un espacio de educación y un ancla cultural para todos los ciclistas del país que buscan contenido, orientación o simplemente sentirse parte de algo más grande.',
      'Lo que construyó Tony con PuroMTB en 20 años no fue un negocio de ciclismo. Fue una referencia. Y eso es más difícil de construir y más difícil de copiar. Una referencia no se crea con publicidad. Se crea con consistencia, con presencia real y con genuino amor por el deporte y por la comunidad que lo vive.',
    ],
    cta: { label: 'Conoce el ecosistema →', href: '/#ecosistema' },
  },
  {
    title: 'Bike & Bed Hotels: turismo deportivo para ciclistas en Costa Rica',
    category: 'Bike & Bed Hotels',
    keyword: 'hotel ciclistas Costa Rica',
    summary:
      'El turismo deportivo de ciclismo crece globalmente. Costa Rica es uno de los mejores destinos del mundo para vivirlo. Bike & Bed Hotels es la experiencia que lo hace posible.',
    content: [
      'El turismo deportivo de ciclismo es uno de los segmentos de mayor crecimiento en la industria del viaje a nivel global. Los ciclistas no buscan solo playas o museos: buscan rutas, terreno, comunidad, equipamiento disponible en destino y alojamiento que entienda sus necesidades específicas. Ese perfil de viajero activo, con poder adquisitivo medio-alto, está creciendo cada año.',
      'Costa Rica es uno de los destinos más atractivos del mundo para ese perfil. La diversidad de terreno en un territorio pequeño, la altitud de sus volcanes y montañas, el clima que permite rodar durante todo el año, la infraestructura turística desarrollada, la seguridad relativa frente a otros destinos centroamericanos, y la cultura de sostenibilidad y naturaleza: todo converge para hacer de Costa Rica un paraíso para el ciclismo de aventura y el MTB.',
      'Bike & Bed Hotels nació para ser exactamente lo que ese viajero ciclista no encontraba: un hotel que no solo tolera las bicicletas, sino que está diseñado para ellas. Instalaciones para guardar y mantener equipos, rutas curadas desde la puerta del hotel, guías locales con conocimiento real del terreno, comunidad de ciclistas y una experiencia integral que convierte cada estadía en algo memorable.',
      'Más de 250 reseñas de 5 estrellas en plataformas de viaje hablan de una operación que no solo promete experiencia sino que la entrega. Los huéspedes de Bike & Bed son ciclistas recreativos, viajeros activos, equipos de ciclismo, wellness travelers y familias que comparten la pasión por el movimiento y la naturaleza.',
      'La visión de Tony va mucho más allá de una propiedad en Costa Rica. El modelo de Bike & Bed está diseñado para escalar: una red de hoteles temáticos de ciclismo con marca, operación profesional y comunidad ya construida. Un modelo que permite a inversionistas participar en el turismo deportivo sin tener que construir desde cero.',
    ],
    cta: { label: 'Conoce Bike & Bed Hotels →', href: '/bike-bed-hotels' },
  },
  {
    title: 'La bicicleta como herramienta de transformación personal',
    category: 'Transformación',
    keyword: 'transformación personal ciclismo',
    summary:
      'A los 16 años, una bicicleta casi le quitó la vida a Tony Alvarado. Años después, fue la misma bicicleta la que Dios usó para reconstruirla.',
    content: [
      'A los 16 años, Tony Alvarado tuvo un accidente grave en bicicleta. Más de 34 días hospitalizado, coma, operaciones, fracturas y un momento en que no estaba claro si saldría adelante. Cuando despertó, algo había cambiado de forma permanente. Entendió que no podía desperdiciar la vida que le quedaba. La bicicleta, que primero casi se la quitó, se convirtió en la herramienta que Dios usó para reconstruirla.',
      'Esa historia no es solo la historia de Tony. Es la historia de lo que el movimiento físico puede hacer con una vida cuando se le da el espacio y el tiempo necesario. Miles de personas que han pasado por procesos de transformación física comparten la misma experiencia: el movimiento regular mejora el estado de ánimo, recupera la claridad mental, reconstruye la autoestima y cambia la forma en que el cuerpo responde al estrés. No es una promesa abstracta: es lo que ocurre cuando una persona decide moverse con constancia.',
      'La bicicleta enseña cosas que ningún libro puede enseñar de la misma manera. Enseña que la constancia supera al talento. Que el proceso no se puede saltear. Que confiar en el entrenamiento es más inteligente que confiar solo en el esfuerzo del momento. Que los días difíciles no son una señal de que algo está mal, sino de que el cuerpo está adaptándose. Que parar cuando duele es diferente a parar cuando el miedo habla.',
      'La bicicleta es especialmente poderosa como vehículo de transformación porque combina el desafío físico con el tiempo mental. En una subida larga, nadie puede distraerte. No hay notificaciones, no hay reuniones, no hay ruido. Solo tú, el terreno y la decisión de seguir o parar. Ese espacio de silencio y esfuerzo es donde las personas se encuentran consigo mismas, muchas veces por primera vez en años.',
    ],
    cta: { label: 'Conoce la historia de Tony →', href: '/sobre-mi' },
  },
  {
    title: 'Liderazgo, fe y emprendimiento: lecciones de 22 años',
    category: 'Liderazgo',
    keyword: 'Tony Alvarado empresario Costa Rica',
    summary:
      'Más de 22 años construyendo empresas en torno al ciclismo con un hilo conductor que nunca cambió: el propósito.',
    content: [
      'Hay empresarios que construyen negocios. Y hay empresarios que construyen ecosistemas. Tony Alvarado pertenece al segundo grupo. En más de 22 años, no construyó una empresa grande: construyó tres empresas conectadas por la misma visión, la misma comunidad y los mismos valores. PuroMTB, Pure Cycling y Bike & Bed Hotels no son negocios independientes. Son capítulos del mismo relato.',
      'El hilo conductor de esos 22 años no es el ciclismo. El ciclismo es el vehículo. El hilo conductor es el propósito: ayudar a las personas a transformar su vida. Ese "para qué" es lo que ha sostenido las decisiones difíciles, lo que ha dado claridad en los momentos de incertidumbre y lo que ha permitido construir con consistencia cuando la motivación del momento no alcanzaba.',
      'La fe tiene un papel central en el liderazgo de Tony, aunque no lo grita ni lo impone. Es parte de su forma de ver el trabajo, el equipo, los fracasos y los logros. Creer que hay un propósito más grande detrás de lo que construyes cambia la manera en que tratas a las personas, la manera en que tomas decisiones en momentos de presión y la manera en que defines el éxito. Para Tony, el éxito no es un número. Es la transformación de las personas que ha podido ayudar.',
      'Las lecciones del ciclismo aplicadas a los negocios son más directas de lo que parecen: la disciplina de entrenar aunque no tengas ganas es la misma disciplina de trabajar en lo importante cuando lo urgente consume el día. La estrategia de periodizar un año de entrenamiento es la misma lógica de planificar fases de negocio. La confianza en el equipo durante una carrera es la misma confianza que necesita un líder que quiere escalar sin colapsar.',
      '"Secretos para ser un empresario exitoso" es el intento de Tony de dejar por escrito lo que aprendió en esos 22 años. No teoría de libros de negocios: lecciones del campo, con fracasos incluidos, escritas para el emprendedor que está construyendo algo y necesita saber que el camino sí existe, que sí se puede, y que el propósito es el combustible más duradero que cualquier estrategia.',
    ],
    cta: { label: 'Ver los libros de Tony →', href: '/libros' },
  },
]

export default function BlogAccordion() {
  return (
    <section className="bg-brand-bg py-8">
      <div className="mx-auto max-w-4xl px-6 md:px-12">
        <div className="divide-y divide-brand-border">
          {posts.map((post) => (
            <details key={post.title} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between py-6 [&::-webkit-details-marker]:hidden">
                <div className="pr-4">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent">
                    {post.category}
                  </span>
                  <h2 className="mt-1 text-lg font-bold text-brand-text sm:text-xl">
                    {post.title}
                  </h2>
                  <p className="mt-1 text-sm text-brand-muted">{post.summary}</p>
                </div>
                <ChevronDown
                  size={20}
                  className="mt-1 shrink-0 text-brand-accent transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="pb-8 pt-2">
                <div className="space-y-4">
                  {post.content.map((paragraph, i) => (
                    <p key={i} className="text-sm leading-relaxed text-brand-muted text-left md:text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
                <Link
                  href={post.cta.href}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-accent px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  {post.cta.label}
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
