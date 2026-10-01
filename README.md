# Medical Portal

Medical Portal, también mostrado en la interfaz como **MedSync Pro** y
**Salud Conecta**, es un portal médico desarrollado con Next.js. Su objetivo es
practicar una experiencia diferenciada para pacientes y profesionales médicos:
gestión de citas, consulta de pacientes y expedientes clínicos.

El proyecto es una demo funcional con datos mock. No incluye todavía una base
de datos ni un backend de negocio conectado a una API externa.

## Objetivos del proyecto

- Construir una aplicación médica con rutas públicas y privadas.
- Practicar autenticación con credenciales y autorización basada en roles.
- Separar la experiencia de pacientes y médicos.
- Aplicar validación, saneamiento, estados de carga y manejo de errores.
- Explorar streaming, caché en el cliente, persistencia local y accesibilidad.

## Demo y enlaces importantes

No hay una URL de demo pública declarada en el repositorio. Para revisar la
aplicación hay que ejecutarla localmente. La página inicial está en `/` y el
acceso en `/login`.

## Funcionalidades públicas

- Página de inicio con hero, información del portal, servicios, artículos,
	métricas y un vídeo de instrucciones para solicitar citas.
- Métricas públicas calculadas a partir de los datos mock.
- Enlaces de navegación y acciones de acceso según el estado de la sesión.
- Panel de accesibilidad cargado desde el layout raíz.
- Cabeceras HTTP de seguridad configuradas en `next.config.ts`.

## Funcionalidades privadas

Después de autenticarse, el usuario llega a `/dashboard`. La interfaz cambia
según el rol incluido en la sesión JWT:

- **Paciente:** consultar sus citas, solicitar nuevas citas y consultar sus
	expedientes médicos. Puede descargar un expediente en PDF.
- **Médico:** consultar y gestionar citas de pacientes, buscar pacientes con
	filtros y paginación, y crear expedientes médicos mediante un formulario por
	pasos.
- **Administrador:** el mapa de roles contempla el rol `admin`, aunque no hay
	un panel de administración independiente implementado.

Los datos de citas y expedientes se guardan en `localStorage` mediante Zustand.
Por tanto, los cambios son locales al navegador y no representan persistencia
en un servidor.

## Arquitectura general

La aplicación usa App Router de Next.js. Las páginas actúan principalmente
como composición y las interacciones viven en componentes Client Components.
Los Server Components son el comportamiento por defecto de las páginas que no
declaran `"use client"`; permiten renderizar en el servidor. No se encontraron
Server Actions (`"use server"`) en el código.

```mermaid
flowchart TD
		Browser[Navegador] --> Public[Paginas publicas]
		Browser --> Login[Login]
		Login --> NextAuth[NextAuth\n/api/auth/[...nextauth]]
		NextAuth --> MockUsers[mockUsers.ts]
		Browser --> Proxy[proxy.ts\nJWT y RBAC]
		Proxy --> Dashboard[Dashboard por rol]
		Dashboard --> ReactQuery[React Query\ncaché y prefetch]
		ReactQuery --> PatientService[patient.service.ts\nmock + latencia simulada]
		Dashboard --> Zustand[Zustand + localStorage]
		Zustand --> Appointments[Citas]
		Zustand --> Records[Expedientes]
```

## Flujo de datos

1. NextAuth valida email y contraseña contra `src/data/mockUsers.ts`.
2. La sesión usa estrategia `jwt` y conserva el identificador, nombre, email y
	 rol del usuario en el token.
3. `proxy.ts` deja pasar rutas públicas y protege el dashboard. Si no hay
	 sesión redirige a `/login`; si el rol no tiene permiso redirige a
	 `/acceso-denegado`.
4. La búsqueda de pacientes pasa por React Query. El servicio filtra,
	 ordena, pagina y valida la respuesta con Zod; también simula 500 ms de
	 latencia y admite cancelación mediante `AbortSignal`.
5. React Query mantiene las consultas frescas durante cinco minutos y precarga
	 la página siguiente cuando procede. React Query es una herramienta de
	 caché y sincronización de datos asíncronos en el cliente.
6. Citas y expedientes usan stores de Zustand. Sus operaciones incluyen crear,
	 actualizar y eliminar datos, es decir, un CRUD local, no un CRUD contra una
	 API real.

