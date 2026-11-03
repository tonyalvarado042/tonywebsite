import { getCrm, hayCrm } from '@/lib/crm'
import type { Sala } from '@/lib/sala-webinar'

/**
 * La sala del webinar, leída del CRM.
 *
 * ⚠️ **Esto corre solo en el servidor.** Usa la llave de servicio y toca
 * tablas que están cerradas con RLS a propósito: si el navegador pudiera
 * leerlas, cualquiera abre las herramientas de desarrollo y ve el guion
 * completo del chat con su segundo exacto — y queda a la vista que la sala
 * está escrita. Ver la migración 032 del CRM.
 *
 * Por eso acá NO se devuelve el guion. Solo lo que la página necesita para
 * dibujar el contador y el reproductor.
 */
export type SalaEnVivo = Sala & {
  webinarId: string
  nombre: string
  ruta: string
  videoProveedor: 'cloudflare' | 'youtube' | 'vimeo'
  videoId: string | null
  ctaSegundo: number | null
  ctaTexto: string | null
  ctaUrl: string | null
  repeticionUrl: string | null
  chatAbierto: boolean
  grupoUrl: string | null
}

type FilaSala = {
  webinar_id: string
  ruta: string
  video_proveedor: 'cloudflare' | 'youtube' | 'vimeo'
  video_id: string | null
  puerta_min: number
  cta_segundo: number | null
  cta_texto: string | null
  cta_url: string | null
  repeticion_url: string | null
  chat_abierto: boolean
}

type FilaWebinar = {
  id: string
  nombre: string
  instante: string
  duracion_min: number
  grupo_url: string | null
}

/**
 * La sala que corresponde a esta ruta.
 *
 * ⚠️ Devuelve `null` ante cualquier problema, **a propósito y al revés que
 * `leerClase()`**. La landing de inscripción tiene pauta encima y si la base
 * no responde lo correcto es seguir mostrándola; una sala, en cambio, no se
 * puede inventar: sin fecha real no hay contador ni video, y enseñar una
 * sala vacía es peor que decir «todavía no hay nada acá».
 */
export async function leerSala(ruta: string): Promise<SalaEnVivo | null> {
  if (!hayCrm()) return null
  try {
    const crm = getCrm()
    const { data: sala, error: eSala } = await crm
      .from('cta_webinar_salas')
      .select('webinar_id, ruta, video_proveedor, video_id, puerta_min, cta_segundo, cta_texto, cta_url, repeticion_url, chat_abierto')
      .eq('ruta', ruta)
      .maybeSingle<FilaSala>()

    if (eSala || !sala) {
      if (eSala) console.error('[sala] no se pudo leer la sala:', eSala.message)
      return null
    }

    const { data: w, error: eW } = await crm
      .from('cta_webinars')
      .select('id, nombre, instante, duracion_min, grupo_url')
      .eq('id', sala.webinar_id)
      .maybeSingle<FilaWebinar>()

    if (eW || !w) {
      console.error('[sala] la sala existe pero su webinar no:', eW?.message ?? sala.webinar_id)
      return null
    }

    return {
      webinarId: w.id,
      nombre: w.nombre,
      ruta: sala.ruta,
      instanteUtc: new Date(w.instante).toISOString(),
      duracionMin: w.duracion_min,
      puertaMin: sala.puerta_min,
      videoProveedor: sala.video_proveedor,
      videoId: sala.video_id,
      ctaSegundo: sala.cta_segundo,
      ctaTexto: sala.cta_texto,
      ctaUrl: sala.cta_url,
      repeticionUrl: sala.repeticion_url,
      chatAbierto: sala.chat_abierto,
      grupoUrl: w.grupo_url,
    }
  } catch (e) {
    console.error('[sala] reventó al leer:', e instanceof Error ? e.message : e)
    return null
  }
}
