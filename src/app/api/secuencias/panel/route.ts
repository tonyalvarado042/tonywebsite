import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getCrm } from '@/lib/crm'
import { cambiarSecuencias, secuenciasActivas } from '@/lib/secuencias'
import { correrElTick } from '../tick/route'

/**
 * El mando de las cadenas de correos, para que Tony las opere DESDE EL CRM.
 *
 * Nace el 20-sep-2026 porque el freno maestro vivía como variable de entorno
 * en Vercel y él lo dijo claro:
 *
 *   «No veo por qué deba salir del sistema para esto. No quiero estar
 *    entrando a Vercel.»
 *
 * ⚠️ CÓMO SE AUTENTICA, Y POR QUÉ ASÍ.
 * No usa el `x-cron-secret` como el reloj. Un secreto compartido tendría que
 * viajar hasta el navegador del CRM, y cualquiera que abra las herramientas de
 * desarrollo lo vería: sería la llave para dispararle correos a toda la lista.
 *
 * En vez de eso recibe el **token de la sesión de Supabase** del usuario que ya
 * inició sesión en el CRM, y acá se verifica contra Supabase:
 *   1. ¿El token es válido y no venció?
 *   2. ¿Ese usuario existe en `cta_usuarios`, está activo y es administrador?
 *
 * Nadie puede mandar nada sin ser un administrador con sesión abierta.
 *
 * Tres acciones:
 *   `estado`  — cómo está el interruptor (cualquier rol con sesión)
 *   `cambiar` — prender o apagar          (solo administrador)
 *   `correr`  — correr la cadena ahora    (solo administrador)
 *               con `prueba: true` NO manda nada, solo lista qué saldría
 */

/**
 * La llave PUBLICABLE de Supabase, que sirve para verificar la sesión de quien
 * llama desde el CRM.
 *
 * ⚠️ SE LEE DE LA BASE, no de código ni de Vercel. Regla de Tony del
 * 20-sep-2026: «todo debería ir a Supabase, una tabla; si el software tiene
 * persistencia, favor dejarla en la base de datos».
 *
 * Esto se puede hacer porque para llegar a la base solo hacen falta dos cosas
 * —la dirección de Supabase y la llave de servicio— y esas dos SÍ tienen que
 * vivir afuera: son las únicas que no se pueden guardar dentro de lo que
 * abren. Huevo y gallina. Todo lo demás vive en la base.
 *
 * Se guarda en memoria después de la primera lectura: el valor casi nunca
 * cambia y no tiene sentido ir a la base en cada llamada.
 */
const SUPABASE_URL = 'https://mlhhhwbgymobcxiklnoz.supabase.co'

let llaveGuardada: string | null = null

async function llavePublicable(): Promise<string | null> {
  if (llaveGuardada) return llaveGuardada
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'supabase_llave_publicable')
      .maybeSingle()

    if (error || !data?.valor) {
      console.error('[secuencias/panel] falta `supabase_llave_publicable` en cta_ajustes.')
      return null
    }
    llaveGuardada = data.valor
    return llaveGuardada
  } catch (e) {
    console.error('[secuencias/panel] no se pudo leer la llave publicable:', e)
    return null
  }
}

/**
 * Quién puede llamar a esto desde un navegador.
 *
 * ⚠️ LA LISTA VIVE EN LA BASE, en `cta_ajustes.origenes_permitidos`.
 *
 * La primera versión la tenía escrita en el código y se rompió el mismo día:
 * el CRM de Tony está en `crm-tony-alvarado-tonyalvarado.vercel.app` y acá
 * decía `crm-tony-alvarado.vercel.app`. Un pedazo de dominio de diferencia y
 * el navegador bloqueaba todo, con un mensaje que además culpaba al internet.
 *
 * Ahora, si el CRM cambia de dirección, se agrega en la base y listo: **no
 * hace falta desplegar el sitio**. Que un cambio de dominio obligue a un
 * despliegue es justo el tipo de amarre que Tony pidió quitar.
 *
 * La lista sigue siendo cerrada: nunca `*`. Esto dispara correos.
 */
let origenesGuardados: Set<string> | null = null

async function origenesPermitidos(): Promise<Set<string>> {
  if (origenesGuardados) return origenesGuardados
  try {
    const { data } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'origenes_permitidos')
      .maybeSingle()

    const lista = (data?.valor ?? '')
      .split(',')
      .map((o: string) => o.trim().replace(/\/+$/, ''))
      .filter(Boolean)

    origenesGuardados = new Set(lista)
    return origenesGuardados
  } catch (e) {
    console.error('[secuencias/panel] no se pudieron leer los orígenes:', e)
    return new Set()
  }
}

