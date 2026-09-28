import type { Metadata } from "next";
import { ArrowRight, Folder, Search } from "lucide-react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/shadcn/empty";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Empty State",
  description:
    "Empty State component: a centered placeholder for empty lists, searches, and first-run screens. API matches toolkit-ui components/shadcn/empty.",
};

const anatomyCode = `<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon">
      <Folder />
    </EmptyMedia>
    <EmptyTitle>No projects yet</EmptyTitle>
    <EmptyDescription>
      Create your first project to get started.
    </EmptyDescription>
  </EmptyHeader>
  <EmptyContent>
    <Button>Create project</Button>
  </EmptyContent>
</Empty>`;

const doCode = `// Offer the next action right in the empty state
<Empty>
  <EmptyHeader>
    <EmptyMedia variant="icon"><Inbox /></EmptyMedia>
    <EmptyTitle>No messages</EmptyTitle>
  </EmptyHeader>
  <EmptyContent>
    <Button>Compose</Button>
  </EmptyContent>
</Empty>`;

const installCode = `import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "@/components/shadcn/empty";

export function NoResults() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Search />
        </EmptyMedia>
        <EmptyTitle>No results found</EmptyTitle>
        <EmptyDescription>Try a different search term.</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}`;

export default function EmptyStatePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Empty State</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A centered placeholder for empty lists, searches, and first-run screens.
        Use it to explain why there&apos;s nothing here and offer the next
        action.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          <span className="font-bold">Canonical.</span> This documents the{" "}
          <code className="font-mono">Empty</code> component from toolkit-ui: a
          header, media, title, description, and content composition.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <Empty className="max-w-sm">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Folder />
              </EmptyMedia>
              <EmptyTitle>No projects yet</EmptyTitle>
              <EmptyDescription>
                Create your first project to start collecting traces and
                evaluations.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button>Create project</Button>
              <Button variant="ghost">
                Learn more
                <ArrowRight />
              </Button>
            </EmptyContent>
          </Empty>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens: the muted media well, text, and
          buttons remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* API */}
      <section id="anatomy" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex items-start justify-center rounded-xl border border-border bg-muted p-8">
            <Empty className="max-w-sm">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Folder />
                </EmptyMedia>
                <EmptyTitle>No projects yet</EmptyTitle>
                <EmptyDescription>
                  Create your first project to get started.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button>Create project</Button>
              </EmptyContent>
            </Empty>
          </div>
          <CodeBlock
            code={anatomyCode}
            className="rounded-xl border border-border bg-muted"
          />
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">EmptyMedia</code> takes a{" "}
          <code className="font-mono">variant</code> (
          <code className="font-mono">default</code> for a bare icon or
          illustration, <code className="font-mono">icon</code> for the muted
          rounded well) and a <code className="font-mono">color</code> (
          <code className="font-mono">default</code> or{" "}
          <code className="font-mono">destructive</code> for an error state).{" "}
          <code className="font-mono">EmptyContent</code> is
          optional: drop it for a purely informational state.
        </p>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Examples</h3>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
          {/* Search: no results, with input action */}
          <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-8">
            <Empty className="max-w-sm">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Search />
                </EmptyMedia>
                <EmptyTitle>No results found</EmptyTitle>
                <EmptyDescription>
                  No traces match your filters. Try another term.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Input placeholder="Search traces…" className="max-w-xs" />
              </EmptyContent>
            </Empty>
          </div>

          {/* Informational: no actions */}
          <div className="flex items-center justify-center rounded-xl border border-dashed border-border bg-muted p-8">
            <Empty className="max-w-sm">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Folder />
                </EmptyMedia>
                <EmptyTitle>This folder is empty</EmptyTitle>
                <EmptyDescription>
                  Items you add will appear here.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </div>
        </div>
        <p className="mt-2 text-small">
          The left state nests an <code className="font-mono">Input</code> in{" "}
          <code className="font-mono">EmptyContent</code>; the right is
          informational only, sitting in a dashed well: a common pattern for
          drop targets.
        </p>
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
              Don&apos;t leave a blank area or a bare “No data” string: and
              don&apos;t hardcode <code className="font-mono">bg-gray-50</code>{" "}
              for the media well. Explain the state and offer a way forward.
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
      </section>

      {/* Install */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          Drop-in ready. Compose only the parts you need: every piece is plain
          markup styled with Folio tokens.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches the toolkit-ui Empty component. The parts compose as{" "}
        <code className="font-mono text-foreground">Empty</code> (
        <code className="font-mono text-foreground">EmptyHeader</code>,{" "}
        <code className="font-mono text-foreground">EmptyMedia</code>,{" "}
        <code className="font-mono text-foreground">EmptyTitle</code>,{" "}
        <code className="font-mono text-foreground">EmptyDescription</code>,{" "}
        <code className="font-mono text-foreground">EmptyContent</code>), built
        on Folio tokens.
      </footer>
    </div>
  );
}