## Stack tecnológico

- **Next.js 16.2.5:** framework React con App Router, renderizado en servidor,
	rutas y optimización de recursos.
- **React 19.2.4 y TypeScript:** componentes y tipado estático.
- **Tailwind CSS 4:** estilos mediante clases y PostCSS.
- **NextAuth 4:** autenticación con Credentials Provider y sesiones JWT.
	JWT es un token firmado que transporta datos de sesión; aquí se usa para
	identificar al usuario y su rol.
- **`jose`:** helper disponible para verificar tokens JWT en servidor.
- **Zod:** validación y saneamiento de filtros, citas, pacientes y expedientes.
- **Zustand:** estado global local con persistencia en `localStorage`.
- **TanStack React Query:** caché, reintentos, cancelación y prefetching de
	consultas.
- **`jspdf`:** generación del PDF de un expediente en el navegador.
- **`isomorphic-dompurify`:** dependencia preparada para saneamiento de texto.
- **`sonner` y `react-error-boundary`:** notificaciones y límites de error.
- **ESLint:** revisión estática con las reglas de Next.js Core Web Vitals y
	TypeScript.
- **Lighthouse CI:** configuración de auditorías de rendimiento, accesibilidad,
	buenas prácticas y SEO.

## Estructura de carpetas

```text
src/
	app/                 Rutas del App Router y API de NextAuth
	components/         Componentes de UI, auth, home y dashboard
	config/              Reglas de acceso y rutas por rol
	data/                Datos mock de usuarios, pacientes, médicos y citas
	hooks/               Hooks de debounce, búsqueda y pacientes
	lib/                 JWT, seguridad, validaciones y generación de PDF
	providers/           SessionProvider, React Query y providers de UI
	services/            Lecturas simuladas de métricas y pacientes
	store/               Stores Zustand para citas y expedientes
	types/               Tipos de dominio y extensiones de NextAuth
public/                Imágenes, vídeo, robots.txt y otros recursos públicos
proxy.ts               Protección de rutas y autorización RBAC
next.config.ts         Configuración de Next.js, imágenes y headers
eslint.config.mjs      Configuración de ESLint
lighthouserc.js        Umbrales y ejecución de Lighthouse CI
```

## Rutas principales

| Ruta | Acceso | Propósito |
| --- | --- | --- |
| `/` | Público | Página de inicio y contenido informativo |
| `/login` | Público | Inicio de sesión |
| `/acceso-denegado` | Público | Respuesta para usuarios sin permiso |
| `/dashboard` | Autenticado | Panel principal según el rol |
| `/dashboard/appointments` | Autenticado | Citas del paciente o del médico |
| `/dashboard/patients` | Médico | Pacientes y expedientes |
| `/dashboard/request` | Paciente | Solicitud de cita |
| `/dashboard/records` | Paciente | Consulta y descarga de expedientes |
| `/api/auth/[...nextauth]` | Auth | Endpoints GET/POST internos de NextAuth |

El control de acceso se define en `src/config/routes.ts` y se aplica en
`proxy.ts`, además de comprobaciones de rol dentro de algunas páginas cliente.

## Backend y contrato de endpoints

El único endpoint del proyecto es `/api/auth/[...nextauth]`, que delega en
NextAuth los métodos GET y POST necesarios para la sesión. No existe una API
propia para pacientes, citas o expedientes.

En consecuencia, `src/services/patient.service.ts` no hace una petición HTTP:
lee `mockPatients` en memoria, aplica filtros y devuelve una respuesta con esta
forma validada por Zod:

```ts
{
	data: Patient[],
	metadata: {
		total: number,
		page: number,
		limit: number,
		totalPages: number
	}
}
```

## Variables de entorno

El código lee estas variables en servidor:

```env
# Secreto recomendado para firmar la sesión de NextAuth
NEXTAUTH_SECRET=pon-aqui-un-secreto-local-largo

# Alternativa usada por la verificación JWT propia
JWT_SECRET_KEY=pon-aqui-otra-clave-segura
```

