"use client";

import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";

export function FilterPanel() {
  const { filters, doctorOptions, updateFilters, clearFilters, setPageSize } =
    useDiagnosticsTable();

  return (
    <section
      aria-labelledby="diagnostics-filters-title"
      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h4
          id="diagnostics-filters-title"
          className="text-sm font-semibold text-slate-900"
        >
          Filtros avanzados
        </h4>
        <button
          type="button"
          onClick={clearFilters}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:w-auto"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label className="text-xs font-semibold text-slate-700">
          Buscar diagnóstico o notas
          <input
            type="search"
            value={filters.query}
            onChange={(event) => updateFilters({ query: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            placeholder="Ej. hipertensión"
          />
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Buscar en prescripciones
          <input
            type="search"
            value={filters.prescriptionQuery}
            onChange={(event) =>
              updateFilters({ prescriptionQuery: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
            placeholder="Ej. ibuprofeno"
          />
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Doctor
          <select
            value={filters.doctorId}
            onChange={(event) =>
              updateFilters({ doctorId: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <option value="all">Todos</option>
            {doctorOptions.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Fecha desde
          <input
            type="date"
            value={filters.dateFrom ?? ""}
            onChange={(event) =>
              updateFilters({ dateFrom: event.target.value })
            }
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Fecha hasta
          <input
            type="date"
            value={filters.dateTo ?? ""}
            onChange={(event) => updateFilters({ dateTo: event.target.value })}
            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          />
        </label>

        <label className="text-xs font-semibold text-slate-700">
          Filas por página
          <select
            value={filters.pageSize}
            onChange={(event) =>
              setPageSize(event.target.value as "5" | "10" | "20")
            }
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
    </section>
  );
}
