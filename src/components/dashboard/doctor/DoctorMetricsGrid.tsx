// src/components/dashboard/DoctorMetricsGrid.tsx

"use client";

import type { User } from "@/types/user.types";
import { StatCard } from "@/components/molecules/StatCard";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import { mockDoctors } from "@/data/mockDoctors";

interface DoctorMetricsGridProps {
  user: User;
}

export function DoctorMetricsGrid({ user }: DoctorMetricsGridProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const records = useMedicalRecordStore((state) => state.records);
  const doctor = mockDoctors.find((doctor) => doctor.userId === user.id);

  const doctorAppointments = doctor
    ? appointments.filter((appointment) => appointment.doctorId === doctor.id)
    : [];

  const totalAppointments = doctorAppointments.length;

  const pendingAppointments = doctorAppointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;

  const confirmedAppointments = doctorAppointments.filter(
    (appointment) => appointment.status === "confirmed",
  ).length;

  const attendedPatients = new Set(
    doctorAppointments
      .filter((appointment) => ["confirmed", "completed", "cancelled"].includes(appointment.status))
      .map((appointment) => appointment.patientId),
  ).size;

  const totalMedicalRecords = doctor
    ? records.filter((record) => record.doctorId === doctor.id).length
    : 0;

  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Citas totales"
        value={totalAppointments}
        description="Citas de este médico"
      />

      <StatCard
        title="Citas pendientes"
        value={pendingAppointments}
        description="Esperando confirmación"
      />

      <StatCard
        title="Citas confirmadas"
        value={confirmedAppointments}
        description="Ya confirmadas"
      />

      <StatCard
        title="Pacientes atendidos"
        value={attendedPatients}
        description={`${totalMedicalRecords} expedientes médicos`}
      />
    </section>
  );
}
