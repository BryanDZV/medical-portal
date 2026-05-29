import type { MedicalSpecialty } from "@/data/mockSpecialties";

export interface SpecialtyService {
  specialty: MedicalSpecialty;
  description: string;
}

export const mockSpecialtyServices: SpecialtyService[] = [
  {
    specialty: "Cardiología",
    description:
      "Prevención, diagnóstico y seguimiento de enfermedades del corazón y del sistema circulatorio.",
  },
  {
    specialty: "Dermatología",
    description:
      "Atención de enfermedades de la piel, el cabello, las uñas y otras alteraciones cutáneas.",
  },
  {
    specialty: "Pediatría",
    description:
      "Cuidado integral de bebés, niños y adolescentes durante todas sus etapas de crecimiento.",
  },
  {
    specialty: "Ginecología y Obstetricia",
    description:
      "Salud reproductiva femenina, control del embarazo, parto y revisiones ginecológicas.",
  },
  {
    specialty: "Anestesiología y Reanimación",
    description:
      "Manejo de la anestesia, control del dolor y soporte clínico durante procedimientos médicos.",
  },
  {
    specialty: "Cirugía General",
    description:
      "Diagnóstico y tratamiento quirúrgico de patologías frecuentes del abdomen y tejidos blandos.",
  },
  {
    specialty: "Endocrinología",
    description:
      "Estudio y tratamiento de trastornos hormonales, metabólicos y enfermedades como la diabetes.",
  },
  {
    specialty: "Neurología",
    description:
      "Diagnóstico de enfermedades del sistema nervioso, como migrañas, epilepsia o alteraciones de memoria.",
  },
  {
    specialty: "Traumatología y Ortopedia",
    description:
      "Atención de lesiones en huesos, músculos, articulaciones y problemas del aparato locomotor.",
  },
  {
    specialty: "Gastroenterología / Aparato Digestivo",
    description:
      "Prevención y tratamiento de enfermedades del estómago, intestino, hígado y aparato digestivo.",
  },
  {
    specialty: "Medicina Interna",
    description:
      "Valoración integral de pacientes adultos con enfermedades complejas o múltiples.",
  },
  {
    specialty: "Oftalmología",
    description:
      "Evaluación, prevención y tratamiento de problemas visuales y enfermedades oculares.",
  },
  {
    specialty: "Otorrinolaringología",
    description:
      "Atención especializada del oído, nariz, garganta, voz y equilibrio.",
  },
  {
    specialty: "Neumología",
    description:
      "Diagnóstico y seguimiento de enfermedades respiratorias y pulmonares.",
  },
  {
    specialty: "Psiquiatría",
    description:
      "Evaluación y tratamiento médico de trastornos mentales, emocionales y conductuales.",
  },
  {
    specialty: "Urología",
    description:
      "Estudio y tratamiento del aparato urinario y del sistema reproductor masculino.",
  },
  {
    specialty: "Oncología Médica",
    description:
      "Abordaje clínico, tratamiento y seguimiento de pacientes con enfermedades oncológicas.",
  },
  {
    specialty: "Reumatología",
    description:
      "Atención de enfermedades articulares, inflamatorias, autoinmunes y musculoesqueléticas.",
  },
  {
    specialty: "Nefrología",
    description:
      "Diagnóstico y control de enfermedades renales y alteraciones de la función del riñón.",
  },
  {
    specialty: "Alergología",
    description:
      "Estudio de alergias respiratorias, alimentarias, cutáneas y reacciones a medicamentos.",
  },
];