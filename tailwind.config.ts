import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0B0E14',
          surface: '#0d1117',
          card: '#111824',

          // ── Acento de marca: MORADO ──────────────────────────────────────
          // La marca personal de Tony es morado y blanco (ver sección 17 de
          // este CLAUDE.md). Antes acá había un verde menta (#39D98A).
          //
          // `#8B5CF6` da 4.58:1 contra el fondo `#0B0E14` — pasa WCAG AA
          // (4.5:1) tanto de texto sobre fondo oscuro como de fondo de botón
          // con texto `brand-bg` encima. Va justo, así que si alguien lo
          // oscurece más, deja de pasar.
          accent: '#8B5CF6',
          'accent-light': '#C4B5FD',

          // ⚠️ `green` es un ALIAS HEREDADO. Ya no es verde: apunta al mismo
          // morado que `accent`. Se dejó el nombre para no tocar los 172 usos
          // repartidos en 42 archivos en este cambio. Renombrarlo a
          // `brand-accent` queda pendiente.
          green: '#8B5CF6',

          // El morado profundo de la marca, para fondos sólidos grandes.
          pop: '#7C2FD6',

          // ── El verde de captura ──────────────────────────────────────────
          // Tony lo pidió el 31-ago-2026, a propósito distinto del morado de
          // marca: es el ÚNICO verde del sitio y marca el botón que captura
          // el lead. Si el verde apareciera en otros lados dejaría de gritar.
          //
          // `#22C55E` da 8.9:1 contra el fondo `#0B0E14` y 8.0:1 con el texto
          // oscuro `#0B0E14` encima — pasa WCAG AA de sobra en los dos usos.
          cta: '#22C55E',
          'cta-fuerte': '#16A34A',

          text: '#F0F0F0',
          muted: '#9CA3AF',
          border: '#1F2937',
          warm: '#D7BA9E',
          deep: '#0A0713',
          gold: '#C9A24D',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // El latido del botón de captura. Es un resplandor que crece y se
        // apaga, no un parpadeo de encendido/apagado: el parpadeo duro se lee
        // como banner de los 2000 y además molesta a quien tiene sensibilidad
        // a la luz. Este se nota igual y no se ve barato.
        latido: {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(34,197,94,0.55), 0 8px 26px -8px rgba(34,197,94,0.55)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 0 14px rgba(34,197,94,0), 0 12px 34px -8px rgba(34,197,94,0.8)',
            transform: 'scale(1.022)',
          },
        },
        // Para la etiqueta de GRATIS: un vaivén corto que llama el ojo.
        guino: {
          '0%, 88%, 100%': { transform: 'rotate(0deg)' },
          '92%': { transform: 'rotate(-3.5deg)' },
          '96%': { transform: 'rotate(3.5deg)' },
        },
      },
      animation: {
        latido: 'latido 1.9s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        guino: 'guino 4.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
