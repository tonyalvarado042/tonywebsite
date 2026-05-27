# Integración de marca y assets — Tony Alvarado
**Fecha:** 2026-05-25 | **Tipo:** Análisis estratégico — solo lectura, sin cambios aplicados todavía
**Fuentes revisadas:** Manual de Marca PDF (17 MB, 16 pp.) · 12 fotos revisadas directamente · 16 logos · portada del libro · tailwind.config.ts · globals.css · layout.tsx · componentes principales

> **Regla de este documento:** Todo lo que requiere acción del cliente está marcado como `[PENDIENTE CLIENTE]`. Todo lo que requiere validación antes de publicar está marcado como `[VALIDACIÓN REQUERIDA]`. Nada en este documento modifica código ni assets.

---

## 1. Resumen ejecutivo

El sitio web actual está bien construido: la estructura, el copy, el layout y la consistencia técnica son sólidos. La identidad visual está aproximadamente alineada con la marca, pero con tres brechas relevantes que reducen el impacto de la web:

1. **El logo de Tony Alvarado no aparece en ningún lugar del sitio** — es el activo de marca más inmediato y fácil de integrar.
2. **Las imágenes actuales son provisionales** — el cliente tiene 50 fotos de estudio profesionales que son notablemente superiores a las actuales.
3. **El sitio carece de calidez visual** — el beige de la marca (`#D7BA9E`) no está presente, lo que genera una sensación más fría y más "IA" de lo necesario.

La recomendación no es rediseñar. Es refinar quirúrgicamente: logo, imágenes, y dos ajustes de color. Con eso, la web pasa a verse como la presencia de un referente real, no como un template.

---

## 2. Hallazgos del manual de marca

### 2.1 Paleta cromática (hex exactos del manual)

| Color | Hex | Rol en la marca |
|-------|-----|----------------|
| Purple primario | `#7D26CC` | Color dominante de la marca, logo, CTAs, énfasis |
| Deep navy | `#1A0640` | Fondos oscuros de marca, profundidad |
| Beige/tan | `#D7BA9E` | Acento cálido, neutralizador, humanizador |
| Purple medio | `#8C49B9` | Variante tonal, gradientes internos |
| Turquesa | `#1DCBBC` | Pop accent, momentos de contraste y energía |
| Purple oscuro | `#5A1580` | Profundidad dentro de la gama purple |
| Purple muy oscuro | `#2D055C` | Extremo oscuro de la ramp |

**Jerarquía cromática del manual:** Purple como dominante → beige como equilibrio cálido → turquesa como acento de impacto → navy como fondo profundo.

### 2.2 Tipografía

**Display/marca:** Ethnocentric
- Fuente geométrica, todo mayúsculas, angular
- Usada en el logo (nombre "TONY ALVARADO")
- **No debe usarse como fuente de texto en la web** — interfiere la legibilidad y satura la marca

**Cuerpo:** Proxima Nova (12 pesos)
- Fuente paga — no disponible en Google Fonts sin licencia
- Alternativa libre equivalente: Inter (ya en uso en el sitio) — misma clase visual, proporciones similares
- **Recomendación:** mantener Inter; evaluar licencia de Proxima Nova solo si el cliente la prioriza explícitamente

### 2.3 Tono visual y composición

- Composiciones con fondo oscuro (navy o charcoal) + persona real como elemento central
- Fotografía profesional de Tony como ancla visual principal — no ilustraciones ni fondos abstractos
- Motivo geométrico del triángulo (montaña/cumbre) como lenguaje de marca — ya visible en el logo
- Contraste fuerte entre oscuro y claro; la calidez entra a través del beige, no de fondos claros
- Alta legibilidad del texto — la marca NO es minimalista extrema, es contundente y directa
- Quote de marca: *"Tú no subes a la cima. Tú creces en la cima."* — puede usarse en la web como elemento de identidad
- Tagline: "Líder de Emprendedores" / Slogan: "Lidera | Emprende | Evoluciona"

