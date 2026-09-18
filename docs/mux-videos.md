# Videos Mux

El inicio `/` y `/en` consulta `GET /api/videos`. La sección aparece después de “¿Por qué utilizar Nexo Noticias?” y antes de la llamada a ver todas las noticias.

## Datos para los 10 videos

En Mux abre cada asset y copia el **Playback ID** de la pestaña **Playback and Thumbnails**, con política **public**. El ID mostrado en la lista de Assets es el Asset ID, no el Playback ID.

Completa `Backend/src/video-seed.ts`: título, descripción, categoría, Playback ID y duración como `"0:10"` (minutos:segundos) o segundos enteros; Asset ID es opcional. Los títulos y descripciones iniciales son ejemplos editables, no transcripciones de los videos. Las duraciones conocidas se tomaron de la captura y las restantes quedan en null.

No se requieren Token ID, Token Secret ni credenciales de Mux para reproducir videos públicos. Los videos signed necesitan una implementación adicional de tokens firmados en servidor; no poner secretos en frontend.

## Cargar la semilla manualmente

Desde Backend:

```sh
npm run seed
```

El comando crea la tabla `videos`, inserta las entradas con Playback ID y actualiza sus metadatos al ejecutarlo nuevamente, sin duplicarlas. Las entradas con ID vacío se omiten. La fecha de creación se asigna al insertarlas y se conserva en actualizaciones. No se inventan Playback IDs. El comando también conserva su función existente de semilla de noticias.

Al reiniciar el backend se crea la tabla si falta, pero los videos se insertan únicamente con el comando manual. Los registros `activo = false` no aparecen en el slider.

El reproductor es el iframe oficial de Mux (`player.mux.com`), con controles, pantalla completa y picture-in-picture. Las miniaturas provienen de `image.mux.com`. El modal se cierra con su botón, Escape o clic fuera; al cerrarse se desmonta el reproductor y se devuelve el foco a la tarjeta.
