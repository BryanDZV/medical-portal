"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { NavBarForUsers } from "@/components/layout/NavBarForUsers";
import { CreateAppointmentForm } from "@/components/dashboard/doctor/CreateAppointmentForm";

export default function DashboardRequestPage() {
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
    <main className="min-h-screen bg-slate-100 px-6 py-10 pt-25">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-slate-900">
            Solicitar cita
          </h1>
        </div>

        <NavBarForUsers showDashboardLink />

        <CreateAppointmentForm user={user} />
      </section>
    </main>
  );
}
