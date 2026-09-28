import type { Metadata } from "next";
import { AuditSections, type AuditSection } from "@/components/AuditSections";
import { loadContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Codebase Audit",
  description:
    "Folio v1.2 design system audit across fe-distillery, distillery, and distillery-platform.",
};

// Every headline number is a critical finding -- all red.
const headline = [
  { stat: "344", label: "Hardcoded hex in fe-distillery" },
  { stat: "2,061", label: "Raw Tailwind color utilities" },
  { stat: "0", label: "Folio tokens defined" },
  { stat: "26", label: "Rogue dark: classes" },
];

// Split the audit Markdown into its numbered top-level sections, and pull the
// "Owner / Scope / Method" header lines out into a compact meta strip.
function parseAudit(md: string): { meta: string[]; sections: AuditSection[] } {
  const chunks = md.split(/\n(?=## )/g);
  const meta: string[] = [];
  const sections: AuditSection[] = [];

  for (const chunk of chunks) {
    const m = chunk.match(/^## (.+?)\n([\s\S]*)$/);
    if (!m?.[1] || m[2] === undefined) continue; // the leading "# Title" block -- skip
    const title = m[1].trim();
    const body = m[2].replace(/\n*---\s*$/g, "").trim();

    if (/^\d+\./.test(title)) {
      sections.push({ title, body });
    } else {
      // non-numbered header section (the "Distyl AI · June 2026" meta block)
      body
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l && l !== "---")
        .forEach((l) => meta.push(l.replace(/`/g, "")));
    }
  }

  // Strip the trailing "*Audit run …*" footnote off the last section; the page
  // renders its own footer for it.
  const last = sections[sections.length - 1];
  if (last) {
    last.body = last.body.replace(/\n*---\s*\n*\*Audit run[\s\S]*$/i, "").trim();
  }

  return { meta, sections };
}

export default async function AuditPage() {
  const audit = await loadContent("design-system-audit.md");
  const { meta, sections } = parseAudit(audit);

  return (
    <div>
      <p className="mb-2 text-caption">
        Status
      </p>
      <h1 className="text-lead text-foreground">
        Codebase Audit
      </h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Where the three Distyl repos stand against Folio v1.2 today. Run as a
        three-subagent parallel sweep against the canonical token set and
        hard-rule checklist.
      </p>

      {/* Meta strip */}
      {meta.length > 0 && (
        <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 rounded-xl border border-border bg-muted p-4 text-sm sm:grid-cols-[auto_1fr]">
          {meta.map((line) => {
            const idx = line.indexOf(":");
            const label = idx > -1 ? line.slice(0, idx) : line;
            const value = idx > -1 ? line.slice(idx + 1).trim() : "";
            return (
              <div key={line} className="contents">
                <dt className="font-bold text-muted-foreground">{label}</dt>
                <dd className="text-foreground">{value}</dd>
              </div>
            );
          })}
        </dl>
      )}

      {/* Headline metrics */}
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {headline.map((h) => (
          <div
            key={h.label}
            className="rounded-xl border border-border bg-muted p-4"
          >
            <div className="font-mono text-2xl font-bold text-destructive">
              {h.stat}
            </div>
            <div className="mt-1 text-caption leading-4">
              {h.label}
            </div>
          </div>
        ))}
      </div>

      {/* BLUF -- the stop */}
      <div className="mt-6 rounded-xl border border-border bg-primary-subtle p-5">
        <p className="text-body">
          <strong className="font-bold">BLUF:</strong> the codebase is not
          yet ready to receive Folio v1.2 values. The brand purple{" "}
          <code className="font-mono text-foreground">#5D4EE7</code> is already
          present, so a clean rename plus a dark-mode reshape preserves brand
          exactly -- but the rename is full-stack.
        </p>
      </div>

      {/* Detailed findings -- collapsed by default */}
      <h3 className="mt-12 mb-4 text-lead text-foreground">
        Detailed findings
      </h3>
      <AuditSections sections={sections} />

      <footer className="mt-12 border-t border-border pt-6 text-small">
        Audit run 2026-06-04 · three-subagent parallel sweep · raw JSON in{" "}
        <code className="font-mono text-foreground">audit-output/</code>.
      </footer>
    </div>
  );
}
