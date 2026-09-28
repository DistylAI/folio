import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  AlignPopover,
  DimensionsPopover,
  SimplePopover,
} from "./PopoverDemos";

export const metadata: Metadata = {
  title: "Popover",
  description:
    "Popover component -- displays rich content in a portal, triggered by a button. API matches @distylai/toolkit-ui components/shadcn/popover.",
};

const props = [
  {
    name: "Popover open",
    type: "boolean",
    def: "undefined",
    desc: "Controlled open state. Pair with onOpenChange; omit for uncontrolled.",
  },
  {
    name: "Popover defaultOpen",
    type: "boolean",
    def: "false",
    desc: "Open on mount when uncontrolled.",
  },
  {
    name: "PopoverTrigger asChild",
    type: "boolean",
    def: "false",
    desc: "Render your own element (e.g. a Button) as the trigger.",
  },
  {
    name: "PopoverContent align",
    type: '"start" | "center" | "end"',
    def: '"center"',
    desc: "Alignment against the trigger along the side axis.",
  },
  {
    name: "PopoverContent side",
    type: '"top" | "right" | "bottom" | "left"',
    def: '"bottom"',
    desc: "Which side of the trigger the content opens on.",
  },
  {
    name: "PopoverContent sideOffset",
    type: "number",
    def: "4",
    desc: "Gap in pixels between the trigger and the content.",
  },
] as const;

const dimensionsCode = `<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="grid gap-4">
      <div className="space-y-1">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-description">Set the dimensions for the layer.</p>
      </div>
      <div className="grid grid-cols-3 items-center gap-4">
        <label htmlFor="width">Width</label>
        <Input id="width" placeholder="Placeholder" className="col-span-2 h-8" />
      </div>
      {/* …more fields */}
    </div>
  </PopoverContent>
</Popover>`;

const simpleCode = `<PopoverContent>
  <div className="space-y-1">
    <h4 className="font-medium leading-none">Activity log</h4>
    <p className="text-description">Rich content lives in a portal…</p>
  </div>
</PopoverContent>`;

const alignCode = `<PopoverContent align="start">…</PopoverContent>
<PopoverContent align="center">…</PopoverContent>
<PopoverContent align="end">…</PopoverContent>`;

const installCode = `import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

export function DimensionsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h4 className="font-medium leading-none">Dimensions</h4>
        <p className="text-description">Set the dimensions for the layer.</p>
      </PopoverContent>
    </Popover>
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

export default function PopoverDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Popover</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays rich content in a portal, triggered by a button. Use it for
        secondary controls -- a form, a detail panel, a set of options -- that
        should float above the page and dismiss on outside click or Escape.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <DimensionsPopover />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the panel surface, border, and
          text remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Trigger it to float
          the content over the page.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Cell code={dimensionsCode}>
            <DimensionsPopover />
          </Cell>
          <Cell code={simpleCode}>
            <SimplePopover />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The popover frames whatever you put in it -- a compact form like
          Dimensions, or a short block of detail. Set an explicit width on{" "}
          <code className="font-mono">PopoverContent</code> (it defaults to{" "}
          <code className="font-mono">w-72</code>).
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Alignment</h3>
        <div className="grid grid-cols-1 gap-4">
          <Cell code={alignCode}>
            <div className="flex w-full max-w-2xl flex-wrap items-center justify-between gap-6">
              <AlignPopover align="start" />
              <AlignPopover align="center" />
              <AlignPopover align="end" />
            </div>
          </Cell>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">align</code> positions the content against
          the trigger; pair it with <code className="font-mono">side</code> and{" "}
          <code className="font-mono">sideOffset</code> to control placement.
          Radix flips the side automatically when there isn&apos;t room.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.6fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
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
              Don&apos;t use a popover for a simple menu of actions -- that&apos;s{" "}
              <code className="font-mono">Dropdown Menu</code> -- or for a flat
              text hint, which is a <code className="font-mono">Tooltip</code>.
              And don&apos;t put critical, must-act-on content in one; it
              dismisses on any outside click.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Open</Button>
  </PopoverTrigger>
  <PopoverContent>…</PopoverContent>
</Popover>`}
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
          @distylai/toolkit-ui components/shadcn/popover
        </code>{" "}
        -- <code className="font-mono text-foreground">Popover</code>,{" "}
        <code className="font-mono text-foreground">PopoverTrigger</code>,{" "}
        <code className="font-mono text-foreground">PopoverAnchor</code>,{" "}
        <code className="font-mono text-foreground">PopoverContent</code>,{" "}
        <code className="font-mono text-foreground">PopoverPortal</code>. The
        raw popover surface and foreground are replaced with Folio tokens,
        matching the Dropdown Menu and Dialog content.
      </footer>
    </div>
  );
}
