import type { Metadata } from "next";
import { Skeleton } from "@/components/shadcn/skeleton";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Skeleton",
  description:
    "Skeleton component -- a placeholder shown while content loads. API matches toolkit-ui components/shadcn/skeleton.",
};

const installCode = `import { Skeleton } from "@/components/shadcn/skeleton";

export function CardSkeleton() {
  return (
    <div className="flex items-center gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
      </div>
    </div>
  );
}`;

export default function SkeletonPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Skeleton</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Use to show a placeholder while content is loading. Match its shape to
        the content it stands in for, so the layout doesn&apos;t jump on load.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="flex items-center gap-4">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the muted fill pulses and remaps
          on theme change, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Shapes */}
      <section id="shapes" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Shapes</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Card */}
          <div className="rounded-xl border border-border bg-muted p-8">
            <div className="flex flex-col gap-4">
              <Skeleton className="aspect-video w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
          {/* Text + form */}
          <div className="rounded-xl border border-border bg-muted p-8">
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-[222px]" />
              <Skeleton className="h-4 w-[167px]" />
              <Skeleton className="mt-2 h-8 w-[167px]" />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Skeleton is a single primitive -- compose avatars, lines, media blocks,
          and form fields by sizing it with utility classes.
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
                { name: "className", type: "string", def: "undefined", desc: "Sets the shape -- width, height, and radius of the placeholder." },
                { name: "...props", type: "HTMLAttributes<div>", def: "—", desc: "Native div attributes pass through." },
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
              Don&apos;t drop a centered Spinner over a known layout -- the page
              jumps when content arrives. And don&apos;t hardcode{" "}
              <code className="font-mono">bg-gray-100</code> for the fill.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Mirror the real content's shape
<Skeleton className="h-4 w-[150px]" />`}
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
          Drop-in ready. Size and shape it with{" "}
          <code className="font-mono">className</code> (height, width,{" "}
          <code className="font-mono">rounded-full</code>, …).
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          toolkit-ui/components/shadcn/skeleton
        </code>
        . The raw <code className="font-mono text-foreground">bg-primary/10</code>{" "}
        fill is replaced with the Folio{" "}
        <code className="font-mono text-foreground">background-secondary</code>{" "}
        token.
      </footer>
    </div>
  );
}
