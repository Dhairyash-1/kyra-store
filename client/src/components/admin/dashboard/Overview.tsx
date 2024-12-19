"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const generateData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days + 1);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    data.push({
      date: date.toISOString().split("T")[0],
      sales: Math.floor(Math.random() * 1000) + 500,
    });
  }

  return data;
};

const timeRanges = [
  { label: "1 Day", days: 1 },
  { label: "7 Days", days: 7 },
  { label: "1 Month", days: 30 },
];

export function Overview() {
  const [selectedRange, setSelectedRange] = useState(timeRanges[1]);
  const data = generateData(selectedRange.days);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <Button
              key={range.label}
              variant={selectedRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range)}
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>
      <ChartContainer
        config={{
          sales: {
            label: "Sales",
            color: "hsl(var(--primary))",
          },
        }}
        className="h-[300px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `₹${value}`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(var(--primary))"
              fillOpacity={1}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
