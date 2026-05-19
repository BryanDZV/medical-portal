export const ROLES = ["admin", "doctor", "patient"] as const;

export type Role = (typeof ROLES)[number];

export function isRole(value: unknown): value is Role {
  return (
    typeof value === "string" && (ROLES as readonly string[]).includes(value)
  );
}

export interface MedicalJwtPayload {
  // Campos típicos de un JWT para autenticación
  userId: string;
  role: Role;
  // Añadimos el índice signature por si la librería jose inyecta claims como 'exp' o 'iat'
  [key: string]: unknown;
}
