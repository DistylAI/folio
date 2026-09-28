import type { Metadata } from "next";
import { Slider } from "@/components/shadcn/slider";
import { CodeBlock } from "@/components/CodeBlock";
import { SliderDemo } from "./SliderDemos";

export const metadata: Metadata = {
  title: "Slider",
  description:
    "Slider component -- an input where the user selects a value from within a given range. API matches @distylai/toolkit-ui Slider.",
};

const props = [
  {
    name: "defaultValue / value",
    type: "number[]",
    def: "undefined",
    desc: "Thumb position as a one-entry array. The slider renders one thumb. value makes it controlled (pair with onValueChange).",
  },
  {
    name: "min",
    type: "number",
    def: "0",
    desc: "Lowest selectable value.",
  },
  {
    name: "max",
    type: "number",
    def: "100",
    desc: "Highest selectable value.",
  },
  {
    name: "step",
    type: "number",
    def: "1",
    desc: "Increment between stops as the thumb moves.",
  },
  {
    name: "orientation",
    type: '"horizontal" | "vertical"',
    def: '"horizontal"',
    desc: "Axis. Vertical needs a height on the root (e.g. h-44).",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Dims the slider to 50% and blocks interaction.",
  },
  {
    name: "onValueChange",
    type: "(value: number[]) => void",
    def: "undefined",
    desc: "Fires as the thumb moves -- use it to drive a controlled value.",
  },
] as const;

const singleCode = `<Slider defaultValue={[50]} max={100} step={1} />`;

const customRangeCode = `<Slider defaultValue={[20]} min={10} max={40} step={1} />`;

const verticalCode = `<div className="flex h-44 gap-8">
  <Slider defaultValue={[50]} orientation="vertical" />
  <Slider defaultValue={[75]} orientation="vertical" />
</div>`;

const steppedCode = `<Slider defaultValue={[40]} max={100} step={10} />`;

const disabledCode = `<Slider defaultValue={[40]} disabled />`;

const installCode = `import { Slider } from "@/components/shadcn/slider";

export function VolumeSlider() {
  const [value, setValue] = useState([50]);
  return (
    <Slider value={value} onValueChange={setValue} max={100} step={1} />
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

export default function SliderDocsPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Slider</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An input where the user selects a value from within a given range. Drag a
        thumb along the track to pick one value, on either axis.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <SliderDemo />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the track, range fill, and thumb
          remap on theme change, no <code className="font-mono">dark:</code>{" "}
          classes. Drag the thumb to update the value.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Cell code={singleCode}>
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="w-full max-w-xs"
            />
          </Cell>
          <Cell code={customRangeCode}>
            <Slider
              defaultValue={[20]}
              min={10}
              max={40}
              step={1}
              className="w-full max-w-xs"
            />
          </Cell>
          <Cell code={verticalCode}>
            <div className="flex h-44 gap-8">
              <Slider defaultValue={[50]} orientation="vertical" />
              <Slider defaultValue={[75]} orientation="vertical" />
            </div>
          </Cell>
          <Cell code={steppedCode}>
            <Slider
              defaultValue={[40]}
              max={100}
              step={10}
              className="w-full max-w-xs"
            />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The thumb selects one value. Set{" "}
          <code className="font-mono">min</code> and{" "}
          <code className="font-mono">max</code> to change the scale. Set{" "}
          <code className="font-mono">orientation=&quot;vertical&quot;</code>{" "}
          (with a height) to stand it up, and{" "}
          <code className="font-mono">step</code> to snap to coarser increments.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Cell code={singleCode}>
            <Slider
              defaultValue={[60]}
              max={100}
              step={1}
              className="w-full max-w-xs"
            />
          </Cell>
          <Cell code={disabledCode}>
            <Slider
              defaultValue={[40]}
              disabled
              className="w-full max-w-xs"
            />
          </Cell>
        </div>
        <p className="mt-2 text-small">
          The default slider is draggable and keyboard accessible (arrow keys
          move by <code className="font-mono">step</code>). A{" "}
          <code className="font-mono">disabled</code> slider dims to 50% and stops
          responding.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.6fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
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
              Don&apos;t use a slider when the exact value matters -- a precise
              number is better typed into an <code className="font-mono">Input</code>.
              And don&apos;t hide the selected value; show it nearby so the user
              knows where they&apos;ve landed.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Slider
  value={value}
  onValueChange={setValue}
  max={100}
  step={1}
/>`}
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
        -- a single <code className="font-mono text-foreground">Slider</code>{" "}
        built on Radix, with one thumb. The track, range fill, and thumb use
        Folio tokens, and the track follows{" "}
        <code className="font-mono text-foreground">orientation</code>.
      </footer>
    </div>
  );
}
