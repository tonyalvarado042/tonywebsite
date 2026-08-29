import { NextRequest, NextResponse } from 'next/server'
import { getCrm, TABLA_CONTACTOS } from '@/lib/crm'
import { cronAutorizado, secuenciasActivas } from '@/lib/secuencias'

/**
 * Chequeo de salud del sistema de recursos.
 *
 * Dice qué está conectado y qué falta, para no tener que adivinar por qué algo
 * no funciona en producción.
 *
 * ⚠️ NUNCA devuelve el valor de un secreto — solo si está presente o no.
 * Va protegido igual, porque decir "qué falta" ya es información útil para
 * alguien con malas intenciones.
 *
 *   curl https://.../api/salud -H "x-cron-secret: cron:<CRM_SECRET>"
 */

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  if (!cronAutorizado(req.headers.get('x-cron-secret'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const llaves = {
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    CRM_SECRET: Boolean(process.env.CRM_SECRET),
    RESEND_API_KEY: Boolean(process.env.RESEND_API_KEY),
    CONTACT_FROM_EMAIL: Boolean(process.env.CONTACT_FROM_EMAIL),
  }

  // ¿La llave del CRM de verdad abre la puerta? Tenerla puesta no basta:
  // puede estar mal copiada o vencida. Se hace un conteo, sin traer datos.
  let crm: { conecta: boolean; contactos?: number; error?: string }
  try {
    const { count, error } = await getCrm()
      .from(TABLA_CONTACTOS)
      .select('id', { count: 'exact', head: true })
    crm = error ? { conecta: false, error: error.message } : { conecta: true, contactos: count ?? 0 }
  } catch (e) {
    crm = { conecta: false, error: e instanceof Error ? e.message : String(e) }
  }

  return NextResponse.json({
    ok: true,
    llaves,
    crm,
    secuencia: {
      activa: secuenciasActivas(),
      nota: secuenciasActivas()
        ? '⚠️ ENCENDIDA: los correos que no sean [BORRADOR] se van a enviar.'
        : 'Apagada. No sale ningún correo de secuencia.',
    },
  })
}
