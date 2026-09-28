import type { Metadata } from "next";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "@/components/shadcn/toggle";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Toggle",
  description:
    "Toggle component -- a two-state button that can be either on or off. API matches @distylai/toolkit-ui Toggle.",
};

const props = [
  {
    name: "pressed",
    type: "boolean",
    def: "undefined",
    desc: "Controlled on/off state. Pair with onPressedChange.",
  },
  {
    name: "defaultPressed",
    type: "boolean",
    def: "false",
    desc: "Initial state when uncontrolled.",
  },
  {
    name: "onPressedChange",
    type: "(pressed: boolean) => void",
    def: "undefined",
    desc: "Fires when the user toggles it.",
  },
  {
    name: "variant",
    type: '"default" | "outline" | "secondary"',
    def: '"default"',
    desc: "default is borderless; outline adds a border for standalone use; secondary is a segment inside a secondary ToggleGroup track.",
  },
  {
    name: "size",
    type: '"default" | "sm" | "xs" | "xxs" | "icon" | "icon-sm" | "icon-xs" | "icon-xxs"',
    def: '"default"',
    desc: "Control height and padding (h-9 / h-8 / h-7 / h-6). Icon sizes are square.",
  },
  {
    name: "tooltipText",
    type: "string",
    def: "undefined",
    desc: "Wraps the toggle in a Tooltip that shows on hover.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Dims to 50% and blocks interaction.",
  },
] as const;

const defaultCode = `<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>`;

const outlineCode = `<Toggle variant="outline" aria-label="Toggle italic">
  <Italic />
</Toggle>`;

const textCode = `<Toggle aria-label="Toggle bold">
  <Bold />
  Bold
</Toggle>`;

const sizesCode = `<Toggle size="sm" aria-label="Bold"><Bold /></Toggle>
<Toggle size="default" aria-label="Bold"><Bold /></Toggle>
<Toggle className="h-10 min-w-10 px-2.5" aria-label="Bold">
  <Bold />
</Toggle>`;

const onCode = `<Toggle defaultPressed aria-label="Toggle bold">
  <Bold />
</Toggle>`;

const disabledCode = `<Toggle disabled aria-label="Toggle bold">
  <Bold />
</Toggle>`;

const installCode = `import { Toggle } from "@/components/shadcn/toggle";
import { Bold } from "lucide-react";

export function BoldToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <Toggle
      pressed={pressed}
      onPressedChange={setPressed}
      aria-label="Toggle bold"
    >
      <Bold />
    </Toggle>
  );
}`;

function Cell({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-center bg-muted p-8">
        {children}
      </div>
      <div className="border-t border-border p-3">
        <CodeBlock
          code={code}
          size="sm"
          className="rounded-lg border border-border-subtle bg-muted"
        />
      </div>
    </div>
  );
}

export default function ToggleDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Toggle</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A two-state button that can be either on or off. Use it for a single
        formatting control -- bold, italic, mute -- where the pressed state holds
        until the user toggles it back.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center gap-1 rounded-xl border border-border bg-muted p-10">
          <Toggle aria-label="Toggle bold">
            <Bold />
          </Toggle>
          <Toggle aria-label="Toggle italic">
            <Italic />
          </Toggle>
          <Toggle aria-label="Toggle underline">
            <Underline />
          </Toggle>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- hover and the pressed state (an
          accent surface with primary text) remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Click a control to
          toggle it.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Cell code={defaultCode}>
            <Toggle aria-label="Toggle bold">
              <Bold />
            </Toggle>
          </Cell>
          <Cell code={outlineCode}>
            <Toggle variant="outline" aria-label="Toggle italic">
              <Italic />
            </Toggle>
          </Cell>
          <Cell code={textCode}>
            <Toggle aria-label="Toggle bold">
              <Bold />
              Bold
            </Toggle>
          </Cell>
          <Cell code={sizesCode}>
            <div className="flex items-center gap-2">
              <Toggle size="sm" aria-label="Bold small">
                <Bold />
              </Toggle>
              <Toggle size="default" aria-label="Bold default">
                <Bold />
              </Toggle>
              <Toggle className="h-10 min-w-10 px-2.5" aria-label="Bold large">
                <Bold />
              </Toggle>
            </div>
          </Cell>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">default</code> is borderless for toolbars;{" "}
          <code className="font-mono">outline</code> adds a border when it stands
          alone. Pair an icon with a label for clarity, and use{" "}
          <code className="font-mono">size</code> for{" "}
          <code className="font-mono">sm</code> /{" "}
          <code className="font-mono">default</code>. There is no{" "}
          <code className="font-mono">lg</code> size; set the height with{" "}
          <code className="font-mono">className</code> when you need one.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Cell code={defaultCode}>
            <Toggle aria-label="Toggle bold">
              <Bold />
            </Toggle>
          </Cell>
          <Cell code={onCode}>
            <Toggle defaultPressed aria-label="Toggle bold">
              <Bold />
            </Toggle>
          </Cell>
          <Cell code={disabledCode}>
            <Toggle disabled aria-label="Toggle bold">
              <Bold />
            </Toggle>
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Off is transparent; <span className="font-medium text-foreground">on</span>{" "}
          fills with the accent surface and primary text (
          <code className="font-mono">data-[state=on]</code>); a{" "}
          <code className="font-mono">disabled</code> toggle dims to 50% and stops
          responding.
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
              Don&apos;t use a Toggle for a setting that needs an explicit on/off
              label -- that&apos;s a <code className="font-mono">Switch</code>. And
              don&apos;t group mutually exclusive options with separate Toggles;
              reach for a toggle group or{" "}
              <code className="font-mono">Tabs</code> so only one stays pressed.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Toggle aria-label="Toggle bold">
  <Bold />
</Toggle>`}
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
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        -- <code className="font-mono text-foreground">Toggle</code> and{" "}
        <code className="font-mono text-foreground">toggleVariants</code> on
        Radix. The raw muted / accent / ring / primary-50 colors are replaced
        with Folio tokens.
      </footer>
    </div>
  );
}
