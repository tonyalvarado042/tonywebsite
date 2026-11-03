// Las cuentas de la sala del webinar pregrabado.
//
//   npm run test:sala
//
// Todo lo que acá se prueba depende del RELOJ, y un error de reloj no se ve:
// la sala abre, el video corre, y simplemente le muestra a la gente un minuto
// que no es. Por eso `ahora` entra como parámetro en todas las funciones.

import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  estadoDeLaSala,
  segundoDelVideo,
  faltaPara,
  faltaTexto,
  comoSeLlama,
  loQueYaSeDijo,
  toca,
} from '../src/lib/sala-webinar.ts'

/** La clase del martes 17 de noviembre, 7:00 p.m. de Costa Rica. */
const SALA = { instanteUtc: '2026-11-18T01:00:00Z', duracionMin: 80, puertaMin: 10 }
const en = (iso) => new Date(iso)

test('a dos horas de la clase, la sala todavía no abre', () => {
  assert.equal(estadoDeLaSala(SALA, en('2026-11-17T23:00:00Z')), 'antes')
})

test('diez minutos antes se abre la puerta', () => {
  assert.equal(estadoDeLaSala(SALA, en('2026-11-18T00:50:00Z')), 'puerta')
  // Un minuto antes de la puerta, todavía no.
  assert.equal(estadoDeLaSala(SALA, en('2026-11-18T00:49:00Z')), 'antes')
})

test('a la hora en punto, en vivo', () => {
  assert.equal(estadoDeLaSala(SALA, en('2026-11-18T01:00:00Z')), 'envivo')
})

test('🔴 al minuto 80 clavado ya terminó, no sigue «en vivo»', () => {
  assert.equal(estadoDeLaSala(SALA, en('2026-11-18T02:19:59Z')), 'envivo')
  assert.equal(estadoDeLaSala(SALA, en('2026-11-18T02:20:00Z')), 'despues')
})

test('🔴 el video NO arranca en cero: arranca donde va el reloj', () => {
  // Alguien que entra a las 7:12 p.m. ve el minuto 12, no el principio.
  assert.equal(segundoDelVideo(SALA, en('2026-11-18T01:12:00Z')), 720)
})

test('antes de empezar, la aguja está en cero', () => {
  assert.equal(segundoDelVideo(SALA, en('2026-11-17T20:00:00Z')), 0)
  assert.equal(segundoDelVideo(SALA, en('2026-11-18T00:59:59Z')), 0)
})

test('🔴 después del final la aguja se queda en el último segundo', () => {
  // Si siguiera creciendo, el reproductor pediría un segundo que no existe.
  assert.equal(segundoDelVideo(SALA, en('2026-11-18T05:00:00Z')), 80 * 60)
})

test('lo que falta se dice distinto según cuánto falta', () => {
  assert.equal(faltaTexto(0), 'ya empieza')
  assert.equal(faltaTexto(45 * 1000), '45 s')
  assert.equal(faltaTexto((2 * 60 + 30) * 1000), '2 min 30 s')
  assert.equal(faltaTexto((2 * 3600 + 14 * 60) * 1000), '2 h 14 min')
  assert.equal(faltaTexto(3 * 86400 * 1000 + 4 * 3600 * 1000), '3 días 4 h')
  assert.equal(faltaTexto(86400 * 1000), '1 día 0 h')
})

test('faltaPara nunca es negativo', () => {
  assert.equal(faltaPara(SALA, en('2026-11-18T02:00:00Z')), 0)
  assert.equal(faltaPara(SALA, en('2026-11-18T00:30:00Z')), 30 * 60 * 1000)
})

test('quien no puso nombre es «user ####»', () => {
  assert.equal(comoSeLlama(null, 1765), 'user 1765')
  assert.equal(comoSeLlama('   ', 1765), 'user 1765')
  assert.equal(comoSeLlama('Marcela', 1765), 'Marcela')
})

test('🔴 solo sale lo que YA se dijo — el guion no se adelanta', () => {
  const guion = [
    { id: 'a', segundo: 10, autor: 'Marcela', texto: 'hola' },
    { id: 'b', segundo: 300, autor: 'Luis', texto: 'esto está buenísimo' },
    { id: 'c', segundo: 900, autor: 'Ana', texto: 'y el precio?' },
  ]
  const salida = loQueYaSeDijo(guion, [], 300)
  assert.deepEqual(salida.map((c) => c.id), ['a', 'b'])
})

test('lo escrito y lo del guion se mezclan por segundo', () => {
  const guion = [{ id: 'g1', segundo: 100, autor: 'Ana', texto: 'del guion' }]
  const reales = [{ id: 'm1', segundo: 50, autor: 'user 1765', texto: 'de verdad', deVerdad: true }]
  const salida = loQueYaSeDijo(guion, reales, 200)
  assert.deepEqual(salida.map((c) => c.id), ['m1', 'g1'])
})

test('con el mismo segundo, el orden es estable y no baila al recargar', () => {
  const a = [{ id: 'b', segundo: 10, autor: 'x', texto: 'x' }]
  const b = [{ id: 'a', segundo: 10, autor: 'y', texto: 'y' }]
  assert.deepEqual(loQueYaSeDijo(a, b, 99).map((c) => c.id), ['a', 'b'])
  assert.deepEqual(loQueYaSeDijo(b, a, 99).map((c) => c.id), ['a', 'b'])
})

test('🔴 sin CTA definida, el botón no sale nunca', () => {
  assert.equal(toca(null, 999999), false)
  assert.equal(toca(undefined, 999999), false)
})

test('la CTA sale en su segundo y no antes', () => {
  assert.equal(toca(3600, 3599), false)
  assert.equal(toca(3600, 3600), true)
  assert.equal(toca(3600, 4000), true)
})

test('una sala sin puerta abre justo a la hora', () => {
  const sinPuerta = { ...SALA, puertaMin: 0 }
  assert.equal(estadoDeLaSala(sinPuerta, en('2026-11-18T00:59:59Z')), 'antes')
  assert.equal(estadoDeLaSala(sinPuerta, en('2026-11-18T01:00:00Z')), 'envivo')
})
