import { NextResponse } from 'next/server'

/**
 * Fase 3 del DAB — IndexNow.
 *
 * Le avisa a Bing y a Yandex que una URL cambió, en vez de esperar a que pasen
 * a ver. Google no usa IndexNow; para Google sigue siendo Search Console.
 *
 * Cómo se usa (una vez desplegado):
 *
 *   curl -X POST https://www.tonyalvarado.com/api/indexnow \
 *     -H "content-type: application/json" \
 *     -H "x-indexnow-secret: <INDEXNOW_SECRET>" \
 *     -d '{"urls":["https://www.tonyalvarado.com/libros/el-nuevo-negocio-del-turismo-2027"]}'
 *
 * Sin `urls`, manda la home.
 *
 * ⚠️ Falta configurar `INDEXNOW_SECRET` en Vercel. Mientras no exista, la ruta
 * responde 503 a propósito — un endpoint que dispara a un servicio externo sin
 * llave lo puede llamar cualquiera.
 * Y ojo con la lección 3 del DAB: después de agregarla, verificar con
 * `vercel env pull` que NO haya quedado vacía.
 */

const HOST = 'www.tonyalvarado.com'
const SITE_URL = `https://${HOST}`

// El archivo /public/<KEY>.txt tiene que existir y contener exactamente esta llave.
// Así es como IndexNow comprueba que quien avisa es dueño del dominio.
const INDEXNOW_KEY = '3ec21507d32145ffc3e9e1c230028e09'

export async function POST(request: Request) {
  const secret = process.env.INDEXNOW_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'INDEXNOW_SECRET no está configurado en el entorno.' },
      { status: 503 }
    )
  }

  if (request.headers.get('x-indexnow-secret') !== secret) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 })
  }

  let urls: string[] = [SITE_URL]
  try {
    const body = await request.json()
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls
    }
  } catch {
    // Sin cuerpo o con JSON inválido — se manda la home y ya.
  }

  // IndexNow rechaza el lote entero si una sola URL es de otro dominio.
  const foreign = urls.filter((u) => !u.startsWith(`${SITE_URL}/`) && u !== SITE_URL)
  if (foreign.length > 0) {
    return NextResponse.json(
      { error: `Estas URLs no son de ${HOST}: ${foreign.join(', ')}` },
      { status: 400 }
    )
  }

  if (urls.length > 10_000) {
    return NextResponse.json(
      { error: 'IndexNow acepta un máximo de 10.000 URLs por envío.' },
      { status: 400 }
    )
  }

  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls,
      }),
    })

    // 200 = aceptado · 202 = aceptado, llave en validación. Los dos están bien.
    return NextResponse.json(
      { ok: res.ok, status: res.status, submitted: urls.length, urls },
      { status: res.ok ? 200 : 502 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'No se pudo contactar a IndexNow.', detail: String(error) },
      { status: 502 }
    )
  }
}
