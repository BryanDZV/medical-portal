"use client";

import { Input } from "../atoms/Input";

type SearchBarProps = {
    id: string;
    label: string;
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
};

export function SearchBar({
    id,
    label,
    value,
    onChange,
    placeholder = "Buscar...",
}: SearchBarProps) {
    return (
        <div>
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-slate-700"
            >
                {label}
            </label>

            <Input
                id={id}
                type="search"
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
