// src/components/dashboard/DoctorAppointments.tsx

"use client";

import type { User } from "@/types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface DoctorAppointmentsProps {
  user: User;
}

const statusLabel = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Completada",
};

export function DoctorAppointments({ user }: DoctorAppointmentsProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const updateAppointmentStatus = useAppointmentStore(
    (state) => state.updateAppointmentStatus,
  );

  const doctor = mockDoctors.find((doctor) => doctor.userId === user.id);

  if (!doctor) return null;

  const doctorAppointments = appointments.filter(
    (appointment) => appointment.doctorId === doctor.id,
  );

  return (
    <section className="mt-8 rounded-xl bg-white p-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Citas de pacientes</h2>

      <div className="mt-5 space-y-4">
        {doctorAppointments.length === 0 && (
          <p className="text-sm text-slate-600">
            No hay citas para este médico.
          </p>
        )}

        {doctorAppointments.map((appointment) => {
          const patient = mockPatients.find(
            (patient) => patient.id === appointment.patientId,
          );

          return (
            <article
              key={appointment.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-semibold text-slate-900">
                    Paciente: {patient?.name}
                  </p>
                  <p className="text-slate-900">Teléfono: {patient?.phone}</p>
                  <p className="text-sm text-slate-600">
                    Especialidad: {appointment.specialty ?? doctor.specialty}
                  </p>

                  <p className="text-sm text-slate-600">
                    Inicio: {new Date(appointment.startTime).toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-600">
                    Fin: {new Date(appointment.endTime).toLocaleString()}
                  </p>

                  <p className="text-sm text-slate-600">
                    Motivo: {appointment.reason}
                  </p>

                  <p className="text-sm font-semibold text-blue-600">
                    Estado: {statusLabel[appointment.status]}
                  </p>
                </div>

                {appointment.status === "pending" && (
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() =>
                        //La función es async, pero no necesitamos esperar el resultado porque el optimistic update ya actualiza la UI inmediatamente.
                        void updateAppointmentStatus(appointment.id, "confirmed")
                      }
                      className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                    >
                      Confirmar
                    </button>

                    <button
                      onClick={() =>
                        //La función es async, pero no necesitamos esperar el resultado porque el optimistic update ya actualiza la UI inmediatamente.
                        void updateAppointmentStatus(appointment.id, "cancelled")
                      }
                      className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
