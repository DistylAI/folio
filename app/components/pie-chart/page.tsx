import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { BasicPie, DonutPie, DonutTextPie, LegendPie } from "./PieChartDemos";

export const metadata: Metadata = {
  title: "Pie Chart",
  description:
    "Pie Chart -- a Recharts pie/donut chart wrapped in the Folio Chart primitives, with token-driven slice colors and tooltips.",
};

const parts = [
  {
    name: "ChartContainer",
    desc: "Wraps a Recharts chart. Takes a config and injects each slice color as a --color-<key> CSS var.",
  },
  {
    name: "ChartConfig",
    desc: "Per-slice label and color, keyed by nameKey value. Use Folio token vars for colors (e.g. var(--color-chart-1)).",
  },
  {
    name: "ChartTooltip / ChartTooltipContent",
    desc: "Recharts tooltip + the styled content. hideLabel and formatters supported.",
  },
  {
    name: "ChartLegend / ChartLegendContent",
    desc: "Recharts legend + styled content; pass nameKey to label slices.",
  },
] as const;

const setupCode = `const chartData = [
  { source: "organic", visitors: 275, fill: "var(--color-organic)" },
  { source: "referral", visitors: 200, fill: "var(--color-referral)" },
  // …
];

const chartConfig = {
  visitors: { label: "Visitors" },
  organic: { label: "Organic", color: "var(--color-chart-1)" },
  referral: { label: "Referral", color: "var(--color-chart-2)" },
} satisfies ChartConfig;`;

const basicCode = `<ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
  <PieChart>
    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
    <Pie data={chartData} dataKey="visitors" nameKey="source" />
  </PieChart>
</ChartContainer>`;

const donutCode = `<Pie data={chartData} dataKey="visitors" nameKey="source" innerRadius={52} />`;

const donutTextCode = `<Pie data={chartData} dataKey="visitors" nameKey="source" innerRadius={60}>
  <Label content={({ viewBox }) => (
    /* center <text>: total on top, label beneath -- fill via fill-text-* tokens */
  )} />
</Pie>`;

const legendCode = `<PieChart>
  <Pie data={chartData} dataKey="visitors" nameKey="source" />
  <ChartLegend content={<ChartLegendContent nameKey="source" />} />
</PieChart>`;

const installCode = `import { Pie, PieChart } from "recharts";
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

export function SourcePie({ data }) {
  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square w-full max-w-[260px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie data={data} dataKey="visitors" nameKey="source" />
      </PieChart>
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

export default function PieChartDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Pie Chart</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A pie or donut chart built on Recharts and wrapped in the Folio Chart
        primitives. Each slice draws its color from the config; the container and
        tooltip handle the rest.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
          <DonutTextPie />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- slices and the center label remap
          on theme change, no <code className="font-mono">dark:</code> classes.
          Each slice&apos;s color is injected from the config as a{" "}
          <code className="font-mono">--color-*</code> CSS var.
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
            <BasicPie />
          </Cell>
          <Cell code={donutCode}>
            <DonutPie />
          </Cell>
          <Cell code={donutTextCode}>
            <DonutTextPie />
          </Cell>
          <Cell code={legendCode}>
            <LegendPie />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          A solid pie, a donut via <code className="font-mono">innerRadius</code>,
          a donut with a center total using{" "}
          <code className="font-mono">Label</code>, or a pie with a legend. Center
          text is filled with <code className="font-mono">fill-text-*</code>{" "}
          tokens.
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
          The Recharts pieces -- <code className="font-mono">PieChart</code>,{" "}
          <code className="font-mono">Pie</code>,{" "}
          <code className="font-mono">Label</code> -- are used directly inside{" "}
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
              Don&apos;t hardcode slice colors with a hex or raw palette utility --
              drive them from the config with token vars so they theme. Don&apos;t
              use the brand primary or feedback tokens for a data slice -- those
              carry meaning (brand, status); use the chart-1…chart-5 tokens, in
              order. And don&apos;t split a pie into many tiny slices; past five
              or six, use a bar chart.
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
        <code className="font-mono text-foreground">Content</code>,{" "}
        <code className="font-mono text-foreground">ChartLegend</code>/
        <code className="font-mono text-foreground">Content</code> on Recharts.
        Slice colors are chart-token vars from the config.
      </footer>
    </div>
  );
}
