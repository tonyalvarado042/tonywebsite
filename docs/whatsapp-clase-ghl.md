# WhatsApp al registrarse a la clase — plantillas y flujo de GoHighLevel

Quien se registra en `clase.tonyalvarado.com` recibe **dos WhatsApp**: uno de
confirmación en el momento —con el enlace del grupo y, si el VIP está
encendido en el CRM, el día presencial— y otro el día de la clase.

El sitio solo **avisa**; el texto y los tiempos viven en GoHighLevel, para que
cambiarlos no necesite un despliegue.

```
landing → /api/clase/registro → CRM (Supabase)
                              → webhook de GHL → flujo → WhatsApp
                              → correo de confirmación (Resend)
```

---

## 1 · Las tres plantillas de Meta

> ✅ **Las tres ya están creadas y sometidas a Meta** (23 de octubre de 2026,
> estado *Pending* en GoHighLevel → Settings → WhatsApp → Templates). Lo de
> abajo queda como el registro de qué dice cada una y por qué, para cuando
> haya que cambiarlas o rehacerlas.

Viven en **GoHighLevel → Settings → WhatsApp → Templates**. Meta tarda entre
minutos y 48 horas en aprobarlas.

> **Las dos van en categoría «Utilidad» (Utility), no «Marketing».** Confirman
> algo que la persona acaba de pedir. La categoría la decide Meta al revisar,
> pero pedir la correcta de entrada evita que la reclasifiquen — y utilidad
> cuesta menos por mensaje.

> ⚠️ **Nada de fechas ni nombres quemados en el texto.** Van entre 5 y 10
> lanzamientos, uno cada ~15 días. Si la fecha va en el texto, cada lanzamiento
> es una plantilla nueva esperando aprobación de Meta. Con variables, estas dos
> se aprueban una sola vez y sirven para siempre.

### Plantilla 1 — `clase_confirmacion_grupo`

| | |
|---|---|
| **Nombre** | `clase_confirmacion_grupo` |
| **Categoría** | Utilidad |
| **Idioma** | Español |

**Encabezado** (texto):
```
Quedaste adentro
```

**Cuerpo:**
```
Hola {{1}}, soy Tony. Ya tenés tu campo en la clase «{{2}}».

Es el {{3}} a las {{4}}.

Te falta un paso: toda la clase se coordina por el grupo de WhatsApp. El enlace para entrar en vivo, los recordatorios y el material salen por ahí. Si no entrás al grupo, quedaste registrado pero no te vas a enterar.

Tocá el botón y ya quedás listo.
```

**Pie de página:**
```
Si no te registraste a esta clase, ignorá este mensaje.
```

**Botón** → tipo **URL estática**:

| Texto del botón | Destino |
|---|---|
| `Entrar al grupo` | `https://clase.tonyalvarado.com/grupo` |

**Ejemplos para la revisión de Meta** (los pide al someter):

| Variable | Ejemplo |
|---|---|
| `{{1}}` | `Carlos` |
| `{{2}}` | `La Revolución de la Copropiedad Turística` |
| `{{3}}` | `Miércoles 28 de octubre` |
| `{{4}}` | `7:00 p.m. Costa Rica` |

### Plantilla 2 — `clase_confirmacion_grupo_vip`

Es la plantilla 1 **más el día presencial al final**. El flujo manda esta o la
anterior según el interruptor del VIP en el CRM — nunca las dos.

| | |
|---|---|
| **Nombre** | `clase_confirmacion_grupo_vip` |
| **Categoría** | **Marketing** ⚠️ |
| **Idioma** | Español |

> ⚠️ **Esta va en Marketing, no en Utilidad.** Meta clasifica como marketing
> cualquier plantilla que ofrezca algo pagado, aunque el resto del mensaje sea
> una confirmación. Cuesta más por mensaje que una de utilidad. Si en algún
> lanzamiento preferís no pagar eso, se apaga el VIP en el CRM y el flujo
> manda sola la plantilla 1, que sí es utilidad.

**Encabezado** (texto):
```
Quedaste adentro
```

**Cuerpo:**
```
Hola {{1}}, soy Tony. Ya tenés tu campo en la clase «{{2}}».

Es el {{3}} a las {{4}}.

Te falta un paso: toda la clase se coordina por el grupo de WhatsApp. El enlace para entrar en vivo, los recordatorios y el material salen por ahí. Si no entrás al grupo, quedaste registrado pero no te vas a enterar.

Y una cosa más, por si te interesa. El {{5}} hago un día presencial en {{6}} con un grupo chico: el proyecto se camina, no se ve en pantalla. {{7}}, y los campos son contados.
```

