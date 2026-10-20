/**
 * Los comodines que se pueden escribir en un correo de la cadena, y cómo se
 * expanden.
 *
 * Vive aparte del motor de envío por dos razones: se puede probar con
 * `node --test` sin base de datos, y la **vista previa del CRM usa estas
 * mismas funciones** en vez de una copia. Una vista previa que no usa el
 * código real miente justo cuando más importa.
 */

// Import relativo, no con alias: así este módulo se puede probar con
// `node --test` sin resolver los alias de TypeScript.
import type { ConfigVip } from './vip-fechas'

/** A dónde manda el VIP desde la cadena: la página de venta, no el checkout. */
const PAGINA_VIP = 'https://clase.tonyalvarado.com/vip'
/** El lugar no cambia entre lanzamientos, así que no viaja en los ajustes. */
const VIP_LUGAR = 'La Fortuna de San Carlos'

/**
 * Envuelve un párrafo a 68 caracteres.
 *
 * ⚠️ No es cosmética: estos correos salen en **texto plano** y los párrafos
 * llevan la fecha adentro, que cambia en cada lanzamiento. Cortar los
 * renglones a mano funciona para «miércoles 18 de noviembre» y se desarma con
 * «miércoles 2 de diciembre» — queda un renglón largo y el resto cortos.
 * Envolviendo por código, cualquier fecha sale pareja.
 */
function envolver(parrafo: string, ancho = 68): string {
  const salida: string[] = []
  let linea = ''
  for (const palabra of parrafo.split(/\s+/)) {
    if (linea && (linea + ' ' + palabra).length > ancho) {
      salida.push(linea)
      linea = palabra
    } else {
      linea = linea ? `${linea} ${palabra}` : palabra
    }
  }
  if (linea) salida.push(linea)
  return salida.join('\n')
}

/**
 * Expande los comodines del VIP en el cuerpo de un correo de la cadena.
 *
 * ── Por qué comodines y no texto escrito a mano ────────────────────────────
 * Los correos de la cadena viven en la base como **texto fijo**. Si el VIP se
 * escribe a mano ahí y después se apaga en el CRM —o se le mueve la fecha,
 * que es lo que va a pasar en cada lanzamiento— esos correos seguirían
 * anunciando una fecha muerta y un checkout cerrado.
 *
 * Con los comodines se escriben una vez y nunca se desincronizan: salen de
 * `leerVip()`, igual que las páginas y el correo de confirmación.
 *
 *   `{vip}`        el bloque completo — para el correo más cerca de la clase
 *   `{vip_linea}`  una sola línea     — para sembrarlo sin competir con el CTA
 *
 * ⚠️ Con el VIP apagado los dos **desaparecen enteros**, y se barren también
 * los renglones en blanco que los rodeaban. Si no, el correo saldría con un
 * hueco de tres líneas en el medio y se nota.
 */
export function expandirVip(cuerpo: string, vip: ConfigVip | null): string {
  if (!cuerpo.includes('{vip')) return cuerpo

  if (!vip?.enlacePago) {
    return cuerpo
      .replace(/\n*[ \t]*\{vip(_linea)?\}[ \t]*\n*/g, '\n\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  }

  const cupos = vip.cuposTexto ? ` · ${vip.cuposTexto} entradas` : ''
  const cuandoCorto = `${vip.fechaCorta.toLowerCase()} ${vip.fechaCortaMes}`

  const bloque = [
    '───────────────────────────────',
    'Y SI QUERÉS VERLO CON TUS PROPIOS OJOS',
    '───────────────────────────────',
    '',
    envolver(
      `En la clase ves los números en pantalla. El ${cuandoCorto} abrimos ` +
        'Bike & Bed para que los veas en el piso: el recorrido completo, ' +
        'la obra de HUMAYA, y preguntas en grupo conmigo y el equipo.'
    ),
    '',
    `  ${vip.fechaTexto} · ${vip.horarioTexto}`,
    `  ${VIP_LUGAR} · ${vip.precioTexto}${cupos}`,
    '',
    `  ${PAGINA_VIP}`,
    '',
    envolver(
      'No te convierte en socio de nada ni te da acceso a información que ' +
        'los demás no tengan. Es ir a verlo.'
    ),
  ].join('\n')

  const linea = [
    envolver(
      'P.D. Y si lo tuyo es verlo con los propios ojos en vez de en ' +
        `pantalla: el ${cuandoCorto} abrimos Bike & Bed y la obra de HUMAYA ` +
        `para un grupo chico${vip.cuposTexto ? `. Son ${vip.cuposTexto} entradas` : ''}.`
    ),
    PAGINA_VIP,
  ].join('\n')

  return cuerpo.replace(/\{vip\}/g, bloque).replace(/\{vip_linea\}/g, linea)
}

/**
 * Reemplaza `{nombre}` en el asunto y en el cuerpo.
 *
 * Tony lo pidio el 20-sep-2026: el nombre va en el titulo Y en el saludo.
 *
 * ⚠️ Si el contacto no tiene nombre, NO deja el hueco ni escribe «Hola ,».
 * Se limpia el placeholder y de paso se arreglan los restos: la coma o el
 * espacio que quedaba colgando. Un correo que dice «Hola ,» se lee peor que
 * uno que no saluda.
 */
export function personalizar(texto: string, nombre: string): string {
  if (nombre) return texto.replace(/\{nombre\}/g, nombre)
  return texto
    // El hueco puede llevar coma ANTES («…, {nombre}») o DESPUÉS
    // («{nombre}, el número…»). Hay que barrer las dos, si no queda una coma
    // suelta al principio de la frase.
    .replace(/\{nombre\}\s*,\s*/g, '')
    .replace(/\s*,?\s*\{nombre\}/g, '')
    .replace(/\s+([,.!?:])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .trim()
    // Al quitar el nombre del principio, la frase arrancaba en minúscula.
    .replace(/^([a-záéíóúñ¿¡])/u, (c) => c.toUpperCase())
}
