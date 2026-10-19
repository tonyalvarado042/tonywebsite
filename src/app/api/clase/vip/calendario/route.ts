import { NextResponse } from 'next/server'
import { generarIcsVip } from '@/lib/calendario-vip'
import { leerVip } from '@/lib/vip-ajustes'

/**
 * El archivo `.ics` del encuentro presencial de Destino Owners VIP.
 *
 * Gemelo de `/api/clase/calendario`, pero para el otro evento: ese es la clase
 * en vivo por internet, este es el presencial en La Fortuna. Dos eventos, dos
 * archivos — quien va a los dos se los agrega los dos.
 *
 * No escribe nada ni lee el CRM: es un GET público y estático.
 */

export async function GET() {
  // Apagado en el CRM: no se sirve un evento de una fecha que ya no se vende.
  const vip = await leerVip()
  if (!vip) return new NextResponse('No hay una fecha abierta.', { status: 404 })

  return new NextResponse(generarIcsVip(vip), {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      // Nombre en ASCII a propósito: una tilde acá llega destrozada a Windows.
      'content-disposition': 'attachment; filename="destino-owners-vip.ics"',
      /*
        ⚠️ 5 minutos, no una hora — y tiene que calzar con el `revalidate` de
        las páginas. Este archivo depende de ajustes que Tony cambia en el CRM
        (la fecha, el interruptor). Con una hora de caché, apagar el VIP o
        moverle la fecha seguiría entregando el evento viejo durante una hora,
        y alguien se lo agendaría. Se vio en producción: con `vip_activo` en
        «no» el CDN seguía sirviendo el `.ics` cacheado.
      */
      'cache-control': 'public, max-age=300',
    },
  })
}
