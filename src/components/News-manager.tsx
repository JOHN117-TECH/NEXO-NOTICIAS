"use client";
import { useI18n } from "@/hooks/useI18n";
import { useRef, useState } from "react";
import managerStyles from "./News-manager.module.css";
import { useAdminKey } from "@/hooks/useAdminKey";
import { AdminKeyField } from "./AdminKeyField";
import { CreateNewsForm } from "./CreateNewsForm";
import { DeleteNewsPanel } from "./DeleteNewsPanel";
import type { NewsManagementState } from "@/lib/newsManagement";

export function NewsManager() {
  const { t } = useI18n();

  const { key, keyStorageError, updateAdminKey } = useAdminKey();
  const keyInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [statusAction, setStatusAction] = useState<"create" | "delete">(
    "create",
  );
  const [pending, setPending] = useState(false);

  const state: NewsManagementState = {
    adminKey: key,
    keyInput,
    status,
    setStatus,
    statusAction,
    setStatusAction,
    pending,
    setPending,
  };
  return (
    <details className={managerStyles.management}>
      <summary>{t("Administrar noticias")}</summary>
      <AdminKeyField
        adminKey={key}
        keyInput={keyInput}
        updateAdminKey={updateAdminKey}
        keyStorageError={keyStorageError}
        status={t(status)}
      />
      <div className={managerStyles.managementColumns}>
        <CreateNewsForm {...state} />
        <DeleteNewsPanel {...state} />
      </div>
    </details>
  );
}
