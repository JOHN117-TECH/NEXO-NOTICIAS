import styles from "./NewsLoader.module.css";

export function NewsLoader() {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>Cargando Noticias…</span>
    </div>
  );
}
