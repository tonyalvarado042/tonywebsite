# Checklist UI/UX — Referencia destilada
**Fuentes:** PDFs 3, 6, 10 | Usar como guía de auditoría, no como lista de verificación rígida.

---

## Flujo de usuario

- [ ] ¿El usuario puede completar la acción principal con pocos pasos? (menos es mejor; cuántos depende del flujo)
- [ ] ¿Está claro en cada pantalla dónde está, qué puede hacer y qué sigue?
- [ ] ¿El flujo hacia el CTA principal no tiene distracciones innecesarias?
- [ ] ¿Los formularios piden solo la información mínima necesaria?
- [ ] ¿Los errores del formulario aparecen en el lugar correcto (junto al campo, no solo arriba)?

## Estados de componentes interactivos

### Botones — estados mínimos requeridos
- [ ] **Default** — estado en reposo, claro y visible
- [ ] **Hover** — feedback visual al pasar el cursor (color, sombra o escala sutil)
- [ ] **Active/pressed** — confirmación de que fue presionado (escala reducida o darkening)
- [ ] **Disabled** — visualmente distinto, no interactuable, no confundible con default
- [ ] **Loading** — spinner o texto "Enviando..." cuando hay una acción asíncrona en progreso

### Inputs / campos de formulario — estados mínimos
- [ ] **Default** — borde o fondo que identifica el área del input
- [ ] **Focus** — borde o ring de acento de marca, claramente visible
- [ ] **Error** — borde rojo + mensaje de error descriptivo (no solo "Campo inválido")
- [ ] **Success** — confirmación visual cuando corresponde (ej. email válido)
- [ ] **Disabled** — distinto del default, no editable

## Feedback al usuario

- [ ] ¿El usuario sabe qué pasó después de enviar un formulario?
- [ ] ¿Los errores explican qué está mal y cómo corregirlo?
- [ ] ¿Las acciones que tardan (envío, carga) tienen indicador de progreso?
- [ ] ¿Las acciones exitosas tienen confirmación visible (toast, mensaje, cambio de estado)?
- [ ] ¿Los links externos se abren en nueva pestaña y hay indicación de ello?

## Iconografía

- [ ] ¿Los íconos son reconocibles sin etiqueta, o necesitan label de texto?
- [ ] Si necesitan label, ¿tienen uno?
- [ ] ¿Los íconos son consistentes (mismo estilo, mismo trazo, mismo tamaño base)?
- [ ] ¿No se están usando íconos solo para decorar sin comunicar función?

## Espaciado y consistencia

- [ ] ¿Los elementos del mismo tipo tienen el mismo espaciado entre sí?
- [ ] ¿El padding dentro de componentes similares es consistente?
- [ ] ¿Los márgenes entre secciones siguen una escala reconocible?
- [ ] ¿Hay suficiente espacio en blanco para que la página respire?

## Contraste y legibilidad

- [ ] ¿El texto sobre fondo es legible? (WCAG AA como referencia: 4.5:1 texto normal, 3:1 texto grande)
- [ ] ¿El texto placeholder en inputs tiene suficiente contraste para ser legible?
- [ ] ¿Los botones tienen contraste suficiente entre texto y fondo del botón?
- [ ] ¿El texto secundario (gris claro sobre blanco) no desaparece visualmente?

## Diseño responsive

- [ ] ¿La página funciona correctamente en pantallas móviles (desde ~375px)?
- [ ] ¿Los textos no se truncan ni se desbordan en mobile?
- [ ] ¿Los botones tienen un área de toque suficiente en mobile? (orientativo: mínimo ~44px de altura)
- [ ] ¿Las imágenes se adaptan correctamente sin deformarse o recortarse mal?
- [ ] ¿Los formularios son usables con teclado virtual en mobile?
- [ ] ¿La navegación mobile es clara y accesible sin scroll horizontal?

## Accesibilidad básica

- [ ] ¿Los elementos interactivos tienen `aria-label` cuando no tienen texto visible?
- [ ] ¿Las imágenes tienen `alt` descriptivo (o `alt=""` si son decorativas)?
- [ ] ¿El foco del teclado es visible al navegar con Tab?
- [ ] ¿El orden de los elementos en el DOM tiene sentido para lectores de pantalla?
- [ ] ¿Los videos o animaciones no causan parpadeo que pueda afectar usuarios sensibles?

## Navegación

- [ ] ¿El logo o nombre lleva de vuelta al homepage?
- [ ] ¿Está claro en qué sección o página está el usuario?
- [ ] ¿La navegación principal no tiene más ítems de los que el ojo puede procesar cómodamente?
- [ ] ¿Los links de navegación describen el destino, no solo acciones genéricas?
