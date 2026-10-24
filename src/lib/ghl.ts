/**
 * El puente hacia GoHighLevel: un POST y nada más.
 *
 * Quien se registra a la clase recibe un WhatsApp de confirmación con el
 * enlace del grupo, y otro el día de la clase. Los dos los manda GHL, que es
 * donde vive el número de Tony conectado a la API de WhatsApp de Meta.
 *
 * ── Por qué un webhook y no la API v2 ──────────────────────────────────────
 * La API (`POST /conversations/messages`, que sí acepta `type: "WhatsApp"`)
 * necesita un **token de integración privada** que nunca se logró generar, y
 * además dos llamadas: primero `upsert` del contacto para sacar el `contactId`
 * y después el envío. El webhook necesita **una sola llamada y ninguna
 * credencial aparte de su propia URL**, que ya es secreta.
 *
 * El otro motivo pesa más: **la interfaz de flujos de GHL no se puede
 * automatizar desde acá** — vive en un iframe de otro origen y los clics
 * sintéticos no lo cruzan. Sea cual sea el camino, el flujo lo arma Tony a
 * mano. Entre dos opciones que él igual tiene que tocar, gana la que no pide
 * token.
 *
 * ── Lo que este archivo NO hace ────────────────────────────────────────────
 * No decide el texto del mensaje, no espera, no reintenta y no sabe nada de
 * plantillas. Todo eso vive en el flujo de GHL, del lado de Tony, para que
 * pueda cambiar el mensaje sin que nadie despliegue nada.
 */

/** Lo que viaja a GHL. Cada llave de acá se mapea a un campo en el flujo. */
export type LeadParaGhl = {
  nombre: string
  correo: string
  /** E.164 con `+`, tal como lo deja `normalizarTelefono`. */
  telefono: string
  pais: string | null
  /** Nombre de la clase, para que la plantilla no lo lleve quemado. */
  clase: string
  fechaTexto: string
  horaTexto: string
  /**
   * El instante de la clase en ISO 8601 UTC.
   *
   * Es el que hace que el recordatorio del día **no obligue a editar el flujo
   * en cada lanzamiento**: GHL lo guarda en un campo de fecha del contacto y
   * el paso de espera se ancla ahí. Van entre 5 y 10 lanzamientos; un flujo
   * con la fecha quemada adentro son 5 a 10 ediciones a mano, cada una con su
   * oportunidad de olvidarse.
   */
  instanteUtc: string
  etiquetas: string[]
  /**
   * La experiencia VIP presencial, o `null` si está apagada en el CRM.
   *
   * Es la MISMA compuerta que usan la página y el correo —`leerVip()`—, no
   * una copia: el interruptor del CRM tiene que poder apagar los tres a la
   * vez. Un canal que sigue ofreciendo el VIP después de apagarlo manda gente
   * a una fecha que ya pasó.
   *
   * Apagado no significa «mandar el bloque vacío»: significa que el flujo de
   * GHL manda la plantilla SIN VIP. Una plantilla de WhatsApp es texto fijo,
   * no tiene condicionales adentro — la condición vive en el flujo, y por eso
   * `vip_activo` viaja como campo propio.
   */
  vip: {
    fechaTexto: string
    lugarTexto: string
    precioTexto: string
    cuposTexto: string
  } | null
}

export type ResultadoGhl = 'ok' | 'sin-configurar' | 'fallo'

const ZONA = 'America/Costa_Rica'

