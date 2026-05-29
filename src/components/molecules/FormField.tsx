import React from "react";
import { Label } from "../atoms/Label";
import { Input } from "../atoms/Input";

type FormFieldProps = {
    id: string;
    label: string;
    type?: string;
    placeholder?: string;
    error?: string;
};

export function FormField({
    id,
    label,
    type = "text",
    placeholder = "",
    error,
}: FormFieldProps) {
    return (
        <div>
            <Label htmlFor={id}>{label}</Label>

            <Input
                id={id}
                type={type}
                placeholder={placeholder}
            />

            {error && (
                <p className="mt-2 text-sm text-danger">
                    {error}
                </p>
            )}
        </div>
    );
}