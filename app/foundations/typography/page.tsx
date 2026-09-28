import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography",
  description:
    "Geist for all UI and body copy. Geist Mono for code and technical values only -- the Folio v1.2 type scale and weights.",
};

// The 8 canonical Folio named text styles, ordered strictly by px descending
// (by size, not perceived prominence -- text-lead is heavier than text-large but
// sorts below it). Each row renders live via its own text-* class, so size /
// weight / color are the real token, never an inline override.
const scale = [
  { token: "text-large", px: 20, weight: "Regular" },
  { token: "text-lead", px: 18, weight: "Semibold" },
  { token: "text-title", px: 16, weight: "Medium" },
  { token: "text-body", px: 16, weight: "Regular" },
  { token: "text-small", px: 14, weight: "Medium" },
  { token: "text-description", px: 14, weight: "Regular" },
  { token: "text-caption", px: 12, weight: "Regular" },
  { token: "text-label", px: 12, weight: "Medium" },
];

const weights = [
  { weight: 400, label: "Regular" },
  { weight: 500, label: "Medium" },
  { weight: 600, label: "Semibold" },
  { weight: 700, label: "Bold" },
];

export default function TypographyPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Foundations</p>
      <h1 className="text-lead text-foreground">Typography</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        <strong className="font-bold text-foreground">Geist</strong> for all UI
        and body copy.{" "}
        <strong className="font-bold text-foreground">Geist Mono</strong> for
        code and technical values only.
      </p>

      {/* On-this-page -- desktop uses the sidebar subnav, so this is mobile-only */}
      <nav className="mt-6 flex flex-wrap gap-2 md:hidden">
        {[
          { id: "scale", title: "Type scale" },
          { id: "weights", title: "Weights" },
          { id: "context", title: "In context" },
          { id: "mono", title: "Monospace" },
        ].map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {s.title}
          </a>
        ))}
      </nav>

      {/* Type scale */}
      <section id="scale" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Type scale
        </h3>
        <p className="mb-6 text-small">
          Eight named styles, Geist throughout, nothing above 20px. Each row
          renders live via its own <code className="font-mono">text-*</code>{" "}
          class -- size, weight, and color are the real token.
        </p>

        <div className="rounded-xl border border-border bg-muted">
          {scale.map((t) => (
            <div
              key={t.token}
              className="flex items-baseline justify-between gap-4 border-b border-border-subtle px-6 py-4 last:border-0"
            >
              <span className={`min-w-0 truncate ${t.token}`}>
                Good decisions, made reusable.
              </span>
              <span className="shrink-0 font-mono text-caption">
                {t.token} · {t.px}px · {t.weight}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Weights */}
      <section id="weights" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Weights
        </h3>
        <p className="mb-6 text-small">
          Geist is variable; these four weights cover the system.
        </p>

        <div className="space-y-3">
          {weights.map((w) => (
            <div
              key={w.weight}
              className="flex items-baseline justify-between gap-4 rounded-xl border border-border p-4"
            >
              <span
                className="min-w-0 text-lg text-foreground"
                style={{
                  fontWeight: w.weight,
                  fontVariationSettings: `"wght" ${w.weight}`,
                }}
              >
                The quick brown fox jumps over the lazy dog.
              </span>
              <span className="shrink-0 font-mono text-caption">
                {w.weight} · {w.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* In context */}
      <section id="context" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          In context
        </h3>
        <p className="mb-6 text-small">The styles working together as a document.</p>

        <div className="rounded-xl border border-border bg-muted p-8">
          <article className="mx-auto max-w-2xl">
            <p className="text-lead text-foreground">Building Folio</p>
            <p className="text-body mt-4">
              Folio is Distyl AI&apos;s design system -- the shared foundation
              every product implementation sits on. It exists so engineers ship
              faster, interfaces stay consistent, and the cost of a rebrand is one
              token file, not a codebase.
            </p>

            <h2 className="text-lead mt-10 text-foreground">Why a system</h2>
            <p className="text-body mt-4">
              Ad hoc UI compounds. Every hardcoded hex value, every one-off
              spacing decision, every parallel component is debt that slows the
              next build and the one after that.
            </p>
            <blockquote className="text-blockquote mt-6 border-l-2 border-border pl-4 text-muted-foreground">
              A design system is not a deliverable. It is infrastructure. It earns
              its place the same way a database does -- by making everything built
              on top of it faster and more reliable.
            </blockquote>

            <h2 className="text-lead mt-10 text-foreground">Three layers</h2>
            <ol className="text-list mt-4 list-decimal pl-6 text-foreground">
              <li>Primitives -- raw values, never used directly</li>
              <li>Semantic -- purpose-named aliases, where dark mode lives</li>
              <li>
                Component -- scoped tokens referencing semantic, never primitives
              </li>
            </ol>

            <h2 className="text-lead mt-10 text-foreground">
              Token swap, skin swap
            </h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Surface
                    </th>
                    <th className="py-2 pr-4 font-semibold text-foreground">
                      Token layer
                    </th>
                    <th className="py-2 font-semibold text-foreground">
                      Result
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">Distyl platform</td>
                    <td className="py-2 pr-4">Default semantic</td>
                    <td className="py-2">Purple, dark mode</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 pr-4">Hoover impl</td>
                    <td className="py-2 pr-4">Remapped semantic</td>
                    <td className="py-2">Custom brand</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Toolkit app</td>
                    <td className="py-2 pr-4">Remapped semantic</td>
                    <td className="py-2">Neutral theme</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-body mt-4">
              Use <code className="font-mono">font-mono</code> for inline
              technical values like{" "}
              <code className="text-inline-code rounded-sm bg-secondary px-1.5 py-0.5 text-foreground">
                --color-background-primary
              </code>{" "}
              and{" "}
              <code className="text-inline-code rounded-sm bg-secondary px-1.5 py-0.5 text-foreground">
                var(--color-chart-1)
              </code>
              .
            </p>

            <h2 className="text-lead mt-10 text-foreground">The moral</h2>
            <blockquote className="text-blockquote mt-4 border-l-2 border-border pl-4 text-muted-foreground">
              Never underestimate the cost of building the same thing twice.
            </blockquote>
          </article>
        </div>
      </section>

      {/* Monospace */}
      <section id="mono" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Monospace
        </h3>
        <p className="mb-6 text-small">
          <strong className="font-bold text-foreground">Geist Mono</strong> for
          code and technical values only -- never for prose.
        </p>

        <div className="rounded-xl border border-border bg-inverse p-5">
          <pre className="overflow-x-auto">
            <code className="font-mono text-sm leading-6 text-inverse">
              {`const system = "Folio";
const tokens = { primary: "var(--color-background-primary)" };
const theme = (key: string) => \`var(--color-\${key})\`;
export default { system, tokens, theme };`}
            </code>
          </pre>
        </div>

        <p className="mt-4 text-small">
          Geist is self-hosted via the{" "}
          <code className="font-mono text-foreground">geist</code> package
          (Vercel&apos;s official build), not the Google font.{" "}
          <a
            href="https://vercel.com/font"
            target="_blank"
            rel="noreferrer"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Download Geist →
          </a>
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-description">
        Type styles are the Folio v1.2 named text styles in{" "}
        <code className="font-mono text-foreground">globals.css</code> -- set the
        type with the <code className="font-mono text-foreground">text-*</code>{" "}
        class, the color with a token. The full token scale lives under{" "}
        <a
          href="/tokens#typescale"
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          Tokens → Type Scale
        </a>
        .
      </footer>
    </div>
  );
}
