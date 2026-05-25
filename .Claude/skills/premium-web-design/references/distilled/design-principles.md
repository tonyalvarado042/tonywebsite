# Principios de diseño — Referencia destilada
**Fuentes:** PDFs 6, 7, 10, 11 | No son reglas absolutas — son referencias prácticas y rangos orientativos.

---

## Jerarquía visual

- El ojo sigue: tamaño → posición → color → espacio → peso tipográfico
- Cada sección debe tener un elemento dominante claro; si todo es igual, nada comunica
- Posición superior izquierda tiene más peso perceptivo en culturas occidentales (lectura F o Z)
- Contraste de tamaño es más efectivo que contraste de color para establecer jerarquía primaria
- Test de 5 segundos: si al ver una sección en 5s no queda claro qué hace y qué hacer, la jerarquía está rota

## Tipografía

- Preferir una familia tipográfica principal bien usada sobre dos familias mediocres
- Headings con letter-spacing levemente negativo se ven más premium (rango orientativo: -1% a -3%)
- Line-height compacto en títulos grandes (orientativo: 110-125%); más abierto en cuerpo (145-165%)
- Evitar más de 3-4 tamaños de fuente distintos en una misma página
- Peso tipográfico (bold, semibold, regular) comunica jerarquía incluso sin cambiar tamaño
- Nunca usar texto TODO EN MAYÚSCULAS en párrafos — solo en etiquetas o labels cortos

## Sistema de color — 4 capas

**Capa 1 — Neutral base ramp**
Escala de grises con suficiente separación entre tonos (no solo blanco y negro).
Usada para fondos, superficies, bordes y texto secundario.

**Capa 2 — Brand accent ramp**
Color de marca en múltiples variantes de luminosidad (claro, medio, oscuro).
Para CTAs, links, elementos interactivos, estados focus.

**Capa 3 — Semantic colors**
- Success: verde
- Warning: amarillo/ámbar
- Error: rojo
- Info: azul
Independientes del color de marca. Consistentes en toda la interfaz.

**Capa 4 — Theming**
Tokens que referencian capas anteriores. Permite dark/light mode sin duplicar valores.

**Regla práctica:** definir estas 4 capas en el design system antes de aplicar colores a componentes específicos.

## Dark mode

- Las superficies se aclaran conforme se elevan (más elevación = más claro, no más oscuro)
- La separación entre tonos de la escala neutral debe ser mayor que en light mode — el ojo discrimina menos en oscuro
- Nunca usar negro puro (#000) como fondo — genera fatiga visual; usar variantes de gris muy oscuro
- Los colores de marca suelen necesitar ajuste en dark mode (más saturación o luminosidad)
- Sombras funcionan diferente en dark: usar `box-shadow` con color levemente más claro, no solo opacidad

## Espaciado y whitespace

- El espacio en blanco no es vacío — es una decisión de diseño que comunica premium y claridad
- Consistencia de espaciado entre elementos del mismo tipo es más importante que el valor exacto
- Los diseños que "se sienten cargados" suelen tener padding insuficiente en contenedores, no demasiado contenido
- Aumentar padding en secciones clave (hero, CTA principal) genera percepción de mayor valor
- Usar escala consistente de espaciado (ej. múltiplos de 4px o 8px) para coherencia visual

## Ritmo y estructura visual

- Las secciones deben tener un patrón reconocible (ritmo) con variación controlada para mantener atención
- Alternar entre layouts (texto izquierda, texto derecha; ancho completo, contenido centrado) crea ritmo
- Romper el patrón una vez es efectivo; romperlo múltiples veces es caótico
- La "sorpresa controlada" — un elemento que cambia el ritmo — debe tener propósito: enfatizar o hacer pausa
- Motion debe apoyar la claridad de la interfaz, no reemplazarla; si quitar la animación rompe la comprensión, el diseño base es débil

## Sombras y elevación

- Usar sombras para comunicar elevación, no solo para decorar
- Sombras duras (sin blur) para elementos sobre fondo oscuro; sombras suaves y difusas para light mode
- Evitar sombras en todos los elementos — perderán significado. Reservar para elementos que "flotan" (modals, tooltips, cards interactivas)
- En dark mode: sombras con ligero tinte de color funcionan mejor que sombras negras con opacidad
