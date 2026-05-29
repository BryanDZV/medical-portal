export function CardSkeleton() {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border border-slate-100
                bg-white
                p-5
                shadow-sm
            "
        >
            <div className="animate-pulse space-y-4">
                <div className="h-4 w-24 rounded-full bg-slate-200" />

                <div className="h-10 w-16 rounded-xl bg-slate-200" />

                <div className="h-3 w-40 rounded-full bg-slate-100" />
            </div>
        </div>
    );
}