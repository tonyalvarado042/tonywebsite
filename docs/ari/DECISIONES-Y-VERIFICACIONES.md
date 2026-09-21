# DECISIONES Y VERIFICACIONES

> Bitácora compartida entre Sebas, Codex, Claude Code y colaboradores.
> Separar hechos de propuestas.

## Convenciones

-   `[VERIFICADO-CODIGO]`
-   `[VERIFICADO-PRUEBA]`
-   `[VERIFICADO-UI]`
-   `[REPORTADO-USUARIO]` (resultado comunicado por Sebas; no sustituye una prueba independiente)
-   `[ACORDADO]`
-   `[ANTECEDENTE]`
-   `[POR VERIFICAR]`
-   `[BLOQUEADO]`

## Estado inicial --- 2026-09-19

### Producto y estrategia

-   `[ACORDADO]` Primer repo a modificar: `tonyalvarado.com`.
-   `[ACORDADO]` Flujo: calculadora → formulario → CRM Tony + informe →
    WhatsApp precargado → Maze/GHL → Ari.
-   `[ACORDADO]` Mantener CRM/informe actual.
-   `[ACORDADO]` Ari tendrá ruta especializada de calculadora.
-   `[ACORDADO]` Conservar origen `recursos/calculadora-airbnb`.
-   `[ACORDADO]` El visitante envía manualmente en WhatsApp.
-   `[ACORDADO]` Desactivar Ari antiguo es tarea separada.
-   `[ACORDADO]` No orientar todos los leads a copropiedad; descubrir
    interés y etapa.

### Calculadora

-   `[VERIFICADO-UI]` Tres secciones: Propiedad, Operación, Capital.
-   `[VERIFICADO-UI]` Escenarios: Conservador, Base, Optimista.
-   `[VERIFICADO-UI]` Formulario con nombre, WhatsApp, correo y
    consentimiento.
-   `[VERIFICADO-UI]` CRM de prueba muestra origen, nota del informe y
    actividad de correo.
-   `[POR VERIFICAR]` El CRM almacena individualmente los 21 inputs.
-   `[POR VERIFICAR]` Existe ID de análisis seguro.
-   `[POR VERIFICAR]` Semántica de éxito parcial.

### Maze / Meta

-   `[VERIFICADO-UI]` Maze Funnels es whitelabel sobre GoHighLevel.
-   `[VERIFICADO-UI]` Número objetivo: +506 6441 7867.
-   `[VERIFICADO-UI]` WABA «Tony Alvarado» contiene el número.
-   `[VERIFICADO-UI]` Sebas: acceso total al activo WABA, acceso
    parcial/básico al portafolio `liderax10`.
-   `[BLOQUEADO]` LeadConnector/Maze devuelve Meta `#3441038`.
-   `[POR VERIFICAR]` Acceso total al portafolio resuelve por sí solo.
-   `[POR VERIFICAR]` Procedimiento final para número ya registrado en
    Cloud API directa.
-   `[ACORDADO]` No borrar WABA/número/apps como arreglo.

## Plantilla de sesión

### YYYY-MM-DD --- `<agente/persona>`{=html}

**Objetivo**

**Archivos inspeccionados**

**Hallazgos verificados**

**Cambios**

**Comandos ejecutados**

**Resultados**

**No probado**

**Riesgos/bloqueantes**

**Próximo paso verificable**

## Checklist primera auditoría

-   [x] repo/rama
-   [x] stack/versiones
-   [x] package manager
-   [x] scripts
-   [x] ruta calculadora
-   [x] UI
-   [x] cálculo
-   [x] estado
-   [x] presets
-   [x] escenarios
-   [x] CTA
-   [x] formulario
-   [x] submit
-   [x] endpoint/server action
-   [x] CRM
-   [x] origen
-   [x] email
-   [x] éxito/error
-   [x] tests
-   [x] build/lint
-   [x] doble submit
-   [x] consentimiento

## 2026-09-19 --- Codex / auditoría inicial del repositorio

**Objetivo**

Verificar el funcionamiento local real de la calculadora Airbnb antes de
implementar la continuación a WhatsApp, sin cambiar código funcional,
dependencias, configuración, CRM, fórmulas ni diseño.

**Estado del repositorio**

-   `[VERIFICADO-CODIGO]` Repositorio local:
    `C:\Users\sebastianberrios\tonywebsite`.
-   `[VERIFICADO-CODIGO]` Rama: `feature/ari-calcudora-whatsapp` (el nombre
    contiene literalmente `calcudora`). HEAD:
    `d6586947207140e8a458a26c86f95f00597d7071`, idéntico al `origin/main`
    disponible localmente durante esta auditoría.
-   `[VERIFICADO-CODIGO]` Antes de esta entrada el árbol ya tenía cambios del
    usuario: `CLAUDE.md` modificado y `AGENTS.md`, `README-INSTALACION.md` y
    `docs/ari/` sin seguimiento. No se alteraron ni descartaron.
-   `[VERIFICADO-CODIGO]` `git diff --name-only` no mostró diferencias en los
    archivos funcionales auditados de calculadora, API, CRM, correo,
    secuencias, catálogo, configuración o paquetes. Por tanto, el flujo
    funcional continúa en el estado descrito abajo al comenzar esta etapa.
-   `[VERIFICADO-CODIGO]` Los documentos `CONTEXTO-MAESTRO`, `CONTRATO` y
    `PLAN-DE-IMPLEMENTACION` existen localmente con el sufijo ` (1)`, aunque
    `AGENTS.md` los referencia sin ese sufijo. Esto debe corregirse o
    normalizarse después sin perder contenido.

**Stack, versiones y arquitectura**

-   `[VERIFICADO-CODIGO]` Aplicación Next.js con App Router, React y
    TypeScript; Tailwind para estilos. La ruta pública vive bajo el route group
    `(es)` y monta componentes cliente para calculadora/formulario, mientras el
    guardado y correo ocurren en un Route Handler servidor.
-   `[VERIFICADO-CODIGO]` Gestor: npm; único lockfile de raíz:
    `package-lock.json`, formato `lockfileVersion: 3`.
-   `[VERIFICADO-CODIGO]` Versiones resueltas en el lockfile: Next.js
    `15.5.18`, React/React DOM `19.2.6`, TypeScript `5.9.3`, Tailwind
    `3.4.19`, `@supabase/supabase-js` `2.112.4`, Resend `6.12.4`, Sanity
    `3.99.0`, `next-sanity` `9.12.3`, Framer Motion `11.18.2`, Lucide React
    `0.400.0` y styled-components `6.4.2`.
-   `[VERIFICADO-CODIGO]` Los rangos declarados en `package.json` no siempre
    coinciden con la versión resuelta; para reproducibilidad manda el lockfile.
-   `[VERIFICADO-CODIGO]` Scripts disponibles: `dev`, `build`, `start` y
    `lint`. No existe script de tests.

**Mapa de archivos y funciones comprobadas**

-   `[VERIFICADO-CODIGO]`
    `src/app/(es)/recursos/calculadora-airbnb/page.tsx`: página pública,
    metadata/Schema.org, contenido editorial y montaje de
    `CalculadoraAirbnb`.
-   `[VERIFICADO-CODIGO]`
    `src/components/recursos/CalculadoraAirbnb.tsx`: componente cliente;
    mantiene el estado de los supuestos, escenario, paso, carga de Bike & Bed y
    desbloqueo del informe. `aplicarEscenario` mezcla el parche del escenario;
    `cargarBikeBed` carga el cuarto preset y vuelve a `base`; `useMemo` llama a
    `calcular(s)`.
-   `[VERIFICADO-CODIGO]`
    `src/components/recursos/InformeAirbnb.tsx`: componente cliente del
    formulario. `alEnviar` valida el estado local, hace `POST` a
    `/api/recursos/informe-airbnb` y, con `res.ok && json.ok`, activa `listo` y
    ejecuta `alRegistrar`.
-   `[VERIFICADO-CODIGO]` `src/lib/calculadora-airbnb.ts`: tipos, supuestos
    base, escenarios, cuatro presets, advertencia, fórmulas y formatos. Las
    funciones principales son `cuotaMensual`, `saldoPendiente`, `calcular` y
    `comparativo`.
-   `[VERIFICADO-CODIGO]`
    `src/app/api/recursos/informe-airbnb/route.ts`: `POST`, `getResend` y
    `limpiarSupuestos`; valida la solicitud, sanea supuestos, recalcula,
    registra el contacto, intenta la automatización, envía el informe e informa
    el resultado.
-   `[VERIFICADO-CODIGO]` `src/lib/crm.ts`: `normalizarTelefono`,
    `registrarActividad`, `altaContacto`, `inscribirEnAutomatizacion` y
    `traerRecursoPorSlug`. Accede con `SUPABASE_SERVICE_ROLE_KEY` solo en
    servidor a las tablas `cta_contactos`, `cta_actividades`, `cta_recursos`,
    `cta_automatizacion_pasos` y `cta_inscripciones` del esquema configurado.
