# Guía editorial — Sanity CMS
## tonyalvarado.com

**Para:** Tony Alvarado y equipo de contenido  
**Última actualización:** Junio 2026  
**Nivel:** No técnico

---

## 1. Acceso al CMS

### URL directa del Studio

```
https://tony-alvarado-cms.sanity.studio/
```

### URL alternativa (desde la web)

```
https://www.tonyalvarado.com/studio
```

Ambas llevan al mismo lugar. La segunda simplemente redirige a la primera.

### Inicio de sesión

El acceso al Studio requiere que tu correo esté invitado al proyecto en Sanity.  
Si no puedes entrar, contacta al equipo técnico para que te agregue.

- Tony / equipo de contenido: solicitar rol **Editor**
- Equipo técnico: rol **Administrator**

> **Importante:** No compartir credenciales. Cada persona del equipo debe tener su propia cuenta.

---

## 2. Qué se puede editar actualmente

| Contenido | ¿Editable desde Sanity? |
|---|---|
| Artículos del blog | ✅ Sí |
| Métricas del home (22+, 400K, etc.) | ✅ Sí |

---

## 3. Qué NO se puede editar todavía

Lo siguiente está construido directamente en el código del sitio. Cambiarlo requiere al equipo técnico:

- Texto del Hero (encabezado principal del home)
- Fotos principales del sitio
- Páginas: Pure Cycling, PuroMTB, Bike & Bed Hotels, Conferencias, Libros
- Formulario de contacto
- Correos de notificación
- SEO global del sitio
- Menú de navegación
- CTAs principales ("Únete a la comunidad", "Invertir", etc.)

---

## 4. Cómo crear un artículo de blog

### Paso a paso

1. Entrar al Studio: `https://tony-alvarado-cms.sanity.studio/`
2. En el panel izquierdo, hacer clic en **Artículo de Blog**
3. Clic en el botón **+ Crear nuevo documento**
4. Completar los campos en este orden:

---

### Campos del artículo

#### Título *(obligatorio)*
El encabezado principal del artículo. Claro y descriptivo.  
Ejemplo: `Cómo mejorar tu técnica de pedaleo en MTB`

#### Slug / URL *(obligatorio)*
La dirección del artículo en la web.  
Clic en el botón **Generate** para generarlo automáticamente desde el título.  
Ejemplo: `/blog/como-mejorar-tu-tecnica-de-pedaleo-en-mtb`

> Evitar cambiar el slug después de publicar. Si ya fue publicado y aparece en Google, cambiarlo rompe el enlace indexado.

#### Estado *(obligatorio)*
- **Borrador** — El artículo no aparece en la web. Úsalo mientras escribes.
- **Publicado** — Aparece en la web.
- **Oculto** — No aparece en la web, pero se conserva en el CMS.

> Siempre empezar en **Borrador** y cambiar a **Publicado** solo cuando esté completamente listo.

#### Fecha de publicación
Se llena automáticamente con la fecha y hora actuales.  
Puedes ajustarla si el artículo fue escrito en una fecha diferente.

#### Categoría
Texto libre. Ejemplo: `Ciclismo · Entrenamiento`, `Liderazgo`, `MTB`  
Aparece encima del título en la tarjeta del blog.

#### Resumen del artículo *(recomendado)*
Texto corto de 1 a 3 oraciones.  
Aparece en la tarjeta del blog y como meta descripción de respaldo.  
Máximo recomendado: 200 caracteres.

#### Tiempo de lectura (minutos)
Número entero. Ejemplo: `5`  
Aparece debajo del título en el detalle del artículo.

#### Imagen principal *(recomendado)*
Foto de portada del artículo. Preferir imágenes horizontales (16:9 o 3:2).

> Después de subir la imagen, completar el campo **Texto alternativo (SEO)**.  
> Ejemplo: `Tony Alvarado ciclismo de montaña en La Fortuna, Costa Rica`

#### Artículo destacado
Marca el artículo como destacado. Actualmente no cambia la visual del sitio, pero puede usarse en futuras actualizaciones.

