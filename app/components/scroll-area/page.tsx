import type { Metadata } from "next";
import { ScrollArea, ScrollBar } from "@/components/shadcn/scroll-area";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Scroll Area",
  description:
    "Scroll Area component -- a bounded container that replaces native browser scrollbars with custom Folio-styled ones.",
};

const tags = Array.from({ length: 24 }, (_, i) => `v1.2.0-beta.${50 - i}`);

const savedViews = [
  "All issues",
  "Assigned to me",
  "Recently updated",
  "Closed this week",
  "High priority",
  "Awaiting review",
];

const props = [
  {
    name: "type",
    type: '"auto" | "always" | "scroll" | "hover"',
    def: '"hover"',
    desc: "When the scrollbar is shown. hover shows it on pointer over; always keeps it visible.",
  },
  {
    name: "scrollHideDelay",
    type: "number",
    def: "600",
    desc: "Milliseconds before the scrollbar hides after scrolling stops (types other than always).",
  },
  {
    name: "dir",
    type: '"ltr" | "rtl"',
    def: '"ltr"',
    desc: "Reading direction, which side the vertical scrollbar sits on.",
  },
] as const;

const doCode = `<ScrollArea className="h-72 w-48 rounded-lg border">
  <div className="p-4">
    {tags.map((tag) => (
      <div key={tag} className="py-2 text-sm">
        {tag}
      </div>
    ))}
  </div>
</ScrollArea>`;

const installCode = `import { ScrollArea } from "@/components/shadcn/scroll-area";

export function TagList({ tags }: { tags: string[] }) {
  return (
    <ScrollArea className="h-72 w-48 rounded-lg border border-border">
      <div className="divide-y divide-border p-4">
        {tags.map((tag) => (
          <div key={tag} className="py-2 text-sm text-foreground">
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}`;

export default function ScrollAreaPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Scroll Area</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A bounded container that replaces native browser scrollbars with custom
        Folio-styled ones. Use it when content can exceed the space it has.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ScrollArea className="h-72 w-48 rounded-lg border border-border bg-background">
            <div className="p-4">
              <h4 className="mb-3 text-sm font-medium leading-none text-foreground">
                Tags
              </h4>
              <div className="divide-y divide-border">
                {tags.map((tag) => (
                  <div key={tag} className="py-2 text-sm text-foreground">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Toggle the theme and it remaps,
          no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Vertical */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea className="h-44 w-40 rounded-lg border border-border bg-background">
                <div className="divide-y divide-border p-3">
                  {tags.map((tag) => (
                    <div key={tag} className="py-1.5 text-sm text-foreground">
                      {tag}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ScrollArea className="h-44 w-40" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          {/* Horizontal */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea className="w-44 whitespace-nowrap rounded-lg border border-border bg-background">
                <div className="flex w-max gap-3 p-3">
                  {savedViews.map((view) => (
                    <div
                      key={view}
                      className="flex h-24 w-28 shrink-0 items-end rounded-lg bg-secondary p-2 text-caption text-foreground"
                    >
                      {view}
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ScrollArea>
  <ScrollBar orientation="horizontal" />
</ScrollArea>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          {/* Both axes */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea className="h-44 w-44 rounded-lg border border-border bg-background">
                <div className="w-[420px] p-3">
                  <div className="divide-y divide-border">
                    {tags.slice(0, 14).map((tag) => (
                      <div
                        key={tag}
                        className="flex justify-between gap-8 py-1.5 text-sm whitespace-nowrap text-foreground"
                      >
                        <span>{tag}</span>
                        <span className="text-muted-foreground">
                          released to staging on June 6, 2026
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ScrollArea className="h-44 w-44" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Add a horizontal <code className="font-mono">ScrollBar</code> for the
          horizontal and both-axes layouts. The vertical bar is built in.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Default - content fits */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea className="h-44 w-40 rounded-lg border border-border bg-background">
                <div className="divide-y divide-border p-3">
                  {tags.slice(0, 4).map((tag) => (
                    <div key={tag} className="py-1.5 text-sm text-foreground">
                      {tag}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Default. Content fits, so no scrollbar appears.
              </p>
            </div>
          </div>
          {/* Thumb visible */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea
                type="always"
                className="h-44 w-40 rounded-lg border border-border bg-background"
              >
                <div className="divide-y divide-border p-3">
                  {tags.map((tag) => (
                    <div key={tag} className="py-1.5 text-sm text-foreground">
                      {tag}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ScrollArea type="always" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          {/* Overflow */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ScrollArea className="h-44 w-40 rounded-lg border border-border bg-background">
                <div className="divide-y divide-border p-3">
                  {tags.map((tag) => (
                    <div key={tag} className="py-1.5 text-sm text-foreground">
                      {tag}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Overflow. Content exceeds the container; the bar shows on hover
                or scroll.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The thumb uses <code className="font-mono">border-strong</code> so it
          stays visible on both themes. Set{" "}
          <code className="font-mono">type=&quot;always&quot;</code> to keep the
          bar shown.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
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
          Compose with <code className="font-mono">ScrollBar</code> (it takes an{" "}
          <code className="font-mono">orientation</code>) for horizontal or
          both-axes scrolling.
        </p>
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
              Don&apos;t wrap content that already fits its container. A Scroll
              Area earns its place only when content can exceed the space it has.
              Around content that never overflows it adds a control the reader
              never needs.
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
        <p className="mt-2 text-small">
          Reach for it on long lists, code blocks, and any bounded container with
          variable-length content.
        </p>
      </section>

      {/* Copy-paste */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        Folio v1.2 · June 2026
      </footer>
    </div>
  );
}