**Pie de página:**
```
Si no te registraste a esta clase, ignorá este mensaje.
```

**Botones** → dos, los dos de tipo **URL estática**:

| Texto del botón | Destino |
|---|---|
| `Entrar al grupo` | `https://clase.tonyalvarado.com/grupo` |
| `Ver el día presencial` | `https://clase.tonyalvarado.com/vip` |

**Ejemplos:** `{{1}}` = `Carlos`, `{{2}}` = `La Revolución de la Copropiedad
Turística`, `{{3}}` = `Miércoles 28 de octubre`, `{{4}}` = `7:00 p.m. Costa
Rica`, `{{5}}` = `Domingo 15 de noviembre de 2026`, `{{6}}` = `La Fortuna de
San Carlos`, `{{7}}` = `US$97 por persona`

**Por qué el VIP va al final y no arriba.** Es la misma decisión que ya está
escrita en el correo de confirmación: el trabajo de este mensaje es meter a la
persona al grupo, y una oferta antes de ese paso compite con él y se pierden
las dos cosas. El grupo primero, el VIP de postre.

**El botón del VIP no va a Hotmart, va a `/vip`.** Esa página ya lee el
interruptor del CRM: si el VIP se apagó después de mandar el mensaje, quien
toque el botón encuentra una explicación y una salida hacia la clase, no un
checkout muerto.

### Plantilla 3 — `clase_recordatorio_dia`

| | |
|---|---|
| **Nombre** | `clase_recordatorio_dia` |
| **Categoría** | Utilidad |
| **Idioma** | Español |

**Encabezado** (texto):
```
Hoy es la clase
```

**Cuerpo:**
```
Hola {{1}}, hoy nos vemos. «{{2}}» arranca a las {{3}}, hora de Costa Rica.

El enlace para entrar lo paso por el grupo de WhatsApp unos minutos antes. Si todavía no estás adentro, entrá ahora y no te lo perdés.

Llegá puntual, que lo bueno va al principio.
```

**Pie de página:**
```
Te llega porque te registraste a esta clase.
```

**Botón** → tipo **URL estática**:

| Texto del botón | Destino |
|---|---|
| `Entrar al grupo` | `https://clase.tonyalvarado.com/grupo` |

**Ejemplos:** `{{1}}` = `Carlos`, `{{2}}` = `La Revolución de la Copropiedad
Turística`, `{{3}}` = `7:00 p.m.`

### Por qué el botón NO apunta a `chat.whatsapp.com`

Una plantilla aprobada **no se edita: se vuelve a someter**. Con el enlace del
grupo adentro del botón, cambiar de grupo —y va a pasar, los grupos tienen
tope— serían 24 a 48 horas de revisión otra vez.

`clase.tonyalvarado.com/grupo` redirige al grupo del momento
(`src/app/(clase)/clase/grupo/route.ts`). El grupo se cambia en
`src/data/clase-copropiedad.ts` y las plantillas ni se enteran.

### Reglas de Meta que estas plantillas ya respetan
- El cuerpo **no empieza ni termina** con una variable.
- **No hay dos variables pegadas.**
- El texto del botón tiene menos de 25 caracteres.
- No se promete ningún número ni resultado — ni acá ni en ningún lado.

---

## 2 · El flujo en GoHighLevel

> 🛑 **Esto lo arma Tony a mano.** La interfaz de flujos de GHL vive en un
> iframe de otro origen y los clics automatizados no la alcanzan; está medido y
> escrito en el cerebro. El guion de abajo es paso por paso.

### Paso 0 — Los campos personalizados ✅ ya hechos

Ya existen los ocho, todos sobre *Contact* y dentro de la carpeta
**«Clase de copropiedad»** (Settings → Custom Fields):

