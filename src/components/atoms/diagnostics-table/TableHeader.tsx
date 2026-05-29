"use client";

import { useDiagnosticsTable } from "@/contexts/DiagnosticsTableContext";
import type { DiagnosticsTableFilters } from "@/types/diagnostics.types";

interface TableHeaderProps {
  field: DiagnosticsTableFilters["sortBy"];
  label: string;
}

export function TableHeader({ field, label }: TableHeaderProps) {
  const { filters, toggleSort } = useDiagnosticsTable();
  const isActive = filters.sortBy === field;
  const isAsc = isActive && filters.sortOrder === "asc";

  return (
    <th
      scope="col"
      aria-sort={!isActive ? "none" : isAsc ? "ascending" : "descending"}
      className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
    >
      <button
        type="button"
        onClick={() => toggleSort(field)}
        className="inline-flex items-center gap-2 rounded-md px-1 py-1 transition hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
      >
        {label}
        <span aria-hidden="true" className="text-slate-400">
          {!isActive ? "<>" : isAsc ? "↑" : "↓"}
        </span>
      </button>
    </th>
  );
}
