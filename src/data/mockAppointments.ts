import type { Appointment } from "@/types/appointment.types";
import { appointmentSchema } from "@/lib/validations/appointment.schema";

/**
 * Mock de citas con UUIDs v4 válidos y validación Zod
 * Todos los mocks son validados automáticamente al importar
 */
const rawMockAppointments: Appointment[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    patientId: "patient-1",
    doctorId: "doctor-1",
    specialty: "Cardiología",
    startTime: "2026-05-10T10:00:00Z",
    endTime: "2026-05-10T10:30:00Z",
    reason: "Dolor en el pecho",
    status: "pending",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    patientId: "patient-2",
    doctorId: "doctor-1",
    specialty: "Cardiología",
    startTime: "2026-05-11T12:30:00Z",
    endTime: "2026-05-11T13:00:00Z",
    reason: "Revisión general",
    status: "confirmed",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    patientId: "patient-3",
    doctorId: "doctor-2",
    specialty: "Dermatología",
    startTime: "2026-05-12T14:00:00Z",
    endTime: "2026-05-12T14:45:00Z",
    reason: "Control dermatológico",
    status: "completed",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    patientId: "patient-1",
    doctorId: "doctor-2",
    specialty: "Dermatología",
    startTime: "2026-05-15T09:30:00Z",
    endTime: "2026-05-15T10:00:00Z",
    reason: "Seguimiento post operatorio",
    status: "cancelled",
  },
];

/**
 * Valida todos los mocks contra el schema
 * Lanza error si alguno no cumple la estructura
 */
export const mockAppointments: Appointment[] = rawMockAppointments.map(
  (appointment) => appointmentSchema.parse(appointment),
);
