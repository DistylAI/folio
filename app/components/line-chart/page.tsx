import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { BasicLine, DotsLine, MultipleLine, StepLine } from "./LineChartDemos";

export const metadata: Metadata = {
  title: "Line Chart",
  description:
    "Line Chart -- a Recharts line chart wrapped in the Folio Chart primitives, with token-driven series colors, tooltips, and legends.",
};

const parts = [
  {
    name: "ChartContainer",
    desc: "Wraps a Recharts chart. Takes a config and injects each series color as a --color-<key> CSS var.",
  },
  {
    name: "ChartConfig",
    desc: "Per-series label, optional icon, and color. Use a Folio token var for color (e.g. var(--color-chart-1)).",
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
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
  mobile: { label: "Mobile", color: "var(--color-chart-2)" },
} satisfies ChartConfig;`;

const basicCode = `<ChartContainer config={chartConfig} className="h-[240px] w-full">
  <LineChart data={data} margin={{ left: 12, right: 12 }}>
    <CartesianGrid vertical={false} />
    <XAxis dataKey="month" tickLine={false} axisLine={false} />
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
  </LineChart>
</ChartContainer>`;

const multipleCode = `<LineChart data={data}>
  <ChartLegend content={<ChartLegendContent />} />
  <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
  <Line dataKey="mobile" type="monotone" stroke="var(--color-mobile)" strokeWidth={2} dot={false} />
</LineChart>`;

const dotsCode = `<Line
  dataKey="desktop"
  type="monotone"
  stroke="var(--color-desktop)"
  strokeWidth={2}
  dot={{ fill: "var(--color-desktop)", r: 4 }}
  activeDot={{ r: 6 }}
/>`;

const stepCode = `<Line dataKey="desktop" type="step" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />`;

const installCode = `import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  type ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/shadcn/chart";

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--color-chart-1)" },
} satisfies ChartConfig;

export function TrendChart({ data }) {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <LineChart data={data} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line dataKey="desktop" type="monotone" stroke="var(--color-desktop)" strokeWidth={2} dot={false} />
      </LineChart>
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
      <div className="bg-muted p-6">{children}</div>
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

export default function LineChartDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Line Chart</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A line chart built on Recharts and wrapped in the Folio Chart
        primitives. A <code className="font-mono">ChartConfig</code> maps each
        series to a label and a token color; the container, tooltip, and legend
        handle the rest.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-6">
          <BasicLine />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the line, axes, grid, and tooltip
          all remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. Series colors are injected from the config as{" "}
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
          variables the lines reference.
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
            <BasicLine />
          </Cell>
          <Cell code={multipleCode}>
            <MultipleLine />
          </Cell>
          <Cell code={dotsCode}>
            <DotsLine />
          </Cell>
          <Cell code={stepCode}>
            <StepLine />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          One series or several, with or without dots. Switch the curve with{" "}
          <code className="font-mono">type</code> --{" "}
          <code className="font-mono">monotone</code> for smooth,{" "}
          <code className="font-mono">linear</code> for straight, or{" "}
          <code className="font-mono">step</code> for stepped.
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
          The Recharts pieces -- <code className="font-mono">LineChart</code>,{" "}
          <code className="font-mono">Line</code>,{" "}
          <code className="font-mono">XAxis</code>,{" "}
          <code className="font-mono">CartesianGrid</code> -- are used directly
          inside <code className="font-mono">ChartContainer</code>.
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
              Don&apos;t hardcode line colors with a hex or raw palette utility --
              drive them from the config with token vars so they theme. Don&apos;t
              use the brand primary or feedback tokens for a data series -- those carry
              meaning (brand, status); use the chart-1…chart-5 tokens, in
              order. And don&apos;t crowd one chart with too many lines.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`const config = {
  desktop: {
    label: "Desktop",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig;

<Line dataKey="desktop" stroke="var(--color-desktop)" />`}
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
        The muted / border / background colors are replaced with Folio
        tokens, and series colors are chart-token vars from the config.
      </footer>
    </div>
  );
}
