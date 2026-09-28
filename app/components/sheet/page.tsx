import type { Metadata } from "next";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Sheet",
  description:
    "Sheet component -- a panel that slides in from an edge of the screen, built on Dialog. API matches @distylai/toolkit-ui components/shadcn/sheet.",
};

const sides = ["top", "right", "bottom", "left"] as const;

const parts = [
  {
    name: "Sheet",
    desc: "Root (Dialog). Holds open / onOpenChange; uncontrolled by default.",
  },
  {
    name: "SheetTrigger",
    desc: "Opens the sheet. Use asChild to render your own button.",
  },
  {
    name: "SheetContent",
    desc: "The sliding panel. side picks the edge (top / right / bottom / left); portals over an overlay with a built-in close button. hideClose removes the close button. resizable adds a drag handle on the inner edge, clamped by minSize (default 320) and maxSize (default 90% of the viewport).",
  },
  {
    name: "SheetHeader / SheetFooter",
    desc: "Title/description block at the top; actions row (right-aligned from sm) at the bottom.",
  },
  {
    name: "SheetTitle / SheetDescription",
    desc: "Accessible title and supporting text, wired to the dialog for screen readers.",
  },
  {
    name: "SheetClose",
    desc: "Closes the sheet. Wrap a button with asChild for a footer action.",
  },
] as const;

const previewCode = `<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Edit profile</Button>
  </SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <Input id="name" placeholder="Name" />
      <Input id="username" placeholder="@username" />
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button>Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>`;

const sideCode = `<SheetContent side="left">…</SheetContent>
<SheetContent side="right">…</SheetContent>  {/* default */}
<SheetContent side="top">…</SheetContent>
<SheetContent side="bottom">…</SheetContent>`;

const installCode = `import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";

export function ProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes here.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}`;

function ProfileSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-6">
          <div className="grid gap-2">
            <label
              htmlFor="sheet-name"
              className="text-label"
            >
              Name
            </label>
            <Input id="sheet-name" placeholder="Name" />
          </div>
          <div className="grid gap-2">
            <label
              htmlFor="sheet-username"
              className="text-label"
            >
              Username
            </label>
            <Input id="sheet-username" placeholder="@username" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default function SheetDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Sheet</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A panel that slides in from an edge of the screen -- built on Dialog, so
        it traps focus and dismisses on overlay click or Escape. Use it for
        secondary tasks like editing a record or filtering a list.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ProfileSheet />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the panel surface, overlay scrim,
          and text remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Trigger it to open the
          panel from the right.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Sides</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex flex-wrap items-center justify-center gap-3 bg-muted p-8">
            {sides.map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="capitalize">
                    {side}
                  </Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle className="capitalize">{side} sheet</SheetTitle>
                    <SheetDescription>
                      Opens from the {side} edge of the screen.
                    </SheetDescription>
                  </SheetHeader>
                  <SheetFooter className="mt-6">
                    <SheetClose asChild>
                      <Button variant="outline">Close</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
          <div className="border-t border-border p-3">
            <CodeBlock
              code={sideCode}
              size="sm"
              className="rounded-lg border border-border-subtle bg-muted"
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">side</code> picks the edge the panel docks
          to. <code className="font-mono">left</code> /{" "}
          <code className="font-mono">right</code> take three-quarters of the
          width (max <code className="font-mono">sm</code>);{" "}
          <code className="font-mono">top</code> /{" "}
          <code className="font-mono">bottom</code> span the full width.
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
              Don&apos;t use a Sheet for a short confirmation -- that&apos;s a{" "}
              <code className="font-mono">Dialog</code> -- or for a bottom,
              touch-first panel, which is a{" "}
              <code className="font-mono">Drawer</code>. And don&apos;t stack
              sheets; keep one focused panel open at a time.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Sheet>
  <SheetTrigger asChild>
    <Button variant="outline">Open</Button>
  </SheetTrigger>
  <SheetContent side="right">…</SheetContent>
</Sheet>`}
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
          @distylai/toolkit-ui components/shadcn/sheet
        </code>{" "}
        -- <code className="font-mono text-foreground">Sheet</code> and its
        Trigger / Content / Header / Footer / Title / Description / Close parts,
        built on Radix Dialog. The raw surface, scrim, border, and muted text are
        replaced with Folio tokens; the entrance animation is omitted to match
        the site&apos;s other overlays.
      </footer>
    </div>
  );
}
