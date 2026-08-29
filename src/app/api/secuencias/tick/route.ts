import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import {
  getCrm,
  registrarActividad,
  TABLA_INSCRIPCIONES,
  TABLA_PASOS,
} from '@/lib/crm'
import { cronAutorizado, enlaceDeBaja, esBorrador, secuenciasActivas } from '@/lib/secuencias'

/**
 * Un "tick" de las automatizaciones.
 *
 * Recorre `cta_inscripciones`, manda el correo que toca, lo anota en la
 * bitácora del contacto y adelanta al siguiente paso.
 *
 * ── Los frenos, en orden ───────────────────────────────────────────────────
 * 1. `SECUENCIAS_ACTIVAS` tiene que valer 'si'. Viene apagado.
 * 2. La automatización tiene que estar `activa = true`. Vienen apagadas.
 * 3. Un paso con [BORRADOR] no sale nunca, aunque se quiten los frenos 1 y 2.
 * 4. Solo se escribe a contactos con `baja = false`.
 *
 * `?dry=1` recorre todo y dice a quién LE TOCARÍA, sin enviar ni tocar la base.
 * Esa es la prueba que Tony pide ver antes de autorizar cualquier envío.
 *
 *   curl -X POST https://.../api/secuencias/tick?dry=1 \
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
      nota: 'Interruptor general apagado (SECUENCIAS_ACTIVAS ≠ "si"). No se envió nada.',
    })
  }

  const crm = getCrm()
  const hoy = new Date().toISOString().slice(0, 10)

  const { data: pendientes, error } = await crm
    .from(TABLA_INSCRIPCIONES)
    .select(`
      id, contacto_id, automatizacion_id, paso_actual, proximo_envio_el,
      cta_contactos!inner ( id, nombre_completo, email, baja ),
      cta_automatizaciones!inner ( id, nombre, activa )
    `)
    .eq('estado', 'activa')
    .lte('proximo_envio_el', hoy)
    .limit(MAX_POR_TICK)

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
  }

  const resultado = {
    ok: true,
    prueba,
    candidatos: pendientes?.length ?? 0,
    enviados: 0,
    detalle: [] as { correo: string; paso: number; automatizacion: string; accion: string }[],
  }

  for (const ins of (pendientes ?? []) as unknown as Array<{
    id: string
    contacto_id: string
    automatizacion_id: string
    paso_actual: number
    cta_contactos: { nombre_completo: string | null; email: string | null; baja: boolean }
    cta_automatizaciones: { nombre: string; activa: boolean }
  }>) {
    const contacto = ins.cta_contactos
    const automatizacion = ins.cta_automatizaciones
    const anotar = (accion: string) =>
      resultado.detalle.push({
        correo: contacto.email ?? '(sin correo)',
        paso: ins.paso_actual,
        automatizacion: automatizacion.nombre,
        accion,
      })

    // Freno 4 — la baja manda por encima de todo.
    if (contacto.baja) {
      if (!prueba) {
        await crm.from(TABLA_INSCRIPCIONES)
          .update({ estado: 'detenida', proximo_envio_el: null })
          .eq('id', ins.id)
      }
      anotar('detenida: el contacto está de baja')
      continue
    }

    if (!contacto.email) { anotar('saltado: sin correo'); continue }

    // Freno 2 — la automatización tiene que estar encendida.
    if (!automatizacion.activa) { anotar('bloqueado: automatización apagada'); continue }

    const { data: paso } = await crm
      .from(TABLA_PASOS)
      .select('paso, asunto, cuerpo, activo')
      .eq('automatizacion_id', ins.automatizacion_id)
      .eq('paso', ins.paso_actual)
      .maybeSingle()

    if (!paso) {
      // Se acabaron los pasos: la inscripción termina.
      if (!prueba) {
        await crm.from(TABLA_INSCRIPCIONES)
          .update({ estado: 'terminada', proximo_envio_el: null })
          .eq('id', ins.id)
      }
      anotar('automatización terminada')
      continue
    }

    if (!paso.activo) { anotar('saltado: paso desactivado'); continue }

    // Freno 3 — el relleno no sale nunca.
    if (esBorrador({ asunto: paso.asunto ?? '', cuerpo: paso.cuerpo ?? '' })) {
      anotar('bloqueado: el texto todavía es [BORRADOR]')
      continue
    }

    if (prueba) { anotar('se enviaría'); continue }

    try {
      const de = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'
      await getResend().emails.send({
        from: `Tony Alvarado <${de}>`,
        to: contacto.email,
        subject: paso.asunto ?? '',
        text: [
          `Hola ${contacto.nombre_completo ?? ''},`.trim(),
          '',
          paso.cuerpo ?? '',
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          '',
          '—',
          `Si no querés recibir más correos míos: ${enlaceDeBaja(SITIO, ins.contacto_id)}`,
        ].join('\n'),
      })

      await registrarActividad(
        ins.contacto_id,
        'email',
        `${automatizacion.nombre} · correo ${ins.paso_actual} enviado a ${contacto.email}`
      )

      // Adelantar al siguiente paso, si existe.
      const siguiente = ins.paso_actual + 1
      const { data: proximo } = await crm
        .from(TABLA_PASOS)
        .select('dias_despues')
        .eq('automatizacion_id', ins.automatizacion_id)
        .eq('paso', siguiente)
        .maybeSingle()

      if (proximo) {
        const cuando = new Date()
        cuando.setUTCDate(cuando.getUTCDate() + Math.max(1, proximo.dias_despues - 0))
        await crm.from(TABLA_INSCRIPCIONES).update({
          paso_actual: siguiente,
          proximo_envio_el: cuando.toISOString().slice(0, 10),
          actualizado_el: new Date().toISOString(),
        }).eq('id', ins.id)
      } else {
        await crm.from(TABLA_INSCRIPCIONES).update({
          estado: 'terminada',
          proximo_envio_el: null,
          actualizado_el: new Date().toISOString(),
        }).eq('id', ins.id)
      }

      resultado.enviados += 1
      anotar('enviado')
    } catch (e) {
      console.error('[secuencias/tick] falló el envío a', contacto.email, e)
      anotar('falló el envío')
    }
  }

  return NextResponse.json(resultado)
}
