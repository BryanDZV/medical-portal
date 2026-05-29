// src/components/dashboard/CreateAppointmentForm.tsx

"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Appointment } from "@/types/appointment.types";
import type { User } from "@/types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { mockSpecialties } from "@/data/mockSpecialties";
import { useDebouncedCachedSearch } from "@/hooks/useDebouncedCachedSearch";
import { useAppointmentStore } from "@/store/useAppointmentStore";

interface CreateAppointmentFormProps {
  user: User;
}

function getCurrentDateTimeLocal() {
  const now = new Date();
  now.setSeconds(0, 0);
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 16);
}

export function CreateAppointmentForm({ user }: CreateAppointmentFormProps) {
  const appointments = useAppointmentStore((state) => state.appointments);
  const createAppointment = useAppointmentStore(
    (state) => state.createAppointment,
  );

  const patient = mockPatients.find((patient) => patient.userId === user.id);

  const [specialtyQuery, setSpecialtyQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isSpecialtyPanelOpen, setIsSpecialtyPanelOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");

  const minDateTime = useMemo(() => getCurrentDateTimeLocal(), []);

  useEffect(() => {
    const handleRescheduleRequest = (event: Event) => {
      const appointment = (event as CustomEvent<Appointment>).detail;

      if (!appointment) return;

      setSelectedSpecialty(appointment.specialty);
      setSpecialtyQuery(appointment.specialty);
      setIsSpecialtyPanelOpen(false);
      setDoctorId(appointment.doctorId);
      setStartTime("");
      setReason(appointment.reason);
      setMessage("Selecciona un nuevo día y horario para reenviar la solicitud.");
    };

    window.addEventListener("appointment:reschedule", handleRescheduleRequest);

    return () => {
      window.removeEventListener(
        "appointment:reschedule",
        handleRescheduleRequest,
      );
    };
  }, []);

  const getEndTime = (value: string) => {
    const endDate = new Date(value);
    endDate.setMinutes(endDate.getMinutes() + 30);
    return endDate.toISOString();
  };

  const specialtyFilter = useCallback(
    (specialty: string, normalizedQuery: string) =>
      specialty.toLocaleLowerCase("es-ES").includes(normalizedQuery),
    [],
  );

  const { results: specialtyResults, isSearching: isSpecialtySearching } =
    useDebouncedCachedSearch({
      query: specialtyQuery,
      items: mockSpecialties,
      filter: specialtyFilter,
      delay: 350,
    });

  const availableDoctors = useMemo(
    () =>
      mockDoctors.filter((doctor) => doctor.specialty === selectedSpecialty),
    [selectedSpecialty],
  );

  const selectedDoctor = mockDoctors.find((doctor) => doctor.id === doctorId);

  const bookedSlots = appointments.filter(
    (appointment) =>
      appointment.doctorId === doctorId && appointment.status !== "cancelled",
  );

  const isBooked = bookedSlots.some((appointment) => {
    if (!startTime) return false;

    const requestedStart = new Date(startTime).getTime();
    const requestedEnd = new Date(getEndTime(startTime)).getTime();
    const existingStart = new Date(appointment.startTime).getTime();
    const existingEnd = new Date(appointment.endTime).getTime();

    return requestedStart < existingEnd && requestedEnd > existingStart;
  });

  const hasAppointmentSummary = Boolean(
    selectedSpecialty && doctorId && startTime && reason.trim(),
  );

  const handleSpecialtySelection = (specialty: string) => {
    setSelectedSpecialty(specialty);
    setSpecialtyQuery(specialty);
    setDoctorId("");
    setStartTime("");
    setMessage("");
    setIsSpecialtyPanelOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!patient) {
      setMessage("No se encontró el perfil del paciente");
      return;
    }

    if (!selectedSpecialty || !doctorId || !startTime || !reason.trim()) {
      setMessage(
        "Selecciona especialidad, médico, fecha y describe el motivo de la cita",
      );
      return;
    }

    if (new Date(startTime) < new Date(minDateTime)) {
      setMessage("No puedes pedir una cita anterior al día y hora actual");
      return;
    }

    if (isBooked) {
      setMessage("Ese horario ya está ocupado para este doctor");
      return;
    }

    try {
      createAppointment({
        patientId: patient.id,
        doctorId,
        specialty: selectedSpecialty,
        startTime: new Date(startTime).toISOString(),
        endTime: getEndTime(startTime),
        reason,
      });

      setSpecialtyQuery("");
      setSelectedSpecialty("");
      setDoctorId("");
      setStartTime("");
      setReason("");
      setMessage("");
      setToast("Cita concretada correctamente");
      window.setTimeout(() => setToast(""), 3000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se ha podido crear la cita",
      );
    }
  };

  return (
    <>
      {toast && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-semibold text-green-700 shadow-lg">
          {toast}
        </div>
      )}

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Busque la especialidad...
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Escribe el área médica que necesitas y selecciona una coincidencia.
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="relative">
            <input
              role="combobox"
              aria-label="Buscar especialidad"
              type="search"
              value={specialtyQuery}
              onFocus={() => {
                if (specialtyQuery.trim()) setIsSpecialtyPanelOpen(true);
              }}
              onChange={(event) => {
                setSpecialtyQuery(event.target.value);
                setSelectedSpecialty("");
                setDoctorId("");
                setStartTime("");
                setMessage("");
                setIsSpecialtyPanelOpen(Boolean(event.target.value.trim()));
              }}
              placeholder="Ej.: Cardiología, Neurología, Pediatría..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3"
              aria-expanded={isSpecialtyPanelOpen}
              aria-controls="specialty-search-panel"
            />

            {isSpecialtyPanelOpen && specialtyQuery.trim() && (
              <div
                id="specialty-search-panel"
                className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
              >
                {isSpecialtySearching ? (
                  <div className="flex items-center gap-3 px-4 py-4 text-sm font-medium text-slate-600">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-sky-600" />
                    Buscando especialidades...
                  </div>
                ) : specialtyResults.length > 0 ? (
                  <div className="max-h-72 overflow-y-auto py-2">
                    {specialtyResults.map((specialty) => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => handleSpecialtySelection(specialty)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-slate-800 transition hover:bg-sky-50 hover:text-sky-800"
                      >
                        <span>{specialty}</span>
                        {/* <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                          Seleccionar
                        </span> */}
                      </button>
                    ))}
                  </div>
                ) : (
                  <p className="px-4 py-4 text-sm font-medium text-amber-800">
                    No hay especialidades que coincidan con la búsqueda.
                  </p>
                )}
              </div>
            )}
          </div>

          {selectedSpecialty && (
            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm font-semibold text-sky-900">
              Especialidad seleccionada: {selectedSpecialty}
            </div>
          )}
        </div>
      </section>

      <form
        id="create-appointment-form"
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-slate-900">Solicitar cita</h2>

        <div className="mt-5 grid gap-4">
          {selectedSpecialty && (
            <select
              value={doctorId}
              aria-label="Seleccionar médico"
              onChange={(event) => {
                setDoctorId(event.target.value);
                setStartTime("");
                setMessage("");
              }}
              className="rounded-xl border border-slate-300 px-4 py-3"
            >
              <option value="">
                Selecciona un médico de {selectedSpecialty}
              </option>

              {availableDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name} - {doctor.specialty}
                </option>
              ))}
            </select>
          )}

          {selectedSpecialty && availableDoctors.length === 0 && (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
              No hay médicos disponibles para esta especialidad.
            </p>
          )}

          {doctorId && (
            <input
              type="datetime-local"
              aria-label="Fecha y hora de la cita"
              value={startTime}
              min={minDateTime}
              onChange={(event) => {
                setStartTime(event.target.value);
                setMessage("");
              }}
              className="rounded-xl border border-slate-300 px-4 py-3"
            />
          )}

          {doctorId && bookedSlots.length > 0 && (
            <p className="text-sm text-slate-600">
              Horarios ocupados:{" "}
              {bookedSlots
                .map((slot) => new Date(slot.startTime).toLocaleString())
                .join(" · ")}
            </p>
          )}

          {doctorId && (
            <textarea
              value={reason}
              aria-label="Motivo de la cita detallado"
              onChange={(event) => {
                setReason(event.target.value);
                setMessage("");
              }}
              placeholder="Motivo de la cita"
              className="min-h-28 rounded-xl border border-slate-300 px-4 py-3"
            />
          )}

          {hasAppointmentSummary && (
            <article className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-800">
              <h3 className="text-base font-bold text-slate-900">
                Resumen de la cita
              </h3>
              <p className="mt-2">
                <span className="font-semibold">Especialidad:</span>{" "}
                {selectedSpecialty}
              </p>
              <p>
                <span className="font-semibold">Médico:</span>{" "}
                {selectedDoctor?.name ?? "No seleccionado"}
              </p>
              <p>
                <span className="font-semibold">Fecha:</span>{" "}
                {new Date(startTime).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Motivo:</span> {reason}
              </p>
            </article>
          )}

          {message && (
            <p className="text-sm font-medium text-red-600">{message}</p>
          )}

          <button
            type="submit"
            disabled={!hasAppointmentSummary}
            className="rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Pedir cita
          </button>
        </div>
      </form>
    </>
  );
}
