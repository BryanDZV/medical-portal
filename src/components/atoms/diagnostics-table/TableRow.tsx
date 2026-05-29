"use client";

import type { MedicalRecord } from "@/types/medical-record.types";
import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";

interface TableRowProps {
  record: MedicalRecord;
  onEditRecord: (record: MedicalRecord) => void;
  onShowNotes: (record: MedicalRecord) => void;
}

export function TableRow({ record, onEditRecord, onShowNotes }: TableRowProps) {
  const { getDoctorName, deleteRecord } = useDiagnosticsTable();

  return (
    <tr className="border-t border-slate-100 transition hover:bg-slate-50 motion-safe:duration-150">
      <td className="px-4 py-3 text-sm text-slate-700">
        {new Date(record.createdAt).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 text-sm font-semibold text-slate-900">
        {record.diagnosis}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700 align-top">
        <div className="whitespace-normal wrap-break-word max-w-[40ch] md:max-w-[60ch]">
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

          {record.notes && record.notes.length > 120 && (
            <button
              type="button"
              onClick={() => onShowNotes(record)}
              className="mt-2 inline-block text-xs font-semibold text-sky-600 underline"
              aria-label={`Ver notas completas de registro ${record.id}`}
            >
              Leer más
            </button>
          )}
        </div>
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {record.prescriptions.join(", ") || "Sin prescripción"}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        {getDoctorName(record.doctorId)}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onEditRecord(record)}
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2"
          >
            Modificar
          </button>
          <button
            type="button"
            onClick={() => deleteRecord(record.id)}
            className="rounded-lg bg-red-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
          >
            Eliminar
          </button>
        </div>
      </td>
    </tr>
  );
}
