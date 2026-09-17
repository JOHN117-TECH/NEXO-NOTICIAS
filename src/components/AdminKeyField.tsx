"use client";
import { useI18n } from "@/hooks/useI18n";
import { useState, type RefObject } from "react";
import managerStyles from "./AdminKeyField.module.css";
import formStyles from "./ui/FormField.module.css";
import noticeStyles from "./ui/Notice.module.css";
type Props = {
  adminKey: string;
  keyInput: RefObject<HTMLInputElement | null>;
  updateAdminKey: (value: string) => void;
  keyStorageError: boolean;
  status: string;
};
export function AdminKeyField({
  adminKey: key,
  keyInput,
  updateAdminKey,
  keyStorageError,
  status,
}: Props) {
  const { t } = useI18n();

  const [keyHelpOpen, setKeyHelpOpen] = useState(false);
  return (
    <div className="mt-4 max-w-xl">
      <div className={managerStyles.keyRow}>
        <label className={formStyles.field}>
          {t("Clave de administración")}
          <input
            ref={keyInput}
            type="password"
            value={key}
            onChange={(e) => updateAdminKey(e.target.value)}
            autoComplete="off"
            aria-describedby="admin-key-help"
            required
          />
        </label>
        <div
          className={managerStyles.keyHelp}
          onMouseEnter={() => setKeyHelpOpen(true)}
          onMouseLeave={() => setKeyHelpOpen(false)}
          onFocus={() => setKeyHelpOpen(true)}
          onBlur={() => setKeyHelpOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setKeyHelpOpen(false);
          }}
        >
          <button
            type="button"
            className={managerStyles.helpButton}
            aria-label={t("Ayuda sobre la clave de administración")}
            aria-describedby="admin-key-help"
            onClick={() => setKeyHelpOpen(true)}
          >
            <span aria-hidden="true">?</span>
          </button>
          <p
            id="admin-key-help"
            role="tooltip"
            hidden={!keyHelpOpen}
            className={managerStyles.keyTooltip}
          >
            {t(
              "La clave es necesaria para crear y eliminar noticias. Se conserva al recargar durante la sesión de esta pestaña. Vacía el campo para olvidarla.",
            )}
          </p>
        </div>
      </div>
      {keyStorageError && (
        <p role="alert" className="text-sm text-[var(--danger)]">
          {t(
            "El navegador no permite guardar la clave en esta sesión. Puedes usarla, pero tendrás que introducirla nuevamente al recargar.",
          )}
        </p>
      )}
      {status && !key.trim() && (
        <p role="alert" className={noticeStyles.notice}>
          {t(status)}
        </p>
      )}
    </div>
  );
}
