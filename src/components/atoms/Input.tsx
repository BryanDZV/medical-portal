import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Input({
    className = "",
    ...props
}: InputProps) {
    return (
        <input
            className={`
                w-full
                rounded-lg
                border border-border
                bg-surface
                px-4
                py-2
                text-sm
                outline-none
                transition-colors
                duration-200
                focus:border-primary
                focus:ring-2
                focus:ring-primary
                hover:border-slate-300
                ${className}
        `}
            {...props}
        />
    );
}
