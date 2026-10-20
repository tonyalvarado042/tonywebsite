import { test } from 'node:test'
import assert from 'node:assert/strict'
import { expandirVip } from '../src/lib/correo-comodines.ts'
import { derivarVip } from '../src/lib/vip-fechas.ts'

/**
 * Los comodines del VIP en los correos de la cadena.
 *
 * Lo que se prueba es el modo de fallo que se ve: que al apagar el VIP el
 * correo quede con un hueco de tres renglones en el medio, o con una posdata
 * colgando. Eso le llega a gente real.
 */

const VIP = derivarVip('2026-11-18T15:00:00Z', 180, 'https://pay.hotmart.com/X', '40', '97')
const APAGADO = null
const SIN_ENLACE = { ...VIP, enlacePago: '' }

const CUERPO = 'Nos vemos ahí.\n\n{vip}'
const CON_LINEA = 'Porque esa es la pregunta que vine a contestar.\n\n{vip_linea}'

test('encendido: el bloque trae fecha, horario, precio, cupos y enlace', () => {
  const t = expandirVip(CUERPO, VIP)
  assert.match(t, /Miércoles 18 de noviembre de 2026 · de 9:00 a\.m\. a 12 mediodía/)
  assert.match(t, /US\$97 por persona · 40 entradas/)
  assert.match(t, /https:\/\/clase\.tonyalvarado\.com\/vip/)
  assert.match(t, /^Nos vemos ahí\./)
  assert.ok(!t.includes('{vip'), 'no debe quedar ningún comodín sin expandir')
})

test('🔴 apagado: no queda hueco ni comodín', () => {
  const t = expandirVip(CUERPO, APAGADO)
  assert.equal(t, 'Nos vemos ahí.')
  assert.ok(!t.includes('{vip'))
  assert.ok(!/\n{3,}/.test(t), 'no puede quedar un hueco de tres renglones')
})

test('🔴 sin enlace de pago es lo mismo que apagado', () => {
  assert.equal(expandirVip(CUERPO, SIN_ENLACE), 'Nos vemos ahí.')
})

test('la línea corta se expande y desaparece igual', () => {
  const t = expandirVip(CON_LINEA, VIP)
  assert.match(t, /^P\.D\./m)
  assert.match(t, /Son 40 entradas/)
  assert.equal(
    expandirVip(CON_LINEA, APAGADO),
    'Porque esa es la pregunta que vine a contestar.'
  )
})

test('un comodín en medio del texto no parte el párrafo de después', () => {
  const t = expandirVip('Primero.\n\n{vip}\n\nÚltimo.', APAGADO)
  assert.equal(t, 'Primero.\n\nÚltimo.')
})

test('un cuerpo sin comodines se devuelve intacto, encendido o apagado', () => {
  const normal = 'Un correo cualquiera.\n\nCon dos párrafos.'
  assert.equal(expandirVip(normal, VIP), normal)
  assert.equal(expandirVip(normal, APAGADO), normal)
})

test('sin cupos confirmados no se inventa un número', () => {
  const t = expandirVip(CUERPO, { ...VIP, cuposTexto: '' })
  assert.ok(!/entradas/.test(t), 'no debe mencionar cantidad si no hay cupos')
  assert.match(t, /US\$97 por persona/)
})
