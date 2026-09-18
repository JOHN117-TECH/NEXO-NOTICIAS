# Organización de componentes

Cada archivo TSX declara un único componente. Las páginas de `app/` componen la interfaz y conservan únicamente el estado que coordina sus controles.

## Imports mediante barriles

Los imports entre carpetas utilizan las exportaciones explícitas de sus archivos `index.ts`:

```tsx
import { Header, NewsCard, NewsStatus } from "@/components";
import { useI18n, useNews } from "@/hooks";
import { NewsContext } from "@/contexts";
import { categories, type News } from "@/lib";
```

También existen barriles en `@/locales` y `@/assets/svg`. Al agregar un módulo público, añadir su exportación al barril correspondiente; los tipos se reexportan con `export type`.

Dentro de una misma carpeta se mantienen imports directos entre archivos hermanos (por ejemplo, `News-card.tsx` importa `./NewsImage`). Importar desde el propio barril crearía dependencias circulares. Los CSS se importan directamente para conservar su orden de carga. Los archivos especiales de `app/` y las páginas que reutilizan otras rutas conservan las convenciones de Next.js.

Los barriles no agregan `"use client"`: cada módulo conserva su propia frontera de cliente. `@/lib` contiene utilidades y tipos compartidos, sin reexportar componentes, hooks ni contextos.

- `News-card.tsx`: tarjeta de noticia; utiliza `NewsImage`, `FavoriteButton` y los estilos de tarjeta.
- `NewsImage.tsx`: imagen o marcador de posición, con variantes para inicio y detalle.
- `FavoriteButton.tsx`: icono, estado y acción de añadir o quitar favoritos.
- `NewsStatus.tsx`: carga, errores y reintento de noticias.
- `NewsFilters.tsx`: categorías y cantidad de noticias por página.
- `NewsPagination.tsx`: navegación entre páginas.
- `News-manager.tsx`: composición del administrador. Comparte el estado de operación y los mensajes entre creación y eliminación para evitar acciones simultáneas.
- `AdminKeyField.tsx`: campo de clave y ayuda accesible.
- `CreateNewsForm.tsx`: validación del formulario, envío y reinicio después de crear.
- `DeleteNewsPanel.tsx`: selección, confirmaciones y eliminación individual o múltiple.
- `ImageField.tsx`: selección por URL o archivo, validación y vista previa.
- `ContactForm.tsx`: formulario de contacto y envío de mensajes.
- `Header.tsx`, `Footer.tsx`: navegación y pie de página.
- `Providers.tsx`: estado compartido de noticias y favoritos.

La persistencia de la clave está en `hooks/useAdminKey.ts`. El acceso al contexto está en `hooks/useNews.ts` y su definición en `contexts/NewsContext.ts`. La lectura de archivos de imagen está en `lib/readImage.ts`; los tipos compartidos de administración están en `lib/newsManagement.ts`.

Los estilos específicos acompañan a su componente en un archivo `.module.css`. Los formularios y controles que comparten apariencia utilizan los módulos de `components/ui/`. Los ajustes responsive permanecen junto al componente al que pertenecen.
