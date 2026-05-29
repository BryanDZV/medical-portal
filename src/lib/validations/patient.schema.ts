import { z } from "zod";

// Esquema  contra datos "raros" o sucios
export const patientSchema = z.object({
  // 1. Validamos que el ID tenga un formato razonable y no esté vacío
  id: z.string().min(1, "ID inválido"),

  userId: z.string(),

  // 2. SANEAMIENTO:
  // transform() estandariza la capitalización por si la API envía "cArLos"
  name: z
    .string()
    .trim()
    .min(2, "Nombre demasiado corto")
    .transform((name) => {
      // Opcional: Capitalizar primera letra para uniformidad visual
      return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    }),

  // 3. COERCIÓN: Si la API manda {"age": "34"}, Zod lo convierte al número 34.
  // límites lógicos médicos para detectar basura en la DB.
  age: z.coerce
    .number()
    .int("La edad debe ser un número entero")
    .nonnegative("La edad no puede ser negativa")
    .max(130, "Edad fuera del límite biológico"),

  // 4. REGEX:
  // Acepta formato internacional o nacional con espacios/guiones.
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9\s\-]{9,15}$/,
      "Formato de teléfono inválido (debe tener entre 9 y 15 dígitos)",
    )
    // Fallback: Si el teléfono falla la validación, en lugar de romper toda la tabla,
    // interceptamos el error y devolvemos un valor seguro.
    .catch("Teléfono no disponible"),
});

// Esquema de paginación asegurado
export const paginatedPatientsSchema = z.object({
  // Si un paciente falla, se convierte en 'null' gracias al catch.
  // Luego, el transform filtra todos los 'null' de la lista de forma silenciosa.
  data: z
    .array(patientSchema.nullable().catch(null))
    .transform((arr) =>
      arr.filter((item): item is PatientResponse => item !== null),
    ),
  metadata: z.object({
    total: z.coerce.number().nonnegative(),
    page: z.coerce.number().positive(),
    limit: z.coerce.number().positive(),
    totalPages: z.coerce.number().nonnegative(),
  }),
});

// Tipos inferidos automáticamente por Zod
export type PatientResponse = z.infer<typeof patientSchema>;
export type PaginatedPatients = z.infer<typeof paginatedPatientsSchema>;

// Esquema para los filtros de búsqueda
export const patientFiltersSchema = z.object({
  search: z.string().optional(),
  minAge: z.coerce.number().nonnegative().optional(),
  maxAge: z.coerce.number().nonnegative().optional(),
  page: z.coerce.number().positive().catch(1), // Si la UI envía una página inválida, forzamos a 1
  limit: z.coerce.number().positive().catch(10),
});

export type PatientFilters = z.infer<typeof patientFiltersSchema>;
