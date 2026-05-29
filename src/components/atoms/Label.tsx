import React from "react";

type LabelProps = {
    children: React.ReactNode;
    htmlFor: string;
};

export function Label({
    children,
    htmlFor,
}: LabelProps) {
    return (
        <label
            htmlFor={htmlFor}
            className="
                mb-2
                block
                text-sm
                font-medium
                text-foreground
            "
        >
            {children}
        </label>
    );
}