-   `[VERIFICADO-CODIGO]` `src/lib/correo.ts`: selecciona el remitente seguro;
    `REMITENTE_CON_NOMBRE` es utilizado por el informe. El valor oficial es
    `Tony Alvarado <office@tonyalvarado.com>` salvo una sobreescritura permitida
    por las reglas del archivo.
-   `[VERIFICADO-CODIGO]` `src/lib/secuencias.ts`: `enlaceDeBaja` firma el
    enlace que se agrega al informe cuando el contacto no está dado de baja.
-   `[VERIFICADO-CODIGO]` `src/data/recursos.ts`: respaldo de catálogo para el
    slug `calculadora-airbnb`; la entrada a la calculadora es libre
    (`con_registro: false`).

**Estado y estructura financiera reales**

-   `[VERIFICADO-CODIGO]` Los 21 valores viven juntos en el estado cliente
    `s: Supuestos`; son números en unidades humanas: por ejemplo, `75` significa
    75 %, no `0.75`. Al enviar se serializa el objeto `supuestos` completo.
-   `[VERIFICADO-CODIGO]` Propiedad (8): `landArea`, `landPrice`, `buildArea`,
    `buildCost`, `furniture`, `amenities`, `permits`, `contingency`.
-   `[VERIFICADO-CODIGO]` Operación (6): `units`, `adr`, `occupancy`,
    `extraMonthly`, `opex`, `revenueGrowth`. La UI confirma que
    `extraMonthly` son «Otros ingresos mensuales».
-   `[VERIFICADO-CODIGO]` Capital (7): `downPayment`, `interest`, `term`,
    `appreciation`, `sp500`, `nasdaq`, `fixedIncome`.
-   `[VERIFICADO-CODIGO]` `calcular` devuelve `total`, `capitalInicial`,
    `credito`, `cuota`, `ingresoBruto`, `gastos`, `noi`, `flujoMensual`,
    `capRate`, `retornoSobreCapital`, `dscr`, `ocupacionEquilibrio`,
    `recuperacion`, `anio5` y `anio10`. Cada proyección contiene
    `terrenoFuturo`, `saldo`, `flujoAcumulado`, `patrimonio` y `anualizado`.
-   `[VERIFICADO-CODIGO]` No existe un resultado denominado `cajaNeta`. El
    indicador operativo real disponible es `noi`; no debe inventarse una cifra
    distinta para el mensaje.
-   `[VERIFICADO-CODIGO]` La UI calcula en tiempo real con `calcular(s)` y el
    servidor vuelve a ejecutar la misma función sobre los supuestos saneados.
    El backend no confía en resultados enviados por el navegador.

**Presets y escenarios**

-   `[VERIFICADO-CODIGO]` Presets definidos en `PROYECTOS`: `villa`, `doble`,
    `boutique` y `bikeBed`. Los tres primeros se ofrecen como accesos rápidos;
    Bike & Bed tiene un bloque independiente.
-   `[VERIFICADO-CODIGO]` Escenarios definidos en `ESCENARIOS`:
    `conservador`, `base` y `optimista`; únicamente sobrescriben
    `occupancy`, `adr` y `appreciation`.
-   `[VERIFICADO-CODIGO]` Solo Bike & Bed reinicia explícitamente el escenario
    a `base`. Los accesos rápidos Villa/Doble/Boutique reemplazan `s`, pero no
    actualizan `escenario`. Por ello la etiqueta del escenario puede quedar
    desincronizada de los valores de un preset recién cargado.
-   `[VERIFICADO-CODIGO]` No se conserva una identidad fiable del preset:
    Villa/Doble/Boutique no guardan nombre; Bike & Bed usa
    `bikeBedCargado`, pero la edición manual no lo limpia. El MVP no debe enviar
    un nombre de preset.

**CTA, formulario y recorrido real**

-   `[VERIFICADO-CODIGO]` «Quiero mi análisis GRATIS» es un enlace local
    `href="#solicitar-informe"` en `CalculadoraAirbnb.tsx`; no envía datos.
-   `[VERIFICADO-CODIGO]` La sección `#solicitar-informe` monta
    `InformeAirbnb` con los valores actuales de `supuestos` y `escenario` y el
    callback que muestra `#informe-completo`.
-   `[VERIFICADO-CODIGO]` El formulario pide `nombre`, `prefijo` + `telefono`,
    `correo` y la casilla `acepta`. El botón «Enviame el informe GRATIS» llama a
    `alEnviar`.
-   `[VERIFICADO-CODIGO]` El cuerpo actual del POST contiene `nombre`,
    `correo`, `prefijo`, `whatsapp`, `escenario` y los 21 `supuestos`. No incluye
    `acepta`/consentimiento ni resultados calculados.
-   `[VERIFICADO-CODIGO]` El endpoint exige JSON, limita el cuerpo a 8.000
    bytes, valida nombre/correo/teléfono, normaliza el teléfono a E.164, acepta
    solo claves conocidas de `Supuestos`, sustituye entradas inválidas por el
    valor base y recalcula con `calcular`.
-   `[VERIFICADO-CODIGO]` El honeypot `website` existe en el endpoint, pero el
    formulario normal no renderiza ni envía ese campo.

**CRM, origen, duplicados y automatización**

-   `[VERIFICADO-CODIGO]` El código real llama a `altaContacto` con
    `fuente: 'recurso_gratis'` y `etiqueta: 'recurso:calculadora-airbnb'`.
    Estos son los valores que deben preservarse en CRM Tony.
-   `[ACORDADO]` El literal con barra `recursos/calculadora-airbnb` se reserva
    para la señal `Origen:` del mensaje que leerá Maze/Ari. No sustituye
    `fuente_lead` ni el tag actuales del CRM Tony.
-   `[VERIFICADO-CODIGO]` `altaContacto` busca primero por teléfono E.164 y
    después por correo. Si encuentra contacto, conserva nombre/correo/teléfono
    ya presentes, añade el tag si falta, actualiza fechas y registra una nota.
    Si no existe, lo inserta con `fuente_lead='recurso_gratis'`,
    `etapa_pipeline='nuevo'`, el tag y después registra la nota.
-   `[VERIFICADO-CODIGO]` La nota conserva únicamente escenario, costo total,
    capital inicial, flujo mensual y cap rate; los 21 supuestos y el resultado
    completo no se persisten individualmente por este flujo.
-   `[VERIFICADO-CODIGO]` Si el contacto no está dado de baja, el endpoint
    consulta el recurso por slug. Cuando existe `automatizacion_id`, llama a
    `inscribirEnAutomatizacion`; el `upsert` ignora el conflicto
    `(contacto_id, automatizacion_id)` para no reiniciar una inscripción.
-   `[VERIFICADO-CODIGO]` No existe idempotencia del POST completo. Un reenvío
    puede volver a registrar una nota y volver a enviar correo, aunque no cree
    un segundo contacto ni una segunda inscripción a la misma automatización.
    En cliente, `enviando` evita el doble clic mientras la primera petición está
    pendiente.

**Correo, identificador y semántica de éxito/error**

-   `[VERIFICADO-CODIGO]` Después del CRM y del intento de automatización, el
    endpoint compone un informe de texto con Resend. Incluye una selección de
    supuestos, resultados principales, patrimonio a 5/10 años, advertencia,
    enlace para repetir la calculadora y enlace de baja cuando corresponde.
-   `[VERIFICADO-CODIGO]` Tras `emails.send`, registra una actividad `email`
    con el destino. Un error lanzado por correo se captura: el lead queda en CRM
    y el endpoint devuelve `ok: true, correoEnviado: false`.
-   `[VERIFICADO-CODIGO]` Riesgo: el resultado retornado por
    `getResend().emails.send` no se inspecciona. `correoEnviado` se marca `true`
    siempre que no haya excepción, aunque el SDK pudiera devolver un objeto
    con `error`; la actividad también se registraría como enviada.
-   `[VERIFICADO-CODIGO]` Respuesta normal exitosa:
    `{ ok: true, correoEnviado, yaExistia }`. El cliente ignora
    `correoEnviado` y siempre afirma «Te mandamos el informe», incluso cuando
    el servidor reporta `false`.
-   `[VERIFICADO-CODIGO]` Error de tipo/tamaño/formato/validación devuelve
    4xx y no abre el informe. Error de CRM propaga al `catch` exterior, devuelve
    500 y no intenta correo. Error de automatización se registra y no bloquea.
    Error lanzado por correo no bloquea el informe extendido. Error de red
    muestra mensaje y vuelve a habilitar el formulario.
-   `[VERIFICADO-CODIGO]` El UUID `contactoId` existe internamente para CRM,
    actividad, automatización y baja, pero no se devuelve al navegador. No hay
    entidad, snapshot persistido ni identificador público de análisis/informe
    reutilizable en este flujo.
