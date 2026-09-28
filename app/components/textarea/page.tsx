import type { Metadata } from "next";
import { Textarea } from "@/components/shadcn/textarea";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Textarea",
  description:
    "Textarea component -- a multi-line text input. API matches @distylai/toolkit-ui.",
};

const states = [
  {
    key: "default",
    label: "Default",
    code: `<Textarea placeholder="Type your message here" />`,
    node: <Textarea placeholder="Type your message here" />,
  },
  {
    key: "invalid",
    label: "Invalid",
    code: `<Textarea aria-invalid defaultValue="Too short" />`,
    node: <Textarea aria-invalid defaultValue="Too short" />,
  },
  {
    key: "disabled",
    label: "Disabled",
    code: `<Textarea disabled placeholder="Type your message here" />`,
    node: <Textarea disabled placeholder="Type your message here" />,
  },
] as const;

const installCode = `import { Textarea } from "@/components/shadcn/textarea";

export function Message() {
  return <Textarea placeholder="Type your message here" rows={4} />;
}`;

export default function TextareaPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Textarea</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays a form textarea or a component that looks like a textarea. Use
        it for multi-line text such as messages, comments, and descriptions.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="flex w-full max-w-sm flex-col gap-2">
            <label
              htmlFor="message"
              className="text-label"
            >
              Your message
            </label>
            <Textarea id="message" placeholder="Type your message here" />
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- surface, border, and focus ring
          remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. It matches the Input field, just multi-line.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {states.map((s) => (
            <div
              key={s.key}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="bg-muted p-8">{s.node}</div>
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
          Invalid styling keys off the native{" "}
          <code className="font-mono">aria-invalid</code> attribute, so it stays
          in sync with form validation.
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
                { name: "placeholder", type: "string", def: "undefined", desc: "Hint shown while the field is empty." },
                { name: "rows", type: "number", def: "undefined", desc: "Visible line count before it scrolls." },
                { name: "value / defaultValue", type: "string", def: "undefined", desc: "Controlled / uncontrolled value." },
                { name: "disabled", type: "boolean", def: "false", desc: "Dims and blocks input." },
                { name: "...props", type: "TextareaHTMLAttributes", def: "—", desc: "All native textarea attributes pass through." },
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
              Don&apos;t use a Textarea for a single line of input -- that&apos;s
              an Input. And don&apos;t hardcode{" "}
              <code className="font-mono">border-gray-300</code>; the variant is
              token-driven.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<label htmlFor="bio">Bio</label>
<Textarea id="bio" rows={4} />`}
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
          Drop-in ready. It spreads every native{" "}
          <code className="font-mono">textarea</code> prop (
          <code className="font-mono">rows</code>,{" "}
          <code className="font-mono">value</code>,{" "}
          <code className="font-mono">onChange</code>, …).
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        -- a single <code className="font-mono text-foreground">Textarea</code>{" "}
        spreading{" "}
        <code className="font-mono text-foreground">
          React.ComponentProps&lt;&quot;textarea&quot;&gt;
        </code>
        . Raw Tailwind utilities are replaced with Folio tokens.
      </footer>
    </div>
  );
}
