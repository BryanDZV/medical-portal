export function LoginSkeleton() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
            <section
                className="
                    w-full
                    max-w-md
                    rounded-3xl
                    border border-slate-100
                    bg-white
                    p-8
                    shadow-sm
                "
            >
                <div className="animate-pulse">
                    <div className="mb-8 flex flex-col items-center">
                        <div className="mb-4 h-14 w-14 rounded-2xl bg-slate-200" />

                        <div className="mb-2 h-6 w-40 rounded-full bg-slate-200" />

                        <div className="h-4 w-56 rounded-full bg-slate-100" />
                    </div>

                    <div className="space-y-4">
                        <div className="h-12 rounded-2xl bg-slate-100" />

                        <div className="h-12 rounded-2xl bg-slate-100" />

                        <div className="mt-6 h-12 rounded-2xl bg-slate-200" />
                    </div>
                </div>
            </section>
        </main>
    );
}