import type { Metadata } from "next";
import { Markdown } from "@/components/Markdown";
import { loadContent } from "@/lib/content";

const semanticsDoCode = `className="bg-muted text-muted-foreground"
<Tag>Engineering</Tag>
className="p-3"
className="bg-background text-foreground"`;

export const metadata: Metadata = {
  title: "Guidelines",
  description:
    "Folio component semantics, anti-patterns, the legacy migration map, and the dark mode contract.",
};

const componentRules = [
  { c: "Button", interactive: "Yes", action: "Yes", use: "Submit, save, open dialog, trigger mutation" },
  { c: "Tag", interactive: "No", action: "No", use: "Non-interactive label, category, keyword" },
  { c: "Badge", interactive: "No", action: "No", use: "Status indicator, count, state" },
  { c: "Chip", interactive: "Yes", action: "No", use: "Selectable filter or toggle option" },
  { c: "Link", interactive: "Yes", action: "Navigates", use: "Navigation to a route or URL" },
];

export default async function GuidelinesPage() {
  const spec = await loadContent("folio-spec.md");

  return (
    <div>
      <p className="mb-2 text-caption">
        Foundations
      </p>
      <h1 className="text-lead text-foreground">
        Guidelines
      </h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        The rules every Distyl frontend follows. Use the semantic token for
        intent, the correct component for the job, and let the token layer handle
        dark mode.
      </p>

      {/* Component quick-reference */}
      <h3
        id="component-semantics"
        className="mt-12 mb-4 scroll-mt-8 border-b border-border pb-2 text-title text-foreground"
      >
        Component semantics
      </h3>
      <p className="mb-5 text-small">
        Every interactive element must be the semantically correct component.
        Using the wrong element is a bug, not a style choice.
      </p>
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-secondary">
            <tr>
              {["Component", "Interactive", "Triggers action", "Use for"].map(
                (h) => (
                  <th
                    key={h}
                    className="border-b border-border px-4 py-2.5 text-left text-caption font-semibold text-foreground"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {componentRules.map((r) => (
              <tr key={r.c}>
                <td className="border-b border-border-subtle px-4 py-2.5 text-xs">
                  <span className="font-mono text-caption font-semibold text-foreground">
                    {r.c}
                  </span>
                </td>
                <td className="border-b border-border-subtle px-4 py-2.5 text-caption text-foreground">
                  {r.interactive}
                </td>
                <td className="border-b border-border-subtle px-4 py-2.5 text-caption text-foreground">
                  {r.action}
                </td>
                <td className="border-b border-border-subtle px-4 py-2.5 text-caption">
                  {r.use}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Don't / Do */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
          <div className="mb-2 text-sm font-bold text-destructive">Don&apos;t</div>
          <p className="text-small text-foreground">
            Don&apos;t bypass the system with hardcoded colors, raw Tailwind
            palette utilities, off-scale spacing, dark-mode classes, or a button
            used as a label.
          </p>
        </div>
        <div className="rounded-xl border border-success bg-success-subtle p-5">
          <div className="mb-2 text-sm font-bold text-success">Do</div>
          <pre className="overflow-x-auto font-mono text-caption leading-6 text-foreground">
            {semanticsDoCode}
          </pre>
        </div>
      </div>

      {/* Full spec */}
      <h3
        id="full-specification"
        className="mt-14 mb-4 scroll-mt-8 border-b border-border pb-2 text-title text-foreground"
      >
        Full specification
      </h3>
      <Markdown content={spec} />
    </div>
  );
}