| Campo | Tipo | Llave | Para qué |
|---|---|---|---|
| Clase nombre | Single line | `clase_nombre` | `{{2}}` de las confirmaciones |
| Clase fecha texto | Single line | `clase_fecha_texto` | `{{3}}` de las confirmaciones |
| Clase hora texto | Single line | `clase_hora_texto` | `{{4}}` de las confirmaciones y `{{3}}` del recordatorio |
| Clase dia | **Date picker** | `clase_dia` | el ancla del recordatorio |
| Vip activo | Single line | `vip_activo` | `si` / `no` — decide cuál confirmación sale |
| Vip fecha texto | Single line | `vip_fecha_texto` | `{{5}}` de la plantilla 2 |
| Vip lugar | Single line | `vip_lugar` | `{{6}}` de la plantilla 2 |
| Vip precio texto | Single line | `vip_precio_texto` | `{{7}}` de la plantilla 2 |

> El webhook manda también `etiquetas` y `vip_cupos_texto`, que **no tienen
> campo** todavía. Una llave sin mapear se ignora sin romper nada; están ahí
> por si algún día hacen falta.

### Paso 1 — El flujo y su disparador

**Automation → Workflows → Create Workflow → Start from scratch.**
Nombre sugerido: `CLASE · Registro → WhatsApp`.

Disparador: **Inbound Webhook**.
GHL muestra una **URL**. Esa URL es la que hay que pasarme para ponerla en
Vercel — ver el paso 5.

### Paso 2 — Mapear lo que llega

El sitio manda este JSON:

```json
{
  "first_name": "Carlos",
  "last_name": "Rodríguez Mora",
  "email": "carlos@ejemplo.com",
  "phone": "+50688887777",
  "country": "Costa Rica",
  "clase_nombre": "La Revolución de la Copropiedad Turística",
  "clase_fecha_texto": "Miércoles 28 de octubre",
  "clase_hora_texto": "7:00 p.m. Costa Rica",
  "clase_dia": "2026-10-28",
  "etiquetas": "clase:copropiedad-28-oct,variante:revolucion,via:instagram-manychat",
  "vip_activo": "si",
  "vip_fecha_texto": "Domingo 15 de noviembre de 2026",
  "vip_lugar": "La Fortuna de San Carlos",
  "vip_precio_texto": "US$97 por persona",
  "vip_cupos_texto": "40"
}

> Este JSON no está escrito de memoria: es la salida real de `avisarAGhl`,
> capturada contra un servidor de prueba.
```

Acción **Create/Update Contact**, mapeando cada llave a su campo.
`first_name`, `last_name`, `email`, `phone` y `country` son campos que GHL ya
tiene; los `clase_*` son los del paso 0.

> Para que GHL vea las llaves hay que mandarle una muestra primero: en la
> pantalla del webhook hay un botón para capturar una llamada de prueba. El
> paso 5 explica cómo disparar una.

### Paso 3 — El WhatsApp de confirmación, con o sin VIP

Una plantilla de WhatsApp es **texto fijo**: no se le puede meter un «si el VIP
está encendido» adentro. Por eso hay dos plantillas y la condición vive acá.

Acción **If/Else** sobre el campo `vip_activo`:

**Rama «si es igual a `si`»** → **Send WhatsApp Message** con
`clase_confirmacion_grupo_vip`:
- `{{1}}` → `{{contact.first_name}}`
- `{{2}}` → `{{contact.clase_nombre}}`
- `{{3}}` → `{{contact.clase_fecha_texto}}`
- `{{4}}` → `{{contact.clase_hora_texto}}`
- `{{5}}` → `{{contact.vip_fecha_texto}}`
- `{{6}}` → `{{contact.vip_lugar}}`
- `{{7}}` → `{{contact.vip_precio_texto}}`

**Rama «si no»** → **Send WhatsApp Message** con `clase_confirmacion_grupo`:
- `{{1}}` → `{{contact.first_name}}`
- `{{2}}` → `{{contact.clase_nombre}}`
- `{{3}}` → `{{contact.clase_fecha_texto}}`
- `{{4}}` → `{{contact.clase_hora_texto}}`

Después de las dos ramas, el flujo sigue junto al paso 4.

> **Tiene que ser plantilla, no «Manual Text».** La persona nunca te escribió,
> así que la ventana de 24 horas está cerrada y Meta no deja pasar texto libre.

> 🎚️ **El interruptor del VIP en el CRM gobierna los tres canales a la vez:**
> la página `/clase/vip`, el correo de confirmación y ahora el WhatsApp. El
> sitio lo lee **una sola vez por registro**, así que es imposible que a la
> misma persona le llegue un WhatsApp ofreciendo el VIP y un correo que no lo
> menciona.

