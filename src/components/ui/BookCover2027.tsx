/**
 * Portada provisional de "El nuevo negocio del turismo 2027".
 *
 * ⚠️ Es una portada tipográfica hecha en SVG, no el arte final. Se hizo así a
 * propósito: es preferible una portada diseñada a un mockup falso o un cuadro gris.
 *
 * Para cambiarla por la portada de verdad cuando exista:
 *   1. Poné el archivo en /public/images/books/turismo-2027-mockup.png
 *   2. En las páginas que la usan, sustituí <BookCover2027 /> por <Image ... />
 *      igual que hacen los otros dos libros.
 *
 * El motivo del fondo son curvas de nivel sobre la silueta del Arenal — el volcán
 * de La Fortuna, que es donde están Bike & Bed y Humaya.
 */
export default function BookCover2027({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 630"
      className={className}
      role="img"
      aria-label="El nuevo negocio del turismo 2027 — un libro de Tony Alvarado"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Fondo: negro con calor dorado subiendo desde el pie */}
        <linearGradient id="bc-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#080A0F" />
          <stop offset="55%" stopColor="#0C1018" />
          <stop offset="100%" stopColor="#16120A" />
        </linearGradient>

        {/* Resplandor del cráter */}
        <radialGradient id="bc-glow" cx="50%" cy="72%" r="55%">
          <stop offset="0%" stopColor="#C9A24D" stopOpacity="0.42" />
          <stop offset="60%" stopColor="#C9A24D" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#C9A24D" stopOpacity="0" />
        </radialGradient>

        <linearGradient id="bc-gold-solid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EBD4A0" />
          <stop offset="55%" stopColor="#C9A24D" />
          <stop offset="100%" stopColor="#8E7233" />
        </linearGradient>

        {/* El lomo: banda oscura a la izquierda que da volumen de libro */}
        <linearGradient id="bc-spine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000000" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </linearGradient>

        <clipPath id="bc-clip">
          <rect x="0" y="0" width="420" height="630" rx="3" />
        </clipPath>
      </defs>

      <g clipPath="url(#bc-clip)">
        <rect width="420" height="630" fill="url(#bc-bg)" />
        <rect width="420" height="630" fill="url(#bc-glow)" />

        {/* ── Curvas de nivel del volcán ── */}
        <g stroke="#C9A24D" fill="none" strokeLinecap="round">
          <path d="M-30 508 L118 352 Q210 262 302 352 L450 508" strokeOpacity="0.55" strokeWidth="1.5" />
          <path d="M-30 546 L108 388 Q210 288 312 388 L450 546" strokeOpacity="0.34" strokeWidth="1.2" />
          <path d="M-30 584 L98 424 Q210 314 322 424 L450 584" strokeOpacity="0.22" strokeWidth="1.1" />
          <path d="M-30 470 L130 320 Q210 244 290 320 L450 470" strokeOpacity="0.30" strokeWidth="1.1" />
          <path d="M-30 434 L146 292 Q210 232 274 292 L450 434" strokeOpacity="0.16" strokeWidth="1" />
        </g>

        {/* Cráter incandescente */}
        <ellipse cx="210" cy="286" rx="26" ry="7" fill="#C9A24D" opacity="0.5" />
        <ellipse cx="210" cy="286" rx="12" ry="3.5" fill="#F0DCA8" opacity="0.85" />

        {/* Textura de grano finísima */}
        <g fill="#FFFFFF" opacity="0.035">
          {Array.from({ length: 90 }, (_, i) => {
            const x = (i * 73.7) % 420
            const y = (i * 151.3) % 630
            return <circle key={i} cx={x} cy={y} r="0.9" />
          })}
        </g>

        {/* ── Filete superior ── */}
        <rect x="44" y="66" width="60" height="2" fill="#C9A24D" />

        {/* ── Antetítulo ── */}
        <text
          x="44" y="98"
          fill="#C9A24D"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="700"
          letterSpacing="4.2"
        >
          TONY ALVARADO
        </text>

        {/* ── Título ── */}
        <text
          fill="#F0F0F0"
          fontFamily="Inter, system-ui, sans-serif"
          fontWeight="800"
          letterSpacing="-1.2"
        >
          <tspan x="44" y="176" fontSize="45">EL NUEVO</tspan>
          <tspan x="44" y="222" fontSize="45">NEGOCIO</tspan>
          <tspan x="44" y="268" fontSize="45" fill="url(#bc-gold-solid)">DEL TURISMO</tspan>
        </text>

        {/* ── El año, enorme, al pie ── */}
        <text
          x="44" y="576"
          fill="none"
          stroke="url(#bc-gold-solid)"
          strokeWidth="2"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="132"
          fontWeight="800"
          letterSpacing="-4"
          opacity="0.92"
        >
          2027
        </text>

        {/* ── Bajada ── */}
        <rect x="44" y="306" width="34" height="1.5" fill="#C9A24D" opacity="0.7" />
        <text
          fill="#9CA3AF"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="13"
          letterSpacing="0.2"
        >
          <tspan x="44" y="334">Cómo se construyen y se operan</tspan>
          <tspan x="44" y="354">los hoteles de la próxima década.</tspan>
        </text>

        {/* ── Pie ── */}
        <text
          x="44" y="606"
          fill="#6B7280"
          fontFamily="Inter, system-ui, sans-serif"
          fontSize="10.5"
          fontWeight="600"
          letterSpacing="2.6"
        >
          COSTA RICA
        </text>

        {/* Lomo */}
        <rect x="0" y="0" width="26" height="630" fill="url(#bc-spine)" />
        <rect x="25.5" y="0" width="1" height="630" fill="#C9A24D" opacity="0.28" />

        {/* Borde */}
        <rect x="0.5" y="0.5" width="419" height="629" rx="3" fill="none" stroke="#C9A24D" strokeOpacity="0.22" />
      </g>
    </svg>
  )
}
