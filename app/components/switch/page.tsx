import type { Metadata } from "next";
import { Switch } from "@/components/shadcn/switch";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Switch",
  description:
    "Switch component -- a control that toggles an on/off setting that applies immediately. API matches @distylai/toolkit-ui.",
};

const states = [
  { key: "off", label: "Off", code: `<Switch />`, node: <Switch /> },
  {
    key: "on",
    label: "On",
    code: `<Switch defaultChecked />`,
    node: <Switch defaultChecked />,
  },
  {
    key: "disabled",
    label: "Disabled",
    code: `<Switch disabled defaultChecked />`,
    node: <Switch disabled defaultChecked />,
  },
] as const;

const installCode = `import { Switch } from "@/components/shadcn/switch";

export function AirplaneMode() {
  return (
    <label className="flex items-center gap-2 text-sm">
      <Switch /> Airplane Mode
    </label>
  );
}`;

export default function SwitchPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Switch</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A control that toggles between checked and not checked. Use it for
        settings that apply immediately -- no submit step.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <label className="flex items-center gap-2 text-label">
            <Switch defaultChecked />
            Airplane Mode
          </label>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the track flips to the brand
          token when on and the thumb stays on the surface token, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
                { name: "checked", type: "boolean", def: "undefined", desc: "Controlled state. Pair with onCheckedChange." },
                { name: "defaultChecked", type: "boolean", def: "false", desc: "Initial state when uncontrolled." },
                { name: "onCheckedChange", type: "(checked) => void", def: "undefined", desc: "Fires when the switch is toggled." },
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
              Don&apos;t use a Switch where the change only takes effect after a
              Save -- that&apos;s a Checkbox. A Switch implies an immediate effect.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<label className="flex items-center gap-2">
  <Switch checked={wifi} onCheckedChange={setWifi} /> Wi-Fi
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
          Built on Radix Switch -- keyboard toggle and ARIA come for free. Use{" "}
          <code className="font-mono">checked</code> /{" "}
          <code className="font-mono">onCheckedChange</code> for controlled state.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>
        . The raw <code className="font-mono text-foreground">bg-primary</code>{" "}
        / <code className="font-mono text-foreground">bg-input</code> /{" "}
        <code className="font-mono text-foreground">bg-background</code>{" "}
        utilities are replaced with Folio tokens.
      </footer>
    </div>
  );
}