-   `[VERIFICADO-CODIGO]` El consentimiento se exige únicamente para habilitar
    el botón en React. No se envía, no se valida en servidor y no se registra
    junto al contacto o la actividad. Además, el backend acepta cualquier
    cadena como escenario y usa un límite numérico genérico de
    `0..1.000.000.000` para todos los campos.

**Punto seguro para WhatsApp**

-   `[ACORDADO]` La continuación solo puede ofrecerse después de que
    `InformeAirbnb.alEnviar` haya comprobado `res.ok && json.ok`; antes de ese
    punto rompería la precedencia del CRM y podría perder errores.
-   `[ACORDADO]` Para que el mensaje use exactamente el snapshot saneado y
    recalculado que sustentó CRM/correo, el backend debe construir la URL con
    una función pura y devolverla en la respuesta exitosa. El cliente debe
    mostrar un botón persistente «Continuar por WhatsApp», no depender de un
    `window.open` asíncrono susceptible a bloqueo.
-   `[ACORDADO]` Si CRM funcionó y el correo falló, la UI debe informar el
    fallo parcial y permitir WhatsApp. Si falla validación o CRM, no se debe
    ofrecer ni abrir WhatsApp.

**Pruebas y comandos ejecutados**

-   `[VERIFICADO-PRUEBA]` `git status`, `git rev-parse`, `git log`,
    `git diff --name-only`, `git hash-object` y búsquedas con `rg`: rama/HEAD,
    árbol previo y ausencia de cambios funcionales confirmados.
-   `[VERIFICADO-PRUEBA]` Smoke test directo de
    `src/lib/calculadora-airbnb.ts` con Node `v24.19.0` y eliminación nativa de
    tipos: `calcular` produjo resultados finitos para `villa`, `doble`,
    `boutique`, `bikeBed` y para los escenarios conservador/base/optimista.
    No se modificaron fórmulas ni archivos.
-   `[VERIFICADO-PRUEBA]` `rg --files` no encontró archivos de prueba; las
    coincidencias `testimonial`/`testimonials` no son tests automatizados.
-   `[VERIFICADO-PRUEBA]` `node_modules` no existe. `npm ls --depth=0` falló
    con `ELSPROBLEMS` y todas las dependencias como `UNMET DEPENDENCY`.
-   `[VERIFICADO-PRUEBA]` `npm run lint` ejecuta `next lint`, pero falló porque
    el binario local `next` no está instalado. Aun con dependencias, Next 15.5
    debe confirmar si ese subcomando sigue siendo válido.
-   `[POR VERIFICAR]` No se ejecutaron TypeScript, build ni pruebas de endpoint,
    CRM, automatización, Resend, navegador, WhatsApp móvil/web o producción en
    esta etapa, porque no hay dependencias instaladas ni credenciales de prueba
    verificadas. No se instalaron dependencias.

**Riesgos/bloqueantes para planificación**

-   Escenario potencialmente desincronizado al cargar presets rápidos y preset
    no identificable con certeza.
-   Consentimiento ausente del contrato servidor y escenario sin enum/validación
    de backend.
-   Éxito parcial de correo comunicado erróneamente por UI y respuesta de
    Resend sin inspección explícita.
-   Sin idempotencia integral: reintentos pueden duplicar nota y correo.
-   Saneamiento por rango único y sustitución silenciosa por valores base puede
    producir un informe distinto al dato inválido enviado.
-   Mensaje con 21 supuestos y resultados puede producir una URL larga; medir
    longitud y comprobar WhatsApp móvil/web antes de aprobarla.
-   Los montos quedarán en el query string de `wa.me`; excluir teléfono, correo,
    UUID, credenciales y cualquier PII innecesaria.
-   Ausencia de suite de pruebas, dependencias locales, entorno de integración
    y evidencia de despliegue. La conexión del número a Maze sigue fuera de
    alcance y no está demostrada.

**Cambios**

-   Solo se actualizó esta bitácora. No se cambió código funcional, fórmulas,
    diseño, paquetes, configuración, CRM, Meta, Maze ni `ari-bot`.
-   No se hizo commit ni despliegue.

**Estado separado**

-   **Implementado antes de esta etapa:** calculadora, formulario, alta/
    actualización en CRM, nota, inscripción opcional a automatización, intento
    de correo y actividad de correo. La continuación a WhatsApp todavía no
    estaba implementada al cierre de esta auditoría.
-   **Probado en esta etapa:** estructura/código local sin diferencias contra
    HEAD y smoke test puro de cálculo para cuatro presets/tres escenarios.
    No se probó infraestructura externa ni UI real.
-   **Desplegado:** `[POR VERIFICAR]`. Que el código exista en HEAD o que haya
    una captura previa no demuestra el estado actual de producción.

**Traspaso a planificación**

1.  Congelar el contrato con un tipo de escenario cerrado, consentimiento
    explícito y snapshot servidor (`supuestos` saneados + `Resultado`).
2.  Definir el helper puro de mensaje/URL con número `50664417867`, marca
    `[ARI:CALCULADORA_AIRBNB]` y
    `Origen: recursos/calculadora-airbnb`, sin preset ni PII.
3.  Definir respuesta del endpoint y UX diferenciada para correo enviado vs.
    fallo parcial, preservando `ok`, `yaExistia`, CRM y automatización.
4.  Corregir la inspección de Resend, añadir pruebas del serializador y medir la
    URL; después integrar el botón persistente de WhatsApp.
5.  Ejecutar TypeScript, lint/build y pruebas de integración cuando exista un
    entorno con dependencias, sin desplegar ni usar leads reales hasta recibir
    autorización.

## 2026-09-19 --- Codex / mensaje puro de WhatsApp

**Objetivo**

Implementar únicamente el contrato puro de escenario, serialización y URL de
WhatsApp, sin integrar todavía el endpoint, el formulario ni la carga de
presets.

**Archivos inspeccionados**

-   `AGENTS.md`.
-   `docs/ari/CONTRATO-CALCULADORA-WHATSAPP (1).md`.
-   `docs/ari/DECISIONES-Y-VERIFICACIONES.md`.
-   `src/lib/calculadora-airbnb.ts`, `package.json` y `tsconfig.json`.

**Hallazgos verificados**

-   `[VERIFICADO-CODIGO]` Los únicos escenarios válidos son
    `conservador`, `base` y `optimista`; se formalizaron como
    `EscenarioAirbnb` sin modificar los parches ni las fórmulas existentes.
-   `[VERIFICADO-CODIGO]` El mensaje detallado serializa los 21 supuestos y
    los resultados acordados, incluido el indicador real `noi`, con la marca
    `[ARI:CALCULADORA_AIRBNB]`, el origen
    `recursos/calculadora-airbnb` y la advertencia educativa.
-   `[VERIFICADO-CODIGO]` El enlace usa el destino `50664417867` y
    `encodeURIComponent`. Solo recibe el nombre previsto por el contrato, que
    normaliza en Unicode, elimina saltos/controles y limita a 80 caracteres;
    no recibe ni serializa correo, teléfono, preset o IDs internos.
-   `[VERIFICADO-CODIGO]` Si la URL detallada supera 4096 caracteres se usa
    el mensaje compacto, priorizando origen, escenario, magnitud, supuestos
    principales y resultados principales.

**Cambios**

-   `src/lib/calculadora-airbnb.ts`: se añadieron el tipo
    `EscenarioAirbnb`, el `Record` cerrado de escenarios y el guard
    `esEscenarioAirbnb`; no cambiaron valores ni cálculos.
-   `src/lib/calculadora-airbnb-whatsapp.ts`: nuevo helper puro para mensaje
    detallado, mensaje compacto, URL codificada y selección por longitud.
-   `tests/calculadora-airbnb-whatsapp.test.mjs`: nueva cobertura con
    `node:test` para cuatro presets por tres escenarios, campos, resultados,
    Unicode, encoding, valores no finitos, exclusión de datos y fallback.
-   `package.json`: se añadió `test:whatsapp`; no se cambiaron dependencias ni
    `package-lock.json`.

**Comandos ejecutados y resultados**

-   `[VERIFICADO-PRUEBA]` `npm run test:whatsapp`: 7 pruebas aprobadas, 0
    fallidas. Node 24 mostró únicamente la advertencia
    `MODULE_TYPELESS_PACKAGE_JSON`; no se cambió el tipo de módulo global del
    proyecto para silenciarla.
-   `[VERIFICADO-PRUEBA]` Los 12 cruces de cuatro presets por tres escenarios
    generaron URL detallada, sin fallback, entre 2113 y 2138 caracteres. Todos
    quedaron por debajo del límite contractual de 4096.
-   `[VERIFICADO-PRUEBA]` `git diff --check` no encontró errores de espacios;
    solo avisos de conversión futura LF/CRLF en archivos rastreados.
