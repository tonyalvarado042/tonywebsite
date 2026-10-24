import test from 'node:test'
import assert from 'node:assert/strict'
import { derivarClase } from '../src/lib/clase-fechas.ts'

/*
  Estas pruebas cuidan los textos que la gente lee en la landing y en el correo
  de confirmación. Si la fecha sale mal acá, sale mal en los cinco lugares a la
  vez y nadie lo nota hasta que alguien llega el día equivocado.

  El caso de referencia es el real: la clase del miércoles 28 de octubre de
  2026 a las 7 p.m. de Costa Rica = `2026-10-29T01:00:00Z`.
*/

const PLATAFORMA = 'En vivo por internet.'
const GRUPO = 'https://chat.whatsapp.com/ejemplo'

const clase = (iso, min = 80) =>
  derivarClase(iso, min, 'La Revolución de la Copropiedad Turística', 'copropiedad-28-oct', GRUPO, PLATAFORMA)

test('🔴 la clase de las 7 p.m. NO se corre al día siguiente', () => {
  // Es el error que importa: 01:00Z del 29 es el 28 en Costa Rica. Si la zona
  // se ignorara, la landing anunciaría «Jueves 29 de octubre».
  const c = clase('2026-10-29T01:00:00Z')
  assert.equal(c.fechaTexto, 'Miércoles 28 de octubre')
  assert.equal(c.horaTexto, '7:00 p.m. Costa Rica')
})

test('los textos derivados coinciden con los que había quemados en el código', () => {
  // Antes de mover la clase al CRM, estos cuatro valores estaban escritos a
  // mano en `data/clase-copropiedad.ts`. La migración no debe cambiar ni una
  // letra de lo que ya está publicado y pautado.
  const c = clase('2026-10-29T01:00:00Z')
  assert.equal(c.nombre, 'La Revolución de la Copropiedad Turística')
  assert.equal(c.fechaTexto, 'Miércoles 28 de octubre')
  assert.equal(c.horaTexto, '7:00 p.m. Costa Rica')
  assert.equal(c.duracionTexto, '80 minutos')
})

test('Costa Rica no tiene horario de verano: enero y julio se tratan igual', () => {
  // Para que nadie «arregle» la zona con un offset fijo que sirva medio año.
  assert.equal(clase('2026-01-15T18:00:00Z').horaTexto, '12 mediodía Costa Rica')
  assert.equal(clase('2026-07-15T18:00:00Z').horaTexto, '12 mediodía Costa Rica')
})

test('los bordes del día caen donde deben', () => {
  // 06:00Z es medianoche exacta en Costa Rica.
  assert.equal(clase('2026-10-28T06:00:00Z').fechaTexto, 'Miércoles 28 de octubre')
  assert.equal(clase('2026-10-28T05:59:00Z').fechaTexto, 'Martes 27 de octubre')
})

test('la duración siempre se dice en minutos, aunque sean dos horas', () => {
  // Predecible le gana a bonito: Tony edita este número y tiene que poder
  // adivinar qué texto va a salir sin guardar para ver.
  assert.equal(clase('2026-10-29T01:00:00Z', 90).duracionTexto, '90 minutos')
  assert.equal(clase('2026-10-29T01:00:00Z', 120).duracionTexto, '120 minutos')
})

test('el slug y el grupo pasan tal cual, sin inventar nada', () => {
  const c = clase('2026-10-29T01:00:00Z')
  assert.equal(c.slug, 'copropiedad-28-oct')
  assert.equal(c.grupoUrl, GRUPO)
})
