// COMPLEJIDAD PREVENTIVA: Usamos 'unknown' para obligarnos a verificar el tipo en tiempo de ejecución
import DOMPurify from "isomorphic-dompurify";

export function sanitizeText(value: unknown): string {
  // 1. Defensa contra null, undefined, números u objetos
  if (typeof value !== "string") return "";
  // 2. Primero delegamos en DOMPurify para eliminar cualquier tag/HTML.
  // Usamos una lista blanca vacía para asegurarnos de que no queden tags.
  let cleaned: string;
  if (value.includes("<")) {
    cleaned = DOMPurify.sanitize(value, { ALLOWED_TAGS: [] });
  } else {
    cleaned = value;
  }

  // 3. Normalizamos el texto: trim, remover caracteres de control y colapsar espacios.
  cleaned = cleaned
    .trim()
    .replace(/[\x00-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ");

  return cleaned;
}

export function sanitizeSearchQuery(value: unknown): string {
  const sanitized = sanitizeText(value);
  // Un buscador no necesita más de 100 caracteres. Protege contra ataques de denegación de servicio (DoS) en la base de datos.
  return sanitized.length > 100 ? sanitized.slice(0, 100) : sanitized;
}

export function sanitizePatientName(value: unknown): string {
  const sanitized = sanitizeText(value);
  return sanitized.length > 80 ? sanitized.slice(0, 80) : sanitized;
}

export function sanitizeMedicalNote(value: unknown): string {
  const sanitized = sanitizeText(value);

  // Si cortamos una nota, debemos avisar visualmente que el texto continúa.
  if (sanitized.length > 1000) {
    // Cortamos en 997 y añadimos 3 puntos para mantener el límite exacto de 1000
    return sanitized.slice(0, 997) + "...";
  }

  return sanitized;
}