-   `[VERIFICADO-PRUEBA]` El hash de `package-lock.json` permaneció en
    `417df465dceaadeb083f1d100740ac1eee54d92a`; no se instalaron paquetes.

**No probado**

-   TypeScript completo, lint, build, endpoint, CRM, Resend, navegador y
    apertura real en WhatsApp móvil/web quedan para las etapas de integración
    y revisión. No se usaron leads reales.

**Riesgos/bloqueantes**

-   La compatibilidad práctica de URLs cercanas a 4096 caracteres debe
    verificarse en los navegadores y clientes WhatsApp objetivo; el fallback
    puro ya existe, pero aún no está conectado a la UI.
-   El helper todavía no es invocado por el Route Handler, por diseño de esta
    etapa.

**Traspaso a integración**

Usar `esEscenarioAirbnb` para rechazar escenarios inválidos en servidor y
`construirEnlaceWhatsApp` únicamente con los supuestos saneados y el
`Resultado` recalculado. Devolver `url` después del éxito del CRM; no construir
otra versión del mensaje en el cliente.

## 2026-09-19 --- Codex / integración de servidor y formulario

**Objetivo**

Conectar el enlace puro de WhatsApp al flujo real de solicitud del informe,
después del alta exitosa en CRM, conservando correo, automatización, informe
extendido, carga, errores y consentimiento.

**Archivos inspeccionados**

-   `AGENTS.md`.
-   `docs/ari/CONTRATO-CALCULADORA-WHATSAPP (1).md`.
-   `docs/ari/DECISIONES-Y-VERIFICACIONES.md`.
-   `src/app/api/recursos/informe-airbnb/route.ts`.
-   `src/components/recursos/InformeAirbnb.tsx`.
-   `src/components/recursos/CalculadoraAirbnb.tsx`.
-   `src/lib/calculadora-airbnb.ts`.
-   `src/lib/calculadora-airbnb-whatsapp.ts`.
-   `tests/calculadora-airbnb-whatsapp.test.mjs` y `package.json`.

**Hallazgos verificados**

-   `[VERIFICADO-CODIGO]` El endpoint ahora exige
    `consentimiento === true` y un escenario reconocido por
    `esEscenarioAirbnb` antes de normalizar los datos y llamar al CRM; ambos
    rechazos responden 422 sin ofrecer URL de WhatsApp.
-   `[VERIFICADO-CODIGO]` El alta conserva exactamente
    `fuente: 'recurso_gratis'`, `etiqueta: 'recurso:calculadora-airbnb'`, la
    nota existente, el manejo de duplicados y la inscripción opcional en la
    automatización.
-   `[VERIFICADO-CODIGO]` El servidor construye `whatsappUrl` con el nombre,
    el escenario validado, los 21 supuestos saneados y el mismo `Resultado`
    recalculado usado por CRM/correo. La URL solo se devuelve después del alta
    en CRM y del intento de correo.
-   `[VERIFICADO-CODIGO]` El honeypot mantiene su éxito silencioso y no
    devuelve una URL. La respuesta normal no expone UUID, teléfono, correo ni
    errores del proveedor.
-   `[VERIFICADO-CODIGO]` La respuesta de Resend ahora se desestructura para
    inspeccionar `error`; `correoEnviado` y la actividad `email` solo se
    producen si Resend no reporta error. Un fallo exclusivo del correo conserva
    `ok: true` y la continuación a WhatsApp.
-   `[VERIFICADO-CODIGO]` El formulario envía el consentimiento y valida que
    una respuesta exitosa contenga `correoEnviado` booleano y una URL del
    destino contractual `https://wa.me/50664417867?text=`. Una respuesta sin
    URL no se muestra como éxito ni desbloquea el informe extendido.
-   `[VERIFICADO-CODIGO]` La confirmación distingue correo enviado de fallo
    parcial, conserva el acceso al informe extendido y presenta un enlace
    persistente «Continuar por WhatsApp» con `target="_blank"` y
    `rel="noopener noreferrer"`. No hay apertura automática y se explica que
    el visitante debe revisar y pulsar Enviar dentro de WhatsApp.
-   `[VERIFICADO-CODIGO]` El estado y el handler de escenario quedaron tipados
    como `EscenarioAirbnb`. Cargar Villa, Dos villas o Hotel boutique repone
    únicamente la etiqueta a `base`, sin mezclar `ESCENARIOS.base` sobre el
    preset; Bike & Bed conserva su comportamiento previo.

**Cambios**

-   `src/app/api/recursos/informe-airbnb/route.ts`: validación contractual,
    inspección correcta de Resend y respuesta con `whatsappUrl` construida en
    servidor.
-   `src/components/recursos/InformeAirbnb.tsx`: consentimiento en el POST,
    contrato mínimo de respuesta, éxito parcial visible y fallback clicable a
    WhatsApp.
-   `src/components/recursos/CalculadoraAirbnb.tsx`: tipos cerrados de
    escenario y sincronización de la etiqueta al cargar presets rápidos.
-   `docs/ari/DECISIONES-Y-VERIFICACIONES.md`: esta evidencia y el traspaso.
-   No se cambiaron fórmulas, esquema o funciones del CRM, dependencias,
    `package-lock.json`, Meta, Maze ni `ari-bot`.

**Comandos ejecutados y resultados**

-   `[VERIFICADO-PRUEBA]` `npm run test:whatsapp`: 7 pruebas aprobadas, 0
    fallidas. Persiste únicamente la advertencia conocida de Node
    `MODULE_TYPELESS_PACKAGE_JSON`.
-   `[VERIFICADO-PRUEBA]` `git diff --check`: sin errores de whitespace; Git
    solo avisó sobre una futura conversión LF/CRLF en archivos rastreados.
-   `[VERIFICADO-PRUEBA]` `git diff` confirmó que fuente/tag, automatización,
    fórmulas y contenido del informe por correo permanecen en el flujo.

**No probado**

-   No se ejecutaron TypeScript completo, lint ni build porque el repositorio
    continúa sin `node_modules` y esta etapa no autoriza instalar dependencias.
-   No se probaron Route Handler con dobles de CRM/Resend, navegador, apertura
    real en WhatsApp móvil/web, infraestructura externa, contactos reales ni
    producción.

**Riesgos/bloqueantes**

-   La ruta completa aún necesita pruebas de integración para CRM exitoso/
    fallido, Resend exitoso/error devuelto/excepción y respuesta inválida.
-   El POST sigue sin idempotencia integral: un reintento puede repetir la nota
    y el correo aunque el contacto y la automatización se dedupliquen.
-   Debe comprobarse la apertura práctica de las URLs en WhatsApp móvil y web;
    las pruebas actuales solo validan contenido, encoding y longitud.

**Traspaso a pruebas y correcciones**

Ejecutar TypeScript, lint y build en un entorno con las dependencias bloqueadas
instaladas; añadir o ejecutar pruebas del endpoint/estado del formulario para
los casos de éxito total, fallo parcial del correo, fallo de CRM, validación,
red y doble clic. Verificar manualmente el botón y el mismo snapshot en
WhatsApp móvil/web sin usar leads reales ni desplegar.

## 2026-09-19 — Codex / pruebas y correcciones pequeñas

**Objetivo**

Instalar exclusivamente las dependencias fijadas, ejecutar la batería local y
corregir bordes acotados del serializador sin alterar fórmulas, CRM, correo,
diseño, dependencias ni integraciones externas.

**Archivos inspeccionados**

- AGENTS.md, esta bitácora y docs/ari/CONTRATO-CALCULADORA-WHATSAPP (1).md.
- package.json, package-lock.json, src/lib/calculadora-airbnb-whatsapp.ts,
  tests/calculadora-airbnb-whatsapp.test.mjs,
  src/app/api/recursos/informe-airbnb/route.ts,
  src/components/recursos/InformeAirbnb.tsx y
  src/components/recursos/CalculadoraAirbnb.tsx.

**Hallazgos verificados**

- [VERIFICADO-CODIGO] El honeypot devuelve { ok: true, filtrado: true } sin
  whatsappUrl; exitoDeRespuesta exige la URL segura, por lo que la UI no lo
  interpreta como éxito ni desbloquea el informe.
- [VERIFICADO-CODIGO] Consentimiento y escenario reconocido se validan antes
  de altaContacto; los rechazos son 422 y no construyen URL.
- [VERIFICADO-CODIGO] El resultado error de Resend se inspecciona; no se marca
  correo ni actividad email cuando el proveedor lo devuelve.
- [VERIFICADO-CODIGO] El enlace de WhatsApp es un ancla persistente, con
  target="_blank" y rel="noopener noreferrer"; no hay apertura automática.
- [VERIFICADO-CODIGO] Los presets rápidos regresan la etiqueta de escenario
  a base; Bike & Bed mantiene ese comportamiento. No se cambiaron valores ni
  fórmulas.
