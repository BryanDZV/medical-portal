"use client";

import { createContext, useContext } from "react";
import type { DiagnosticsTableContextType } from "@/types/diagnostics.types";

const DiagnosticsTableContext = createContext<
  DiagnosticsTableContextType | undefined
>(undefined);

export function useDiagnosticsTable() {
  const context = useContext(DiagnosticsTableContext);

  if (!context) {
    throw new Error(
      "useDiagnosticsTable debe usarse dentro de DiagnosticsTableProvider",
    );
  }

  return context;
}

export { DiagnosticsTableContext };
