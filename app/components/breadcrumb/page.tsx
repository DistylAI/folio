import type { Metadata } from "next";
import { Dot } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";
import { CodeBlock } from "@/components/CodeBlock";
import { BreadcrumbCollapsed } from "./BreadcrumbDemos";

export const metadata: Metadata = {
  title: "Breadcrumb",
  description:
    "Breadcrumb component: displays the path to the current resource using a hierarchy of links. API matches toolkit-ui components/shadcn/breadcrumb.",
};

const parts = [
  {
    name: "Breadcrumb",
    desc: "Root <nav aria-label=\"breadcrumb\">. Wraps the whole trail.",
  },
  {
    name: "BreadcrumbList",
    desc: "The ordered list. Flex-wraps, muted text, gap between items.",
  },
  {
    name: "BreadcrumbItem",
    desc: "A single level: wraps a link, a page, or the collapsed menu.",
  },
  {
    name: "BreadcrumbLink",
    desc: "An interactive ancestor link. asChild lets you pass a router Link.",
  },
  {
    name: "BreadcrumbPage",
    desc: "The current page: non-interactive, aria-current=\"page\".",
  },
  {
    name: "BreadcrumbSeparator",
    desc: "Decorative divider between items. Defaults to a chevron; pass children to override.",
  },
  {
    name: "BreadcrumbEllipsis",
    desc: "Collapsed indicator for hidden levels. Wrap in a menu trigger to reveal them.",
  },
] as const;

const chevronCode = `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`;

const dotCode = `<BreadcrumbSeparator>
  <Dot />
</BreadcrumbSeparator>`;

const collapsedCode = `<BreadcrumbItem>
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-1">
      <BreadcrumbEllipsis />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuItem>Documentation</DropdownMenuItem>
      <DropdownMenuItem>Foundations</DropdownMenuItem>
      <DropdownMenuItem>Components</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</BreadcrumbItem>`;

const installCode = `import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/shadcn/breadcrumb";

export function PageBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}`;

function ChevronTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function DotTrail() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Dot />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Dot />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function BreadcrumbDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Breadcrumb</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays the path to the current resource using a hierarchy of links.
        Ancestors are links; the final item is the current page, rendered
        non-interactively with <code className="font-mono">aria-current</code>.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ChevronTrail />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens: link, hover, and current-page
          colors remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Separators</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ChevronTrail />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={chevronCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <DotTrail />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={dotCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <BreadcrumbCollapsed />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={collapsedCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The default separator is a chevron; pass any icon as{" "}
          <code className="font-mono">BreadcrumbSeparator</code> children to swap
          it. When a path is too deep, collapse the middle into a{" "}
          <code className="font-mono">BreadcrumbEllipsis</code> menu: open the
          last example to see the hidden levels.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="#">Ancestor link</BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<BreadcrumbLink href="…">…</BreadcrumbLink>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbPage>Current page</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<BreadcrumbPage>…</BreadcrumbPage>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Links sit at <code className="font-mono">text-subtle</code> and lift to{" "}
          <code className="font-mono">text-default</code> on hover. The current
          page uses <code className="font-mono">BreadcrumbPage</code>: solid{" "}
          <code className="font-mono">text-default</code>, not a link, carrying{" "}
          <code className="font-mono">aria-current=&quot;page&quot;</code>.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.4fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_3fr] gap-4 px-4 py-3"
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
              Don&apos;t make the current page a link, and don&apos;t use a
              breadcrumb as primary navigation: it reflects hierarchy, it
              doesn&apos;t replace a nav. The last item is a{" "}
              <code className="font-mono">BreadcrumbPage</code>, not a{" "}
              <code className="font-mono">BreadcrumbLink</code>.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<BreadcrumbItem>
  <BreadcrumbLink href="/">Home</BreadcrumbLink>
</BreadcrumbItem>
<BreadcrumbSeparator />
<BreadcrumbItem>
  <BreadcrumbPage>Current</BreadcrumbPage>
</BreadcrumbItem>`}
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
          toolkit-ui/components/shadcn/breadcrumb
        </code>{" "}
        <code className="font-mono text-foreground">Breadcrumb</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbList</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbItem</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbLink</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbPage</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbSeparator</code>,{" "}
        <code className="font-mono text-foreground">BreadcrumbEllipsis</code>.
        The raw muted-foreground / foreground colors are replaced with Folio
        tokens.
      </footer>
    </div>
  );
}