- [VERIFICADO-CODIGO] El fallback compacto preserva la prioridad contractual:
  marca/origen/escenario, magnitud y supuestos principales del proyecto,
  resultados principales, advertencia y llamada a la acción. El detallado
  conserva las tres secciones y los 21 supuestos.
- [VERIFICADO-CODIGO] Se detectó que un sustituto UTF-16 aislado recibido por
  POST podía llegar a encodeURIComponent y lanzar URIError. El sanitizador
  ahora reemplaza sustitutos aislados por U+FFFD antes de normalizar y codificar.
- [VERIFICADO-CODIGO] La calculadora representa ausencia de deuda con dscr = 99;
  el serializador ahora lo expresa como Sin deuda, coherente con la UI y el
  correo, en vez de imprimir 99x.
- [VERIFICADO-CODIGO] Formateadores del helper convierten valores no finitos
  a representaciones seguras; recuperación no finita se expresa como No aplica.

**Cambios**

- src/lib/calculadora-airbnb-whatsapp.ts: manejo seguro de sustitutos Unicode
  aislados y etiqueta DSCR Sin deuda para el sentinela existente.
- tests/calculadora-airbnb-whatsapp.test.mjs: dos pruebas adicionales para
  esos bordes. La suite pasa de 7 a 9 pruebas.
- No se modificaron package-lock.json, fórmulas, esquema/funciones CRM, correo,
  Meta, Maze, ari-bot, ni se realizaron llamadas externas.

**Comandos ejecutados**

- [VERIFICADO-PRUEBA] npm ci completó usando el lockfile; npm ls --depth=0
  confirma las versiones resueltas. Solo aparecieron advertencias de
  deprecación transitiva de npm; no se añadieron ni actualizaron dependencias.
- [VERIFICADO-PRUEBA] SHA-1 de package-lock.json antes y después:
  36044133497E9E8CF30A47C48B3A2CD064C9EEE3; git diff -- package-lock.json
  permanece vacío.
- [VERIFICADO-PRUEBA] npm run test:whatsapp: 9 aprobadas, 0 fallidas.
  Persiste la advertencia no bloqueante MODULE_TYPELESS_PACKAGE_JSON de Node.
- [VERIFICADO-PRUEBA] npx tsc --noEmit completó sin diagnósticos.
- [VERIFICADO-PRUEBA] npm run build: compilación correcta, chequeo de tipos
  correcto y generación de 58/58 páginas; .next/BUILD_ID existe.
- [VERIFICADO-PRUEBA] git diff --check: sin errores de whitespace. Git emite
  solo los avisos preexistentes de conversión futura LF/CRLF.
- [BLOQUEADO] npm run lint termina con salida 1 porque el script legado
  next lint abre el asistente interactivo para crear configuración ESLint.
  Se intentó también con CI=1; no creó archivos ni se aceptó la configuración
  propuesta, para no introducir dependencias/configuración fuera del alcance.

**No probado**

- No se invocó el Route Handler con dobles de Supabase/Resend ni sistemas
  externos; por tanto CRM, Resend, automatización y correo no se verificaron
  contra infraestructura real.
- No se probó navegación ni WhatsApp real en móvil/escritorio, ni se usaron
  contactos reales. No hubo commit ni despliegue.

**Riesgos/bloqueantes**

- Falta una configuración de lint no interactiva ya aceptada por el proyecto;
  resolverla requiere una decisión separada porque el comando actual propone
  cambios de configuración.
- Las URLs detalladas probadas para presets/escenarios quedan bajo 4096, pero
  la apertura real debe validarse en clientes WhatsApp objetivo antes de deploy.
- El POST sigue sin idempotencia integral, riesgo ya existente para reintentos.

**Traspaso a revisión predeploy**

Revisar el diff completo, la ausencia de cambios en package-lock.json, las dos
correcciones del helper y la separación de estados CRM/correo/WhatsApp.
Mantener como pendientes la verificación manual de WhatsApp y la decisión de
lint; no desplegar hasta que el responsable las acepte.

## 2026-09-19 — Codex / revisión final predeploy

**Objetivo**

Revisar de forma independiente el diff funcional completo, repetir las
comprobaciones locales y emitir un dictamen explícito antes de solicitar un
deploy, sin invocar CRM, Resend, WhatsApp, Maze ni otros servicios reales.

**Archivos inspeccionados**

- `AGENTS.md`, esta bitácora y
  `docs/ari/CONTRATO-CALCULADORA-WHATSAPP (1).md` completos.
- `src/lib/calculadora-airbnb.ts` y su diff contra
  `d6586947207140e8a458a26c86f95f00597d7071`.
- `src/lib/calculadora-airbnb-whatsapp.ts` y
  `tests/calculadora-airbnb-whatsapp.test.mjs`, ambos nuevos y todavía sin
  seguimiento en Git.
- `src/app/api/recursos/informe-airbnb/route.ts`,
  `src/components/recursos/InformeAirbnb.tsx`,
  `src/components/recursos/CalculadoraAirbnb.tsx`, `package.json` y
  `package-lock.json`.

**Dictamen**

- `[VERIFICADO-CODIGO]` No se encontraron defectos críticos nuevos ni se
  modificó código funcional durante esta revisión.
- `[VERIFICADO-PRUEBA]` El código local está compilable y las pruebas puras
  pasan, pero **NO está listo para solicitar deploy de producción** mientras
  sigan pendientes la apertura real en WhatsApp móvil/web y una decisión
  explícita sobre el lint no automatizable. Un entorno de preview controlado
  puede usarse después de autorizarlo para cerrar la validación manual.
- `[POR VERIFICAR]` Este dictamen no afirma que la integración esté desplegada,
  que WhatsApp/Maze haya recibido el mensaje ni que CRM/Resend funcionen en la
  infraestructura real.

**Hallazgos verificados**

- `[VERIFICADO-CODIGO]` Las fórmulas, constantes financieras, presets y
  parches de escenario no cambiaron. El diff de
  `calculadora-airbnb.ts` solo añade el tipo cerrado de escenario y su guard.
- `[VERIFICADO-CODIGO]` El Route Handler valida JSON, tamaño, consentimiento,
  escenario, correo y teléfono antes de `altaContacto`; un rechazo 4xx no
  construye ni devuelve `whatsappUrl`.
- `[VERIFICADO-CODIGO]` El snapshot usado para WhatsApp está compuesto por los
  mismos 21 supuestos saneados en servidor y el mismo `Resultado` recalculado
  que alimentan la nota y el correo. El cliente no envía resultados ni vuelve
  a calcular el mensaje.
- `[VERIFICADO-CODIGO]` El orden final es CRM → automatización opcional →
  intento de correo → construcción/respuesta de WhatsApp. Un fallo de CRM
  produce 500 y no ofrece WhatsApp; un fallo exclusivo de correo conserva
  `ok: true`, informa `correoEnviado: false` y permite continuar.
- `[VERIFICADO-CODIGO]` Resend se evalúa mediante su propiedad `error`; solo
  sin ese error se marca `correoEnviado` y se intenta registrar la actividad
  `email`. Se preservó la semántica previa en la que un fallo al registrar la
  actividad no deshace un correo que ya fue aceptado por Resend.
- `[VERIFICADO-CODIGO]` El CRM conserva exactamente
  `fuente: 'recurso_gratis'` y `etiqueta: 'recurso:calculadora-airbnb'`.
  `Origen: recursos/calculadora-airbnb` aparece exclusivamente en el mensaje
  para Ari/Maze; no se cambiaron `crm.ts`, tablas, deduplicación ni
  automatizaciones.
- `[VERIFICADO-CODIGO]` La respuesta normal expone solo `ok`,
  `correoEnviado`, `yaExistia` y `whatsappUrl`. No devuelve teléfono, correo,
  UUID de contacto, errores del proveedor, claves ni otros secretos.
- `[VERIFICADO-CODIGO]` El helper no recibe correo, teléfono, preset ni IDs.
  Incluye el nombre requerido por el contrato tras normalizar Unicode,
  eliminar controles/saltos y limitarlo a 80 caracteres. Usa
  `encodeURIComponent`, destino `50664417867`, marca estable, origen,
  advertencia educativa y un fallback compacto sobre 4096 caracteres.
- `[VERIFICADO-CODIGO]` El mensaje detallado incluye Propiedad, Operación y
  Capital con los 21 supuestos, más resultados calculados reales; usa `noi`
  como indicador existente y describe la prima como simulada, no como capital
  disponible declarado.
- `[VERIFICADO-CODIGO]` El formulario comprueba la forma mínima de la respuesta
  y el prefijo contractual de `wa.me`, muestra un enlace persistente en un clic
  explícito con `noopener noreferrer`, no abre popups automáticamente y aclara
  que el visitante aún debe pulsar Enviar en WhatsApp.
