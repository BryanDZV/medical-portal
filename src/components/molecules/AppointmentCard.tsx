import React from "react";
import { Card } from "../atoms/Card";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";

type AppointmentCardProps = {
    patientName: string;
    time: string;
    type: string;
    status: "Confirmada" | "Pendiente" | "Cancelada";
};

export function AppointmentCard({
    patientName,
    time,
    type,
    status,
}: AppointmentCardProps) {
    const badgeVariant = {
        Confirmada: "success",
        Pendiente: "warning",
        Cancelada: "danger",
    } as const;

    return (
        <Card>
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-sm text-muted">
                        {time}
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                        {patientName}
                    </h3>

                    <p className="mt-1 text-sm text-muted">
                        {type}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Badge variant={badgeVariant[status]}>
                        {status}
                    </Badge>

                    <Button size="sm">
                        Ver cita
                    </Button>
                </div>
            </div>
        </Card>
    );
}