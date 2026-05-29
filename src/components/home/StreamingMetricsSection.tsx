import { HomeMetricsSection } from "@/components/home/HomeMetricsSection";
import { getPublicMetrics } from "@/services/getPublicMetrics";

/**
 * Server Component asíncrono.
 * Suspende el render hasta resolver los datos y permite que Next.js
 * haga streaming del fallback definido con <Suspense />.
 */
export async function StreamingMetricsSection() {
  const metrics = await getPublicMetrics();

  return (
    <HomeMetricsSection
      initialPatientsAttended={metrics.attendedPatients}
      initialProfessionalSpecialties={metrics.professionalSpecialties}
      initialFacilities={metrics.facilities}
    />
  );
}