- `[VERIFICADO-CODIGO]` El estado `enviando` y el botón deshabilitado conservan
  la prevención cliente de doble submit mientras hay una petición pendiente.
  El servidor sigue sin idempotencia integral, por lo que un reintento posterior
  puede duplicar nota y correo.
- `[VERIFICADO-CODIGO]` Villa, Dos villas, Hotel boutique y Bike & Bed colocan
  la etiqueta de escenario en `base` al cargarse. No se transmite un nombre de
  preset no fiable y no se mezclan valores de `ESCENARIOS.base` sobre el preset.
- `[VERIFICADO-CODIGO]` `package.json` solo añade `test:whatsapp`; no se
  agregaron dependencias. `package-lock.json` no tiene diff.

**Comandos ejecutados y resultados**

- `[VERIFICADO-PRUEBA]` `npm run test:whatsapp`: 9 aprobadas, 0 fallidas;
  cubre 4 presets × 3 escenarios, 21 campos, resultados, encoding, Unicode,
  ausencia de literales inválidos/PII/IDs, DSCR sin deuda y fallback compacto.
  Permanece la advertencia no bloqueante `MODULE_TYPELESS_PACKAGE_JSON`.
- `[VERIFICADO-PRUEBA]` `npx tsc --noEmit`: salida 0, sin diagnósticos.
- `[VERIFICADO-PRUEBA]` `npm run build`: salida 0; compilación y chequeo de
  tipos correctos, 58/58 páginas generadas y ruta dinámica del endpoint
  incluida.
- `[VERIFICADO-PRUEBA]` `npm ls --depth=0`: salida 0; dependencias instaladas
  coherentes, incluidas Next.js 15.5.18, React 19.2.6, TypeScript 5.9.3,
  Supabase 2.112.4 y Resend 6.12.4.
- `[VERIFICADO-PRUEBA]` `git diff --check`: salida 0; solo avisos de futura
  conversión LF/CRLF.
- `[VERIFICADO-PRUEBA]` SHA-1 actual de `package-lock.json`:
  `36044133497E9E8CF30A47C48B3A2CD064C9EEE3`; `git diff --exit-code --
  package-lock.json`: salida 0.
- `[BLOQUEADO]` No se repitió `npm run lint`: la etapa anterior verificó que
  el script legado `next lint` abre un asistente interactivo por falta de una
  configuración ESLint aceptada. El build sí ejecutó su fase integrada
  «Linting and checking validity of types» sin errores, pero esto no sustituye
  un comando de lint reproducible.

**No probado**

- Apertura, legibilidad y retorno del enlace en WhatsApp móvil y WhatsApp Web.
- UI en navegador real: estados de éxito total, correo fallido, red caída,
  doble clic y enlace de recuperación.
- Route Handler con dobles controlados de Supabase y Resend para CRM
  exitoso/fallido, `error` de Resend y excepción del proveedor.
- CRM, automatización, Resend, correo, WhatsApp y Maze contra infraestructura
  externa; no se usaron contactos reales.
- Producción actual y cualquier deploy. No hubo commit ni despliegue.

**Riesgos y bloqueantes predeploy**

1. `[BLOQUEADO]` Falta validar en los clientes WhatsApp objetivo el enlace
   detallado real (las URLs de presets están bajo 4096 caracteres en pruebas,
   pero eso no demuestra compatibilidad práctica móvil/web).
2. `[BLOQUEADO]` Falta decidir y dejar reproducible la política de lint del
   proyecto; el script actual no es apto para CI sin introducir configuración.
3. `[POR VERIFICAR]` No hay pruebas automatizadas de integración del endpoint
   ni del estado React. El análisis está respaldado por inspección, prueba pura,
   TypeScript y build, no por dobles de CRM/Resend o pruebas de navegador.
4. `[POR VERIFICAR]` El POST no es idempotente de extremo a extremo. Un doble
   clic queda mitigado en cliente, pero un reintento nuevo puede repetir nota y
   correo; es deuda preexistente que debe aceptarse o planificarse por separado.
5. `[POR VERIFICAR]` `limpiarSupuestos` mantiene el saneamiento preexistente:
   usa un rango genérico y sustituye silenciosamente entradas inválidas por el
   valor base. No es regresión de este cambio, pero un POST manipulado puede
   producir un snapshot distinto de la entrada rechazada.
6. `[POR VERIFICAR]` Los documentos que `AGENTS.md` referencia sin sufijo
   continúan almacenados localmente como `CONTEXTO-MAESTRO (1).md`,
   `CONTRATO-CALCULADORA-WHATSAPP (1).md` y
   `PLAN-DE-IMPLEMENTACION (1).md`.

**Rollback exacto**

- Antes de revertir, guardar un patch del trabajo y comprobar nuevamente
  `git status`; no usar `git reset --hard` ni restaurar `CLAUDE.md`,
  `AGENTS.md`, `README-INSTALACION.md` o el resto de `docs/ari/`, porque
  contienen cambios previos/bitácora ajenos al rollback funcional.
- Revertir únicamente los hunks de esta integración en `package.json`,
  `src/lib/calculadora-airbnb.ts`,
  `src/app/api/recursos/informe-airbnb/route.ts`,
  `src/components/recursos/InformeAirbnb.tsx` y
  `src/components/recursos/CalculadoraAirbnb.tsx` hasta el contenido de
  `d6586947207140e8a458a26c86f95f00597d7071`.
- Retirar únicamente los archivos nuevos
  `src/lib/calculadora-airbnb-whatsapp.ts` y
  `tests/calculadora-airbnb-whatsapp.test.mjs`. Conservar esta bitácora como
  evidencia histórica. `package-lock.json` no necesita reversión.
- Si posteriormente existiera un deploy, promover la última versión conocida
  anterior y verificar calculadora → CRM → correo antes de retirar la versión
  fallida. Maze/Meta no forman parte de este rollback.

**Estado separado**

- **Implementado:** helper puro, validación de escenario/consentimiento,
  snapshot servidor, inspección de Resend, URL en respuesta, éxito parcial,
  botón persistente y reset de escenario en presets, todo en el árbol local.
- **Probado:** pruebas puras 9/9, TypeScript, build de producción, árbol de
  dependencias, lockfile y whitespace. Integraciones externas y navegador
  siguen sin probarse.
- **Desplegado:** no. No se hizo commit ni deploy.

**Próximo paso verificable**

Resolver o aceptar explícitamente el bloqueo de lint y autorizar una validación
manual controlada de la URL en WhatsApp móvil/web. Después, ejecutar al menos
un recorrido de navegador con servicios simulados para éxito total, fallo de
correo y fallo de CRM; si pasa, repetir la revisión del diff y recién entonces
solicitar deploy de producción.

## 2026-09-21 — Codex / diagnóstico de Resend y cierre documental de la prueba local

**Objetivo**

Documentar la incidencia observada al probar calculadora → CRM → correo →
WhatsApp, la causa indicada por Resend, la alternativa de prueba local y el
resultado comunicado por Sebas. Esta entrada no cambia funcionalidad ni
interpreta una prueba local como despliegue o entrega en producción.

**Archivos inspeccionados**

- `AGENTS.md`, `CLAUDE.md`, `docs/ari/DECISIONES-Y-VERIFICACIONES.md` y
  `docs/ari/ANTECEDENTE-ESTRATEGICO.md`.
- `docs/ari/CONTEXTO-MAESTRO (1).md`,
  `docs/ari/CONTRATO-CALCULADORA-WHATSAPP (1).md` y
  `docs/ari/PLAN-DE-IMPLEMENTACION (1).md`. Las rutas sin ` (1)` citadas en
  `AGENTS.md` y `CLAUDE.md` no existen en este árbol local; no se renombraron.
- `src/app/api/recursos/informe-airbnb/route.ts`, `src/lib/correo.ts`,
  `src/components/recursos/InformeAirbnb.tsx`, `src/lib/secuencias.ts`,
  `src/app/api/secuencias/tick/route.ts`, `.env.example` y `package.json`.
- Se revisaron el estado de Git y las capturas/mensajes facilitados por Sebas.
  No se copiaron valores de `.env.local` ni claves a esta bitácora.

**Cronología y evidencia**

1. `[VERIFICADO-UI]` Una captura local mostró el POST a
   `/api/recursos/informe-airbnb` con HTTP 500 y el formulario con «No se pudo
   registrar la solicitud. Intentá de nuevo». Esa captura no contiene la causa
   del 500; no atribuirlo a Resend. En el código, un fallo de `altaContacto`
   llega al `catch` externo y puede producir ese estado antes del intento de
   correo y antes de ofrecer WhatsApp.
2. `[VERIFICADO-UI]` En una prueba posterior, la página mostró «Solicitud
   registrada», avisó que no pudo enviar el correo y ofreció «Continuar por
   WhatsApp». La captura de WhatsApp mostró el mensaje precargado hacia
   `+506 6441 7867`, con nombre, marca `[ARI:CALCULADORA_AIRBNB]`, origen,
   escenario y secciones financieras. La captura muestra un mensaje enviado
   manualmente en WhatsApp; no demuestra recepción en Maze ni respuesta de Ari.
