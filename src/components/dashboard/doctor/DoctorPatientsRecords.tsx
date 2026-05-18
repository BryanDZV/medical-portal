// src/components/dashboard/DoctorPatientsRecords.tsx

"use client";

import { useCallback, useState } from "react";
import type { MedicalRecord } from "@/types/medical-record.types";
import type { User } from "@/types/user.types";
import { SearchBar } from "@/components/molecules/SearchBar";
import { CreateMedicalRecordForm } from "@/components/dashboard/doctor/CreateMedicalRecordForm";
import { DiagnosticsTable } from "@/components/dashboard/doctor/DiagnosticsTable";
import { mockDoctors } from "@/data/mockDoctors";
import { mockPatients } from "@/data/mockPatients";
import { useMedicalRecordStore } from "@/store/useMedicalRecordStore";
import { useDebouncedCachedSearch } from "@/hooks/useDebouncedCachedSearch";

interface DoctorPatientsRecordsProps {
  user: User;
}

export function DoctorPatientsRecords({ user }: DoctorPatientsRecordsProps) {
  const records = useMedicalRecordStore((state) => state.records);
  const doctor = mockDoctors.find((doctor) => doctor.userId === user.id);
  const [query, setQuery] = useState("");
  // Aplicamos debouncing para evitar filtrados en cada pulsación de teclado.

  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [activeView, setActiveView] = useState<"none" | "create" | "view">(
    "none",
  );


  const patientFilter = useCallback(
    (patient: (typeof mockPatients)[number], normalizedQuery: string) =>
      patient.name.toLocaleLowerCase("es-ES").includes(normalizedQuery),
    [],
  );

  const {
    results: visiblePatients,
    normalizedQuery,
  } = useDebouncedCachedSearch({
    query,
    items: mockPatients,
    filter: patientFilter,
    delay: 350,
  });


  if (!doctor) return null;

  const selectedPatient = mockPatients.find(
    (patient) => patient.id === selectedPatientId,
  );

  const handleEditRecord = (record: MedicalRecord) => {
    setEditingRecord(record);
    setActiveView("create");
    setShowDiagnostics(false);
  };

  const handleShowDiagnostics = () => {
    setActiveView("view");
    setShowDiagnostics(true);
    setEditingRecord(null);
  };

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Pacientes - Ver expedientes
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Busca pacientes por nombre, consulta expedientes y crea nuevos
            informes acumulables.
          </p>
        </div>
        <SearchBar
          id="patient-search"
          label="Buscar paciente"
          value={query}
          onChange={setQuery}
          placeholder="Buscar paciente por nombre"
        />
      </div>

      {normalizedQuery && (
        <div className="mt-6">
          {visiblePatients.length === 0 && (
            <p className="rounded-xl border border-slate-200 p-4 text-sm text-slate-600">
              No hay pacientes atendidos que coincidan.
            </p>
          )}

          {visiblePatients.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {visiblePatients.map((patient) => (
                <button
                  key={patient.id}
                  type="button"
                  onClick={() => {
                    setSelectedPatientId(patient.id);
                    setShowDiagnostics(false);
                  }}
                  className={`min-w-65 shrink-0 rounded-xl border p-4 text-left transition ${selectedPatientId === patient.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <p className="font-semibold text-slate-900">{patient.name}</p>
                  <p className="text-sm text-slate-600">
                    {patient.age} años · {patient.phone}
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    {
                      records.filter((record) => record.patientId === patient.id)
                        .length
                    }{" "}
                    expedientes
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 rounded-xl border border-slate-200 p-4 sm:rounded-2xl sm:p-5">
        {!selectedPatient && (
          <p className="text-sm text-slate-600">
            Selecciona un paciente para crear expediente y revisar sus
            diagnósticos.
          </p>
        )}

        {selectedPatient && (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedPatient.name}
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedPatient.age} años · {selectedPatient.phone} · {" "}
                  {records.filter((r) => r.patientId === selectedPatient.id)
                    .length} expedientes
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setActiveView("create");
                    setShowDiagnostics(false);
                  setEditingRecord(null);
                  }}
                  className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Crear expediente
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveView("view");
                    setShowDiagnostics(true);
                  setEditingRecord(null);
                  }}
                  className="w-full sm:w-auto rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Ver diagnósticos
                </button>
              </div>
            </div>

            <div className="mt-5">
              {activeView === "create" && (
                <CreateMedicalRecordForm
                  user={user}
                  selectedPatientId={selectedPatient.id}
                  editingRecord={editingRecord}
                  onShowDiagnostics={handleShowDiagnostics}
                />

              )}

              {activeView === "view" && showDiagnostics && (
                <div id="diagnostics-visualization">
                  <DiagnosticsTable
                    selectedPatientId={selectedPatient.id}
                    onEditRecord={handleEditRecord}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}


