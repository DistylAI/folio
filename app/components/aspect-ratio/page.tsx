import type { Metadata } from "next";
import { AspectRatio } from "@/components/shadcn/aspect-ratio";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Aspect Ratio",
  description:
    "Aspect Ratio component -- constrains content to a desired width-to-height ratio. API matches toolkit-ui components/shadcn/aspect-ratio.",
};

const ratios = [
  { label: "16 / 9", ratio: 16 / 9 },
  { label: "1 / 1", ratio: 1 },
  { label: "4 / 3", ratio: 4 / 3 },
  { label: "3 / 4", ratio: 3 / 4 },
];

const props = [
  {
    name: "ratio",
    type: "number",
    def: "1",
    desc: "Width divided by height -- e.g. 16 / 9 for widescreen, 1 for a square.",
  },
  {
    name: "children",
    type: "ReactNode",
    def: "required",
    desc: "The content to constrain. Use object-cover on media so it fills the box.",
  },
  {
    name: "className",
    type: "string",
    def: "undefined",
    desc: "Applied to the ratio box -- radius, background, or overflow-hidden for media.",
  },
] as const;

const ratioCode = `<AspectRatio ratio={16 / 9} className="rounded-xl bg-secondary">
  {/* content fills the box */}
</AspectRatio>`;

const mediaCode = `<AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
  <img src={src} alt="" className="size-full object-cover" />
</AspectRatio>`;

const installCode = `import { AspectRatio } from "@/components/shadcn/aspect-ratio";

export function Cover({ src }: { src: string }) {
  return (
    <div className="w-[480px]">
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-xl">
        <img src={src} alt="" className="size-full object-cover" />
      </AspectRatio>
    </div>
  );
}`;

const IMG = "/aspect-ratio-sample.svg";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex size-full items-center justify-center rounded-xl bg-secondary text-sm tabular-nums text-muted-foreground">
      {label}
    </div>
  );
}

export default function AspectRatioDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Aspect Ratio</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Constrains its content to a desired width-to-height ratio. Wrap an image,
        video, or any block so it holds a consistent shape as the layout resizes.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="w-full max-w-md">
            <AspectRatio ratio={16 / 9}>
              <Placeholder label="16 / 9" />
            </AspectRatio>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the placeholder surface remaps on
          theme change, no <code className="font-mono">dark:</code> classes. The
          box keeps its ratio as its width changes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Ratios</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ratios.map((r) => (
            <div
              key={r.label}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="flex items-center justify-center bg-muted p-8">
                <div className="w-full max-w-[260px]">
                  <AspectRatio ratio={r.ratio}>
                    <Placeholder label={r.label} />
                  </AspectRatio>
                </div>
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={`<AspectRatio ratio={${r.label.replace(" / ", " / ")}}>…</AspectRatio>`}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small">
          Pass <code className="font-mono">ratio</code> as width ÷ height. The
          component sets the height from the width automatically, so the shape
          holds at any size.
        </p>
      </section>

      {/* Media */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">With media</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-center bg-muted p-8">
            <div className="w-full max-w-md">
              <AspectRatio
                ratio={16 / 9}
                className="overflow-hidden rounded-xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMG}
                  alt="Example cover"
                  className="size-full object-cover"
                />
              </AspectRatio>
            </div>
          </div>
          <div className="border-t border-border p-3">
            <CodeBlock
              code={mediaCode}
              size="sm"
              className="rounded-lg border border-border-subtle bg-muted"
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          For images and video, add{" "}
          <code className="font-mono">overflow-hidden</code> on the ratio box and{" "}
          <code className="font-mono">object-cover</code> on the media so it fills
          and crops cleanly.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.2fr_1.4fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.2fr_1.4fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
                  </div>
                  <div className="font-mono text-caption">
                    {p.type}
                  </div>
                  <div className="font-mono text-caption">
                    {p.def}
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
              Don&apos;t set a fixed height on the content to fake a ratio -- it
              breaks when the width changes. And don&apos;t wrap text in one;
              Aspect Ratio is for media and fixed-shape blocks, not flowing copy.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<AspectRatio ratio={16 / 9}>
  <img className="size-full object-cover" … />
</AspectRatio>`}
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
          toolkit-ui/components/shadcn/aspect-ratio
        </code>{" "}
        -- a re-export of the Radix{" "}
        <code className="font-mono text-foreground">AspectRatio</code> root.
        It&apos;s a layout primitive with no color, so there are no tokens to map.
      </footer>
    </div>
  );
}
