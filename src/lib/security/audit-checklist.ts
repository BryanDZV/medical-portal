export const securityAuditChecklist = [
  "No exponer contraseñas en datos mock del cliente",
  "No registrar tokens ni datos médicos en consola",
  "No guardar información médica sensible en localStorage",
  "No hardcodear secrets en el código fuente",
  "Usar variables de entorno para claves sensibles",
  "Evitar mensajes técnicos detallados en errores de autenticación",
  "Aplicar headers de seguridad globales",
  "Sanitizar búsquedas, nombres de pacientes y notas médicas",
] as const;
