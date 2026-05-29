"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function PrescriptionsStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 3) return null;

  const handlePrescriptionChange = (index: number, value: string) => {
    const updated = draft.prescriptions.map((p, i) =>
      i === index ? value : p,
    );
    updateDraft({ prescriptions: updated });
  };

  const handleRemovePrescription = (index: number) => {
    const updated = draft.prescriptions.filter((_, i) => i !== index);
    updateDraft({ prescriptions: updated });
  };

  const handleAddPrescription = () => {
    updateDraft({ prescriptions: [...draft.prescriptions, ""] });
  };

  return (
    <div
      id="medical-record-step-3"
      className="space-y-4"
      role="tabpanel"
      aria-labelledby="medical-record-step-3-label"
    >
      <div>
        <label
          id="medical-record-step-3-label"
          htmlFor="medical-record-prescription-0"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Lista de medicamentos
        </label>
        <div className="space-y-3">
          {draft.prescriptions.length === 0 && (
            <p className="text-sm text-slate-600" aria-live="polite">
              No hay prescripciones. Agrega una para continuar.
            </p>
          )}
          {draft.prescriptions.map((prescription, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                id={`medical-record-prescription-${index}`}
                type="text"
                value={prescription}
                onChange={(e) =>
                  handlePrescriptionChange(index, e.target.value)
                }
                placeholder={`Medicamento ${index + 1}`}
                maxLength={200}
                aria-label={`Prescripción ${index + 1}`}
                className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition motion-safe:duration-200 focus:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
              />
              <button
                type="button"
                onClick={() => handleRemovePrescription(index)}
                aria-label={`Eliminar prescripción ${index + 1}`}
                className="shrink-0 rounded-lg bg-red-600 px-4 py-3 text-sm font-semibold text-white transition motion-safe:duration-200 hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleAddPrescription}
          className="mt-3 rounded-lg border border-blue-600 px-4 py-2 text-sm font-semibold text-blue-600 transition motion-safe:duration-200 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          + Agregar prescripción
        </button>
      </div>
    </div>
  );
}
