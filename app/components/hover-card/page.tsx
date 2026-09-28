import type { Metadata } from "next";
import { Briefcase, CalendarDays } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Hover Card",
  description:
    "Hover Card component -- supplementary, read-only content that appears on hover over a trigger, without navigation or a click.",
};

const api = [
  { name: "HoverCard", type: "component", def: "—", desc: "Root that wires the trigger to the card." },
  { name: "HoverCardTrigger", type: "component", def: "—", desc: "The element that opens the card on hover or focus." },
  { name: "HoverCardContent", type: "component", def: "—", desc: "The floating card surface." },
  { name: "disabled", type: "boolean", def: "false", desc: "Keeps the card closed. Takes precedence over open." },
  { name: "openDelay", type: "number", def: "700", desc: "Milliseconds to wait on hover before opening." },
  { name: "closeDelay", type: "number", def: "300", desc: "Milliseconds to wait after leaving before closing." },
  { name: "side", type: '"top" | "right" | "bottom" | "left"', def: '"bottom"', desc: "Preferred side of the trigger to place the card." },
  { name: "align", type: '"start" | "center" | "end"', def: '"center"', desc: "Alignment of the card along that side." },
] as const;

const doCode = `<HoverCard>
  <HoverCardTrigger asChild>
    <a href="/team/derek-ho">@derekho</a>
  </HoverCardTrigger>
  <HoverCardContent>Profile preview...</HoverCardContent>
</HoverCard>`;

const installCode = `import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/shadcn/hover-card";

export function HandlePreview() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <button className="text-primary hover:underline">
          @derekho
        </button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <p className="text-sm font-semibold">Derek Ho</p>
        <p className="text-description">
          Co-founder at Distyl.
        </p>
      </HoverCardContent>
    </HoverCard>
  );
}`;

function ProfileAvatar() {
  return (
    <Avatar className="size-10">
      <AvatarImage src="/avatar-sample.jpg" alt="Derek Ho" />
      <AvatarFallback>DH</AvatarFallback>
    </Avatar>
  );
}

// Static, inline replica of HoverCardContent for the variants and states, since
// a hover-triggered card cannot be shown open at rest.
function MockCard({
  avatar,
  metadata,
}: {
  avatar?: boolean;
  metadata?: boolean;
}) {
  return (
    <div className="w-full max-w-72 rounded-lg border border-border bg-background p-4 text-foreground shadow-md">
      <div className="flex gap-3">
        {avatar && <ProfileAvatar />}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">Derek Ho</p>
          <p className="text-description">
            Co-founder at Distyl. Building the team behind the Folio design
            system.
          </p>
        </div>
      </div>
      {metadata && (
        <div className="mt-3 flex items-center gap-4 text-caption">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Briefcase className="size-3.5" />
            Co-founder
          </span>
          <span className="flex items-center gap-1 whitespace-nowrap">
            <CalendarDays className="size-3.5" />
            Joined 2022
          </span>
        </div>
      )}
    </div>
  );
}

export default function HoverCardPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Hover Card</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A card that appears on hover over a trigger, showing supplementary
        information without a click or navigation away from the current surface.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <HoverCard>
            <HoverCardTrigger asChild>
              <button
                type="button"
                className="rounded-sm text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                @derekho
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-72">
              <div className="flex gap-3">
                <ProfileAvatar />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Derek Ho
                  </p>
                  <p className="text-description">
                    Co-founder at Distyl. Building the team behind the Folio
                    design system.
                  </p>
                  <div className="flex items-center gap-1 pt-1 text-caption">
                    <CalendarDays className="size-3.5" />
                    Joined 2022
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Hover the handle to open the real
          card, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockCard />
            <p className="text-caption">Default</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockCard avatar />
            <p className="text-caption">With avatar</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockCard avatar metadata />
            <p className="text-caption">With metadata</p>
          </div>
        </div>
        <p className="mt-2 text-small">
          A plain text preview, the same with an avatar, or enriched with a row
          of metadata. The panels above are shown open for reference.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <span className="text-sm font-medium text-primary underline-offset-4">
              @derekho
            </span>
            <p className="text-caption">
              Closed. Only the trigger shows.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockCard avatar />
            <p className="text-caption">
              Open. Appears after the hover delay.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockCard avatar metadata />
            <p className="text-caption">
              Open with delay. Tune via openDelay.
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          Hover cannot be shown at rest, so the open states render the card
          statically. The preview opens the real card on hover.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {api.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
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
        <p className="mt-2 text-small">
          <code className="font-mono">disabled</code>,{" "}
          <code className="font-mono">openDelay</code>, and{" "}
          <code className="font-mono">closeDelay</code> are set on{" "}
          <code className="font-mono">HoverCard</code>;{" "}
          <code className="font-mono">side</code> and{" "}
          <code className="font-mono">align</code> on{" "}
          <code className="font-mono">HoverCardContent</code>.
        </p>
      </section>

      {/* Don't and Do */}
      <section id="do-dont" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Don&apos;t and Do
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t put actions inside a Hover Card. It is read-only
              supplementary content, and it dismisses as soon as the pointer
              leaves, so buttons and inputs are hard to reach. When the reader
              needs to interact with the content, use a Popover instead.
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
        <p className="mt-2 text-small">
          Use it to preview profile information, link previews, or contextual
          metadata on hover without leaving the current surface.
        </p>
      </section>

      {/* Copy-paste */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        Folio v1.2 · June 2026
      </footer>
    </div>
  );
}
