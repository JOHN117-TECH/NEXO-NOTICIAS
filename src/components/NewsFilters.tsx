"use client";
import newsStyles from "./NewsFilters.module.css";
import { categories } from "@/lib/types";
const pageSizes = [2, 3, 4, 6, 8, 10];
type Props = {
  category: string;
  pageSize: number;
  onCategoryChange: (category: string) => void;
  onPageSizeChange: (size: number) => void;
};
export function NewsFilters({
  category,
  pageSize,
  onCategoryChange,
  onPageSizeChange,
}: Props) {
  return (
    <div className={newsStyles.toolbar}>
      <div
        id="categorias"
        aria-label="Filtrar noticias por categoría"
        className="flex flex-wrap gap-2"
      >
        {["Todas", ...categories].map((c) => (
          <button
            className={newsStyles.filter}
            key={c}
            aria-pressed={category === c}
            onClick={() => {
              onCategoryChange(c);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <label className={newsStyles.pageSize}>
        Noticias por página
        <select
          value={pageSize}
          onChange={(event) => {
            const size = Number(event.target.value);
            if (pageSizes.includes(size)) {
              onPageSizeChange(size);
            }
          }}
        >
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
