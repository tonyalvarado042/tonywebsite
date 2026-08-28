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
    },
  },
  plugins: [],
}

export default config