**Nota importante sobre el posicionamiento:** El manual de marca enfatiza el perfil de emprendedor latinoamericano. El sitio web, por decisión estratégica del cliente (confirmada en CLAUDE.md), debe posicionarlo principalmente desde el ciclismo. Esta diferencia NO es un conflicto — el lenguaje visual del manual funciona perfectamente para el ciclismo. Solo hay que evitar usar los slogans genéricos del manual si contradicen el posicionamiento de la web.

---

## 3. Diagnóstico de la web actual

### 3.1 Qué SÍ está alineado con la marca

| Elemento | Estado | Nota |
|----------|--------|------|
| Color de acento purple | Casi alineado | `#7C3AED` vs `#7D26CC` del manual — diferencia menor |
| Fondo oscuro | Aproximado | `#0B0E14` (azul-negro) vs `#1A0640` (purple-navy) del manual |
| Sensación premium y sobria | Bien lograda | El sitio no se ve barato ni genérico en estructura |
| Tipografía Inter | Aceptable | Similar en peso y legibilidad a Proxima Nova |
| Layout y estructura | Sólidos | Espaciado, jerarquía y consistencia de componentes son buenos |
| Copy y contenido | Bien ejecutado | No debe cambiarse — refleja correctamente el posicionamiento |
| Animaciones Framer Motion | Correctas | No excesivas, apoyan la jerarquía |
| Botón CTA pattern | Funcional | `rounded-full`, color accent, buen contraste |

### 3.2 Qué NO está alineado con la marca

| Elemento | Problema | Impacto |
|----------|---------|---------|
| Logo ausente | El logo de Tony Alvarado no aparece en navbar ni footer | **Alto** — es el primer activo de identidad |
| Imágenes provisionales | `tony-principal.png` y `tony-secundaria.png` son de sesiones anteriores, menor calidad | **Alto** — la foto es el halo effect principal |
| Sin calidez cálida | El beige `#D7BA9E` no existe en la paleta actual — todo es oscuro + purple | **Medio** — la web se siente fría |
| Purple hex desviado | `#7C3AED` vs `#7D26CC` — diferencia sutil pero el rojo-purple de la marca es más característico | **Bajo** — corrección de 1 línea |
| Fondo bg desviado | `#0B0E14` es más azul-negro; el manual usa `#1A0640` más purple-navy | **Bajo** — reemplazar solo si el cliente quiere más identidad de marca en background |
| Sin elemento de calidez visual | Todos los fondos de sección son el mismo tono oscuro — monotonía visual entre secciones | **Medio** — afecta percepción de profundidad y ritmo |
| Secciones sin imagen real | PuroMTB y Bike & Bed Hotels tienen placeholders/sin foto de Tony | **Medio** — reduce humanización |
| Sin font display de marca | Ethnocentric solo existe en el logo PNG; el sitio no la usa como tipografía — correcto, pero puede haber un momento puntual (una cita, un titular muy grande) donde un elemento display añadiría carácter | **Opcional** |

---

## 4. Dirección visual recomendada para la web

**Principio rector:** Refinamiento quirúrgico. El sitio está bien hecho — se trata de afinar, no de rehacer.

### Lo que se recomienda cambiar
1. Agregar el logo en navbar y footer — impacto visual inmediato, cambio mínimo de código
2. Reemplazar las fotos provisionales por las fotos de estudio del cliente — mayor impacto por esfuerzo mínimo
3. Ajustar el purple de acento al hex exacto de la marca — 1 línea en tailwind.config
4. Introducir beige `#D7BA9E` como detalle cálido en puntos específicos — humaniza sin saturar

### Lo que NO se debe cambiar
- El fondo principal `#0B0E14` — funciona bien; cambiar a `#1A0640` haría toda la página más purple, lo cual el cliente quiere evitar
- La tipografía Inter — correcta y gratuita; Proxima Nova requiere licencia paga
- La estructura y el copy de todas las secciones
- Los componentes funcionando correctamente
- El diseño de botones (sólidos, `rounded-full`) — funciona bien para el contexto

