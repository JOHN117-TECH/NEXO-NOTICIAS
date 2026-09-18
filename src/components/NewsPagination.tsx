"use client";
import { useI18n } from "@/hooks";
import buttonStyles from "@/styles/components/ui/Button.module.css";
type Props = {
  currentPage: number;
  pages: number;
  onPageChange: (page: number) => void;
};
export function NewsPagination({ currentPage, pages, onPageChange }: Props) {
  const { t } = useI18n();

  if (pages <= 1) return null;
  return (
    <nav
      aria-label={t("Páginas de noticias")}
      className="mt-5 flex items-center justify-center gap-5 text-sm"
    >
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
      >
        {t("Anterior")}
      </button>
      <span>{t("Página {page} de {pages}", { page: currentPage, pages })}</span>
      <button
        disabled={currentPage === pages}
        onClick={() => onPageChange(currentPage + 1)}
        className={[buttonStyles.textLink, "disabled:opacity-40"].join(" ")}
      >
        {t("Siguiente")}
      </button>
    </nav>
  );
}
