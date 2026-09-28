import type { Metadata } from "next";
import { Combobox } from "@/components/combobox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import { CodeBlock } from "@/components/CodeBlock";
import {
  GroupedCombobox,
  IconCombobox,
  LoadingCombobox,
  SmallIconCombobox,
  TagCombobox,
} from "./combobox-demos";

export const metadata: Metadata = {
  title: "Combobox",
  description:
    "Combobox component: a searchable select that combines a text input with a filterable dropdown list. A higher-order component built from Command and Popover.",
};

// cmdk auto-selects its first item on mount and scrolls it into view. With
// several inline Command demos sitting below the fold, that scroll jumps the
// page on load, so these static demos pass a sentinel value that matches no
// item to suppress the auto-selection. The live Combobox keeps the default.
const NO_AUTOSELECT = "__no_selection__";

const regions = [
  { value: "us-east", label: "US East (Virginia)" },
  { value: "us-west", label: "US West (Oregon)" },
  { value: "eu-west", label: "EU West (Ireland)" },
  { value: "eu-central", label: "EU Central (Frankfurt)" },
  { value: "ap-south", label: "Asia Pacific (Mumbai)" },
  { value: "ap-northeast", label: "Asia Pacific (Tokyo)" },
  { value: "sa-east", label: "South America (Sao Paulo)" },
];


const props = [
  {
    name: "options",
    type: "ComboboxOption[]",
    def: "required",
    desc: "The selectable options: { value, label, disabled?, tag? }. A tag renders next to the label. The group field is reserved and not rendered yet.",
  },
  {
    name: "value",
    type: "string",
    def: "undefined",
    desc: "Selected value when the combobox is controlled.",
  },
  {
    name: "onValueChange",
    type: "(value: string) => void",
    def: "undefined",
    desc: "Called with the new value. Picking the selected option again sends an empty string.",
  },
  {
    name: "noopOnReselect",
    type: "boolean",
    def: "false",
    desc: "Keep the value when the selected option is picked again, instead of clearing it.",
  },
  {
    name: "placeholder",
    type: "string",
    def: "\"Select an option\u2026\"",
    desc: "Trigger text shown when nothing is selected.",
  },
  {
    name: "searchPlaceholder",
    type: "string",
    def: "\"Search\u2026\"",
    desc: "Placeholder of the search input.",
  },
  {
    name: "emptyText",
    type: "string",
    def: "\"No results found.\"",
    desc: "Text shown when no option matches the search.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Disables the trigger and blocks opening the list.",
  },
  {
    name: "size",
    type: "\"default\" | \"sm\"",
    def: "\"default\"",
    desc: "Trigger size. Uses the Button sizes of the same name.",
  },
  {
    name: "className",
    type: "string",
    def: "undefined",
    desc: "Classes for the trigger. triggerClassName is an alias.",
  },
  {
    name: "contentClassName",
    type: "string",
    def: "undefined",
    desc: "Classes for the popover panel.",
  },
  {
    name: "icon",
    type: "ReactNode",
    def: "undefined",
    desc: "Leading element in the trigger, before the label.",
  },
  {
    name: "selectedLabel",
    type: "string",
    def: "undefined",
    desc: "Trigger label for a value that is not in options.",
  },
  {
    name: "onSearchChange",
    type: "(value: string) => void",
    def: "undefined",
    desc: "Called when the search text changes. Use it for server-side search.",
  },
  {
    name: "shouldFilter",
    type: "boolean",
    def: "true",
    desc: "Set false to skip client-side filtering, for example when the server filters.",
  },
  {
    name: "isLoading",
    type: "boolean",
    def: "false",
    desc: "Disables the trigger and shows a loading item while options load.",
  },
  {
    name: "isSearching",
    type: "boolean",
    def: "false",
    desc: "Shows an updating row while a new search runs. The trigger stays enabled.",
  },
  {
    name: "onLoadMore / hasMore",
    type: "() => void | Promise<void> / boolean",
    def: "undefined / false",
    desc: "Infinite scroll: onLoadMore runs when the end of the list scrolls into view and hasMore is true.",
  },
  {
    name: "isLoadingMore",
    type: "boolean",
    def: "false",
    desc: "Shows a spinner at the end of the list while the next page loads.",
  },
  {
    name: "modal",
    type: "boolean",
    def: "false",
    desc: "Set true inside a modal Dialog, so the popover keeps focus and blocks outside scroll.",
  },
] as const;

