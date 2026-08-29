import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Acceso al CRM de Tony (Supabase `mlhhhwbgymobcxiklnoz`).
 *
 * ⚠️ SOLO SERVIDOR. La tabla tiene RLS prendida con CERO políticas: la llave
 * pública no lee ni escribe nada. Son teléfonos de personas reales. Este
 * módulo usa la service-role key y **nunca** debe importarse desde un
 * componente de cliente.
 *
 * ⚠️ El cliente se crea PEREZOSAMENTE — misma lección que nos tumbó el build
 * con Resend: nada que exija un secreto se construye al cargar el módulo.
 */

const SUPABASE_URL = 'https://mlhhhwbgymobcxiklnoz.supabase.co'

export const TABLA_CONTACTOS = 'crm_tony_alvarado_contactos'
export const TABLA_EVENTOS = 'crm_tony_alvarado_eventos'

let cliente: SupabaseClient | null = null

export function getCrm(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada en el entorno.')
  }
  if (!cliente) {
    cliente = createClient(SUPABASE_URL, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cliente
}

export function hayCrm(): boolean {
  return Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
}

// ── Teléfono ────────────────────────────────────────────────────────────────

/**
 * Normaliza a E.164 porque **el teléfono es la llave de la tabla**. Si no se
 * normaliza, "8888-8888" y "+50688888888" quedan como dos personas distintas
 * y esa persona recibe todo dos veces — que es exactamente lo que quema una
 * lista (ver la nota `mi-crm` del cerebro).
 *
 * Costa Rica es el default: 8 dígitos sin prefijo se asumen +506.
 * Devuelve null si no parece un teléfono.
 */
export function normalizarTelefono(entrada: string): string | null {
  const limpio = (entrada ?? '').replace(/[^\d+]/g, '')
  if (!limpio) return null

  if (limpio.startsWith('+')) {
    const digitos = limpio.slice(1)
    if (digitos.length < 8 || digitos.length > 15) return null
    return `+${digitos}`
  }

  const digitos = limpio.replace(/\D/g, '')

  // 8 dígitos → número tico sin prefijo
  if (digitos.length === 8) return `+506${digitos}`
  // ya viene con 506 al frente
  if (digitos.length === 11 && digitos.startsWith('506')) return `+${digitos}`
  // otro país escrito sin el +
  if (digitos.length >= 10 && digitos.length <= 15) return `+${digitos}`

  return null
}

// ── Eventos ─────────────────────────────────────────────────────────────────

/**
 * ⚠️ La columna `tipo` tiene un CHECK en la base con un vocabulario CERRADO.
 * Verificado el 28-ago-2026 contra `crm_tony_alvarado_eventos_tipo_check`:
 *
 *   nota · llamada · whatsapp · correo_enviado · correo_recibido ·
 *   reunion · cambio_estado · baja
 *
 * Un tipo fuera de esa lista revienta el insert. Lo específico va en
 * `detalle`, no en `tipo`.
 */
export type TipoEvento =
  | 'nota'
  | 'llamada'
  | 'whatsapp'
  | 'correo_enviado'
  | 'correo_recibido'
  | 'reunion'
  | 'cambio_estado'
  | 'baja'

export async function registrarEvento(
  contactoId: string,
  tipo: TipoEvento,
  detalle: string
): Promise<void> {
  const { error } = await getCrm()
    .from(TABLA_EVENTOS)
    .insert({ contacto_id: contactoId, tipo, detalle })

  // Un evento que no se pudo anotar no debe tumbar la operación principal:
  // es peor perder el lead que perder la línea de bitácora.
  if (error) {
    console.error('[crm] no se pudo registrar el evento', tipo, error.message)
  }
}

// ── Alta de contacto ────────────────────────────────────────────────────────

export type ResultadoAlta = {
  contactoId: string
  yaExistia: boolean
  /** true si la persona ya se había dado de baja: NO se le vuelve a escribir. */
  estaDeBaja: boolean
}

/**
 * Da de alta (o actualiza) un contacto que pidió un recurso.
 *
 * Reglas que respeta, de la nota `mi-crm`:
 *  · Una sola fila por teléfono. Las listas son etiquetas, no tablas.
 *  · `baja = true` es un "no me escriba". **Nunca se revierte automáticamente**,
 *    ni siquiera si la persona vuelve a llenar el formulario.
 *  · `nombre` y `correo` solo se rellenan si venían vacíos: no se pisa un dato
 *    bueno con uno peor.
 */
export async function altaContactoPorRecurso(datos: {
  telefono: string
  nombre: string
  correo: string
  recursoSlug: string
  recursoTitulo: string
}): Promise<ResultadoAlta> {
  const crm = getCrm()
  const etiqueta = `recurso:${datos.recursoSlug}`
  const origen = `recurso-gratis:${datos.recursoSlug}`

  const { data: existente, error: errorBusca } = await crm
    .from(TABLA_CONTACTOS)
    .select('id, nombre, correo, etiquetas, baja, origen')
    .eq('telefono', datos.telefono)
    .maybeSingle()

  if (errorBusca) throw new Error(`CRM: ${errorBusca.message}`)

  if (existente) {
    const etiquetas: string[] = Array.isArray(existente.etiquetas) ? existente.etiquetas : []
    const etiquetasNuevas = etiquetas.includes(etiqueta) ? etiquetas : [...etiquetas, etiqueta]

    const { error: errorUpd } = await crm
      .from(TABLA_CONTACTOS)
      .update({
        nombre: existente.nombre || datos.nombre,
        correo: existente.correo || datos.correo,
        etiquetas: etiquetasNuevas,
        origen: existente.origen || origen,
        actualizado_en: new Date().toISOString(),
      })
      .eq('id', existente.id)

    if (errorUpd) throw new Error(`CRM: ${errorUpd.message}`)

    await registrarEvento(
      existente.id,
      'nota',
      `Pidió el recurso gratis «${datos.recursoTitulo}» (${datos.recursoSlug})`
    )

    return {
      contactoId: existente.id,
      yaExistia: true,
      estaDeBaja: Boolean(existente.baja),
    }
  }

  const { data: creado, error: errorIns } = await crm
    .from(TABLA_CONTACTOS)
    .insert({
      telefono: datos.telefono,
      nombre: datos.nombre,
      correo: datos.correo,
      etiquetas: [etiqueta],
      origen,
      estado: 'nuevo',
    })
    .select('id')
    .single()

  if (errorIns) throw new Error(`CRM: ${errorIns.message}`)

  await registrarEvento(
    creado.id,
    'nota',
    `Pidió el recurso gratis «${datos.recursoTitulo}» (${datos.recursoSlug})`
  )

  return { contactoId: creado.id, yaExistia: false, estaDeBaja: false }
}

// ── Baja ────────────────────────────────────────────────────────────────────

/** Marca la baja. Es irreversible desde el sitio: se respeta a la primera. */
export async function darDeBaja(contactoId: string, motivo: string): Promise<boolean> {
  const crm = getCrm()
  const { error } = await crm
    .from(TABLA_CONTACTOS)
    .update({
      baja: true,
      proximo_paso: null,
      proximo_paso_el: null,
      actualizado_en: new Date().toISOString(),
    })
    .eq('id', contactoId)

  if (error) {
    console.error('[crm] no se pudo dar de baja', error.message)
    return false
  }

  await registrarEvento(contactoId, 'baja', motivo)
  return true
}
