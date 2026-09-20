import { NextResponse } from 'next/server'
import { generarIcs } from '@/lib/calendario-clase'

/**
 * El archivo `.ics` de la clase.
 *
 * Es el camino de Apple Calendar, del Outlook de escritorio y de cualquier
 * cliente que lea un archivo de calendario. Google y Outlook web tienen su
 * propio enlace directo y no pasan por acá.
 *
 * ── Los dos encabezados que importan ────────────────────────────────────────
 * `text/calendar` es lo que hace que el iPhone abra el evento en vez de
 * mostrar un archivo de texto. Y `Content-Disposition: attachment` con un
 * nombre en ASCII evita que un nombre con tildes llegue destrozado a Windows.
 *
 * No escribe nada ni lee el CRM: es un GET público y estático.
 */

export function GET() {
  return new NextResponse(generarIcs(), {
    headers: {
      'content-type': 'text/calendar; charset=utf-8',
      'content-disposition': 'attachment; filename="clase-tony-alvarado.ics"',
      // El evento no cambia, pero la fecha es fija y cercana: una hora de caché
      // alcanza y deja margen por si hay que corregir algo antes del día.
      'cache-control': 'public, max-age=3600',
    },
  })
}