### Paso 4 — El recordatorio del día

1. Acción **Event Start Date** → tipo **Custom Field** → `clase_dia`.
2. Acción **Wait** → *hasta la Event Start Date*, a la hora que quieras que
   salga el recordatorio (por la mañana, no encima de la clase).
3. Acción **Send WhatsApp Message** → `clase_recordatorio_dia`
   - `{{1}}` → `{{contact.first_name}}`
   - `{{2}}` → `{{contact.clase_nombre}}`
   - `{{3}}` → `{{contact.clase_hora_texto}}`

> 🕐 **La hora del recordatorio se escoge acá, no viene del sitio.** El campo
> `clase_dia` es un *Date picker*: guarda **el día y nada más**. El sitio lo
> calcula ya resuelto en hora de Costa Rica (`2026-10-28`), justamente para que
> no haya ninguna zona horaria que GHL pueda leer al revés — la clase del 28 a
> las 7 p.m. es `2026-10-29T01:00:00Z` en UTC, y un sistema que lea ese ISO en
> otra zona guardaría el **29**. Lo que no viaja no se puede malinterpretar.

> Alguien que se registra el mismo día de la clase ya tiene la fecha en el
> pasado: GHL se salta la espera y manda el recordatorio de una. Correcto.

### Paso 5 — Probarlo antes de encenderlo

1. Pasame la URL del webhook. La pongo en Vercel como `GHL_WEBHOOK_CLASE`
   (Production **y** Preview) y despliego.
2. Me registro con tu número en la landing.
3. Revisamos: que el contacto llegó a GHL con todos los campos, que el
   WhatsApp llegó, y que los botones abren el grupo y la página del VIP.
4. **Probar las dos ramas**: una vez con el VIP encendido en el CRM y otra
   apagado, para ver que sale la plantilla correcta cada vez. Una bifurcación
   que nunca se probó por los dos lados es una bifurcación de la que solo se
   conoce la mitad.
5. Recién ahí se publica el flujo.

---

## 3 · Lo que el sitio hace, en código

| Archivo | Qué |
|---|---|
| `src/lib/ghl.ts` | El POST al webhook y la conversión de hora a Costa Rica |
| `src/app/api/clase/registro/route.ts` | Lo llama después de guardar en el CRM |
| `src/app/(clase)/clase/grupo/route.ts` | La redirección al grupo |
| `next.config.ts` | `clase.tonyalvarado.com/grupo` → esa redirección |
| `tests/ghl.test.mjs` | `npm run test:ghl` — que el día de la clase no se corra |

**Mientras `GHL_WEBHOOK_CLASE` no exista, no pasa nada**: la función devuelve
`sin-configurar` y el registro sigue igual que siempre. El sitio no se rompe
por no tener el webhook.

**Si el aviso falla**, queda una actividad en la ficha del contacto en el CRM
diciendo que esa persona no recibió el WhatsApp. Un éxito no se anota —ese ya
se ve en GHL—; lo que se registra es lo que de otra forma sería invisible.

---

## 4 · Lo que queda abierto

- ~~Confirmar el estado del número.~~ ✅ **Verificado el 23 de octubre
  dentro de GHL.** La WABA «Tony Alvarado - Maze» está *Approved*, con la
  verificación de negocio de Meta *Verified* y los mensajes de marketing
  *Enabled*. El número **6441 7867** (Costa Rica) está *Connected* con calidad
  **Green**. El «Rechazado» que arrastraba la documentación desde el 13 de
  octubre ya no aplica.
- **Nadie atiende las respuestas.** Si alguien contesta el WhatsApp, eso cae en
  GHL y hay que leerlo. Un canal que escribe y no escucha se nota.
- **El contacto queda en dos bases** —Supabase y GHL— que no se hablan. Una
  etiqueta con el mismo nombre en los dos lados no es la misma etiqueta.
- ~~Tope de envío de ~250.~~ ✅ **No aplica a este número.** El panel de
  *Messaging limits* marca **100.000** conversaciones iniciadas por el negocio
  en 24 horas. El número ya está calentado; el tope no va a ser el límite.
- **El remitente se ve como «liderax10»**, no como «Tony Alvarado»: es el
  nombre para mostrar de la WABA. El mensaje dice «soy Tony», así que o se
  cambia el nombre para mostrar en Meta, o se acepta el desfase.
