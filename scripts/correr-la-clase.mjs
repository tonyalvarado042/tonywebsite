#!/usr/bin/env node
/**
 * Corre la fecha de la clase de copropiedad.
 *
 *   node scripts/correr-la-clase.mjs 2026-11-11
 *   node scripts/correr-la-clase.mjs 2026-11-11 --vip 2026-11-29
 *   node scripts/correr-la-clase.mjs 2026-11-11 --escribir
 *
 * Sin `--escribir` **no toca nada**: muestra qué cambiaría y se calla. Es el
 * mismo patrón del `?dry=1` del motor de correos — en esta casa nada que
 * modifique algo corre de primera sin que se vea antes.
 *
 * ── Por qué existe ──────────────────────────────────────────────────────────
 * Mover la clase una semana, a mano, fueron ocho lugares distintos y uno se
 * rompió en silencio: el filtro de un envío que guarda la etiqueta COMO TEXTO
 * y, al cambiar el slug, quedó apuntando a una etiqueta inexistente. No dio
 * error: simplemente le habría pegado a cero personas, y eso se descubre el
 * día del evento.
 *
 * ── Qué hace y qué NO ───────────────────────────────────────────────────────
 * Hace lo que vive en este repo: reescribe el bloque de la fecha y genera el
 * SQL del CRM y la tabla de enlaces.
 *
 * **No toca la base.** El SQL sale a un archivo para correrlo donde viven las
 * credenciales. Un script con la llave de servicio adentro es una llave más
 * que cuidar, y acá no hace falta.
 *
 * **No toca ManyChat, WhatsApp ni los posts.** Eso vive afuera; el script los
 * lista al final para que no se olviden, que es como se olvidan.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..')
const DATOS = join(RAIZ, 'src/data/clase-copropiedad.ts')

/**
 * Costa Rica es UTC-6 TODO el año: no tiene horario de verano.
 *
 * Por eso la conversión es una suma fija y no hace falta una librería de zonas
 * horarias. El día que esto cambie —no va a pasar— deja de valer.
 */
export const DESFASE_CR = 6

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']

/** «setiembre», no «septiembre»: así se escribe en Costa Rica y así está todo. */
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'setiembre', 'octubre', 'noviembre', 'diciembre',
]
const MESES_CORTOS = [
  'ene', 'feb', 'mar', 'abr', 'may', 'jun',
  'jul', 'ago', 'set', 'oct', 'nov', 'dic',
]

/**
 * De «2026-11-11» + «19:00» a todo lo que el proyecto necesita.
 *
 * Se arma el instante en UTC sumando el desfase, y DESPUÉS se leen el día y el
 * mes de vuelta en hora de Costa Rica. Leerlos del string de entrada sería más
 * corto y estaría mal: una clase a las 7 p.m. cae al día siguiente en UTC, y
 * el nombre del día tiene que ser el de acá, no el de Greenwich.
 */
export function calcular(fechaISO, hora = '19:00') {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaISO)
  if (!m) throw new Error(`La fecha va como 2026-11-11, no «${fechaISO}».`)
  const h = /^(\d{1,2}):(\d{2})$/.exec(hora)
  if (!h) throw new Error(`La hora va como 19:00, no «${hora}».`)

  const [, anio, mes, dia] = m.map(Number)
  const [, hh, mm] = h.map(Number)

  const instante = new Date(Date.UTC(anio, mes - 1, dia, hh + DESFASE_CR, mm, 0))
  if (Number.isNaN(instante.getTime())) throw new Error(`Esa fecha no existe: ${fechaISO}.`)

  // De vuelta a hora de Costa Rica para nombrar el día.
  const enCR = new Date(instante.getTime() - DESFASE_CR * 3600 * 1000)
  const diaSemana = DIAS[enCR.getUTCDay()]
  const diaMes = enCR.getUTCDate()
  const mesIdx = enCR.getUTCMonth()

  const h12 = hh % 12 === 0 ? 12 : hh % 12
  const sufijo = hh < 12 ? 'a.m.' : 'p.m.'

  return {
    instanteUtc: instante.toISOString().replace(/\.\d{3}Z$/, 'Z'),
    fechaTexto: `${diaSemana[0].toUpperCase()}${diaSemana.slice(1)} ${diaMes} de ${MESES[mesIdx]}`,
    fechaLarga: `${diaSemana} ${diaMes} de ${MESES[mesIdx]} de ${anio}`,
    slug: `copropiedad-${diaMes}-${MESES_CORTOS[mesIdx]}`,
    campana: `clase-${diaMes}${MESES_CORTOS[mesIdx]}`,
    horaTexto: `${h12}:${String(mm).padStart(2, '0')} ${sufijo} Costa Rica`,
    diaSemana,
    /** 9 a.m. de ese mismo día, en UTC. Es cuando sale el recordatorio. */
    recordatorioUtc: new Date(Date.UTC(anio, mes - 1, dia, 9 + DESFASE_CR, 0, 0))
      .toISOString().replace(/\.\d{3}Z$/, 'Z'),
  }
}

