"use client";

import { useState, type ReactNode } from "react";
import { ChevronRight, File, Folder, SquareTerminal } from "lucide-react";
import { Checkbox } from "@/components/shadcn/checkbox";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
} from "@/components/shadcn/sidebar";
import { cn } from "@/lib/utils";

export type FileNode = {
  /** Display label for the node. */
  name: string;
  /** Node type. Picks the icon and the row height. */
  kind: "folder" | "file" | "route";
  /** Optional right-aligned status marker, e.g. M, U, or a count. */
  badge?: string | number;
  /** Whether a folder starts open. */
  expanded?: boolean;
  /** Child nodes. Folders only. */
  children?: FileNode[];
};

export type FileTreeVariant = "default" | "no-icons" | "checkbox";

type CheckedState = boolean | "indeterminate";

// Placeholder project shape for documentation only -- not a real file layout.
const changes: FileNode[] = [
  { name: "README.md", kind: "file", badge: "M" },
  { name: "api/hello/route.ts", kind: "file", badge: "U" },
  { name: "app/layout.tsx", kind: "file", badge: "M" },
];

const files: FileNode[] = [
  {
    name: "app",
    kind: "folder",
    expanded: true,
    children: [
      {
        name: "api",
        kind: "folder",
        expanded: true,
        children: [
          {
            name: "hello",
            kind: "folder",
            expanded: true,
            children: [{ name: "route.ts", kind: "route" }],
          },
        ],
      },
      { name: "page.tsx", kind: "file" },
      { name: "layout.tsx", kind: "file" },
      { name: "blog", kind: "folder", children: [] },
    ],
  },
  {
    name: "components",
    kind: "folder",
    expanded: true,
    children: [
      {
        name: "ui",
        kind: "folder",
        expanded: true,
        children: [
          { name: "button.tsx", kind: "file" },
          { name: "card.tsx", kind: "file" },
        ],
      },
      { name: "header.tsx", kind: "file" },
      { name: "footer.tsx", kind: "file" },
    ],
  },
  { name: "lib", kind: "folder", children: [] },
  {
    name: "public",
    kind: "folder",
    expanded: true,
    children: [
      { name: "favicon.ico", kind: "file" },
      { name: "vercel.svg", kind: "file" },
    ],
  },
  { name: ".eslintrc.json", kind: "file" },
  { name: ".gitignore", kind: "file" },
  { name: "next.config.js", kind: "file" },
  { name: "README.md", kind: "file" },
];

function seedOpen(
  nodes: FileNode[],
  parent = "",
  acc: Record<string, boolean> = {},
): Record<string, boolean> {
  for (const node of nodes) {
    const path = parent ? `${parent}/${node.name}` : node.name;
    if (node.kind === "folder") {
      if (node.expanded) acc[path] = true;
      if (node.children) seedOpen(node.children, path, acc);
    }
  }
  return acc;
}

// All leaf (non-folder) descendant paths under a node. Folders derive their
// checked state from these; an empty folder yields [].
function collectLeafPaths(node: FileNode, path: string): string[] {
  if (node.kind !== "folder") return [path];
  return (node.children ?? []).flatMap((child) =>
    collectLeafPaths(child, `${path}/${child.name}`),
  );
}

function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <span className="ml-auto shrink-0 text-caption">{children}</span>
  );
}

const rowClass = (selected: boolean) =>
  cn(
    "flex items-center gap-2 rounded-lg hover:bg-secondary",
    selected && "bg-secondary",
  );

