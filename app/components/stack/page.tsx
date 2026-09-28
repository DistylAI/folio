import type { Metadata } from "next";
import { Stack } from "@/components/folio/stack";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "Stack component: a flexbox layout primitive for consistent row and column composition using Folio spacing tokens.",
};

const installCode = `import { Stack } from "@/components/folio/stack";

export function Example() {
  return (
    <Stack direction="row" gap="md" align="center">
      <span>Item one</span>
      <span>Item two</span>
      <span>Item three</span>
    </Stack>
  );
}`;

const doCode = `// Stack with Folio tokens
<Stack direction="column" gap="md" align="start">
  <span>Item one</span>
  <span>Item two</span>
</Stack>`;

export default function StackPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Stack</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A flexbox layout primitive for row and column composition. Replaces
        inline flex utilities with named spacing tokens. Stack is Folio-only: it
        lives in components/folio, not components/shadcn.
      </p>

      {/* Preview */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <Stack direction="row" gap="md" align="center">
            {["Item one", "Item two", "Item three"].map((label) => (
              <div key={label} className="rounded-lg border border-border bg-background px-3 py-2">
                <p className="text-small text-foreground">{label}</p>
              </div>
            ))}
          </Stack>
        </div>
      </section>

      {/* Direction */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Direction</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(["column", "row"] as const).map((dir) => (
            <div key={dir} className="overflow-hidden rounded-xl border border-border">
              <div className="flex items-center justify-center bg-muted p-8">
                <Stack direction={dir} gap="sm">
                  {["One", "Two", "Three"].map((l) => (
                    <div key={l} className="rounded border border-border bg-background px-3 py-1.5">
                      <p className="text-small text-foreground">{l}</p>
                    </div>
                  ))}
                </Stack>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={`<Stack direction="${dir}" gap="sm">`}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* API */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div><div>Type</div><div>Default</div><div>Description</div>
            </div>
            {[
              { prop: "direction", type: `"row" | "column"`, def: `"column"`, desc: "Flex direction." },
              { prop: "gap", type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, def: "—", desc: "Gap between children. Maps to the Folio spacing scale." },
              { prop: "align", type: `"start" | "center" | "end" | "stretch" | "baseline"`, def: "—", desc: "Cross-axis alignment (align-items)." },
              { prop: "justify", type: `"start" | "center" | "end" | "between" | "around" | "evenly"`, def: "—", desc: "Main-axis alignment (justify-content)." },
              { prop: "wrap", type: "boolean", def: "false", desc: "Allows children to wrap onto multiple lines." },
            ].map((row) => (
              <div key={row.prop} className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border px-4 py-3 text-small last:border-0">
                <code className="font-mono text-primary">{row.prop}</code>
                <code className="font-mono text-muted-foreground">{row.type}</code>
                <span className="text-muted-foreground">{row.def}</span>
                <span className="text-foreground">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't and Do */}
      <section id="do-dont" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Don&apos;t and Do
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t write raw flex utilities inline. Gap and alignment values
              scattered across the codebase drift out of the spacing scale and are
              invisible to the token system.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {doCode}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Code */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Usage</h3>
        <CodeBlock code={installCode} />
      </section>

      <p className="mt-12 text-small text-muted-foreground">
        Folio v1.3 · June 2026
      </p>
    </div>
  );
}
