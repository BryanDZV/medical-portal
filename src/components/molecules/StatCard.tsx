import React from "react";
import { Card } from "../atoms/Card";
import { Badge } from "../atoms/Badge";

type StatCardProps = {
    title: string;
    value: string | number;
    description?: string;
    trend?: string;
    trendVariant?: "primary" | "success" | "warning" | "danger";
};

export function StatCard({
    title,
    value,
    description,
    trend,
    trendVariant = "primary",
}: StatCardProps) {
    return (
        <Card>
            <div className="flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm text-muted">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-foreground">
                        {value}
                    </h2>

                    {description && (
                        <p className="mt-1 text-sm text-muted">
                            {description}
                        </p>
                    )}
                </div>

                {trend && (
                    <Badge variant={trendVariant}>
                        {trend}
                    </Badge>
                )}
            </div>
        </Card>
    );
}