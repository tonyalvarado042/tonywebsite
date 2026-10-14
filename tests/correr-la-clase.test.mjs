import { test } from 'node:test'
import assert from 'node:assert/strict'
import { calcular, leerActual, reescribir } from '../scripts/correr-la-clase.mjs'

/**
 * Lo que se prueba acá no es «que el script corra»: es la aritmética de fechas
 * y la colisión entre el `fechaTexto` de la clase y el del VIP. Las dos fallan
 * en silencio y las dos se descubrirían el día del evento.
 */

test('la clase del 28 de octubre, que es la que está puesta hoy', () => {
  const r = calcular('2026-10-28', '19:00')
  assert.equal(r.instanteUtc, '2026-10-29T01:00:00Z')
  assert.equal(r.fechaTexto, 'Miércoles 28 de octubre')
  assert.equal(r.slug, 'copropiedad-28-oct')
  assert.equal(r.campana, 'clase-28oct')
  assert.equal(r.diaSemana, 'miércoles')
  assert.equal(r.horaTexto, '7:00 p.m. Costa Rica')
})

test('la del 21, la anterior, para probar que la cuenta no se inventó', () => {
  const r = calcular('2026-10-21', '19:00')
  assert.equal(r.instanteUtc, '2026-10-22T01:00:00Z')
  assert.equal(r.fechaTexto, 'Miércoles 21 de octubre')
  assert.equal(r.slug, 'copropiedad-21-oct')
})

test('a las 7 p.m. el instante UTC cae al DÍA SIGUIENTE, y el nombre del día es el de acá', () => {
  const r = calcular('2026-11-11', '19:00')
  // En UTC ya es 12 de noviembre…
  assert.ok(r.instanteUtc.startsWith('2026-11-12'))
  // …pero en Costa Rica sigue siendo miércoles 11.
  assert.equal(r.fechaTexto, 'Miércoles 11 de noviembre')
  assert.equal(r.diaSemana, 'miércoles')
})

test('fin de mes: el 31 a las 7 p.m. no se convierte en 1 de noviembre', () => {
  const r = calcular('2026-10-31', '19:00')
  assert.equal(r.instanteUtc, '2026-11-01T01:00:00Z')
  assert.equal(r.fechaTexto, 'Sábado 31 de octubre')
  assert.equal(r.slug, 'copropiedad-31-oct')
})

test('fin de año: el 31 de diciembre no se convierte en 2027', () => {
  const r = calcular('2026-12-31', '19:00')
  assert.equal(r.instanteUtc, '2027-01-01T01:00:00Z')
  assert.equal(r.fechaTexto, 'Jueves 31 de diciembre')
  assert.equal(r.slug, 'copropiedad-31-dic')
})

test('setiembre se escribe como en Costa Rica, no «septiembre»', () => {
  const r = calcular('2026-09-16', '19:00')
  assert.equal(r.fechaTexto, 'Miércoles 16 de setiembre')
  assert.equal(r.slug, 'copropiedad-16-set')
  assert.equal(r.campana, 'clase-16set')
})

test('el recordatorio sale a las 9 a.m. hora de Costa Rica, no a las 9 UTC', () => {
  const r = calcular('2026-10-28', '19:00')
  assert.equal(r.recordatorioUtc, '2026-10-28T15:00:00Z') // 9 + 6
})

test('una fecha mal escrita revienta en vez de inventar algo', () => {
  assert.throws(() => calcular('28/10/2026'), /va como 2026-11-11/)
  assert.throws(() => calcular('2026-10-28', '7pm'), /va como 19:00/)
})

// ── La trampa de los dos `fechaTexto` ───────────────────────────────────────

const ARCHIVO = `
export const CLASE = {
  slug: 'copropiedad-28-oct',
  nombre: 'La Revolución de la Copropiedad Turística',
  instanteUtc: '2026-10-29T01:00:00Z',
  fechaTexto: 'Miércoles 28 de octubre',
} as const

export const VIP = {
  enlacePago: '',
  fechaTexto: 'Domingo 15 de noviembre de 2026',
} as const
`

test('lee los valores de cada bloque sin confundirlos', () => {
  const a = leerActual(ARCHIVO)
  assert.equal(a.slug, 'copropiedad-28-oct')
  assert.equal(a.fechaTexto, 'Miércoles 28 de octubre')
  assert.equal(a.vipFechaTexto, 'Domingo 15 de noviembre de 2026')
})

test('🚨 mover la clase NO toca la fecha del VIP', () => {
  // Las dos constantes tienen un `fechaTexto`. Un reemplazo global cambiaría
  // la del VIP al mover la clase, sin avisar, y nadie lo notaría hasta que
  // alguien llegara el domingo equivocado.
  const nuevo = calcular('2026-11-11', '19:00')
  const r = reescribir(ARCHIVO, nuevo)

  assert.match(r, /slug: 'copropiedad-11-nov'/)
  assert.match(r, /instanteUtc: '2026-11-12T01:00:00Z'/)
  assert.match(r, /fechaTexto: 'Miércoles 11 de noviembre'/)
  // El VIP, intacto:
  assert.match(r, /fechaTexto: 'Domingo 15 de noviembre de 2026'/)
})

test('con --vip sí se mueve el VIP, y solo el VIP', () => {
  const nuevo = calcular('2026-11-11', '19:00')
  const r = reescribir(ARCHIVO, nuevo, 'Domingo 29 de noviembre de 2026')
  assert.match(r, /fechaTexto: 'Miércoles 11 de noviembre'/)
  assert.match(r, /fechaTexto: 'Domingo 29 de noviembre de 2026'/)
  assert.ok(!r.includes('Domingo 15 de noviembre'))
})

test('si el archivo cambia de forma, revienta en vez de escribir cualquier cosa', () => {
  assert.throws(() => leerActual('export const OTRA_COSA = {}'), /No encontré el bloque CLASE/)
})
