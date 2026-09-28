import type { Metadata } from "next";
import { Badge } from "@/components/shadcn/badge";
import { Tag } from "@/components/folio/tag";
import { CodeBlock } from "@/components/CodeBlock";
import { FilterChips } from "./filter-chips";

export const metadata: Metadata = {
  title: "Badge & Tag",
  description:
    "Badge (status) and Tag (label) on Folio tokens. Tag is a neutral wrapper over Badge and adds removable filter chips.",
};

const colors = [
  { color: "default", label: "Default", code: `<Badge>Default</Badge>` },
  {
    color: "success",
    label: "Success",
    code: `<Badge color="success">Success</Badge>`,
  },
  {
    color: "destructive",
    label: "Destructive",
    code: `<Badge color="destructive">Destructive</Badge>`,
  },
  {
    color: "warning",
    label: "Warning",
    code: `<Badge color="warning">Warning</Badge>`,
  },
  { color: "info", label: "Info", code: `<Badge color="info">Info</Badge>` },
] as const;

const doCode = `// Status = colored Badge; label/category = Tag
<Badge color="success">Active</Badge>
<Tag>Engineering</Tag>`;

const installCode = `import { Badge } from "@/components/shadcn/badge";
import { Tag } from "@/components/folio/tag";

// Live status (color/count/state)
<Badge color="success">Active</Badge>

// Neutral label / category / keyword
<Tag>Engineering</Tag>

// Removable filter chip
<Tag removable onRemove={() => remove("react")}>React</Tag>`;

export default function BadgePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Badge &amp; Tag</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        One component, two jobs. <strong className="font-semibold">Badge</strong>{" "}
        is a colored status pill -- counts, states, severity.{" "}
        <strong className="font-semibold">Tag</strong> (a wrapper over Badge
        with a fixed neutral look) is a label / category / keyword, and the
        only one that can be <code className="font-mono">removable</code>.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-xl border border-border bg-muted p-10">
          <Badge color="success">Active</Badge>
          <Tag>Engineering</Tag>
        </div>
        <p className="mt-2 text-small">
          Every color maps to a Folio feedback token -- no raw Tailwind
          palette utilities.
        </p>
      </section>

      {/* Status (Badge) */}
      <section id="status" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Status <span className="text-muted-foreground">(Badge)</span>
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colors.map((c) => (
            <div
              key={c.color}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                <Badge color={c.color}>{c.label}</Badge>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={c.code}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small">
          Semantic intent is the <code className="font-mono">color</code> prop,
          combined with <code className="font-mono">variant</code> (solid /
          soft / outline). The error value is{" "}
          <code className="font-mono">destructive</code>.
        </p>
      </section>

      {/* Label (Tag) */}
      <section id="label" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Label <span className="text-muted-foreground">(Tag)</span>
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center gap-2 bg-muted p-8">
              <Tag>Engineering</Tag>
              <Tag>Design</Tag>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Tag>Engineering</Tag>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Badge variant="outline" className="bg-secondary">
                Neutral label
              </Badge>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Badge variant="outline" className="bg-secondary">
  Neutral label
</Badge>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          A Tag is just an outline <code className="font-mono">Badge</code> on
          the secondary surface -- neutral, no color axis. Use it for taxonomy,
          not state.
        </p>
      </section>

      {/* Removable filter chips */}
      <section id="removable" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Removable <span className="text-muted-foreground">(filter chips)</span>
        </h3>
        <div className="rounded-xl border border-border bg-muted p-8">
          <FilterChips />
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">removable</code> lives on{" "}
          <code className="font-mono">Tag</code> only -- it renders a ✕ button and
          fires <code className="font-mono">onRemove</code>. This is the canonical
          filter-chip pattern. Badges are never removable (status isn&apos;t
          dismissable).
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="mb-2 text-small font-medium text-foreground">Badge</div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "variant", type: "\"default\" | \"secondary\" | \"outline\"", def: "\"default\"", desc: "Fill style -- solid, tonal, or bordered." },
                { name: "color", type: "\"default\" | \"primary\" | \"destructive\" | \"success\" | \"warning\" | \"info\" | \"orange\" | \"amber\" | \"lime\" | \"emerald\" | \"teal\" | \"cyan\" | \"sky\" | \"fuchsia\" | \"pink\" | \"rose\"", def: "\"default\"", desc: "Semantic color. Folio has no raw palette, so each hue color uses the closest status token." },
                { name: "size", type: "\"default\" | \"sm\"", def: "\"default\"", desc: "Standard or compact." },
                { name: "asChild", type: "boolean", def: "false", desc: "Render the child element as the badge." },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">{p.name}</div>
                  <div className="font-mono text-caption">{p.type}</div>
                  <div className="font-mono text-caption">{p.def}</div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 mb-2 text-small font-medium text-foreground">
          Tag <span className="text-muted-foreground">(wrapper over Badge)</span>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "removable", type: "boolean", def: "false", desc: "Render a trailing ✕ button (interactive chip)." },
                { name: "onRemove", type: "() => void", def: "—", desc: "Fired when the ✕ is clicked." },
                { name: "size", type: "\"default\" | \"sm\"", def: "\"default\"", desc: "Standard or compact." },
                { name: "asChild", type: "boolean", def: "false", desc: "Render the child element as the tag (non-removable only)." },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">{p.name}</div>
                  <div className="font-mono text-caption">{p.type}</div>
                  <div className="font-mono text-caption">{p.def}</div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
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
              Don&apos;t color a category (that&apos;s a neutral{" "}
              <code className="font-mono">Tag</code>), and don&apos;t make a
              status removable (status isn&apos;t dismissable). Never fake either
              with a pill-shaped Button.
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

      {/* Copy-paste */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        One implementation:{" "}
        <code className="font-mono text-foreground">Badge</code> from{" "}
        <code className="font-mono text-foreground">@distylai/toolkit-ui</code>;{" "}
        <code className="font-mono text-foreground">Tag</code> is the neutral
        wrapper that adds <code className="font-mono text-foreground">removable</code>.
        Colors are Folio tokens.
      </footer>
    </div>
  );
}
