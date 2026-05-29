"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavBarForUsers } from "@/components/layout/NavBarForUsers";
import { PatientMedicalRecords } from "@/components/dashboard/patients/PatientMedicalRecords";

export default function DashboardRecordsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && user?.role !== "patient") {
      router.push("/acceso-denegado");
    }
  }, [router, status, user?.role]);

  if (status === "loading") return null;
  if (!user) return null;
  if (user.role !== "patient") return null;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 pt-25 sm:px-6">
      <section className="mx-auto w-full sm:max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Mis expedientes</h1>
        </div>

        <NavBarForUsers showDashboardLink />

        <PatientMedicalRecords user={user} />
      </section>
    </main>
  );
}
