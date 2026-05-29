// src/store/useMedicalRecordStore.ts

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MedicalRecord } from "@/types/medical-record.types";
import { mockMedicalRecords } from "@/data/mockMedicalRecords";

interface MedicalRecordState {
  records: MedicalRecord[];
  hasHydrated: boolean;
  createRecord: (record: MedicalRecord) => void;
  updateRecord: (
    recordId: string,
    data: Omit<MedicalRecord, "id" | "patientId" | "doctorId" | "createdAt">,
  ) => void;
  deleteRecord: (recordId: string) => void;
  getRecordsByPatientId: (patientId: string) => MedicalRecord[];
  setHasHydrated: (value: boolean) => void;
}

export const useMedicalRecordStore = create<MedicalRecordState>()(
  persist(
    (set, get) => ({
      records: mockMedicalRecords,
      hasHydrated: false,

      createRecord: (record) => {
        set((state) => ({ records: [record, ...state.records] }));
      },

      updateRecord: (recordId, data) => {
        set((state) => ({
          records: state.records.map((record) =>
            record.id === recordId ? { ...record, ...data } : record,
          ),
        }));
      },

      deleteRecord: (recordId) => {
        set((state) => ({
          records: state.records.filter((record) => record.id !== recordId),
        }));
      },

      getRecordsByPatientId: (patientId) => {
        return get().records.filter((record) => record.patientId === patientId);
      },

      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "medsync-medical-records",
      partialize: (state) => ({ records: state.records }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
