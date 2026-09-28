import type { Metadata } from "next";
import { Boxes, FileText, Palette, Shapes } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";
import { CodeBlock } from "@/components/CodeBlock";

// Inlined here rather than calling navigationMenuTriggerStyle(): that cva lives
// in a "use client" module and cannot be invoked from this server component.
const navLinkClass =
  "group inline-flex h-9 w-max items-center justify-center rounded-lg bg-background px-4 py-2 text-label transition-colors hover:bg-secondary hover:text-foreground focus:bg-secondary focus:text-foreground focus:outline-none";

export const metadata: Metadata = {
  title: "Navigation Menu",
  description:
    "Navigation Menu component: a horizontal top-level menu with dropdown content panels triggered on hover or focus.",
};

const composition = [
  { name: "NavigationMenu", desc: "Root, also renders the viewport for dropdowns." },
  { name: "NavigationMenuList", desc: "The horizontal list of items." },
  { name: "NavigationMenuItem", desc: "A single top-level item." },
  { name: "NavigationMenuTrigger", desc: "An item that opens a dropdown on hover or focus." },
  { name: "NavigationMenuContent", desc: "The dropdown panel for a trigger." },
  { name: "NavigationMenuLink", desc: "A link, on its own or inside content." },
  { name: "NavigationMenuIndicator", desc: "The arrow that points at the open item." },
  { name: "NavigationMenuViewport", desc: "The animated container the panels render into." },
] as const;

const doCode = `<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>...</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`;

const installCode = `import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/shadcn/navigation-menu";

export function PrimaryNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[420px] gap-1 p-2 md:grid-cols-2">
              <li>
                <NavigationMenuLink href="/components">
                  Components
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`;

const triggerClass =
  "inline-flex h-9 items-center justify-center rounded-lg px-4 text-label";

function MockBar({
  state,
}: {
  state?: "hover" | "active" | "focus";
}) {
  const toneByState = {
    hover: "bg-secondary",
    active: "bg-primary-subtle",
    focus: "ring-1 ring-ring",
  } as const;
  const tone = (target: string) =>
    state && target === "Resources" ? toneByState[state] : "";
  return (
    <div className="flex items-center gap-1">
      <span className={`${triggerClass} ${tone("Resources")}`}>Resources</span>
      <span className={triggerClass}>Pricing</span>
      <span className={triggerClass}>Docs</span>
    </div>
  );
}

function MockPanel({
  variant,
}: {
  variant: "links" | "icons" | "descriptions";
  highlight?: boolean;
}) {
  const items = [
    { title: "Components", desc: "Buttons, inputs, and the full library.", icon: <Boxes /> },
    { title: "Tokens", desc: "Color, type, spacing, and radius.", icon: <Palette /> },
    { title: "Icons", desc: "The lucide set, sized and tinted.", icon: <Shapes /> },
    { title: "Guidelines", desc: "How and when to use each piece.", icon: <FileText /> },
  ];
  return (
    <div className="w-full max-w-[380px] rounded-lg border border-border bg-background p-2 shadow-md">
      <ul className="grid gap-1 md:grid-cols-2">
        {items.map((item, i) => (
          <li key={item.title}>
            <div
              className={`flex gap-3 rounded-lg p-3 ${i === 0 ? "bg-secondary" : ""}`}
            >
              {variant === "icons" && (
                <span className="mt-0.5 shrink-0 text-primary [&>svg]:size-5">
                  {item.icon}
                </span>
              )}
              <div>
                <p className="text-label">
                  {item.title}
                </p>
                {variant === "descriptions" && (
                  <p className="text-description">{item.desc}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavigationMenuPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Navigation Menu</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A horizontal menu for top-level navigation. Items can open rich dropdown
        panels on hover or keyboard focus.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Navigation Menu is distinct from Sidebar navigation. It is horizontal,
          sits at the top of a surface, and is tuned for mouse and keyboard
          interaction.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex min-h-[220px] items-start justify-center rounded-xl border border-border bg-muted p-10">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[420px] gap-1 p-2 md:grid-cols-2">
                    <li>
                      <NavigationMenuLink
                        href="#"
                        className="block rounded-lg p-3 transition-colors hover:bg-secondary"
                      >
                        <p className="text-label">
                          Components
                        </p>
                        <p className="text-description">
                          Buttons, inputs, and the full library.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        className="block rounded-lg p-3 transition-colors hover:bg-secondary"
                      >
                        <p className="text-label">
                          Tokens
                        </p>
                        <p className="text-description">
                          Color, type, spacing, and radius.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        className="block rounded-lg p-3 transition-colors hover:bg-secondary"
                      >
                        <p className="text-label">
                          Icons
                        </p>
                        <p className="text-description">
                          The lucide set, sized and tinted.
                        </p>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="#"
                        className="block rounded-lg p-3 transition-colors hover:bg-secondary"
                      >
                        <p className="text-label">
                          Guidelines
                        </p>
                        <p className="text-description">
                          How and when to use each piece.
                        </p>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navLinkClass}>
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#" className={navLinkClass}>
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Hover or focus &quot;Resources&quot;
          to open its panel, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockBar />
            <p className="text-caption">Default (links only)</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockPanel variant="links" />
            <p className="text-caption">With dropdowns</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockPanel variant="icons" />
            <p className="text-caption">With icons</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockPanel variant="descriptions" />
            <p className="text-caption">With descriptions</p>
          </div>
        </div>
        <p className="mt-2 text-small">
          A plain link bar, or a trigger that opens a panel of links, optionally
          with icons or descriptions. The panels are shown open for reference.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockBar />
            <p className="text-caption">Default. Resting items.</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockBar state="hover" />
            <p className="text-caption">Item hover.</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockBar state="active" />
            <p className="text-caption">Item active (current page).</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6">
            <MockBar state="focus" />
            <p className="text-caption">Keyboard focused.</p>
          </div>
          <div className="flex h-auto flex-col items-center gap-3 overflow-hidden rounded-xl border border-border bg-muted p-6 lg:col-span-2">
            <MockPanel variant="descriptions" />
            <p className="text-caption">
              Dropdown open, with the first item hovered.
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          Hover and the open dropdown cannot be shown at rest, so those states
          render statically. The preview opens the real panel.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.8fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Component</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {composition.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1.8fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {c.name}
                  </div>
                  <div className="text-description">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              Don&apos;t use a Navigation Menu to move between sections of a
              single page. Jumping around within one view is the job of Tabs or
              an anchor list. A Navigation Menu is for moving across the app or
              site, not within a page.
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
          Use it for primary app or site navigation where top-level items may
          carry rich dropdown content.
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
