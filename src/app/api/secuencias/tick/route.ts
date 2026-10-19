import { NextRequest, NextResponse } from 'next/server'
import { cronAutorizado, cronDeVercelAutorizado } from '@/lib/secuencias'
import { correrElTick } from '@/lib/secuencias-tick'

/**
 * La puerta HTTP del tick de las automatizaciones.
 *
 * ⚠️ Acá **solo** pueden vivir los manejadores HTTP. Next 15 prohíbe cualquier
 * otro `export` en un `route.ts`, y cuando se viola la regla el build falla
 * señalando un archivo generado en `.next/types`, no este. Toda la lógica está
 * en `@/lib/secuencias-tick`, que es desde donde la comparte el mando del CRM.
 */

export async function POST(req: NextRequest) {
  if (!cronAutorizado(req.headers.get('x-cron-secret'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }
  return correrElTick(req)
}

/**
 * El reloj automático de Vercel, una vez al día. Llama con GET y su propia
 * cabecera de autorización.
 */
export async function GET(req: NextRequest) {
  if (!cronDeVercelAutorizado(req.headers.get('authorization'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }
  return correrElTick(req)
}