`NEXTAUTH_SECRET` tiene prioridad en `auth.ts` y `proxy.ts`; `JWT_SECRET_KEY`
actúa como alternativa. En desarrollo existe un valor predeterminado en el
código, pero no debe usarse en un despliegue real. No se deben subir archivos
`.env*` con valores reales al repositorio. NextAuth también puede advertir si no
se define `NEXTAUTH_URL` en ciertos entornos, aunque la aplicación no la lee
directamente en su código fuente.

## Instalación local

Requisitos: Node.js 24, indicado por `.nvmrc`, y npm.

```bash
git clone <url-del-repositorio>
cd medical-portal
nvm use
npm install
```

Crea un archivo `.env.local` si quieres configurar secretos locales:

```env
NEXTAUTH_SECRET=secreto-ficticio-para-desarrollo
JWT_SECRET_KEY=otra-clave-ficticia-para-desarrollo
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Abre `http://localhost:3000`. Para una ejecución de producción local:

```bash
npm run build
npm run start
```

## Scripts disponibles

| Comando | Uso |
| --- | --- |
| `npm run dev` | Inicia Next.js en desarrollo |
| `npm run build` | Genera la build de producción |
| `npm run start` | Sirve la build generada |
| `npm run lint` | Ejecuta ESLint |
| `npm run analyze` | Ejecuta una build Webpack con Bundle Analyzer activado |

## Pruebas actuales

No hay tests automatizados ni dependencias de Jest, Vitest, Playwright o Cypress
declaradas en `package.json`. La comprobación disponible es `npm run lint` y la
validación de compilación con `npm run build`.

## Decisiones técnicas que estoy aprendiendo

- **Server Components y Client Components:** mantener en servidor la
	composición que no necesita estado y marcar con `"use client"` las vistas que
	usan sesión, eventos, stores o hooks del navegador.
- **Streaming y `Suspense`:** las páginas de inicio, login y dashboard tienen
	secciones de carga para mostrar una respuesta progresiva.
- **RBAC:** el control de acceso basado en roles decide qué rutas puede abrir
	cada usuario.
- **Caché y resiliencia:** React Query usa `staleTime`, reintentos y backoff;
	las mutaciones no se reintentan para evitar duplicar operaciones.
- **Actualización optimista:** el estado de una cita cambia inmediatamente y
	puede restaurarse si la operación simulada falla.
- **Validación en los límites:** Zod normaliza filtros y limita el contenido de
	expedientes antes de incorporarlo al estado.
- **Seguridad del navegador:** se configuran headers contra clickjacking,
	MIME sniffing y permisos innecesarios.

## CI/CD y calidad del código

No hay workflows de GitHub Actions ni otra configuración de CI/CD en el
repositorio. `.github/CODEOWNERS` es el único archivo de esa carpeta.

Sí existe `lighthouserc.js`, preparado para ejecutar `lhci autorun` contra
`npm run start`, con tres ejecuciones y umbrales del 95 % para rendimiento,
accesibilidad, buenas prácticas y SEO. No hay un script npm que lo invoque.

El proyecto usa ESLint 9 con `eslint-config-next`; no incluye Prettier ni una
configuración de formateo dedicada. Tailwind CSS se integra mediante
`postcss.config.mjs`.

## Áreas de mejora

- Sustituir datos mock y `localStorage` por una API y una base de datos reales.
- Hashear contraseñas y eliminar credenciales planas del mock antes de un uso
	real.
- Definir una política de secretos sin fallback hardcodeado para producción.
- Añadir tests unitarios, de integración y de navegación crítica.
- Añadir un workflow de CI que ejecute lint, build y Lighthouse.
- Añadir una estrategia de despliegue documentada y variables de entorno por
	entorno.
- Revisar la ruta de recuperación de contraseña, declarada como pública en la
	configuración, porque no existe una página correspondiente en `src/app`.
- Conectar el registro de errores a un servicio real; el propio código deja
	pendiente evaluar DataDog o Sentry.

## Objetivo profesional y de aprendizaje

Este proyecto sirve como pieza de portfolio para demostrar fundamentos de
frontend full-stack con Next.js: composición con App Router, autenticación,
autorización por roles, formularios, validación, caché, manejo de estado,
accesibilidad y optimización web. Su siguiente salto profesional es convertir
la demo local en una aplicación con persistencia, pruebas y despliegue
automatizado.
