import { test } from 'node:test'
import assert from 'node:assert/strict'
import { ordenarPorUrgencia } from '../src/lib/orden-del-tick.ts'

/**
 * Cuál cadena gana cuando alguien está en dos y solo puede recibir una hoy.
 *
 * No es cosmética: la que pierde espera un día. Si gana la de goteo, la
 * atada a un evento puede quedarse sin mandar su último correo a tiempo.
 */

const fila = (nombre, vence) => ({ nombre, cta_automatizaciones: { vence_el: vence } })

test('la que vence antes va primero', () => {
  const r = ordenarPorUrgencia([
    fila('goteo', null),
    fila('clase', '2026-10-29T01:00:00Z'),
  ])
  assert.deepEqual(r.map((f) => f.nombre), ['clase', 'goteo'])
})

test('🔴 la que no vence nunca va al final: es la que puede esperar', () => {
  const r = ordenarPorUrgencia([
    fila('goteo A', null),
    fila('clase', '2026-11-18T15:00:00Z'),
    fila('goteo B', null),
  ])
  assert.equal(r[0].nombre, 'clase')
})

test('entre dos con fecha, gana la más cercana', () => {
  const r = ordenarPorUrgencia([
    fila('noviembre', '2026-11-18T15:00:00Z'),
    fila('octubre', '2026-10-29T01:00:00Z'),
  ])
  assert.deepEqual(r.map((f) => f.nombre), ['octubre', 'noviembre'])
})

test('no revienta si falta la cadena o el campo', () => {
  const r = ordenarPorUrgencia([
    { nombre: 'sin cadena' },
    { nombre: 'cadena nula', cta_automatizaciones: null },
    fila('con fecha', '2026-10-29T01:00:00Z'),
  ])
  assert.equal(r[0].nombre, 'con fecha')
  assert.equal(r.length, 3)
})

test('no muta el arreglo que recibe', () => {
  const original = [fila('goteo', null), fila('clase', '2026-10-29T01:00:00Z')]
  const copia = [...original]
  ordenarPorUrgencia(original)
  assert.deepEqual(original, copia)
})

test('🔴 acepta la relación como arreglo, que es como la tipa PostgREST', () => {
  const r = ordenarPorUrgencia([
    { nombre: 'goteo', cta_automatizaciones: [{ vence_el: null }] },
    { nombre: 'clase', cta_automatizaciones: [{ vence_el: '2026-10-29T01:00:00Z' }] },
  ])
  assert.deepEqual(r.map((f) => f.nombre), ['clase', 'goteo'])
})
