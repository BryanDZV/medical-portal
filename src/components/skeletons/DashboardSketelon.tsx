import { DashboardMetricsSkeleton } from "./DashboardMetricsSkeleton";

export function DashboardSkeleton() {
    return (
        <main className="min-h-screen bg-slate-50 px-6 py-10">
            <section className="mx-auto max-w-6xl">
                <div className="animate-pulse">
                    <div className="mb-4 h-10 w-72 rounded-2xl bg-slate-200" />

                    <div className="mb-8 h-4 w-96 rounded-full bg-slate-100" />
                </div>

                <DashboardMetricsSkeleton />

                <section className="mt-8 grid gap-6 lg:grid-cols-2">
                    <div
                        className="
                            h-80
                            rounded-3xl
                            border border-slate-100
                            bg-white
                            shadow-sm
                            animate-pulse
                        "
                    />

                    <div
                        className="
                            h-80
                            rounded-3xl
                            border border-slate-100
                            bg-white
                            shadow-sm
                            animate-pulse
                        "
                    />
                </section>
            </section>
        </main>
    );
}