### Dónde introducir el beige
El beige `#D7BA9E` no debe ser un fondo de sección. Úsalo como:
- Borde de acento en cards de testimonios (cuando existan)
- Color de un stat numérico específico (ej. el "22 años" de experiencia)
- Línea separadora entre secciones de alto contraste
- Subrayado o punto de énfasis en una cita
- Variante cálida del botón secundario (outline con borde beige sobre fondo oscuro)

---

## 5. Paleta recomendada para implementación web

| Color | Hex | Token sugerido | Uso recomendado | Dónde NO usarlo |
|-------|-----|----------------|----------------|----------------|
| Purple de marca | `#7D26CC` | `brand-accent` (reemplaza actual) | CTAs, links, acento en headings, iconos activos | Fondos completos de sección |
| Deep navy | `#1A0640` | `brand-deep` (nuevo token) | Hero overlay sutil, footer profundo, acento de sección | Fondo general de la página |
| Beige/tan | `#D7BA9E` | `brand-warm` (nuevo token) | Detalles cálidos: bordes, stats, separadores, citas | Fondos, texto principal, botones primarios |
| Turquesa | `#1DCBBC` | `brand-pop` (nuevo token, uso muy limitado) | Máximo 1-2 momentos: un stat destacado, un elemento de contraste puntual | Botones, fondos, texto en general |
| Fondo principal | `#0B0E14` | `brand-bg` (mantener actual) | Background de página | — |
| Superficie | `#0d1117` | `brand-surface` (mantener actual) | Secciones alternadas | — |
| Card | `#111824` | `brand-card` (mantener actual) | Cards, contenedores | — |
| Texto | `#F0F0F0` | `brand-text` (mantener actual) | Texto principal | — |
| Muted | `#9CA3AF` | `brand-muted` (mantener actual) | Texto secundario | — |
| Borde | `#1F2937` | `brand-border` (mantener actual) | Bordes de card, separadores | — |

**Cambios netos en tailwind.config.ts:** 1 valor actualizado (`brand-accent`) + 3 nuevos tokens opcionales (`brand-deep`, `brand-warm`, `brand-pop`).

---

## 6. Recomendación tipográfica

| Decisión | Recomendación | Justificación |
|----------|--------------|---------------|
| Fuente de cuerpo | **Mantener Inter** | Similar a Proxima Nova, gratuita, ya integrada, excelente legibilidad |
| Fuente display (Ethnocentric) | **No agregar como web font** | Reduce legibilidad; solo debe existir como PNG en el logo |
| Uso puntual de Ethnocentric | Aceptable **solo** en un elemento muy específico si se importa vía `@font-face` (no Google Fonts) — ej. una cita grande de marca, un título de sección especial | Solo si el cliente lo prioriza y se tiene el archivo de fuente |
| Proxima Nova | `[PENDIENTE CLIENTE]` Evaluar licencia si el cliente quiere exactitud de la marca | No agregar sin licencia adquirida |

**Estado actual:** Inter es adecuado. No hay urgencia en cambiar la tipografía web.

---

## 7. Recomendación de imágenes por sección

### Imágenes revisadas directamente

