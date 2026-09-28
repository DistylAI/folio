import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  DismissibleDrawer,
  FormDrawer,
  NonDismissibleDrawer,
  StatisticDrawer,
  TextDrawer,
} from "./DrawerDemos";

export const metadata: Metadata = {
  title: "Drawer",
  description:
    "Drawer component: a panel that slides up from the bottom of the screen for focused, touch-friendly tasks. API matches @distylai/toolkit-ui components/shadcn/drawer.",
};

const parts = [
  {
    name: "Drawer",
    desc: "Root. Holds open / onOpenChange, shouldScaleBackground (scales the page behind it), dismissible, and direction.",
  },
  {
    name: "DrawerTrigger",
    desc: "Opens the drawer. Use asChild to render your own button.",
  },
  {
    name: "DrawerContent",
    desc: "The sliding panel: portals over an overlay and renders the drag handle, then your content.",
  },
  {
    name: "DrawerHeader",
    desc: "Title + description block at the top. Centers on mobile, left-aligns from sm.",
  },
  {
    name: "DrawerFooter",
    desc: "Actions pinned to the bottom: stacks the primary action over a close.",
  },
  {
    name: "DrawerTitle / DrawerDescription",
    desc: "Accessible title and supporting text, wired to the dialog for screen readers.",
  },
  {
    name: "DrawerClose",
    desc: "Closes the drawer. Wrap a button with asChild.",
  },
] as const;

const statisticCode = `<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Drawer</Button>
  </DrawerTrigger>
  <DrawerContent>
    <div className="mx-auto w-full max-w-sm">
      <DrawerHeader>
        <DrawerTitle>Move Goal</DrawerTitle>
        <DrawerDescription>Set your daily activity goal.</DrawerDescription>
      </DrawerHeader>
      {/* stepper + chart */}
      <DrawerFooter>
        <Button>Set Goal</Button>
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  </DrawerContent>
</Drawer>`;

const formCode = `<DrawerContent>
  <div className="mx-auto w-full max-w-sm">
    <DrawerHeader>
      <DrawerTitle>Edit profile</DrawerTitle>
      <DrawerDescription>Make changes to your profile here.</DrawerDescription>
    </DrawerHeader>
    <div className="grid gap-4 p-4">
      <Input id="name" placeholder="Name" />
      <Input id="username" placeholder="@username" />
    </div>
    <DrawerFooter>…</DrawerFooter>
  </div>
</DrawerContent>`;

const textCode = `<DrawerContent>
  <div className="mx-auto w-full max-w-sm">
    <DrawerHeader>
      <DrawerTitle>Title Text</DrawerTitle>
      <DrawerDescription>This is a drawer description.</DrawerDescription>
    </DrawerHeader>
    <div className="max-h-[50vh] overflow-y-auto px-4 text-description">
      <p>…</p>
    </div>
    <DrawerFooter>…</DrawerFooter>
  </div>
</DrawerContent>`;

const dismissibleCode = `<Drawer>…</Drawer>            {/* drag or tap overlay closes */}`;
const nonDismissibleCode = `<Drawer dismissible={false}>…</Drawer>  {/* only a button closes */}`;

const installCode = `import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";

export function GoalDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Set Goal</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}`;

function VariantCell({
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

export default function DrawerDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Drawer</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A panel that slides up from the bottom of the screen, keeping the page
        behind it in view. Built for focused, touch-friendly tasks: quick edits,
        confirmations, or a short read, dismissed by dragging the handle or
        tapping outside.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          <span className="font-bold">Drawer vs Sheet.</span> Drawer is reserved
          for touch-first, bottom-anchored surfaces (its drag handle and
          background-scaling are mobile affordances). For a standard side panel
          on desktop -- settings, filters, record details -- use{" "}
          <strong className="font-semibold">Sheet</strong>. Same anatomy; pick
          Drawer only when the interaction is genuinely touch-driven.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <StatisticDrawer />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens: the panel surface, overlay scrim,
          and text remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Trigger it to slide
          the panel up.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <VariantCell code={statisticCode}>
            <StatisticDrawer />
          </VariantCell>
          <VariantCell code={formCode}>
            <FormDrawer />
          </VariantCell>
          <VariantCell code={textCode}>
            <TextDrawer />
          </VariantCell>
        </div>
        <p className="mt-2 text-small">
          The same primitive frames a statistic with steppers, a short form, or a
          block of text. Constrain the body with{" "}
          <code className="font-mono">mx-auto w-full max-w-sm</code> so it stays
          readable on wide screens.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <VariantCell code={dismissibleCode}>
            <DismissibleDrawer />
          </VariantCell>
          <VariantCell code={nonDismissibleCode}>
            <NonDismissibleDrawer />
          </VariantCell>
        </div>
        <p className="mt-2 text-small">
          By default a drawer is dismissible: drag the handle down or tap the
          overlay. Set <code className="font-mono">dismissible={`{false}`}</code>{" "}
          to require an explicit action, for steps the user must acknowledge.
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
              Don&apos;t use a drawer for a desktop-first dialog: reach for{" "}
              <code className="font-mono">Dialog</code> there. And don&apos;t stack
              drawers or nest one inside another; a drawer is a single focused
              surface, not a navigation layer.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Drawer>
  <DrawerTrigger asChild>
    <Button variant="outline">Open</Button>
  </DrawerTrigger>
  <DrawerContent>…</DrawerContent>
</Drawer>`}
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
          @distylai/toolkit-ui components/shadcn/drawer
        </code>{" "}
        <code className="font-mono text-foreground">Drawer</code> and its
        Trigger / Content / Header / Footer / Title / Description / Close parts,
        built on <code className="font-mono text-foreground">vaul</code>. The
        raw surface, scrim, handle, and muted text are replaced with Folio
        tokens.
      </footer>
    </div>
  );
}
