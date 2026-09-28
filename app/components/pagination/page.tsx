import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  FullPagination,
  PaginationDemo,
  SimplePagination,
  StatesPagination,
} from "./PaginationDemos";

export const metadata: Metadata = {
  title: "Pagination",
  description:
    "Pagination component: page navigation with next and previous links. API matches toolkit-ui components/shadcn/pagination.",
};

const parts = [
  {
    name: "Pagination",
    desc: "Root <nav aria-label=\"pagination\">, centered. Wraps the list.",
  },
  {
    name: "PaginationContent",
    desc: "The <ul> row of items.",
  },
  {
    name: "PaginationItem",
    desc: "A single <li>: wraps a link, previous/next, or the ellipsis.",
  },
  {
    name: "PaginationLink",
    desc: "A page link. isActive renders the outline variant + aria-current; size defaults to icon.",
  },
  {
    name: "PaginationPrevious / PaginationNext",
    desc: "Labelled links with a chevron. Use the default size so the label fits.",
  },
  {
    name: "PaginationEllipsis",
    desc: "Decorative gap indicator for skipped pages (aria-hidden, with sr-only text).",
  },
] as const;

const simpleCode = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">4</PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

const fullCode = `<Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#" isActive>2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>`;

const stateCode = `<PaginationLink href="#" isActive>2</PaginationLink>   {/* current page */}
<PaginationLink href="#">3</PaginationLink>           {/* inactive */}
<PaginationPrevious                                   {/* disabled at the start */}
  href="#"
  aria-disabled
  className="pointer-events-none opacity-50"
/>`;

const installCode = `import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/shadcn/pagination";

export function Pager() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
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

export default function PaginationDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Pagination</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Page navigation with next and previous links. Use it to split long lists
        or results into pages: the current page is marked active, and an
        ellipsis stands in for skipped ranges.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <PaginationDemo total={10} />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens: it composes the Button ghost and
          outline variants, so it remaps on theme change with no{" "}
          <code className="font-mono">dark:</code> classes. Click a page or the
          Previous / Next links.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4">
          <Cell code={simpleCode}>
            <SimplePagination />
          </Cell>
          <Cell code={fullCode}>
            <FullPagination />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The simplest form is a row of page numbers. Add{" "}
          <code className="font-mono">PaginationPrevious</code> /{" "}
          <code className="font-mono">PaginationNext</code> for stepping and a{" "}
          <code className="font-mono">PaginationEllipsis</code> to collapse long
          ranges.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4">
          <Cell code={stateCode}>
            <StatesPagination />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The active page uses the outline variant and{" "}
          <code className="font-mono">aria-current=&quot;page&quot;</code>; the
          rest are ghost links. At the first or last page, disable the matching
          step link with{" "}
          <code className="font-mono">aria-disabled</code> +{" "}
          <code className="font-mono">pointer-events-none opacity-50</code>.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.8fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.8fr_3fr] gap-4 px-4 py-3"
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
              Don&apos;t render every page number for a long list: collapse the
              middle with an ellipsis. And don&apos;t leave Previous / Next live
              at the ends; disable the one that has nowhere to go so it
              doesn&apos;t mislead.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<PaginationItem>
  <PaginationLink href="#" isActive>
    2
  </PaginationLink>
</PaginationItem>`}
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
          toolkit-ui/components/shadcn/pagination
        </code>{" "}
        <code className="font-mono text-foreground">Pagination</code> and its
        Content / Item / Link / Previous / Next / Ellipsis parts. It composes the
        Button ghost and outline variants, so it inherits Folio tokens with
        no extra mapping.
      </footer>
    </div>
  );
}
