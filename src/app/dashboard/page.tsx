import { Suspense } from "react";
import { DashboardSkeleton } from "@/components/skeletons/DashboardSketelon";
import { StreamingDashboardSection } from "@/components/dashboard/StreamingDashboardSection";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <StreamingDashboardSection />
    </Suspense>
  );
}
