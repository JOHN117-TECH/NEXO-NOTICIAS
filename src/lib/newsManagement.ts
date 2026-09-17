import type { Dispatch, RefObject, SetStateAction } from "react";
export type NewsManagementState = {
  adminKey: string;
  keyInput: RefObject<HTMLInputElement | null>;
  status: string;
  setStatus: Dispatch<SetStateAction<string>>;
  statusAction: "create" | "delete";
  setStatusAction: Dispatch<SetStateAction<"create" | "delete">>;
  pending: boolean;
  setPending: Dispatch<SetStateAction<boolean>>;
};