const doCode = `<Combobox
  options={timezones}
  placeholder="Select a timezone..."
  onValueChange={setZone}
/>`;

const installCode = `import { Combobox } from "@/components/combobox";

const regions = [
  { value: "us-east", label: "US East (Virginia)" },
  { value: "eu-west", label: "EU West (Ireland)" },
  // ...a long list worth filtering
];

export function RegionPicker() {
  return (
    <Combobox
      options={regions}
      placeholder="Select a region..."
      searchPlaceholder="Search regions..."
    />
  );
}`;

export default function ComboboxPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Combobox</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A searchable select. It pairs a text input with a dropdown list so the
        reader can filter by typing, which keeps long option sets manageable.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Combobox is a higher-order component, composed from the Command and
          Popover primitives. The Popover positions the list; Command supplies
          the search input, filtering, and keyboard navigation.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="w-full max-w-xs">
            <Combobox
              options={regions}
              placeholder="Select a region..."
              searchPlaceholder="Search regions..."
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Open it and type to filter, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <Combobox options={regions} placeholder="Region..." />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Combobox options={regions} />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <GroupedCombobox />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`// Combobox renders one flat list.
// Compose Popover + Command for headings.
<Command>
  <CommandInput placeholder="Search..." />
  <CommandList>
    <CommandGroup heading="Production">
      <CommandItem value="prod-us">
        Production US
      </CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <IconCombobox />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`// Options take no icon. Compose
// Popover + Command for option icons.
<CommandItem value="datasets">
  <Database className="text-muted-foreground" />
  <span className="truncate">Datasets</span>
</CommandItem>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <TagCombobox />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`const models = [
  { value: "sol", label: "Sol",
    tag: <Badge variant="secondary" size="sm">New</Badge> },
  { value: "lyra", label: "Lyra", disabled: true },
];
<Combobox options={models} />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <SmallIconCombobox />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Combobox
  options={regions}
  size="sm"
  icon={<Globe className="size-3.5" />}
/>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <LoadingCombobox />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<Combobox options={[]} isLoading />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Default, with tags, small with a trigger icon, and loading use the
          Combobox API. Combobox renders one flat list with no option icons, so
          the grouped and icon examples compose Popover and Command directly.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Default */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <Combobox options={regions} placeholder="Region..." />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Default. Resting trigger, nothing selected.
              </p>
            </div>
          </div>
          {/* Selected */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <Combobox
                  options={regions}
                  value="eu-west"
                  placeholder="Region..."
                />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Selected. The trigger shows the chosen label.
              </p>
            </div>
          </div>
          {/* Disabled */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px]">
                <Combobox options={regions} placeholder="Region..." disabled />
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Disabled. Dimmed; the list cannot open.
              </p>
            </div>
          </div>
          {/* Open */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px] rounded-lg border border-border bg-background">
                <Command defaultValue={NO_AUTOSELECT}>
                  <CommandInput placeholder="Search regions..." />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {regions.slice(0, 4).map((r) => (
                        <CommandItem key={r.value} value={r.value}>
                          {r.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Open. The list drops with the search input focused.
              </p>
            </div>
          </div>
          {/* Searching */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px] rounded-lg border border-border bg-background">
                <Command defaultValue={NO_AUTOSELECT}>
                  <CommandInput placeholder="eu" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup>
                      {regions
                        .filter((r) => r.label.toLowerCase().includes("eu"))
                        .map((r) => (
                          <CommandItem key={r.value} value={r.value}>
                            {r.label}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Searching. Typing narrows the list to matches.
              </p>
            </div>
          </div>
          {/* Empty */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-start justify-center bg-muted p-8">
              <div className="w-full max-w-[220px] rounded-lg border border-border bg-background">
                <Command defaultValue={NO_AUTOSELECT}>
                  <CommandInput placeholder="xyz" />
                  <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                  </CommandList>
                </Command>
              </div>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Empty. No option matches the query.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Open, searching, and empty are interaction states. The open, searching,
          and empty cells render the underlying Command list inline so each is
          visible at rest.
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
              Don&apos;t reach for a Combobox when the option list is short and
              fixed. A handful of choices the reader can scan at a glance does not
              benefit from a search field, and the extra step to type slows them
              down. Use a Select instead.
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
          Use it once the list is long enough that filtering meaningfully reduces
          the work of finding the right option.
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
