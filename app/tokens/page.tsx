import type { Metadata } from "next";
import {
  colorGroups,
  colorParentTitle,
  radiusTokens,
  spacingTokens,
  typeScale,
  fontWeights,
} from "@/lib/tokens";

export const metadata: Metadata = {
  title: "Tokens",
  description:
    "Folio v1.2 tokens -- backgrounds, text, borders, feedback, radius, spacing, and type scale.",
};

export default function TokensPage() {
  return (
    <div>
      <p className="mb-2 text-caption">
        Foundations
      </p>
      <h1 className="text-lead text-foreground">
        Tokens
      </h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        The canonical Folio v1.2 token set. Swatches below render from the
        live CSS variables -- toggle the theme and they remap automatically.
        Never hardcode a hex value; always reference the token utility.
      </p>

      {/* On-this-page -- desktop uses the sidebar subnav, so this is mobile-only */}
      <nav className="mt-6 flex flex-wrap gap-2 md:hidden">
        {[
          { id: "color", title: "Color" },
          { id: "radius", title: "Radius" },
          { id: "spacing", title: "Spacing" },
          { id: "typescale", title: "Type Scale" }].map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="rounded-full border border-border px-3 py-1 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
          >
            {s.title}
          </a>
        ))}
      </nav>

      {/* Color -- parent heading over backgrounds, text, borders, feedback, chart */}
      <section id="color" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          {colorParentTitle}
        </h3>
        <p className="mb-6 text-small">
          Every color token, grouped by role -- backgrounds, text, borders,
          feedback, and chart series.
        </p>
      </section>

      {/* Color sub-groups */}
      {colorGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-8">
          <h4 className="mt-10 mb-1 text-title text-foreground">{group.title}</h4>
          <p className="mb-6 text-small">{group.description}</p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {group.tokens.map((t) => (
              <div
                key={t.cssVar}
                className="flex gap-4 rounded-xl border border-border bg-muted p-4"
              >
                <div
                  className="size-14 shrink-0 rounded-lg border border-border"
                  style={{ background: `var(${t.cssVar})` }}
                  aria-hidden
                />
                <div className="min-w-0">
                  <div className="truncate font-mono text-caption font-semibold text-foreground">
                    {t.name}
                  </div>
                  <div className="mt-0.5 space-y-0.5">
                    {(t.utilities ?? [t.utility]).map((u) => (
                      <div
                        key={u}
                        className="truncate font-mono text-caption"
                      >
                        {u}
                      </div>
                    ))}
                  </div>
                  <p className="mt-1 text-caption leading-5">
                    {t.usage}
                  </p>
                  <div className="mt-2 flex gap-3 font-mono text-caption">
                    <span>
                      <span className="text-disabled">light</span>{" "}
                      {t.light}
                    </span>
                    <span>
                      <span className="text-disabled">dark</span> {t.dark}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Radius */}
      <section id="radius" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Radius
        </h3>
        <p className="mb-6 text-small">
          Six steps. <code className="font-mono text-foreground">rounded-lg</code>{" "}
          (8px) is the default.
        </p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {radiusTokens.map((r) => (
            <div
              key={r.name}
              className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-5"
            >
              <div
                className="size-16 border-2 border-border bg-secondary"
                style={{ borderRadius: r.value }}
                aria-hidden
              />
              <div className="text-center">
                <div className="font-mono text-sm font-bold text-foreground">
                  {r.utility}
                </div>
                <div className="font-mono text-caption">
                  {r.value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing */}
      <section id="spacing" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Spacing
        </h3>
        <p className="mb-6 text-small">
          4px base unit. Never use arbitrary px values in inline styles.
        </p>
        <div className="space-y-2 rounded-xl border border-border bg-muted p-5">
          {spacingTokens.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <div className="w-16 font-mono text-sm font-bold text-foreground">
                {s.utility}
              </div>
              <div className="w-12 font-mono text-caption">
                {s.px}px
              </div>
              <div
                className="h-4 rounded-sm bg-primary"
                style={{ width: `${s.px}px` }}
                aria-hidden
              />
            </div>
          ))}
        </div>
      </section>

      {/* Type Scale */}
      <section id="typescale" className="scroll-mt-8">
        <h3 className="mt-14 mb-1 border-b border-border pb-2 text-lead text-foreground">
          Type Scale
        </h3>
        <p className="mb-6 text-small">
          <strong className="font-bold text-foreground">Geist</strong> for all
          UI and body copy.{" "}
          <strong className="font-bold text-foreground">Geist Mono</strong>{" "}
          for code and technical values only.
        </p>

        <div className="space-y-4 rounded-xl border border-border bg-muted p-6">
          {typeScale.map((t) => (
            <div
              key={t.token}
              className="flex items-baseline justify-between gap-4 border-b border-border-subtle pb-3 last:border-0 last:pb-0"
            >
              <span
                className="truncate text-foreground"
                style={{
                  fontSize: `${t.px}px`,
                  fontWeight: t.weight,
                  fontVariationSettings: `"wght" ${t.weight}`,
                }}
              >
                {t.sample}
              </span>
              <span className="shrink-0 font-mono text-caption">
                {t.token} · {t.px}px · {t.weightLabel}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {fontWeights.map((w) => (
            <div
              key={w.weight}
              className="rounded-xl border border-border p-4 text-center"
            >
              <div
                className="text-2xl text-foreground"
                style={{
                  fontWeight: w.weight,
                  fontVariationSettings: `"wght" ${w.weight}`,
                }}
              >
                Aa
              </div>
              <div className="mt-1 font-mono text-caption">
                {w.weight} · {w.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-border bg-inverse p-5">
          <code className="font-mono text-sm text-inverse">
            font-family: Geist Mono -- 0123456789 {`{ }`} =&gt; const x = 42;
          </code>
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
        Values mirror{" "}
        <code className="font-mono text-foreground">folio-tokens.css</code>
        . Adding a token is a MINOR bump; changing a value is a PATCH or MINOR.
      </footer>
    </div>
  );
}
