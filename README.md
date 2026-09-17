# Nexo Noticias

Aplicación académica en español basada en los cinco mockups de Figma y los requisitos RF01–RF12 del PDF. Next.js 16, React, TypeScript y Tailwind CSS 4; API NestJS 12 y PostgreSQL 17 en Docker.

## Requisitos

Node.js 22 o superior, npm y Docker Desktop con el motor Linux iniciado. La base de datos se publica solo en `127.0.0.1:5433`; el backend usa 3001 y el frontend 3000.

## Ejecutar

En una terminal dentro de la carpeta hermana `Backend`:

```powershell
npm install
Copy-Item .env.example .env
# Cambiar ADMIN_API_KEY por una clave local propia.
docker compose up -d
npm run dev
```

En otra terminal en `Frontend`:

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Abrir http://127.0.0.1:3000. No sobrescribir los archivos `.env` existentes si ya están configurados. Se preparó una clave aleatoria en `Backend/.env` durante la implementación; no se guarda en Git.

## Las cinco rutas

| Ruta | Vista |
| --- | --- |
| `/` | Bienvenida, tres noticias principales y llamados a la acción |
| `/noticias` | Listado, filtros y mini CRUD desplegable |
| `/noticias/[id]` | Lectura completa y favoritos |
| `/favoritos` | Noticias guardadas y estado vacío condicional |
| `/contacto` | Formulario validado |

Categorías dirige al filtro del listado, sin agregar una sexta ruta. Los favoritos persisten por navegador en localStorage. Las noticias y los mensajes persisten en PostgreSQL. El formulario registra mensajes en la base de datos; no envía correos electrónicos.

## Mini CRUD

En Noticias, abrir **Administrar noticias** e introducir el valor de `ADMIN_API_KEY` de `Backend/.env`. Permite crear y eliminar; la eliminación exige una confirmación dentro de la interfaz. La clave se conserva en `sessionStorage` durante la sesión de la pestaña, incluso al recargar, y se valida en NestJS. Vaciar el campo elimina la clave guardada. Si el navegador bloquea el almacenamiento, se informa al usuario y la clave sigue funcionando en memoria. El servidor escucha únicamente en localhost. Para un despliegue público debe sustituirse esta clave compartida por autenticación de administradores.

## Diseño y requisitos

Paleta #172554, #2563EB, #FFFFFF, #F3F4F6 y #374151; fuente Arial. Se conservaron los espacios azules de imagen del prototipo. Las nuevas noticias admiten una URL de imagen real. El contenido inicial es de ejemplo académico, no información periodística verificada.

- RF01–RF04: tarjetas, representación visual, resumen y detalle.
- RF05–RF06: favoritos persistentes.
- RF07: portada.
- RF08–RF09: contacto con validación en cliente y servidor.
- RF10–RF11: creación y eliminación.
- RF12: encabezado y pie compartidos con navegación.

Diseño adaptable a móvil y navegación mediante teclado. Los estados alternativos dibujados juntos en el mockup de favoritos se muestran de forma excluyente. La gestión desplegable y los estados de carga/error son añadidos funcionales al prototipo.

## Verificación

```powershell
# Frontend
npm run build
npm run typecheck
# Backend
npm run build
npm test
```

Las pruebas de API necesitan el backend iniciado. Crean y eliminan una noticia de prueba y registran un mensaje de contacto con datos ficticios. Los datos persisten en el volumen `nexo_data`; `docker compose down` detiene la base sin eliminarlos.

## API

- GET `/api/health`
- GET `/api/noticias` y filtro opcional `?category=Tecnología`
- GET `/api/noticias/:id`
- POST `/api/noticias` (cabecera `X-Admin-Key`)
- DELETE `/api/noticias/:id` (cabecera `X-Admin-Key`)
- POST `/api/contacto`

Next.js conecta con NestJS mediante un rewrite; la clave nunca se incorpora al bundle del frontend. Consultas SQL parametrizadas, DTOs con límites y validación, UUIDs validados y seed aplicado solo una vez. La configuración local está excluida de Git.

### Eliminación múltiple

En Administrar noticias, la columna Eliminación de noticias permite seleccionar filas o marcar Seleccionar todas. La selección abarca todas las noticias de administración, independientemente del filtro y la paginación del listado superior. El botón Eliminar seleccionadas muestra la cantidad y solicita una única confirmación. Conserva la clave de administrador y la eliminación individual.

La petición DELETE /api/noticias recibe { ids: [...] } y la cabecera X-Admin-Key. El servidor valida los UUIDs y elimina únicamente esos identificadores en una sola operación SQL; devuelve la cantidad realmente eliminada. Las noticias que ya no existan se omiten.

La prueba Backend/test/bulk-delete.test.cjs usa una tabla temporal y revierte la transacción, sin modificar las noticias existentes. Ejecutarla desde Backend después de compilar: node --test test/bulk-delete.test.cjs.
