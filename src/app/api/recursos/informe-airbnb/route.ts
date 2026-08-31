import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { REMITENTE_CON_NOMBRE } from '@/lib/correo'
import {
  altaContacto,
  inscribirEnAutomatizacion,
  normalizarTelefono,
  registrarActividad,
  traerRecursoPorSlug,
} from '@/lib/crm'
import { enlaceDeBaja } from '@/lib/secuencias'
import {
  ADVERTENCIA,
  SUPUESTOS_BASE,
  calcular,
  enDolares,
  enPorcentaje,
  type Supuestos,
} from '@/lib/calculadora-airbnb'

/**
 * Solicitud del informe de la calculadora de Airbnb.
 *
 * La calculadora se usa gratis y sin registro. Acá se entra SOLO cuando la
 * persona quiere el informe por correo, y ahí sí deja nombre, WhatsApp y
 * correo — igual que en los demás recursos, para que caiga en el mismo CRM.
 *
 * ⚠️ Los números se recalculan ACÁ, en el servidor, a partir de los supuestos
 * que mandó el navegador. Nunca se confía en un total que venga del cliente:
 * cualquiera puede mandar lo que quiera en un `fetch`.
 */

const SITIO = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tonyalvarado.com'
const SLUG = 'calculadora-airbnb'

let resendClient: Resend | null = null
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY no está configurada.')
  if (!resendClient) resendClient = new Resend(apiKey)
  return resendClient
}

const leer = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

/**
 * Deja pasar solo las claves que conocemos y solo si son números sanos.
 * Lo que venga raro se reemplaza por el valor base: así el informe nunca sale
 * con `NaN`, `Infinity` ni cifras absurdas.
 */
function limpiarSupuestos(crudo: unknown): Supuestos {
  const entrada = (crudo ?? {}) as Record<string, unknown>
  const salida = { ...SUPUESTOS_BASE }
  for (const clave of Object.keys(SUPUESTOS_BASE) as (keyof Supuestos)[]) {
    const v = entrada[clave]
    if (typeof v === 'number' && Number.isFinite(v) && v >= 0 && v <= 1_000_000_000) {
      salida[clave] = v
    }
  }
  return salida
}

