import { DashboardPageClient } from "@/components/dashboard/patients/DashboardPageClient";

const STREAMING_DELAY_MS = 1000;

export async function StreamingDashboardSection() {
  await new Promise((resolve) => setTimeout(resolve, STREAMING_DELAY_MS));

  return <DashboardPageClient />;
}
