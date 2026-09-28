import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import {
  BasicCarousel,
  MultiCarousel,
  VerticalCarousel,
} from "./CarouselDemos";

export const metadata: Metadata = {
  title: "Carousel",
  description:
    "Carousel component -- a swipeable, motion-driven set of slides built on Embla. API matches the @distylai/toolkit-ui Carousel.",
};

const parts = [
  {
    name: "Carousel",
    desc: "Root. Holds opts (Embla options like align / loop), orientation (horizontal | vertical), setApi, and plugins.",
  },
  {
    name: "CarouselContent",
    desc: "The scrolling track that wraps the slides.",
  },
  {
    name: "CarouselItem",
    desc: "A single slide. Set how many show per view with a basis-* class (basis-full / basis-1/2 / basis-1/3).",
  },
  {
    name: "CarouselPrevious / CarouselNext",
    desc: "Arrow controls. They read scroll state from context and disable at the ends automatically.",
  },
] as const;

const basicCode = `<Carousel className="w-full max-w-xs">
  <CarouselContent>
    {items.map((n) => (
      <CarouselItem key={n}>…</CarouselItem>
    ))}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const perViewCode = `{/* two per view */}
<CarouselItem className="basis-1/2">…</CarouselItem>

{/* three per view */}
<CarouselItem className="basis-1/3">…</CarouselItem>`;

const verticalCode = `<Carousel orientation="vertical" opts={{ align: "start" }}>
  <CarouselContent className="h-[15rem]">
    <CarouselItem className="basis-1/2">…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`;

const installCode = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shadcn/carousel";

export function Gallery({ items }) {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((item) => (
          <CarouselItem key={item.id}>{item.content}</CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
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
    <div className="rounded-xl border border-border">
      <div className="flex items-center justify-center bg-muted p-14">
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

export default function CarouselDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Carousel</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A swipeable, motion-driven set of slides built on Embla. Use it to page
        through media or cards -- with keyboard arrows, drag, and prev/next
        controls that disable at the ends.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-14">
          <BasicCarousel />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- slides, borders, and the arrow
          controls remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes. Drag, use the arrows,
          or press the left/right keys.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Items per view</h3>
        <div className="grid grid-cols-1 gap-4">
          <Cell code={perViewCode}>
            <MultiCarousel per={2} />
          </Cell>
          <Cell code={perViewCode}>
            <MultiCarousel per={3} />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          A slide is <code className="font-mono">basis-full</code> by default.
          Set <code className="font-mono">basis-1/2</code> or{" "}
          <code className="font-mono">basis-1/3</code> on{" "}
          <code className="font-mono">CarouselItem</code> to show two or three at
          once, and pair it with{" "}
          <code className="font-mono">opts={`{{ align: "start" }}`}</code>.
        </p>
      </section>

      {/* Orientation */}
      <section id="orientation" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Orientation</h3>
        <div className="grid grid-cols-1 gap-4">
          <Cell code={verticalCode}>
            <VerticalCarousel />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Set <code className="font-mono">orientation=&quot;vertical&quot;</code>{" "}
          to page up and down -- give{" "}
          <code className="font-mono">CarouselContent</code> a fixed height and
          the arrows rotate to match.
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
              Don&apos;t put content users must not miss in a carousel -- anything
              off-screen gets overlooked. And don&apos;t hand-roll arrow enabled
              state; <code className="font-mono">CarouselPrevious</code> /{" "}
              <code className="font-mono">CarouselNext</code> read it from the
              carousel context.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Carousel className="w-full max-w-xs">
  <CarouselContent>
    <CarouselItem>…</CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>`}
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
          @distylai/toolkit-ui
        </code>{" "}
        -- <code className="font-mono text-foreground">Carousel</code> and its
        Content / Item / Previous / Next parts (plus the{" "}
        <code className="font-mono text-foreground">CarouselApi</code> type), built
        on <code className="font-mono text-foreground">embla-carousel-react</code>.
        The arrows are Button (outline), so it inherits Folio tokens.
      </footer>
    </div>
  );
}
