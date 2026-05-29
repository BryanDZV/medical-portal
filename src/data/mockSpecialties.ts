export const mockSpecialties = [
  "Cardiología",
  "Dermatología",
  "Pediatría",
  "Ginecología y Obstetricia",
  "Anestesiología y Reanimación",
  "Cirugía General",
  "Endocrinología",
  "Neurología",
  "Traumatología y Ortopedia",
  "Gastroenterología / Aparato Digestivo",
  "Medicina Interna",
  "Oftalmología",
  "Otorrinolaringología",
  "Neumología",
  "Psiquiatría",
  "Urología",
  "Oncología Médica",
  "Reumatología",
  "Nefrología",
  "Alergología",
] as const;

export type MedicalSpecialty = (typeof mockSpecialties)[number];
