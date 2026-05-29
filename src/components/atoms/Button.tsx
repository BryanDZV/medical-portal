import React from "react";
import Link from "next/link";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger" | "success";
    size?: "sm" | "md" | "lg";
    asLink?: string;
    prefetch?: boolean;
};

export function Button({
    children,
    variant = "primary",
    size = "md",
    className = "",
    type = "button",
    asLink,
    prefetch,
    ...props
}: ButtonProps) {
    const baseStyles =
        "rounded-lg font-medium motion-safe:transition-transform motion-safe:duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

    const variantStyles = {
        primary:
            "bg-primary text-white hover:opacity-90",

        secondary:
            "bg-secondary text-secondary-foreground hover:opacity-90",

        danger:
            "bg-danger text-white hover:opacity-90",

        success:
            "bg-green-600 text-white hover:opacity-90",
    };

    const sizeStyles = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    if (asLink) {
        return (
            <Link
                href={asLink}
                prefetch={prefetch}
                className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={`
                ${baseStyles}
                ${variantStyles[variant]}
                ${sizeStyles[size]}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
