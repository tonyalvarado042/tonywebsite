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

        // ── BIKE & BED ────────────────────────────────────────────────────
        // Espacio propio, aparte de `brand-*`, porque es OTRA marca: la de
        // Bike & Bed, que se usa solo en /ride-and-reset. Nada morado entra acá.
        //
        // Los dos archivos de logo que pasó Tony se llaman «varios colores»
        // pero no lo son: son blanco y negro puro, sin transparencia. Bike &
        // Bed no tiene color de marca.
        bnb: {
          // ⚠️ Negro EXACTO, no un casi-negro. El logo blanco viene con fondo
          // #000000 sólido: sobre cualquier otro tono se le vería la caja.
          negro: '#000000',
          carbon: '#0A0A0A',   // superficies apenas levantadas del fondo
          tarjeta: '#121212',
          borde: '#262626',

          blanco: '#FFFFFF',   // 21.00:1 sobre negro
          humo: '#B3B3B3',     // 10.02:1 — texto secundario
          tenue: '#8A8A8A',    //  6.08:1 — lo más apagado que se permite

          // El acento. NO es un color de marca: es una decisión de diseño que
          // tomó Tony (lava del Arenal). Por eso se usa SOLO en el botón que
          // captura el lead. Si aparece en varios lados, deja de gritar.
          //
          // 6.73:1 sobre el fondo negro, y 6.73:1 con texto negro encima —
          // pasa WCAG AA en los dos sentidos. Verificado, no calculado a ojo.
          lava: '#FF5A1F',
          'lava-fuerte': '#E04A12', // 5.16:1 — el hover
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],

        // Las de Bike & Bed, solo para /ride-and-reset. Son las mismas que usa
        // bikeandbedhotels.com: DM Sans para leer, Poppins para los títulos.
        bnb: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        'bnb-titulo': ['var(--font-poppins)', 'var(--font-dm-sans)', 'system-ui', 'sans-serif'],
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
