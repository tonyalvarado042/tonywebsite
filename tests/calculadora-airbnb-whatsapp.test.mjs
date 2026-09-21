import assert from 'node:assert/strict'
import test from 'node:test'

import {
  ESCENARIOS,
  PROYECTOS,
  calcular,
  esEscenarioAirbnb,
} from '../src/lib/calculadora-airbnb.ts'
import {
  LIMITE_URL_WHATSAPP,
  NUMERO_WHATSAPP_AIRBNB,
  ORIGEN_WHATSAPP_AIRBNB,
  construirEnlaceWhatsApp,
  construirMensajeWhatsAppDetallado,
  construirUrlWhatsApp,
  sanitizarNombreWhatsApp,
} from '../src/lib/calculadora-airbnb-whatsapp.ts'

const escenarios = ['conservador', 'base', 'optimista']

function datos(proyecto = 'villa', escenario = 'base', nombre = 'José Núñez') {
  const supuestos = { ...PROYECTOS[proyecto], ...ESCENARIOS[escenario] }
  return { nombre, escenario, supuestos, resultado: calcular(supuestos) }
}

test('reconoce únicamente los tres escenarios del contrato', () => {
  for (const escenario of escenarios) assert.equal(esEscenarioAirbnb(escenario), true)
  for (const invalido of ['', 'agresivo', null, 1, {}]) {
    assert.equal(esEscenarioAirbnb(invalido), false)
  }
})

test('serializa los cuatro presets en los tres escenarios con una URL válida', () => {
  for (const proyecto of Object.keys(PROYECTOS)) {
    for (const escenario of escenarios) {
      const enlace = construirEnlaceWhatsApp(datos(proyecto, escenario))
      assert.equal(enlace.url.startsWith(`https://wa.me/${NUMERO_WHATSAPP_AIRBNB}?text=`), true)
      assert.equal(enlace.longitud, enlace.url.length)
      assert.ok(enlace.longitud <= LIMITE_URL_WHATSAPP)
      assert.match(enlace.mensaje, /\[ARI:CALCULADORA_AIRBNB\]/)
      assert.match(enlace.mensaje, new RegExp(`Origen: ${ORIGEN_WHATSAPP_AIRBNB}`))
      assert.match(enlace.mensaje, new RegExp(`Escenario: ${escenario[0].toUpperCase()}${escenario.slice(1)}`))
      assert.doesNotMatch(enlace.mensaje, /undefined|NaN|\[object Object\]/)
    }
  }
})

test('el mensaje detallado incluye los 21 supuestos y los resultados acordados', () => {
  const mensaje = construirMensajeWhatsAppDetallado(datos())
  const etiquetas = [
    'Terreno:', 'Precio terreno:', 'Construcción:', 'Costo construcción:',
    'Mobiliario/equipo:', 'Amenidades:', 'Diseño/permisos/estudios:', 'Contingencia:',
    'Unidades:', 'Tarifa promedio:', 'Ocupación:', 'Otros ingresos mensuales:',
    'Gastos operativos:', 'Crecimiento anual:', 'Prima inicial simulada:',
    'Interés anual:', 'Plazo:', 'Valorización del terreno:', 'S&P 500 supuesto:',
    'Nasdaq-100 supuesto:', 'Renta fija supuesto:',
  ]
  for (const etiqueta of etiquetas) assert.match(mensaje, new RegExp(etiqueta.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))

  for (const resultado of [
    'Costo total estimado:', 'Capital inicial estimado:', 'Crédito estimado:',
    'Ingreso mensual:', 'Gastos operativos mensuales:', 'NOI mensual:', 'Cuota estimada:',
    'Flujo mensual estimado:', 'Cap rate:', 'Ocupación de equilibrio:',
    'Retorno sobre capital:', 'DSCR:', 'Recuperación estimada:',
  ]) {
    assert.match(mensaje, new RegExp(resultado))
  }
  assert.match(mensaje, /estimaciones educativas/)
})

