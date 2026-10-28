import { test } from 'node:test'
import assert from 'node:assert/strict'
import { correoSirve, normalizarCorreo } from '../src/lib/correo-valido.ts'

/**
 * La lista de casos de este archivo es la MISMA que se corrió contra
 * `crm_tony_alvarado.cta_correo_sirve()` en la base el 28 de octubre de 2026.
 *
 * Esa comparación es el punto de la prueba: no alcanza con que la validación
 * del sitio «se vea bien», tiene que decir lo mismo que la de la base. Si una
 * deja pasar lo que la otra rechaza, la persona recibe un error feo en vez de
 * un aviso claro, o —peor— la dirección entra y rompe un lote de correo.
 *
 * Si se agrega un caso acá, hay que correrlo también en SQL:
 *
 *   select dir, crm_tony_alvarado.cta_correo_sirve(dir) from unnest(array[...]) dir;
 */

/** [dirección, debería servir, por qué nos importa] */
const CASOS = [
  // ── El que costó 49 correos ──────────────────────────────────────────
  ['yerrojas2610@gmail.com.', false, 'punto al final: el regex viejo lo aceptaba'],

  // ── Buenas, incluidas las que un regex estricto rompe ────────────────
  ['juan@gmail.com', true, 'la normal'],
  ['fmerizalde@eurobau.co.cr', true, 'dominio de dos niveles .co.cr'],
  ['marycastro71@yahoo.com.mx', true, 'dominio de dos niveles .com.mx'],
  ['cruiza@ccss.sa.cr', true, 'dominio de tres niveles'],
  ['ana.maria@empresa.com', true, 'punto en la parte local'],
  ['tony+clase@tonyalvarado.com', true, 'el signo más es válido y se usa'],
  ['a@b.co', true, 'lo más corto que sirve'],
  ['NOMBRE@GMAIL.COM', true, 'mayúsculas: se normaliza aparte, no se rechaza'],

  // ── Malas ────────────────────────────────────────────────────────────
  ['.juan@gmail.com', false, 'empieza con punto'],
  ['juan..perez@gmail.com', false, 'dos puntos seguidos'],
  ['juan.@gmail.com', false, 'punto pegado antes de la arroba'],
  ['juan@.gmail.com', false, 'punto pegado después de la arroba'],
  ['juan@gmailcom', false, 'dominio sin punto'],
  ['juan@@gmail.com', false, 'dos arrobas'],
  ['juan gomez@gmail.com', false, 'espacio adentro'],
  [' juan@gmail.com', false, 'espacio al principio'],
  ['juan@gmail.com ', false, 'espacio al final'],
  ['@gmail.com', false, 'sin parte local'],
  ['juan@', false, 'sin dominio'],
  ['juan', false, 'sin arroba'],
  ['', false, 'vacío'],
]

test('dice lo mismo que cta_correo_sirve de la base', () => {
  for (const [dir, esperado, porque] of CASOS) {
    assert.equal(correoSirve(dir), esperado, `${JSON.stringify(dir)} — ${porque}`)
  }
})

test('el regex viejo del sitio aceptaba el punto final, y por eso se cambió', () => {
  const viejo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  // Esto es lo que documenta el problema: el regex que estaba en los trece
  // formularios decía que la dirección de Yerlin era buena.
  assert.equal(viejo.test('yerrojas2610@gmail.com.'), true)
  assert.equal(correoSirve('yerrojas2610@gmail.com.'), false)
})

test('tipos que no son texto no revientan', () => {
  for (const v of [null, undefined, 42, {}, [], true]) {
    assert.equal(correoSirve(v), false)
  }
})

test('se limpia antes de validar, no al revés', () => {
  // Un espacio al costado lo sabe quitar el sistema: rechazarlo sería culpar a
  // la persona por algo que no hizo mal.
  assert.equal(normalizarCorreo('  Juan@Gmail.COM '), 'juan@gmail.com')
  assert.equal(correoSirve(normalizarCorreo('  Juan@Gmail.COM ')), true)
  // Pero un espacio EN MEDIO no se arregla solo, y sigue siendo malo.
  assert.equal(correoSirve(normalizarCorreo(' juan gomez@gmail.com ')), false)
})
