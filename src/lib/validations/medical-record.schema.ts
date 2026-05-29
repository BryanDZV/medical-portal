import { z } from "zod";
import { sanitizeText } from "@/lib/security/sanitize";
import type {
  MedicalRecord,
  CreateMedicalRecordPayload,
  MedicalRecordDraft,
} from "@/types/medical-record.types";

/**
 * Schema para validar un registro médico COMPLETO
 */
export const medicalRecordSchema = z.object({
  id: z.string().uuid("ID debe ser UUID válido"),
  patientId: z.string().min(1, "Paciente requerido"),
  doctorId: z.string().min(1, "Doctor requerido"),
  diagnosis: z.string().min(3, "Diagnóstico requerido"),
  notes: z.string().min(10, "Las notas deben ser más descriptivas"),
  prescriptions: z.array(
    z.string().min(1, "Prescripción no puede estar vacía"),
  ),
  createdAt: z.string().datetime("Formato de fecha inválido"),
});

/**
 * Schema para CREAR un nuevo registro médico
 * No requiere id ni createdAt (se generan en el servidor)
 */
export const createMedicalRecordSchema = z.object({
  patientId: z.string().min(1, "Paciente requerido"),
  doctorId: z.string().min(1, "Doctor requerido"),
  diagnosis: z
    .string()
    .min(3, "Diagnóstico debe tener al menos 3 caracteres")
    .transform((val) => sanitizeText(val).slice(0, 200)),
  notes: z
    .string()
    .min(10, "Las notas deben tener al menos 10 caracteres")
    .transform((val) => sanitizeText(val).slice(0, 2000)),
  prescriptions: z
    .array(z.string().min(1, "Prescripción no puede estar vacía"))
    .min(1, "Debe haber al menos una prescripción")
    .transform((arr) =>
      arr.map((p) => sanitizeText(p).slice(0, 200)).filter(Boolean),
    ),
});

/**
 * Schema para BORRADOR (draft) - campos opcionales
 * Usado durante edición multi-step con auto-save
 */
export const medicalRecordDraftSchema = z.object({
  patientId: z.string().min(1, "Paciente requerido"),
  doctorId: z.string().min(1, "Doctor requerido"),
  diagnosis: z.string().max(200).default(""),
  notes: z.string().max(2000).default(""),
  prescriptions: z.array(z.string()).default([]),
});

export type { MedicalRecord, CreateMedicalRecordPayload, MedicalRecordDraft };
