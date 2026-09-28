import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { BasicTooltip, SidesTooltip } from "./TooltipDemos";

export const metadata: Metadata = {
  title: "Tooltip",
  description:
    "Tooltip component: a label shown on hover or focus. API matches @distylai/toolkit-ui components/shadcn/tooltip.",
};

const installCode = `import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/shadcn/tooltip";

export function SaveButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon"><Save /></Button>
        </TooltipTrigger>
        <TooltipContent>Save changes</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}`;

export default function TooltipPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Tooltip</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A label that appears on hover or focus. Use it for supplementary hints, never
        for essential information.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex min-h-[12rem] items-center justify-center rounded-xl border border-border bg-muted p-10">
          <BasicTooltip />
        </div>
        <p className="mt-2 text-small">
          Hover or focus the trigger. The surface uses the{" "}
          <code className="font-mono">background-inverse</code> token: a
          high-contrast dark-on-light (and light-on-dark) chip, not brand
          purple: so it remaps correctly on theme toggle.
        </p>
      </section>

      {/* Sides */}
      <section id="sides" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Sides</h3>
        <div className="flex min-h-[10rem] items-center justify-center rounded-xl border border-border bg-muted p-10">
          <SidesTooltip />
        </div>
        <p className="mt-2 text-small">
          Set <code className="font-mono">side</code> on{" "}
          <code className="font-mono">TooltipContent</code> (
          <code className="font-mono">top</code> /{" "}
          <code className="font-mono">right</code> /{" "}
          <code className="font-mono">bottom</code> /{" "}
          <code className="font-mono">left</code>); position flips on collision.
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
                { name: "TooltipProvider", desc: "Wraps the app or a region; sets delayDuration for the tooltips inside." },
                { name: "Tooltip", desc: "Root for a single tooltip. Holds open / defaultOpen. disabled keeps it closed and takes precedence over open." },
                { name: "TooltipTrigger", desc: "The element that reveals the tooltip on hover or keyboard focus. Programmatic focus (for example dialog autofocus) does not open it. Use asChild." },
                { name: "TooltipContent", desc: "The floating label. side and sideOffset control placement." },
                { name: "TooltipPortal", desc: "The portal TooltipContent renders into. It uses the PortalContainerProvider element, or document.body without a provider." },
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
              Don&apos;t paint the tooltip surface brand purple: a tooltip is a
              high-contrast inverse chip, not a brand element. And don&apos;t
              hide essential info or actions in one; it&apos;s hover-only and
              invisible on touch.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Short, supplementary label on an icon button
<TooltipContent>Save changes</TooltipContent>`}
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
          Wrap the app (or a region) in a single{" "}
          <code className="font-mono">TooltipProvider</code>, then use{" "}
          <code className="font-mono">Tooltip</code> /{" "}
          <code className="font-mono">TooltipTrigger</code> /{" "}
          <code className="font-mono">TooltipContent</code> per trigger.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui components/shadcn/tooltip
        </code>
        . The surface is intentionally{" "}
        <code className="font-mono text-foreground">background-inverse</code> /{" "}
        <code className="font-mono text-foreground">text-inverse</code>: a
        high-contrast chip, deliberately not brand purple, which is not the
        correct token for a tooltip surface.
      </footer>
    </div>
  );
}
