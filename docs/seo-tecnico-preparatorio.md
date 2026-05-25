# SEO Técnico Preparatorio — tonyalvarado.com

**Proyecto:** Digital Authority Blueprint — Tony Alvarado
**Fecha de implementación:** 2026-05-21
**Fase:** SEO técnico base (sin datos finales del cliente)

---

## 1. Qué se implementó

### 1.1 robots.txt (`public/robots.txt`)

- Permite indexación general para todos los crawlers (`User-agent: *`).
- No bloquea ningún crawler, incluidos Googlebot, Bingbot, GPTBot, ClaudeBot y PerplexityBot.
- Apunta al sitemap en `https://tonyalvarado.com/sitemap.xml`.
- Preparación GEO: los crawlers de IA pueden leer y procesar el contenido del sitio.

### 1.2 Sitemap dinámico (`src/app/sitemap.ts`)

Sitemap generado por Next.js 15 en formato `MetadataRoute.Sitemap`. Se sirve automáticamente en `/sitemap.xml`.

Rutas incluidas con prioridades:

| Ruta | changeFrequency | Priority |
|------|----------------|---------|
| `/` | weekly | 1.0 |
| `/pure-cycling` | weekly | 0.9 |
| `/sobre-mi` | monthly | 0.8 |
| `/bike-bed-hotels` | monthly | 0.8 |
| `/libros` | monthly | 0.7 |
| `/conferencias` | monthly | 0.7 |
| `/contacto` | yearly | 0.6 |

Criterios de prioridad:
- `/pure-cycling` en 0.9 por ser el CTA de mayor conversión del sitio.
- `/sobre-mi` y `/bike-bed-hotels` en 0.8 por valor de autoridad personal e inversión.
- `/contacto` en 0.6 porque su contenido no cambia y no tiene valor SEO propio.

### 1.3 Componente JsonLd (`src/components/JsonLd.tsx`)

Componente servidor reutilizable para inyectar `<script type="application/ld+json">` en cualquier página. Permite mantener los schemas separados del HTML de layout sin lógica adicional.

### 1.4 Schema.org — WebSite (`src/app/layout.tsx`)

Aplica a todas las páginas del sitio (inyectado en el layout raíz).

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Tony Alvarado",
  "url": "https://tonyalvarado.com",
  "description": "Coach y entrenador de ciclismo en Costa Rica...",
  "inLanguage": "es-CR"
}
```

### 1.5 Schema.org — Person (`src/app/layout.tsx`)

Aplica a todas las páginas del sitio (inyectado en el layout raíz).

Campos incluidos:
- `name`: Tony Alvarado
- `alternateName`: Anthony Alvarado
- `jobTitle`: Coach y entrenador de ciclismo
- `description`: datos confirmados de CLAUDE.md
- `url`: https://tonyalvarado.com
- `nationality`: Costa Rica
- `worksFor`: Pure Cycling, PuroMTB, Bike & Bed Hotels
- `knowsAbout`: ciclismo, mountain bike, ciclismo de ruta, entrenamiento, turismo deportivo, liderazgo, emprendimiento

Campos excluidos intencionalmente:
- `sameAs` — pendiente de URLs verificadas de redes sociales y perfiles externos
- `interactionStatistic` — datos de seguidores no validados con fuente pública
- `hasCredential` — nombre exacto de certificaciones pendiente de confirmación con cliente
- `image` — se puede agregar cuando se defina la imagen canónica de Tony

### 1.6 Schema.org — FAQPage (`src/app/page.tsx`)

Aplica solo al homepage. Incluye los 9 Q&A del componente FAQ con el texto exacto del componente para mantener consistencia.

Los 9 Q&A cubiertos:
1. ¿Qué es Pure Cycling?
2. ¿Necesito experiencia en ciclismo para unirme a Pure Cycling?
3. ¿Qué es Bike & Bed Hotels?
4. ¿Cómo puedo conocer la oportunidad de inversión en Bike & Bed Hotels?
5. ¿Tony Alvarado ofrece conferencias presenciales fuera de Costa Rica?
6. ¿Cómo puedo comprar el libro de Tony Alvarado?
7. ¿Qué es PuroMTB?
8. ¿Qué tipo de ciclismo enseña Tony Alvarado en Pure Cycling?
9. ¿Se puede hacer turismo de ciclismo en Costa Rica con Bike & Bed Hotels?

Nota: el FAQPage schema es estructura semántica que ayuda a Google y a IAs a entender el contenido. No garantiza resultados enriquecidos — eso depende de la calidad del contenido y la autoridad del dominio.

### 1.7 Canonical tags — páginas internas

Todas las páginas internas reciben `alternates: { canonical: '/ruta' }` en su metadata. Next.js construye el canonical completo usando el `metadataBase` de layout.tsx (`https://tonyalvarado.com`).

| Página | Canonical resultante |
|--------|---------------------|
| `/sobre-mi` | https://tonyalvarado.com/sobre-mi |
| `/pure-cycling` | https://tonyalvarado.com/pure-cycling |
| `/bike-bed-hotels` | https://tonyalvarado.com/bike-bed-hotels |
| `/libros` | https://tonyalvarado.com/libros |
| `/conferencias` | https://tonyalvarado.com/conferencias |
| `/contacto` | https://tonyalvarado.com/contacto |

El homepage ya tenía `alternates: { canonical: '/' }` en `layout.tsx` desde la fase anterior.

---

## 2. Qué queda pendiente para SEO técnico

