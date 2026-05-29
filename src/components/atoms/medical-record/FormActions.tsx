"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

const TOTAL_STEPS = 3;

export function FormActions() {
  const {
    currentStep,
    setCurrentStep,
    canProceed,
    submit,
    editingRecordId,
    cancelEdit,
  } = useMedicalRecordForm();

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-wrap gap-3" aria-label="Controles del formulario">
      {editingRecordId && (
        <button
          type="button"
          onClick={cancelEdit}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition motion-safe:duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2"
        >
          Cancelar edición
        </button>
      )}

      {currentStep > 1 && (
        <button
          type="button"
          onClick={handleBack}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition motion-safe:duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2"
        >
          ← Atrás
        </button>
      )}

      {currentStep < TOTAL_STEPS ? (
        <button
          type="button"
          onClick={handleNext}
          disabled={!canProceed()}
          className="ml-auto rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition motion-safe:duration-200 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed"
        >
          Siguiente →
        </button>
      ) : (
        <button
          type="button"
          onClick={submit}
          className="ml-auto rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition motion-safe:duration-200 hover:bg-green-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2"
        >
          {editingRecordId ? "Guardar cambios" : "Crear expediente"}
        </button>
      )}
    </div>
  );
}
