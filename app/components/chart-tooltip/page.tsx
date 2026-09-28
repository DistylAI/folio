import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  CustomLabelTooltip,
  DashedTooltip,
  DotTooltip,
  LineTooltip,
  NoIndicatorTooltip,
} from "./ChartTooltipDemos";

export const metadata: Metadata = {
  title: "Chart Tooltip",
  description:
    "Chart Tooltip -- the styled tooltip for Folio charts, with dot / line / dashed indicators, optional labels, and custom formatters.",
};

const props = [
  {
    name: "indicator",
    type: '"dot" | "line" | "dashed"',
    def: '"dot"',
    desc: "Shape of the per-series color marker.",
  },
  {
    name: "hideLabel",
    type: "boolean",
    def: "false",
    desc: "Hide the top label row (the category, e.g. the month).",
  },
  {
    name: "hideIndicator",
    type: "boolean",
    def: "false",
    desc: "Hide the color marker entirely.",
  },
  {
    name: "labelFormatter",
    type: "(value, payload) => ReactNode",
    def: "undefined",
    desc: "Customize the label row, e.g. prefix or format the category.",
  },
  {
    name: "formatter",
    type: "(value, name, item, i, payload) => ReactNode",
    def: "undefined",
    desc: "Fully customize each row's rendering.",
  },
  {
    name: "nameKey / labelKey",
    type: "string",
    def: "undefined",
    desc: "Override which payload keys provide the series name and label.",
  },
] as const;

const usageCode = `<ChartTooltip cursor={false} content={<ChartTooltipContent />} />`;

const dotCode = `<ChartTooltipContent indicator="dot" />`;
const lineCode = `<ChartTooltipContent indicator="line" />`;
const dashedCode = `<ChartTooltipContent indicator="dashed" />`;
const noIndicatorCode = `<ChartTooltipContent hideIndicator />`;
const customLabelCode = `<ChartTooltipContent labelFormatter={(value) => \`Month: \${value}\`} />`;

const installCode = `import { ChartTooltip, ChartTooltipContent } from "@/components/shadcn/chart";

// Inside any Recharts chart wrapped in <ChartContainer>:
<ChartTooltip
  cursor={false}
  content={<ChartTooltipContent indicator="line" />}
/>`;

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

export default function ChartTooltipDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Chart Tooltip</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        The styled tooltip for Folio charts. Drop{" "}
        <code className="font-mono">ChartTooltip</code> with a{" "}
        <code className="font-mono">ChartTooltipContent</code> into any chart;
        labels and colors come from the same <code className="font-mono">ChartConfig</code>.
        Hover a bar to see it.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-6">
          <DotTooltip />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the tooltip surface, border, and
          text remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. Hover a bar to reveal it.
        </p>
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Usage</h3>
        <p className="mb-4 text-small">
          Place it inside a chart alongside the series. It reads the active
          payload and renders a row per series, each with its config label and
          token color.
        </p>
        <CodeBlock
          code={usageCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Cell code={dotCode}>
            <DotTooltip />
          </Cell>
          <Cell code={lineCode}>
            <LineTooltip />
          </Cell>
          <Cell code={dashedCode}>
            <DashedTooltip />
          </Cell>
          <Cell code={noIndicatorCode}>
            <NoIndicatorTooltip />
          </Cell>
          <Cell code={customLabelCode}>
            <CustomLabelTooltip />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The <code className="font-mono">indicator</code> sets the marker shape --{" "}
          <code className="font-mono">dot</code>,{" "}
          <code className="font-mono">line</code>, or{" "}
          <code className="font-mono">dashed</code>. Drop it with{" "}
          <code className="font-mono">hideIndicator</code>, or reshape the label
          with <code className="font-mono">labelFormatter</code>.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[680px]">
            <div className="grid grid-cols-[1.4fr_2fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_2fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
                  </div>
                  <div className="font-mono text-caption">
                    {p.type}
                  </div>
                  <div className="font-mono text-caption">
                    {p.def}
                  </div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Props apply to{" "}
          <code className="font-mono">ChartTooltipContent</code>;{" "}
          <code className="font-mono">ChartTooltip</code> is the Recharts{" "}
          <code className="font-mono">Tooltip</code> it renders into.
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
              Don&apos;t hardcode the indicator color -- it&apos;s drawn from the
              series config, so it must use the chart-1…chart-5 tokens; the brand
              primary and feedback tokens carry meaning (brand, status) and
              aren&apos;t for neutral data. Don&apos;t hide essential information
              only in a tooltip; it&apos;s hover-only and skips touch and keyboard
              users.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<ChartTooltip
  cursor={false}
  content={<ChartTooltipContent indicator="line" />}
/>`}
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
        -- <code className="font-mono text-foreground">ChartTooltip</code> and{" "}
        <code className="font-mono text-foreground">ChartTooltipContent</code> on
        Recharts. The surface, border, and text use Folio tokens; indicator
        colors come from the series config.
      </footer>
    </div>
  );
}
