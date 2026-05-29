// src/components/dashboard/PatientAppointments.tsx

"use client";

import { useState } from "react";
import type { Appointment } from "@/types/appointment.types";
import type { User } from "../../../types/user.types";
import { Modal } from "@/components/atoms/Modal";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface PatientAppointmentsProps {
  user: User;
}

const statusLabel = {
  pending: "Pendiente",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
  completed: "Completada",
};

const statusClass = {
  pending: "text-amber-700 bg-amber-50 border-amber-200",
  confirmed: "text-green-700 bg-green-50 border-green-200",
  cancelled: "text-red-700 bg-red-50 border-red-200",
  completed: "text-slate-700 bg-slate-50 border-slate-200",
};

export function PatientAppointments({ user }: PatientAppointmentsProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const deleteAppointment = useAppointmentStore(
    (state) => state.deleteAppointment,
  );
  const [appointmentToCancel, setAppointmentToCancel] =
    useState<Appointment | null>(null);
  const [toast, setToast] = useState("");

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  if (!patient) return null;

  const myAppointments = appointments.filter(
    (appointment) => appointment.patientId === patient.id,
  );

  const confirmCancel = () => {
    if (!appointmentToCancel) return;

    deleteAppointment(appointmentToCancel.id);
    setAppointmentToCancel(null);
    setToast("Cita cancelada");
    window.setTimeout(() => setToast(""), 3000);
  };

  const handleDeleteCancelledRequest = (appointmentId: string) => {
    deleteAppointment(appointmentId);
  };

  const handleRequestAnotherSchedule = (appointment: Appointment) => {
    window.dispatchEvent(
      new CustomEvent<Appointment>("appointment:reschedule", {
        detail: appointment,
      }),
    );

    document
      .getElementById("create-appointment-form")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {toast && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-semibold text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      <section className="mt-8 rounded-xl bg-white p-4 shadow-sm border border-slate-200 sm:rounded-2xl sm:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Mis citas</h2>

      <div className="mt-5 space-y-4">
        {myAppointments.length === 0 && (
          <p className="text-sm text-slate-600">Todavía no tienes citas.</p>
        )}

        {myAppointments.map((appointment) => {
          const doctor = mockDoctors.find(
            (doctor) => doctor.id === appointment.doctorId,
          );

          return (
            <article
              key={appointment.id}
              className={`rounded-xl border p-4 ${statusClass[appointment.status]}`}
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="font-semibold text-slate-900">
                    Doctor: {doctor?.name}
                  </p>
                  <p className="text-sm text-slate-600">
                    Especialidad: {appointment.specialty ?? doctor?.specialty ?? "No indicada"}
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
                  <p className="mt-2 text-sm font-semibold">
                    Estado: {statusLabel[appointment.status]}
                  </p>
                  {appointment.status === "confirmed" && (
                    <p className="mt-2 rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-800">
                      Cita confirmada por doctor
                    </p>
                  )}
                </div>

                {appointment.status !== "cancelled" && (
                  <button
                    onClick={() => setAppointmentToCancel(appointment)}
                    className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                  >
                    Cancelar cita
                  </button>
                )}

                {appointment.status === "cancelled" && (
                  <div className="flex flex-col gap-3 sm:items-end">
                    <button
                      type="button"
                      onClick={() => handleDeleteCancelledRequest(appointment.id)}
                      className="w-full rounded-lg bg-slate-700 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                    >
                      Eliminar solicitud
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRequestAnotherSchedule(appointment)}
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white sm:w-auto"
                    >
                      Solicitar otro horario
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      <Modal
        isOpen={Boolean(appointmentToCancel)}
        title="Cancelar cita"
        onClose={() => setAppointmentToCancel(null)}
      >
        <p className="text-slate-700">¿Realmente deseas cancelar tu cita?</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setAppointmentToCancel(null)}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
          >
            No
          </button>
          <button
            type="button"
            onClick={confirmCancel}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Sí, cancelar
          </button>
        </div>
      </Modal>
      </section>
    </>
  );
}
