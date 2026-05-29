import { z } from "zod";
import { sanitizeSearchQuery } from "@/lib/security/sanitize";
import type { DiagnosticsTableFilters } from "@/types/diagnostics.types";

const optionalDateSchema = z
  .string()
  .trim()
  .optional()
  .transform((value) => (value ? value : undefined));

export const diagnosticsTableFiltersSchema = z.object({
  query: z
    .string()
    .optional()
    .transform((value) => sanitizeSearchQuery(value ?? "")),
  prescriptionQuery: z
    .string()
    .optional()
    .transform((value) => sanitizeSearchQuery(value ?? "")),
  doctorId: z.string().optional().default("all"),
  dateFrom: optionalDateSchema,
  dateTo: optionalDateSchema,
  sortBy: z.enum(["createdAt", "diagnosis", "doctor"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
  page: z.number().int().min(1).default(1),
  pageSize: z.enum(["5", "10", "20"]).default("5"),
});

export type { DiagnosticsTableFilters };
