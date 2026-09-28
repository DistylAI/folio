import type { Metadata } from "next";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/shadcn/resizable";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Resizable",
  description:
    "Resizable component -- panels with drag handles for split-pane layouts, editors, and any surface where the user controls panel sizing.",
};

const api = [
  { name: "ResizablePanelGroup", type: "component", def: "—", desc: "Wraps the panels. Set direction to horizontal or vertical." },
  { name: "ResizablePanelGroup.direction", type: '"horizontal" | "vertical"', def: "required", desc: "Axis the panels are laid out and resized along." },
  { name: "ResizablePanel", type: "component", def: "—", desc: "A single panel within the group." },
  { name: "ResizablePanel.defaultSize", type: "number | string", def: "—", desc: "Initial size. A string is a percent of the group (\"50\" or \"50%\"). A number is pixels." },
  { name: "ResizablePanel.minSize", type: "number | string", def: "—", desc: "Smallest size the panel can be dragged to. Same units as defaultSize." },
  { name: "ResizablePanel.maxSize", type: "number | string", def: "—", desc: "Largest size the panel can be dragged to. Same units as defaultSize." },
  { name: "ResizablePanel.collapsible", type: "boolean", def: "false", desc: "Allows the panel to collapse past its minSize." },
  { name: "ResizablePanel.collapsedSize", type: "number | string", def: "0", desc: "Size the panel snaps to when collapsed. Same units as defaultSize." },
  { name: "ResizablePanel.panelRef", type: "Ref", def: "—", desc: "Imperative handle from useResizablePanelRef: collapse(), expand(), resize(), getSize()." },
  { name: "ResizableHandle.withHandle", type: "boolean", def: "false", desc: "Shows a visible grip on the drag handle." },
  { name: "useResizableLayout", type: "hook", def: "—", desc: "Saves and restores the group layout. Pass { id, storage } and spread the result on ResizablePanelGroup." },
  { name: "useResizablePanelRef", type: "hook", def: "—", desc: "Returns a ref for ResizablePanel.panelRef, to collapse or resize a panel from code." },
] as const;

const doCode = `<ResizablePanelGroup direction="horizontal">
  <ResizablePanel defaultSize="30" minSize="20">
    Sidebar
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize="70">Editor</ResizablePanel>
</ResizablePanelGroup>`;

const installCode = `import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/shadcn/resizable";

export function SplitView() {
  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6">One</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="50">
        <div className="flex h-full items-center justify-center p-6">Two</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}`;

function Pane({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center p-6 text-label">
      {children}
    </div>
  );
}

export default function ResizablePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Resizable</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Panels joined by drag handles that let the reader resize them. Use it for
        split-pane layouts, editors, and any surface where controlling the
        proportions is useful.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-10">
          <div className="mx-auto h-52 max-w-xl overflow-hidden rounded-xl border border-border bg-background">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize="50">
                <Pane>One</Pane>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="50">
                <Pane>Two</Pane>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Drag the handle to resize, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-muted p-8">
              <div className="h-44 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize="50">
                    <Pane>One</Pane>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize="50">
                    <Pane>Two</Pane>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ResizablePanelGroup direction="horizontal">`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-muted p-8">
              <div className="h-44 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize="50">
                    <Pane>One</Pane>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize="50">
                    <Pane>Two</Pane>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ResizablePanelGroup direction="vertical">`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border lg:col-span-2">
            <div className="bg-muted p-8">
              <div className="h-52 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize="40">
                    <Pane>One</Pane>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize="60">
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize="50">
                        <Pane>Two</Pane>
                      </ResizablePanel>
                      <ResizableHandle withHandle />
                      <ResizablePanel defaultSize="50">
                        <Pane>Three</Pane>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ResizablePanel defaultSize="60">
  <ResizablePanelGroup direction="vertical">…</ResizablePanelGroup>
</ResizablePanel>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          A horizontal split, a vertical split, and panels nested inside a panel
          for more complex layouts.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-muted p-8">
              <div className="h-40 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize="50">
                    <Pane>One</Pane>
                  </ResizablePanel>
                  <ResizableHandle />
                  <ResizablePanel defaultSize="50">
                    <Pane>Two</Pane>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Default. A plain handle, no grip.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-muted p-8">
              <div className="h-40 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel defaultSize="50">
                    <Pane>One</Pane>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize="50">
                    <Pane>Two</Pane>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Dragging. Grab the grip to resize.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-muted p-8">
              <div className="h-40 overflow-hidden rounded-xl border border-border bg-background">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel
                    defaultSize="12"
                    minSize="12"
                    collapsible
                    collapsedSize="12"
                  >
                    <Pane>Rail</Pane>
                  </ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel defaultSize="88">
                    <Pane>Editor</Pane>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Collapsed. A collapsible panel at its collapsedSize.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The handle activates while dragging. A panel marked{" "}
          <code className="font-mono">collapsible</code> can snap to its{" "}
          <code className="font-mono">collapsedSize</code>.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.8fr_1.6fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {api.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.8fr_1.6fr_1fr_3fr] gap-4 px-4 py-3"
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
          String sizes are percentages of the group; number sizes are pixels.
          Give the{" "}
          <code className="font-mono">ResizablePanelGroup</code> a sized parent so
          it has room to lay the panels out.
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
              Don&apos;t use Resizable for a layout that should stay fixed. The
              drag handles tell the reader the proportions are theirs to change,
              so applying them to a structure you want to hold steady invites
              edits you did not intend. Use plain layout utilities there.
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
          Use it for editor layouts, split views, and any surface where the
          reader benefits from controlling the proportion of visible content.
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
