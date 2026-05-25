# Validación de producción — Checklist

Usar este checklist antes y después del deploy en Vercel.
Marcar cada ítem como completado al verificarlo.

---

## 1. Build local

- [ ] `npm.cmd run build` completa sin errores
- [ ] `npx.cmd tsc --noEmit` sin errores de TypeScript
- [ ] No hay warnings críticos en la salida del build
- [ ] El número de rutas generadas coincide con lo esperado (11 rutas mínimo)

---

## 2. Rutas — verificar en navegador o con curl

Cada ruta debe cargar con HTTP 200 y mostrar contenido visible.

- [ ] `https://tonyalvarado.com/` — Homepage completo
- [ ] `https://tonyalvarado.com/sobre-mi` — Historia y trayectoria de Tony
- [ ] `https://tonyalvarado.com/pure-cycling` — Programa de entrenamiento
- [ ] `https://tonyalvarado.com/bike-bed-hotels` — Hotel y oportunidad de inversión
- [ ] `https://tonyalvarado.com/libros` — Libros de Tony Alvarado
- [ ] `https://tonyalvarado.com/conferencias` — Temas y solicitud de conferencias
- [ ] `https://tonyalvarado.com/contacto` — Formulario de contacto

### Rutas que no deben existir o deben devolver 404

- [ ] Cualquier ruta no listada arriba devuelve la página 404 personalizada de Next.js

---

## 3. Archivos públicos

Verificar acceso directo desde el navegador:

- [ ] `https://tonyalvarado.com/robots.txt` — Carga como texto plano, contiene `User-agent: *`, `Allow: /` y la URL del sitemap
- [ ] `https://tonyalvarado.com/sitemap.xml` — Carga como XML con las 7 rutas del sitio
- [ ] `https://tonyalvarado.com/llms.txt` — Carga como texto plano con la descripción del sitio

---

## 4. SEO — verificar por página

Para cada ruta, abrir DevTools → Elements y verificar `<head>`:

- [ ] Cada página tiene `<title>` único y descriptivo
- [ ] Cada página tiene `<meta name="description">` no vacía
- [ ] Cada página tiene `<link rel="canonical">` apuntando a su URL correcta
- [ ] El homepage tiene Open Graph (`og:title`, `og:description`, `og:image`)
- [ ] El homepage tiene Twitter Card (`twitter:card`, `twitter:title`)

---

## 5. Schema.org — validar datos estructurados

### Schema.org Validator
URL: https://validator.schema.org/

- [ ] Validar `https://tonyalvarado.com/` — debe detectar: WebSite, Person, WebPage, Organization (PuroMTB), FAQPage
- [ ] Validar `https://tonyalvarado.com/sobre-mi` — debe detectar: WebPage, BreadcrumbList
- [ ] Validar `https://tonyalvarado.com/pure-cycling` — debe detectar: WebPage, BreadcrumbList, Organization (Pure Cycling)
- [ ] Validar `https://tonyalvarado.com/bike-bed-hotels` — debe detectar: WebPage, BreadcrumbList, Organization (Bike & Bed)
- [ ] Validar `https://tonyalvarado.com/libros` — debe detectar: WebPage, BreadcrumbList, Book
- [ ] Validar `https://tonyalvarado.com/conferencias` — debe detectar: WebPage, BreadcrumbList
- [ ] Validar `https://tonyalvarado.com/contacto` — debe detectar: WebPage, BreadcrumbList
- [ ] Sin errores críticos en ninguna página (los warnings son aceptables)

### Google Rich Results Test
URL: https://search.google.com/test/rich-results

- [ ] Homepage: FAQPage es elegible para rich result
- [ ] Páginas internas: BreadcrumbList es elegible para rich result

---

## 6. Imágenes

- [ ] Todas las imágenes cargan correctamente en todas las páginas
- [ ] No hay imágenes rotas (ícono de imagen rota en el navegador)
- [ ] `tony-principal.png` carga en `/sobre-mi` y Open Graph
- [ ] `tony-secundaria.png` carga en el homepage (sección Sobre Tony)
- [ ] `tony-con-john.png` carga en `/sobre-mi`
- [ ] `tony-con-spencer.png` carga en `/sobre-mi`
- [ ] `libro-secretos.png` carga en `/libros` y homepage (sección Libros)

