import { Suspense } from "react";
import { StreamingMetricsSkeleton } from "@/components/home/StreamingMetricsSekeleton";
import { StreamingMetricsSection } from "@/components/home/StreamingMetricsSection";

export function StreamingMetricsClient() {
  return (
    <Suspense fallback={<StreamingMetricsSkeleton />}>
      <StreamingMetricsSection />
    </Suspense>
  );
}