### 2.1 Pendiente de datos del cliente

| Pendiente | Impacto | Dónde aplicar |
|-----------|---------|---------------|
| URLs de redes sociales (Instagram, Facebook, YouTube, LinkedIn) | `sameAs` en Person schema | `layout.tsx` |
| URL del perfil de Amazon Author Central | `sameAs` en Person schema | `layout.tsx` |
| Número exacto de teléfono / WhatsApp | `telephone` en Person schema + Contact.tsx | layout + componente |
| Email verificado (Albarado vs Alvarado) | `email` en Person schema + Contact.tsx | layout + componente |
| Nombre exacto de certificación de ciclismo (Federación Costarricense) | `hasCredential` en Person schema | `layout.tsx` |
| URL del libro en Amazon | FAQ 6 + Books.tsx + `offers` en Book schema | page.tsx + Books.tsx |
| URL directa de Pure Cycling en Skool | `url` en Organization schema de Pure Cycling | layout.tsx |
| Foto canónica de Tony (1200×630 para OG y schema `image`) | `image` en Person schema + OG layout | layout.tsx |
| Logos de Pure Cycling, PuroMTB, Bike & Bed | `logo` en Organization schemas | layout.tsx |

### 2.2 Pendiente de infraestructura (no requiere cliente)

| Tarea | Cuándo hacer |
|-------|-------------|
| Verificar que `/sitemap.xml` responde correctamente en producción | Al hacer deploy en Vercel |
| Verificar robots.txt accesible en `tonyalvarado.com/robots.txt` | Al hacer deploy |
| Verificar canonical tags en DevTools / Google Rich Results Test | Al hacer deploy |
| Verificar JSON-LD sin errores en Schema.org Validator | Al hacer deploy |
| OG image propia por página interna (actualmente usan tony-principal.png) | Cuando haya imágenes específicas por página |
| BreadcrumbList por página | Cuando las páginas internas tengan contenido real (no shells) |
| Book schema para /libros | Cuando /libros tenga contenido real + URL de Amazon |
| Organization schema independiente para las 3 empresas | Cuando haya URLs y logos confirmados |

---

## 3. Qué conectar después con servicios externos

### Google Analytics GA4
- Crear propiedad en analytics.google.com
- Obtener Measurement ID (`G-XXXXXXX`)
- Agregar via `next/script` en `layout.tsx` con `strategy="afterInteractive"`
- Verificar en DebugView antes de ir a producción
- **No implementar hasta tener aprobación del cliente**

### Google Search Console
- Crear propiedad para `tonyalvarado.com`
- Verificar via registro DNS TXT en el proveedor del dominio
- Subir sitemap: `https://tonyalvarado.com/sitemap.xml`
- Solicitar indexación de las 7 URLs principales
- **Requiere acceso al DNS del dominio (cliente o agencia)**

### Resend (formulario de contacto)
- Confirmar email de destino con cliente (verificar Albarado vs Alvarado)
- Crear cuenta en resend.com y verificar dominio `tonyalvarado.com`
- Obtener API key de Resend
- Crear `/api/contact/route.ts` en Next.js
- Conectar formulario `Contact.tsx` a la API route
- Probar envío en staging antes de producción

### Google Alerts
- Crear alertas para: "Tony Alvarado", "Anthony Alvarado", "Pure Cycling Tony", "Bike Bed Hotels Costa Rica"
- No requiere código — configurar directamente en google.com/alerts

---

## 4. Archivos creados o modificados en esta fase

| Archivo | Acción |
|---------|--------|
| `public/robots.txt` | Creado |
| `src/app/sitemap.ts` | Creado |
| `src/components/JsonLd.tsx` | Creado |
| `src/app/layout.tsx` | Modificado — WebSite + Person schema |
| `src/app/page.tsx` | Modificado — FAQPage schema |
| `src/app/sobre-mi/page.tsx` | Modificado — canonical |
| `src/app/pure-cycling/page.tsx` | Modificado — canonical |
| `src/app/bike-bed-hotels/page.tsx` | Modificado — canonical |
| `src/app/libros/page.tsx` | Modificado — canonical |
| `src/app/conferencias/page.tsx` | Modificado — canonical |
| `src/app/contacto/page.tsx` | Modificado — canonical |

---

## 5. Estado SEO técnico por área

| Área | Estado |
|------|--------|
| robots.txt | ✅ Implementado |
| Sitemap dinámico | ✅ Implementado |
| Canonical tags — homepage | ✅ Implementado (fase anterior) |
| Canonical tags — páginas internas | ✅ Implementado |
| Open Graph — homepage | ✅ Implementado (fase anterior) |
| Open Graph — páginas internas | ⚠️ Usan imagen default — mejorar con imágenes propias |
| Twitter Cards | ✅ Implementado (fase anterior) |
| Schema — WebSite | ✅ Implementado |
| Schema — Person | ✅ Implementado (sin sameAs) |
| Schema — FAQPage | ✅ Implementado (9 Q&A) |
| Schema — Book | 🔄 Pendiente URL Amazon |
| Schema — Organization | 🔄 Pendiente logos y URLs |
| Schema — BreadcrumbList | 🔄 Pendiente — páginas internas sin contenido |
| Schema — sameAs | 🔄 Pendiente URLs de redes sociales |
| Google Analytics GA4 | 🔄 Pendiente — no implementar sin aprobación |
| Google Search Console | 🔄 Pendiente — requiere acceso a DNS |
| Resend | 🔄 Pendiente — requiere email verificado del cliente |
