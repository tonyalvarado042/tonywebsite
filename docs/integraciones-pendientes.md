# Integraciones pendientes

**Estado:** Preparadas en código pero NO implementadas.
Las variables, rutas y archivos ya están identificados. Solo falta recibir la información del cliente y activar cada servicio.

---

## 1. Resend — Envío del formulario de contacto

**Qué falta:** API Key de Resend + email receptor confirmado.
**Quién debe entregarlo:** Cliente (email) + desarrollador (cuenta Resend).
**Estado actual:** El componente `Contact.tsx` tiene el formulario estructurado. El envío está pendiente de implementar.

**Cómo implementar cuando esté listo:**
1. Crear cuenta en https://resend.com
2. Agregar y verificar el dominio de envío (`tonyalvarado.com`)
3. Generar API Key
4. Agregar variables en Vercel y en `.env.local`:
   - `RESEND_API_KEY=re_xxxxxxxxxxxx`
   - `CONTACT_EMAIL=correo@tonyalvarado.com`
5. Crear `src/app/api/contact/route.ts` con el handler POST que use Resend
6. Conectar el formulario a ese endpoint

**Archivos a tocar:**
- `src/components/sections/Contact.tsx`
- `src/app/api/contact/route.ts` (archivo nuevo)
- `.env.local` / Variables en Vercel

---

## 2. Google Analytics 4

**Qué falta:** Measurement ID (`G-XXXXXXXXXX`) de la propiedad GA4 del cliente.
**Quién debe entregarlo:** Cliente (acceso a Google Analytics) o crear propiedad nueva.
**Estado actual:** No implementado. Variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` preparada en `.env.example`.

**Cómo implementar cuando esté listo:**
1. Crear propiedad en https://analytics.google.com
2. Copiar el Measurement ID (`G-XXXXXXXXXX`)
3. Instalar `@next/third-parties` o agregar script manual en `layout.tsx`
4. Agregar la variable en Vercel y en `.env.local`

**Archivos a tocar:**
- `src/app/layout.tsx`
- `.env.local` / Variables en Vercel

---

## 3. Google Search Console

**Qué falta:** Acceso al dominio para verificar propiedad.
**Quién debe entregarlo:** Cliente (acceso DNS o panel del registrador).
**Estado actual:** El sitemap (`/sitemap.xml`) y robots.txt ya están listos para indexación.

**Cómo implementar cuando esté listo:**
1. Entrar a https://search.google.com/search-console
2. Agregar propiedad tipo "Dominio" con `tonyalvarado.com`
3. Verificar via registro DNS TXT en el registrador del dominio
4. Enviar el sitemap: `https://tonyalvarado.com/sitemap.xml`
5. Solicitar indexación de las rutas principales

**Sin cambios en el código.** La verificación es externa (DNS o archivo HTML en `/public/`).

---

## 4. Google Alerts

**Qué falta:** Cuenta de Google del cliente.
**Quién debe entregarlo:** Cliente.
**Estado actual:** No requiere cambios en el código.

**Cómo configurar:**
1. Ir a https://google.com/alerts
2. Crear alertas para:
   - "Tony Alvarado" + Costa Rica
   - "Anthony Alvarado" + ciclismo
   - "PuroMTB"
   - "Pure Cycling" + Tony
   - "Bike & Bed Hotels"
3. Configurar frecuencia y email de recepción

**Sin cambios en el código.**

---

## 5. WhatsApp — Contacto directo

**Qué falta:** Número de WhatsApp del equipo confirmado por el cliente.
**Quién debe entregarlo:** Cliente.
**Estado actual:** Variable `NEXT_PUBLIC_WHATSAPP_NUMBER` preparada en `.env.example`. Botón no visible aún.

**Cómo implementar cuando esté listo:**
1. Confirmar número en formato internacional (ej. `50688887777`)
2. Agregar la variable en Vercel y en `.env.local`
3. Agregar botón o enlace de WhatsApp en `Contact.tsx` o en el Header/Footer

**Archivos a tocar:**
- `src/components/sections/Contact.tsx`
- `src/components/layout/Header.tsx` y/o `Footer.tsx` (si se agrega CTA flotante)
- `.env.local` / Variables en Vercel

---

