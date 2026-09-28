import type { Metadata } from "next";
import { Input } from "@/components/shadcn/input";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Input",
  description:
    "Input component -- a form input field or a component that looks like an input field. API matches @distylai/toolkit-ui Input.",
};

const states = [
  {
    key: "default",
    label: "Default",
    code: `<Input placeholder="Enter text" />`,
    node: <Input placeholder="Enter text" />,
  },
  {
    key: "disabled",
    label: "Disabled",
    code: `<Input disabled placeholder="Enter text" />`,
    node: <Input disabled placeholder="Enter text" />,
  },
  {
    key: "invalid",
    label: "Invalid",
    code: `<Input aria-invalid defaultValue="Not an email" />`,
    node: <Input aria-invalid defaultValue="Not an email" />,
  },
  {
    key: "file",
    label: "File",
    code: `<Input type="file" />`,
    node: <Input type="file" />,
  },
] as const;

const labelCode = `<div className="flex flex-col gap-2">
  <label htmlFor="email" className="text-label">
    Email
  </label>
  <Input id="email" type="email" placeholder="derek.ho@distyl.ai" />
  <p className="text-description">We'll never share your email.</p>
</div>`;

const doCode = `// Pair the Input with a <label> tied via htmlFor/id
<label htmlFor="name">Name</label>
<Input id="name" placeholder="Derek Ho" />`;

const installCode = `import { Input } from "@/components/shadcn/input";

export function EmailField() {
  return <Input type="email" placeholder="derek.ho@distyl.ai" />;
}`;

export default function InputPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Input</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays a form input field or a component that looks like an input
        field. Use it for short, single-line text entry.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <Input placeholder="Enter text" className="max-w-sm" />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the surface, border, and focus
          ring remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {states.map((s) => (
            <div
              key={s.key}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                <div className="w-full max-w-xs">{s.node}</div>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={s.code}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small">
          Invalid styling is driven by the native{" "}
          <code className="font-mono">aria-invalid</code> attribute -- no separate
          prop -- so it stays in sync with form validation and screen readers.
        </p>
      </section>

      {/* With a label */}
      <section id="with-label" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">With a label</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex items-start justify-center rounded-xl border border-border bg-muted p-8">
            <div className="flex w-full max-w-xs flex-col gap-2">
              <label
                htmlFor="email"
                className="text-label"
              >
                Email
              </label>
              <Input id="email" type="email" placeholder="derek.ho@distyl.ai" />
              <p className="text-description">
                We&apos;ll never share your email.
              </p>
            </div>
          </div>
          <CodeBlock
            code={labelCode}
            className="rounded-xl border border-border bg-muted"
          />
        </div>
        <p className="mt-2 text-small">
          Always tie the label to the input with{" "}
          <code className="font-mono">htmlFor</code> /{" "}
          <code className="font-mono">id</code> so clicking the label focuses the
          field.
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
                { name: "size", type: "\"default\" | \"sm\"", def: "\"default\"", desc: "Height -- default is 36px (h-9), sm is 32px (h-8)." },
                { name: "type", type: "string", def: "\"text\"", desc: "Native input type -- text, email, password, number." },
                { name: "placeholder", type: "string", def: "undefined", desc: "Hint shown while the field is empty." },
                { name: "value / defaultValue", type: "string", def: "undefined", desc: "Controlled / uncontrolled value." },
                { name: "disabled", type: "boolean", def: "false", desc: "Dims and blocks input." },
                { name: "...props", type: "InputHTMLAttributes", def: "—", desc: "All native input attributes pass through." },
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
        <h3 className="mt-12 mb-4 text-lead text-foreground">Don&apos;t and Do</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t use an Input as a read-only label or hardcode{" "}
              <code className="font-mono">border-gray-300</code> /{" "}
              <code className="font-mono">bg-white</code> on it -- that breaks dark
              mode and the rebrand.
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

      {/* Install */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          Drop-in ready. The field spreads all native{" "}
          <code className="font-mono">input</code> props (
          <code className="font-mono">type</code>,{" "}
          <code className="font-mono">value</code>,{" "}
          <code className="font-mono">onChange</code>, …) and the Folio tokens
          are baked in.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        -- a single <code className="font-mono text-foreground">Input</code> that
        forwards its ref, takes a{" "}
        <code className="font-mono text-foreground">size</code> variant, and
        spreads the native input props. The classes use Folio tokens.
      </footer>
    </div>
  );
}