3. `[REPORTADO-USUARIO]` Sebas aportó el log del servidor: Resend devolvió
   `statusCode: 403`, `name: validation_error` y el mensaje «The
   tonyalvarado.com domain is not verified». Es evidencia del rechazo del
   proveedor para esa solicitud; no se inspeccionó la cuenta de Resend ni se
   verificó la entrega de producción. El diagnóstico es que la cuenta asociada
   a la clave usada localmente no tenía autorizado el dominio del remitente
   de esa solicitud. No implica necesariamente que el DNS del dominio de Tony
   esté sin configurar ni que el CRM haya fallado.
4. `[VERIFICADO-CODIGO]` En `route.ts`, `to: correo` toma el destinatario del
   formulario; cambiar solo ese correo no resuelve el 403 del remitente.
   `from: REMITENTE_CON_NOMBRE` viene de `src/lib/correo.ts`, cuyo remitente
   oficial es `office@tonyalvarado.com`. `CONTACT_FROM_EMAIL` solo lo
   reemplaza automáticamente si el dominio pertenece a la lista permitida;
   para otro dominio exige el valor explícito `CONTACT_FROM_FORZAR=si`.
5. `[VERIFICADO-CODIGO]` Cuando Resend devuelve `error`, el endpoint registra
   el rechazo, deja `correoEnviado: false` y no intenta registrar la actividad
   `email` de informe enviado. Como `altaContacto` ya se completó, responde
   `ok: true` y conserva `whatsappUrl`. `InformeAirbnb.tsx` muestra el aviso
   de fallo parcial y el enlace persistente. Un `correoEnviado: true` confirma
   que Resend no devolvió error inmediato, no por sí solo la entrega final al
   buzón; la recepción necesita comprobarse aparte.
6. `[ACORDADO]` Para pruebas locales se puede usar una clave de una cuenta
   propia de Resend, `CONTACT_FROM_EMAIL=onboarding@resend.dev` y
   `CONTACT_FROM_FORZAR=si` **solo en `.env.local`**, con el destinatario de
   prueba admitido por esa cuenta; o un remitente de un dominio propio
   verificado allí. Se debe reiniciar el servidor tras cambiar variables.
   Esta fue una alternativa propuesta, no una afirmación sobre la
   configuración exacta que Sebas terminó utilizando. No registrar claves,
   copiarlas al repositorio ni activar la anulación en producción.
7. `[REPORTADO-USUARIO]` Sebas confirmó después: «Ya funciona bien». Se
   registra como confirmación de su prueba local de correo/flujo, no como
   verificación independiente de buzón, actividad CRM, Resend de Tony,
   producción, Maze o automatizaciones. La configuración privada exacta con
   la que lo consiguió no fue aportada ni inspeccionada.
8. `[VERIFICADO-CODIGO]` `.env.example` todavía dice que se puede usar
   `onboarding@resend.dev` en `CONTACT_FROM_EMAIL` mientras no se verifique
   el dominio, pero omite el requisito actual de `CONTACT_FROM_FORZAR=si`
   impuesto por `src/lib/correo.ts`. Es documentación desactualizada y puede
   reproducir el 403 en una instalación nueva. No se modificó en esta sesión
   porque el alcance pedido fue documentar en esta bitácora.

**Consultas accesorias de la misma prueba**

- `[REPORTADO-USUARIO]` PowerShell no reconoció `openssl rand -hex 32` en
  ese equipo. Esto indica que `openssl` no estaba disponible como comando
  allí; no explica el rechazo 403 de Resend ni se instaló software para
  resolverlo.
- `[VERIFICADO-CODIGO]` `SECUENCIAS_ACTIVAS` es un interruptor independiente
  del informe transaccional: `src/lib/secuencias.ts` solo devuelve `true` si
  vale exactamente `si`; el endpoint de secuencias también exige la
  automatización activa y otros frenos. No hace falta activarlo para enviar
  el informe de la calculadora y no se activó en esta sesión.

**Cambios y comandos de esta sesión**

- Se modificó únicamente esta bitácora. No se cambió código funcional,
  `.env.local`, `.env.example`, dependencias, CRM, fórmulas, diseño, Meta,
  Maze ni `ari-bot`; no hubo commit ni despliegue.
- `[VERIFICADO-PRUEBA]` `git status --short` mostró que el árbol ya tenía
  cambios funcionales y documentos sin seguimiento al iniciar esta sesión;
  se preservaron. `rg` y `Get-Content` confirmaron las rutas y el flujo
  descritos arriba. `npm run test:whatsapp` terminó con 9 pruebas aprobadas,
  0 fallidas; persiste la advertencia no bloqueante
  `MODULE_TYPELESS_PACKAGE_JSON`.

**Estado separado y pendientes**

- **Implementado en el árbol local:** calculadora, guardado CRM, intento de
  correo, detección de fallo de Resend y continuación a WhatsApp tras éxito
  del CRM. No se cambió la implementación en esta sesión.
- **Probado:** pruebas puras de WhatsApp 9/9 en esta sesión; el correo y el
  recorrido local fueron confirmados por Sebas, no repetidos mediante una
  prueba independiente por este agente. El envío de WhatsApp requiere el
  gesto manual del visitante.
- **Desplegado:** no demostrado. No se hizo deploy ni commit en esta sesión.
- **Pendiente:** confirmar en la cuenta responsable de producción que el
  dominio/remitente de Tony está verificado para la clave allí configurada;
  comprobar entrega final y actividad CRM en un entorno autorizado; validar
  WhatsApp móvil y web, estado de Maze/Ari, flujo negativo, idempotencia y
  lint. No usar contactos reales sin autorización. Corregir la discrepancia
  de `.env.example` y los nombres de documentos en una tarea documental
  acordada; no encender `SECUENCIAS_ACTIVAS` como supuesto arreglo del correo.

**Próximo paso verificable**

Con un entorno de prueba autorizado y datos ficticios, registrar evidencia
separada de contacto CRM, informe recibido en buzón, actividad `email`, enlace
WhatsApp abierto y mensaje enviado. Solo después solicitar revisión del diff
y autorización expresa para el despliegue; Maze/Ari siguen siendo otra etapa.

## 2026-09-21 — Codex / incorporación de commits de Tony y resolución del formulario

**Objetivo**

Incorporar los commits nuevos de `origin/main` a la rama de trabajo ARI sin
perder los cambios locales, resolver los cruces de calculadora/formulario y
conservar la continuación a WhatsApp tanto desde el formulario normal como
desde la nueva ventana de rescate. Sin commit ni despliegue.

**Archivos inspeccionados**

- `AGENTS.md`, esta bitácora y los documentos ARI ya leídos para el flujo.
- Historial y diff de `HEAD..origin/main`; código actualizado de
  `src/components/recursos/CalculadoraAirbnb.tsx`,
  `src/components/recursos/InformeAirbnb.tsx` y
  `src/components/recursos/RescateDeSalida.tsx`.
- Cambios entrantes de `src/lib/crm.ts`, `src/lib/correo.ts`,
  `src/lib/secuencias.ts` y `src/app/api/secuencias/tick/route.ts`; contrato
  local de `src/app/api/recursos/informe-airbnb/route.ts` y
  `src/lib/calculadora-airbnb-whatsapp.ts`.

**Hallazgos y decisiones verificadas**

- `[VERIFICADO-CODIGO]` Tras `git fetch`, `origin/main` estaba en `5f90fac`
  y la rama local en `d658694`, 33 commits atrás. El rango entrante cambió
  75 rutas; Tony modificó ambos componentes de la calculadora, pero no el
  endpoint `informe-airbnb` ni las fórmulas en `calculadora-airbnb.ts`.
- `[VERIFICADO-CODIGO]` La rama se avanzó por fast-forward a `5f90fac` sin
  crear un commit nuevo. Luego se reaplicó el trabajo local. Hubo dos
  conflictos de contenido reales, solo en `CalculadoraAirbnb.tsx` y
  `InformeAirbnb.tsx`; se resolvieron preservando los cambios de Tony y el
  contrato ARI. `git ls-files -u` quedó vacío y `HEAD...origin/main` quedó
  en `0 0` al terminar la resolución.
- `[VERIFICADO-CODIGO]` Tony añadió `RescateDeSalida`, que monta una segunda
  instancia de `InformeAirbnb` dentro de una ventana. El callback entrante
  cerraba la ventana al confirmar el registro; con nuestra confirmación de
  WhatsApp eso desmontaba el botón antes de que el visitante pudiera usarlo.
  Ahora el registro desbloquea el análisis sin cerrar la ventana: la
  confirmación, el aviso de correo fallido y «Continuar por WhatsApp» quedan
  visibles. «Ver el análisis extendido» cierra la ventana mediante
  `alVerAnalisis` y navega a `#informe-completo`.
