---
name: premium-web-design
description: Use this skill when improving premium web design, UI/UX, landing pages, visual hierarchy, layout, responsive design, microinteractions, conversion-focused sections, and humanizing interfaces that look too generic or AI-generated.
---

# Skill — premium-web-design

## A. Cuándo usar

- El usuario pide auditar o mejorar una sección, página o componente del sitio
- El diseño se ve genérico, frío o con estética de IA
- Un CTA no convierte o una sección no cumple su objetivo
- Hay inconsistencias visuales o de espaciado entre componentes
- Se va a crear una nueva sección y se quiere hacerlo bien desde el inicio
- El usuario pide revisar jerarquía visual, tipografía, color o microinteracciones

## B. Cómo trabajar

1. **Auditar antes de modificar** — leer el componente o página completa antes de proponer nada
2. **Diagnóstico quirúrgico** — identificar los 2-3 problemas que más impactan; no rediseñar todo si no es necesario
3. **Clasificar problemas** por categoría (ver sección E — formato de auditoría)
4. **Priorizar por impacto** — problemas de conversión y UX antes que ajustes puramente estéticos
5. **Proponer cambios específicos** — con qué clase de Tailwind, qué valor, qué componente
6. **Pedir confirmación** antes de ejecutar cambios grandes o que afecten múltiples archivos
7. **Ejecutar un cambio a la vez** si hay riesgo de romper layout existente
8. **Verificar en mobile** — cada cambio debe revisarse a 375-390px mínimo
9. **No asumir rediseño total** — una mejora quirúrgica bien ejecutada vale más que un rediseño incompleto
10. **Confirmar resultado** con el formato de sección F

## C. Criterios de diseño (referencias prácticas, no reglas absolutas)

1. **Jerarquía visual** — tamaño, peso, posición y color deben guiar el ojo hacia lo más importante primero
2. **Tipografía** — preferir una o dos familias; headings con letter-spacing levemente negativo y line-height compacto suelen verse más premium (rangos típicos: -1% a -3%, 110-125%)
3. **Sistema de color** — definir base neutral, acento de marca, colores semánticos y tematización por separado antes de aplicar
4. **Espaciado** — el espacio en blanco es intencional, no desperdiciado. La consistencia entre componentes del mismo tipo es más importante que el valor exacto
5. **Contraste** — texto legible en todos los fondos; WCAG AA como referencia mínima (4.5:1 texto normal, 3:1 texto grande)
6. **Ritmo visual** — las secciones deben sentir un patrón reconocible con variación controlada, no caos ni uniformidad plana
7. **Dark mode** — superficies se aclaran al elevarse; separación de tonos mayor que en light mode
8. **Estados interactivos** — todos los elementos interactivos necesitan al menos: default, hover, active, disabled
9. **Microinteracciones** — apoyar claridad de la acción, no decorar. Animaciones frecuentes < 300-400ms como rango orientativo
10. **Percepción de calidad** — un detalle bien ejecutado (sombra, borde, transición) vale más que diez detalles mediocres

## D. Reglas para evitar diseño genérico IA

1. No usar emojis como elementos de diseño o jerarquía (🚀 ✅ 💡) — usar iconografía coherente o ninguna
2. No usar gradiente purple-blue como fondo de hero por defecto — definir una paleta real basada en la marca
3. No poner 3 cards idénticas en fila como sección de "beneficios" sin variación visual — jerarquizar al menos una
4. No redondear métricas a números fáciles ("1.000+", "100%") — los números específicos generan más confianza
5. No poner CTA genéricos ("Más información", "Learn More") — el CTA debe nombrar la acción real
6. No usar 6 íconos en grilla plana como sección de features — elegir 2-3 y darles espacio y contexto
7. No abusar de `rounded-full` en todos los elementos — mezclar radios según jerarquía
8. No animar todo — elegir 2-3 interacciones clave y animarlas bien en lugar de aplicar fade-in a todo
9. No poner foto de stock genérica en el hero — imagen real del cliente o del contexto específico
10. No usar la misma sección de "testimonios con avatar redondo + estrellitas + texto corto" sin variación — al menos diferenciar por tamaño o énfasis

## E. Formato de respuesta al auditar

Estructura siempre en estas 4 categorías:

**Problemas visuales**
- [ ] Ítem concreto

**Problemas UX**
- [ ] Ítem concreto

**Problemas de conversión**
- [ ] Ítem concreto

**Señales de diseño genérico / IA**
- [ ] Ítem concreto

Después: lista de mejoras recomendadas ordenadas por impacto (1 = mayor impacto primero).
Indicar para cada una: archivo afectado, cambio propuesto, alcance (quirúrgico / moderado / rediseño).

## F. Formato de respuesta después de modificar

1. **Qué se cambió** — archivo(s) y componente(s) exactos
2. **Por qué** — problema que resuelve cada cambio
3. **Resultado esperado** — qué mejora en visual, UX, conversión o percepción
4. **Qué NO se tocó** — confirmar alcance quirúrgico
5. **Verificación mobile** — confirmación o pendiente
6. **Siguiente paso recomendado** — si hay más mejoras pendientes, cuál es la más impactante
