"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Menu, Search, X } from "lucide-react";
import { nav } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Close the drawer whenever the route changes (i.e. a link was followed).
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const q = query.trim().toLowerCase();
  const filteredNav = useMemo(() => {
    if (!q) return nav;
    return nav
      .map((group) => ({
        ...group,
        items: group.items.flatMap((item) => {
          if (item.children) {
            const parentMatch = item.label.toLowerCase().includes(q);
            const kids = parentMatch
              ? item.children
              : item.children.filter((c) => c.label.toLowerCase().includes(q));
            return kids.map((c) => ({ href: c.href, label: c.label }));
          }
          return item.label.toLowerCase().includes(q) ? [item] : [];
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [q]);

  return (
    <>
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-muted/95 px-4 py-3 backdrop-blur md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block size-5 rounded-full bg-primary" />
          <span className="font-bold tracking-tight text-foreground">
            Folio
          </span>
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary [&>svg]:size-5"
          >
            <Menu />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-inverse/50"
          />
          {/* Drawer */}
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-border bg-muted">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="inline-block size-5 rounded-full bg-primary" />
                <span className="font-bold tracking-tight text-foreground">
                  Folio
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground [&>svg]:size-5"
              >
                <X />
              </button>
            </div>

            <div className="px-4 py-3">
              <div className="relative">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  aria-label="Search navigation"
                  className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>
            </div>

            <nav className="flex-1 space-y-6 overflow-y-auto px-4 pb-6">
              {filteredNav.length === 0 ? (
                <p className="px-1 text-sm text-muted-foreground">
                  No matches for &ldquo;{query.trim()}&rdquo;.
                </p>
              ) : (
                filteredNav.map((group) => (
                  <div key={group.section}>
                    <p className="mb-2 text-caption">
                      {group.section}
                    </p>
                    <ul className="space-y-0.5">
                      {group.items.map((item) => {
                        // Collapsible group of child pages (e.g. Charts).
                        if (item.children && !q) {
                          const childActive = item.children.some(
                            (c) => c.href === pathname,
                          );
                          const grpOpen =
                            openGroups[item.label] ?? childActive;
                          return (
                            <li key={item.label}>
                              <button
                                type="button"
                                onClick={() =>
                                  setOpenGroups((p) => ({
                                    ...p,
                                    [item.label]: !(
                                      p[item.label] ?? childActive
                                    ),
                                  }))
                                }
                                aria-expanded={grpOpen}
                                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                              >
                                <span>{item.label}</span>
                                <ChevronRight
                                  aria-hidden
                                  className={`size-4 shrink-0 transition-transform ${grpOpen ? "rotate-90" : ""}`}
                                />
                              </button>
                              {grpOpen && (
                                <ul className="mt-1 space-y-px border-l border-border pl-3">
                                  {item.children.map((c) => {
                                    const cActive = pathname === c.href;
                                    return (
                                      <li key={c.href}>
                                        <Link
                                          href={c.href ?? "#"}
                                          onClick={() => setOpen(false)}
                                          aria-current={
                                            cActive ? "page" : undefined
                                          }
                                          className={[
                                            "block rounded-lg px-3 py-1.5 text-[13px] transition-colors",
                                            cActive
                                              ? "font-semibold text-foreground"
                                              : "font-medium text-muted-foreground hover:text-foreground",
                                          ].join(" ")}
                                        >
                                          {c.label}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </li>
                          );
                        }

                        const active = pathname === item.href;
                        return (
                          <li key={item.href}>
                            <Link
                              href={item.href ?? "#"}
                              onClick={() => setOpen(false)}
                              className={[
                                "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                active
                                  ? "bg-secondary text-foreground"
                                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                              ].join(" ")}
                            >
                              {item.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
