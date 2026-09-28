"use client";

import { Code, Eye } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

type Variant = "default" | "underline" | "secondary";

const PANELS = [
  { value: "overview", label: "Overview", body: "A high-level summary of the project." },
  { value: "analytics", label: "Analytics", body: "Usage trends and key metrics." },
  { value: "reports", label: "Reports", body: "Exportable reports and history." },
  { value: "settings", label: "Settings", body: "Project configuration and access." },
];

export function VariantTabs({ variant }: { variant: Variant }) {
  return (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList variant={variant} className={variant === "secondary" ? "w-full" : undefined}>
        {PANELS.map((p) => (
          <TabsTrigger key={p.value} variant={variant} value={p.value}>
            {p.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {PANELS.map((p) => (
        <TabsContent key={p.value} value={p.value}>
          <p className="text-sm text-muted-foreground">{p.body}</p>
        </TabsContent>
      ))}
    </Tabs>
  );
}

export function IconTabs() {
  return (
    <Tabs defaultValue="preview" className="w-full max-w-xs">
      <TabsList variant="secondary" className="w-full">
        <TabsTrigger variant="secondary" value="preview">
          <Eye />
          Preview
        </TabsTrigger>
        <TabsTrigger variant="secondary" value="code">
          <Code />
          Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="preview">
        <p className="text-sm text-muted-foreground">The rendered component.</p>
      </TabsContent>
      <TabsContent value="code">
        <p className="text-sm text-muted-foreground">The source snippet.</p>
      </TabsContent>
    </Tabs>
  );
}
