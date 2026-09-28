import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  BasicRadar,
  DotsRadar,
  GridCircleRadar,
  MultipleRadar,
} from "./RadarChartDemos";

export const metadata: Metadata = {
  title: "Radar Chart",
  description:
    "Radar Chart -- a Recharts radar chart wrapped in the Folio Chart primitives, with token-driven series colors and tooltips.",
};

const parts = [
  {
    name: "ChartContainer",
    desc: "Wraps a Recharts chart. Takes a config and injects each series color as a --color-<key> CSS var.",
  },
  {
    name: "ChartConfig",
    desc: "Per-series label and color. Use a Folio token var for color (e.g. var(--color-chart-1)).",
  },
  {
    name: "ChartTooltip / ChartTooltipContent",
    desc: "Recharts tooltip + the styled content. hideLabel, indicator (dot | line | dashed), and formatters supported.",
  },
  {
    name: "ChartLegend / ChartLegendContent",
    desc: "Recharts legend + styled content, driven by the same config.",
  },
] as const;

const setupCode = `const chartConfig = {
  a: { label: "Model A", color: "var(--color-chart-1)" },
  b: { label: "Model B", color: "var(--color-chart-2)" },
} satisfies ChartConfig;`;

const basicCode = `<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
  <RadarChart data={data}>
    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
    <PolarAngleAxis dataKey="metric" />
    <PolarGrid />
    <Radar dataKey="a" stroke="var(--color-a)" fill="var(--color-a)" fillOpacity={0.4} />
  </RadarChart>
</ChartContainer>`;

const multipleCode = `<Radar dataKey="a" stroke="var(--color-a)" fill="var(--color-a)" fillOpacity={0.4} />
<Radar dataKey="b" stroke="var(--color-b)" fill="var(--color-b)" fillOpacity={0.4} />
<ChartLegend content={<ChartLegendContent />} />`;

const dotsCode = `<Radar
  dataKey="a"
  stroke="var(--color-a)"
  fill="var(--color-a)"
  fillOpacity={0.4}
  dot={{ r: 4, fillOpacity: 1 }}
/>`;

const gridCircleCode = `<PolarGrid gridType="circle" />
<PolarAngleAxis dataKey="metric" />`;

const installCode = `import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const chartConfig = {
  a: { label: "Model A", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

export function ProfileRadar({ data }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <RadarChart data={data}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="metric" />
        <PolarGrid />
        <Radar dataKey="a" stroke="var(--color-a)" fill="var(--color-a)" fillOpacity={0.4} />
      </RadarChart>
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

export default function RadarChartDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Radar Chart</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A radar chart built on Recharts and wrapped in the Folio Chart
        primitives. Good for comparing a handful of metrics across one or two
        series; colors come from the config.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
          <BasicRadar />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the web, grid, and fill remap on
          theme change, no <code className="font-mono">dark:</code> classes.
          Series colors are injected from the config as{" "}
          <code className="font-mono">--color-*</code> CSS vars.
        </p>
      </section>

      {/* Config */}
      <section id="config" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Config</h3>
        <p className="mb-4 text-small">
          Every chart starts with a <code className="font-mono">ChartConfig</code>{" "}
          -- one entry per series, each pointing at a Folio token. The
          container turns those into <code className="font-mono">--color-*</code>{" "}
          variables the radars reference.
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
            <BasicRadar />
          </Cell>
          <Cell code={multipleCode}>
            <MultipleRadar />
          </Cell>
          <Cell code={dotsCode}>
            <DotsRadar />
          </Cell>
          <Cell code={gridCircleCode}>
            <GridCircleRadar />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          One series or two, with optional dots, and a polygon or circular grid
          via <code className="font-mono">gridType</code>. Keep{" "}
          <code className="font-mono">fillOpacity</code> low enough that
          overlapping series stay legible.
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
          The Recharts pieces -- <code className="font-mono">RadarChart</code>,{" "}
          <code className="font-mono">Radar</code>,{" "}
          <code className="font-mono">PolarAngleAxis</code>,{" "}
          <code className="font-mono">PolarGrid</code> -- are used directly inside{" "}
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
              Don&apos;t hardcode radar colors with a hex or raw palette utility --
              drive them from the config with token vars so they theme. Don&apos;t
              use the brand primary or feedback tokens for a data series -- those carry
              meaning (brand, status); use the chart-1…chart-5 tokens, in
              order. And don&apos;t plot more than two or three series; the web
              gets unreadable.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`const config = {
  a: {
    label: "Model A",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

<Radar dataKey="a" stroke="var(--color-a)" fill="var(--color-a)" />`}
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
        <code className="font-mono text-foreground">Content</code>,{" "}
        <code className="font-mono text-foreground">ChartLegend</code>/
        <code className="font-mono text-foreground">Content</code> on Recharts.
        Series colors are chart-token vars from the config.
      </footer>
    </div>
  );
}
