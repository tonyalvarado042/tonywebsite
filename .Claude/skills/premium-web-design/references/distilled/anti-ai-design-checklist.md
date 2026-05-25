# Anti-diseño-IA — Referencia destilada
**Fuentes:** PDFs 2, 3, 8 | Señales que delatan diseño genérico o generado por IA sin criterio. Formato: problema → alternativa.

---

## Señales visuales

**Emojis como elementos de diseño**
- Problema: 🚀 ✅ 💡 usados como íconos de sección o bullets de features
- Alternativa: iconografía consistente (Lucide, Heroicons, o SVG personalizado) o ningún ícono si no aporta

**Gradiente purple-blue genérico en hero**
- Problema: `from-purple-600 to-blue-500` como fondo sin relación con la marca
- Alternativa: color sólido de la paleta de marca, imagen real, o gradiente derivado del sistema de color definido

**Paleta de colores "default IA"**
- Problema: azul-morado-verde con opacidades al 20% en fondos de tarjetas sin un sistema definido
- Alternativa: definir sistema de color de 4 capas (neutral ramp → brand accent → semantic → theming) y aplicar consistentemente

**Cards idénticas en fila de 3**
- Problema: 3 columnas exactas con el mismo padding, ícono, título y texto — ninguna tiene más peso que otra
- Alternativa: jerarquizar al menos una card (más grande, con fondo diferente, con CTA o con imagen)

**Sección de features con 6 íconos en grilla plana**
- Problema: 6 features en 2x3 o 3x2 con el mismo tratamiento visual — el ojo no sabe qué leer primero
- Alternativa: reducir a 3-4 features, darles espacio y narrativa, o usar layout asimétrico con 1 feature destacada

**Foto de stock en hero**
- Problema: imagen genérica de persona sonriendo en computadora, o montaña con ciclista de banco de imágenes
- Alternativa: fotografía real del cliente/producto/contexto, aunque sea de menor resolución

---

## Señales de texto y copy

**Métricas redondeadas**
- Problema: "Más de 1.000 clientes", "100% satisfacción", "+50 países"
- Alternativa: números reales específicos — generan más credibilidad ("947 miembros activos", "34 países")

**CTA genérico sin contexto**
- Problema: "Más información", "Learn More", "Ver más", "Contáctanos" — en todos los botones
- Alternativa: CTA específico que nombre la acción real: "Únete a Pure Cycling", "Solicitar llamada de inversión"

**Headline hero vacía**
- Problema: "Transforma tu vida", "Lleva tu negocio al siguiente nivel", "La mejor experiencia para ti"
- Alternativa: primera línea que diga quién, qué y para quién: "Ciclismo con propósito, estructura y comunidad — para quienes quieren más que pedalear"

**Beneficios en infinitivo genérico**
- Problema: "Mejorar tu rendimiento", "Alcanzar tus metas", "Desarrollar tu potencial"
- Alternativa: beneficios con especificidad y resultado concreto: "Subir rutas que hoy parecen imposibles", "Entender tu potencia real y cómo mejorarla"

---

## Señales de estructura y layout

**Todo en `rounded-full`**
- Problema: botones, avatares, badges, cards y chips con el mismo border-radius máximo — pierden jerarquía
- Alternativa: definir escala de radios: botones principales con `rounded-lg`, elementos pequeños con `rounded-md`, pills con `rounded-full` solo cuando aplica

**Animación en todo**
- Problema: cada card, texto, ícono y sección tiene `animate-fadeIn` — el ojo no descansa
- Alternativa: animar 2-3 elementos clave (hero headline, CTA principal, primer scroll reveal) y el resto estático

**Sección de testimonios con avatar redondo + 5 estrellas + texto corto idéntico**
- Problema: 3-4 bloques exactamente iguales, sin foto real, con texto de 1-2 líneas que no dice nada específico
- Alternativa: 1-2 testimonios con nombre completo, foto real, contexto específico y texto que describa un resultado concreto

**Navbar con demasiados ítems**
- Problema: 7-8 ítems en la navegación principal sin jerarquía
- Alternativa: máximo 5-6 ítems; consolidar secciones secundarias en dropdown o footer

**Sección "Nuestros valores" con 4 íconos y 2 líneas de texto**
- Problema: Integridad, Innovación, Excelencia, Compromiso — con mini-párrafos genéricos
- Alternativa: si los valores se incluyen, conectarlos con historia real o eliminarlos; no son un activo de conversión

---

## Señales de percepción general

**Diseño que podría ser de cualquier empresa**
- Señal: si se cambia el logo, el sitio podría ser de otro negocio sin que nadie lo note
- Solución: incluir elementos únicos de la historia, personas reales, datos específicos del negocio

**Exceso de secciones "de relleno"**
- Señal: secciones que no llevan al usuario a ninguna decisión ni acción
- Solución: cada sección debe tener un propósito claro (informar, generar confianza, o llevar al siguiente paso)

**Diseño que se ve bien en mockup pero frío en el sitio real**
- Señal: la foto profesional no está, los testimonios son placeholder, el texto es lorem ipsum
- Solución: diseñar con contenido real desde el inicio; el contenido real revela problemas de layout que el placeholder oculta
