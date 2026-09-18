import { categories } from "./types";

export type CategoryCardData = {
  name: (typeof categories)[number];
  description: string;
  icon: "technology" | "education" | "travel" | "news";
  image?: string;
};

// Add an image path (for example /images/categories/technology.png) when available.
export const categoryCards: CategoryCardData[] = [
  {
    name: "Tecnología",
    icon: "technology",
    description:
      "Innovación, inteligencia artificial y herramientas que transforman nuestra vida.",
  },
  {
    name: "Educación",
    icon: "education",
    description:
      "Aprendizaje, formación virtual y oportunidades para seguir creciendo.",
  },
  {
    name: "Turismo",
    icon: "travel",
    description:
      "Destinos, cultura y experiencias para descubrir Colombia de forma sostenible.",
  },
  {
    name: "Actualidad",
    icon: "news",
    description:
      "Historias, iniciativas y acontecimientos que conectan a nuestra comunidad.",
  },
];
