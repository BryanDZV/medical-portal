export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  specialty: string;
  startTime: string;
  endTime: string;
  reason: string;
  status: AppointmentStatus;
}
