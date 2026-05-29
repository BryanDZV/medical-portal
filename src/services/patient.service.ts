import { mockPatients } from "@/data/mockPatients";
import {
  paginatedPatientsSchema,
  type PatientFilters,
  type PaginatedPatients,
} from "@/lib/validations/patient.schema";

// Simulador de latencia de red (500ms) con soporte AbortSignal
const delay = (ms: number, signal?: AbortSignal) =>
  new Promise<void>((resolve, reject) => {
    if (signal?.aborted)
      return reject(new DOMException("Aborted", "AbortError"));
    const t = setTimeout(() => resolve(), ms);
    const onAbort = () => {
      clearTimeout(t);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });

export async function fetchPatients(
  filters: PatientFilters,
  signal: AbortSignal,
): Promise<PaginatedPatients> {
  await delay(500, signal);

  let filteredData = [...mockPatients];

  // 1. Saneamiento del buscador
  if (filters.search) {
    const searchTerm = filters.search.trim().toLowerCase();

    // Evitamos buscar strings vacíos si el usuario solo tecleó espacios "   "
    if (searchTerm) {
      filteredData = filteredData.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.phone.includes(searchTerm),
      );
    }
  }

  // 2. Aplicar filtros de edad
  if (filters.minAge !== undefined) {
    filteredData = filteredData.filter((p) => p.age >= filters.minAge!);
  }
  if (filters.maxAge !== undefined) {
    filteredData = filteredData.filter((p) => p.age <= filters.maxAge!);
  }

  // 3. Ordenamiento Determinista (Indispensable para paginar)
  // Ordenamos por nombre alfabéticamente. En BD real, sería un ORDER BY name ASC.
  filteredData.sort((a, b) => a.name.localeCompare(b.name));

  // 4. Paginación Resiliente
  const total = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(total / filters.limit)); // Nunca será 0

  // Si piden una página mayor a la que existe, los contenemos en la última válida
  const safePage = Math.min(Math.max(1, filters.page), totalPages);

  const startIndex = (safePage - 1) * filters.limit;
  const endIndex = startIndex + filters.limit;

  const paginatedData = filteredData.slice(startIndex, endIndex);

  // 5. Construir respuesta con la página saneada
  const rawResponse = {
    data: paginatedData,
    metadata: {
      total,
      page: safePage,
      limit: filters.limit,
      totalPages,
    },
  };

  // 6. VALIDACIÓN CON ZOD
  return paginatedPatientsSchema.parse(rawResponse);
}