export function FileTreeDemo({
  variant = "default",
}: {
  variant?: FileTreeVariant;
}) {
  const showIcons = variant !== "no-icons";
  const selectable = variant === "checkbox";

  const [open, setOpen] = useState<Record<string, boolean>>(() =>
    seedOpen(files),
  );
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (path: string) =>
    setOpen((prev) => ({ ...prev, [path]: !prev[path] }));

  const toggleLeaf = (path: string) =>
    setChecked((prev) => ({ ...prev, [path]: !prev[path] }));

  // Source of truth is leaf paths; a folder is the roll-up of its descendants.
  const folderState = (node: FileNode, path: string): CheckedState => {
    const leaves = collectLeafPaths(node, path);
    if (leaves.length === 0) return false;
    const count = leaves.filter((p) => checked[p]).length;
    if (count === 0) return false;
    return count === leaves.length ? true : "indeterminate";
  };

  // Fully checked -> clear every descendant leaf; otherwise check them all.
  const toggleFolder = (node: FileNode, path: string) => {
    const leaves = collectLeafPaths(node, path);
    const fully = leaves.length > 0 && leaves.every((p) => checked[p]);
    setChecked((prev) => {
      const next = { ...prev };
      for (const p of leaves) next[p] = !fully;
      return next;
    });
  };

  const fileIcon = (kind: FileNode["kind"]) =>
    kind === "route" ? SquareTerminal : File;

  function renderFolder(node: FileNode, path: string): ReactNode {
    const isOpen = open[path] ?? false;
    const kids = node.children ?? [];
    const sub = isOpen && kids.length > 0 && (
      <SidebarMenuSub>
        {kids.map((child) => renderEntry(child, `${path}/${child.name}`))}
      </SidebarMenuSub>
    );
    const inner = (
      <>
        {showIcons && (
          <ChevronRight
            className={cn(
              "size-4 text-muted-foreground transition-transform",
              isOpen && "rotate-90",
            )}
          />
        )}
        {showIcons && <Folder className="size-4 text-muted-foreground" />}
        <span className="min-w-0 flex-1 truncate text-left">{node.name}</span>
      </>
    );

    if (!selectable) {
      return (
        <SidebarMenuItem key={path}>
          <SidebarMenuButton
            className="h-8"
            aria-expanded={isOpen}
            onClick={() => toggle(path)}
          >
            {inner}
          </SidebarMenuButton>
          {sub}
        </SidebarMenuItem>
      );
    }

    const state = folderState(node, path);
    return (
      <SidebarMenuItem key={path}>
        <div className={rowClass(state !== false)}>
          <Checkbox
            checked={state}
            onCheckedChange={() => toggleFolder(node, path)}
            className="ml-2 shrink-0"
            aria-label={node.name}
          />
          <SidebarMenuButton
            className="h-8 flex-1"
            aria-expanded={isOpen}
            onClick={() => toggle(path)}
          >
            {inner}
          </SidebarMenuButton>
        </div>
        {sub}
      </SidebarMenuItem>
    );
  }

  function renderSubFile(node: FileNode, path: string): ReactNode {
    const Icon = fileIcon(node.kind);
    const inner = (
      <>
        {showIcons && <Icon className="size-4 text-muted-foreground" />}
        <span className="min-w-0 flex-1 truncate">{node.name}</span>
      </>
    );

    if (!selectable) {
      return (
        <SidebarMenuSubItem key={path}>
          <SidebarMenuSubButton
            isActive={selected === path}
            onClick={() => setSelected(path)}
          >
            {inner}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      );
    }

    const isChecked = checked[path] ?? false;
    return (
      <SidebarMenuSubItem key={path}>
        <div className={rowClass(isChecked)}>
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleLeaf(path)}
            className="ml-2 shrink-0"
            aria-label={node.name}
          />
          <SidebarMenuSubButton className="flex-1" onClick={() => toggleLeaf(path)}>
            {inner}
          </SidebarMenuSubButton>
        </div>
      </SidebarMenuSubItem>
    );
  }

  function renderEntry(node: FileNode, path: string): ReactNode {
    return node.kind === "folder"
      ? renderFolder(node, path)
      : renderSubFile(node, path);
  }

  function renderLeafTop(
    node: FileNode,
    path: string,
    leadingIcon: ReactNode,
    badge?: ReactNode,
  ): ReactNode {
    const inner = (
      <>
        {leadingIcon}
        <span className="min-w-0 flex-1 truncate text-left">{node.name}</span>
        {badge}
      </>
    );

    if (!selectable) {
      return (
        <SidebarMenuItem key={path}>
          <SidebarMenuButton
            className="h-8"
            isActive={selected === path}
            onClick={() => setSelected(path)}
          >
            {inner}
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    const isChecked = checked[path] ?? false;
    return (
      <SidebarMenuItem key={path}>
        <div className={rowClass(isChecked)}>
          <Checkbox
            checked={isChecked}
            onCheckedChange={() => toggleLeaf(path)}
            className="ml-2 shrink-0"
            aria-label={node.name}
          />
          <SidebarMenuButton
            className="h-8 flex-1"
            onClick={() => toggleLeaf(path)}
          >
            {inner}
          </SidebarMenuButton>
        </div>
      </SidebarMenuItem>
    );
  }

  function renderTop(node: FileNode): ReactNode {
    if (node.kind === "folder") return renderFolder(node, node.name);
    const Icon = fileIcon(node.kind);
    return renderLeafTop(
      node,
      node.name,
      showIcons ? <Icon className="size-4 text-muted-foreground" /> : null,
    );
  }

  function renderChange(node: FileNode): ReactNode {
    return renderLeafTop(
      node,
      `changes/${node.name}`,
      showIcons ? <File className="size-4 text-muted-foreground" /> : null,
      node.badge != null ? <StatusBadge>{node.badge}</StatusBadge> : undefined,
    );
  }

  // The toolkit-ui menu parts read sidebar state, so they need a provider.
  return (
    <SidebarProvider className="block min-h-0 w-auto">
      <div className="w-64 shrink-0 rounded-xl border border-border bg-muted p-2">
        <div className="flex flex-col gap-4">
          <SidebarGroup>
            <SidebarGroupLabel>Changes</SidebarGroupLabel>
            <SidebarMenu>{changes.map(renderChange)}</SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Files</SidebarGroupLabel>
            <SidebarMenu>{files.map(renderTop)}</SidebarMenu>
          </SidebarGroup>
        </div>
      </div>
    </SidebarProvider>
  );
}
