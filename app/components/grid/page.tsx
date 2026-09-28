import type { Metadata } from "next";
import { Grid } from "@/components/folio/grid";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Grid",
  description:
    "Grid component: a CSS grid layout primitive with named column counts and Folio spacing tokens.",
};

const installCode = `import { Grid } from "@/components/folio/grid";

export function Example() {
  return (
    <Grid cols={3} gap="md">
      <div>Cell one</div>
      <div>Cell two</div>
      <div>Cell three</div>
    </Grid>
  );
}`;

const doCode = `// Grid with Folio tokens
<Grid cols={3} gap="lg">
  <div>Cell one</div>
  <div>Cell two</div>
  <div>Cell three</div>
</Grid>`;

export default function GridPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Grid</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A CSS grid layout primitive with named column counts and Folio
        spacing tokens. Replaces inline grid utilities across the codebase. Grid
        is Folio-only: it lives in components/folio, not components/shadcn.
      </p>

      {/* Preview */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-10">
          <Grid cols={3} gap="md">
            {["Cell one", "Cell two", "Cell three", "Cell four", "Cell five", "Cell six"].map((label) => (
              <div key={label} className="rounded-lg border border-border bg-background p-4">
                <p className="text-small text-foreground">{label}</p>
              </div>
            ))}
          </Grid>
        </div>
      </section>

      {/* Column variants */}
      <section className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Column counts</h3>
        <div className="space-y-4">
          {([1, 2, 3, 4] as const).map((cols) => (
            <div key={cols} className="overflow-hidden rounded-xl border border-border">
              <div className="bg-muted p-6">
                <Grid cols={cols} gap="sm">
                  {Array.from({ length: cols }).map((_, i) => (
                    <div key={i} className="rounded border border-border bg-background p-3">
                      <p className="text-small text-muted-foreground">col</p>
                    </div>
                  ))}
                </Grid>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={`<Grid cols={${cols}} gap="sm">`}
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
              { prop: "cols", type: "1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12", def: "1", desc: "Number of grid columns." },
              { prop: "gap", type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, def: "—", desc: "Gap between all cells. Maps to the Folio spacing scale." },
              { prop: "gapX", type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, def: "—", desc: "Column gap only. Overrides gap on the x axis." },
              { prop: "gapY", type: `"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`, def: "—", desc: "Row gap only. Overrides gap on the y axis." },
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
              Don&apos;t hand-write grid utilities inline. Column counts and gap
              values set that way sit outside the token system and accumulate as
              drift across the codebase.
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