/** Lo que hay hoy en el archivo, para saber de dónde venimos. */
export function leerActual(texto) {
  const dentro = (nombre) => {
    const i = texto.indexOf(`export const ${nombre} = {`)
    if (i === -1) throw new Error(`No encontré el bloque ${nombre} en el archivo de datos.`)
    const j = texto.indexOf('} as const', i)
    return texto.slice(i, j)
  }
  const sacar = (bloque, llave) => {
    const r = new RegExp(`${llave}:\\s*'([^']*)'`).exec(bloque)
    if (!r) throw new Error(`No encontré «${llave}» en el bloque.`)
    return r[1]
  }
  const clase = dentro('CLASE')
  const vip = dentro('VIP')
  return {
    slug: sacar(clase, 'slug'),
    instanteUtc: sacar(clase, 'instanteUtc'),
    fechaTexto: sacar(clase, 'fechaTexto'),
    vipFechaTexto: sacar(vip, 'fechaTexto'),
  }
}

/**
 * Reescribe el archivo de datos.
 *
 * Las sustituciones se hacen DENTRO del bloque de cada constante, no sobre el
 * archivo entero. `CLASE` y `VIP` tienen las dos un `fechaTexto`: un reemplazo
 * global cambiaría la del VIP al mover la clase, en silencio.
 */
export function reescribir(texto, nuevo, vipTexto = null) {
  const enBloque = (nombre, pares) => {
    const i = texto.indexOf(`export const ${nombre} = {`)
    const j = texto.indexOf('} as const', i)
    let bloque = texto.slice(i, j)
    for (const [llave, valor] of pares) {
      const re = new RegExp(`(${llave}:\\s*')([^']*)(')`)
      if (!re.test(bloque)) throw new Error(`No encontré «${llave}» dentro de ${nombre}.`)
      bloque = bloque.replace(re, `$1${valor}$3`)
    }
    texto = texto.slice(0, i) + bloque + texto.slice(j)
  }

  enBloque('CLASE', [
    ['slug', nuevo.slug],
    ['instanteUtc', nuevo.instanteUtc],
    ['fechaTexto', nuevo.fechaTexto],
  ])
  if (vipTexto) enBloque('VIP', [['fechaTexto', vipTexto]])

  // El comentario de arriba y el mensaje de WhatsApp: si quedan con la fecha
  // vieja, la próxima persona que los lea cree que el cambio no se hizo.
  texto = texto.replace(
    /^ \* \w+ \d+ de \w+ de \d{4}, [\d:]+ [ap]\.m\. hora de Costa Rica\.$/m,
    ` * ${nuevo.fechaLarga[0].toUpperCase()}${nuevo.fechaLarga.slice(1)}, ${nuevo.horaTexto.replace(' Costa Rica', '')} hora de Costa Rica.`
  )
  texto = texto.replace(
    /^ \* Verificado: el \d+ de \w+ de \d{4} cae \w+\.$/m,
    ` * Verificado: el ${nuevo.fechaLarga.replace(/^\w+ /, '')} cae ${nuevo.diaSemana}.`
  )
  texto = texto.replace(
    /(me registré a la clase del )\d+ de \w+/,
    `$1${nuevo.fechaTexto.replace(/^\w+ /, '')}`
  )
  return texto
}

