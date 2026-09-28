import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  BasicRadial,
  GridRadial,
  LabelRadial,
  StackedRadial,
} from "./RadialChartDemos";

export const metadata: Metadata = {
  title: "Radial Chart",
  description:
    "Radial Chart -- a Recharts radial bar chart wrapped in the Folio Chart primitives, with token-driven colors and tooltips.",
};

const parts = [
  {
    name: "ChartContainer",
    desc: "Wraps a Recharts chart. Takes a config and injects each bar color as a --color-<key> CSS var.",
  },
  {
    name: "ChartConfig",
    desc: "Per-bar label and color, keyed by name. Use Folio token vars for colors (e.g. var(--color-chart-1)).",
  },
  {
    name: "ChartTooltip / ChartTooltipContent",
    desc: "Recharts tooltip + the styled content. hideLabel and nameKey supported.",
  },
  {
    name: "PolarRadiusAxis / Label",
    desc: "Used to anchor a center label (e.g. a total) inside a stacked radial chart.",
  },
] as const;

const setupCode = `const chartData = [
  { source: "organic", visitors: 275, fill: "var(--color-organic)" },
  // …
];

const chartConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--color-chart-1)" },
} satisfies ChartConfig;`;

const basicCode = `<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
  <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="source" />} />
    <RadialBar dataKey="visitors" background />
  </RadialBarChart>
</ChartContainer>`;

const labelCode = `<RadialBarChart data={chartData} startAngle={-90} endAngle={270} innerRadius={30} outerRadius={110}>
  <RadialBar dataKey="visitors" background>
    <LabelList position="insideStart" dataKey="source" className="fill-[--color-text-inverse]" fontSize={11} />
  </RadialBar>
</RadialBarChart>`;

const gridCode = `<PolarGrid gridType="circle" />
<RadialBar dataKey="visitors" background />`;

const stackedCode = `<RadialBarChart data={data} endAngle={180} innerRadius={80} outerRadius={130}>
  <PolarRadiusAxis tick={false} axisLine={false}>
    <Label content={/* center total via fill-text-* tokens */} />
  </PolarRadiusAxis>
  <RadialBar dataKey="desktop" stackId="a" fill="var(--color-desktop)" />
  <RadialBar dataKey="mobile" stackId="a" fill="var(--color-mobile)" />
</RadialBarChart>`;

const installCode = `import { RadialBar, RadialBarChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const chartConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

export function SourceRadial({ data }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadialBarChart data={data} innerRadius={30} outerRadius={110}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel nameKey="source" />} />
        <RadialBar dataKey="visitors" background />
      </RadialBarChart>
    </ChartContainer>
  );
}`;

function Cell({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex justify-center bg-muted p-6">
        {children}
      </div>
      <div className="border-t border-border p-3">
        <CodeBlock
          code={code}
          size="sm"
          className="rounded-lg border border-border-subtle bg-muted"
        />
      </div>
    </div>
  );
}

export default function RadialChartDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Radial Chart</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A radial bar chart built on Recharts and wrapped in the Folio Chart
        primitives -- bars drawn around a center rather than along an axis. Colors
        come from the config.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
          <StackedRadial />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- bars, track, and center label
          remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. Bar colors are injected from the config as{" "}
          <code className="font-mono">--color-*</code> CSS vars.
        </p>
      </section>

      {/* Config */}
      <section id="config" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Config</h3>
        <p className="mb-4 text-small">
          Give each datum a <code className="font-mono">fill</code> that points at
          a <code className="font-mono">--color-&lt;name&gt;</code> var, and define
          those names in the <code className="font-mono">ChartConfig</code> with
          Folio tokens.
        </p>
        <CodeBlock
          code={setupCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Cell code={basicCode}>
            <BasicRadial />
          </Cell>
          <Cell code={labelCode}>
            <LabelRadial />
          </Cell>
          <Cell code={gridCode}>
            <GridRadial />
          </Cell>
          <Cell code={stackedCode}>
            <StackedRadial />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Concentric bars per category, optional inline labels via{" "}
          <code className="font-mono">LabelList</code>, a circular grid, or a
          stacked gauge with a center total anchored on{" "}
          <code className="font-mono">PolarRadiusAxis</code>.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.8fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.8fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
                  </div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The Recharts pieces -- <code className="font-mono">RadialBarChart</code>,{" "}
          <code className="font-mono">RadialBar</code>,{" "}
          <code className="font-mono">PolarGrid</code>,{" "}
          <code className="font-mono">LabelList</code> -- are used directly inside{" "}
          <code className="font-mono">ChartContainer</code>.
        </p>
      </section>

      {/* Don't and Do */}
      <section id="do-dont" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Don&apos;t and Do</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t hardcode bar colors with a hex or raw palette utility --
              drive them from the config with token vars so they theme. Don&apos;t
              use the brand primary or feedback tokens for a data series -- those carry
              meaning (brand, status); use the chart-1…chart-5 tokens, in
              order. And don&apos;t use a radial chart for precise value
              comparison -- a bar chart reads more accurately.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`const data = [
  { source: "organic", visitors: 275, fill: "var(--color-organic)" },
];

const config = {
  organic: { label: "Organic", color: "var(--color-chart-1)" },
} satisfies ChartConfig;`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Copy-paste */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        -- <code className="font-mono text-foreground">ChartContainer</code>,{" "}
        <code className="font-mono text-foreground">ChartTooltip</code>/
        <code className="font-mono text-foreground">Content</code> on Recharts.
        Bar colors are chart-token vars from the config.
      </footer>
    </div>
  );
}
