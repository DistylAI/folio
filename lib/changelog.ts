// Reads generated changelog versions (v1.4+) from disk for the /status/changelog
// page. Legacy versions (v1.0–v1.3) are NOT here — they stay hardcoded on the page.
//
// A generated version = one file in changelog/versions/vX.X.X.md (holding the manual
// `blurb` narrative + date) rolled up with every entry in changelog/entries/ whose
// `version:` field matches it. Bullets are pulled from those entries' `summary:`.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const ENTRIES_DIR = join(ROOT, "changelog/entries");
const VERSIONS_DIR = join(ROOT, "changelog/versions");

function unquote(s: string): string {
  return s.replace(/^"([\s\S]*)"$/, "$1");
}

// Read the `key: value` pairs from a file's leading `---` frontmatter block.
function frontmatter(text: string): Record<string, string> {
  const lines = text.split("\n");
  const out: Record<string, string> = {};
  if (lines[0]?.trim() !== "---") return out;
  for (const line of lines.slice(1)) {
    if (line.trim() === "---") break;
    const m = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    const key = m?.[1];
    if (key) out[key] = unquote((m[2] ?? "").trim());
  }
  return out;
}

export type GeneratedVersion = {
  version: string; // "v1.4.0"
  date: string; // "2026-07-24"
  blurb: string; // manual narrative; "" until an author fills it in
  bullets: string[]; // rolled-up entry summaries
  status: "current" | "stable"; // computed from sort position, never hardcoded
  source: "generated";
};

// vMAJOR.MINOR.PATCH -> sortable number (newest = largest).
function versionKey(tag: string): number {
  const [maj, min, patch] = tag.replace(/^v/, "").split(".").map(Number);
  return (maj || 0) * 1_000_000 + (min || 0) * 1_000 + (patch || 0);
}

export function getGeneratedVersions(): GeneratedVersion[] {
  if (!existsSync(VERSIONS_DIR)) return [];

  // Group entry summaries by the version they were cut into. Entry filenames are
  // YYYY-MM-DD-slug, so iterating them sorted yields oldest-to-newest date order —
  // which is the order bullets should appear in within a version.
  const summariesByVersion = new Map<string, string[]>();
  if (existsSync(ENTRIES_DIR)) {
    for (const f of readdirSync(ENTRIES_DIR)
      .filter((n) => n.endsWith(".md"))
      .sort()) {
      const fm = frontmatter(readFileSync(join(ENTRIES_DIR, f), "utf-8"));
      if (!fm.version) continue;
      const arr = summariesByVersion.get(fm.version) ?? [];
      if (fm.summary) arr.push(fm.summary);
      summariesByVersion.set(fm.version, arr);
    }
  }

  const versions = readdirSync(VERSIONS_DIR)
    .filter((f) => /^v\d+\.\d+\.\d+\.md$/.test(f))
    .map((f) => {
      const fm = frontmatter(readFileSync(join(VERSIONS_DIR, f), "utf-8"));
      const version = fm.version || `v${f.slice(1, -3)}`;
      return {
        version,
        date: fm.date ?? "",
        blurb: fm.blurb ?? "",
        bullets: [...(summariesByVersion.get(version) ?? [])], // entry-date order
      };
    })
    .sort((a, b) => versionKey(b.version) - versionKey(a.version));

  // Newest generated version = Current; everything older generated = Stable.
  return versions.map((v, i) => ({
    ...v,
    status: i === 0 ? "current" : "stable",
    source: "generated" as const,
  }));
}
