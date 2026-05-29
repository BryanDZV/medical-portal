// src/providers/MedicalRecordFormProvider.tsx

"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { User } from "@/types/user.types";
import type { MedicalRecord } from "@/types/medical-record.types";
import {
  medicalRecordDraftSchema,
  createMedicalRecordSchema,
} from "@/lib/validations/medical-record.schema";
import type { MedicalRecordDraft } from "@/types/medical-record.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import { MedicalRecordFormContext } from "@/contexts/MedicalRecordFormContext";
import type { MedicalRecordFormContextType } from "@/types/medical-record.types";

interface MedicalRecordFormProviderProps {
  children: ReactNode;
  user: User;
  selectedPatientId: string;
  initialData?: MedicalRecord | null;
}

const EMPTY_DRAFT: MedicalRecordDraft = {
  patientId: "",
  doctorId: "",
  diagnosis: "",
  notes: "",
  prescriptions: [],
};

export function MedicalRecordFormProvider({
  children,
  user,
  selectedPatientId,
  initialData,
}: MedicalRecordFormProviderProps) {
  const createRecord = useMedicalRecordStore((state) => state.createRecord);
  const updateRecord = useMedicalRecordStore((state) => state.updateRecord);

  const doctor = mockDoctors.find((d) => d.userId === user.id) || null;
  const patient = mockPatients.find((p) => p.id === selectedPatientId) || null;

  const [currentStep, setCurrentStep] = useState(1);
  const [draft, setDraft] = useState<MedicalRecordDraft>(() => {
    if (initialData) {
      return {
        patientId: initialData.patientId,
        doctorId: initialData.doctorId,
        diagnosis: initialData.diagnosis,
        notes: initialData.notes,
        prescriptions: initialData.prescriptions,
      };
    }
    return EMPTY_DRAFT;
  });
  const [lastSaved, setLastSaved] = useState<string>("");
  const [savingError, setSavingError] = useState<string>("");
  const editingRecordId = initialData?.id ?? null;

  // Auto-save con debounce
  useEffect(() => {
    if (!doctor || !patient) return;

    const timer = setTimeout(() => {
      try {
        medicalRecordDraftSchema.parse({
          ...draft,
          patientId: patient.id,
          doctorId: doctor.id,
        });

        localStorage.setItem(
          `medicalRecordDraft_${patient.id}`,
          JSON.stringify(draft),
        );

        setLastSaved(new Date().toLocaleTimeString());
        setSavingError("");
      } catch {
        // Silenciosamente ignorar errores de validación parcial
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [draft, doctor, patient]);

  const updateDraft = (updates: Partial<MedicalRecordDraft>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return draft.diagnosis.trim().length >= 3;
      case 2:
        return draft.notes.trim().length >= 10;
      case 3:
        return draft.prescriptions.some((p) => p.trim().length > 0);
      default:
        return false;
    }
  };

  const submit = async () => {
    if (!doctor || !patient) return;

    try {
      const payload = createMedicalRecordSchema.parse({
        patientId: patient.id,
        doctorId: doctor.id,
        diagnosis: draft.diagnosis,
        notes: draft.notes,
        prescriptions: draft.prescriptions.filter((p) => p.trim().length > 0),
      });

      if (editingRecordId) {
        updateRecord(editingRecordId, payload);
      } else {
        createRecord({
          id: crypto.randomUUID(),
          ...payload,
          createdAt: new Date().toISOString(),
        });
      }

      setDraft(EMPTY_DRAFT);
      localStorage.removeItem(`medicalRecordDraft_${patient.id}`);
      setCurrentStep(1);
      // Consider using a callback to notify parent of successful submission
    } catch {
      setSavingError(
        "Error al validar el formulario. Verifica todos los campos.",
      );
    }
  };

  const reset = () => {
    setDraft(EMPTY_DRAFT);
    setCurrentStep(1);
    setSavingError("");
  };

  const cancelEdit = () => {
    reset();
    // This should be handled by the parent component, likely by calling `onShowDiagnostics`
  };

  const value: MedicalRecordFormContextType = {
    user,
    doctor,
    patient,
    draft,
    currentStep,
    lastSaved,
    savingError,
    editingRecordId,
    setCurrentStep,
    updateDraft,
    canProceed,
    submit,
    reset,
    cancelEdit,
  };

  return (
    <MedicalRecordFormContext.Provider value={value}>
      {children}
    </MedicalRecordFormContext.Provider>
  );
}
