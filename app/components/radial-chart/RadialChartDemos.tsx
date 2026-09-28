"use client";

import {
  Label,
  LabelList,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

// Each bar carries its own fill, pointing at a --color-<name> var the config
// defines. Colors are the Folio chart tokens (chart-1 through chart-5) -- never hardcoded
// hex, and never the brand primary (purple).
const catData = [
  { source: "organic", visitors: 275, fill: "var(--color-organic)" },
  { source: "referral", visitors: 200, fill: "var(--color-referral)" },
  { source: "social", visitors: 187, fill: "var(--color-social)" },
  { source: "email", visitors: 173, fill: "var(--color-email)" },
  { source: "direct", visitors: 90, fill: "var(--color-direct)" },
];

const catConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--color-chart-1)" },
  referral: { label: "Referral", color: "var(--color-chart-2)" },
  social: { label: "Social", color: "var(--color-chart-3)" },
  email: { label: "Email", color: "var(--color-chart-4)" },
  direct: { label: "Direct", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const stackPeriod = { period: "H1", desktop: 1260, mobile: 570 };
const stackData = [stackPeriod];
const stackConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;
const stackTotal = stackPeriod.desktop + stackPeriod.mobile;

export function BasicRadial() {
  return (
    <ChartContainer config={catConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadialBarChart data={catData} innerRadius={30} outerRadius={110}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="source" />}
        />
        <RadialBar dataKey="visitors" background />
      </RadialBarChart>
    </ChartContainer>
  );
}

export function LabelRadial() {
  return (
    <ChartContainer config={catConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadialBarChart
        data={catData}
        startAngle={-90}
        endAngle={270}
        innerRadius={30}
        outerRadius={110}
      >
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="source" />}
        />
        <RadialBar dataKey="visitors" background>
          <LabelList
            position="insideStart"
            dataKey="source"
            className="fill-[--color-text-inverse] capitalize"
            fontSize={11}
          />
        </RadialBar>
      </RadialBarChart>
    </ChartContainer>
  );
}

export function GridRadial() {
  return (
    <ChartContainer config={catConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadialBarChart data={catData} innerRadius={30} outerRadius={110}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel nameKey="source" />}
        />
        <PolarGrid gridType="circle" />
        <RadialBar dataKey="visitors" background />
      </RadialBarChart>
    </ChartContainer>
  );
}

export function StackedRadial() {
  return (
    <ChartContainer config={stackConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadialBarChart
        data={stackData}
        endAngle={180}
        innerRadius={80}
        outerRadius={130}
      >
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 12}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {stackTotal.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 8}
                      className="fill-muted-foreground text-xs"
                    >
                      Visitors
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="desktop"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-desktop)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="mobile"
          stackId="a"
          cornerRadius={5}
          fill="var(--color-mobile)"
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
