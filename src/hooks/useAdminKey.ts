"use client";
import { useEffect, useState } from "react";
const ADMIN_KEY_STORAGE = "nexo-admin-key";
export function useAdminKey() {
  const [key, setKey] = useState("");
  const [keyStorageError, setKeyStorageError] = useState(false);
  useEffect(() => {
    try {
      setKey(sessionStorage.getItem(ADMIN_KEY_STORAGE) || "");
    } catch {
      setKeyStorageError(true);
    }
  }, []);
  function updateAdminKey(value: string) {
    setKey(value);
    try {
      if (value) sessionStorage.setItem(ADMIN_KEY_STORAGE, value);
      else sessionStorage.removeItem(ADMIN_KEY_STORAGE);
      setKeyStorageError(false);
    } catch {
      setKeyStorageError(true);
    }
  }

  return { key, keyStorageError, updateAdminKey };
}
