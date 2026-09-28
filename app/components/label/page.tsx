import type { Metadata } from "next";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Label",
  description:
    "Label component -- an accessible label associated with a form control via htmlFor. A form primitive that composes inside Input, Checkbox, and other controls.",
};

const props = [
  {
    name: "htmlFor",
    type: "string",
    def: "undefined",
    desc: "id of the control this label names. Required to wire label to control.",
  },
  {
    name: "children",
    type: "ReactNode",
    def: "required",
    desc: "The label text. Add a required asterisk as a child span.",
  },
  {
    name: "className",
    type: "string",
    def: "undefined",
    desc: "Extra classes. Use cursor-not-allowed opacity-50 to dim the label for a disabled control.",
  },
  {
    name: "...props",
    type: "Radix Label props",
    def: "—",
    desc: "All Radix Label and native label attributes pass through.",
  },
] as const;

const doCode = `<div className="space-y-1.5">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>`;

const installCode = `import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";

export function EmailField() {
  return (
    <div className="space-y-1.5">
      <Label htmlFor="email">
        Email
        <span aria-hidden className="ml-0.5 text-destructive">*</span>
      </Label>
      <Input id="email" type="email" />
    </div>
  );
}`;

export default function LabelPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Label</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An accessible label associated with a form control via{" "}
        <code className="font-mono">htmlFor</code>. Clicking the label focuses
        its control, and assistive tech reads them together.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Label is a form primitive. It appears composed inside Input, Checkbox,
          and other form components. This page documents it as a standalone
          building block.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="w-full max-w-xs space-y-1.5">
            <Label htmlFor="preview-email">Email</Label>
            <Input id="preview-email" type="email" placeholder="you@distyl.ai" />
            <p className="text-caption">
              We never share your email.
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Toggle the theme and it remaps,
          no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Label htmlFor="v-default">Email</Label>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Label htmlFor="email">Email</Label>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Label htmlFor="v-required">
                Email
                <span aria-hidden className="ml-0.5 text-destructive">
                  *
                </span>
              </Label>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Label htmlFor="email">
  Email
  <span aria-hidden className="ml-0.5 text-destructive">*</span>
</Label>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Label
                htmlFor="v-disabled"
                className="cursor-not-allowed opacity-50"
              >
                Email
              </Label>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Label htmlFor="email" className="cursor-not-allowed opacity-50">
  Email
</Label>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Label has no variant props. For a required field, add a{" "}
          <code className="font-mono">text-destructive</code> asterisk as a
          child. For a disabled control, dim the label with{" "}
          <code className="font-mono">opacity-50</code>. A label placed after a{" "}
          <code className="font-mono">peer</code> control dims on its own when
          the control is disabled.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <div className="w-full max-w-[220px] space-y-1.5">
                <Label htmlFor="s-default">Username</Label>
                <Input id="s-default" placeholder="distyl" />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Label htmlFor="username">Username</Label>
<Input id="username" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <div className="w-full max-w-[220px] space-y-1.5">
                <Label
                  htmlFor="s-disabled"
                  className="cursor-not-allowed opacity-50"
                >
                  Username
                </Label>
                <Input id="s-disabled" placeholder="distyl" disabled />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Label htmlFor="username" className="cursor-not-allowed opacity-50">
  Username
</Label>
<Input id="username" disabled />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          A disabled label dims to match its disabled control. The label has no
          hover or active state of its own.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.4fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.4fr_1fr_3fr] gap-4 px-4 py-3"
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
              Don&apos;t use a Label as a heading or section title. It names a
              single form control, not a region of the page. For titles, use the
              heading styles instead.
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
          Always pair a Label with a control via{" "}
          <code className="font-mono">htmlFor</code> -- Input, Checkbox, Radio, or
          Select.
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
