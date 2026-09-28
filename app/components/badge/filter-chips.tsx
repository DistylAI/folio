"use client";

import * as React from "react";

import { Tag } from "@/components/folio/tag";

// The canonical removable-Tag pattern: filter chips you can dismiss. Stateful,
// so it lives in a client island; the Badge docs page stays a server component.
const FILTERS = ["React", "TypeScript", "Design Systems", "Accessibility"];

export function FilterChips() {
  const [chips, setChips] = React.useState(FILTERS);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <Tag
          key={chip}
          removable
          onRemove={() => setChips((cur) => cur.filter((c) => c !== chip))}
        >
          {chip}
        </Tag>
      ))}
      {chips.length === 0 && (
        <button
          type="button"
          onClick={() => setChips(FILTERS)}
          className="text-small text-primary underline-offset-4 hover:underline"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
