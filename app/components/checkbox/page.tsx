import type { Metadata } from "next";
import { Checkbox } from "@/components/shadcn/checkbox";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Checkbox",
  description:
    "Checkbox component -- a control that toggles between checked, unchecked, and indeterminate. API matches @distylai/toolkit-ui.",
};

const states = [
  { key: "unchecked", label: "Unchecked", code: `<Checkbox />`, node: <Checkbox /> },
  {
    key: "checked",
    label: "Checked",
    code: `<Checkbox defaultChecked />`,
    node: <Checkbox defaultChecked />,
  },
  {
    key: "indeterminate",
    label: "Indeterminate",
    code: `<Checkbox checked="indeterminate" />`,
    node: <Checkbox checked="indeterminate" />,
  },
  {
    key: "disabled",
    label: "Disabled",
    code: `<Checkbox disabled defaultChecked />`,
    node: <Checkbox disabled defaultChecked />,
  },
] as const;

const installCode = `import { Checkbox } from "@/components/shadcn/checkbox";

export function Terms() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox /> Accept terms and conditions
    </label>
  );
}`;

export default function CheckboxPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Checkbox</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A control that toggles between checked, unchecked, and indeterminate.
        Use it for multi-select options and opt-ins.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <label className="flex items-center gap-2 text-sm text-foreground">
            <Checkbox defaultChecked />
            Accept terms and conditions
          </label>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the box, check, and focus ring
          remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. Clicking the label toggles it.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {states.map((s) => (
            <div
              key={s.key}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                {s.node}
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
          <code className="font-mono">indeterminate</code> is a third visual
          state for &ldquo;some but not all&rdquo; -- set{" "}
          <code className="font-mono">checked=&quot;indeterminate&quot;</code>{" "}
          (e.g. a select-all header).
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
                { name: "checked", type: "boolean | \"indeterminate\"", def: "undefined", desc: "Controlled state. Pair with onCheckedChange." },
                { name: "defaultChecked", type: "boolean", def: "false", desc: "Initial state when uncontrolled." },
                { name: "onCheckedChange", type: "(checked) => void", def: "undefined", desc: "Fires when the box is toggled." },
                { name: "disabled", type: "boolean", def: "false", desc: "Dims to 50% and blocks interaction." },
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
              Don&apos;t use a Checkbox for mutually exclusive choices (that&apos;s
              a Radio Group) or for an on/off setting that applies immediately
              (that&apos;s a Switch).
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Tie it to a label for an accessible hit target
<label className="flex items-center gap-2">
  <Checkbox /> Email me updates
</label>`}
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
          Built on Radix Checkbox -- keyboard toggle and the indeterminate state
          come for free. Pass <code className="font-mono">checked</code> /{" "}
          <code className="font-mono">onCheckedChange</code> for controlled use.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>
        . The raw <code className="font-mono text-foreground">border-primary</code>{" "}
        / <code className="font-mono text-foreground">bg-primary</code>{" "}
        utilities are replaced with Folio tokens.
      </footer>
    </div>
  );
}
