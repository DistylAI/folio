import type { Metadata } from "next";
import {
  ItemDefault,
  ItemListPreview,
  ItemStateDefault,
  ItemStateDisabled,
  ItemStateHover,
  ItemStateSelected,
  ItemWithAction,
  ItemWithAvatar,
  ItemWithBadge,
  ItemWithCheckbox,
  ItemWithIcon,
  ItemWithSecondary,
} from "./item-demos";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Item",
  description:
    "Item component -- a single structured row built from parts: ItemMedia, ItemContent with ItemTitle and ItemDescription, and ItemActions.",
};

const props = [
  {
    name: "Item",
    type: "variant, size, asChild",
    def: 'variant="default" size="default"',
    desc: "The row. variant is default, outline, or muted. size is default or sm. Use asChild to render a button or link.",
  },
  {
    name: "ItemMedia",
    type: "variant",
    def: 'variant="default"',
    desc: "Leading element: an icon, avatar, or checkbox. variant is default, icon, or image.",
  },
  {
    name: "ItemContent",
    type: "div props",
    def: "--",
    desc: "Holds the title and the description in one column.",
  },
  {
    name: "ItemTitle",
    type: "variant",
    def: 'variant="default"',
    desc: "The primary text of the row. variant mono is for identifiers.",
  },
  {
    name: "ItemDescription",
    type: "size",
    def: 'size="default"',
    desc: "A secondary line below the title. size xs gives a one-line meta row.",
  },
  {
    name: "ItemActions",
    type: "div props",
    def: "--",
    desc: "Trailing element: an action, badge, or status.",
  },
  {
    name: "ItemHeader / ItemFooter",
    type: "div props",
    def: "--",
    desc: "Full-width rows above or below the main row.",
  },
  {
    name: "ItemGroup / ItemSeparator",
    type: "div props",
    def: "--",
    desc: "A list of items, and a line between two items.",
  },
] as const;

const doCode = `<Item asChild>
  <button type="button" onClick={open}>
    <ItemMedia><Avatar>…</Avatar></ItemMedia>
    <ItemContent>
      <ItemTitle>Derek Ho</ItemTitle>
      <ItemDescription>derek@distyl.ai</ItemDescription>
    </ItemContent>
    <ItemActions><Badge>Owner</Badge></ItemActions>
  </button>
</Item>`;

const installCode = `import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/shadcn/item";
import { Folder } from "lucide-react";

export function ProjectRow() {
  return (
    <Item asChild>
      <button type="button" onClick={openProjects}>
        <ItemMedia>
          <Folder />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Projects</ItemTitle>
          <ItemDescription>14 active</ItemDescription>
        </ItemContent>
      </button>
    </Item>
  );
}`;

export default function ItemPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Item</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A single structured row: a leading ItemMedia, an ItemContent with a
        title and an optional description, and trailing ItemActions. It gives
        lists and rows a consistent shape.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ItemListPreview />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Hover and click the rows, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemDefault />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Item><ItemContent><ItemTitle>Overview</ItemTitle></ItemContent></Item>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithIcon />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemMedia><Folder /></ItemMedia> … <ItemActions><ChevronRight /></ItemActions>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithAvatar />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemMedia><Avatar /></ItemMedia> … <ItemDescription>…</ItemDescription>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithCheckbox />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemMedia><Checkbox /></ItemMedia>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithBadge />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemActions><Badge>Pro</Badge></ItemActions>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithAction />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemActions><Button size="icon-sm">…</Button></ItemActions>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border lg:col-span-2">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemWithSecondary />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<ItemTitle>Billing</ItemTitle>\n<ItemDescription>Invoices, payment method, and plan</ItemDescription>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Leading icons, avatars, or checkboxes in ItemMedia; trailing badges or
          actions in ItemActions; and an optional ItemDescription all compose
          into the same row.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemStateDefault />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Default. Resting row.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemStateHover />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Hover. The secondary surface fills in (shown statically).
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemStateSelected />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Selected. Set aria-current on the row; click to toggle.
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <ItemStateDisabled />
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Disabled. Dimmed, inert.</p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Hover and focus apply only when the row is interactive (rendered as a{" "}
          <code className="font-mono">button</code> or link with{" "}
          <code className="font-mono">asChild</code>). Selected (
          <code className="font-mono">aria-current</code>) and disabled read on
          the row itself.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Props</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
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
              Don&apos;t use an Item as a navigation link. Moving between pages or
              sections is the job of a Sidebar nav item or a Navigation Menu link,
              which carry the right semantics and active states. An Item is a row
              of content or actions, not a destination.
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
          Use Item to build lists, command palettes, settings rows, and any
          single-row layout that needs consistent leading and trailing
          composition.
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
