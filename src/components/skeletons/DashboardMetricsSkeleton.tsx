import { CardSkeleton } from "./CardSkeleton";

export function DashboardMetricsSkeleton() {
    return (
        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </section>
    );
}