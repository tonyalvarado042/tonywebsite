import { createClient, type SupabaseClient } from '@supabase/supabase-js'

/**
 * Acceso al CRM de Tony (Supabase `mlhhhwbgymobcxiklnoz`).
 *
 * ⚠️ SOLO SERVIDOR. Usa la service-role key sobre teléfonos de personas reales.
 * Nunca importar esto desde un componente de cliente.
 *
 * ⚠️ El cliente se crea PEREZOSAMENTE — la lección que nos tumbó el build con
 * Resend: nada que exija un secreto se construye al cargar el módulo.
 *
 * ── Por qué `cta_contactos` y no la otra ────────────────────────────────────
 * En este proyecto hay DOS tablas de contactos:
 *   · public.crm_tony_alvarado_contactos  → 872 filas, la vieja del grupo de
 *     WhatsApp. La app del CRM NO la muestra.
 *   · crm_tony_alvarado.cta_contactos     → 1.375 filas, EL CRM DE VERDAD,
 *     el que se ve en crm-tony-alvarado.vercel.app
 *
 * La primera versión de este archivo escribía en la vieja: los leads caían
 * donde Tony nunca los habría visto. Corregido el 28-ago-2026.
 */

const SUPABASE_URL = 'https://mlhhhwbgymobcxiklnoz.supabase.co'

export const TABLA_CONTACTOS = 'cta_contactos'
export const TABLA_ACTIVIDADES = 'cta_actividades'
export const TABLA_RECURSOS = 'cta_recursos'
export const TABLA_AUTOMATIZACIONES = 'cta_automatizaciones'
export const TABLA_PASOS = 'cta_automatizacion_pasos'
export const TABLA_INSCRIPCIONES = 'cta_inscripciones'

let cliente: SupabaseClient | null = null

export function getCrm(): SupabaseClient {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!key) throw new Error('SUPABASE_SERVICE_ROLE_KEY no está configurada en el entorno.')
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
 * Normaliza a E.164. `telefono_whatsapp` tiene índice ÚNICO, así que sin
 * normalizar "8888-8888" y "+50688888888" serían dos personas distintas —
 * y esa persona recibiría todo dos veces, que es lo que quema una lista.
 *
 * Costa Rica por defecto: 8 dígitos sueltos se asumen +506.
 */
export function normalizarTelefono(entrada: string): string | null {
  const limpio = (entrada ?? '').replace(/[^\d+]/g, '')
  if (!limpio) return null

  if (limpio.startsWith('+')) {
    const d = limpio.slice(1)
    return d.length >= 8 && d.length <= 15 ? `+${d}` : null
  }

  const d = limpio.replace(/\D/g, '')
  if (d.length === 8) return `+506${d}`
  if (d.length === 11 && d.startsWith('506')) return `+${d}`
  if (d.length >= 10 && d.length <= 15) return `+${d}`
  return null
}

// ── Bitácora ────────────────────────────────────────────────────────────────

/**
 * ⚠️ Vocabulario CERRADO por CHECK en la base. Verificado el 28-ago-2026
 * contra `cta_actividades_tipo_check`:
 *   llamada · whatsapp · email · reunion · visita_sitio · nota
 * Lo específico va en `cuerpo`, no en `tipo`.
 */
export type TipoActividad = 'llamada' | 'whatsapp' | 'email' | 'reunion' | 'visita_sitio' | 'nota'

export async function registrarActividad(
  contactoId: string,
  tipo: TipoActividad,
  cuerpo: string
): Promise<void> {
  const { error } = await getCrm()
    .from(TABLA_ACTIVIDADES)
    .insert({ contacto_id: contactoId, tipo, cuerpo })

  // Perder una línea de bitácora es mejor que perder el lead: no se propaga.
  if (error) console.error('[crm] no se pudo registrar la actividad', tipo, error.message)
}

// ── Alta ────────────────────────────────────────────────────────────────────

export type ResultadoAlta = {
  contactoId: string
  yaExistia: boolean
  /** `baja = true` es un "no me escriba". No se revierte nunca. */
  estaDeBaja: boolean
}

export type DatosAlta = {
  /** Puede venir null: el boletín solo pide nombre y correo. */
  telefono: string | null
  nombre: string
  correo: string
  /** Qué formulario lo trajo. Va a `fuente_lead`. */
  fuente: 'recurso_gratis' | 'boletin'
  /** Etiqueta descriptiva, ej. 'recurso:ebook-turismo'. */
  etiqueta: string
  /** Texto para la bitácora. */
  detalle: string
}

/**
 * Da de alta o actualiza un contacto en el CRM real.
 *
 * ⚠️ `cta_contactos` tiene DOS índices únicos parciales: `email` y
 * `telefono_whatsapp`. Por eso se busca por LOS DOS antes de insertar —
 * si no, alguien que se registra con un correo ya conocido pero teléfono
 * nuevo (o al revés) haría reventar el insert.
 */
