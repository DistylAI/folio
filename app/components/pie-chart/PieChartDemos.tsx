"use client";

import { Label, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

// Each slice carries its own fill, pointing at a --color-<name> var that the
// config defines. Colors are the Folio chart tokens (chart-1 through chart-5) -- never
// hardcoded hex, and never the brand primary (purple).
const pieData = [
  { source: "organic", visitors: 275, fill: "var(--color-organic)" },
  { source: "referral", visitors: 200, fill: "var(--color-referral)" },
  { source: "social", visitors: 187, fill: "var(--color-social)" },
  { source: "email", visitors: 173, fill: "var(--color-email)" },
  { source: "direct", visitors: 90, fill: "var(--color-direct)" },
];

const config = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--color-chart-1)" },
  referral: { label: "Referral", color: "var(--color-chart-2)" },
  social: { label: "Social", color: "var(--color-chart-3)" },
  email: { label: "Email", color: "var(--color-chart-4)" },
  direct: { label: "Direct", color: "var(--color-chart-5)" },
} satisfies ChartConfig;

const total = pieData.reduce((sum, d) => sum + d.visitors, 0);

export function BasicPie() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="source" />
      </PieChart>
    </ChartContainer>
  );
}

export function DonutPie() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="source" innerRadius={52} />
      </PieChart>
    </ChartContainer>
  );
}

export function DonutTextPie() {
  return (
    <ChartContainer config={config} className="mx-auto aspect-square w-full max-w-[260px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={pieData}
          dataKey="visitors"
          nameKey="source"
          innerRadius={60}
          strokeWidth={4}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-2xl font-bold"
                    >
                      {total.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 22}
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
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}

export function LegendPie() {
  return (
    <ChartContainer
      config={config}
      className="mx-auto aspect-square w-full max-w-[280px]"
    >
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={pieData} dataKey="visitors" nameKey="source" />
        <ChartLegend
          content={<ChartLegendContent nameKey="source" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
