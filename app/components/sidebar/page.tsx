import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { SidebarDemo } from "./SidebarDemo";

export const metadata: Metadata = {
  title: "Sidebar",
  description:
    "Sidebar -- a composable, collapsible application sidebar. API matches the @distylai/toolkit-ui Sidebar.",
};

const parts = [
  { name: "SidebarProvider", desc: "Owns the open state. Props: defaultOpen, open, onOpenChange, sidebarAvailable. Cmd/Ctrl+B toggles it." },
  { name: "Sidebar", desc: "The panel. Props: side (left | right), variant (sidebar | floating | inset), collapsible (offcanvas | icon | none). Below 768px it opens as a sheet." },
  { name: "SidebarHeader / SidebarFooter", desc: "Fixed areas above and below the scrolling content." },
  { name: "SidebarContent", desc: "The scrolling area that holds the groups." },
  { name: "SidebarGroup", desc: "A section of the sidebar." },
  { name: "SidebarGroupLabel", desc: "The section title. Hides when the sidebar collapses to icons. Takes asChild." },
  { name: "SidebarGroupAction", desc: "An icon button at the right of a group label, for example Add. Takes asChild." },
  { name: "SidebarGroupContent", desc: "A wrapper for the content of a group." },
  { name: "SidebarMenu / SidebarMenuItem", desc: "The list of menu entries and one entry." },
  { name: "SidebarMenuButton", desc: "The clickable row. Props: isActive, asChild, tooltip (shows when collapsed), variant (default | outline), size (default | sm | lg)." },
  { name: "SidebarMenuAction", desc: "An icon button at the right of a menu row. Set showOnHover to show it only on hover or focus." },
  { name: "SidebarMenuBadge", desc: "A count or short label at the right of a menu row." },
  { name: "SidebarMenuSkeleton", desc: "A loading row. Set showIcon to add an icon placeholder." },
  { name: "SidebarMenuSub / SidebarMenuSubItem / SidebarMenuSubButton", desc: "A nested list under a menu item. SidebarMenuSubButton takes isActive, asChild, and size (sm | md)." },
  { name: "SidebarInput", desc: "A compact search input sized for the sidebar." },
  { name: "SidebarSeparator", desc: "A horizontal divider between groups." },
  { name: "SidebarRail", desc: "A thin hit area on the sidebar edge. Click it to toggle the sidebar." },
  { name: "SidebarTrigger", desc: "The toggle button for your header." },
  { name: "SidebarInset", desc: "The main content area next to the sidebar." },
  { name: "useSidebar", desc: "Hook that returns state, open, setOpen, openMobile, setOpenMobile, isMobile, and toggleSidebar." },
] as const;

const extrasCode = `<SidebarGroup>
  <SidebarGroupLabel>Projects</SidebarGroupLabel>
  <SidebarGroupAction aria-label="Add project"><Plus /></SidebarGroupAction>
  <SidebarGroupContent>
    <SidebarInput placeholder="Search" />
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton><Inbox /><span>Inbox</span></SidebarMenuButton>
        <SidebarMenuBadge>24</SidebarMenuBadge>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton><Folder /><span>Design</span></SidebarMenuButton>
        <SidebarMenuAction showOnHover aria-label="More"><MoreHorizontal /></SidebarMenuAction>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuSkeleton showIcon />
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroupContent>
</SidebarGroup>
<SidebarRail />`;

const anatomyCode = `<SidebarProvider>
  <Sidebar collapsible="icon">
    <SidebarHeader>{/* brand */}</SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive>
              <LayoutDashboard />
              <span>Overview</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>{/* user */}</SidebarFooter>
  </Sidebar>
  <SidebarInset>
    <SidebarTrigger />
    {/* page content */}
  </SidebarInset>
</SidebarProvider>`;

const installCode = `import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  // Extra parts
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarInput,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuSkeleton,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/shadcn/sidebar";`;

export default function SidebarPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Sidebar</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A composable, collapsible application sidebar -- header, grouped menu, and
        footer, paired with the main content via{" "}
        <code className="font-mono">SidebarInset</code>.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          <span className="font-bold">Canonical pattern.</span> The toolkit-ui
          Sidebar also ships a mobile sheet, a rail, floating and inset
          variants, skeletons, badges, and row actions. The preview shows the
          one primary pattern most apps should reach for. The API table lists
          every part.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-6">
          <SidebarDemo />
        </div>
        <p className="mt-2 text-small">
          Live and interactive -- hit the toggle to collapse to an icon rail, then
          switch the theme. Every surface, the active-item highlight, and the
          brand badge remap from Folio tokens, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* API */}
      <section id="anatomy" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <CodeBlock
          code={anatomyCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          <code className="font-mono">SidebarProvider</code> owns the
          expanded/collapsed state (read it with{" "}
          <code className="font-mono">useSidebar</code>);{" "}
          <code className="font-mono">SidebarMenuButton</code> takes{" "}
          <code className="font-mono">isActive</code> and{" "}
          <code className="font-mono">asChild</code> (wrap a{" "}
          <code className="font-mono">Link</code>). With{" "}
          <code className="font-mono">collapsible=&quot;icon&quot;</code>, button
          labels, group labels, and sub-menus hide when the sidebar collapses.
        </p>

        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.6fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_3fr] gap-4 px-4 py-3"
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

        <CodeBlock
          code={extrasCode}
          className="mt-6 rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          The extra parts: a group action, a sidebar input, a menu badge, a
          hover-only menu action, a loading skeleton, and the rail.
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
              Don&apos;t hand-roll a fixed{" "}
              <code className="font-mono">aside</code> with{" "}
              <code className="font-mono">bg-gray-50</code> and ad-hoc collapse
              state -- you&apos;ll miss the shared active styling, keyboard focus,
              and token theming. Compose the provided parts.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<SidebarMenuButton asChild isActive={pathname === "/"}>
  <Link href="/"><LayoutDashboard /><span>Overview</span></Link>
</SidebarMenuButton>`}
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
          Wrap the app in <code className="font-mono">SidebarProvider</code>,
          place a <code className="font-mono">SidebarTrigger</code> in your
          header, and put page content in{" "}
          <code className="font-mono">SidebarInset</code>.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        -- <code className="font-mono text-foreground">SidebarProvider</code>,{" "}
        <code className="font-mono text-foreground">Sidebar</code>,{" "}
        <code className="font-mono text-foreground">SidebarMenuButton</code>,{" "}
        <code className="font-mono text-foreground">SidebarInset</code>,{" "}
        <code className="font-mono text-foreground">useSidebar</code>, … The{" "}
        <code className="font-mono text-foreground">sidebar-*</code>{" "}
        utilities map to Folio semantic tokens.
      </footer>
    </div>
  );
}
