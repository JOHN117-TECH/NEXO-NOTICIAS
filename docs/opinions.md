# Opiniones

La sección está en el home en español e inglés, debajo de la llamada a ver todas las noticias y antes del footer. `GET /api/opinions` devuelve `id`, `name`, `phrase` e `image` desde la tabla `opinions`.

Los seis autores y frases iniciales son ejemplos editables en `Backend/src/opinion-seed.ts`. Agrega las URLs de retratos en `image`; las imágenes vacías o inaccesibles muestran iniciales. Conserva cada UUID para actualizar el mismo registro.

Desde Backend puedes ejecutar manualmente:

```sh
npm run seed
```

La semilla inserta o actualiza las opiniones sin duplicarlas. El comando también carga las noticias y videos existentes. No se ejecutó durante esta implementación. La tabla se crea al iniciar el backend, pero los registros de opinión se cargan únicamente con el comando de semilla.

Las traducciones de las frases están en `Frontend/src/locales/opinions.en.json`. Los nombres se conservan en ambos idiomas. La franja editorial tiene texto propio en `OpinionEditorial.tsx` y sus traducciones en `src/locales/en.json`.
