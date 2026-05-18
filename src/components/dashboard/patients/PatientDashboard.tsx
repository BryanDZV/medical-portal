"use client";

// src/components/dashboard/PatientDashboard.tsx

import { useState } from "react";
import type { User } from "../../../types/user.types";
import { NavBarForUsers } from "../../layout/NavBarForUsers";
import { PatientMetricsGrid } from "./PatientMetricsGrid";
import { GranularErrorBoundary } from "@/components/atoms/GranularErrorBoundary";
import dynamic from "next/dynamic";

const ProfileEditModal = dynamic(
  () => import("../ProfileEditModal").then((mod) => mod.ProfileEditModal),
  { ssr: false }
);
import { Button } from "@/components/atoms/Button";
import Link from "next/link";

interface PatientDashboardProps {
  user: User;
}

export function PatientDashboard({ user }: PatientDashboardProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 pt-25 sm:px-6">
      <section className="mx-auto w-full sm:max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Bienvenido {user.name}
          </h1>

          <Button className="w-full sm:w-auto" onClick={() => setIsProfileModalOpen(true)}>
            Editar perfil
          </Button>
        </div>
        <NavBarForUsers />
        

        <GranularErrorBoundary>
          <PatientMetricsGrid user={user} />
        </GranularErrorBoundary>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/dashboard/request"
            prefetch={false}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-500 hover:shadow-md hover:ring-1 hover:ring-blue-500"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m6-6H6"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700">
              Solicitar cita
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Busca especialidad, selecciona medico y reserva un nuevo horario.
            </p>
          </Link>

          <Link
            href="/dashboard/appointments"
            prefetch={false}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-sky-500 hover:shadow-md hover:ring-1 hover:ring-sky-500"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700">
              Mis citas
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Revisa tus citas pendientes, confirmadas o completadas.
            </p>
          </Link>

          <Link
            href="/dashboard/records"
            prefetch={false}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-emerald-500 hover:shadow-md hover:ring-1 hover:ring-emerald-500"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 11.625h4.5m-4.5 2.25h7.5m-7.5-10.5h7.5m-7.5 4.5h7.5"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-emerald-700">
              Mis expedientes
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Consulta tus registros clinicos y el detalle de visitas.
            </p>
          </Link>
        </div>

        <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          initialName={user.name}
          initialEmail={user.email}
        />
      </section>
    </main>
  );
}
