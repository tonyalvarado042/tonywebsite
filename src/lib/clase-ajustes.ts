import { getCrm } from '@/lib/crm'
import { CLASE, GRUPO } from '@/data/clase-copropiedad'
import { derivarClase, type ConfigClase } from '@/lib/clase-fechas.ts'

export type { ConfigClase }

/**
 * Los datos del lanzamiento de la clase: fecha, nombre, duración, etiqueta y
 * enlace del grupo. Salen del CRM si Tony lo tiene encendido; si no, del
 * código.
 *
 * ── Por qué ───────────────────────────────────────────────────────────────
 * Tony, 23 de octubre de 2026: «necesito que dejes en settings una parte del
 * lanzamiento del webinar, para que yo pueda meter la nueva fecha, los nuevos
 * enlaces del grupo y todo. Si en algún momento se llenara el grupo y tengo
 * que cambiar el enlace, que se pueda cambiar todo desde ahí. **No se modifica
 * ningún archivo**: todo desde la configuración del software.»
 *
 * Misma regla que ya rige el VIP: **los secretos van en Vercel, las decisiones
 * van en el CRM.** Van entre 5 y 10 lanzamientos cada ~15 días; con la fecha
 * en el código eso son 5 a 10 despliegues.
 *
 * ── La diferencia importante con `leerVip()` ──────────────────────────────
 * `leerVip()` devuelve `null` ante cualquier problema y la oferta desaparece.
 * **Acá eso sería un desastre:** la clase es el embudo principal y tiene pauta
 * encima. Si la base no responde, lo correcto no es esconder la clase sino
 * seguir mostrándola como la tiene el código. Por eso esta función **nunca
 * devuelve null** y el archivo de datos es siempre el piso.
 *
 * ── El interruptor ────────────────────────────────────────────────────────
 * `clase_desde_crm` arranca en `no` **a propósito**. La clase del 28 de
 * octubre está corriendo con pauta encima y Tony decidió cambiar el origen
 * después, en frío. Mientras diga `no`, esto devuelve exactamente lo del
 * código y el CRM es solo un formulario que no gobierna nada todavía.
 */

/** Lo que el código tiene hoy. El piso del que nunca se baja. */
function delCodigo(): ConfigClase {
  return {
    slug: CLASE.slug,
    nombre: CLASE.nombre,
    instanteUtc: CLASE.instanteUtc,
    fechaTexto: CLASE.fechaTexto,
    horaTexto: CLASE.horaTexto,
    duracionTexto: CLASE.duracionTexto,
    plataformaTexto: CLASE.plataformaTexto,
    grupoUrl: GRUPO.url,
  }
}

export async function leerClase(): Promise<ConfigClase> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('clave, valor')
      .in('clave', [
        'clase_desde_crm',
        'clase_nombre',
        'clase_instante',
        'clase_duracion_min',
        'clase_slug',
        'clase_grupo_url',
      ])

    if (error) {
      console.error('[clase] no se pudieron leer los ajustes:', error.message)
      return delCodigo()
    }

    const a = new Map((data ?? []).map((f) => [f.clave as string, (f.valor ?? '').trim()]))
    if (a.get('clase_desde_crm') !== 'si') return delCodigo()

    const instante = a.get('clase_instante') ?? ''
    const duracion = Number(a.get('clase_duracion_min'))
    const nombre = a.get('clase_nombre') ?? ''
    const slug = a.get('clase_slug') ?? ''
    const grupo = a.get('clase_grupo_url') ?? ''

    /*
      Si falta o no sirve UNO de los esenciales, se cae al código entero — no
      se mezcla. Media configuración del CRM y media del archivo es la forma
      más rápida de publicar una fecha que no concuerda con su etiqueta.
    */
    const fecha = new Date(instante)
    if (
      !instante || Number.isNaN(fecha.getTime()) ||
      !Number.isFinite(duracion) || duracion <= 0 ||
      !nombre || !slug || !grupo
    ) {
      console.error('[clase] ajustes del CRM incompletos; se usa lo del código')
      return delCodigo()
    }

    // `plataformaTexto` no está en el CRM a propósito: es copy que no cambia
    // de un lanzamiento a otro, igual que el texto del VIP.
    return derivarClase(instante, duracion, nombre, slug, grupo, CLASE.plataformaTexto)
  } catch (e) {
    console.error('[clase] no se pudieron leer los ajustes:', e)
    return delCodigo()
  }
}

/** La etiqueta del CRM que le toca a este lanzamiento: `clase:<slug>`. */
export function etiquetaDe(clase: ConfigClase): string {
  return `clase:${clase.slug}`
}

/**
 * Solo el enlace del grupo de WhatsApp — **y a propósito NO mira el
 * interruptor `clase_desde_crm`.**
 *
 * Tony: «si en algún momento se llenara el grupo y tengo que cambiar el
 * enlace, que se pueda cambiar todo desde ahí».
 *
 * Esto se separó del resto porque el riesgo es distinto. Cambiar de dónde sale
 * **la fecha** mientras hay pauta corriendo es delicado, y por eso espera al
 * 29. Cambiar **a cuál grupo entra la gente** no toca la fecha, ni la
 * etiqueta, ni el contador: es apuntar una redirección a otro lado, y es justo
 * lo que hay que poder hacer de un momento a otro cuando un grupo se llena.
 *
 * Si el CRM no responde o el campo está vacío, se usa el del código.
 */
export async function leerGrupoUrl(): Promise<string> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'clase_grupo_url')
      .maybeSingle()

    if (error) {
      console.error('[clase] no se pudo leer el grupo:', error.message)
      return GRUPO.url
    }
    const url = (data?.valor ?? '').trim()
    // Se exige que sea un enlace de grupo de verdad: un campo medio escrito no
    // debe mandar a nadie a una página rota, mejor al grupo que ya funciona.
    return url.startsWith('https://chat.whatsapp.com/') ? url : GRUPO.url
  } catch (e) {
    console.error('[clase] no se pudo leer el grupo:', e)
    return GRUPO.url
  }
}

/**
 * Si el muro de registrados —«Ya van N personas registradas»— se dibuja o no.
 *
 * Tony, 23 de octubre de 2026: «quitá la parte donde muestra el contador de
 * personas en las landing, y dejá opción para habilitar luego desde settings».
 *
 * ── Por qué apagado por defecto ───────────────────────────────────────────
 * El muro es prueba social, y la prueba social **corta en los dos sentidos**:
 * con 200 registrados empuja, con 6 frena. Ya tenía una guarda para no mostrar
 * un «ya van 0» —no se dibujaba con cero— pero no para el tramo incómodo de en
 * medio, que es justo el primer día de cada lanzamiento. Van entre 5 y 10
 * lanzamientos: ese primer día se repite diez veces.
 *
 * Así que la decisión de cuándo enseñar el número pasa a ser de Tony, desde el
 * CRM, y no una regla fija del código.
 *
 * Ante cualquier problema devuelve `false`: si la base no contesta, es mejor
 * una landing sin muro que una que se cae o que enseña un número que no se
 * pudo confirmar.
 */
export async function leerMuroActivo(): Promise<boolean> {
  try {
    const { data, error } = await getCrm()
      .from('cta_ajustes')
      .select('valor')
      .eq('clave', 'clase_muro_activo')
      .maybeSingle()

    if (error) {
      console.error('[clase] no se pudo leer el muro:', error.message)
      return false
    }
    return (data?.valor ?? '').trim() === 'si'
  } catch (e) {
    console.error('[clase] no se pudo leer el muro:', e)
    return false
  }
}
