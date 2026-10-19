import { NextResponse } from 'next/server'
import { generarIcsVip } from '@/lib/calendario-vip'

/**
 * El archivo `.ics` del encuentro presencial de Destino Owners VIP.
 *
 * Gemelo de `/api/clase/calendario`, pero para el otro evento: ese es la clase
 * en vivo por internet, este es el presencial en La Fortuna. Dos eventos, dos
 * archivos — quien va a los dos se los agrega los dos.
 *
 * No escribe nada ni lee el CRM: es un GET público y estático.
 */

export function GET() {
  return new NextResponse(generarIcsVip(), {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      // Nombre en ASCII a propósito: una tilde acá llega destrozada a Windows.
      'content-disposition': 'attachment; filename="destino-owners-vip.ics"',
      'cache-control': 'public, max-age=3600',
    },
  })
}
