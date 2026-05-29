"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function DiagnosisStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 1) return null;

  return (
    <div
      id="medical-record-step-1"
      className="space-y-4"
      role="tabpanel"
      aria-labelledby="medical-record-step-1-label"
    >
      <div>
        <label
          id="medical-record-step-1-label"
          htmlFor="medical-record-diagnosis"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Ingresa el diagnóstico
        </label>
        <input
          id="medical-record-diagnosis"
          type="text"
          value={draft.diagnosis}
          onChange={(e) => updateDraft({ diagnosis: e.target.value })}
          placeholder="Ej: Hipertensión arterial"
          maxLength={200}
          aria-describedby="medical-record-diagnosis-help"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition motion-safe:duration-200 focus:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        />
        <p
          id="medical-record-diagnosis-help"
          className="mt-1 text-xs text-slate-500"
        >
          {draft.diagnosis.length}/200 caracteres
        </p>
      </div>
    </div>
  );
}
