"use client";
import buttonStyles from "./ui/Button.module.css";
type Props = {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
};
export function NewsPagination({ currentPage, pages, onPageChange }: Props) {
  if (pages <= 1) return null;
  return (
    <nav
      aria-label="Páginas de noticias"
      className="mt-5 flex items-center justify-center gap-5 text-sm"
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
      >
        Anterior
      </button>
      <span>
        Página {currentPage} de {pages}
      </span>
      <button
        disabled={currentPage === pages}
        onClick={() => onPageChange(currentPage + 1)}
        className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
      >
        Siguiente
      </button>
    </nav>
  );
}
