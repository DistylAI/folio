import type { Metadata } from "next";
import { ChevronRight, File, Folder } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/shadcn/sidebar";
import { FileTreeDemo } from "./FileTreeDemo";

export const metadata: Metadata = {
  title: "File Tree",
  description:
    "File Tree -- an interactive, collapsible hierarchy of folders and files, composed from the Sidebar primitives and themed with Folio tokens.",
};

const doCode = `<SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton className="h-8">
      <Folder className="size-4 text-muted-foreground" />
      <span>app</span>
    </SidebarMenuButton>
    <SidebarMenuSub>
      <SidebarMenuSubItem>
        <SidebarMenuSubButton>
          <File className="size-4 text-muted-foreground" />
          <span>page.tsx</span>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    </SidebarMenuSub>
  </SidebarMenuItem>
</SidebarMenu>`;

export default function FileTreePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">File Tree</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A file tree presents nested folders and files as an interactive,
        collapsible hierarchy -- the pattern behind source-control panels and
        project explorers. It composes from the Sidebar primitives, so every row
        shares the same hover, selected, and focus styling.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
          <FileTreeDemo />
        </div>
        <p className="mt-2 text-small">
          Click a folder to expand or collapse it, and a file to select it. Switch
          the theme -- every surface and the selected-row highlight remap from
          Folio tokens, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-caption font-medium">
              With icons (default)
            </p>
            <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
              <FileTreeDemo variant="default" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-caption font-medium">
              Without icons
            </p>
            <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
              <FileTreeDemo variant="no-icons" />
            </div>
          </div>
          <div>
            <p className="mb-2 text-caption font-medium">Checkbox</p>
            <div className="flex justify-center rounded-xl border border-border bg-muted p-6">
              <FileTreeDemo variant="checkbox" />
            </div>
            <p className="mt-2 text-caption">
              Multi-select mode with per-row checkboxes.
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">{'variant="no-icons"'}</code> drops the
          chevron, folder, and file glyphs so indentation and the guide rail carry
          the hierarchy; <code className="font-mono">{'variant="checkbox"'}</code>{" "}
          adds per-row multi-select with tri-state folders.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-caption font-medium">Default</p>
            <div className="rounded-xl border border-border bg-muted p-2">
              <SidebarProvider className="block min-h-0 w-auto">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-8">
                      <File className="size-4 text-muted-foreground" />
                      <span>page.tsx</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarProvider>
            </div>
          </div>
          <div>
            <p className="mb-2 text-caption font-medium">Selected</p>
            <div className="rounded-xl border border-border bg-muted p-2">
              <SidebarProvider className="block min-h-0 w-auto">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-8" isActive>
                      <File className="size-4 text-muted-foreground" />
                      <span>page.tsx</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarProvider>
            </div>
          </div>
          <div>
            <p className="mb-2 text-caption font-medium">
              Folder -- collapsed
            </p>
            <div className="rounded-xl border border-border bg-muted p-2">
              <SidebarProvider className="block min-h-0 w-auto">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-8">
                      <ChevronRight className="size-4 text-muted-foreground" />
                      <Folder className="size-4 text-muted-foreground" />
                      <span>app</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarProvider>
            </div>
          </div>
          <div>
            <p className="mb-2 text-caption font-medium">
              Folder -- expanded
            </p>
            <div className="rounded-xl border border-border bg-muted p-2">
              <SidebarProvider className="block min-h-0 w-auto">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton className="h-8">
                      <ChevronRight className="size-4 rotate-90 text-muted-foreground" />
                      <Folder className="size-4 text-muted-foreground" />
                      <span>app</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarProvider>
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rows tint on hover and when selected (<code className="font-mono">
            isActive
          </code>
          ), both drawn from <code className="font-mono">background-secondary</code>.
          Folders rotate the chevron 90&deg; when expanded.
        </p>
      </section>

      {/* Props */}
      <section id="props" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Props</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            {[
              {
                prop: "variant",
                type: `"default" | "no-icons" | "checkbox"`,
                def: `"default"`,
                desc: "Display mode. default shows icons; no-icons drops all glyphs; checkbox adds per-row multi-select with tri-state folders.",
              },
              {
                prop: "name",
                type: "string",
                def: "—",
                desc: "Display label for a node.",
              },
              {
                prop: "kind",
                type: `"folder" | "file" | "route"`,
                def: "—",
                desc: "Node type. Picks the icon (Folder, File, or SquareTerminal) and the row height.",
              },
              {
                prop: "badge",
                type: "string | number",
                def: "—",
                desc: "Optional right-aligned status marker, e.g. M, U, or a count.",
              },
              {
                prop: "expanded",
                type: "boolean",
                def: "false",
                desc: "Whether a folder starts open.",
              },
              {
                prop: "children",
                type: "FileNode[]",
                def: "—",
                desc: "Child nodes. Folders only.",
              },
            ].map((row) => (
              <div
                key={row.prop}
                className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border px-4 py-3 text-small last:border-0"
              >
                <code className="font-mono text-primary">{row.prop}</code>
                <code className="font-mono text-muted-foreground">{row.type}</code>
                <span className="text-muted-foreground">{row.def}</span>
                <span className="text-foreground">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">variant</code> is the only component prop;
          the remaining fields describe the <code className="font-mono">FileNode</code>{" "}
          data shape the tree renders.
        </p>
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
              Don&apos;t rebuild the tree from raw{" "}
              <code className="font-mono">div</code>s with hardcoded indentation
              and palette colors. Hand-rolled rows drift from the menu styling,
              lose their hover and selected states, and break on rebrand.
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
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        Composed entirely from the Sidebar primitives and{" "}
        <code className="font-mono text-foreground">lucide-react</code> icons,
        themed with Folio tokens -- no hardcoded colors and no{" "}
        <code className="font-mono text-foreground">dark:</code> classes. The
        file names shown are placeholders for documentation only.
      </footer>
    </div>
  );
}