#### Contenido del artículo *(recomendado)*
El cuerpo del artículo. Editor de texto enriquecido.

**Tipos de bloques disponibles:**
- **Párrafo** — texto normal
- **H2 — Sección principal** — para títulos de sección grandes
- **H3 — Subsección** — para subdivisiones
- **H4 — Detalle** — para sub-subdivisiones pequeñas
- **Cita / Blockquote** — para citas o frases destacadas
- **Lista con viñetas** — lista sin orden
- **Lista numerada** — lista con orden
- **Imagen** — imagen dentro del artículo
- **Nota destacada** — recuadro destacado (💡 Tip / ⚡ Destacado / ⚠️ Advertencia)
- **Llamada a acción (CTA)** — botón de enlace dentro del artículo

**Formato de texto:**
- **Negrita** — para términos importantes
- *Cursiva* — para énfasis
- Morado / Dorado — para resaltar palabras con color de marca
- Enlace — para hipervínculos (internos `/ruta` o externos `https://`)

#### CTA principal del artículo *(opcional)*
Botón que aparece al final del artículo.  
Completar tanto el **texto del botón** como el **enlace** juntos.  
Ejemplo: texto `Conoce Pure Cycling →` / enlace `/pure-cycling`

#### SEO — Título para buscadores *(opcional)*
Si se deja vacío, Google usa el título del artículo.  
Si quieres un título diferente para buscadores, escríbelo aquí.

#### SEO — Meta descripción *(recomendado)*
Texto que aparece en los resultados de Google.  
Si se deja vacío, se usa el resumen del artículo como respaldo.  
Recomendado: entre 120 y 160 caracteres.

#### Palabras clave *(opcional)*
Etiquetas internas. Escribir una palabra y presionar Enter para agregarla.

---

## 5. Estados del artículo de blog

| Estado | ¿Aparece en la web? | Uso |
|---|---|---|
| **Borrador** | No | Mientras se está escribiendo |
| **Publicado** | Sí | Cuando está listo para publicar |
| **Oculto** | No | Para conservar en CMS sin publicar |

> Los cambios en un artículo publicado tardan hasta **60 segundos** en reflejarse en producción.

---

## 6. Recomendaciones SEO para el blog

### Buenas prácticas

- Títulos claros y con la palabra clave principal al inicio
- Slug limpio, sin caracteres especiales ni tildes
- Resumen descriptivo y específico (no genérico)
- Meta descripción entre 120 y 160 caracteres
- Imagen principal con texto alternativo descriptivo
- Usar H2 para secciones principales y H3 para subsecciones
- No publicar artículos con el body vacío
- Cada artículo debe tener un solo tema principal

### Qué evitar

- No repetir la misma palabra clave decenas de veces en el texto
- No copiar contenido de otras páginas web
- No prometer resultados médicos, financieros o deportivos sin respaldo
- No publicar artículos incompletos o con solo 2 líneas de contenido
- No cambiar el slug de un artículo ya publicado e indexado en Google

---

## 7. Cómo editar las métricas del home

Las métricas son los números que aparecen en la franja del home:  
`22+ · 400K · +30 · +250 · 3`

### Paso a paso

1. Entrar al Studio
2. En el panel izquierdo, hacer clic en **Métricas**
3. Para editar una existente: clic sobre ella
4. Para crear una nueva: clic en **+ Crear nuevo documento**

---

### Campos de la métrica

#### Valor *(obligatorio)*
El número o texto corto que se muestra en grande.  
Ejemplos: `22+`, `400K`, `+30`, `+250`, `3`  
Mantenerlo corto — máximo 5 o 6 caracteres.

#### Etiqueta *(obligatoria)*
El texto que aparece debajo del valor.  
Ejemplos: `Años de trayectoria`, `Comunidad ciclista`, `Países`  
Máximo recomendado: 25 caracteres.

