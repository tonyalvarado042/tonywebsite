import Link from 'next/link'
import { CheckCircle2, XCircle } from 'lucide-react'
import { darDeBaja, hayCrm } from '@/lib/crm'
import { verificarBaja } from '@/lib/secuencias'

/**
 * «No quiero más correos».
 *
 * Se llega desde el pie de cualquier correo. Da de baja de una — sin pedir
 * confirmación, sin login, sin encuestas de retención. La regla de Tony es que
 * una baja se respeta a la primera.
 *
 * `noindex` a propósito: es una página de acción, no de contenido.
 */

export const metadata = {
  title: 'Darse de baja — Tony Alvarado',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ id?: string; f?: string }> }

export default async function BajaPage({ searchParams }: Props) {
  const { id, f } = await searchParams

  let estado: 'ok' | 'invalido' | 'error' = 'invalido'

  if (id && f && hayCrm()) {
    try {
      if (verificarBaja(id, f)) {
        estado = (await darDeBaja(id, 'enlace de baja en un correo')) ? 'ok' : 'error'
      }
    } catch {
      estado = 'error'
    }
  }

  const exito = estado === 'ok'

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-brand-bg px-5 py-20">
      <div className="w-full max-w-md text-center">
        <span
          className={`mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${
            exito
              ? 'bg-brand-green/10 ring-brand-green/25'
              : 'bg-brand-warm/10 ring-brand-warm/25'
          }`}
        >
          {exito ? (
            <CheckCircle2 size={24} className="text-brand-green" />
          ) : (
            <XCircle size={24} className="text-brand-warm" />
          )}
        </span>

        <h1 className="mb-4 text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">
          {exito ? 'Listo, no te escribo más.' : 'No pudimos procesar la baja'}
        </h1>

        <p className="mb-8 text-[15px] leading-relaxed text-brand-muted">
          {exito
            ? 'Te saqué de la lista en este momento. No vas a recibir más correos míos, y no hace falta que hagas nada más.'
            : 'Puede que el enlace esté incompleto o haya vencido. Escribime a contacto y te saco de la lista a mano — no necesitás explicar nada.'}
        </p>

        <Link
          href={exito ? '/' : '/contacto'}
          className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border
                     border-brand-green/40 px-7 text-sm font-semibold text-brand-green
                     transition-colors hover:bg-brand-green/10"
        >
          {exito ? 'Volver al sitio' : 'Ir a contacto'}
        </Link>
      </div>
    </main>
  )
}