---

## 7. Responsive — verificar en múltiples tamaños

Usar DevTools → Toggle Device Toolbar o dispositivos reales:

- [ ] Móvil 375px (iPhone SE) — sin scroll horizontal, texto legible, CTAs accesibles
- [ ] Móvil 390px (iPhone 14) — layout correcto
- [ ] Tablet 768px — layout de dos columnas donde corresponde
- [ ] Desktop 1280px — layout completo, máximo ancho correcto
- [ ] Desktop 1440px — sin elementos desbordados

---

## 8. Navegación y CTAs

- [ ] El header carga en todas las páginas
- [ ] El footer carga en todas las páginas
- [ ] El logo/nombre del header navega al homepage
- [ ] Todos los ítems del menú de navegación funcionan
- [ ] El menú móvil abre y cierra correctamente
- [ ] Cada CTA principal lleva a la ruta correcta:
  - [ ] "Únete a Pure Cycling" → `/pure-cycling` o `/contacto`
  - [ ] "Agenda una llamada" → `/#contacto`
  - [ ] "Solicitar una conferencia" → `/conferencias` o `/contacto`
  - [ ] "Conoce la historia completa" → `/sobre-mi`
  - [ ] "Avísame cuando salga" → `/contacto`
- [ ] Ningún enlace lleva a una página 404

---

## 9. Formulario de contacto

> Nota: el envío real por email requiere Resend configurado. Verificar la UX independientemente.

- [ ] El formulario en `/contacto` es visible y tiene todos los campos
- [ ] Los campos tienen labels o placeholders claros
- [ ] El campo de email valida formato correcto
- [ ] El botón de envío es visible y tiene texto claro
- [ ] Si Resend está configurado: el formulario envía correctamente y muestra confirmación
- [ ] Si Resend NO está configurado: el formulario no muestra un error técnico visible al usuario

---

## 10. Performance básica

Usar Lighthouse en Chrome DevTools (modo Incógnito para resultados más precisos):

- [ ] Performance score ≥ 80 en móvil
- [ ] Performance score ≥ 90 en desktop
- [ ] Sin imágenes sin atributo `alt`
- [ ] Sin elementos que bloqueen el render crítico
- [ ] Core Web Vitals: LCP, CLS y FID/INP en rangos aceptables

---

## 11. Consola del navegador

Abrir DevTools → Console en cada página principal:

- [ ] Sin errores (`console.error`) en el homepage
- [ ] Sin errores en `/sobre-mi`
- [ ] Sin errores en `/pure-cycling`
- [ ] Sin errores en `/bike-bed-hotels`
- [ ] Sin errores en `/libros`
- [ ] Sin errores en `/conferencias`
- [ ] Sin errores en `/contacto`
- [ ] Los warnings de terceros (Framer Motion, etc.) son aceptables si no afectan funcionalidad

---

## 12. HTTPS y seguridad

- [ ] El sitio carga con HTTPS (certificado SSL activo)
- [ ] `http://tonyalvarado.com` redirige automáticamente a `https://tonyalvarado.com`
- [ ] `https://www.tonyalvarado.com` redirige a `https://tonyalvarado.com` (sin `www`)
- [ ] No hay contenido mixto (imágenes HTTP dentro de página HTTPS)

---

## 13. Google Search Console (post-deploy)

Completar después de conectar Search Console:

- [ ] Propiedad verificada para `tonyalvarado.com`
- [ ] Sitemap enviado: `https://tonyalvarado.com/sitemap.xml`
- [ ] Solicitar indexación de las 7 rutas principales desde la herramienta de Inspección de URLs
- [ ] Sin errores de cobertura en el reporte de Páginas

---

## Resumen de estado post-validación

| Área | Estado | Notas |
|------|--------|-------|
| Build | — | |
| Rutas | — | |
| Archivos públicos | — | |
| SEO | — | |
| Schemas | — | |
| Imágenes | — | |
| Responsive | — | |
| CTAs | — | |
| Formulario | — | |
| Performance | — | |
| Consola | — | |
| HTTPS | — | |
| Search Console | — | Pendiente de configurar |
