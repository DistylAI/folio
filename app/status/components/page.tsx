import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/shadcn/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import {
  getComponentStatuses,
  getDesignApprovers,
  getFeedbackSources,
  type ComponentStatus,
  type DesignState,
  type FeedbackVerdict,
  type PilotState,
  type ToolkitState,
} from "@/lib/component-status";

export const metadata: Metadata = {
  title: "Component status",
  description:
    "For each component: is the design approved in Folio, is it released in toolkit-ui, and did a pilot app use it?",
};

type BadgeColor = "default" | "success" | "warning" | "info";
type StateBadge = { label: string; color: BadgeColor };

const DESIGN_BADGE: Record<DesignState, StateBadge> = {
  "not-reviewed": { label: "Not reviewed", color: "default" },
  "changes-requested": { label: "Changes requested", color: "warning" },
  "in-review": { label: "In review", color: "info" },
  approved: { label: "Approved", color: "success" },
};

const TOOLKIT_BADGE: Record<ToolkitState, StateBadge> = {
  "not-started": { label: "Not started", color: "default" },
  "pr-open": { label: "PR open", color: "warning" },
  released: { label: "Released", color: "success" },
};

const PILOT_BADGE: Record<PilotState, StateBadge> = {
  "not-piloted": { label: "Not piloted", color: "default" },
  piloted: { label: "Piloted", color: "success" },
};

const FEEDBACK_LABEL: Record<FeedbackVerdict, string> = {
  good: "Good",
  changes: "Changes",
  skipped: "Skipped",
};

const GATES = [
  {
    title: "1. Design approved",
    body: "A design approver reviewed the component in Folio and approved it. The approval is a merged Folio PR with a changelog entry. The row names the approver, the date, and the PR.",
  },
  {
    title: "2. Released in toolkit-ui",
    body: "The approved Folio code is copied into @distylai/toolkit-ui and published. The row names the toolkit PR and the toolkit-ui version.",
  },
  {
    title: "3. Piloted",
    body: "Proposed, waiting for design sign-off: the component runs in the pilot workflow (streams) on vanilla-dev, design signs off in the app, and no visual change occurs outside the approved normalizations.",
  },
];

function StateCell({ badge, detail }: { badge: StateBadge; detail?: string }) {
  return (
    <div className="flex flex-col items-start gap-1">
      <Badge variant="secondary" color={badge.color} className="whitespace-nowrap">
        {badge.label}
      </Badge>
      {detail ? <span className="max-w-40 text-caption">{detail}</span> : null}
    </div>
  );
}

function joinDetail(...parts: (string | undefined)[]): string | undefined {
  const present = parts.filter(Boolean);
  return present.length ? present.join(" · ") : undefined;
}

function FeedbackCell({ row }: { row: ComponentStatus }) {
  const sources = getFeedbackSources();
  if (!row.feedback.length) return <span className="text-caption">None</span>;
  return (
    <ul className="space-y-1">
      {row.feedback.map((item) => (
        <li key={item.source} className="max-w-52 text-small text-foreground">
          <a
            href={sources[item.source]?.url}
            className="whitespace-nowrap underline underline-offset-2"
            target="_blank"
            rel="noreferrer"
          >
            {sources[item.source]?.label}: {FEEDBACK_LABEL[item.verdict]}
          </a>
          {item.note ? <p className="text-caption">{item.note}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function ApprovedByCell({ row }: { row: ComponentStatus }) {
  const approvals = row.design.approvals ?? [];
  return (
    <ul className="space-y-1">
      {getDesignApprovers().map((approver) => {
        const approval = approvals.find((item) => item.by === approver.github);
        return (
          <li key={approver.github} className="whitespace-nowrap text-caption">
            <span className="text-foreground">{approver.name}</span>: {approval ? approval.date : "Pending"}
          </li>
        );
      })}
    </ul>
  );
}

function SummaryCard({ label, count, total }: { label: string; count: number; total: number }) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-lead">
          {count} of {total}
        </CardTitle>
      </CardHeader>
    </Card>
  );
}

export default function ComponentStatusPage() {
  const rows = getComponentStatuses();
  const sources = Object.values(getFeedbackSources());
  const approved = rows.filter((row) => row.design.state === "approved").length;
  const released = rows.filter((row) => row.toolkit.state === "released").length;
  const piloted = rows.filter((row) => row.pilot.state === "piloted").length;

  return (
    <div>
      <p className="mb-2 text-caption">Status</p>
      <h1 className="text-lead text-foreground">Component status</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Each component passes three gates in order. Folio is where design
        happens, so a component moves to toolkit-ui only after design approves
        it here.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <SummaryCard label="Design approved" count={approved} total={rows.length} />
        <SummaryCard label="Released in toolkit-ui" count={released} total={rows.length} />
        <SummaryCard label="Piloted" count={piloted} total={rows.length} />
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {GATES.map((gate) => (
          <Card key={gate.title}>
            <CardHeader>
              <CardTitle className="text-base">{gate.title}</CardTitle>
              <CardDescription>{gate.body}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-small text-foreground">
        The feedback column shows earlier design reviews and proposals. It is
        input for the design gate, not an approval. Sources:{" "}
        {sources.map((source, index) => (
          <span key={source.url}>
            {index ? "; " : null}
            <a
              href={source.url}
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
            >
              {source.title}
            </a>
          </span>
        ))}
        . To change a row, edit <code>content/component-status.json</code> in a
        PR.
      </p>

      <div className="mt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Component</TableHead>
              <TableHead>Earlier feedback</TableHead>
              <TableHead>Design</TableHead>
              <TableHead>Approved by</TableHead>
              <TableHead>toolkit-ui</TableHead>
              <TableHead>Pilot</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.slug}>
                <TableCell>
                  <Link href={row.href} className="text-small font-medium text-foreground">
                    {row.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <FeedbackCell row={row} />
                </TableCell>
                <TableCell>
                  <StateCell
                    badge={DESIGN_BADGE[row.design.state]}
                    detail={joinDetail(row.design.pr, row.design.note)}
                  />
                </TableCell>
                <TableCell>
                  <ApprovedByCell row={row} />
                </TableCell>
                <TableCell>
                  <StateCell
                    badge={TOOLKIT_BADGE[row.toolkit.state]}
                    detail={joinDetail(row.toolkit.version, row.toolkit.pr, row.toolkit.note)}
                  />
                </TableCell>
                <TableCell>
                  <StateCell
                    badge={PILOT_BADGE[row.pilot.state]}
                    detail={joinDetail(row.pilot.app, row.pilot.date, row.pilot.note)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
