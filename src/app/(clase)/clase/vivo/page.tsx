import type { Metadata } from 'next'
import Link from 'next/link'
import { leerSala } from '@/lib/sala-ajustes'
import { estadoDeLaSala, segundoDelVideo } from '@/lib/sala-webinar'
import { partesCr, MESES, horaTexto } from '@/lib/fechas-cr'
import SalaEnVivo from '@/components/clase/SalaEnVivo'

/**
 * La sala del webinar — `clase.tonyalvarado.com/vivo`
 *
 * Tony, 3 de noviembre de 2026: «clase.tonyalvarado.com es la landing de
 * registro, debe quedar ahí en /vivo».
 *
 * ── Por qué la dirección es fija y no lleva la fecha ───────────────────
 * Primero iba a ser `/TonyAlvarado/17-noviembre`. Con `/vivo` el enlace
 * **no cambia entre lanzamientos**: los correos, el grupo de WhatsApp, los
 * reels y el bot de ManyChat apuntan siempre al mismo lugar, y mover la
 * clase deja de ser «y actualizá el enlace en seis lados». Cuál sala se
 * sirve lo decide el CRM, no la URL.
 *
 * ── Y por qué no un comodín en la raíz ─────────────────────────────────
 * `next.config.ts` ya tiene escrita la lección: «Nada de `/:slug*`: un
 * comodín se tragaría `/favicon.ico` y cualquier archivo suelto de la
 * raíz». Por eso `/vivo` es una ruta exacta más, como `/gracias` y `/vip`.
 *
 * ⚠️ Esta página es de SERVIDOR. Lee la sala con la llave de servicio y le
 * pasa al navegador solo lo imprescindible. El guion del chat no sale de
 * acá ni por error: lo sirve una ruta aparte, y solo lo que ya pasó.
 */

export const metadata: Metadata = {
  title: 'La clase, en vivo',
  // No tiene nada que hacer en Google: es una sala, no una página.
  robots: { index: false, follow: false },
}

// La sala depende del reloj: no se puede guardar en caché ni un minuto.
export const dynamic = 'force-dynamic'
export const revalidate = 0

function cuandoEsEnPalabras(instanteUtc: string): string {
  const p = partesCr(new Date(instanteUtc))
  // ⚠️ `diaSemana` ya viene como palabra y `mes` viene 1-based: así lo usan
  // `clase-fechas.ts` y `vip-fechas.ts`. Indexarlos de más saca «undefined»
  // y un mes corrido.
  return `${p.diaSemana} ${p.dia} de ${MESES[p.mes - 1]} · ${horaTexto(p.hora, p.minuto)} de Costa Rica`
}

export default async function Vivo() {
  const sala = await leerSala('vivo')

  // ⚠️ Sin sala no se inventa nada. Una página que dice «empieza en 00:00»
  // porque no pudo leer la fecha es peor que una que dice que no hay nada.
  if (!sala) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-semibold">Todavía no hay una clase abierta acá</h1>
        <p className="mt-3 text-brand-muted">
          Cuando haya una, este mismo enlace te lleva directo a la sala. No hay que
          registrarse de nuevo ni entrar con clave.
        </p>
        <Link href="/" className="mt-7 underline underline-offset-4">
          Ver la próxima clase
        </Link>
      </main>
    )
  }

  const ahora = new Date()
  const estado = estadoDeLaSala(sala, ahora)

  return (
    <SalaEnVivo
      nombre={sala.nombre}
      cuandoTexto={cuandoEsEnPalabras(sala.instanteUtc)}
      instanteUtc={sala.instanteUtc}
      duracionMin={sala.duracionMin}
      puertaMin={sala.puertaMin}
      estadoAlCargar={estado}
      segundoAlCargar={segundoDelVideo(sala, ahora)}
      videoProveedor={sala.videoProveedor}
      videoId={sala.videoId}
      ctaSegundo={sala.ctaSegundo}
      ctaTexto={sala.ctaTexto}
      ctaUrl={sala.ctaUrl}
      repeticionUrl={sala.repeticionUrl}
      grupoUrl={sala.grupoUrl}
    />
  )
}
