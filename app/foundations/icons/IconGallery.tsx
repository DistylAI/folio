"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/shadcn/input";
import { icons } from "./iconData";

// Searchable grid of common Lucide icons. Filters by name; clicking an icon
// copies its import statement. Renders from the actual lucide-react package.
export function IconGallery() {
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const q = query.trim().toLowerCase();
  const filtered = q
    ? icons.filter((i) => i.name.toLowerCase().includes(q))
    : icons;

  async function copy(name: string) {
    try {
      await navigator.clipboard.writeText(
        `import { ${name} } from "lucide-react";`,
      );
      setCopied(name);
      setTimeout(() => setCopied((c) => (c === name ? null : c)), 1500);
    } catch {
      // clipboard unavailable (e.g. insecure context) -- no-op
    }
  }

  return (
    <div>
      <div className="relative max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search icons…"
          aria-label="Search icons"
          className="pl-9"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="mt-4 text-small">No icons match &quot;{query}&quot;.</p>
      ) : (
        <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {filtered.map(({ name, Icon }) => (
            <button
              key={name}
              type="button"
              onClick={() => copy(name)}
              title={`Copy import for ${name}`}
              className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background p-3 text-center transition-colors hover:border-primary hover:bg-muted focus:outline-none focus-visible:border-primary"
            >
              <Icon className="size-6 text-muted-foreground" aria-hidden />
              <span className="w-full truncate text-caption">
                {copied === name ? "Copied!" : name}
              </span>
            </button>
          ))}
        </div>
      )}

      <p className="mt-3 text-small">
        Showing {filtered.length} of {icons.length} icons · click any icon to
        copy its import.
      </p>
    </div>
  );
}
