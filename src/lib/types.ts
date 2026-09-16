export const categories = [
  "Tecnología",
  "Educación",
  "Turismo",
  "Actualidad",
] as const;
export interface News {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  publishedAt: string;
  featured: boolean;
}
