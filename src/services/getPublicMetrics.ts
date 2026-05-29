import { mockDoctors } from "@/data/mockDoctors";
import { mockMedicalRecords } from "@/data/mockMedicalRecords";

const STATIC_FACILITIES = 20;

export interface PublicMetrics {
  attendedPatients: number;
  professionalSpecialties: number;
  facilities: number;
}

/**
 * Simula una lectura asíncrona en servidor para demostrar Streaming SSR.
 * En un backend real, aquí viviría la llamada a base de datos o API interna.
 */
export async function getPublicMetrics(): Promise<PublicMetrics> {
  const attendedPatients = new Set(
    mockMedicalRecords.map((record) => record.patientId),
  ).size;

  const professionalSpecialties = new Set(
    mockDoctors.map((doctor) => doctor.specialty.trim()).filter(Boolean),
  ).size;

  return {
    attendedPatients,
    professionalSpecialties,
    facilities: STATIC_FACILITIES,
  };
}
