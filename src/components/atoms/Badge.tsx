import React from "react";

type BadgeProps = {
    children: React.ReactNode;
    variant?: "primary" | "success" | "warning" | "danger";
};

export function Badge({
    children,
    variant = "primary",
}: BadgeProps) {
    const variantStyles = {
        primary:
            "bg-primary/10 text-primary",

        success:
            "bg-green-100 text-green-700",

        warning:
            "bg-yellow-100 text-yellow-700",

        danger:
            "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`
            inline-flex
            items-center
            rounded-full
            px-3
            py-1
            text-xs
            font-medium
            ${variantStyles[variant]}
        `}
        >
            {children}
        </span>
    );
}