/** El SQL del CRM. Se emite a un archivo; nadie lo corre desde acá. */
export function sql(viejo, nuevo) {
  return `-- Correr la clase: ${viejo.slug}  ->  ${nuevo.slug}
-- Generado por scripts/correr-la-clase.mjs
--
-- Corré TODO de una. Las medidas de antes y después están a propósito: si la
-- huella md5 cambia, se creó o se borró una fila y algo salió mal.

-- ── 1. Antes ────────────────────────────────────────────────────────────────
select 'ANTES' as cuando,
       (select count(*) from crm_tony_alvarado.cta_contactos) as contactos,
       (select count(*) from crm_tony_alvarado.cta_contactos
         where '${'clase:' + viejo.slug}' = any(tags)) as con_la_vieja,
       (select count(*) from crm_tony_alvarado.cta_contactos
         where '${'clase:' + nuevo.slug}' = any(tags)) as con_la_nueva,
       (select md5(string_agg(id::text, ',' order by id))
          from crm_tony_alvarado.cta_contactos) as huella;

-- ── 2. Reetiquetar a quien ya se registró ───────────────────────────────────
-- array_replace respeta el resto de las etiquetas de cada persona.
update crm_tony_alvarado.cta_contactos
   set tags = array_replace(tags, '${'clase:' + viejo.slug}', '${'clase:' + nuevo.slug}'),
       actualizado_el = now()
 where '${'clase:' + viejo.slug}' = any(tags);

-- ── 3. El envío del día ─────────────────────────────────────────────────────
-- Se busca POR SU FILTRO, no por un id pegado acá: el id puede cambiar, lo que
-- no cambia es que apunta a la etiqueta de la clase. Y ese filtro guarda la
-- etiqueta como TEXTO, así que al mover el slug queda apuntando a una etiqueta
-- que ya no existe y le pega a cero personas, sin dar ningún error.
update crm_tony_alvarado.cta_envios
   set nombre = regexp_replace(nombre, '^Clase [^—]*', 'Clase ${nuevo.slug.replace('copropiedad-', '').replace('-', ' ')} '),
       filtro = jsonb_set(filtro, '{etiquetas}', '["${'clase:' + nuevo.slug}"]'::jsonb),
       programado_para = '${nuevo.recordatorioUtc}'
 where filtro->'etiquetas' ? '${'clase:' + viejo.slug}'
   and estado not in ('enviando','enviado')
returning id, nombre, estado, filtro::text,
          (programado_para at time zone 'America/Costa_Rica')::text as hora_cr;

-- ── 4. Rearmar los destinatarios ────────────────────────────────────────────
-- No manda nada: solo materializa la lista. La lista NO se actualiza sola, así
-- que sin esto el envío sale a la gente que había cuando se armó.
select e.id,
       crm_tony_alvarado.cta_armar_destinatarios(e.id) as destinatarios
  from crm_tony_alvarado.cta_envios e
 where e.filtro->'etiquetas' ? '${'clase:' + nuevo.slug}'
   and e.estado not in ('enviando','enviado');

-- ── 5. Después ──────────────────────────────────────────────────────────────
-- La huella tiene que ser IDÉNTICA a la de arriba.
select 'DESPUÉS' as cuando,
       (select count(*) from crm_tony_alvarado.cta_contactos) as contactos,
       (select count(*) from crm_tony_alvarado.cta_contactos
         where '${'clase:' + viejo.slug}' = any(tags)) as quedan_con_la_vieja,
       (select count(*) from crm_tony_alvarado.cta_contactos
         where '${'clase:' + nuevo.slug}' = any(tags)) as con_la_nueva,
       (select md5(string_agg(id::text, ',' order by id))
          from crm_tony_alvarado.cta_contactos) as huella;
`
}

/** La tabla de enlaces, lista para pegar en el cerebro o en un documento. */
export function enlaces(nuevo) {
  const BASE = 'https://clase.tonyalvarado.com'
  const org = [
    ['Correo de una cadena', 'correo', 'automatizacion'],
    ['Instagram, publicación', 'instagram', 'organico'],
    ['Instagram, historia', 'instagram', 'historia'],
    ['Facebook, publicación', 'facebook', 'organico'],
    ['WhatsApp', 'whatsapp', 'directo'],
    ['ManyChat (DM del bot)', 'instagram', 'manychat'],
    ['Blog', 'blog', 'articulo'],
  ]
  const variantes = [
    ['', 'A · Los números abiertos'],
    ['revolucion', 'B · La revolución'],
    ['comunidad', 'C · La comunidad'],
    ['airbnb', 'D · El dolor del Airbnb'],
    ['record', 'E · El récord turístico'],
  ]
  const url = (slug, s, m, camp, extra = '') =>
    `${BASE}${slug ? '/' + slug : ''}?utm_source=${s}&utm_medium=${m}&utm_campaign=${camp}${extra}`

  const L = [
    `# Los enlaces de la clase, con su UTM`,
    ``,
    `Campaña: **\`${nuevo.campana}\`** · clase del ${nuevo.fechaLarga}.`,
    ``,
    `⚠️ **Copiar el enlace ENTERO, con todo lo que va después del \`?\`.** Si se`,
    `corta ahí, el lead entra igual pero sin canal.`,
    ``,
    `## Orgánicos — a la variante A`,
    ``,
    `| De dónde | Etiqueta que deja | Enlace |`,
    `|---|---|---|`,
    ...org.map(([n, s, m]) => `| ${n} | \`via:${s}-${m}\` | \`${url('', s, m, nuevo.campana)}\` |`),
    ``,
    `## Pauta en Meta — las cinco variantes`,
    ``,
    `| Variante | Enlace |`,
    `|---|---|`,
    ...variantes.map(([slug, et]) =>
      `| **${et}** | \`${url(slug, '{{site_source_name}}', 'pago', '{{campaign.name}}', '&utm_content={{ad.name}}')}\` |`),
    ``,
  ]
  return L.join('\n')
}

