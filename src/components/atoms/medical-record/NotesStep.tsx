"use client";

import { useMedicalRecordForm } from "@/contexts/MedicalRecordFormContext";

export function NotesStep() {
  const { draft, updateDraft, currentStep } = useMedicalRecordForm();

  if (currentStep !== 2) return null;

  return (
    <div
      id="medical-record-step-2"
      className="space-y-4"
      role="tabpanel"
      aria-labelledby="medical-record-step-2-label"
    >
      <div>
        <label
          id="medical-record-step-2-label"
          htmlFor="medical-record-notes"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Agrega observaciones clínicas
        </label>
        <textarea
          id="medical-record-notes"
          value={draft.notes}
          onChange={(e) => updateDraft({ notes: e.target.value })}
          placeholder="Ej: Paciente presenta síntomas de..."
          maxLength={2000}
          rows={6}
          aria-describedby="medical-record-notes-help"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition motion-safe:duration-200 focus:border-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        />
        <p
          id="medical-record-notes-help"
          className="mt-1 text-xs text-slate-500"
        >
          {draft.notes.length}/2000 caracteres
        </p>
      </div>
    </div>
  );
}
