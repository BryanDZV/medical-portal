"use client";

import { DiagnosticsTableProvider } from "@/providers/DiagnosticsTableProvider";
import { FilterPanel } from "@/components/atoms/diagnostics-table/FilterPanel";
import { TableHeader } from "@/components/atoms/diagnostics-table/TableHeader";
import { TableRow } from "@/components/atoms/diagnostics-table/TableRow";
import { PaginationControls } from "@/components/atoms/diagnostics-table/PaginationControls";
import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";
import { useState, useRef, useEffect } from "react";
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
  const {
    paginatedRecords,
    totalCount,
    filteredCount,
    getDoctorName,
    deleteRecord,
  } = useDiagnosticsTable();
  const [expandedRecord, setExpandedRecord] = useState<MedicalRecord | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5"
      aria-labelledby="diagnostics-table-title"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3
            id="diagnostics-table-title"
            className="text-lg font-bold text-slate-900 sm:text-xl"
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

      <div className="mt-4 sm:hidden">
        {paginatedRecords.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
            No hay diagnósticos que coincidan con los filtros actuales.
          </div>
        )}

        {paginatedRecords.length > 0 && (
          <ul className="space-y-3">
            {paginatedRecords.map((record) => (
              <li
                key={record.id}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Diagnóstico
                    </p>
                    <p className="text-base font-semibold text-slate-900">
                      {record.diagnosis}
                    </p>
                    <p className="mt-1 text-xs text-slate-600">
                      {new Date(record.createdAt).toLocaleDateString()} · {getDoctorName(record.doctorId)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Notas
                    </p>
                    <div className="mt-1 text-sm text-slate-700">
                      <div
                        className="overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {record.notes}
                      </div>
                    </div>
                    {record.notes && record.notes.length > 120 && (
                      <button
                        type="button"
                        onClick={() => setExpandedRecord(record)}
                        className="mt-2 inline-flex text-xs font-semibold text-sky-600 underline"
                      >
                        Leer más
                      </button>
                    )}
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Prescripciones
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {record.prescriptions.join(", ") || "Sin prescripción"}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => onEditRecord(record)}
                      className="w-full rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white"
                    >
                      Modificar
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRecord(record.id)}
                      className="w-full rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-4 hidden overflow-x-auto rounded-xl border border-slate-200 sm:block">
        <table className="min-w-720px divide-y divide-slate-200" role="table">
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