export async function POST(req: NextRequest) {
  try {
    if (!(req.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json({ ok: false, error: 'Tipo de contenido no válido.' }, { status: 415 })
    }

    const crudo = await req.text()
    if (new TextEncoder().encode(crudo).byteLength > 8_000) {
      return NextResponse.json({ ok: false, error: 'Solicitud demasiado grande.' }, { status: 413 })
    }

    let cuerpo: Record<string, unknown>
    try {
      const p = JSON.parse(crudo)
      if (p === null || typeof p !== 'object' || Array.isArray(p)) throw new Error()
      cuerpo = p as Record<string, unknown>
    } catch {
      return NextResponse.json({ ok: false, error: 'Formato no válido.' }, { status: 400 })
    }

    // Honeypot — éxito silencioso, sin escribir nada.
    if (leer(cuerpo.website)) return NextResponse.json({ ok: true, filtrado: true })

    const nombre = leer(cuerpo.nombre)
    const correo = leer(cuerpo.correo)
    const prefijo = leer(cuerpo.prefijo)
    const telefonoCrudo = leer(cuerpo.whatsapp)
    const escenario = leer(cuerpo.escenario) || 'base'

    if (nombre.length < 2 || nombre.length > 100) {
      return NextResponse.json({ ok: false, error: 'Escribí tu nombre.' }, { status: 422 })
    }
    if (correo.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return NextResponse.json({ ok: false, error: 'Ese correo no se ve válido.' }, { status: 422 })
    }

    const telefono = normalizarTelefono(
      telefonoCrudo.startsWith('+') ? telefonoCrudo : `${prefijo}${telefonoCrudo}`
    )
    if (!telefono) {
      return NextResponse.json(
        { ok: false, error: 'Ese número no se ve válido. Revisá el país y el número.' },
        { status: 422 }
      )
    }

    const supuestos = limpiarSupuestos(cuerpo.supuestos)
    const r = calcular(supuestos)

    const alta = await altaContacto({
      telefono,
      nombre,
      correo,
      fuente: 'recurso_gratis',
      etiqueta: `recurso:${SLUG}`,
      detalle:
        `Pidió el informe de la calculadora de Airbnb (escenario ${escenario}). ` +
        `Costo total ${enDolares(r.total)} · capital inicial ${enDolares(r.capitalInicial)} · ` +
        `flujo mensual ${enDolares(r.flujoMensual)} · cap rate ${enPorcentaje(r.capRate)}.`,
    })

    // Si la calculadora está dada de alta como recurso en el CRM y tiene una
    // automatización enganchada, se inscribe igual que los demás. Si no está,
    // no pasa nada: el informe sale igual.
    if (!alta.estaDeBaja) {
      try {
        const recurso = await traerRecursoPorSlug(SLUG)
        if (recurso?.automatizacion_id) {
          await inscribirEnAutomatizacion(alta.contactoId, recurso.automatizacion_id, recurso.id)
        }
      } catch (e) {
        console.error('[informe-airbnb] no se pudo inscribir en la automatización:', e)
      }
    }

    // ── El informe por correo ──
    // Si el correo falla NO se rompe la petición: la solicitud ya quedó
    // guardada en el CRM y en pantalla se abre el análisis extendido igual.
    let correoEnviado = false
    try {
      const baja = alta.estaDeBaja ? '' : enlaceDeBaja(SITIO, alta.contactoId)

      await getResend().emails.send({
        from: REMITENTE_CON_NOMBRE,
        to: correo,
        subject: 'Tu informe de la calculadora de Airbnb',
        text: [
          `Hola ${nombre},`,
          '',
          `Este es el escenario que corriste (${escenario}) en la calculadora:`,
          '',
          'TU PROYECTO',
          `· Terreno: ${supuestos.landArea} m² a ${enDolares(supuestos.landPrice)}/m²`,
          `· Construcción: ${supuestos.buildArea} m² a ${enDolares(supuestos.buildCost)}/m²`,
          `· Unidades: ${supuestos.units}`,
          `· Tarifa por noche: ${enDolares(supuestos.adr)}`,
          `· Ocupación estimada: ${supuestos.occupancy}%`,
          `· Gastos operativos: ${supuestos.opex}%`,
          `· Prima: ${supuestos.downPayment}% · tasa ${supuestos.interest}% · plazo ${supuestos.term} años`,
          '',
          'LOS NÚMEROS',
          `· Costo total estimado: ${enDolares(r.total)}`,
          `· Capital inicial: ${enDolares(r.capitalInicial)}`,
          `· Crédito: ${enDolares(r.credito)}`,
          `· Cuota mensual estimada: ${enDolares(r.cuota)}`,
          `· Ingreso mensual: ${enDolares(r.ingresoBruto)}`,
          `· Gastos operativos: ${enDolares(r.gastos)}`,
          `· Flujo mensual estimado: ${enDolares(r.flujoMensual)}`,
          `· Cap rate: ${enPorcentaje(r.capRate)}`,
          `· Retorno sobre capital: ${enPorcentaje(r.retornoSobreCapital)}`,
          `· DSCR: ${r.dscr > 20 ? 'sin deuda' : `${r.dscr.toFixed(2)}x`}`,
          `· Ocupación de equilibrio: ${enPorcentaje(r.ocupacionEquilibrio)}`,
          `· Recuperación estimada: ${
            Number.isFinite(r.recuperacion) ? `${r.recuperacion.toFixed(1)} años` : 'flujo negativo'
          }`,
          '',
          'A 5 Y 10 AÑOS',
          `· Patrimonio año 5: ${enDolares(r.anio5.patrimonio)} (${enPorcentaje(r.anio5.anualizado)} anualizado)`,
          `· Patrimonio año 10: ${enDolares(r.anio10.patrimonio)} (${enPorcentaje(r.anio10.anualizado)} anualizado)`,
          '',
          'ADVERTENCIA',
          ADVERTENCIA,
          '',
          `Podés volver a correrla acá: ${SITIO}/recursos/${SLUG}`,
          '',
          'Si querés que veamos tu caso, respondé este correo — lo leo yo.',
          '',
          'Tony Alvarado',
          'tonyalvarado.com',
          ...(baja ? ['', '—', `Si no querés recibir más correos míos: ${baja}`] : []),
        ].join('\n'),
      })
      correoEnviado = true
      await registrarActividad(
        alta.contactoId,
        'email',
        `Informe de la calculadora de Airbnb enviado a ${correo}`
      )
    } catch (e) {
      console.error('[informe-airbnb] no se pudo enviar el informe:', e)
    }

    return NextResponse.json({ ok: true, correoEnviado, yaExistia: alta.yaExistia })
  } catch (e) {
    console.error('[informe-airbnb] error:', e)
    return NextResponse.json(
      { ok: false, error: 'No se pudo registrar la solicitud. Intentá de nuevo.' },
      { status: 500 }
    )
  }
}
