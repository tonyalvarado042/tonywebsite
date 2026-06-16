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
          accent: '#39D98A',
          'accent-light': '#86EFAC',
          text: '#F0F0F0',
          muted: '#9CA3AF',
          border: '#1F2937',
          warm: '#D7BA9E',
          deep: '#071410',
          pop: '#1DCBBC',
          green: '#39D98A',
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
