// src/components/dashboard/CreateMedicalRecordForm.tsx

"use client";

import { useEffect, useRef } from "react";
import type { User } from "@/types/user.types";
import type { MedicalRecord } from "@/types/medical-record.types";
import { MedicalRecordFormProvider } from "@/providers/MedicalRecordFormProvider";
import { StepIndicator } from "@/components/atoms/medical-record/StepIndicator";
import { DiagnosisStep } from "@/components/atoms/medical-record/DiagnosisStep";
import { NotesStep } from "@/components/atoms/medical-record/NotesStep";
import { PrescriptionsStep } from "@/components/atoms/medical-record/PrescriptionsStep";
import { AutoSaveIndicator } from "@/components/atoms/medical-record/AutoSaveIndicator";
import { FormActions } from "@/components/atoms/medical-record/FormActions";

interface CreateMedicalRecordFormProps {
  user: User;
  selectedPatientId: string;
  editingRecord?: MedicalRecord | null;
  onShowDiagnostics: () => void;
}

/**
 * Container component que proporciona Context para toda la lógica del formulario
 * Zero Prop Drilling + Atomic Design + Zod Everywhere
 */
export function CreateMedicalRecordForm({
  user,
  selectedPatientId,
  editingRecord,
  onShowDiagnostics,
}: CreateMedicalRecordFormProps) {
  const isEditing = Boolean(editingRecord);
  const formTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isEditing && formTitleRef.current) {
      formTitleRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isEditing, editingRecord]);

  return (
    <MedicalRecordFormProvider
      key={editingRecord?.id || "new-record"}
      user={user}
      selectedPatientId={selectedPatientId}
      initialData={editingRecord}
    >
      <section
        className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        aria-labelledby="medical-record-form-title"
      >
        <h3
          id="medical-record-form-title"
          ref={formTitleRef}
          className="text-xl font-bold text-slate-900"
        >
          {isEditing ? "Editar expediente" : "Crear expediente"} - Multi-paso
        </h3>

        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Completa cada paso con calma. El progreso se guarda automáticamente y
          los campos se validan antes de avanzar.
        </p>

        {/* Indicador de pasos */}
        <div className="mt-6">
          <StepIndicator />
        </div>

        {/* Contenido del paso actual */}
        <div
          className="mt-6 rounded-xl bg-slate-50 p-5"
          role="tabpanel"
          aria-live="polite"
        >
          <DiagnosisStep />
          <NotesStep />
          <PrescriptionsStep />
        </div>

        {/* Estado de auto-save */}
        <div className="mt-4">
          <AutoSaveIndicator />
        </div>

        {/* Botones de navegación */}
        <div className="mt-6">
          <FormActions />
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={onShowDiagnostics}
            className="inline-flex rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition motion-safe:duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2"
          >
            Ir a visualización de diagnósticos
          </button>
        </div>
      </section>
    </MedicalRecordFormProvider>
  );
}
