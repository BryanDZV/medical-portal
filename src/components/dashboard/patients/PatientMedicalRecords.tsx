// src/components/dashboard/PatientMedicalRecords.tsx

"use client";

import type { User } from "@/types/user.types";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import { generateMedicalRecordPdf } from "@/lib/pdf/generateMedicalRecordPdf";

interface PatientMedicalRecordsProps {
  user: User;
}

export function PatientMedicalRecords({ user }: PatientMedicalRecordsProps) {
  const records = useMedicalRecordStore((state) => state.records);
  const patient = mockPatients.find((patient) => patient.userId === user.id);

  if (!patient) return null;

  const patientRecords = records.filter((record) => record.patientId === patient.id);

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <h2 className="text-2xl font-bold text-slate-900">Mis expedientes médicos</h2>

      <div className="mt-5 space-y-4">
        {patientRecords.length === 0 && (
          <p className="text-sm text-slate-600">Aún no tienes expedientes creados por un médico.</p>
        )}

        {patientRecords.map((record) => {
          const doctor = mockDoctors.find((doctor) => doctor.id === record.doctorId);

          return (
            <article key={record.id} className="rounded-xl border border-slate-200 p-3 min-w-0 sm:p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between min-w-0">
                <p className="text-sm font-semibold text-slate-500">
                  {new Date(record.createdAt).toLocaleString()} · Dr. {doctor?.name ?? "Sin asignar"}
                </p>
                <button
                  type="button"
                  onClick={() => generateMedicalRecordPdf({ record, patient, doctor })}
                  className="inline-flex w-full shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-sm font-semibold text-sky-800 transition hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 sm:w-auto"
                >
                  Descargar expediente
                </button>
              </div>
              <h3 className="mt-2 text-lg font-bold text-slate-900 wrap-break-word">{record.diagnosis}</h3>
              <p className="mt-2 text-sm text-slate-700 whitespace-normal wrap-break-word overflow-wrap-anywhere">
                {record.notes}
              </p>
              <p className="mt-2 text-sm text-slate-600 wrap-break-word">
                <span className="font-semibold">Prescripción:</span>{' '}
                <span className="wrap-break-word">{record.prescriptions.join(", ")}</span>
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