/**
 * El DÍA de la clase en Costa Rica: `2026-10-28`. Sin hora y sin zona.
 *
 * ── Por qué el día pelado y no el instante ────────────────────────────────
 * Es lo que ancla el recordatorio, y ahí una zona horaria mal leída se vuelve
 * un mensaje que sale el día equivocado. La clase del **28 a las 7 p.m. de
 * Costa Rica** es `2026-10-29T01:00:00Z`: mandando ese ISO, cualquier sistema
 * que lo lea en otra zona guarda el **29**, y el «hoy es la clase» sale un día
 * tarde, a todo el mundo, sin tirar un solo error.
 *
 * La primera versión mandaba las dos formas —UTC y hora local— para mapear
 * contra la que GHL leyera bien. Al armar el campo del otro lado resultó que
 * **GHL solo ofrece «Date picker», una fecha sin hora**, así que la hora se
 * perdía igual. Entonces se manda ya resuelto lo único que importa: el día,
 * calculado acá, donde sí se sabe en qué zona vive la clase. Lo que no viaja
 * no se puede malinterpretar.
 *
 * La hora del recordatorio se escoge en el flujo de GHL («ese día a las 9»),
 * que es donde Tony la puede cambiar sin desplegar nada.
 *
 * `sv-SE` no es decorativo: es el locale que produce `AAAA-MM-DD` directo,
 * sin armar la cadena a mano.
 */
export function diaEnCostaRica(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('sv-SE', { timeZone: ZONA, dateStyle: 'short' }).format(d)
}

/**
 * Cuánto se espera antes de rendirse.
 *
 * Del otro lado de este `fetch` hay una persona mirando un formulario que no
 * termina de enviarse. GHL no es parte de guardar el lead —eso ya pasó— así
 * que cinco segundos es todo lo que se le presta.
 */
const TOPE_MS = 5000

/**
 * Avisa a GoHighLevel que entró un registro.
 *
 * Nunca lanza: devuelve qué pasó y el que llama decide. El lead ya está
 * guardado en el CRM cuando esto corre, y tumbar la petición por un WhatsApp
 * sería perder lo único irrecuperable por lo único que se puede repetir.
 */
export async function avisarAGhl(lead: LeadParaGhl): Promise<ResultadoGhl> {
  const url = process.env.GHL_WEBHOOK_CLASE
  if (!url) return 'sin-configurar'

  try {
    /*
      Los nombres `first_name`, `last_name`, `email` y `phone` son los que GHL
      reconoce solo al mapear el webhook. El resto son campos personalizados y
      sus nombres son libres — pero una vez mapeados en el flujo **ya no se
      pueden renombrar acá sin romperlo**. Si alguna vez hay que cambiarlos,
      se agrega la llave nueva, se mapea, y recién después se quita la vieja.
    */
    const [primero, ...resto] = lead.nombre.trim().split(/\s+/)

    const respuesta = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: primero,
        last_name: resto.join(' '),
        email: lead.correo,
        phone: lead.telefono,
        country: lead.pais ?? '',
        clase_nombre: lead.clase,
        clase_fecha_texto: lead.fechaTexto,
        clase_hora_texto: lead.horaTexto,
        // El día de la clase en Costa Rica, ya resuelto. Es el ancla del
        // recordatorio; ver `diaEnCostaRica` para por qué no viaja la hora.
        clase_dia: diaEnCostaRica(lead.instanteUtc),
        etiquetas: lead.etiquetas.join(','),
        // `si`/`no` en vez de booleano: es lo que el If/Else de GHL compara
        // sin ambigüedad. Un `false` ahí llega como la cadena «false» y hay
        // que acordarse; un «no» se lee igual en la pantalla y en el código.
        vip_activo: lead.vip ? 'si' : 'no',
        vip_fecha_texto: lead.vip?.fechaTexto ?? '',
        vip_lugar: lead.vip?.lugarTexto ?? '',
        vip_precio_texto: lead.vip?.precioTexto ?? '',
        vip_cupos_texto: lead.vip?.cuposTexto ?? '',
      }),
      signal: AbortSignal.timeout(TOPE_MS),
      // Un webhook no se cachea nunca; que quede dicho y no dependa del default.
      cache: 'no-store',
    })

    if (!respuesta.ok) {
      console.error(`[ghl] el webhook respondió ${respuesta.status}`)
      return 'fallo'
    }
    return 'ok'
  } catch (e) {
    // `AbortSignal.timeout` llega acá como `TimeoutError`; se trata igual que
    // cualquier otra falla de red porque la consecuencia es la misma.
    console.error('[ghl] no se pudo avisar del registro:', e)
    return 'fallo'
  }
}
