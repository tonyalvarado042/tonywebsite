import { NextResponse } from 'next/server'
import { leerGrupoUrl } from '@/lib/clase-ajustes'

/**
 * `clase.tonyalvarado.com/grupo` → el grupo de WhatsApp de la clase.
 *
 * ── Para qué existe ────────────────────────────────────────────────────────
 * El botón «Entrar al grupo» de las plantillas de WhatsApp apunta acá y no al
 * enlace de `chat.whatsapp.com` directo. Dos razones, y las dos pesan:
 *
 * 1. **Una plantilla aprobada por Meta no se edita: se vuelve a someter.** Con
 *    el enlace del grupo quemado en el botón, cambiar de grupo —algo que va a
 *    pasar, los grupos tienen tope— significa plantilla nueva y 24 a 48 horas
 *    de revisión. Con esta redirección, el grupo se cambia en el CRM y la
 *    plantilla ni se entera.
 * 2. El dominio del botón es el de Tony, no un enlace de invitación suelto.
 *
 * Sirve igual para el correo, la página de gracias y cualquier otro lado: un
 * solo lugar donde cambiar el grupo.
 *
 * ── De dónde sale el enlace ────────────────────────────────────────────────
 * Del CRM (Ajustes → El lanzamiento del webinar), y del código si el CRM no
 * responde. `leerGrupoUrl()` explica por qué este campo **no** espera al
 * interruptor general de la clase.
 *
 * ⚠️ **302, no 301.** Un permanente lo cachea el navegador para siempre: el
 * día que el grupo cambie, quien ya tocó el botón seguiría aterrizando en el
 * grupo viejo y no habría forma de arreglárselo desde acá.
 *
 * ⚠️ **Dinámica a propósito.** Si Next la volviera estática, el enlace
 * quedaría congelado en el del despliegue y cambiarlo en el CRM no serviría
 * de nada — que es exactamente lo que esta ruta existe para evitar.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.redirect(await leerGrupoUrl(), 302)
}
