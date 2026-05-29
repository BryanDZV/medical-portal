"use client";

import { useEffect, useMemo, useState } from "react";

interface DebouncedCachedSearchOptions<T> {
  query: string;
  items: readonly T[];
  filter: (item: T, normalizedQuery: string) => boolean;
  delay?: number;
}

export function useDebouncedCachedSearch<T>({
  query,
  items,
  filter,
  delay = 300,
}: DebouncedCachedSearchOptions<T>) {
  // Estado local para almacenar el término de búsqueda con retraso (debounce)
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      // Solo actualiza el estado si el usuario deja de escribir durante el tiempo definido
      setDebouncedQuery(query);
    }, delay);

    return () => window.clearTimeout(timeoutId);
  }, [delay, query]);

  const normalizedQuery = debouncedQuery.trim().toLocaleLowerCase("es-ES");
  const isSearching = query !== debouncedQuery;

  // Memoizamos los resultados. En React, `useMemo` es la forma oficial de "cachear" 
  // cálculos locales. Se re-calculará de forma automática y segura SOLO si el 
  // texto de búsqueda, el array de items o la función de filtro cambian.
  const results = useMemo(() => {
    return normalizedQuery
      ? items.filter((item) => filter(item, normalizedQuery))
      : items;
  }, [filter, items, normalizedQuery]);

  return {
    debouncedQuery,
    normalizedQuery,
    results,
    isSearching,
  };
}
