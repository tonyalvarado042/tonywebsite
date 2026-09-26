'use client'

import { useEffect } from 'react'
import { fbTrack } from '@/lib/meta-pixel'

/**
 * Dispara el evento de conversión del píxel de Meta.
 *
 * Va solo en `/clase/gracias`: es la página a la que se llega ya con el
 * registro guardado en el CRM (ver el comentario de esa página), así que es
 * el único lugar del embudo donde "llegó acá" significa "se registró de
 * verdad". `CompleteRegistration` en vez de `Lead` porque eso es exactamente
 * lo que pasó — no un lead a medias.
 */
export default function PixelRegistroCompletado() {
  useEffect(() => {
    fbTrack('CompleteRegistration')
  }, [])

  return null
}
