import { test } from 'node:test'
import assert from 'node:assert/strict'
import { derivarVip } from '../src/lib/vip-fechas.ts'

/**
 * El cálculo de fechas del VIP.
 *
 * Lo que se prueba acá es lo único que puede salir mal en silencio: que la
 * fecha se calcule en la zona equivocada. Vercel corre en UTC, y un evento de
 * tarde cae al día SIGUIENTE en UTC — el sitio anunciaría otro día.
 *
 * La lectura del CRM no se prueba acá: eso necesita la llave del baúl, que
 * vive solo en Vercel. Acá se prueba la matemática, que es la parte frágil.
 */

const vip = (instante, dur = 180) => derivarVip(instante, dur, 'https://pago', '40', '97')

test('el lanzamiento real: 18 de noviembre, 9 a.m. a 12 mediodía', () => {
  const v = vip('2026-11-18T15:00:00Z')
  assert.equal(v.fechaTexto, 'Miércoles 18 de noviembre de 2026')
  assert.equal(v.fechaCorta, 'Miércoles 18')
  assert.equal(v.fechaCortaMes, 'de noviembre')
  assert.equal(v.fechaBoleto, '18 NOV 2026')
  assert.equal(v.horarioTexto, 'de 9:00 a.m. a 12 mediodía')
  assert.equal(v.horarioCorto, '9:00 a.m. a 12 mediodía')
  assert.equal(v.precioTexto, 'US$97 por persona')
  assert.equal(v.slug, 'vip-18-nov-2026')
})

test('🔴 un evento de tarde NO se corre al día siguiente', () => {
  // 7 p.m. del miércoles 18 en Costa Rica son la 01:00 UTC del jueves 19.
  // Calculando en UTC, el sitio diría «Jueves 19». Tiene que decir miércoles.
  const v = vip('2026-11-19T01:00:00Z', 90)
  assert.equal(v.fechaTexto, 'Miércoles 18 de noviembre de 2026')
  assert.equal(v.horarioTexto, 'de 7:00 p.m. a 8:30 p.m.')
})

test('el mediodía y la medianoche se dicen con palabras, no con 12:00 p.m.', () => {
  assert.match(vip('2026-11-18T18:00:00Z', 60).horarioCorto, /^12 mediodía a 1:00 p\.m\./)
  assert.equal(vip('2026-11-18T15:00:00Z', 540).horarioCorto, '9:00 a.m. a 6:00 p.m.')
})

test('la duración mueve solo la hora de fin', () => {
  assert.equal(vip('2026-11-18T15:00:00Z', 240).horarioTexto, 'de 9:00 a.m. a 1:00 p.m.')
  assert.equal(vip('2026-11-18T15:00:00Z', 30).horarioTexto, 'de 9:00 a.m. a 9:30 a.m.')
})

test('un lanzamiento futuro solo cambia el instante', () => {
  const v = vip('2026-12-02T15:00:00Z')
  assert.equal(v.fechaTexto, 'Miércoles 2 de diciembre de 2026')
  assert.equal(v.fechaBoleto, '2 DIC 2026')
  assert.equal(v.slug, 'vip-2-dic-2026')
})

test('setiembre se escribe como en Costa Rica', () => {
  assert.equal(vip('2026-09-16T15:00:00Z').fechaTexto, 'Miércoles 16 de setiembre de 2026')
})

test('el instante de fin sale del de inicio más la duración', () => {
  const v = vip('2026-11-18T15:00:00Z', 180)
  assert.equal(v.instanteUtc, '2026-11-18T15:00:00.000Z')
  assert.equal(v.instanteFinUtc, '2026-11-18T18:00:00.000Z')
})
