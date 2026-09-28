"use client";

import {
  Boxes,
  FileText,
  GalleryVerticalEnd,
  LayoutDashboard,
  Settings,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/shadcn/sidebar";

export function SidebarDemo() {
  return (
    // The toolkit Sidebar is a fixed, full-height app shell. These classes hold
    // it inside the 480px preview box.
    <SidebarProvider className="relative isolate h-[480px] min-h-0 overflow-hidden rounded-xl border border-border">
      <Sidebar collapsible="icon" className="absolute h-full">
        <SidebarHeader>
          <SidebarMenuButton size="lg">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-inverse text-inverse">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-semibold">Documentation</span>
              <span className="truncate text-caption">v1.2.0</span>
            </span>
          </SidebarMenuButton>
        </SidebarHeader>
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
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Boxes />
                  <span>Components</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton isActive>Alert</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Button</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton>Dialog</SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                </SidebarMenuSub>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileText />
                  <span>Tokens</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenuButton>
            <User />
            <span>Account</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="min-h-0">
        <header className="flex h-12 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <span className="text-sm font-medium text-foreground">Overview</span>
        </header>
        <div className="p-6 text-sm text-muted-foreground">
          Toggle the sidebar with the button in the header. Collapsed, it shows
          icons only -- the labels and sub-menu hide.
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