| Sección | Archivo recomendado | Justificación | Estado |
|---------|--------------------|--------------|----|
| **Hero** | `_DSC3491.jpg` | Traje charcoal, fondo oscuro, postura confiada, 3/4 cuerpo — integra perfectamente con el dark background del sitio y proyecta autoridad | Disponible |
| **Sobre Tony** (principal) | `_DSC2756.jpg` | Sentado, fondo beige cálido, postura relajada, look approachable — humaniza y contrasta bien con la sección dark | Disponible |
| **Sobre Tony** (alternativa) | `_DSC3501.jpg` | Primer plano de cara, suit + camisa blanca, sonrisa — excelente para press kit, también usable en About si se prefiere más formal | Disponible |
| **Pure Cycling** | `_DSC2700.jpg` o `_DSC3071 copia.jpg` | Laptop/digital: alineado con comunidad online. El polo de `_DSC3071` tiene el logo de marca en el pecho — doble valor visual | Disponible |
| **PuroMTB** | `_BR79985.jpg` | Contexto de trabajo real (mesa, laptop, ventana) — más auténtico que estudio para representar el negocio físico | Disponible |
| **Conferencias** | `_BR70477.jpg` | De pie, mano levantada señalando — lenguaje corporal de speaker/liderazgo | Disponible |
| **Personal Story** | `_DSC2756.jpg` o `_DSC3501.jpg` | Alternativa al Hero; la calidez del beige refuerza la narrativa humana | Disponible |
| **Bike & Bed Hotels** | `[PENDIENTE CLIENTE]` | Las fotos outdoor disponibles (`_BR70988 2.jpg`, `_BR70996.jpg`) son de menor calidad y no muestran el hotel. Solicitar fotos específicas del hotel o huéspedes. | Pendiente |
| **Libros** | `[VALIDACIÓN REQUERIDA]` | "Sigue Pedaleando" (portada poderosa, cycling) está en assets pero no publicado. "Secretos..." no tiene foto nueva. Ver sección 9. | Pendiente |
| **Testimonios** | `[PENDIENTE CLIENTE]` | No hay fotos de miembros/clientes en el batch. Se necesitarían fotos de testimonios reales con consentimiento. | Pendiente |

### Fotos del batch NO revisadas (38 de 50)
El análisis cubrió 12 fotos estratégicas. Las 38 restantes pueden contener contextos adicionales (posiblemente ciclismo, eventos, hotel). **Recomendación:** el cliente revise el batch completo e indique si hay fotos en contexto de ciclismo o Bike & Bed Hotels que no se detectaron.

---

## 8. Recomendación de logos

### Logos disponibles y listos para usar

| Contexto | Archivo recomendado | Formato |
|----------|--------------------|----|
| Navbar (fondo oscuro) | `Tony-Alvarado-LogoBlanco(Horizontal).png` | PNG transparente |
| Footer (fondo oscuro) | `Tony-Alvarado-LogoBlanco(Horizontal).png` o `Tony-Alvarado-LogoFondoOscuro(Horizontal).png` | PNG transparente |
| Open Graph / Meta | `Tony-Alvarado-LogoColor.png` | PNG sobre fondo blanco |
| Press kit / documentos | `Tony-Alvarado-LogoColor.png` | PNG sobre fondo blanco |
| Sobre fondo muy oscuro (hero overlay) | `Tony-Alvarado-LogoFondoOscuro(Horizontal).png` | PNG transparente |
| Documentos en negro/impresión | `Tony-Alvarado-LogoNegro(Horizontal).png` | PNG transparente |

### Logos de empresas (PuroMTB, Pure Cycling, Bike & Bed Hotels)
`[PENDIENTE CLIENTE]` — No se encontraron logos de las empresas en `_client-assets/logos-originales/`. El folder solo contiene logos de la marca personal Tony Alvarado. Solicitar al cliente logos de cada empresa en PNG con fondo transparente.

---

## 9. Assets faltantes

| Asset | Prioridad | Quién lo entrega |
|-------|-----------|----------------|
| Logo PuroMTB (PNG transparente) | Alta | Cliente |
| Logo Pure Cycling (PNG transparente) | Alta | Cliente |
| Logo Bike & Bed Hotels (PNG transparente) | Alta | Cliente |
| Fotos del hotel Bike & Bed Hotels | Alta | Cliente (sesión fotográfica específica) |
| Fotos de actividades de ciclismo / eventos PuroMTB | Media | Cliente |
| Foto de Tony en bicicleta (acción o trail) | Media | Cliente — esencial para el posicionamiento central de ciclismo |
| Confirmación de qué libro publicar en el sitio | Alta | Cliente — "Sigue Pedaleando" vs "Secretos para ser un empresario exitoso" — ver alerta abajo |
| URL de Amazon del libro publicado | Alta | Cliente |
| Foto del libro "Secretos para ser un empresario exitoso" en alta resolución | Media | Cliente |
| Testimonios con foto, nombre completo y contexto | Alta | Cliente |
| Fotos en contexto de conferencia o ponencia | Media | Cliente |

