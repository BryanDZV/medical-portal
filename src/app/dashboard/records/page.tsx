"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { NavBarForUsers } from "@/components/layout/NavBarForUsers";
import { PatientMedicalRecords } from "@/components/dashboard/patients/PatientMedicalRecords";

export default function DashboardRecordsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  useEffect(() => {
    if (hasHydrated && !user) {
      router.push("/login");
      return;
    }

    if (hasHydrated && user?.role !== "patient") {
      router.push("/dashboard");
    }
  }, [hasHydrated, user, router]);

  if (!hasHydrated) return null;
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
