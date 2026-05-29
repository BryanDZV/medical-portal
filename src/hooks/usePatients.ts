"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchPatients } from "@/services/patient.service";
import { patientFiltersSchema } from "@/lib/validations/patient.schema";
import type { PatientFilters } from "@/lib/validations/patient.schema";

export function usePatients(filters: PatientFilters) {
  const queryClient = useQueryClient();

  // Normalizamos y coercemos los filtros con Zod para obtener valores
  // predecibles y evitar que cambios de identidad de objeto provoquen
  // refetchs innecesarios en React Query.
  const normalized = patientFiltersSchema.parse(filters);
  const { page, limit, search, minAge, maxAge } = normalized;

  // 1. Evitamos que la queryKey cambie por culpa de objetos nuevos o valores 'undefined'.
  const queryKey = [
    "patients",
    page,
    limit,
    search ?? "",
    minAge ?? null,
    maxAge ?? null,
  ];

  const query = useQuery({
    queryKey,
    queryFn: ({ signal }) => fetchPatients(normalized, signal),
    // Delega el error al GranularErrorBoundary más cercano en el árbol de componentes
    throwOnError: true,
  });

  // 2.  Prefetching Defensivo
  useEffect(() => {
    // Solo precargamos SI y SOLO SI la query actual fue exitosa.
    // Evitamos bombardear al servidor si ya está devolviendo errores.
    if (
      query.isSuccess &&
      query.data?.metadata.totalPages &&
      page < query.data.metadata.totalPages
    ) {
      const next = { page: page + 1, limit, search, minAge, maxAge };
      const nextKey = [
        "patients",
        next.page,
        next.limit,
        next.search ?? "",
        next.minAge ?? null,
        next.maxAge ?? null,
      ];

      queryClient.prefetchQuery({
        queryKey: nextKey,
        queryFn: ({ signal }) => fetchPatients(next, signal),
        // Le damos un staleTime explícito para asegurar que la precarga viva
        staleTime: 1000 * 60,
      });
    }
  }, [
    page,
    limit,
    search,
    minAge,
    maxAge,
    query.isSuccess,
    query.data?.metadata.totalPages,
    queryClient,
  ]);

  // 3. (Accesibilidad y UX):
  // Exponemos datos derivados pre-calculados para que la UI no tenga que pensar.
  const a11yMessage = query.isLoading
    ? "Buscando pacientes, por favor espere."
    : query.isError
      ? "Error al comunicar con el servidor. Intente de nuevo."
      : query.data
        ? `Lista actualizada. Mostrando página ${query.data.metadata.page} de ${query.data.metadata.totalPages}.`
        : "";

  return {
    ...query,
    // Helper booleano seguro para mostrar la UI de "No hay resultados"
    isEmpty: query.isSuccess && query.data.data.length === 0,
    a11yMessage,
  };
}
