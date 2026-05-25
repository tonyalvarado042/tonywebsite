# GEO / AI Discoverability — Documentación de implementación

**Fecha de implementación:** 2026-05-22
**Alcance:** Preparación avanzada de datos estructurados y señales para buscadores e IAs.

---

## 1. Qué se implementó

### Centralización de datos — `src/lib/structured-data.ts`

Archivo central con todos los datos estructurados reutilizables:

| Export | Tipo | @id |
|--------|------|-----|
| `websiteSchema` | WebSite | `https://tonyalvarado.com/#website` |
| `personSchema` | Person | `https://tonyalvarado.com/#tony-alvarado` |
| `puroMTBOrg` | Organization | `https://tonyalvarado.com/#puromtb` |
| `pureCyclingOrg` | Organization | `https://tonyalvarado.com/#pure-cycling` |
| `bikeBedOrg` | Organization | `https://tonyalvarado.com/#bike-bed-hotels` |
| `bookSchema` | Book | `https://tonyalvarado.com/#secretos-empresario-exitoso` |
| `websiteRef` | referencia | — |
| `personRef` | referencia | — |

Todos los schemas usan `@id` consistentes para que los crawlers puedan resolver entidades relacionadas entre páginas.

---

### Schemas por página

| Página | Schemas presentes |
|--------|-------------------|
| `/` (homepage) | WebSite, Person, FAQPage, WebPage, Organization (PuroMTB) |
| `/sobre-mi` | WebPage, BreadcrumbList |
| `/pure-cycling` | WebPage, BreadcrumbList, Organization (Pure Cycling) |
| `/bike-bed-hotels` | WebPage, BreadcrumbList, Organization (Bike & Bed Hotels) |
| `/libros` | WebPage, BreadcrumbList, Book |
| `/conferencias` | WebPage, BreadcrumbList |
| `/contacto` | WebPage, BreadcrumbList |

**Nota:** WebSite y Person se emiten desde `layout.tsx` y aparecen en todas las páginas.

---

### WebPage Schema — patrón usado

Cada WebPage incluye:
- `name` y `description` — coinciden con el `<title>` y `<meta description>` de la página
- `url` — URL canónica completa
- `inLanguage: es-CR`
- `isPartOf` — apunta al `@id` del WebSite
- `about` — apunta al Person y/o entidad principal de la página

---

### BreadcrumbList — patrón usado

Dos elementos por página:
1. `Inicio` → `https://tonyalvarado.com`
2. `[Nombre de la página]` → `https://tonyalvarado.com/[ruta]`

Permite que los buscadores muestren rutas de navegación en los resultados de búsqueda (rich results).

---

### Organization Schema — PuroMTB

Incluye `foundingDate: '2004'` porque está confirmado en CLAUDE.md.
Pure Cycling y Bike & Bed Hotels no tienen `foundingDate` por no estar confirmado con exactitud.

---

### Book Schema — "Secretos para ser un empresario exitoso"

- `author` y `publisher` apuntan al `@id` de Tony Alvarado
- `inLanguage: es`
- No incluye `offers`, ISBN, URL de Amazon ni afirmación de disponibilidad de compra
- Pendiente: ISBN, URL de Amazon (cuando el cliente lo proporcione)

---

### `public/llms.txt`

Archivo de texto plano accesible en `https://tonyalvarado.com/llms.txt`.
Resume el sitio para crawlers de IA (ChatGPT, Claude, Perplexity, etc.) de forma factual.
No garantiza indexación — es una señal informativa, no un estándar oficial.

---

### `public/robots.txt` (ya existía)

Permite indexación a todos los crawlers, incluidos GPTBot, ClaudeBot y PerplexityBot.
Apunta al sitemap: `https://tonyalvarado.com/sitemap.xml`.

---

## 2. Qué quedó preparado para cuando llegue información del cliente

| Dato pendiente | Dónde agregar | Archivo a editar |
|----------------|---------------|-----------------|
| URL de Amazon del libro | `bookSchema` → campo `offers` o `url` | `src/lib/structured-data.ts` |
| ISBN del libro | `bookSchema` → campo `isbn` | `src/lib/structured-data.ts` |
| URL de Skool (Pure Cycling) | `pureCyclingOrg` → campo `url` | `src/lib/structured-data.ts` |
| LinkedIn de Tony | `personSchema` → campo `sameAs[]` | `src/lib/structured-data.ts` |
| Instagram de Tony / PuroMTB | `personSchema` → campo `sameAs[]` | `src/lib/structured-data.ts` |
| YouTube de Tony / PuroMTB | `personSchema` → campo `sameAs[]` | `src/lib/structured-data.ts` |
| WhatsApp del equipo | Formulario de contacto | `src/components/sections/Contact.tsx` |
| Logos de empresas | `puroMTBOrg`, `pureCyclingOrg`, `bikeBedOrg` → campo `logo` | `src/lib/structured-data.ts` |
| Wikidata ID de Tony | `personSchema` → `sameAs[]` | `src/lib/structured-data.ts` |

---

## 3. Qué NO se implementó y por qué

| Elemento | Razón |
|----------|-------|
| `sameAs` en Person | URLs de redes sociales no confirmadas |
| `interactionStatistic` | Requiere datos exactos verificables |
| `aggregateRating` en Organization | Requiere sistema de reseñas integrado |
| `offers` en Book | URL de Amazon pendiente |
| `isbn` en Book | No confirmado |
| Blog o artículos SEO | No autorizado en esta fase |
| Versión en inglés | No autorizada en esta fase |
| Wikipedia / Wikidata | Sin fuentes independientes suficientes aún |
| Schema de Event | Sin eventos confirmados |

---

## 4. Cómo validar

### Schema.org Validator
- URL: https://validator.schema.org/
- Ingresa `https://tonyalvarado.com` para validar schemas del homepage
- Ingresa cada ruta interna para verificar WebPage, BreadcrumbList y schemas específicos

### Google Rich Results Test
- URL: https://search.google.com/test/rich-results
- Permite verificar FAQPage y BreadcrumbList como rich results elegibles

### Inspección directa
- `https://tonyalvarado.com/llms.txt` — verificar que el archivo es accesible
- `https://tonyalvarado.com/sitemap.xml` — verificar rutas indexadas
- `https://tonyalvarado.com/robots.txt` — verificar crawlers permitidos

### Google Search Console (cuando esté disponible)
- Verificar propiedad del dominio
- Inspeccionar URLs para verificar indexación
- Revisar cobertura de sitemap

---

## 5. Notas de mantenimiento

- Cuando se agreguen redes sociales, actualizar solo `src/lib/structured-data.ts`
- Cuando llegue la URL de Amazon, actualizar `bookSchema` en `src/lib/structured-data.ts`
- Cuando se confirmen logos, agregar campo `logo` a cada Organization en `src/lib/structured-data.ts`
- No modificar este archivo de documentación salvo para registrar cambios relevantes de la implementación
