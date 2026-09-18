export interface MostReadStory {
  id: string;
  title: string;
  author: string;
  image: string;
}

// Contenido de ejemplo. Añade cada imagen en image (URL o ruta dentro de public).
export const mostReadStories: MostReadStory[] = [
  {
    id: "ai-learning",
    title: "Cómo usar la inteligencia artificial para aprender sin perder el pensamiento crítico",
    author: "Camila Torres",
    image: "https://www.telefonica.com/es/wp-content/uploads/sites/4/2026/06/educacion-inteligencia-artificial-pensamiento-critico-e1782202993378.png",
  },
  {
    id: "online-study",
    title: "Cursos virtuales: cinco hábitos para estudiar con más autonomía",
    author: "Andrés Ramírez",
    image: "https://cdn.aicad.es/asset/img/4/5-claves-para-destacar-en-el-aula-virtual.png",
  },
  {
    id: "sustainable-travel",
    title: "Rutas de turismo sostenible para descubrir Colombia con respeto",
    author: "Valentina Rojas",
    image: "https://boraboracartagena.com/img/cms/galerias2023/VIP/Web-banner-turismo-sostenible-02.jpg",
  },
  {
    id: "cybersecurity",
    title: "La ciberseguridad empieza en casa: claves para cuidar tus datos",
    author: "Daniel Moreno",
    image: "https://mejoratusfinanzas.mx/wp-content/uploads/sites/3/2024/01/ciberseguridad-datos.webp",
  },
  {
    id: "digital-libraries",
    title: "Bibliotecas digitales acercan la lectura a más familias",
    author: "Laura Martínez",
    image: "https://s3.amazonaws.com/rtvc-assets-canalinstitucional.tv/s3fs-public/2022-04/biblioteca%20digital%20familiar.jpg",
  },
  {
    id: "greener-cities",
    title: "Ciudades más verdes: tecnología y comunidad para cuidar el entorno",
    author: "Mateo Vargas",
    image: "https://www.infobae.com/resizer/v2/4PVI5XG5QBC3PI44HOYG2UU4DE.jpg?auth=2018cc7a70aa8d3acdf14da422085fcad2631495430141e2129f1d2e21114b01&smart=true&width=992&height=558&quality=85",
  },
];
