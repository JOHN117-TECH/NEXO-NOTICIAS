export interface Cartoon {
  id: string;
  title: string;
  author: string;
  image: string;
}

export const cartoons: Cartoon[] = [
  { id: "holding-on", title: "Se sostiene", author: "Mil Caricaturas", image: "https://imagenes2.eltiempo.com/files/image_540_404/uploads/2026/09/16/6aab58b74e3b2.jpeg" },
  { id: "changing-course", title: "Cambiando de rumbo", author: "Matador", image: "https://imagenes2.eltiempo.com/files/image_540_404/uploads/2026/09/16/6aab590c199d4.jpeg" },
  { id: "modern-wars", title: "Guerras modernas", author: "Beto Barreto", image: "https://imagenes2.eltiempo.com/files/image_540_404/uploads/2026/09/16/6aab595e4399a.jpeg" },
];
