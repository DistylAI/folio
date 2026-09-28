import type { Metadata } from "next";
import { Check, Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Button",
  description:
    "Button component -- variants, states, usage, and a drop-in snippet. API matches @distylai/toolkit-ui Button.",
};

const variants = [
  { variant: "default", label: "Button", code: `<Button>Button</Button>` },
  {
    variant: "outline",
    label: "Outline",
    code: `<Button variant="outline">Outline</Button>`,
  },
  {
    variant: "destructive",
    label: "Delete",
    code: `<Button variant="destructive">Delete</Button>`,
  },
  {
    variant: "ghost",
    label: "Ghost",
    code: `<Button variant="ghost">Ghost</Button>`,
  },
  {
    variant: "link",
    label: "Link",
    code: `<Button variant="link">Link</Button>`,
  },
] as const;

const doCode = `// Triggers a mutation or event
<Button onClick={save}>Save changes</Button>
<Button variant="destructive" onClick={remove}>
  Delete
</Button>`;

const installCode = `import { Button } from "@/components/shadcn/button";

export function SaveChanges() {
  return <Button onClick={handleSave}>Save changes</Button>;
}`;

export default function ButtonPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Button</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Use for actions that trigger a mutation or event. Not for labels,
        navigation, or status.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <Button>Button</Button>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- toggle the theme and it remaps,
          no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {variants.map((v) => (
            <div
              key={v.variant}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                <Button variant={v.variant}>{v.label}</Button>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={v.code}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sizes */}
      <section id="sizes" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Sizes</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center gap-3 bg-muted p-8">
              <Button size="default">
                <Check />
                Default
              </Button>
              <Button size="sm">
                <Check />
                Small
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button size="default"><Check />Default</Button>
<Button size="sm"><Check />Small</Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center gap-3 bg-muted p-8">
              <Button size="icon" aria-label="Add">
                <Plus />
              </Button>
              <Button size="icon-sm" aria-label="Add">
                <Plus />
              </Button>
              <Button size="icon-xs" aria-label="Add">
                <Plus />
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button size="icon"><Plus /></Button>
<Button size="icon-sm"><Plus /></Button>
<Button size="icon-xs"><Plus /></Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center gap-3 bg-muted p-8">
              <Button loading loadingText="Saving…">
                Save
              </Button>
              <Button size="sm" loading loadingText="Saving…">
                Save
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button loading loadingText="Saving…">Save</Button>
<Button size="sm" loading loadingText="Saving…">Save</Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Icons and the loading spinner scale with the button size -- no
          per-instance sizing.{" "}
          <code className="font-mono">default</code> is the top of the scale.
          The API also has <code className="font-mono">xs</code>,{" "}
          <code className="font-mono">xxs</code>, and{" "}
          <code className="font-mono">icon-xxs</code> for dense toolbars.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Button disabled>Disabled</Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button disabled>Disabled</Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Button loading loadingText="Saving…">
                Save
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button loading loadingText="Saving…">Save</Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">loading</code> is a built-in prop -- it
          shows a spinner and disables the button. Don&apos;t add an external
          spinner.
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
              {[
                { name: "variant", type: "\"default\" | \"destructive\" | \"outline\" | \"secondary\" | \"ghost\" | \"link\"", def: "\"default\"", desc: "Visual style of the button. Prefer outline over secondary for a bordered button." },
                { name: "size", type: "\"default\" | \"sm\" | \"xs\" | \"xxs\" | \"icon\" | \"icon-sm\" | \"icon-xs\" | \"icon-xxs\"", def: "\"default\"", desc: "Height and padding; icons scale with the size. Icon sizes are square." },
                { name: "asChild", type: "boolean", def: "false", desc: "Render the child element as the button (e.g. a link), keeping the styles." },
                { name: "disabled", type: "boolean", def: "false", desc: "Dims to 50% and blocks interaction (native button prop)." },
                { name: "loading", type: "boolean", def: "false", desc: "Shows a spinner in place of the children and disables the button." },
                { name: "loadingText", type: "string", def: "--", desc: "Label shown next to the spinner while loading is true." },
                { name: "tooltipText", type: "string", def: "--", desc: "Wraps the button in a Tooltip that shows on hover, enabled or disabled." },
                { name: "disabledTooltipText", type: "string", def: "--", desc: "Replaces tooltipText while the button is disabled. Use it to explain why." },
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
              Don&apos;t use a Button as a non-interactive label, category, or
              status pill -- that&apos;s a Tag or a Badge.
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
        <p className="mt-2 text-small">
          Drop-in ready. Variants and Folio tokens are baked into the
          component -- no <code className="font-mono">className</code> needed for
          standard usage.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        Button
        -- variants, sizes, and props (
        <code className="font-mono text-foreground">asChild</code>,{" "}
        <code className="font-mono text-foreground">loading</code>,{" "}
        <code className="font-mono text-foreground">loadingText</code>,{" "}
        <code className="font-mono text-foreground">tooltipText</code>,{" "}
        <code className="font-mono text-foreground">disabledTooltipText</code>
        ).
      </footer>
    </div>
  );
}