- `[VERIFICADO-CODIGO]` La ventana usa el tipo cerrado
  `EscenarioAirbnb`, compatible con el formulario validado. Los presets
  rápidos conservan el reinicio de escenario a `base` y ahora también marcan
  `haCalculado`, requisito de la ventana de Tony. Cambiar escenario, editar un
  campo y cargar Bike & Bed mantienen el mismo indicador.
- `[VERIFICADO-CODIGO]` Los cambios de Tony en `correo.ts` añaden un destino
  predeterminado para otros formularios; no alteran el `to: correo` del
  informe Airbnb. `crm.ts` amplía la unión de fuentes con `masterclass`;
  nuestro informe conserva `recurso_gratis` y el tag existente.
- `[VERIFICADO-CODIGO]` La explicación del 21/9 anterior sobre
  `SECUENCIAS_ACTIVAS` describía la rama **antes** de incorporar estos
  commits. En el `main` ahora integrado, el interruptor general de envíos
  automáticos se consulta de forma asíncrona en `cta_ajustes` del CRM mediante
  `secuenciasActivas()`; ya no depende de `SECUENCIAS_ACTIVAS=si`. Este cambio
  no activa ni sustituye el correo transaccional del informe Airbnb.

**Cambios de esta integración**

- `src/components/recursos/CalculadoraAirbnb.tsx`: se combinaron tipos de
  escenario, carga de presets y `haCalculado` con la ventana de Tony.
- `src/components/recursos/InformeAirbnb.tsx`: se conservaron el estilo
  actualizado y el modo `desnudo`; se integraron la respuesta con
  `correoEnviado`/`whatsappUrl`, el consentimiento y el callback opcional para
  salir hacia el análisis extendido.
- `src/components/recursos/RescateDeSalida.tsx`: escenario tipado y
  confirmación persistente en la ventana; cierre al elegir el análisis.
- Esta bitácora: registro de base, conflictos, decisión y pruebas. No se
  editaron por cuenta de esta resolución las fórmulas, CRM, correo,
  secuencias, esquema, Meta, Maze ni bot; el fast-forward sí incorporó los
  cambios de Tony en CRM, correo y secuencias descritos arriba.
- Los cambios de trabajo previos quedaron conservados; `stash@{0}` sigue
  disponible como respaldo del estado **anterior** a la incorporación de
  `origin/main`. No aplicar ese stash otra vez sobre el árbol ya restaurado
  porque duplicaría cambios.

**Comandos y resultados**

- `[VERIFICADO-PRUEBA]` `git fetch origin`, `git stash push --include-untracked`,
  `git merge --ff-only origin/main` y `git stash apply 'stash@{0}'`: avance
  sin commit, recuperación de trabajo y resolución de dos conflictos.
- `[VERIFICADO-PRUEBA]` `npm run test:whatsapp`: 9/9 aprobadas; permanece la
  advertencia no bloqueante `MODULE_TYPELESS_PACKAGE_JSON`.
- `[VERIFICADO-PRUEBA]` `npx tsc --noEmit`: salida 0, sin diagnósticos.
- `[VERIFICADO-PRUEBA]` `npm run build`: salida 0, compilación y chequeo de
  tipos correctos, 67/67 páginas generadas. La configuración local de
  remitente de pruebas produjo advertencias conocidas durante el build; no
  se enviaron correos por este comando.
- `npm run lint` no se ejecutó: la bitácora previa registra que el script
  `next lint` abre una configuración interactiva sin política ESLint acordada.

**No probado y riesgos vigentes**

- No se ejecutó aún una prueba automatizada o manual en navegador del
  formulario de la ventana de rescate: éxito total, fallo parcial de correo,
  navegación al análisis, cierre y nueva visita. El comportamiento anterior
  se verificó por código, TypeScript y build, no por interacción real.
- No se probaron CRM, Resend, WhatsApp móvil/web, Maze, Ari ni producción
  contra servicios externos en esta integración. No se usaron leads reales.
- Dos instancias independientes del formulario (normal y rescate) no
  comparten campos escritos antes de enviar; es comportamiento introducido
  por la ventana de Tony, no resuelto en este alcance. Al cerrar la ventana
  tras un éxito, el enlace de WhatsApp deja de estar visible en ella; mientras
  permanece abierta, la confirmación y el enlace son persistentes.
- Siguen pendientes lint reproducible, idempotencia integral y la corrección
  documental de `.env.example` y las rutas con sufijo ` (1)`.

**Estado separado y siguiente paso**

- **Implementado localmente:** commits de Tony incorporados y flujo ARI
  reconciliado en ambos puntos de entrada al formulario.
- **Probado:** tipos, serializador y build; no se afirma validación E2E de UI.
- **Desplegado:** no demostrado. Esta sesión no hizo commit ni deploy.
- **Siguiente paso verificable:** probar en navegador con datos ficticios el
  formulario normal y el de rescate, incluyendo correo aceptado/rechazado y
  botón de WhatsApp; después revisar el diff y pedir autorización para
  cualquier commit o despliegue.

## 2026-09-21 — Codex / segunda revisión remota y preparación del commit

**Objetivo**

Comprobar si Tony publicó más cambios después de la incorporación anterior y
revalidar el árbol local antes de preparar un commit, sin crear commit ni
desplegar.

**Archivos y estado inspeccionados**

- `git status`, `git log`, `git ls-remote`, referencias remotas, diff local,
  `package.json` y presencia de configuración ESLint.
- `src/app/api/recursos/informe-airbnb/route.ts`, componentes de calculadora,
  formulario y rescate, helper y pruebas de WhatsApp como conjunto de cambios
  de esta integración. `AGENTS.md`, `CLAUDE.md`, `README-INSTALACION.md` y el
  resto de `docs/ari/` permanecen como cambios/documentos preexistentes del
  árbol local y no se incluyeron automáticamente en un commit.

**Hallazgos**

- `[VERIFICADO-PRUEBA]` `git fetch origin` no recibió referencias nuevas.
  `git ls-remote origin refs/heads/main` y la referencia local confirmaron
  `5f90facb12001b2433009967ad9178daba240f57` en `main`; la divergencia
  `HEAD...origin/main` es `0 0`.
- `[VERIFICADO-PRUEBA]` `git branch -r --no-merged origin/main` no encontró
  ramas remotas visibles con commits pendientes de integrar. No hubo nuevos
  cambios de Tony que adaptar en esta revisión.
- `[VERIFICADO-CODIGO]` El trabajo ARI continúa sin commit en la rama local:
  ruta del informe, calculadora, formulario, rescate, tipo/guard de escenario,
  helper, script de pruebas y bitácora. `CLAUDE.md`, `AGENTS.md`,
  `README-INSTALACION.md` y otros documentos ARI también están modificados o
  sin seguimiento; no usar `git add -A` sin revisar el alcance del commit.
- `[VERIFICADO-PRUEBA]` `.env.local` está excluido por `.gitignore`; no se
  imprimieron ni añadieron claves. El respaldo `stash@{0}` del estado anterior
  a la integración continúa disponible; no se reaplicó.

**Pruebas de esta revisión**

- `[VERIFICADO-PRUEBA]` `npm run test:whatsapp`: 9 aprobadas, 0 fallidas;
  advertencia conocida `MODULE_TYPELESS_PACKAGE_JSON`.
- `[VERIFICADO-PRUEBA]` `npx tsc --noEmit`: salida 0.
- `[VERIFICADO-PRUEBA]` `npm run build`: salida 0, 67/67 páginas generadas.
  El build leyó la configuración local de remitente de prueba y emitió la
  advertencia conocida de `CONTACT_FROM_FORZAR=si`; no envió correos.
- `[VERIFICADO-PRUEBA]` `git diff --check`: salida 0; solo avisos de
  conversión futura LF/CRLF. No existe configuración ESLint en el repo;
  `npm run lint` continúa siendo el script interactivo ya documentado y no
  se ejecutó en esta revisión.

**Cambios, estado y siguiente paso**

- Esta sesión solo añadió esta entrada documental. No modificó código
  funcional, fórmulas, CRM, correo, dependencias, Meta, Maze ni bot; no hizo
  commit ni despliegue.
- **Implementado localmente:** integración ARI reconciliada con el `main`
  actual. **Probado:** serializador, tipos y build. **No probado:** E2E de
  ambos formularios en navegador, servicios externos y producción.
- Para el commit propuesto, seleccionar de forma explícita los archivos de
  la funcionalidad ARI y la bitácora; decidir aparte si se versionan los
  documentos de contexto preexistentes. Antes del deploy, ejecutar la prueba
  manual de formulario normal/rescate y comprobar correo, CRM y WhatsApp en
  un entorno autorizado con datos ficticios.
