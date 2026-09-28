import type { Metadata } from "next";
import { Button } from "@/components/shadcn/button";
import { Spinner } from "@/components/shadcn/spinner";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Spinner",
  description:
    "Spinner component -- an indeterminate loading indicator: a brand arc rotating smoothly on a neutral track.",
};

const props = [
  {
    name: "className",
    type: "string",
    def: '"size-6"',
    desc: "Size and layout overrides on the svg. Use size-4 inline and size-8 for a large wait.",
  },
  {
    name: "aria-label",
    type: "string",
    def: '"Loading"',
    desc: "Accessible label announced to screen readers via role=status.",
  },
  {
    name: "...props",
    type: 'React.ComponentProps<"svg">',
    def: "--",
    desc: "Other svg attributes pass through to the lucide Loader2Icon.",
  },
] as const;

const doCode = `<Spinner />
<Spinner className="size-4" />   // inline, e.g. in a button
<Spinner className="size-8" />`;

const installCode = `import { Spinner } from "@/components/shadcn/spinner";

export function SavingState() {
  return (
    <div className="flex items-center gap-2 text-description">
      <Spinner className="size-4" />
      Saving changes...
    </div>
  );
}`;

export default function SpinnerPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Spinner</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An indeterminate loading indicator for waits of unknown length. A brand
        arc rotates on a neutral track, spinning continuously until the wait
        ends.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Smooth by construction. The arc spins with a single linear rotation
          from 0 to 360 degrees, so the loop closes on itself with no seam or
          stutter. The arc maps to{" "}
          <code className="font-mono">background-primary</code> and the track to{" "}
          <code className="font-mono">border-default</code>, so both remap in
          dark mode.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center gap-3 rounded-xl border border-border bg-muted p-10">
          <Spinner />
          <span className="text-description">Processing payment...</span>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Toggle the theme and the arc and
          track remap, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <Spinner className="size-4" />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Spinner className="size-4" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <Spinner />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Spinner />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <Spinner className="size-8" />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Spinner className="size-8" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Three sizes at 16, 24, and 32 pixels. The default is 24; set{" "}
          <code className="font-mono">size-4</code> or{" "}
          <code className="font-mono">size-8</code> with{" "}
          <code className="font-mono">className</code>. Stroke weight scales
          with the diameter.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <Spinner />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Spinning. The single, perpetual state until the wait resolves.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <span className="flex items-center gap-2 text-description">
                <Spinner className="size-4" />
                Saving changes...
              </span>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Inline beside a label.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex h-auto items-center justify-center bg-muted p-8">
              <Button variant="outline" disabled>
                <Spinner className="size-4" />
                Loading
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Inside a disabled button.</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The spinner is indeterminate, so it has one continuous state. Pair it
          with text or a control to signal what is loading.
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
          Sets <code className="font-mono">role=&quot;status&quot;</code> with an{" "}
          <code className="font-mono">aria-label</code> so the wait is announced.
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
              Don&apos;t reach for a spinner when the final layout is already
              known. A spinner leaves the reader staring at a blank region and
              then jolts them with a content shift. Where the shape of the result
              is predictable, a Skeleton holds the space and reads as calmer.
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
          Use it for waits of unknown length where there is no layout to preview,
          such as a submit in flight or a background task finishing.
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
