import type { User } from "./user.types";

export interface MedicalRecord {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes: string;
  prescriptions: string[];
  createdAt: string;
}

export interface CreateMedicalRecordPayload {
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes: string;
  prescriptions: string[];
}

export interface MedicalRecordDraft {
  patientId: string;
  doctorId: string;
  diagnosis: string;
  notes: string;
  prescriptions: string[];
}

export interface MedicalRecordFormContextType {
  // Data
  user: User;
  doctor: {
    id: string;
    userId: string;
    name: string;
    specialty: string;
  } | null;
  patient: { id: string; name: string; age: number; phone: string } | null;
  draft: MedicalRecordDraft;

  // UI State
  currentStep: number;
  lastSaved: string;
  savingError: string;
  editingRecordId: string | null;

  // Actions
  setCurrentStep: (step: number) => void;
  updateDraft: (updates: Partial<MedicalRecordDraft>) => void;
  canProceed: () => boolean;
  submit: () => Promise<void>;
  reset: () => void;
  cancelEdit: () => void;
}
