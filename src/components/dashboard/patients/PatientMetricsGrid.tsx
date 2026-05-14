// src/components/dashboard/PatientMetricsGrid.tsx

"use client";

import { StatCard } from "@/components/molecules/StatCard";
import { useAppointmentStore } from "@/store/useAppointmentStore";
import { mockPatients } from "../../../data/mockPatients";
import type { User } from "../../../types/user.types";

interface PatientMetricsGridProps {
  user: User;
}

export function PatientMetricsGrid({ user }: PatientMetricsGridProps) {
  const appointments = useAppointmentStore((state) => state.appointments);

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  const patientAppointments = patient
    ? appointments.filter((appointment) => appointment.patientId === patient.id)
    : [];

  const pendingAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "pending",
  ).length;

  const confirmedAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "confirmed",
  ).length;

  const completedAppointments = patientAppointments.filter(
    (appointment) => appointment.status === "completed",
  ).length;

  return (
    <section className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Mis citas"
        value={patientAppointments.length}
        description="Total de citas asociadas a tu perfil"
      />

      <StatCard
        title="Pendientes"
        value={pendingAppointments}
        description="Citas esperando confirmación"
      />

      <StatCard
        title="Confirmadas"
        value={confirmedAppointments}
        description="Citas aprobadas por el médico"
      />

      <StatCard
        title="Completadas"
        value={completedAppointments}
        description="Consultas ya realizadas"
      />
    </section>
  );
}
