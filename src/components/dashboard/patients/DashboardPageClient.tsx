"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { DoctorDashboard } from "@/components/dashboard/doctor/DoctorDashboard";
import { PatientDashboard } from "@/components/dashboard/patients/PatientDashboard";

export function DashboardPageClient() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  if (status === "loading") return null;
  if (!user) return null;

  return (
    <>
      {user.role === "doctor" ? (
        <DoctorDashboard user={user} />
      ) : (
        <PatientDashboard user={user} />
      )}
    </>
  );
}
