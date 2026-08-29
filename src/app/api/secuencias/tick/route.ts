import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { getCrm, registrarEvento, TABLA_CONTACTOS } from '@/lib/crm'
import {
  correoDelPaso,
  cronAutorizado,
  enlaceDeBaja,
  esBorrador,
  fechaDelPaso,
  leerMarca,
  marcaDePaso,
  secuenciasActivas,
} from '@/lib/secuencias'

/**
 * Un "tick" de la secuencia de calentamiento.
 *
 * Busca a quién le toca hoy, le manda el correo que corresponde, lo anota en
 * la bitácora del CRM y lo adelanta al siguiente paso.
 *
 * ── Los tres frenos, en orden ───────────────────────────────────────────────
 * 1. `SECUENCIAS_ACTIVAS` tiene que valer 'si'. Viene apagado.
 * 2. Los correos con [BORRADOR] nunca salen, aunque el freno esté quitado.
 * 3. Solo se le escribe a quien cumple `baja = false` y `estado <> 'no_contactar'`.
 *
 * Modo prueba: `?dry=1` hace todo el recorrido y devuelve a quién LE TOCARÍA,
 * sin mandar ni un correo y sin tocar la base. Es la "prueba" que Tony pide
 * ver antes de autorizar cualquier envío.
 *
 * Se llama con:
 *   curl -X POST https://.../api/secuencias/tick \
 *     -H "x-cron-secret: cron:<CRM_SECRET>"
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'
const MAX_POR_TICK = 200

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

export async function POST(req: NextRequest) {
  if (!cronAutorizado(req.headers.get('x-cron-secret'))) {
    return NextResponse.json({ ok: false, error: 'No autorizado.' }, { status: 401 })
  }

  const prueba = new URL(req.url).searchParams.get('dry') === '1'

  if (!prueba && !secuenciasActivas()) {
    return NextResponse.json({
      ok: true,
      enviados: 0,
      nota: 'La secuencia está apagada (SECUENCIAS_ACTIVAS distinto de "si"). No se envió nada.',
    })
  }

  const hoy = new Date().toISOString().slice(0, 10)

  const { data: pendientes, error } = await getCrm()
    .from(TABLA_CONTACTOS)
    .select('id, nombre, correo, proximo_paso, proximo_paso_el, creado_en')
    .eq('baja', false)
    .neq('estado', 'no_contactar')
    .not('correo', 'is', null)
    .like('proximo_paso', 'secuencia:%')
    .lte('proximo_paso_el', hoy)
    .limit(MAX_POR_TICK)

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  const resultado = {
    ok: true,
    prueba,
    candidatos: pendientes?.length ?? 0,
    enviados: 0,
    saltados: [] as string[],
    detalle: [] as { correo: string; paso: number; recurso: string; accion: string }[],
  }

  for (const c of pendientes ?? []) {
    const marca = leerMarca(c.proximo_paso)
    if (!marca) {
      resultado.saltados.push(`marca ilegible: ${c.proximo_paso}`)
      continue
    }

    const correoDef = correoDelPaso(marca.paso)
    if (!correoDef) {
      // Terminó la secuencia: se limpia para que no vuelva a salir en la consulta.
      if (!prueba) {
        await getCrm()
          .from(TABLA_CONTACTOS)
          .update({ proximo_paso: null, proximo_paso_el: null })
          .eq('id', c.id)
      }
      resultado.detalle.push({ correo: c.correo!, paso: marca.paso, recurso: marca.slug, accion: 'secuencia terminada' })
      continue
    }

    // Freno 2: el relleno no sale nunca.
    if (esBorrador(correoDef)) {
      resultado.saltados.push(`paso ${marca.paso} todavía es [BORRADOR]`)
      resultado.detalle.push({ correo: c.correo!, paso: marca.paso, recurso: marca.slug, accion: 'bloqueado: borrador' })
      continue
    }

    if (prueba) {
      resultado.detalle.push({ correo: c.correo!, paso: marca.paso, recurso: marca.slug, accion: 'se enviaría' })
      continue
    }

    try {
      const de = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
      await getResend().emails.send({
        from: `Tony Alvarado <${de}>`,
        to: c.correo!,
        subject: correoDef.asunto,
        text: [
          `Hola ${c.nombre || ''},`.trim(),
          '',
          correoDef.cuerpo,
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          '',
          '—',
          `Si no querés recibir más correos míos: ${enlaceDeBaja(SITIO, c.id)}`,
        ].join('\n'),
      })

      await registrarEvento(c.id, 'correo_enviado', `Secuencia ${marca.slug} · correo ${marca.paso}/5 → ${c.correo}`)

      const siguiente = marca.paso + 1
      const fecha = correoDelPaso(siguiente)
        ? fechaDelPaso(new Date(c.creado_en), siguiente)
        : null

      await getCrm()
        .from(TABLA_CONTACTOS)
        .update({
          proximo_paso: fecha ? marcaDePaso(marca.slug, siguiente) : null,
          proximo_paso_el: fecha,
          ultimo_contacto_el: new Date().toISOString(),
        })
        .eq('id', c.id)

      resultado.enviados += 1
      resultado.detalle.push({ correo: c.correo!, paso: marca.paso, recurso: marca.slug, accion: 'enviado' })
    } catch (e) {
      console.error('[secuencias/tick] falló el envío a', c.correo, e)
      resultado.saltados.push(`falló el envío a ${c.correo}`)
    }
  }

  return NextResponse.json(resultado)
}
