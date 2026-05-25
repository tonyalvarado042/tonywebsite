# Microinteracciones — Referencia destilada
**Fuentes:** PDFs 1, 6, 7 | Los valores de duración y escala son referencias orientativas — ajustar según el contexto y la frecuencia de uso.

---

## Principios generales antes de implementar

- **Motion apoya claridad** — si quitar la animación no afecta la comprensión de la acción, probablemente no es necesaria
- **Frecuencia determina duración** — interacciones frecuentes (hover, focus) deben ser más rápidas que las ocasionales (success, error)
- **Nunca animar solo para decorar** — cada microinteracción debe comunicar estado, resultado o jerarquía
- **Consistencia primero** — mejor un solo tipo de transición bien aplicado que cinco diferentes sin sistema

---

## 11 patrones de microinteracciones

### 1. Button hover
- **Trigger:** cursor sobre el botón
- **Feedback:** escala sutil + cambio de color o sombra suave
- **Referencia de duración:** ~150ms
- **Implementación Tailwind/Framer:** `hover:scale-[1.02] transition-all duration-150` o `whileHover={{ scale: 1.02 }}`
- **Evitar:** escala demasiado grande (>1.05), sombra demasiado dramática — el botón no debe parecer que salta

### 2. Button active / pressed
- **Trigger:** click o touch sobre el botón
- **Feedback:** escala levemente reducida — confirma que fue registrado
- **Referencia de duración:** ~80ms
- **Implementación:** `active:scale-[0.97] transition-transform duration-75`
- **Por qué:** cierra el loop de feedback sin que el usuario dude si hizo click

### 3. Toast notification
- **Trigger:** acción completada (formulario enviado, ítem agregado, error)
- **Feedback:** aparece desde arriba o esquina, con ícono de estado (check, error, info)
- **Referencia de duración:** slide-in ~300ms, auto-dismiss entre 3-5s
- **Evitar:** múltiples toasts apilados sin sistema de prioridad; toasts que desaparecen antes de poder leerlos

### 4. Tooltip
- **Trigger:** hover sobre elemento con información adicional
- **Feedback:** aparece con delay antes de mostrarse (evita que aparezca en todos los hover accidentales)
- **Referencia:** delay ~400-600ms antes de aparecer, fade-in ~150ms
- **Evitar:** tooltips en mobile (no hay hover); tooltip que oculta contenido importante

### 5. Search expand
- **Trigger:** click en ícono de búsqueda o focus en campo de búsqueda
- **Feedback:** width animado que expande el campo, desaparece el ícono y aparece el input
- **Referencia de duración:** ~250ms ease-in-out
- **Por qué:** ahorra espacio en navbar pero mantiene acceso a la funcionalidad

### 6. Card hover
- **Trigger:** cursor sobre card interactiva
- **Feedback:** sombra más pronunciada + translate Y sutil hacia arriba (sensación de elevación)
- **Referencia:** `hover:-translate-y-1 hover:shadow-lg transition-all duration-200`
- **Evitar:** en cards no interactivas — genera confusión sobre qué es clickable

### 7. Form input focus
- **Trigger:** click o Tab en campo de formulario
- **Feedback:** borde cambia al color de acento de marca + ring suave de color
- **Referencia de duración:** ~150ms
- **Por qué:** comunica claramente cuál campo está activo, especialmente importante en formularios largos

### 8. Loading state
- **Trigger:** acción asíncrona iniciada (submit, fetch, carga de contenido)
- **Feedback:** spinner en el botón o skeleton screen en el contenido que carga
- **Regla:** nunca dejar pantalla en blanco o botón estático durante una carga
- **Spinner en botón:** reemplazar texto del botón con spinner + texto "Enviando..." para mantener tamaño del botón

### 9. Success state
- **Trigger:** acción completada exitosamente
- **Feedback:** ícono de check con animación de entrada (scale desde 0 a 1 con bounce sutil)
- **Referencia de duración:** ~300ms con `ease-out`
- **Evitar:** success state que desaparece tan rápido que el usuario no lo vio

### 10. Error state
- **Trigger:** validación fallida o error del servidor
- **Feedback:** campo o elemento con borde rojo + mensaje descriptivo + animación shake sutil
- **Referencia de duración:** shake ~400ms (3-4 ciclos cortos)
- **Importante:** el shake debe ser sutil — es feedback de error, no punición

### 11. Navigation active indicator
- **Trigger:** usuario está en la sección o página correspondiente al ítem de navegación
- **Feedback:** underline animado, dot indicator o cambio de color con transición
- **Referencia de duración:** ~200ms al cambiar entre secciones
- **Por qué:** orienta al usuario dentro del sitio sin que tenga que leer la URL

---

## Reglas de implementación en Tailwind + Framer Motion

**Para interacciones simples (hover, focus, active):**
Usar clases de Tailwind con `transition-*` — suficiente para la mayoría de casos:
```
transition-all duration-150 ease-out
hover:scale-[1.02] hover:shadow-md
active:scale-[0.97]
focus:ring-2 focus:ring-brand-500 focus:border-brand-500
```

**Para interacciones más complejas (entrada, salida, secuencia):**
Usar Framer Motion — más control sobre easing, delay y animaciones coordinadas:
```
whileHover={{ scale: 1.02, y: -2 }}
whileTap={{ scale: 0.97 }}
initial={{ opacity: 0, y: 10 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.2, ease: "easeOut" }}
```

**Consideraciones de accesibilidad:**
- Respetar `prefers-reduced-motion` — los usuarios que lo tienen activo no deben ver animaciones no esenciales
- En Tailwind: `motion-safe:transition-all motion-safe:hover:scale-[1.02]`
- En Framer Motion: leer `useReducedMotion()` y omitir animaciones si está activo
