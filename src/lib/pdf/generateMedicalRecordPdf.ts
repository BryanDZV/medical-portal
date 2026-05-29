import hospitalLogo from "@/assets/logo-remove.png";
import type { Doctor } from "@/types/doctor.types";
import type { MedicalRecord } from "@/types/medical-record.types";
import type { Patient } from "@/types/patient.types";

interface GenerateMedicalRecordPdfParams {
  record: MedicalRecord;
  patient: Patient;
  doctor?: Doctor;
}

const HOSPITAL = {
  name: "Salud Conecta",
  address: "Avenida de la Salud, 24",
  city: "28015 Madrid, España",
  phone: "+34 910 000 000",
  email: "informacion@saludconecta.example",
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es-ES")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function loadLogoImage(): Promise<HTMLImageElement | null> {
  const logoSrc = typeof hospitalLogo === "string" ? hospitalLogo : hospitalLogo.src;

  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = logoSrc;
  });
}

function ensureSpace(
  pdf: import("jspdf").jsPDF,
  currentY: number,
  requiredHeight: number,
) {
  const pageHeight = pdf.internal.pageSize.getHeight();
  const bottomMargin = 18;

  if (currentY + requiredHeight <= pageHeight - bottomMargin) {
    return currentY;
  }

  pdf.addPage();
  return 20;
}

function writeMultilineField(
  pdf: import("jspdf").jsPDF,
  label: string,
  value: string,
  currentY: number,
  maxWidth = 170,
) {
  const safeValue = value.trim() || "No indicado";
  const lines = pdf.splitTextToSize(safeValue, maxWidth);
  const fieldHeight = 8 + lines.length * 6;
  const y = ensureSpace(pdf, currentY, fieldHeight);

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.setTextColor(30, 41, 59);
  pdf.text(label, 20, y);

  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(51, 65, 85);
  pdf.text(lines, 20, y + 6);

  return y + fieldHeight;
}

export async function generateMedicalRecordPdf({
  record,
  patient,
  doctor,
}: GenerateMedicalRecordPdfParams) {
  const [{ jsPDF }, logo] = await Promise.all([
    import("jspdf"),
    loadLogoImage(),
  ]);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  let y = 10;

  // Cabecera del centro
  if (logo) {
    pdf.addImage(logo, "PNG", 20, y, 42, 40, undefined, "FAST");
  }

  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.setTextColor(15, 23, 42);
  pdf.text(HOSPITAL.name, logo ? 70 : 20, y + 8);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(71, 85, 105);
  pdf.text(HOSPITAL.address, logo ? 70 : 20, y + 14);
  pdf.text(HOSPITAL.city, logo ? 70 : 20, y + 19);
  pdf.text(`${HOSPITAL.phone} · ${HOSPITAL.email}`, logo ? 70 : 20, y + 24);

  y += 36;
  pdf.setDrawColor(203, 213, 225);
  pdf.line(20, y, pageWidth - 20, y);
  y += 12;

  // Título del documento
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);
  pdf.setTextColor(15, 23, 42);
  pdf.text("Expediente médico", 20, y);
  y += 9;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(9);
  pdf.setTextColor(71, 85, 105);
  pdf.text(`Identificador: ${record.id}`, 20, y);
  y += 11;

  // Datos del paciente
  pdf.setFillColor(241, 245, 249);
  pdf.roundedRect(20, y - 5, pageWidth - 40, 34, 3, 3, "F");
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.setTextColor(15, 23, 42);
  pdf.text("Datos del paciente", 25, y + 3);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Nombre: ${patient.name}`, 25, y + 11);
  pdf.text(`Edad: ${patient.age} años`, 25, y + 18);
  pdf.text(`Teléfono: ${patient.phone}`, 25, y + 25);
  y += 43;

  // Datos asistenciales
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(12);
  pdf.setTextColor(15, 23, 42);
  pdf.text("Información asistencial", 20, y);
  y += 8;

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(51, 65, 85);
  pdf.text(`Médico responsable: Dr./Dra. ${doctor?.name ?? "No asignado"}`, 20, y);
  y += 7;
  pdf.text(`Especialidad: ${doctor?.specialty ?? "No disponible"}`, 20, y);
  y += 7;
  pdf.text(`Fecha de prescripción: ${formatDate(record.createdAt)}`, 20, y);
  y += 12;

  y = writeMultilineField(pdf, "Diagnóstico", record.diagnosis, y);
  y = writeMultilineField(pdf, "Descripción clínica", record.notes, y);
  y = writeMultilineField(
    pdf,
    "Prescripción / receta",
    record.prescriptions.length > 0 ? record.prescriptions.join(", ") : "Sin prescripción",
    y,
  );

  y = ensureSpace(pdf, y + 2, 24);
  pdf.setDrawColor(203, 213, 225);
  pdf.line(20, y, pageWidth - 20, y);
  y += 8;
  pdf.setFont("helvetica", "italic");
  pdf.setFontSize(8.5);
  pdf.setTextColor(100, 116, 139);
  const footer = pdf.splitTextToSize(
    "Documento generado desde el área de paciente. Su contenido reproduce los datos del expediente registrado por el profesional sanitario y no sustituye documentación clínica firmada oficialmente.",
    pageWidth - 40,
  );
  pdf.text(footer, 20, y);

  const fileName = `expediente-${slugify(patient.name)}-${record.createdAt.slice(0, 10)}.pdf`;
  pdf.save(fileName);
}