test('sanea saltos, controles y formato Unicode sin perder tildes ni ñ', () => {
  assert.equal(sanitizarNombreWhatsApp('  Jose\u0301\nNu\u006e\u0303ez\u0000  '), 'José Nuñez')
  const enlace = construirEnlaceWhatsApp(datos('villa', 'base', 'María Peña & Zoë'))
  assert.match(enlace.mensaje, /Hola, soy María Peña & Zoë\./)
  assert.equal(decodeURIComponent(enlace.url.split('?text=')[1]), enlace.mensaje)
  assert.match(enlace.url, /%C3%AD|%C3%B1/)
})

test('reemplaza sustitutos Unicode aislados antes de codificar la URL', () => {
  const nombreConSustitutos = 'Ana\uD800 y Luis\uDC00'
  assert.equal(sanitizarNombreWhatsApp(nombreConSustitutos), 'Ana� y Luis�')
  assert.doesNotThrow(() => construirEnlaceWhatsApp(datos('villa', 'base', nombreConSustitutos)))
})

test('normaliza valores no finitos sin imprimir literales inválidos', () => {
  const entrada = datos()
  entrada.supuestos.landArea = Number.NaN
  entrada.supuestos.adr = Number.POSITIVE_INFINITY
  entrada.resultado.noi = Number.NEGATIVE_INFINITY
  entrada.resultado.recuperacion = Number.POSITIVE_INFINITY
  const mensaje = construirMensajeWhatsAppDetallado(entrada)

  assert.doesNotMatch(mensaje, /undefined|NaN|Infinity|\[object Object\]/)
  assert.match(mensaje, /Recuperación estimada: No aplica/)
})

test('describe el DSCR sentinela sin deuda sin imprimir 99x', () => {
  const entrada = datos()
  entrada.supuestos.downPayment = 100
  entrada.resultado = calcular(entrada.supuestos)
  const mensaje = construirMensajeWhatsAppDetallado(entrada)

  assert.match(mensaje, /DSCR: Sin deuda/)
  assert.doesNotMatch(mensaje, /DSCR: 99x/)
})

test('no agrega correo, teléfono, preset ni identificadores internos', () => {
  const entrada = datos()
  entrada.correo = 'persona@example.com'
  entrada.telefono = '+50660000000'
  entrada.preset = 'villa'
  entrada.contactoId = '3f838f06-e49a-4a90-9158-9c806e2143bc'
  const mensaje = construirMensajeWhatsAppDetallado(entrada)

  for (const privado of [entrada.correo, entrada.telefono, entrada.preset, entrada.contactoId]) {
    assert.equal(mensaje.includes(privado), false)
  }
})

test('usa el formato compacto cuando el mensaje detallado supera 4096 caracteres de URL', () => {
  const entrada = datos('boutique', 'optimista')
  // Fuerza un detalle sobredimensionado solo en campos que el resumen omite.
  // El endpoint real entrega cifras saneadas, pero esta entrada permite cubrir
  // determinísticamente la rama de recuperación del helper puro.
  for (const campo of [
    'furniture', 'amenities', 'permits', 'contingency', 'extraMonthly', 'opex',
    'revenueGrowth', 'appreciation', 'sp500', 'nasdaq', 'fixedIncome',
  ]) {
    entrada.supuestos[campo] = Number.MAX_VALUE
  }
  for (const campo of [
    'credito', 'gastos', 'cuota', 'capRate', 'ocupacionEquilibrio', 'recuperacion',
  ]) {
    entrada.resultado[campo] = Number.MAX_VALUE
  }
  const urlDetallada = construirUrlWhatsApp(construirMensajeWhatsAppDetallado(entrada))
  const enlace = construirEnlaceWhatsApp(entrada)

  assert.ok(urlDetallada.length > LIMITE_URL_WHATSAPP)
  assert.equal(enlace.compacto, true)
  assert.ok(enlace.longitud <= LIMITE_URL_WHATSAPP)
  assert.match(enlace.mensaje, /RESUMEN DEL PROYECTO/)
  assert.doesNotMatch(enlace.mensaje, /S&P 500 supuesto/)
})
