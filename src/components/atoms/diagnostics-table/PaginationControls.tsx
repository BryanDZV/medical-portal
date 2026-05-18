"use client";

import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";

export function PaginationControls() {
  const { filters, totalPages, filteredCount, setPage } = useDiagnosticsTable();

  return (
    <nav
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
      aria-label="Paginación de diagnósticos"
    >
      <p className="text-xs text-slate-600">
        Página {filters.page} de {totalPages} · {filteredCount} resultado(s)
      </p>
      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={() => setPage(filters.page - 1)}
          disabled={filters.page <= 1}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:w-auto"
        >
          Anterior
        </button>
        <button
          type="button"
          onClick={() => setPage(filters.page + 1)}
          disabled={filters.page >= totalPages}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:w-auto"
        >
          Siguiente
        </button>
      </div>
    </nav>
  );
}