## 6. Amazon URL — Libro "Secretos para ser un empresario exitoso"

**Qué falta:** URL directa de la página del libro en Amazon.
**Quién debe entregarlo:** Cliente.
**Estado actual:** La página `/libros` muestra "Enlace de compra próximamente". El Book Schema existe sin `offers` ni URL.

**Cómo implementar cuando esté listo:**
1. Recibir la URL de Amazon (ej. `https://www.amazon.com/dp/XXXXXXXXXX`)
2. Actualizar el botón de compra en `/libros`
3. Agregar el campo `url` y `offers` en `bookSchema`

**Archivos a tocar:**
- `src/app/libros/page.tsx`
- `src/lib/structured-data.ts` → campo `url` y opcionalmente `offers` en `bookSchema`

---

## 7. Redes sociales (Instagram, YouTube, Facebook)

**Qué falta:** URLs exactas de los perfiles oficiales.
**Quién debe entregarlo:** Cliente.
**Estado actual:** El campo `sameAs` en `personSchema` está comentado como pendiente.

**Cómo implementar cuando esté listo:**
1. Recibir URLs confirmadas de cada perfil
2. Agregar el campo `sameAs` en `src/lib/structured-data.ts`:
   ```ts
   sameAs: [
     'https://www.instagram.com/PERFIL',
     'https://www.youtube.com/@CANAL',
   ]
   ```
3. Considerar agregar íconos de redes en el Footer

**Archivos a tocar:**
- `src/lib/structured-data.ts` → campo `sameAs` en `personSchema`
- `src/components/layout/Footer.tsx` (si se agregan íconos)

---

## 8. LinkedIn

**Qué falta:** URL del perfil oficial de LinkedIn de Tony Alvarado.
**Quién debe entregarlo:** Cliente.
**Estado actual:** No implementado. Mismo campo `sameAs` que redes sociales.

**Archivos a tocar:**
- `src/lib/structured-data.ts` → campo `sameAs` en `personSchema`
- `src/components/layout/Footer.tsx` (si se agrega ícono)

---

## 9. Logos de empresas

**Qué falta:** Archivos PNG o SVG de los logos de PuroMTB, Pure Cycling y Bike & Bed Hotels.
**Quién debe entregarlo:** Cliente.
**Estado actual:** Los Organization Schemas no tienen campo `logo`. Las secciones del homepage tienen placeholders de imagen.

**Cómo implementar cuando esté listo:**
1. Recibir archivos de logo (PNG o SVG, fondo transparente)
2. Subir a `public/images/` con nombres consistentes
3. Agregar campo `logo` en cada Organization en `src/lib/structured-data.ts`
4. Reemplazar los placeholders en las secciones del homepage

**Archivos a tocar:**
- `src/lib/structured-data.ts` → campo `logo` en cada Organization
- `src/components/sections/PuroMTB.tsx` (placeholder de imagen)
- `src/components/sections/BikeAndBed.tsx` (placeholder de imagen)

---

## 10. Fotos adicionales

**Qué falta:** Fotos profesionales adicionales de Tony, del hotel, eventos, ciclismo.
**Quién debe entregarlo:** Cliente (fotógrafo profesional recomendado).
**Estado actual:** Las fotos actuales son suficientes para publicar. Fotos adicionales mejorarían secciones de BikeAndBed y PuroMTB.

**Archivos a tocar:**
- `public/images/` (agregar archivos)
- Componentes correspondientes según qué secciones se actualicen

---

## 11. Testimonios

**Qué falta:** Texto del testimonio, nombre completo, cargo/empresa y foto de cada persona.
**Quién debe entregarlo:** Cliente (recopilar de clientes reales de Pure Cycling, PuroMTB o Bike & Bed).
**Estado actual:** El componente `Testimonials.tsx` existe en el código pero está comentado en `page.tsx` a la espera de testimonios reales.

**Cómo implementar cuando esté listo:**
1. Recibir testimonios con: texto, nombre, cargo, foto (o foto es opcional)
2. Agregar los datos al componente `Testimonials.tsx`
3. Descomentar el import en `src/app/page.tsx`

**Archivos a tocar:**
- `src/components/sections/Testimonials.tsx`
- `src/app/page.tsx` (descomentar import y sección)