async function cors(origen: string | null): Promise<Record<string, string>> {
  if (!origen) return {}
  const permitidos = await origenesPermitidos()
  if (!permitidos.has(origen.replace(/\/+$/, ''))) return {}
  return {
    'Access-Control-Allow-Origin': origen,
    'Access-Control-Allow-Headers': 'authorization, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
}

/** El navegador pregunta primero si puede llamar. */
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: await cors(req.headers.get('origin')),
  })
}

type Quien = { id: string; rol: string; nombre: string | null }

/**
 * Verifica el token y devuelve quién es, o `null` si no pasa.
 *
 * Se usa el cliente ANÓNIMO a propósito: el de servicio se saltaría las
 * políticas y validaría cualquier cosa. Acá lo que se quiere es justamente
 * que Supabase diga si el token sirve.
 */
async function quienEs(req: NextRequest): Promise<Quien | 'sin-configurar' | null> {
  const cabecera = req.headers.get('authorization') ?? ''
  const token = cabecera.toLowerCase().startsWith('bearer ') ? cabecera.slice(7).trim() : ''
  if (!token) return null

  const publicable = await llavePublicable()
  // ⚠️ Esto NO es «no autorizado»: es que al servidor le falta configuración.
  // Antes los dos casos devolvían el mismo 401 y era imposible saber, desde
  // afuera, si el problema era el token de quien llama o la instalación.
  // Un error que no se puede diagnosticar cuesta horas el día que falle.
  if (!publicable) return 'sin-configurar'

  const anon = createClient(SUPABASE_URL, publicable, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const { data: sesion, error } = await anon.auth.getUser(token)
  if (error || !sesion?.user) return null

  // El token es válido; ahora, ¿qué rol tiene esta persona en el CRM?
  // Se consulta CON su propio token, así que las políticas de la base
  // siguen aplicando y nadie puede leer lo que no le toca.
  const comoEl = createClient(SUPABASE_URL, publicable, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  })

  const { data: fila } = await comoEl
    .from('cta_usuarios')
    .select('rol, activo, nombre')
    .eq('id', sesion.user.id)
    .maybeSingle()

  if (!fila || fila.activo === false) return null
  return { id: sesion.user.id, rol: String(fila.rol ?? ''), nombre: fila.nombre ?? null }
}

export async function POST(req: NextRequest) {
  const ch = await cors(req.headers.get('origin'))
  const responder = (cuerpo: unknown, status = 200) =>
    NextResponse.json(cuerpo, { status, headers: ch })

  const quien = await quienEs(req)

  if (quien === 'sin-configurar') {
    return responder(
      { ok: false, error: 'Al sitio le falta la llave publicable en cta_ajustes.' },
      500
    )
  }
  if (!quien) {
    return responder({ ok: false, error: 'Tenés que entrar al CRM para hacer esto.' }, 401)
  }

  let cuerpo: Record<string, unknown> = {}
  try {
    cuerpo = await req.json()
  } catch {
    return responder({ ok: false, error: 'Formato no válido.' }, 400)
  }

  const accion = typeof cuerpo.accion === 'string' ? cuerpo.accion : ''
  const esAdmin = quien.rol === 'administrador'

  // ── Ver cómo está: cualquiera con sesión ──
  if (accion === 'estado') {
    return responder({ ok: true, encendido: await secuenciasActivas(), puedeCambiar: esAdmin })
  }

  // De acá para abajo, solo administrador. Prender el interruptor o correr la
  // cadena es mandarle correos a gente real.
  if (!esAdmin) {
    return responder({ ok: false, error: 'Solo un administrador puede mover esto.' }, 403)
  }

  if (accion === 'cambiar') {
    const encendido = cuerpo.encendido === true
    await cambiarSecuencias(encendido)
    console.log(`[secuencias/panel] ${quien.nombre ?? quien.id} dejó los envíos en ${encendido ? 'ENCENDIDO' : 'apagado'}`)
    return responder({ ok: true, encendido })
  }

  if (accion === 'correr') {
    // `prueba` por defecto TRUE: si alguien llama mal a esto, lo peor que
    // pasa es que liste lo que habría mandado. Para mandar de verdad hay que
    // pedirlo de forma explícita.
    const prueba = cuerpo.prueba !== false
    const url = new URL(req.url)
    if (prueba) url.searchParams.set('dry', '1')

    const resultado = await correrElTick(new NextRequest(url, { method: 'GET' }))
    const datos = await resultado.json()

    console.log(
      `[secuencias/panel] ${quien.nombre ?? quien.id} corrió la cadena ` +
      `(${prueba ? 'prueba en seco' : 'ENVÍO REAL'})`
    )
    return responder({ ok: true, prueba, resultado: datos })
  }

  return responder({ ok: false, error: 'Acción desconocida.' }, 400)
}
