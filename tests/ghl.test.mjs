import test from 'node:test'
import assert from 'node:assert/strict'
import { diaEnCostaRica } from '../src/lib/ghl.ts'

/*
  Lo que se prueba acá es la conversión que decide QUÉ DÍA sale el recordatorio
  de la clase. Es el error más caro y más silencioso de todo el flujo: un
  mensaje que dice «hoy es la clase» y sale al día siguiente no tira ningún
  error — simplemente llega tarde, a todo el mundo, y ya no se puede arreglar.
*/

test('la clase de las 7 p.m. en Costa Rica no se corre al día siguiente', () => {
  // 2026-10-29T01:00:00Z es el miércoles 28 a las 7 p.m. en Costa Rica.
  // Si la zona se ignorara, esto diría «29» y el recordatorio saldría tarde.
  assert.equal(diaEnCostaRica('2026-10-29T01:00:00Z'), '2026-10-28')
})

test('Costa Rica es UTC−6 todo el año: enero y julio se tratan igual', () => {
  // Sin horario de verano, el mismo desfase aplica en cualquier mes. Esta
  // prueba existe para que nadie «arregle» la zona con un offset fijo que
  // funcione en invierno y falle en verano.
  assert.equal(diaEnCostaRica('2026-01-15T18:00:00Z'), '2026-01-15')
  assert.equal(diaEnCostaRica('2026-07-15T18:00:00Z'), '2026-07-15')
})

test('la medianoche en Costa Rica cae en el día correcto', () => {
  // 06:00Z es exactamente medianoche en Costa Rica: el borde donde una zona
  // mal aplicada cambia la fecha.
  assert.equal(diaEnCostaRica('2026-10-28T06:00:00Z'), '2026-10-28')
  assert.equal(diaEnCostaRica('2026-10-28T05:59:00Z'), '2026-10-27')
})

test('una fecha inválida devuelve vacío y no revienta', () => {
  // Devolver vacío deja el campo sin llenar en GHL —visible— en vez de
  // mandar «Invalid Date», que se guardaría como texto y nadie miraría.
  assert.equal(diaEnCostaRica('cualquier cosa'), '')
  assert.equal(diaEnCostaRica(''), '')
})
