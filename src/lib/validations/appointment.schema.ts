import { z } from "zod";
import { sanitizeText } from "@/lib/security/sanitize";

// Enumeración de estados válidos
const appointmentStatusEnum = z.enum([
  "pending",
  "confirmed",
  "cancelled",
  "completed",
]);

/**
 * Schema para validar una cita COMPLETA
 */
export const appointmentSchema = z
  .object({
    id: z.string().uuid("ID debe ser UUID válido"),
    patientId: z.string().min(1, "Paciente requerido"),
    doctorId: z.string().min(1, "Doctor requerido"),
    specialty: z.string().min(1, "Especialidad requerida"),
    startTime: z.string().datetime("Formato de fecha inválido"),
    endTime: z.string().datetime("Formato de fecha inválido"),
    reason: z.string().min(5, "Motivo requerido"),
    status: appointmentStatusEnum,
  })
  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    "endTime debe ser después de startTime",
  );

/**
 * Schema para CREAR una nueva cita
 * No requiere id ni status (se generan en el servidor)
 */
export const createAppointmentSchema = z
  .object({
    patientId: z.string().min(1, "Paciente requerido"),
    doctorId: z.string().min(1, "Doctor requerido"),
    specialty: z.string().min(1, "Especialidad requerida"),
    startTime: z.iso
      .datetime("Formato de fecha inválido")
      .refine(
        (timeStr) => new Date(timeStr).getTime() > Date.now(),
        "No puedes reservar citas en el pasado",
      ),
    endTime: z.iso.datetime("Formato de fecha inválido"),
    reason: z
      .string()
      .min(5, "El motivo debe ser más descriptivo")
      .transform((val) => sanitizeText(val).slice(0, 500)),
  })
  .refine(
    (data) => new Date(data.endTime) > new Date(data.startTime),
    "endTime debe ser después de startTime",
  );

export type Appointment = z.infer<typeof appointmentSchema>;
export type CreateAppointmentPayload = z.infer<typeof createAppointmentSchema>;
