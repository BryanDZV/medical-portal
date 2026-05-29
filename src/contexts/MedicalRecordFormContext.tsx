// src/contexts/MedicalRecordFormContext.tsx

"use client";

import { createContext, useContext } from "react";
import type { MedicalRecordFormContextType } from "@/types/medical-record.types";

const MedicalRecordFormContext = createContext<
  MedicalRecordFormContextType | undefined
>(undefined);

export function useMedicalRecordForm() {
  const context = useContext(MedicalRecordFormContext);
  if (!context) {
    throw new Error(
      "useMedicalRecordForm debe usarse dentro de MedicalRecordFormProvider",
    );
  }
  return context;
}

export { MedicalRecordFormContext };
