# Deploy en Vercel — Guía paso a paso

**Estado:** Pendiente de ejecución.

> **IMPORTANTE:** No ejecutes este deploy hasta tener:
> - Cuenta de GitHub o repositorio definido
> - Cuenta de Vercel activa
> - Acceso al panel DNS del dominio `tonyalvarado.com`
> - Aprobación del equipo para publicar en producción

---

## Pre-requisitos

- [ ] Cuenta de GitHub (o GitLab / Bitbucket)
- [ ] Cuenta de Vercel en https://vercel.com
- [ ] Acceso al registrador del dominio `tonyalvarado.com` (GoDaddy, Namecheap, Cloudflare, etc.)
- [ ] Variables de entorno listas (ver `.env.example`)
- [ ] Build local sin errores (`npm.cmd run build`)

---

## Paso 1 — Subir el proyecto a GitHub

### Si el repositorio no existe aún

```bash
# En la raíz del proyecto
git init
git add .
git commit -m "Sitio web Tony Alvarado — versión inicial"
```

Luego crea un repositorio en https://github.com/new y conéctalo:

```bash
git remote add origin https://github.com/TU_USUARIO/tony-alvarado-web.git
git branch -M main
git push -u origin main
```

### Si el repositorio ya existe

```bash
git add .
git commit -m "Descripción del cambio"
git push origin main
```

> Verifica que `.gitignore` excluya `.env.local` y `.env*.local` antes de hacer push.

---

## Paso 2 — Conectar con Vercel

1. Entra a https://vercel.com y haz login.
2. Haz clic en **Add New → Project**.
3. Selecciona el repositorio de GitHub (puede requerir autorizar acceso).
4. Configuración del proyecto:
   - **Framework Preset:** Next.js (se detecta automáticamente)
   - **Root Directory:** `/` (raíz del proyecto)
   - **Build Command:** `npm run build` (default de Next.js)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)
5. **No hagas deploy todavía** — primero configura las variables de entorno (Paso 3).

---

## Paso 3 — Configurar variables de entorno en Vercel

En la pantalla de configuración del proyecto (o después en **Settings → Environment Variables**):

| Variable | Valor | Entorno |
|----------|-------|---------|
| `RESEND_API_KEY` | API Key de Resend | Production, Preview |
| `CONTACT_EMAIL` | Email del cliente | Production, Preview |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | ID de Google Analytics | Production |
| `NEXT_PUBLIC_SITE_URL` | `https://tonyalvarado.com` | Production |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp | Production, Preview |

> Las variables `NEXT_PUBLIC_*` son públicas y se exponen al navegador.
> Las variables sin ese prefijo (`RESEND_API_KEY`, `CONTACT_EMAIL`) son privadas y solo se usan en el servidor.

Una vez configuradas, haz clic en **Deploy**.

---

## Paso 4 — Conectar el dominio tonyalvarado.com

### Opción A — Delegar DNS a Vercel (recomendado)

1. En Vercel → **Settings → Domains** → Add `tonyalvarado.com`
2. Vercel mostrará sus nameservers (ej. `ns1.vercel-dns.com`, `ns2.vercel-dns.com`)
3. En el panel del registrador del dominio, reemplaza los nameservers actuales por los de Vercel
4. Espera propagación DNS: entre 15 minutos y 48 horas

### Opción B — Solo apuntar con registros DNS (sin delegar)

1. En Vercel → **Settings → Domains** → Add `tonyalvarado.com`
2. Vercel mostrará los registros necesarios:
   - Registro **A** → `76.76.21.21` (IP de Vercel)
   - Registro **CNAME** para `www` → `cname.vercel-dns.com`
3. Agrega estos registros en el panel DNS del registrador

> Agrega también `www.tonyalvarado.com` en Vercel y configura redirect a la versión sin `www`.

---

## Paso 5 — Verificar producción

Una vez completado el deploy y conectado el dominio:

### Rutas que deben responder con 200 OK

```
https://tonyalvarado.com/
https://tonyalvarado.com/sobre-mi
https://tonyalvarado.com/pure-cycling
https://tonyalvarado.com/bike-bed-hotels
https://tonyalvarado.com/libros
https://tonyalvarado.com/conferencias
https://tonyalvarado.com/contacto
https://tonyalvarado.com/sitemap.xml
https://tonyalvarado.com/robots.txt
https://tonyalvarado.com/llms.txt
```

### HTTPS y certificado SSL

Vercel emite el certificado SSL automáticamente vía Let's Encrypt. Verifica que el candado verde aparezca en el navegador.

### Redirect www → sin www (o viceversa)

Verifica que `https://www.tonyalvarado.com` redirige correctamente a `https://tonyalvarado.com`.

---

## Paso 6 — Qué probar después del deploy

Ver el checklist completo en `docs/validacion-produccion.md`.

Resumen mínimo post-deploy:

- [ ] Todas las rutas cargan sin error
- [ ] Las imágenes aparecen correctamente
- [ ] El formulario de contacto funciona (requiere Resend configurado)
- [ ] Los CTAs navegan a las páginas correctas
- [ ] `/sitemap.xml` muestra las 7 rutas
- [ ] `/robots.txt` muestra las reglas correctas
- [ ] No hay errores en la consola del navegador
- [ ] El sitio se ve correctamente en móvil

---

## Deploys automáticos

Una vez conectado GitHub con Vercel, cada push a `main` genera un nuevo deploy automático en producción. Los PRs generan deploys de Preview con una URL temporal para revisión.

---

## Notas adicionales

- Vercel genera URLs de preview tipo `tony-alvarado-web-git-main-usuario.vercel.app` para cada commit
- El plan gratuito de Vercel (Hobby) es suficiente para este proyecto en su estado actual
- Si el tráfico crece, considerar plan Pro para analytics de Vercel y mayor límite de builds
