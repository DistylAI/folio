import type { Metadata } from "next";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "The work required to move fe-distillery from the current legacy token system to full Folio v1.3 compliance.",
};

type Status = "blocker" | "queue" | "planned";

type Epic = {
  number: number;
  title: string;
  status: Status;
  summary: string;
  tickets: string[];
};

const STATUS_BADGE: Record<
  Status,
  { label: string; color?: "warning"; variant: "secondary" }
> = {
  blocker: { label: "Rebrand blocker", color: "warning", variant: "secondary" },
  queue: { label: "In queue", variant: "secondary" },
  planned: { label: "Planned", variant: "secondary" },
};

const epics: Epic[] = [
  {
    number: 1,
    title: "Dark Mode Foundation",
    status: "blocker",
    summary: "Blocks everything. Ship first.",
    tickets: [
      'Switch tailwind.config.js to [data-theme="dark"] strategy',
      "Replace all .dark selectors in base.css and impls/demos/App.css",
      "Update theme provider to set dataset.theme instead of toggling .dark class",
      "Remove 26 raw dark: Tailwind classes from impl code",
      "Fix alert.tsx and tabs.tsx primitives first. They propagate",
    ],
  },
  {
    number: 2,
    title: "Token Introduction",
    status: "blocker",
    summary: "The rename that makes the rebrand possible.",
    tickets: [
      "Define all 32 Folio v1.2 tokens in components/ui/base.css",
      "Keep legacy --primary etc. as aliases during migration window",
      "Update tailwind.config.js to expose Folio tokens as semantic utilities",
      "Delete duplicate token block in impls/demos/App.css",
    ],
  },
  {
    number: 3,
    title: "Primitive Rewrites",
    status: "queue",
    summary: "Fix the components poisoning their consumers.",
    tickets: [
      "Rewrite badge.tsx -- replace 30+ raw Tailwind utilities with semantic tokens",
      "Rewrite toast.tsx -- remove text-red-300/50 and similar",
      "Introduce canonical Tag primitive",
      "Move 4 direct @radix-ui imports onto the shared ui/ wrappers",
    ],
  },
  {
    number: 4,
    title: "Typography",
    status: "queue",
    summary: "Silent brand issue today.",
    tickets: [
      "Set Geist as :root body font in base.css (currently Inter)",
      "Audit and update six MUI theme files to reflect Geist",
      "Resolve AlliancePlatt-Bold references in demo files",
    ],
  },
  {
    number: 5,
    title: "Token Adoption",
    status: "planned",
    summary: "Not a rebrand blocker but defines long-term health.",
    tickets: [
      "Replace 2,061 raw Tailwind palette utilities with semantic tokens",
      "Replace 344 hardcoded hex literals with token references",
      "Standardize spacing violations in ReactMarkdownOverrides files",
    ],
  },
  {
    number: 6,
    title: "MUI Decision",
    status: "planned",
    summary: "Multi-quarter. Needs an architectural call.",
    tickets: [
      "Inventory which user-visible surfaces still render through MUI",
      "Decision: retire MUI per impl or extend Folio tokens into MUI theme",
      "Execute per impl in order of customer visibility",
    ],
  },
];

export default function RoadmapPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Status</p>
      <h1 className="text-lead text-foreground">Roadmap</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        The work required to move fe-distillery from the current legacy token
        system to full Folio v1.3 compliance.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Epics 1 and 2 are rebrand blockers. Epics 7 through 10 are Folio
          v1.3 additions. A brand color swap becomes a single CSS file change
          once Epics 1 and 2 land.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {epics.map((epic) => {
          const badge = STATUS_BADGE[epic.status];
          return (
            <Card key={epic.number}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-caption font-medium uppercase tracking-wide">
                      Epic {epic.number}
                    </span>
                    <CardTitle className="text-lg">{epic.title}</CardTitle>
                  </div>
                  <Badge color={badge.color} variant={badge.variant}>
                    {badge.label}
                  </Badge>
                </div>
                <CardDescription>{epic.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-foreground marker:text-muted-foreground">
                  {epic.tickets.map((ticket) => (
                    <li key={ticket}>{ticket}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10">
        <Button asChild variant="outline">
          <a href="#">View in Linear</a>
        </Button>
      </div>
    </div>
  );
}
