import type { Metadata } from "next";
import { ChevronLeft, ChevronRight, Redo2, Undo2 } from "lucide-react";
import { ButtonGroup } from "@/components/shadcn/button-group";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Button Group",
  description:
    "Button Group -- independent actions joined into one control. For choosing one option use Tabs or a single-select Toggle Group; for on/off toggles use Toggle Group.",
};

const props = [
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    def: '"horizontal"',
    desc: "Joins buttons left to right or stacked top to bottom.",
  },
] as const;

const doCode = `// Independent actions that belong together
<ButtonGroup>
  <Button variant="outline"><ChevronLeft /> Previous</Button>
  <Button variant="outline">Next <ChevronRight /></Button>
</ButtonGroup>`;

const installCode = `import { ButtonGroup } from "@/components/shadcn/button-group";
import { Button } from "@/components/shadcn/button";
import { Undo2, Redo2 } from "lucide-react";

// A toolbar of independent actions -- each fires on its own, no selected state.
export function HistoryControls() {
  return (
    <ButtonGroup>
      <Button variant="outline" aria-label="Undo"><Undo2 /></Button>
      <Button variant="outline" aria-label="Redo"><Redo2 /></Button>
    </ButtonGroup>
  );
}`;

export default function ButtonGroupPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Button Group</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Joins a set of <strong className="font-semibold">independent
        actions</strong> into one control -- a shared edge, with the radius on
        the outermost corners only. Each button fires its own action; the group
        holds no selected state.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Choosing <em>one</em> option (a view or filter switch) is not this --
          use <strong className="font-semibold">Tabs</strong> or a single-select{" "}
          <strong className="font-semibold">Toggle Group</strong>. On/off
          formatting (bold, italic) is a{" "}
          <strong className="font-semibold">Toggle Group</strong>. Button Group
          is only for actions that sit together but act independently.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ButtonGroup>
            <Button variant="outline">
              <ChevronLeft />
              Previous
            </Button>
            <Button variant="outline">
              Next
              <ChevronRight />
            </Button>
          </ButtonGroup>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. The seam is shared; only the outer
          corners round, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">
                  <ChevronLeft />
                  Previous
                </Button>
                <Button variant="outline">
                  Next
                  <ChevronRight />
                </Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ButtonGroup>
  <Button variant="outline"><ChevronLeft /> Previous</Button>
  <Button variant="outline">Next <ChevronRight /></Button>
</ButtonGroup>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline" aria-label="Undo">
                  <Undo2 />
                </Button>
                <Button variant="outline" aria-label="Redo">
                  <Redo2 />
                </Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ButtonGroup>
  <Button variant="outline"><Undo2 /></Button>
  <Button variant="outline"><Redo2 /></Button>
</ButtonGroup>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button variant="outline">Copy</Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ButtonGroup>
  <Button variant="outline">Cut</Button>
  <Button variant="outline">Copy</Button>
  <Button variant="outline">Paste</Button>
</ButtonGroup>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup orientation="vertical">
                <Button variant="outline">Duplicate</Button>
                <Button variant="outline">Move</Button>
                <Button variant="outline">Archive</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ButtonGroup orientation="vertical">
  <Button variant="outline">Duplicate</Button>
  …
</ButtonGroup>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Text pairs, icon actions, action triads, and vertical stacks all join
          the same way. Set <code className="font-mono">orientation</code> to
          stack them.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button variant="outline">Copy</Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Default. At rest.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button variant="outline" className="bg-secondary">
                  Copy
                </Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Hover. Per button, on pointer over (shown statically).
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button
                  variant="outline"
                  className="bg-primary-subtle text-primary"
                >
                  Copy
                </Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Active. Press feedback per button (shown statically).
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline" disabled>
                  Cut
                </Button>
                <Button variant="outline" disabled>
                  Copy
                </Button>
                <Button variant="outline" disabled>
                  Paste
                </Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button variant="outline" disabled>Cut</Button>
<Button variant="outline" disabled>Copy</Button>
<Button variant="outline" disabled>Paste</Button>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ButtonGroup>
                <Button variant="outline">Cut</Button>
                <Button variant="outline" disabled>
                  Copy
                </Button>
                <Button variant="outline">Paste</Button>
              </ButtonGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Button variant="outline" disabled>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Hover and active respond per button. The group has no{" "}
          <code className="font-mono">disabled</code> prop: set{" "}
          <code className="font-mono">disabled</code> on each button to disable
          the whole set, or on one button only.
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
          Individual buttons accept standard{" "}
          <code className="font-mono">Button</code> props, including{" "}
          <code className="font-mono">variant</code>,{" "}
          <code className="font-mono">size</code>, and{" "}
          <code className="font-mono">disabled</code>. Set them on each button;
          the group does not pass them down. The module also exports{" "}
          <code className="font-mono">ButtonGroupText</code> (a static label
          segment) and <code className="font-mono">ButtonGroupSeparator</code>{" "}
          (a divider between segments).
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
              Don&apos;t use a Button Group to pick one option -- a Day / Week /
              Month view switcher is mutually exclusive, so it&apos;s{" "}
              <strong className="font-semibold">Tabs</strong> or a single-select{" "}
              <strong className="font-semibold">Toggle Group</strong>. Bold /
              Italic / Underline hold on/off state, so that&apos;s a{" "}
              <strong className="font-semibold">Toggle Group</strong>. And
              don&apos;t join unrelated actions -- the shared edge says they
              belong together.
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
          Use it for independent actions that belong together: Previous / Next,
          Undo / Redo, or Cut / Copy / Paste.
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
