"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const data = [
  { metric: "Speed", a: 186, b: 120 },
  { metric: "Reliability", a: 285, b: 200 },
  { metric: "Comfort", a: 237, b: 260 },
  { metric: "Safety", a: 203, b: 190 },
  { metric: "Efficiency", a: 209, b: 230 },
  { metric: "Value", a: 264, b: 170 },
];

// Series colors come from the Folio chart tokens (chart-1 through chart-5) -- never hardcoded hex, and
// never feedback or primary tokens for neutral data series.
const config = {
  a: { label: "Model A", color: "var(--color-chart-1)" },
  b: { label: "Model B", color: "var(--color-chart-2)" },
} satisfies ChartConfig;

export function BasicRadar() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric" />
        <PolarGrid />
        <Radar
          dataKey="a"
          stroke="var(--color-a)"
          fill="var(--color-a)"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ChartContainer>
  );
}

export function MultipleRadar() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[280px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <PolarAngleAxis dataKey="metric" />
        <PolarGrid />
        <Radar dataKey="a" stroke="var(--color-a)" fill="var(--color-a)" fillOpacity={0.4} />
        <Radar dataKey="b" stroke="var(--color-b)" fill="var(--color-b)" fillOpacity={0.4} />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  );
}

export function DotsRadar() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric" />
        <PolarGrid />
        <Radar
          dataKey="a"
          stroke="var(--color-a)"
          fill="var(--color-a)"
          fillOpacity={0.4}
          dot={{ r: 4, fillOpacity: 1 }}
        />
      </RadarChart>
    </ChartContainer>
  );
}

export function GridCircleRadar() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarGrid gridType="circle" />
        <PolarAngleAxis dataKey="metric" />
        <Radar
          dataKey="a"
          stroke="var(--color-a)"
          fill="var(--color-a)"
          fillOpacity={0.4}
        />
      </RadarChart>
    </ChartContainer>
  );
}
