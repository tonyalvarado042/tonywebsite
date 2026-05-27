# Assets visuales — Tony Alvarado
**Última actualización:** 2026-05-25 | **Fase:** 2B

---

## Imágenes en uso (`public/images/`)

### Fotografías de Tony

| Archivo | Peso | Fuente original | Sección | Notas |
|---------|------|----------------|---------|-------|
| `tony/tony-hero.jpg` | 126 KB | `_DSC3491.jpg` (traje carbón, fondo oscuro) | Hero | Comprimida con Sharp. Portrait autoridad. |
| `tony/tony-about.jpg` | 106 KB | `_DSC2756.jpg` (playera negra, fondo beige cálido) | Sobre Tony | Comprimida con Sharp. Postura relajada, cercana. |
| `tony/tony-puromtb-community.jpg` | 77 KB | `_DSC3159 copia.jpg` (polo navy, badge "Cycling Club") | PuroMTB | Comprimida con Sharp. Reemplaza tony-puromtb.jpg. |
| `tony/tony-puromtb.jpg` | 97 KB | `_BR79985.jpg` (Tony en escritorio con laptop) | — | **REEMPLAZADA** — se conserva en disco. Encuadre incorrecto. |

### Logos

| Archivo | Peso | Fuente original | Sección |
|---------|------|----------------|---------|
| `logos/tony-alvarado-logo-white-horizontal.png` | 23 KB | `Tony-Alvarado-LogoBlanco(Horizontal).png` | Header, Footer |

### Libros

| Archivo | Peso | Fuente original | Sección | Notas |
|---------|------|----------------|---------|-------|
| `libro-secretos.png` | — | Asset original del cliente | Libros | Portada del primer libro. |
| `books/sigue-pedaleando-tony-alvarado.jpg` | 440 KB | `_client-assets/libros/logo libro.jpeg` | Libros | Portada del segundo libro. 441 KB original, copiado sin reescalar (ya en rango aceptable). |

---

## Correcciones aplicadas (Fase 2 → 2B)

| Fecha | Archivo modificado | Problema | Solución |
|-------|-------------------|---------|---------|
| 2026-05-25 | `PuroMTB.tsx` | `tony-puromtb.jpg` mostraba techo/ventana con `object-top` — foto de escritorio genérica, no comunica ciclismo | Reemplazada por `tony-puromtb-community.jpg` (polo ciclismo). Container `h-56` → `h-64`. |
| 2026-05-25 | `Books.tsx` | Sección mostraba solo 1 libro con placeholder de texto para el segundo | Reestructurada a grid de 2 tarjetas. Book 1 con URL real de Amazon. Book 2 con portada real y etiqueta "Próximamente". |

---

## Imágenes pendientes del cliente

| Asset | Sección propuesta | Prioridad | Notas |
|-------|-------------------|-----------|-------|
| Foto de Tony en bicicleta (en ruta o MTB) | Hero o PuroMTB | Alta | El posicionamiento central es ciclismo — ninguna foto actual lo muestra en la bicicleta. |
| Logo PuroMTB (PNG transparente) | Ecosistema / PuroMTB | Media | Actualmente la sección solo usa texto. |
| Logo Pure Cycling (PNG transparente) | Ecosistema / Pure Cycling | Media | Idem. |
| Logo Bike & Bed Hotels (PNG transparente) | Ecosistema / Bike & Bed | Media | Idem. |
| Foto con mentores (Spencer Hoffman, John Maxwell) | Sobre Tony / Mentores | Media | `tony con john.PNG` y `tony con spencer.PNG` existen en public pero no están integradas aún. Pesan 1.13 MB y 1.30 MB — requieren compresión antes de integrar. |

---

## Datos pendientes de validación (libros)

| Campo | Libro | Estado |
|-------|-------|--------|
| Estado de publicación | Sigue Pedaleando | Pendiente confirmación del cliente |
| URL Amazon | Sigue Pedaleando | Pendiente — no disponible |
| Sinopsis oficial aprobada | Sigue Pedaleando | Pendiente — copy actual derivado de CLAUDE.md |
| ISBN | Sigue Pedaleando | No disponible |
| Sello editorial | Sigue Pedaleando | Visible en portada ("LEGACY") — no declarado públicamente hasta confirmación del cliente |

---

## Notas técnicas

- Herramienta de compresión: `sharp@0.34.5` (Node.js), disponible en el proyecto.
- Método de compresión: `sharp(src).resize(1200, null, { withoutEnlargement: true }).jpeg({ quality: 80, mozjpeg: true })`.
- Las imágenes se escriben primero a un archivo `.tmp` y luego se renombran para evitar conflictos de lectura/escritura simultánea.
- Límites de peso recomendados: fotos de persona < 300 KB, portadas de libro < 500 KB, logos < 50 KB.
