import type { MedicalRecord } from "./medical-record.types";

export interface DiagnosticsTableFilters {
  query: string;
  prescriptionQuery: string;
  doctorId: string;
  dateFrom?: string;
  dateTo?: string;
  sortBy: "createdAt" | "diagnosis" | "doctor";
  sortOrder: "asc" | "desc";
  page: number;
  pageSize: "5" | "10" | "20";
}

export interface DiagnosticsDoctorOption {
  id: string;
  name: string;
}

export interface DiagnosticsTableContextType {
  filters: DiagnosticsTableFilters;
  totalCount: number;
  filteredCount: number;
  totalPages: number;
  paginatedRecords: MedicalRecord[];
  doctorOptions: DiagnosticsDoctorOption[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: DiagnosticsTableFilters["pageSize"]) => void;
  updateFilters: (updates: Partial<DiagnosticsTableFilters>) => void;
  clearFilters: () => void;
  toggleSort: (field: DiagnosticsTableFilters["sortBy"]) => void;
  getDoctorName: (doctorId: string) => string;
  deleteRecord: (recordId: string) => void;
}
