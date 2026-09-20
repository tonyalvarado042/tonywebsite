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

          // ── Los campos de formulario ────────────────────────────────
          // Tony, 20 de setiembre de 2026: «estos campos deben resaltar mas se
          // ven muy oscuros». Tenía razón — estaban en `brand-bg/80`, o sea **más
          // oscuros que la tarjeta que los contiene**, y en un fondo oscuro un
          // campo oscuro se lee como un hueco, no como algo donde escribir.
          //
          // Es la misma receta que ya se había medido para Bike & Bed, traída a
          // esta paleta. Tres cosas, todas medidas y no a ojo:
          //  · el campo es MÁS CLARO que la tarjeta `card` #111824 → 1.32:1
          //  · el contorno pasa 3:1 contra LAS DOS cosas que toca — la tarjeta y
          //    el interior del campo — que es lo que pide WCAG 1.4.11 para el
          //    borde de un control → 4.26:1 y 3.22:1
          //  · el texto de ejemplo llega a 5.30:1 sobre el campo
          //    (antes iba en `muted/70`, lavado)
          // El texto escrito queda en 11.8:1.
          //
          // ⚠️ El primer intento puso el borde en `#64748B`: daba 3.74:1 contra
          // la tarjeta pero **2.83:1 contra el campo**, o sea que por el lado de
          // adentro no llegaba. Se midió en el navegador y se subió. Un borde
          // solo sirve si se distingue de los dos lados.
          campo: '#232F44',
          'campo-borde': '#6E7D94',

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

          // ── El formulario ────────────────────────────────────────────────
          // Tony pidió que los campos se vieran más. En un fondo negro un
          // campo negro se lee como un hueco, no como algo donde escribir.
          //
          // Se resolvió con tres cosas medidas, no a ojo:
          //  · el campo es MÁS CLARO que la tarjeta que lo contiene
          //  · el contorno pasa 3:1 contra la tarjeta, que es lo que pide
          //    WCAG 1.4.11 para el borde de un control
          //  · el texto de ejemplo sube a 6:1 (antes iba en 4.94:1)
          campo: '#1C1C1C',         // encima de `tarjeta` #121212
          'borde-campo': '#6E6E6E', // 3.67:1 contra la tarjeta
          ejemplo: '#9A9A9A',       // 6.06:1 sobre el campo

          // ── El acento ────────────────────────────────────────────────────
          // Verde lima, el del arte de la campaña. Tony lo pidió el 5 de
          // septiembre de 2026; antes acá había un naranja lava que había
          // deducido yo del sitio viejo. Este SÍ sale de una pieza real de la
          // marca, así que ya no es una suposición.
          //
          // **12.62:1 sobre el fondo negro, y 12.62:1 con texto negro encima.**
          // Pasa WCAG AA de sobra en los dos sentidos — el naranja anterior iba
          // raspando en 6.73:1. O sea que además de ser el color correcto, se
          // lee bastante mejor. Medido, no calculado a ojo.
          verde: '#7CE04A',
          'verde-fuerte': '#63C433', // 9.47:1 — el hover
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
        // La barra de avance de la página de gracias.
        //
        // Va en CSS y no en JavaScript a propósito: la página de gracias es un
        // componente de servidor y no hacía falta convertirla en cliente entera
        // para animar una barra.
        //
        // ⚠️ Anima `scaleX`, NO `width`, y eso no es un detalle: el ancho real
        // lo pone la clase `w-[80%]` del elemento. Así, si la animación no
        // corre —porque el navegador no la soporta, porque la pestaña está
        // oculta o porque alguien pidió menos movimiento— la barra se queda en
        // su estado CORRECTO (80%) en vez de quedarse en cero.
        //
        // La primera versión animaba `width` de 0 a 80 con `both`: con la
        // pestaña oculta la barra medía 0 px. Se vio midiendo en el navegador.
        // Una animación que falla tiene que fallar mostrando el resultado, no
        // escondiéndolo.
        llenar80: {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
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
        // Sin retraso: con retraso y `both` la barra se queda en cero mientras
        // espera, y si algo interrumpe la animación ahí, se queda vacía.
        llenar80: 'llenar80 1.2s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
}

export default config
