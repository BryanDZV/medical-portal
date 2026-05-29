import React from "react";
import { Card } from "../atoms/Card";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

type PatientCardProps = {
    name: string;
    age: number;
    status: "Activo" | "Urgente" | "Pendiente";
};

export function PatientCard({
    name,
    age,
    status,
}: PatientCardProps) {
    const badgeVariant = {
        Activo: "success",
        Urgente: "danger",
        Pendiente: "warning",
    } as const;

    return (
        <Card>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {name}
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                        {age} años
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant={badgeVariant[status]}>
                        {status}
                    </Badge>

                    <Button size="sm">
                        Ver expediente
                    </Button>
                </div>
            </div>
        </Card>
    );
}