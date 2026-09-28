"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Search, X } from "lucide-react";
import { Kbd } from "@/components/shadcn/kbd";
import { nav, type NavSection } from "@/lib/nav";
import { ThemeToggle } from "./ThemeToggle";

// Highlight the section currently scrolled into view.
function useActiveSection(sections: NavSection[] | undefined, pathname: string) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    setActiveId("");
    if (!sections?.length) return;

    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0px 0px -65% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // pathname re-runs the effect after client navigation swaps the page.
  }, [sections, pathname]);

  return activeId;
}

export function Sidebar() {
  const pathname = usePathname();
  const activeItem = nav.flatMap((g) => g.items).find((i) => i.href === pathname);
  const activeSection = useActiveSection(activeItem?.sections, pathname);

  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const searchRef = useRef<HTMLInputElement>(null);
  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  // Filter every group by label as the list grows. Empty query → full nav.
  // While searching, child pages of a collapsible group surface as flat links.
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

  // Press "/" anywhere (outside a field) to jump to search.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/") return;
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      ) {
        return;
      }
      e.preventDefault();
      searchRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-border bg-muted md:flex">
      {/* Sticky header -- logo + search stay pinned; the nav scrolls under. */}
      <div className="sticky top-0 z-10 bg-muted px-6 pt-8 pb-4">
      <div className="mb-6 flex items-center justify-between gap-2">
        <Link href="/" className="group">
          <div className="flex items-center gap-2">
            <span className="inline-block size-6 rounded-full bg-primary" />
            <span className="text-lg font-bold tracking-tight text-foreground">
              Folio
            </span>
          </div>
        </Link>
        <ThemeToggle />
      </div>

      {/* Search -- filters the whole nav. Grows with the component list. */}
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <input
          ref={searchRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setQuery("");
              e.currentTarget.blur();
            }
          }}
          placeholder="Search…"
          aria-label="Search navigation"
          className="h-9 w-full rounded-xl border border-border bg-background pl-9 pr-9 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
        {searching ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              searchRef.current?.focus();
            }}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : (
          <Kbd
            aria-hidden
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
          >
            /
          </Kbd>
        )}
      </div>
      </div>

      <nav className="flex-1 space-y-7 px-6">
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
                  if (item.children && !searching) {
                    const childActive = item.children.some(
                      (c) => c.href === pathname,
                    );
                    const open = openGroups[item.label] ?? childActive;
                    return (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() =>
                            setOpenGroups((p) => ({
                              ...p,
                              [item.label]: !(p[item.label] ?? childActive),
                            }))
                          }
                          aria-expanded={open}
                          className="-mx-3 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                        >
                          <span>{item.label}</span>
                          <ChevronRight
                            aria-hidden
                            className={`size-4 shrink-0 transition-transform ${open ? "rotate-90" : ""}`}
                          />
                        </button>
                        {open && (
                          <ul className="mt-1 space-y-px border-l border-border pl-3">
                            {item.children.map((c) => {
                              const cActive = pathname === c.href;
                              return (
                                <li key={c.href}>
                                  <Link
                                    href={c.href ?? "#"}
                                    aria-current={cActive ? "page" : undefined}
                                    className={[
                                      "block rounded-sm py-1 text-[13px] transition-colors",
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
                        className={[
                          "-mx-3 block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                          active
                            ? "bg-secondary text-foreground"
                            : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                        ].join(" ")}
                      >
                        {item.label}
                      </Link>

                      {/* Sub-navigation: only under the active page, and not
                          while filtering (keeps results flat). */}
                      {!searching && active && item.sections && (
                        <ul className="mt-1 space-y-px border-l border-border pl-3">
                          {item.sections.map((s) => {
                            const current = activeSection === s.id;
                            return (
                              <li key={s.id}>
                                <a
                                  href={`${item.href}#${s.id}`}
                                  aria-current={current ? "true" : undefined}
                                  className={[
                                    "block rounded-sm py-1 text-[13px] transition-colors",
                                    current
                                      ? "font-semibold text-foreground"
                                      : "font-medium text-muted-foreground hover:text-foreground",
                                  ].join(" ")}
                                >
                                  {s.label}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))
        )}
      </nav>

      <div className="mt-8 border-t border-border px-6 pb-8 pt-6">
        <div className="flex flex-col gap-1 text-caption">
          <span>Folio v1.2</span>
        </div>
      </div>
    </aside>
  );
}
