import React from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    onClose: () => void;
    size?: "md" | "lg" | "xl";
};

export function Modal({
    isOpen,
    title,
    subtitle,
    children,
    onClose,
    size = "md",
}: ModalProps) {
    if (!isOpen) return null;

    const sizeClasses = {
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
            <div
                className={`
                    max-h-[92vh] w-full ${sizeClasses[size]}
                    overflow-hidden rounded-3xl
                    border border-white/40
                    bg-white
                    shadow-2xl
        `}
            >
                <header className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                        {subtitle && (
                            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-slate-500 shadow-md transition-colors hover:bg-slate-100 hover:text-slate-900"
                    >
                        ×
                    </button>
                </header>

                <div className="max-h-[70vh] overflow-y-auto px-8 py-7">
                    {children}
                </div>
            </div>
        </div>
    );
}