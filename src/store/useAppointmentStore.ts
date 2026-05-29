// src/store/useAppointmentStore.ts

"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  createAppointmentSchema,
  type CreateAppointmentPayload,
} from "../lib/validations/appointment.schema";
import type {
  Appointment,
  AppointmentStatus,
} from "../types/appointment.types";
import { mockAppointments } from "../data/mockAppointments";

interface AppointmentState {
  appointments: Appointment[];
  hasHydrated: boolean;

  setAppointments: (appointments: Appointment[]) => void;
  createAppointment: (payload: CreateAppointmentPayload) => Appointment;
  // Actualiza el estado de una cita aplicando optimistic update.
  // La UI cambia inmediatamente y puede revertirse si falla la operación.
  updateAppointmentStatus: (
    appointmentId: string,
    status: AppointmentStatus,
  ) => Promise<void>;
  deleteAppointment: (appointmentId: string) => void;
  getAppointmentsByPatientId: (patientId: string) => Appointment[];
  getAppointmentsByDoctorId: (doctorId: string) => Appointment[];
  setHasHydrated: (value: boolean) => void;
}

export const useAppointmentStore = create<AppointmentState>()(
  persist(
    (set, get) => ({
      appointments: mockAppointments,
      hasHydrated: false,

      setAppointments: (appointments) => {
        set({ appointments });
      },

      createAppointment: (rawPayload) => {
        const payload = createAppointmentSchema.parse(rawPayload);

        const requestedStart = new Date(payload.startTime).getTime();
        const requestedEnd = new Date(payload.endTime).getTime();

        const hasCollision = get().appointments.some((existingAppointment) => {
          if (existingAppointment.doctorId !== payload.doctorId) return false;
          if (existingAppointment.status === "cancelled") return false;

          const existingStart = new Date(
            existingAppointment.startTime,
          ).getTime();
          const existingEnd = new Date(existingAppointment.endTime).getTime();

          return requestedStart < existingEnd && requestedEnd > existingStart;
        });

        if (hasCollision) {
          throw new Error(
            "El doctor ya tiene una cita programada en este horario o se solapa con otra.",
          );
        }

        const newAppointment: Appointment = {
          id: crypto.randomUUID(),
          ...payload,
          status: "pending",
        };

        set((state) => ({
          appointments: [...state.appointments, newAppointment],
        }));

        return newAppointment;
      },

      updateAppointmentStatus: async (appointmentId, status) => {
        // Guardamos una copia del estado actual antes de modificarlo.
        // Esto nos permite volver atrás si la actualización falla.
        const previousAppointments = get().appointments;

        // Optimistic update: actualizamos la UI inmediatamente
        set((state) => ({
          appointments: state.appointments.map((appointment) =>
            appointment.id === appointmentId
              ? { ...appointment, status }
              : appointment,
          ),
        }));

        try {
          // Simulación de una operación asíncrona. (Aquí iría la llamada real al backend/API.)
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch {
          // Rollback:si la operación falla, restauramos el estado anterior.
          set({ appointments: previousAppointments });

          throw new Error("No se pudo actualizar el estado de la cita.");
        }
      },

      deleteAppointment: (appointmentId) => {
        set((state) => ({
          appointments: state.appointments.filter(
            (appointment) => appointment.id !== appointmentId,
          ),
        }));
      },

      getAppointmentsByPatientId: (patientId) => {
        return get().appointments.filter(
          (appointment) => appointment.patientId === patientId,
        );
      },

      getAppointmentsByDoctorId: (doctorId) => {
        return get().appointments.filter(
          (appointment) => appointment.doctorId === doctorId,
        );
      },

      setHasHydrated: (value) => {
        set({ hasHydrated: value });
      },
    }),
    {
      name: "medical-appointments",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ appointments: state.appointments }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