export async function altaContacto(datos: DatosAlta): Promise<ResultadoAlta> {
  const crm = getCrm()
  const campos = 'id, nombre_completo, email, telefono_whatsapp, tags, baja, fuente_lead'

  // Buscar por teléfono primero (más específico), luego por correo.
  let existente: Record<string, unknown> | null = null

  if (datos.telefono) {
    const { data, error } = await crm
      .from(TABLA_CONTACTOS).select(campos)
      .eq('telefono_whatsapp', datos.telefono).maybeSingle()
    if (error) throw new Error(`CRM: ${error.message}`)
    existente = data
  }
  if (!existente) {
    const { data, error } = await crm
      .from(TABLA_CONTACTOS).select(campos)
      .eq('email', datos.correo).maybeSingle()
    if (error) throw new Error(`CRM: ${error.message}`)
    existente = data
  }

  if (existente) {
    const id = existente.id as string
    const tags: string[] = Array.isArray(existente.tags) ? (existente.tags as string[]) : []

    const { error } = await crm.from(TABLA_CONTACTOS).update({
      // No se pisa un dato bueno con uno peor.
      nombre_completo: (existente.nombre_completo as string) || datos.nombre,
      email: (existente.email as string) || datos.correo,
      telefono_whatsapp: (existente.telefono_whatsapp as string) || datos.telefono,
      tags: tags.includes(datos.etiqueta) ? tags : [...tags, datos.etiqueta],
      ultimo_contacto: new Date().toISOString(),
      actualizado_el: new Date().toISOString(),
    }).eq('id', id)
    if (error) throw new Error(`CRM: ${error.message}`)

    await registrarActividad(id, 'nota', datos.detalle)
    return { contactoId: id, yaExistia: true, estaDeBaja: Boolean(existente.baja) }
  }

  const { data: creado, error } = await crm.from(TABLA_CONTACTOS).insert({
    nombre_completo: datos.nombre,
    email: datos.correo,
    telefono_whatsapp: datos.telefono,
    fuente_lead: datos.fuente,
    etapa_pipeline: 'nuevo',
    tags: [datos.etiqueta],
    ultimo_contacto: new Date().toISOString(),
  }).select('id').single()

  if (error) throw new Error(`CRM: ${error.message}`)

  await registrarActividad(creado.id, 'nota', datos.detalle)
  return { contactoId: creado.id, yaExistia: false, estaDeBaja: false }
}

// ── Inscripción en una automatización ───────────────────────────────────────

/**
 * Mete al contacto en la automatización que tenga enganchada ese recurso.
 * Si el recurso no tiene automatización, no hace nada — y está bien.
 */
export async function inscribirEnAutomatizacion(
  contactoId: string,
  automatizacionId: string | null,
  recursoId: string | null
): Promise<void> {
  if (!automatizacionId) return
  const crm = getCrm()

  // ¿Cuándo toca el primer paso?
  const { data: primerPaso } = await crm
    .from(TABLA_PASOS)
    .select('dias_despues')
    .eq('automatizacion_id', automatizacionId)
    .eq('activo', true)
    .order('paso', { ascending: true })
    .limit(1)
    .maybeSingle()

  const dias = primerPaso?.dias_despues ?? 0
  const cuando = new Date()
  cuando.setUTCDate(cuando.getUTCDate() + dias)

  // `unique (contacto_id, automatizacion_id)`: si ya estaba, no se reinicia.
  const { error } = await crm.from(TABLA_INSCRIPCIONES).upsert(
    {
      contacto_id: contactoId,
      automatizacion_id: automatizacionId,
      recurso_id: recursoId,
      paso_actual: 1,
      proximo_envio_el: cuando.toISOString().slice(0, 10),
      estado: 'activa',
    },
    { onConflict: 'contacto_id,automatizacion_id', ignoreDuplicates: true }
  )
  if (error) console.error('[crm] no se pudo inscribir en la automatización', error.message)
}

// ── Baja ────────────────────────────────────────────────────────────────────

/** Se respeta a la primera y no se revierte desde el sitio. */
export async function darDeBaja(contactoId: string, motivo: string): Promise<boolean> {
  const crm = getCrm()

  const { error } = await crm.from(TABLA_CONTACTOS)
    .update({ baja: true, actualizado_el: new Date().toISOString() })
    .eq('id', contactoId)

  if (error) {
    console.error('[crm] no se pudo dar de baja', error.message)
    return false
  }

  // Se detienen TODAS sus automatizaciones, no solo la que traía el correo.
  await crm.from(TABLA_INSCRIPCIONES)
    .update({ estado: 'detenida', proximo_envio_el: null, actualizado_el: new Date().toISOString() })
    .eq('contacto_id', contactoId)
    .eq('estado', 'activa')

  await registrarActividad(contactoId, 'nota', `Se dio de baja: ${motivo}`)
  return true
}

// ── Recursos (los lee el sitio, los edita Tony desde el CRM) ────────────────

export type RecursoCrm = {
  id: string
  slug: string
  titulo: string
  gancho: string | null
  descripcion: string | null
  formato: string | null
  imagen_url: string | null
  imagen_alt: string | null
  destino_url: string | null
  tipo: string
  estado: string
  acento: 'morado' | 'dorado' | 'calido'
  orden: number
  destacado: boolean
  automatizacion_id: string | null
}

/** Los que se muestran en /recursos. Los 'borrador' y 'archivado' quedan fuera. */
export async function traerRecursosPublicos(): Promise<RecursoCrm[]> {
  const { data, error } = await getCrm()
    .from(TABLA_RECURSOS)
    .select('*')
    .in('estado', ['disponible', 'proximamente'])
    .order('orden', { ascending: true })

  if (error) {
    console.error('[crm] no se pudieron traer los recursos', error.message)
    return []
  }
  return (data ?? []) as RecursoCrm[]
}

export async function traerRecursoPorSlug(slug: string): Promise<RecursoCrm | null> {
  const { data, error } = await getCrm()
    .from(TABLA_RECURSOS).select('*').eq('slug', slug).maybeSingle()
  if (error) {
    console.error('[crm] no se pudo traer el recurso', error.message)
    return null
  }
  return (data as RecursoCrm) ?? null
}