### Alerta crítica — libro

El asset `_client-assets/libros/logo libro.jpeg` contiene la portada de **"Sigue Pedaleando"** — un libro distinto al que aparece actualmente en la web ("Secretos para ser un empresario exitoso").

"Sigue Pedaleando" tiene una portada visualmente poderosa (MTB + dorado + negro + logo de marca). Es coherente con el posicionamiento de ciclismo del sitio.

**No se cambia la sección de libros hasta que el cliente confirme:**
- `[VALIDACIÓN REQUERIDA]` ¿"Sigue Pedaleando" ya está publicado en Amazon?
- `[VALIDACIÓN REQUERIDA]` ¿Debe reemplazar o sumarse a "Secretos para ser un empresario exitoso" en el sitio?
- `[VALIDACIÓN REQUERIDA]` ¿Cuál es la URL exacta del libro en Amazon?

---

## 10. Lista exacta de archivos que se modificarían al aprobar ejecución

> Este listado es proyectivo — no se ha tocado ningún archivo todavía.

| Archivo | Tipo de cambio | Alcance |
|---------|---------------|---------|
| `tailwind.config.ts` | Actualizar `brand-accent` de `#7C3AED` → `#7D26CC`. Añadir tokens `brand-warm`, `brand-deep`, `brand-pop`. | 4 líneas |
| `src/components/layout/Header.tsx` | Agregar `<Image>` con `Tony-Alvarado-LogoBlanco(Horizontal).png`, reemplazar texto del nombre si existe. | Quirúrgico |
| `src/components/layout/Footer.tsx` | Agregar logo en la sección de marca del footer. | Quirúrgico |
| `src/components/sections/Hero.tsx` | Reemplazar `tony-principal.png` por versión optimizada de `_DSC3491.jpg`. | 1 prop de Image |
| `src/components/sections/AboutTony.tsx` | Reemplazar `tony-secundaria.png` por versión optimizada de `_DSC2756.jpg`. | 1 prop de Image |
| `src/components/sections/PuroMTB.tsx` | Agregar foto `_BR79985.jpg` en la sección de placeholder de imagen. | Quirúrgico |
| `src/components/sections/PersonalStory.tsx` | Evaluar agregar imagen si la sección actualmente no tiene. | Opcional |
| `public/images/` | Copiar versiones web-optimizadas (webp o jpg 80%) de los assets seleccionados. Nombres nuevos: `tony-hero.jpg`, `tony-about.jpg`, etc. | Solo nuevos archivos — no borrar existentes |
| `src/components/sections/Books.tsx` | `[VALIDACIÓN REQUERIDA]` No tocar hasta confirmación del cliente sobre "Sigue Pedaleando". | Bloqueado |
| `src/app/globals.css` o `layout.tsx` | Solo si se agrega Ethnocentric o Proxima Nova (no recomendado por ahora). | Opcional |

**Archivos que NO se tocan:** todo lo demás, incluyendo schemas, sitemap, robots.txt, SEO metadata, componentes de conferencias, formularios, y todos los archivos en `pr/`, `docs/`, `_client-assets/`.

---

## 11. Cambios prioritarios (Alta)

Estos son los 5 cambios de mayor impacto por menor esfuerzo. Recomendados para ejecutar en la próxima sesión de trabajo una vez aprobados:

### Prioridad 1 — Logo en navbar y footer
**Por qué es urgente:** El logo es el activo de identidad más inmediato. Su ausencia hace que la web se vea como un template en lugar de la presencia real de Tony Alvarado.
- Archivo: `Header.tsx`, `Footer.tsx`
- Asset: `Tony-Alvarado-LogoBlanco(Horizontal).png`
- Complejidad: baja — solo agregar un `<Image>` con width/height correctos

