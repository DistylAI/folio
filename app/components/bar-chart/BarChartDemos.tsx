"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const data = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 264, mobile: 140 },
];

// Series colors come from the Folio chart tokens (chart-1 through chart-5) -- never hardcoded hex, and
// never feedback or primary tokens for neutral data series.
const config = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

const negData = [
  { month: "Jan", net: 186 },
  { month: "Feb", net: -120 },
  { month: "Mar", net: 237 },
  { month: "Apr", net: -90 },
  { month: "May", net: 160 },
  { month: "Jun", net: -50 },
];

const negConfig = { net: { label: "Net" } } satisfies ChartConfig;

export function BasicBar() {
  return (
    <ChartContainer config={config} className="h-[240px] w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={6} />
      </BarChart>
    </ChartContainer>
  );
}

export function HorizontalBar() {
  return (
    <ChartContainer config={config} className="h-[240px] w-full">
      <BarChart accessibilityLayer data={data} layout="vertical" margin={{ left: 4 }}>
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="month"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={36}
        />
        <XAxis type="number" hide />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
      </BarChart>
    </ChartContainer>
  );
}

export function MultipleBar() {
  return (
    <ChartContainer config={config} className="h-[240px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}

export function StackedBar() {
  return (
    <ChartContainer config={config} className="h-[240px] w-full">
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="desktop"
          stackId="a"
          fill="var(--color-desktop)"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="mobile"
          stackId="a"
          fill="var(--color-mobile)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}

export function NegativeBar() {
  return (
    <ChartContainer config={negConfig} className="h-[240px] w-full">
      <BarChart accessibilityLayer data={negData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="net" radius={4}>
          {negData.map((d) => (
            <Cell
              key={d.month}
              fill={
                d.net >= 0
                  ? "var(--color-chart-1)"
                  : "var(--color-chart-4)"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
