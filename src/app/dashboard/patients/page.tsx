"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavBarForUsers } from "@/components/layout/NavBarForUsers";
import { DoctorPatientsRecords } from "@/components/dashboard/doctor/DoctorPatientsRecords";

export default function DashboardPatientsPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    if (status === "authenticated" && user?.role !== "doctor") {
      router.push("/dashboard");
    }
  }, [router, status, user?.role]);

  if (status === "loading") return null;
  if (!user) return null;
  if (user.role !== "doctor") return null;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 pt-25 sm:px-6">
      <section className="mx-auto w-full sm:max-w-6xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Pacientes y expedientes
          </h1>
        </div>

        <NavBarForUsers showDashboardLink />

        <DoctorPatientsRecords user={user} />
      </section>
    </main>
  );
}