// ── La corrida ──────────────────────────────────────────────────────────────

function main(argv) {
  const libres = argv.filter((a) => !a.startsWith('--'))
  const escribir = argv.includes('--escribir')
  const iVip = argv.indexOf('--vip')
  const iHora = argv.indexOf('--hora')

  if (libres.length === 0) {
    console.log(`
Corre la fecha de la clase de copropiedad.

  node scripts/correr-la-clase.mjs 2026-11-11
  node scripts/correr-la-clase.mjs 2026-11-11 --vip 2026-11-29
  node scripts/correr-la-clase.mjs 2026-11-11 --hora 19:00 --escribir

Sin --escribir no toca nada: muestra qué cambiaría.
`)
    process.exit(1)
  }

  const hora = iHora !== -1 ? argv[iHora + 1] : '19:00'
  const nuevo = calcular(libres[0], hora)
  const vipISO = iVip !== -1 ? argv[iVip + 1] : null
  const vip = vipISO ? calcular(vipISO, '09:00') : null

  const texto = readFileSync(DATOS, 'utf8')
  const viejo = leerActual(texto)

  console.log(`\n━━━ La clase ━━━`)
  console.log(`  fecha        ${viejo.fechaTexto}  →  ${nuevo.fechaTexto}`)
  console.log(`  instante     ${viejo.instanteUtc}  →  ${nuevo.instanteUtc}`)
  console.log(`  slug         ${viejo.slug}  →  ${nuevo.slug}`)
  console.log(`  campaña UTM  →  ${nuevo.campana}`)
  console.log(`  recordatorio →  ${nuevo.recordatorioUtc}  (9 a.m. hora de Costa Rica)`)

  if (nuevo.diaSemana !== 'miércoles') {
    console.log(`\n  ⚠️  Ojo: cae ${nuevo.diaSemana.toUpperCase()}, no miércoles. Las anteriores`)
    console.log(`      fueron todas miércoles. Si es a propósito, seguí.`)
  }

  const vipTexto = vip
    ? `${vip.diaSemana[0].toUpperCase()}${vip.diaSemana.slice(1)} ${vip.fechaLarga.replace(/^\w+ /, '')}`
    : null
  if (vipTexto) {
    console.log(`\n━━━ El VIP presencial ━━━`)
    console.log(`  fecha        ${viejo.vipFechaTexto}  →  ${vipTexto}`)
  }

  const salida = join(RAIZ, 'scripts/salida')
  mkdirSync(salida, { recursive: true })
  const rutaSql = join(salida, `crm-${nuevo.slug}.sql`)
  const rutaEnlaces = join(salida, `enlaces-${nuevo.slug}.md`)
  writeFileSync(rutaSql, sql(viejo, nuevo), 'utf8')
  writeFileSync(rutaEnlaces, enlaces(nuevo), 'utf8')

  if (escribir) {
    writeFileSync(DATOS, reescribir(texto, nuevo, vipTexto), 'utf8')
    console.log(`\n✅ Escrito  src/data/clase-copropiedad.ts`)
  } else {
    console.log(`\n⏸  No se escribió nada. Agregá --escribir cuando esté bien.`)
  }
  console.log(`📄 ${rutaSql.replace(RAIZ + '\\', '').replace(RAIZ + '/', '')}`)
  console.log(`📄 ${rutaEnlaces.replace(RAIZ + '\\', '').replace(RAIZ + '/', '')}`)

  console.log(`
━━━ Lo que sigue, en orden ━━━

  1. npm run build            — con el dev server PARADO, que si no le pisa el .next
  2. Correr el SQL            — en Supabase. Trae sus propias medidas de antes y después
  3. Fusionar el PR           — hasta ahí el sitio sigue con la fecha vieja

━━━ Y esto vive afuera: no lo puede tocar ningún script ━━━

  · ManyChat      app.manychat.com, cuenta fb5270938 → el enlace del DM a ${nuevo.campana}
  · WhatsApp      el nombre y la descripción del grupo, si dicen la fecha
  · Posts y pauta los que ya estén publicados con la fecha vieja${vipTexto ? '' : `
  · El VIP        sigue en «${viejo.vipFechaTexto}». Si se corre, volvé a correr esto con --vip`}

  Los enlaces viejos NO se rompen: la página es la misma. Solo entran con la
  campaña vieja, así que al contar van a aparecer las dos.
`)
}

if (process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/').split('/').pop())) {
  main(process.argv.slice(2))
}
