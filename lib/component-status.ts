import raw from "@/content/component-status.json";
import { nav, type NavItem } from "@/lib/nav";

export const DESIGN_STATES = ["not-reviewed", "changes-requested", "in-review", "approved"] as const;
export const TOOLKIT_STATES = ["not-started", "pr-open", "released"] as const;
export const PILOT_STATES = ["not-piloted", "piloted"] as const;
export const FEEDBACK_VERDICTS = ["good", "changes", "skipped"] as const;

export type DesignState = (typeof DESIGN_STATES)[number];
export type ToolkitState = (typeof TOOLKIT_STATES)[number];
export type PilotState = (typeof PILOT_STATES)[number];
export type FeedbackVerdict = (typeof FEEDBACK_VERDICTS)[number];

/** One approval. `pr` is the Folio PR it was given on; `source` is a feedback document id. One of the two is required. */
export type Approval = { by: string; date: string; pr?: string; source?: string };
export type DesignApprover = { github: string; name: string };
export type DesignGate = {
  state: DesignState;
  approvals?: Approval[];
  pr?: string;
  note?: string;
};
export type ToolkitGate = {
  state: ToolkitState;
  pr?: string;
  version?: string;
  note?: string;
};
export type PilotGate = {
  state: PilotState;
  app?: string;
  date?: string;
  note?: string;
};
export type Feedback = { source: string; verdict: FeedbackVerdict; note?: string };
export type FeedbackSource = { label: string; title: string; url: string };

export type ComponentStatus = {
  slug: string;
  name: string;
  href: string;
  design: DesignGate;
  toolkit: ToolkitGate;
  pilot: PilotGate;
  feedback: Feedback[];
};

type RawRow = {
  slug: string;
  design: DesignGate;
  toolkit: ToolkitGate;
  pilot: PilotGate;
  feedback?: Feedback[];
};
type RawFile = {
  designApprovers: DesignApprover[];
  feedbackSources: Record<string, FeedbackSource>;
  components: RawRow[];
};

const COMPONENT_PREFIX = "/components/";

/** The people who can approve a design. One approval is enough for `approved`. */
export function getDesignApprovers(): DesignApprover[] {
  return (raw as RawFile).designApprovers;
}

/** The feedback documents that component rows cite, keyed by source id. */
export function getFeedbackSources(): Record<string, FeedbackSource> {
  return (raw as RawFile).feedbackSources;
}

/**
 * Every component page in the site nav with its three gates: design approval
 * in Folio, release in toolkit-ui, and a pilot in a real app. Throws when
 * `content/component-status.json` and the nav disagree, or when a gate is
 * missing the evidence its state needs, so a bad edit fails the build.
 */
export function getComponentStatuses(): ComponentStatus[] {
  const file = raw as RawFile;
  const pages = componentPages();
  checkRowsMatchPages(file.components, pages);
  return file.components.map((row) => {
    checkRow(row, file);
    const page = pages.get(row.slug)!;
    return { ...row, name: page.label, href: page.href!, feedback: row.feedback ?? [] };
  });
}

function componentPages(): Map<string, NavItem> {
  const pages = new Map<string, NavItem>();
  for (const item of nav.flatMap((group) => group.items).flatMap(withChildren)) {
    if (item.href?.startsWith(COMPONENT_PREFIX)) {
      pages.set(item.href.slice(COMPONENT_PREFIX.length), item);
    }
  }
  return pages;
}

function withChildren(item: NavItem): NavItem[] {
  return [item, ...(item.children ?? []).flatMap(withChildren)];
}

function checkRowsMatchPages(rows: RawRow[], pages: Map<string, NavItem>): void {
  const slugs = new Set(rows.map((row) => row.slug));
  const missing = [...pages.keys()].filter((slug) => !slugs.has(slug));
  const unknown = [...slugs].filter((slug) => !pages.has(slug));
  if (slugs.size !== rows.length) fail("a slug appears more than one time");
  if (missing.length) fail(`no row for component pages: ${missing.join(", ")}`);
  if (unknown.length) fail(`rows with no component page: ${unknown.join(", ")}`);
}

function checkRow(row: RawRow, file: RawFile): void {
  const where = `"${row.slug}"`;
  checkState(where, "design", row.design.state, DESIGN_STATES);
  checkState(where, "toolkit", row.toolkit.state, TOOLKIT_STATES);
  checkState(where, "pilot", row.pilot.state, PILOT_STATES);
  checkApprovals(where, row.design, file);
  if (row.toolkit.state === "pr-open") requireFields(where, "toolkit", row.toolkit, ["pr"]);
  if (row.toolkit.state === "released") {
    requireFields(where, "toolkit", row.toolkit, ["pr", "version"]);
  }
  if (row.pilot.state === "piloted") requireFields(where, "pilot", row.pilot, ["app", "date"]);
  for (const item of row.feedback ?? []) {
    if (!file.feedbackSources[item.source]) fail(`${where}: unknown feedback source "${item.source}"`);
    checkState(where, "feedback", item.verdict, FEEDBACK_VERDICTS);
  }
}

function checkApprovals(where: string, design: DesignGate, file: RawFile): void {
  const approvers = file.designApprovers.map((approver) => approver.github);
  const approvals = design.approvals ?? [];
  if (design.state === "not-reviewed" && approvals.length) {
    fail(`${where}: a not-reviewed design cannot have approvals`);
  }
  for (const approval of approvals) {
    if (!approvers.includes(approval.by)) fail(`${where}: "${approval.by}" is not a design approver`);
    if (!approval.date) fail(`${where}: the approval by "${approval.by}" needs a date`);
    if (!approval.pr && !approval.source) fail(`${where}: the approval by "${approval.by}" needs a pr or a source`);
    if (approval.source && !file.feedbackSources[approval.source]) {
      fail(`${where}: unknown approval source "${approval.source}"`);
    }
  }
  if (design.state !== "approved") return;
  if (!approvals.length) fail(`${where}: approved design needs an approval`);
}

function checkState(where: string, gate: string, value: string, allowed: readonly string[]): void {
  if (!allowed.includes(value)) {
    fail(`${where}: ${gate} state "${value}" is not one of ${allowed.join(", ")}`);
  }
}

function requireFields<T extends object>(where: string, gate: string, value: T, keys: (keyof T)[]): void {
  const absent = keys.filter((key) => !value[key]);
  if (absent.length) fail(`${where}: ${gate} gate needs ${absent.join(", ")}`);
}

function fail(message: string): never {
  throw new Error(`content/component-status.json: ${message}`);
}
