# Tony Alvarado — Sitio web oficial

Sitio web de autoridad digital para Tony Alvarado (Anthony Alvarado), coach y entrenador de ciclismo en Costa Rica, fundador de PuroMTB, Pure Cycling y Bike & Bed Hotels.

Construido como parte del proceso **Digital Authority Blueprint (DAB)**.

---

## Stack

- [Next.js 15](https://nextjs.org/) — App Router, Server Components, generación estática
- [TypeScript](https://www.typescriptlang.org/) — tipado estricto
- [Tailwind CSS](https://tailwindcss.com/) — diseño y tokens de marca
- [Framer Motion](https://www.framer.com/motion/) — animaciones en Client Components
- [Lucide React](https://lucide.dev/) — íconos

---

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación

```bash
# bash / macOS / Linux
npm install

# PowerShell / Windows
npm.cmd install
```

---

## Desarrollo local

```bash
# bash / macOS / Linux
npm run dev

# PowerShell / Windows
npm.cmd run dev
```

El sitio queda disponible en: http://localhost:3000

---

## Build de producción

```bash
# bash / macOS / Linux
npm run build
npm run start

# PowerShell / Windows
npm.cmd run build
npm.cmd run start
```

Para verificar tipos sin compilar:

```bash
npx tsc --noEmit

# PowerShell / Windows
npx.cmd tsc --noEmit
```

---

## Rutas del sitio

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage — presentación completa de Tony Alvarado |
| `/sobre-mi` | Historia personal, trayectoria y credenciales |
| `/pure-cycling` | Programa de entrenamiento de ciclismo online |
| `/bike-bed-hotels` | Hotel temático de ciclismo — información para inversionistas |
| `/libros` | Libros publicados y en desarrollo |
| `/conferencias` | Temas de conferencia y solicitud de eventos |
| `/contacto` | Formulario de contacto |
| `/sitemap.xml` | Sitemap generado automáticamente por Next.js |
| `/robots.txt` | Reglas de indexación |
| `/llms.txt` | Descripción del sitio para crawlers de IA |

---

## Archivos importantes

| Archivo / Carpeta | Descripción |
|-------------------|-------------|
| `CLAUDE.md` | Contexto estratégico del proyecto para Claude Code |
| `src/lib/structured-data.ts` | Central de datos estructurados Schema.org (Person, WebSite, Organizations, Book) |
| `src/components/JsonLd.tsx` | Componente para emitir JSON-LD en el HTML |
| `src/app/layout.tsx` | Layout global — WebSite y Person schemas |
| `src/app/page.tsx` | Homepage |
| `src/app/sitemap.ts` | Generación del sitemap dinámico |
| `public/robots.txt` | Reglas de crawling |
| `public/llms.txt` | Descripción para IAs |
| `public/images/` | Imágenes del sitio |
| `docs/` | Documentación técnica del proyecto |
| `.env.example` | Plantilla de variables de entorno necesarias |

---

## Variables de entorno

Copia `.env.example` y renómbralo a `.env.local` para desarrollo local:

```bash
cp .env.example .env.local
```

Ver `.env.example` para la lista completa de variables requeridas.
Ver `docs/integraciones-pendientes.md` para qué servicios necesita cada variable.

---

## Estado actual del proyecto

- Build: compilación correcta, 0 errores TypeScript
- Rutas estáticas: 11 rutas generadas en el último build
- SEO técnico: metadata, Open Graph, Twitter Cards, canonicals, sitemap, robots.txt
- Schema.org: WebSite, Person, WebPage (por página), BreadcrumbList (páginas internas), FAQPage (homepage), Organization (PuroMTB, Pure Cycling, Bike & Bed Hotels), Book
- GEO / AI: robots.txt permite crawlers de IA, llms.txt disponible
- Formulario de contacto: estructura lista, envío pendiente de configurar Resend
- Servicios externos pendientes: Resend, Google Analytics, Google Search Console, WhatsApp, Amazon URL, redes sociales

Ver `docs/integraciones-pendientes.md` para el detalle completo de lo que falta.
Ver `docs/deploy-vercel.md` para instrucciones de deploy.
