"use client";

import { DiagnosticsTableProvider } from "@/providers/DiagnosticsTableProvider";
import { FilterPanel } from "@/components/atoms/diagnostics-table/FilterPanel";
import { TableHeader } from "@/components/atoms/diagnostics-table/TableHeader";
import { TableRow } from "@/components/atoms/diagnostics-table/TableRow";
import { PaginationControls } from "@/components/atoms/diagnostics-table/PaginationControls";
import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";
import { useState } from "react";
import type { MedicalRecord } from "@/types/medical-record.types";

interface DiagnosticsTableProps {
  selectedPatientId: string;
  onEditRecord: (record: MedicalRecord) => void;
}

function DiagnosticsTableContent({
  onEditRecord,
}: {
  onEditRecord: (record: MedicalRecord) => void;
}) {
  const { paginatedRecords, totalCount, filteredCount } = useDiagnosticsTable();
  const [expandedRecord, setExpandedRecord] = useState<MedicalRecord | null>(null);

  return (
    <section
      className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
      aria-labelledby="diagnostics-table-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3
            id="diagnostics-table-title"
            className="text-xl font-bold text-slate-900"
          >
            Visualización de diagnósticos
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Tabla con filtros avanzados, ordenamiento y paginación para revisar
            historial clínico.
          </p>
        </div>
        <p className="text-xs text-slate-600" aria-live="polite">
          Mostrando {paginatedRecords.length} de {filteredCount} filtrados (de{" "}
          {totalCount} total)
        </p>
      </div>

      <div className="mt-4">
        <FilterPanel />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200" role="table">
          <caption className="sr-only">
            Tabla de diagnósticos del paciente
          </caption>
          <thead className="bg-slate-50">
            <tr>
              <TableHeader field="createdAt" label="Fecha" />
              <TableHeader field="diagnosis" label="Diagnóstico" />
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Notas
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Prescripciones
              </th>
              <TableHeader field="doctor" label="Doctor" />
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {paginatedRecords.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-sm text-slate-600"
                >
                  No hay diagnósticos que coincidan con los filtros actuales.
                </td>
              </tr>
            )}
            {paginatedRecords.map((record) => (
              <TableRow
                key={record.id}
                record={record}
                onEditRecord={onEditRecord}
                onShowNotes={(r) => setExpandedRecord(r)}
              />
            ))}
          </tbody>
        </table>
      </div>

      <PaginationControls />

      {expandedRecord && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="min-w-0">
              <h4 className="text-lg font-bold text-slate-900">Notas completas</h4>
              <p className="mt-2 text-sm text-slate-700 whitespace-pre-wrap wrap-break-word overflow-wrap-anywhere">
                {expandedRecord.notes}
              </p>

              <div className="mt-3 text-sm text-slate-700">
                <strong>Prescripciones:</strong>
                <div className="mt-1 wrap-break-word">
                  {expandedRecord.prescriptions.join(", ") || "Sin prescripción"}
                </div>
              </div>
            </div>

            <div className="md:ml-4 md:shrink-0">
              <button
                onClick={() => setExpandedRecord(null)}
                className="w-full md:w-auto rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export function DiagnosticsTable({
  selectedPatientId,
  onEditRecord,
}: DiagnosticsTableProps) {
  return (
    <DiagnosticsTableProvider selectedPatientId={selectedPatientId}>
      <DiagnosticsTableContent onEditRecord={onEditRecord} />
    </DiagnosticsTableProvider>
  );
}
