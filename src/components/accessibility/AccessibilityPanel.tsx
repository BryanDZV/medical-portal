"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function AccessibilityPanel() {
    const [open, setOpen] = useState(false);
    const [fontScale, setFontScale] = useState(1);
    const [contrastLevel, setContrastLevel] = useState(1);

    useEffect(() => {
        document.documentElement.style.setProperty("--font-scale", fontScale.toString());
    }, [fontScale]);

    useEffect(() => {
        document.documentElement.style.setProperty("--text-contrast", contrastLevel.toString());

        if (contrastLevel > 1) {
            document.documentElement.classList.add("a11y-contrast");
        } else {
            document.documentElement.classList.remove("a11y-contrast");
        }
    }, [contrastLevel]);

    return (
        <div className="fixed bottom-4 right-16 z-9999">
            <button
                onClick={() => setOpen(!open)}
                aria-label="Abrir opciones de accesibilidad"
                aria-expanded={open}
                className="
                    fixed
                    bottom-3
                    right-16
                    z-9999
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-primary
                    shadow-lg
                    transition-all
                    duration-200
                    hover:scale-105
                    hover:shadow-xl
                "
            >
                <Image
                    src="/image.png"
                    alt="Accesibilidad"
                    width={50}
                    height={50}
                    priority
                    className="object-contain"
                />
            </button>

            {open && (
                <section
                    aria-label="Panel de accesibilidad"
                    className="absolute bottom-14 right-0 w-64 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl backdrop-blur"
                >
                    <h2 className="mb-4 text-sm font-bold text-slate-900">
                        Accesibilidad
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-xl font-bold text-slate-600">A</span>
                                <span className="text-3xl font-bold text-slate-700">A</span>
                            </div>

                            <input
                                type="range"
                                min="0.9"
                                max="1.4"
                                step="0.1"
                                value={fontScale}
                                onChange={(e) => setFontScale(Number(e.target.value))}
                                aria-label="Ajustar tamaño del texto"
                                className="a11y-slider w-full"
                            />
                        </div>

                        <div>
                            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
                                <span>Contraste bajo</span>
                                <span>Alto</span>
                            </div>

                            <input
                                type="range"
                                min="1"
                                max="1.5"
                                step="0.1"
                                value={contrastLevel}
                                onChange={(e) => setContrastLevel(Number(e.target.value))}
                                aria-label="Ajustar contraste del texto"
                                className="a11y-slider w-full"
                            />
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}