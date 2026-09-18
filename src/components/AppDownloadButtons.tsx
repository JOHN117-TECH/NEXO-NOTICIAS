"use client";

import Swal from "sweetalert2";
import { useI18n } from "@/hooks";
import styles from "@/styles/components/Footer.module.css";
import managerStyles from "@/styles/components/DeleteNewsPanel.module.css";
export function AppDownloadButtons() {
  const { t } = useI18n();
  async function showAvailability() {
    await Swal.fire({
      icon: "info",
      titleText: t("Próximamente"),
      text: t("La aplicación aún no está disponible para descargar."),
      confirmButtonText: t("Aceptar"),
      confirmButtonColor: "var(--button-bg)",
      background: "var(--surface)",
      color: "var(--text)",
      customClass: {
        popup: managerStyles.dialogBorder,
      },
    });
  }
  return (
    <div className={styles.downloads} role="group" aria-label={t("Descarga nuestra app")}>
      {(["Google Play", "App Store"] as const).map((store) => (
        <button
          key={store}
          type="button"
          className={styles.downloadButton}
          aria-label={t("Descarga nuestra app en {store}", { store })}
          onClick={() => void showAvailability()}
        >
          <span>{t("Descarga nuestra app en")}</span>
          <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {store === "Google Play" ? (
              <><path d="M3 2 21 12 3 22V2Z" /><path d="m3 2 12 14m-12 6L15 8" /></>
            ) : (
              <><circle cx="12" cy="12" r="10" fill="currentColor" stroke="none" /><g className={styles.appStoreMark}><path d="m10 6 8 13M14 6 6 19M5 15h14" /></g></>
            )}
          </svg>
        </button>
      ))}
    </div>
  );
}
