export interface MentalGame {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
  symbol: string;
}
// Agrega cada imagen en image y el enlace del juego en href.
export const mentalGames: MentalGame[] = [
  {
    id: "entertainment", title: "¿Te apasiona el cine, la música y el mundo del entretenimiento?",
    description: "Prueba tus conocimientos sobre películas, celebridades, premios, series, teatro y cultura pop.",
    image: "https://imagenes2.eltiempo.com/files/image_160_160/files/fp/uploads/2025/10/24/68fb9940e6602.r_d.303-383.png", href: "#", symbol: "?",
  },
  {
    id: "science", title: "Quiz de Ciencia", description: "Demuestra cuánto sabes. ¡Descubre si puedes ganar!",
    image: "https://imagenes2.eltiempo.com/files/image_160_160/files/fp/uploads/2025/07/16/6877ac400073d.r_d.380-380.png", href: "#", symbol: "?",
  },
  {
    id: "crossword", title: "Crucigrama", description: "Descifra cada pista. Pon a prueba tu agilidad mental.",
    image: "https://imagenes2.eltiempo.com/files/image_160_160/files/fp/uploads/2025/08/21/68a73cd4779db.r_d.106-72.png", href: "#", symbol: "✚",
  },
  {
    id: "sudoku", title: "Sudoku", description: "Resuelve el tablero completo. ¡Juega ahora!",
    image: "https://imagenes2.eltiempo.com/files/image_160_160/uploads/2024/12/03/674e95233f501.png", href: "#", symbol: "1 2 3",
  },
  {
    id: "words", title: "Letras", description: "Encuentra las palabras ocultas. ¿Aceptas el desafío?",
    image: "https://imagenes2.eltiempo.com/files/image_160_160/uploads/2025/07/08/686d78d398325.jpeg", href: "#", symbol: "ABC",
  },
];
