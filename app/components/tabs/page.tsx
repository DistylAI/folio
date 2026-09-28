import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { IconTabs, VariantTabs } from "./TabsDemos";

export const metadata: Metadata = {
  title: "Tabs",
  description:
    "Tabs component: layered sections of content shown one at a time. API matches toolkit-ui components/shadcn/tabs.",
};

const variants = [
  {
    key: "secondary" as const,
    label: "secondary",
    note: "Segmented pill: the Folio default.",
    code: `<Tabs defaultValue="overview">
  <TabsList variant="secondary">
    <TabsTrigger variant="secondary" value="overview">Overview</TabsTrigger>
    <TabsTrigger variant="secondary" value="analytics">Analytics</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
</Tabs>`,
  },
  {
    key: "underline" as const,
    label: "underline",
    note: "Bottom-border line, for in-page section switching.",
    code: `<TabsList variant="underline">
  <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
</TabsList>`,
  },
  {
    key: "default" as const,
    label: "default",
    note: "Borderless pills with an accent active state.",
    code: `<TabsList variant="default">
  <TabsTrigger variant="default" value="overview">Overview</TabsTrigger>
</TabsList>`,
  },
];

const installCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/shadcn/tabs";

export function ProjectTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant="secondary">
        <TabsTrigger variant="secondary" value="overview">Overview</TabsTrigger>
        <TabsTrigger variant="secondary" value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">…</TabsContent>
      <TabsContent value="settings">…</TabsContent>
    </Tabs>
  );
}`;

export default function TabsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Tabs</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A set of layered sections of content, known as tab panels, displayed
        one at a time. Use for switching views within a single context.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Tabs swap <em>panels of content</em>. For a compact one-of control
          that doesn&apos;t swap a panel (a mode or filter), reach for a
          single-select <strong className="font-semibold">Toggle Group</strong>;
          for independent actions that just sit together, use a{" "}
          <strong className="font-semibold">Button Group</strong>.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <VariantTabs variant="secondary" />
        </div>
        <p className="mt-2 text-small">
          Live and interactive: switch tabs, then toggle the theme. The track,
          active pill, and text all remap from Folio tokens, no{" "}
          <code className="font-mono">dark:</code> classes (the fix for the
          source file&apos;s <code className="font-mono">dark:</code> violations).
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="space-y-4">
          {variants.map((v) => (
            <div
              key={v.key}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                <VariantTabs variant={v.key} />
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={v.code}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small">
          The <code className="font-mono">variant</code> goes on both{" "}
          <code className="font-mono">TabsList</code> and{" "}
          <code className="font-mono">TabsTrigger</code>:{" "}
          <code className="font-mono">secondary</code> (segmented),{" "}
          <code className="font-mono">underline</code> (line), and{" "}
          <code className="font-mono">default</code> (accent pills).
        </p>
      </section>

      {/* With icons */}
      <section id="with-icons" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">With icons</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <IconTabs />
        </div>
        <p className="mt-2 text-small">
          Drop a Lucide icon in as the first child of a trigger: the{" "}
          <code className="font-mono">[&amp;_svg]</code> rules size and align it.
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
              {[
                { name: "Tabs", desc: "Root. Holds value / defaultValue / onValueChange." },
                { name: "TabsList", desc: "The row of triggers. variant: \"default\" | \"underline\" | \"secondary\"." },
                { name: "TabsTrigger", desc: "A tab button; its value links it to a panel." },
                { name: "TabsContent", desc: "The panel shown when its value is the active one." },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">{p.name}</div>
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
              Don&apos;t style the active tab with{" "}
              <code className="font-mono">
                dark:data-[state=active]:bg-input/30
              </code>{" "}
              The legacy tabs.tsx does. And don&apos;t use Tabs for navigation
              between routes; that&apos;s a nav, not a tab set.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Token-driven active state, theme-agnostic
<TabsTrigger variant="secondary" value="overview">
  Overview
</TabsTrigger>`}
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
          Keyboard navigation and roving focus come for free. Set{" "}
          <code className="font-mono">defaultValue</code> (uncontrolled)
          or <code className="font-mono">value</code> /{" "}
          <code className="font-mono">onValueChange</code> (controlled).
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          toolkit-ui/components/shadcn/tabs
        </code>{" "}
        <code className="font-mono text-foreground">Tabs</code>,{" "}
        <code className="font-mono text-foreground">TabsList</code>,{" "}
        <code className="font-mono text-foreground">TabsTrigger</code>,{" "}
        <code className="font-mono text-foreground">TabsContent</code> with the{" "}
        <code className="font-mono text-foreground">variant</code> axis. The{" "}
        <code className="font-mono text-foreground">dark:</code> class
        violations and raw palette colors are replaced with Folio tokens.
      </footer>
    </div>
  );
}
