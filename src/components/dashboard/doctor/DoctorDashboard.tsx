// src/components/dashboard/DoctorDashboard.tsx

"use client";

import { useState } from "react";

import type { User } from "../../../types/user.types";
import Link from "next/link";

import { DoctorMetricsGrid } from "./DoctorMetricsGrid";
import { GranularErrorBoundary } from "@/components/atoms/GranularErrorBoundary";
import dynamic from "next/dynamic";
import { ProfileAvatar } from "../ProfileAvatar";

const ProfileEditModal = dynamic(
  () => import("../ProfileEditModal").then((mod) => mod.ProfileEditModal),
  { ssr: false }
);
import { Button } from "@/components/atoms/Button";
import { NavBarForUsers } from "../../layout/NavBarForUsers";

interface DoctorDashboardProps {
  user: User;
}

const getProfileImageKey = (userId: string) => `profile-image:${userId}`;

export function DoctorDashboard({ user }: DoctorDashboardProps) {
  // Estado para controlar apertura/cierre del modal
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 pt-25 sm:px-6">
      <section className="mx-auto w-full sm:max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <div className="flex items-center gap-4">
            <ProfileAvatar
              name={user.name}
              profileKey={getProfileImageKey(user.id)}
              className="h-16 w-16 sm:h-20 sm:w-20"
            />

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Perfil profesional
              </p>
              <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                Bienvenido Dr. {user.name}
              </h1>
            </div>
          </div>

          <Button className="w-full sm:w-auto" onClick={() => setIsProfileModalOpen(true)}>
            Editar perfil
          </Button>
        </div>
        <NavBarForUsers />

        <GranularErrorBoundary>
          <DoctorMetricsGrid user={user} />
        </GranularErrorBoundary>

        {/* Accesos Rápidos - Hub de Navegación */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <Link
            href="/dashboard/appointments"
            prefetch={false}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-blue-500 hover:shadow-md hover:ring-1 hover:ring-blue-500"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-700">Gestión de Citas</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Revisa tu agenda diaria, confirma solicitudes pendientes o cancela citas de tus pacientes de forma rápida.
            </p>
          </Link>

          <Link
            href="/dashboard/patients"
            prefetch={false}
            className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-sky-500 hover:shadow-md hover:ring-1 hover:ring-sky-500"
          >
            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-sky-700">Pacientes y Expedientes</h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Busca pacientes, visualiza historiales en tablas avanzadas y crea expedientes médicos paso a paso.
            </p>
          </Link>
        </div>

        {/* Modal edición perfil */}
        <ProfileEditModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
          initialName={user.name}
          initialEmail={user.email}
          profileKey={getProfileImageKey(user.id)}
        />
      </section>
    </main>
  );
}
