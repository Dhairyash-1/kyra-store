import { ArrowDown, ArrowUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardMetricProps {
  title: string;
  value: string;
  description?: string;
  trend?: string;
  trendType?: "positive" | "negative";
}

export function CardMetric({
  title,
  value,
  description,
  trend,
  trendType = "positive",
}: CardMetricProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
        {trend && (
          <div
            className={`mt-1 flex items-center text-xs ${
              trendType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trendType === "positive" ? (
              <ArrowUp className="mr-1 h-4 w-4" />
            ) : (
              <ArrowDown className="mr-1 h-4 w-4" />
            )}
            {trend}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
