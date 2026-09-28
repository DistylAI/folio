import type { Metadata } from "next";
import { ArrowRight, Bell, Heart, Plus, Settings } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";
import { IconGallery } from "./IconGallery";

export const metadata: Metadata = {
  title: "Icons",
  description:
    "Iconography in Folio -- Lucide is the canonical icon library. Sizing, color tokens, usage patterns, and a searchable icon grid.",
};

const sizingCode = `<Bell className="size-4" />   {/* 16px -- default, inline with text */}
<Bell className="size-5" />   {/* 20px -- medium */}
<Bell className="size-6" />   {/* 24px -- large */}`;

const colorCode = `{/* Icons inherit currentColor -- set it with a text-* token */}
<Heart className="size-5 text-foreground" />
<Heart className="size-5 text-muted-foreground" />
<Heart className="size-5 text-primary" />
<Heart className="size-5 text-destructive" />`;

const leadingCode = `<Button>
  <Plus />
  New item
</Button>`;

const iconOnlyCode = `<Button size="icon" aria-label="Settings">
  <Settings />
</Button>`;

const inlineCode = `<span className="inline-flex items-center gap-1.5 text-muted-foreground">
  Continue
  <ArrowRight className="size-4" />
</span>`;

const installCode = `import { Search } from "lucide-react";

export function SearchButton() {
  return (
    <button className="inline-flex items-center gap-2 text-foreground">
      <Search className="size-4 text-muted-foreground" />
      Search
    </button>
  );
}`;

const colorSwatches = [
  { cls: "text-foreground", label: "text-default" },
  { cls: "text-muted-foreground", label: "text-subtle" },
  { cls: "text-primary", label: "text-primary" },
  { cls: "text-success", label: "text-success" },
  { cls: "text-destructive", label: "text-danger" },
  { cls: "text-warning", label: "text-warning" },
];

export default function IconsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Foundations</p>
      <h1 className="text-lead text-foreground">Icons</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Folio uses one icon library, sized on the 4px scale and colored with
        text tokens. Icons clarify actions and status -- they don&apos;t decorate.
      </p>

      {/* Library */}
      <section id="library" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Library</h3>
        <div className="rounded-xl border border-border bg-primary-subtle p-4">
          <p className="text-small text-foreground">
            <span className="font-semibold">Lucide is the only icon set.</span>{" "}
            Import every icon from{" "}
            <code className="font-mono">lucide-react</code>. Don&apos;t add a
            second icon library or paste raw SVGs -- one consistent set keeps the
            visual language coherent and themeable.
          </p>
        </div>
        <div className="mt-4">
          <CodeBlock
            code={`import { Bell } from "lucide-react";`}
            size="sm"
            className="rounded-lg border border-border-subtle bg-muted"
          />
        </div>
      </section>

      {/* Sizing */}
      <section id="sizing" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Sizing</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-end justify-center gap-10 bg-muted p-10">
            {[
              { cls: "size-4", label: "size-4 · 16px" },
              { cls: "size-5", label: "size-5 · 20px" },
              { cls: "size-6", label: "size-6 · 24px" },
            ].map((s) => (
              <div key={s.cls} className="flex flex-col items-center gap-3">
                <Bell className={`${s.cls} text-foreground`} aria-hidden />
                <span className="text-caption tabular-nums">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <CodeBlock
              code={sizingCode}
              size="sm"
              className="rounded-lg border border-border-subtle bg-muted"
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">size-4</code> (16px) is the default and
          pairs with body text; step up to{" "}
          <code className="font-mono">size-5</code> (20px) or{" "}
          <code className="font-mono">size-6</code> (24px) for emphasis. Stay on
          the 4px scale -- no arbitrary pixel sizes.
        </p>
      </section>

      {/* Color */}
      <section id="color" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Color</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex flex-wrap items-end justify-center gap-8 bg-muted p-10">
            {colorSwatches.map((c) => (
              <div key={c.cls} className="flex flex-col items-center gap-3">
                <Heart className={`size-6 ${c.cls}`} aria-hidden />
                <span className="font-mono text-caption">
                  {c.label}
                </span>
              </div>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <CodeBlock
              code={colorCode}
              size="sm"
              className="rounded-lg border border-border-subtle bg-muted"
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          Icons render in <code className="font-mono">currentColor</code>, so a{" "}
          <code className="font-mono">text-*</code> token sets their color and it
          remaps on theme change. Never reach for a hardcoded hex or a raw
          palette utility.
        </p>
      </section>

      {/* Usage */}
      <section id="usage" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Usage</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Button>
                <Plus />
                New item
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={leadingCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Button size="icon" aria-label="Settings">
                <Settings />
              </Button>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={iconOnlyCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                Continue
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={inlineCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Components size icons for you -- drop a bare icon into a{" "}
          <code className="font-mono">Button</code> and it inherits the right
          size and color. An icon-only control always needs an{" "}
          <code className="font-mono">aria-label</code>.
        </p>
      </section>

      {/* Browse */}
      <section id="browse" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Browse</h3>
        <p className="mb-4 text-small">
          A selection of commonly used icons, rendered live from{" "}
          <code className="font-mono">lucide-react</code> at{" "}
          <code className="font-mono">size-6</code> in{" "}
          <code className="font-mono">text-subtle</code>. Search by name and click
          any icon to copy its import.
        </p>
        <IconGallery />
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
              Don&apos;t introduce a second icon library or drop in raw SVGs -- it
              fragments the visual language. And never color an icon with a
              hardcoded hex or a raw palette utility; icons take a{" "}
              <code className="font-mono">text-*</code> token like everything
              else.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`import { Bell } from "lucide-react";

<Bell className="size-4 text-muted-foreground" />`}
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
        <code className="font-mono text-foreground">lucide-react</code> is the
        canonical icon set for Folio. Size on the 4px scale (
        <code className="font-mono text-foreground">size-4</code> /{" "}
        <code className="font-mono text-foreground">size-5</code> /{" "}
        <code className="font-mono text-foreground">size-6</code>) and color
        with <code className="font-mono text-foreground">text-*</code> tokens.
      </footer>
    </div>
  );
}
