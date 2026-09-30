import Link from 'next/link'
import { redirect } from 'next/navigation'
import { CheckCircle2, XCircle } from 'lucide-react'
import { darDeBajaPorCodigo, hayCrm } from '@/lib/crm'

/**
 * «No quiero más mensajes» — la salida de los SMS.
 *
 * ── Por qué existe aparte de /baja ──────────────────────────────────────────
 * El enlace del correo (`/baja?id=<uuid 36>&f=<hmac 32>`) mide 104 caracteres.
 * Un SMS a Costa Rica tiene 160 y no admite concatenación, así que ese enlace
 * se come dos tercios del mensaje. Con el código opaco de 10 caracteres el
 * enlace queda en 29:
 *
 *     tonyalvarado.com/b/K7M2QX9TAB
 *
 * ── 🚨 Por qué esta va de DOS PASOS y /baja no ──────────────────────────────
 * `/baja` da de baja en el render del GET, a propósito: «una baja se respeta a
 * la primera». Para el correo es defendible.
 *
 * Para SMS **no**. El reglamento de SUTEL contra el smishing hace que los
 * operadores de Costa Rica escaneen los enlaces del tráfico automático. Un
 * escáner siguiendo este enlace daría de baja, en silencio, a alguien que nunca
 * lo pidió — y esa persona se entera cuando deja de recibir lo que sí quería.
 *
 * Así que el GET solo muestra un botón. La baja ocurre en el POST, que ningún
 * escáner dispara.
 */

export const metadata = {
  title: 'Salir de la lista — Tony Alvarado',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ codigo: string }>
  searchParams: Promise<{ listo?: string }>
}

export default async function SalirPage({ params, searchParams }: Props) {
  const { codigo } = await params
  const { listo } = await searchParams

  async function salir() {
    'use server'
    // Se responde igual si el código no existe, si es válido o si la persona ya
    // estaba fuera: quien prueba códigos al azar no aprende nada de la página.
    if (hayCrm()) await darDeBajaPorCodigo(codigo)
    redirect(`/b/${codigo}?listo=1`)
  }

  const hecho = listo === '1'

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-brand-bg px-5 py-20">
      <div className="w-full max-w-md text-center">
        <span
          className={`mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl ring-1 ${
            hecho
              ? 'bg-brand-green/10 ring-brand-green/25'
              : 'bg-brand-warm/10 ring-brand-warm/25'
          }`}
        >
          {hecho ? (
            <CheckCircle2 size={24} className="text-brand-green" />
          ) : (
            <XCircle size={24} className="text-brand-warm" />
          )}
        </span>

        <h1 className="mb-4 text-2xl font-bold tracking-tight text-brand-text sm:text-3xl">
          {hecho ? 'Listo, no te escribo más.' : '¿Querés salir de la lista?'}
        </h1>

        <p className="mb-8 text-[15px] leading-relaxed text-brand-muted">
          {hecho
            ? 'Te saqué de la lista en este momento. No vas a recibir más mensajes míos, y no hace falta que hagas nada más.'
            : 'Si confirmás, dejo de mandarte mensajes de texto y correos. Se respeta de una y no hay que explicar nada.'}
        </p>

        {hecho ? (
          <Link
            href="/"
            className="inline-flex min-h-[48px] items-center justify-center rounded-2xl border
                       border-brand-green/40 px-7 text-sm font-semibold text-brand-green
                       transition-colors hover:bg-brand-green/10"
          >
            Volver al sitio
          </Link>
        ) : (
          <form action={salir}>
            <button
              type="submit"
              className="inline-flex min-h-[48px] items-center justify-center rounded-2xl
                         bg-brand-green px-7 text-sm font-semibold text-brand-bg
                         transition-opacity hover:opacity-90"
            >
              Sí, sacame de la lista
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
