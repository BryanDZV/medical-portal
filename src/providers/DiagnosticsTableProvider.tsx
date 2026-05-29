"use client";

import { useMemo, useState } from "react";
import { mockDoctors } from "@/data/mockDoctors";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import type { MedicalRecord } from "@/types/medical-record.types";
import { diagnosticsTableFiltersSchema } from "@/lib/validations/diagnostics-table.schema";
import type {
  DiagnosticsTableFilters,
  DiagnosticsTableContextType,
  DiagnosticsDoctorOption,
} from "@/types/diagnostics.types";
import { DiagnosticsTableContext } from "@/contexts/DiagnosticsTableContext";

interface DiagnosticsTableProviderProps {
  selectedPatientId: string;
  children: React.ReactNode;
}

const DEFAULT_FILTERS: DiagnosticsTableFilters =
  diagnosticsTableFiltersSchema.parse({});

export function DiagnosticsTableProvider({
  selectedPatientId,
  children,
}: DiagnosticsTableProviderProps) {
  const records = useMedicalRecordStore((state) => state.records);
  const deleteRecord = useMedicalRecordStore((state) => state.deleteRecord);
  const [filters, setFilters] =
    useState<DiagnosticsTableFilters>(DEFAULT_FILTERS);

  const doctorOptions = useMemo<DiagnosticsDoctorOption[]>(() => {
    return mockDoctors.map((doctor) => ({ id: doctor.id, name: doctor.name }));
  }, []);

  const selectedPatientRecords = useMemo(() => {
    return records.filter((record) => record.patientId === selectedPatientId);
  }, [records, selectedPatientId]);

  const filteredRecords = useMemo(() => {
    const query = filters.query.toLowerCase();
    const prescriptionQuery = filters.prescriptionQuery.toLowerCase();
    const hasDateFrom = Boolean(filters.dateFrom);
    const hasDateTo = Boolean(filters.dateTo);

    const withFilters = selectedPatientRecords.filter((record) => {
      const createdAtDate = new Date(record.createdAt);
      const diagnosisMatch = record.diagnosis.toLowerCase().includes(query);
      const notesMatch = record.notes.toLowerCase().includes(query);
      const doctorMatch =
        filters.doctorId === "all" || record.doctorId === filters.doctorId;
      const prescriptionMatch =
        prescriptionQuery.length === 0 ||
        record.prescriptions.some((prescription) =>
          prescription.toLowerCase().includes(prescriptionQuery),
        );

      const fromMatch =
        !hasDateFrom ||
        createdAtDate >= new Date(`${filters.dateFrom}T00:00:00`);
      const toMatch =
        !hasDateTo || createdAtDate <= new Date(`${filters.dateTo}T23:59:59`);

      return (
        (query.length === 0 || diagnosisMatch || notesMatch) &&
        doctorMatch &&
        prescriptionMatch &&
        fromMatch &&
        toMatch
      );
    });

    const sorted = [...withFilters].sort((a, b) => {
      const direction = filters.sortOrder === "asc" ? 1 : -1;

      if (filters.sortBy === "diagnosis") {
        return a.diagnosis.localeCompare(b.diagnosis) * direction;
      }

      if (filters.sortBy === "doctor") {
        const doctorA =
          mockDoctors.find((doctor) => doctor.id === a.doctorId)?.name ?? "";
        const doctorB =
          mockDoctors.find((doctor) => doctor.id === b.doctorId)?.name ?? "";
        return doctorA.localeCompare(doctorB) * direction;
      }

      return (
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        direction
      );
    });

    return sorted;
  }, [filters, selectedPatientRecords]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRecords.length / Number(filters.pageSize)),
  );

  const safePage = Math.min(filters.page, totalPages);

  const paginatedRecords = useMemo<MedicalRecord[]>(() => {
    const pageSize = Number(filters.pageSize);
    const offset = (safePage - 1) * pageSize;

    return filteredRecords.slice(offset, offset + pageSize);
  }, [filteredRecords, filters.pageSize, safePage]);

  const updateFilters = (updates: Partial<DiagnosticsTableFilters>) => {
    setFilters((prev) =>
      diagnosticsTableFiltersSchema.parse({
        ...prev,
        ...updates,
        page: 1,
      }),
    );
  };

  const setPage = (page: number) => {
    setFilters((prev) =>
      diagnosticsTableFiltersSchema.parse({
        ...prev,
        page,
      }),
    );
  };

  const setPageSize = (pageSize: DiagnosticsTableFilters["pageSize"]) => {
    setFilters((prev) =>
      diagnosticsTableFiltersSchema.parse({
        ...prev,
        pageSize,
        page: 1,
      }),
    );
  };

  const clearFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSort = (field: DiagnosticsTableFilters["sortBy"]) => {
    setFilters((prev) => {
      const nextOrder =
        prev.sortBy === field && prev.sortOrder === "asc" ? "desc" : "asc";

      return diagnosticsTableFiltersSchema.parse({
        ...prev,
        sortBy: field,
        sortOrder: nextOrder,
      });
    });
  };

  const getDoctorName = (doctorId: string) => {
    return (
      mockDoctors.find((doctor) => doctor.id === doctorId)?.name ??
      "No asignado"
    );
  };

  const contextValue: DiagnosticsTableContextType = {
    filters: {
      ...filters,
      page: safePage,
    },
    totalCount: selectedPatientRecords.length,
    filteredCount: filteredRecords.length,
    totalPages,
    paginatedRecords,
    doctorOptions,
    setPage,
    setPageSize,
    updateFilters,
    clearFilters,
    toggleSort,
    getDoctorName,
    deleteRecord,
  };

  return (
    <DiagnosticsTableContext.Provider value={contextValue}>
      {children}
    </DiagnosticsTableContext.Provider>
  );
}
