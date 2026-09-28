import type { Metadata } from "next";
import {
  ChevronRight,
  ClipboardPaste,
  Copy,
  Scissors,
  Share2,
  Star,
  Trash2,
} from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/shadcn/context-menu";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Context Menu",
  description:
    "Context Menu component -- a right-click menu surfacing contextual actions relevant to the target element.",
};

const composition = [
  { name: "ContextMenu", desc: "Root that wires the trigger to the menu." },
  { name: "ContextMenuTrigger", desc: "The element that opens the menu on right-click." },
  { name: "ContextMenuContent", desc: "The floating menu surface." },
  { name: "ContextMenuItem", desc: "A standard action item." },
  { name: "ContextMenuCheckboxItem", desc: "An item with a toggle checkmark." },
  { name: "ContextMenuRadioItem", desc: "A single-select item within a radio group." },
  { name: "ContextMenuLabel", desc: "A non-interactive section heading." },
  { name: "ContextMenuSeparator", desc: "A dividing line between groups." },
  { name: "ContextMenuShortcut", desc: "Right-aligned keyboard hint on an item." },
  { name: "ContextMenuGroup", desc: "Groups related items together." },
  { name: "ContextMenuSub", desc: "Root for a nested sub-menu." },
  { name: "ContextMenuSubTrigger", desc: "Item that opens the sub-menu." },
  { name: "ContextMenuSubContent", desc: "The nested sub-menu surface." },
  { name: "ContextMenuRadioGroup", desc: "Wraps radio items to share one value." },
] as const;

const doCode = `<ContextMenu>
  <ContextMenuTrigger>{children}</ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem>Copy</ContextMenuItem>
    <ContextMenuItem>Rename</ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>`;

const installCode = `import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/shadcn/context-menu";

export function FileTile({ children }) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-52">
        <ContextMenuItem>
          Copy <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Rename</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}`;

const itemBase =
  "relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm [&>svg]:size-4 [&>svg]:shrink-0";

function MockMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-56 rounded-lg border border-border bg-background p-1 text-foreground shadow-md ${className ?? ""}`}
    >
      {children}
    </div>
  );
}

function MockItem({
  children,
  icon,
  shortcut,
  chevron,
  highlighted,
  disabled,
  destructive,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  chevron?: boolean;
  highlighted?: boolean;
  disabled?: boolean;
  destructive?: boolean;
}) {
  const tone = destructive ? "text-destructive" : "text-foreground";
  const highlightTone = destructive ? "bg-destructive-subtle" : "bg-secondary";
  const hl = highlighted ? highlightTone : "";
  const dis = disabled ? "opacity-50" : "";
  return (
    <div className={`${itemBase} ${tone} ${hl} ${dis}`}>
      {icon}
      <span>{children}</span>
      {shortcut && (
        <span className="ml-auto text-caption tracking-widest">
          {shortcut}
        </span>
      )}
      {chevron && <ChevronRight className="ml-auto size-4 shrink-0" />}
    </div>
  );
}

function MockSeparator() {
  return <div className="-mx-1 my-1 h-px bg-border" />;
}

export default function ContextMenuPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Context Menu</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A menu opened by right-click, or long-press on touch, that surfaces
        actions relevant to the element under the pointer.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ContextMenu>
            <ContextMenuTrigger asChild>
              <div className="flex h-40 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border-strong text-description">
                Right-click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
              <ContextMenuItem>
                <Copy />
                Copy
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Scissors />
                Cut
                <ContextMenuShortcut>⌘X</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <ClipboardPaste />
                Paste
                <ContextMenuShortcut>⌘V</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <Share2 />
                  Share
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuItem>Copy link</ContextMenuItem>
                  <ContextMenuItem>Email</ContextMenuItem>
                </ContextMenuSubContent>
              </ContextMenuSub>
              <ContextMenuSeparator />
              <ContextMenuItem className="text-destructive focus:bg-destructive-subtle focus:text-destructive">
                <Trash2 />
                Delete
                <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Right-click the area to open the
          real menu, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Back</MockItem>
              <MockItem>Reload</MockItem>
              <MockItem>Save as</MockItem>
            </MockMenu>
            <p className="text-caption">Default</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem icon={<Copy />}>Copy</MockItem>
              <MockItem icon={<Star />}>Favorite</MockItem>
              <MockItem icon={<Share2 />}>Share</MockItem>
            </MockMenu>
            <p className="text-caption">With icons</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem shortcut="⌘C">Copy</MockItem>
              <MockItem shortcut="⌘X">Cut</MockItem>
              <MockItem shortcut="⌘V">Paste</MockItem>
            </MockMenu>
            <p className="text-caption">With keyboard shortcuts</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Open</MockItem>
              <MockItem icon={<Share2 />} chevron>
                Share
              </MockItem>
              <MockItem>Rename</MockItem>
            </MockMenu>
            <p className="text-caption">With sub-menu</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Cut</MockItem>
              <MockItem>Copy</MockItem>
              <MockSeparator />
              <MockItem>Select all</MockItem>
            </MockMenu>
            <p className="text-caption">With separator</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Rename</MockItem>
              <MockItem>Duplicate</MockItem>
              <MockSeparator />
              <MockItem icon={<Trash2 />} destructive>
                Delete
              </MockItem>
            </MockMenu>
            <p className="text-caption">With destructive item</p>
          </div>
        </div>
        <p className="mt-2 text-small">
          Menus compose icons, shortcuts, sub-menus, separators, and a
          destructive item. The panels above are shown open for reference.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <div className="flex h-[124px] w-full items-center justify-center rounded-xl border border-dashed border-border-strong text-description">
              Right-click target
            </div>
            <p className="text-caption">Closed. The default state.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Copy</MockItem>
              <MockItem>Rename</MockItem>
              <MockItem>Duplicate</MockItem>
            </MockMenu>
            <p className="text-caption">Open. The menu is showing.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Copy</MockItem>
              <MockItem highlighted>Rename</MockItem>
              <MockItem>Duplicate</MockItem>
            </MockMenu>
            <p className="text-caption">Item hover. One item is focused.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <MockMenu>
              <MockItem>Copy</MockItem>
              <MockItem disabled>Rename</MockItem>
              <MockItem>Duplicate</MockItem>
            </MockMenu>
            <p className="text-caption">Item disabled. Dimmed, inert.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6 sm:col-span-2">
            <div className="flex items-start">
              <MockMenu>
                <MockItem>Open</MockItem>
                <MockItem icon={<Share2 />} chevron highlighted>
                  Share
                </MockItem>
                <MockItem>Rename</MockItem>
              </MockMenu>
              <MockMenu className="-ml-1 mt-7">
                <MockItem>Copy link</MockItem>
                <MockItem>Email</MockItem>
              </MockMenu>
            </div>
            <p className="text-caption">Sub-menu open.</p>
          </div>
        </div>
        <p className="mt-2 text-small">
          A context menu opens on right-click, so the open, hover, and sub-menu
          states are shown statically. The preview opens the real menu.
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
        <p className="mt-2 text-small">
          Compose the parts inside a single{" "}
          <code className="font-mono">ContextMenu</code>. Items take{" "}
          <code className="font-mono">disabled</code> and{" "}
          <code className="font-mono">onSelect</code>; nest a{" "}
          <code className="font-mono">ContextMenuSub</code> for sub-menus.
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
              Don&apos;t make a context menu the only path to a critical action.
              Right-click is hidden by nature, so many people never discover it,
              and touch users have no equivalent for some gestures. Always offer
              those actions somewhere visible as well.
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
          Use it to augment the primary UI with contextual shortcuts for power
          users.
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
