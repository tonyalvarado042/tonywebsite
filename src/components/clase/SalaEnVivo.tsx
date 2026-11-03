'use client'

import { useEffect, useState } from 'react'
import { estadoDeLaSala, segundoDelVideo, faltaPara, faltaTexto, toca } from '@/lib/sala-webinar'
import type { Estado } from '@/lib/sala-webinar'

/**
 * La sala, del lado del navegador.
 *
 * ── Por qué el estado llega calculado desde el servidor ────────────────
 * `estadoAlCargar` y `segundoAlCargar` vienen como props y no se calculan
 * acá en el primer render. Si se calcularan en el cliente, el HTML del
 * servidor diría una cosa y el navegador otra, y React tira el aviso de
 * hidratación. Después del primer render sí manda el reloj del visitante,
 * que es el que tiene que mandar.
 *
 * ⚠️ El reloj del visitante puede estar mal. Es un riesgo conocido y
 * aceptado: la alternativa —pedirle la hora al servidor cada segundo— son
 * 4.800 peticiones por persona en una clase de 80 minutos. Lo que sí se
 * hace es anclar: al cargar, el servidor manda su segundo, y de ahí el
 * navegador cuenta solo. Una diferencia de reloj corre la sala, no la parte.
 */

type Props = {
  nombre: string
  cuandoTexto: string
  instanteUtc: string
  duracionMin: number
  puertaMin: number
  estadoAlCargar: Estado
  segundoAlCargar: number
  videoProveedor: 'cloudflare' | 'youtube' | 'vimeo'
  videoId: string | null
  ctaSegundo: number | null
  ctaTexto: string | null
  ctaUrl: string | null
  repeticionUrl: string | null
  grupoUrl: string | null
}

export default function SalaEnVivo(p: Props) {
  const sala = {
    instanteUtc: p.instanteUtc,
    duracionMin: p.duracionMin,
    puertaMin: p.puertaMin,
  }

  const [estado, setEstado] = useState<Estado>(p.estadoAlCargar)
  const [segundo, setSegundo] = useState(p.segundoAlCargar)
  const [falta, setFalta] = useState(() => faltaPara(sala, new Date(p.instanteUtc)))

  // El desfase entre el reloj del visitante y el del servidor, medido una
  // sola vez al cargar. De ahí en adelante se le suma a la hora local.
  const [desfase] = useState(() => {
    const suyo = segundoDelVideo(sala, new Date())
    return (p.segundoAlCargar - suyo) * 1000
  })

  useEffect(() => {
    const tic = () => {
      const ahora = new Date(Date.now() + desfase)
      setEstado(estadoDeLaSala(sala, ahora))
      setSegundo(segundoDelVideo(sala, ahora))
      setFalta(faltaPara(sala, ahora))
    }
    tic()
    const id = setInterval(tic, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [desfase, p.instanteUtc, p.duracionMin, p.puertaMin])

  const mostrarCta = toca(p.ctaSegundo, segundo) && p.ctaUrl && p.ctaTexto

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
      <header className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-muted">
          {estado === 'envivo' ? 'En vivo ahora' : 'Clase gratuita'}
        </p>
        <h1 className="mt-3 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
          {p.nombre}
        </h1>
        <p className="mt-3 text-sm text-brand-muted">{p.cuandoTexto}</p>
      </header>

      {/* ── Falta ──────────────────────────────────────────────────────── */}
      {(estado === 'antes' || estado === 'puerta') && (
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-12">
          <p className="text-sm text-brand-muted">
            {estado === 'puerta' ? 'Ya podés quedarte acá. Empieza en' : 'Empieza en'}
          </p>
          <p
            className="mt-2 text-5xl font-semibold tabular-nums sm:text-6xl"
            aria-live="polite"
            suppressHydrationWarning
          >
            {faltaTexto(falta)}
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-brand-muted">
            No cierres esta página: cuando empiece, la clase arranca sola acá
            mismo. No hay que entrar con clave ni instalar nada.
          </p>
          {p.grupoUrl && (
            <a
              href={p.grupoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-block rounded-xl border border-white/15 px-5 py-3 text-sm font-medium transition hover:bg-white/5"
            >
              Mientras tanto, entrá al grupo
            </a>
          )}
        </section>
      )}

      {/* ── Corriendo ──────────────────────────────────────────────────── */}
      {estado === 'envivo' && (
        <section className="mt-8">
          {p.videoId ? (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
              {/*
                ⚠️ `startTime` se pone UNA vez, al montar: el video arranca en
                el minuto que corresponde según el reloj y de ahí corre solo.
                Volver a escribir el src cada segundo lo reiniciaría.

                ⚠️ Sin controles y sin teclado a propósito. Si se pudiera
                adelantar, dejaría de ser una clase y pasaría a ser un archivo
                de video — y el chat, que va por segundo, no cuadraría con
                nada de lo que la persona está viendo.
              */}
              <iframe
                key="reproductor"
                src={`https://iframe.videodelivery.net/${p.videoId}?autoplay=true&muted=false&controls=false&startTime=${p.segundoAlCargar}s`}
                title={p.nombre}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen
                className="aspect-video w-full"
              />
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-400/30 bg-amber-400/5 p-8 text-center">
              <p className="font-medium">La clase ya empezó, pero el video todavía no está cargado.</p>
              <p className="mt-2 text-sm text-brand-muted">
                Falta subir la grabación a Cloudflare Stream y pegar su identificador
                en la sala. Mientras tanto no se muestra un reproductor roto.
              </p>
            </div>
          )}
        </section>
      )}

      {/* ── La CTA, en su minuto ───────────────────────────────────────── */}
      {mostrarCta && (
        <section className="mt-8 text-center">
          <a
            href={p.ctaUrl!}
            className="inline-block rounded-xl bg-brand-accent px-8 py-4 text-base font-semibold text-black transition hover:brightness-110"
          >
            {p.ctaTexto}
          </a>
        </section>
      )}

      {/* ── Terminó ────────────────────────────────────────────────────── */}
      {estado === 'despues' && (
        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
          <h2 className="text-xl font-semibold">La clase ya terminó</h2>
          <p className="mt-3 text-sm text-brand-muted">
            {p.repeticionUrl
              ? 'Podés verla de nuevo acá abajo.'
              : 'Si te la perdiste, escribinos por el grupo y te contamos cuándo es la próxima.'}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {p.repeticionUrl && (
              <a
                href={p.repeticionUrl}
                className="rounded-xl bg-brand-accent px-6 py-3 text-sm font-semibold text-black"
              >
                Ver la repetición
              </a>
            )}
            {p.ctaUrl && p.ctaTexto && (
              <a
                href={p.ctaUrl}
                className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/5"
              >
                {p.ctaTexto}
              </a>
            )}
          </div>
        </section>
      )}
    </main>
  )
}
