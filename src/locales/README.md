# Idiomas

La interfaz utiliza `hooks/useI18n.ts`: `t(texto)` devuelve el texto español o su traducción inglesa. `LanguageProvider` guarda ES/EN en `localStorage` y actualiza el atributo `lang` del documento. El idioma se determina por la ruta. El cambio navega a la ruta equivalente y no modifica las noticias originales.

- `en.json`: traducciones de la interfaz, avisos y accesibilidad. El texto español es la clave y el idioma predeterminado.
- `articles.en.json`: traducciones de títulos, resúmenes y párrafos de las noticias de ejemplo. Los textos desconocidos conservan su idioma original; no se envían a servicios externos.
- Los parámetros se escriben como `{count}` y se pasan como segundo argumento a `t`.
- Al agregar o modificar una noticia, añade su traducción al catálogo de artículos para ofrecer su contenido en inglés.
- Las categorías enviadas a la API siempre conservan su valor original en español; solo se traduce la etiqueta visible.

Pruebas: `node --test tests/i18n.test.cjs`.

## Rutas

Español: `/`, `/noticias`, `/noticias/[id]`, `/favoritos`, `/contacto`.

Inglés: `/en`, `/news`, `/news/[id]`, `/favorites`, `/contact`.

`lib/localizedRoutes.ts` mantiene las equivalencias y conserva identificadores, consultas y enlaces a categorías. Los endpoints `/api/*` no se traducen.