### Prioridad 2 — Reemplazar imagen del Hero
**Por qué es urgente:** La foto del hero es el primer halo effect de la página. `_DSC3491.jpg` (traje charcoal, fondo oscuro) integra perfectamente con el diseño actual y proyecta autoridad inmediata.
- Archivo: `Hero.tsx`
- Asset: versión optimizada de `_DSC3491.jpg` → copiar como `public/images/tony-hero.webp`
- Complejidad: baja — 1 prop de Image component

### Prioridad 3 — Reemplazar imagen de Sobre Tony
**Por qué es urgente:** `_DSC2756.jpg` (fondo beige, postura relajada) introduce calidez y contraste visual que la sección actualmente no tiene. El beige del fondo de la foto actúa como acento de marca natural sin tocar CSS.
- Archivo: `AboutTony.tsx`
- Asset: versión optimizada de `_DSC2756.jpg` → copiar como `public/images/tony-about.webp`
- Complejidad: baja — 1 prop de Image component

### Prioridad 4 — Ajustar purple de acento al hex exacto de marca
**Por qué es urgente:** Corrección mínima de alta precisión. El sitio usa `#7C3AED` (más blue-purple), la marca usa `#7D26CC` (más red-purple, más característico). El ajuste toma 1 línea.
- Archivo: `tailwind.config.ts`
- Cambio: `accent: '#7C3AED'` → `accent: '#7D26CC'`
- Complejidad: una línea

### Prioridad 5 — Agregar foto en sección PuroMTB
**Por qué es urgente:** Esta sección tiene actualmente un placeholder visual. `_BR79985.jpg` (Tony en mesa de trabajo real) añade humanización al negocio físico sin requerir fotos del local.
- Archivo: `PuroMTB.tsx`
- Asset: versión optimizada de `_BR79985.jpg`
- Complejidad: baja-media — depende de cómo esté estructurada la sección actualmente

---

## 12. Cambios opcionales (Media / Baja — pendientes de validación o decisión del cliente)

| Cambio | Prioridad | Bloqueante |
|--------|-----------|-----------|
| Introducir `#D7BA9E` (beige) como detalle cálido en stats o separadores | Media | No bloqueante — decisión de diseño |
| Agregar token `brand-deep` (`#1A0640`) para uso en footer o hero overlay | Media | No bloqueante |
| Introducir `#1DCBBC` (turquesa) en 1-2 momentos de contraste puntual | Baja | No bloqueante — solo si el cliente quiere más energía visual |
| Foto Tony en conferencia / speaking en sección de Conferencias | Media | `[PENDIENTE CLIENTE]` — necesita foto de contexto |
| Actualizar sección de Libros con "Sigue Pedaleando" | Alta | `[VALIDACIÓN REQUERIDA]` — pendiente confirmación del cliente |
| Logos de empresas (PuroMTB, Pure Cycling, Bike & Bed) | Alta | `[PENDIENTE CLIENTE]` — logos no existen en los assets actuales |
| Foto del hotel Bike & Bed | Alta | `[PENDIENTE CLIENTE]` — sesión fotográfica específica |
| Foto de Tony en bicicleta (acción/trail) | Media | `[PENDIENTE CLIENTE]` — esencial para el posicionamiento de ciclismo |
| Ethnocentric en elemento puntual (cita grande, titular hero) | Baja | Requiere archivo de fuente y decisión del cliente |
| Licencia Proxima Nova | Baja | `[PENDIENTE CLIENTE]` — decisión y costo |
| Cambiar fondo bg de `#0B0E14` → `#1A0640` | Baja | No recomendado — haría la página más purple de lo deseable |
| Foto de testimonios reales con nombre y contexto | Alta | `[PENDIENTE CLIENTE]` — componente Testimonials ya existe en código pero está comentado |

---

*Documento generado para uso interno del equipo. Ningún cambio de código o asset fue aplicado durante la preparación de este análisis.*
