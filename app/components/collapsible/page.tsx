import type { Metadata } from "next";
import { ChevronDown, ChevronsUpDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Collapsible",
  description:
    "Collapsible component -- an interactive element that expands and collapses a panel. API matches toolkit-ui components/shadcn/collapsible.",
};

const parts = [
  {
    name: "Collapsible",
    desc: "Root. Holds open / defaultOpen / onOpenChange and disabled. Uncontrolled by default.",
  },
  {
    name: "CollapsibleTrigger",
    desc: "Toggles the panel. Use asChild to render your own button.",
  },
  {
    name: "CollapsibleContent",
    desc: "The panel that shows when open and is removed when closed. Its height animates open and closed.",
  },
] as const;

const iconCode = `<Collapsible defaultOpen className="w-full max-w-sm space-y-2">
  <div className="flex items-center justify-between">
    <h4 className="text-sm font-semibold">Order #4189</h4>
    <CollapsibleTrigger asChild>
      <Button variant="ghost" size="icon-sm" aria-label="Toggle order details">
        <ChevronsUpDown />
      </Button>
    </CollapsibleTrigger>
  </div>
  <CollapsibleContent>
    <div className="rounded-lg border border-border px-4 py-3 font-mono text-sm">
      Status: Shipped
    </div>
  </CollapsibleContent>
</Collapsible>`;

const labeledCode = `<Collapsible className="w-full max-w-sm space-y-2">
  <CollapsibleTrigger asChild>
    <Button
      variant="outline"
      className="w-full justify-between [&[data-state=open]>svg]:rotate-180"
    >
      View details
      <ChevronDown className="size-4 transition-transform" />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`;

const disabledCode = `<Collapsible disabled defaultOpen>…</Collapsible>`;

const installCode = `import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/shadcn/collapsible";

export function OrderPanel() {
  return (
    <Collapsible defaultOpen className="w-full max-w-sm space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Order #4189</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Toggle">
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="rounded-lg border border-border px-4 py-3 font-mono text-sm text-foreground">
          Status: Shipped
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}`;

function OrderCollapsible({
  defaultOpen = true,
  disabled = false,
}: {
  defaultOpen?: boolean;
  disabled?: boolean;
}) {
  return (
    <Collapsible
      defaultOpen={defaultOpen}
      disabled={disabled}
      className="w-full max-w-sm space-y-2"
    >
      <div className="flex items-center justify-between gap-4">
        <h4 className="text-sm font-semibold text-foreground">Order #4189</h4>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Toggle order details"
          >
            <ChevronsUpDown />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent>
        <div className="rounded-lg border border-border px-4 py-3 font-mono text-sm text-foreground">
          Status: Shipped
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function LabeledCollapsible() {
  return (
    <Collapsible className="w-full max-w-sm space-y-2">
      <CollapsibleTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between [&[data-state=open]>svg]:rotate-180"
        >
          View details
          <ChevronDown className="size-4 transition-transform" aria-hidden />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="rounded-lg border border-border px-4 py-3 text-description">
          Ships in 2–3 business days. Free returns within 30 days.
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

function Cell({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-start justify-center bg-muted p-8">
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

export default function CollapsibleDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Collapsible</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An interactive element that expands and collapses a panel. Use it to hide
        secondary detail behind a trigger -- order status, advanced options, a
        longer description -- without leaving the page.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-start justify-center rounded-xl border border-border bg-muted p-10">
          <OrderCollapsible />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the trigger, border, and text
          remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Toggle the control to
          collapse the panel.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Triggers</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Cell code={iconCode}>
            <OrderCollapsible />
          </Cell>
          <Cell code={labeledCode}>
            <LabeledCollapsible />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The trigger is yours to compose with{" "}
          <code className="font-mono">asChild</code> -- an icon-only toggle beside
          a heading, or a full-width labeled button whose chevron rotates on{" "}
          <code className="font-mono">data-[state=open]</code>.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Cell code={`<Collapsible>…</Collapsible>`}>
            <OrderCollapsible defaultOpen={false} />
          </Cell>
          <Cell code={`<Collapsible defaultOpen>…</Collapsible>`}>
            <OrderCollapsible defaultOpen />
          </Cell>
          <Cell code={disabledCode}>
            <OrderCollapsible defaultOpen disabled />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Starts closed by default; pass{" "}
          <code className="font-mono">defaultOpen</code> to render it expanded, or{" "}
          <code className="font-mono">disabled</code> to lock the panel and dim
          its trigger.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.6fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
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
              Don&apos;t use a Collapsible for a set of stacked sections -- that&apos;s{" "}
              <code className="font-mono">Accordion</code>. And don&apos;t hide
              essential content or primary actions behind one; reach for it only
              for secondary, skippable detail.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Collapsible>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" size="icon-sm">
      <ChevronsUpDown />
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent>…</CollapsibleContent>
</Collapsible>`}
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
          toolkit-ui/components/shadcn/collapsible
        </code>{" "}
        -- <code className="font-mono text-foreground">Collapsible</code>,{" "}
        <code className="font-mono text-foreground">CollapsibleTrigger</code>,{" "}
        <code className="font-mono text-foreground">CollapsibleContent</code> on
        Radix. A re-export with no styling of its own; the trigger and content
        use Folio tokens. For stacked sections, use{" "}
        <code className="font-mono text-foreground">Accordion</code>.
      </footer>
    </div>
  );
}