#### Color visual *(obligatorio)*
- **Dorado** — para métricas de alto impacto o logros
- **Blanco** — color neutro, uso general
- **Verde** — para métricas de crecimiento

#### Página *(obligatoria)*
Seleccionar **Home**. Es la única opción disponible actualmente.

#### Orden
Número que controla la posición de la métrica.  
Menor número = aparece primero.  
Ejemplo: `1`, `2`, `3`, `4`, `5`

#### Activo
Si está marcado como activo, la métrica aparece en el home.  
Si se desmarca, desaparece de la web sin necesidad de borrarla.

---

## 8. Reglas para las métricas

- **No borrar todas las métricas activas.** Si Sanity no tiene métricas activas, la web muestra automáticamente los datos de respaldo (los números originales del sitio).
- Los cambios tardan hasta **60 segundos** en reflejarse en producción.
- El valor debe ser corto: `22+`, `400K`, `+30`, etc.
- La etiqueta debe ser breve y clara.
- El campo **Orden** controla qué métrica aparece primero, de izquierda a derecha.
- Puedes desactivar una métrica sin borrarla usando el campo **Activo**.

---

## 9. Qué hacer si un cambio no aparece en la web

Seguir este checklist antes de llamar al equipo técnico:

1. Confirmar que el artículo tiene **Estado: Publicado** (no Borrador ni Oculto)
2. Confirmar que la métrica tiene **Activo: marcado**
3. Esperar **60 segundos** y refrescar la página
4. Verificar que estás viendo el sitio en producción (`tonyalvarado.com`), no en `localhost`
5. Limpiar el caché del navegador (Ctrl + Shift + R en Windows, Cmd + Shift + R en Mac)
6. Si después de 5 minutos sigue sin aparecer, contactar al equipo técnico

---

## 10. Qué NO tocar sin apoyo técnico

Los siguientes elementos afectan el funcionamiento completo del sitio. Solo el equipo técnico debe modificarlos:

| Elemento | Por qué no tocarlo |
|---|---|
| Configuración del proyecto en Sanity | Puede desconectar el CMS del sitio |
| Dataset | Puede hacer desaparecer todo el contenido |
| Permisos y roles | Puede bloquear el acceso al equipo |
| CORS | Puede romper la conexión entre el sitio y Sanity |
| Estructura de schemas | Cambiar campos puede romper el blog o las métricas |
| Variables de entorno | Credenciales del servidor |
| DNS | Puede hacer inaccesible el sitio |
| Google Search Console | Afecta el posicionamiento en Google |
| Configuración de correos (Resend) | Puede romper el formulario de contacto |

---

## 11. Roles recomendados en Sanity

| Rol | Para quién | Qué puede hacer |
|---|---|---|
| **Editor** | Tony, equipo de contenido | Crear, editar y publicar artículos y métricas |
| **Administrator** | Equipo técnico | Todo lo anterior + configuración del proyecto |
| **Viewer** | Invitados, lectores | Solo puede ver el contenido, no editar |

> **Regla:** No dar acceso de **Administrator** a personas que solo van a publicar contenido. Un error de configuración puede afectar todo el sitio.

---

## 12. Próximas mejoras posibles

Estos elementos no son editables hoy desde Sanity, pero pueden habilitarse en el futuro:

- **Testimonios** — gestionar los videos y textos de testimoniales desde el CMS
- **Preguntas frecuentes (FAQs)** — editar preguntas y respuestas del home
- **Configuración global** — WhatsApp, correo, redes sociales editables
- **Páginas principales** — Pure Cycling, Bike & Bed, Conferencias con contenido editable
- **Versión en inglés** — blog y páginas en inglés para audiencia internacional

Para habilitar cualquiera de estas mejoras, coordinar con el equipo técnico.

---

## Contacto técnico

Para cambios que requieran modificar código, configuración del servidor, DNS o schemas:  
Contactar al equipo de desarrollo del proyecto.

---

*Esta guía cubre el estado del CMS a junio de 2026. Puede actualizarse a medida que se habiliten nuevas funcionalidades.*
