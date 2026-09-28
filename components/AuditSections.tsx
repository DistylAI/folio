"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Markdown, slug } from "./Markdown";

export type AuditSection = { title: string; body: string };

export function AuditSections({ sections }: { sections: AuditSection[] }) {
  // First section open by default; the rest collapsed.
  const [open, setOpen] = useState<boolean[]>(() =>
    sections.map((_, i) => i === 0),
  );

  // Open (and scroll to) a section when its anchor is hit -- e.g. from the
  // sidebar subnav -- so jumping never lands on a collapsed panel.
  useEffect(() => {
    function openFromHash() {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const idx = sections.findIndex((s) => slug(s.title) === id);
      if (idx < 0) return;
      setOpen((prev) => prev.map((v, i) => (i === idx ? true : v)));
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }),
      );
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [sections]);

  const allOpen = open.every(Boolean);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-small">
          {sections.length} sections · detailed findings
        </p>
        <button
          type="button"
          onClick={() => setOpen(sections.map(() => !allOpen))}
          className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
        >
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="divide-y divide-border overflow-hidden rounded-xl border border-border">
        {sections.map((s, i) => {
          const isOpen = open[i];
          const id = slug(s.title);
          return (
            <section key={id} id={id} className="scroll-mt-8">
              <h2 className="m-0">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpen((prev) => prev.map((v, j) => (j === i ? !v : v)))
                  }
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted"
                >
                  <span className="text-lead text-foreground">
                    {s.title}
                  </span>
                  <ChevronDown
                    aria-hidden
                    className={[
                      "size-4 shrink-0 text-muted-foreground transition-transform",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                </button>
              </h2>
              {isOpen && (
                <div className="border-t border-border-subtle px-5 pb-6 pt-1">
                  <Markdown content={s.body} />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
