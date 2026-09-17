# Organización de estilos

- `app/globals.css`: Tailwind, tokens del tema y reglas base de accesibilidad e interacción. No contiene estilos de páginas ni componentes.
- `app/layout.module.css`: estructura de la aplicación, enlace para saltar al contenido y disposición del footer en listados.
- `app/page.module.css` y `app/<ruta>/page.module.css`: estilos propios de cada página, incluyendo sus reglas responsive.
- `components/<Componente>.module.css`: estilos encapsulados de Header, Footer, tarjetas, favoritos y administración.
- `components/ui/*.module.css`: estilos reutilizables de botones y enlaces, campos, avisos y tipografía.

Cada componente importa únicamente los módulos que utiliza. Las clases se aplican mediante el objeto importado (`headerStyles.siteHeader`, por ejemplo), evitando nombres globales y colisiones. Las utilidades de Tailwind se conservan para distribución y espaciado.

Para añadir estilos, utiliza el módulo del componente o página correspondiente. Si varios componentes necesitan la misma regla, colócala en un módulo compartido de `components/ui`. Mantén los ajustes responsive junto al estilo que modifican.
