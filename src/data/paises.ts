/**
 * Los países del selector de WhatsApp.
 *
 * Tony pidió que la persona solo escriba su número y que el código de país
 * se elija aparte. Costa Rica va de primero porque es de donde viene la
 * mayoría.
 *
 * Vive acá y no dentro de un componente porque lo usan los dos formularios
 * que piden WhatsApp: la puerta de los recursos y el informe de la
 * calculadora.
 */
export const PAISES = [
  { codigo: '+506', pais: 'Costa Rica',       corto: 'CR', ejemplo: '8888 8888' },
  { codigo: '+1',   pais: 'EE. UU. / Canadá', corto: 'US', ejemplo: '305 555 0123' },
  { codigo: '+52',  pais: 'México',           corto: 'MX', ejemplo: '55 1234 5678' },
  { codigo: '+57',  pais: 'Colombia',         corto: 'CO', ejemplo: '300 1234567' },
  { codigo: '+34',  pais: 'España',           corto: 'ES', ejemplo: '612 34 56 78' },
  { codigo: '+507', pais: 'Panamá',           corto: 'PA', ejemplo: '6123 4567' },
  { codigo: '+503', pais: 'El Salvador',      corto: 'SV', ejemplo: '7123 4567' },
  { codigo: '+502', pais: 'Guatemala',        corto: 'GT', ejemplo: '5123 4567' },
  { codigo: '+504', pais: 'Honduras',         corto: 'HN', ejemplo: '9123 4567' },
  { codigo: '+505', pais: 'Nicaragua',        corto: 'NI', ejemplo: '8123 4567' },
  { codigo: '+54',  pais: 'Argentina',        corto: 'AR', ejemplo: '11 1234 5678' },
  { codigo: '+56',  pais: 'Chile',            corto: 'CL', ejemplo: '9 1234 5678' },
  { codigo: '+51',  pais: 'Perú',             corto: 'PE', ejemplo: '912 345 678' },
  { codigo: '+593', pais: 'Ecuador',          corto: 'EC', ejemplo: '99 123 4567' },
  { codigo: '+58',  pais: 'Venezuela',        corto: 'VE', ejemplo: '412 1234567' },
] as const
