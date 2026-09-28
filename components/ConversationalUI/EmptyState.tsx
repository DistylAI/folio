"use client";

import { Binoculars } from "lucide-react";

interface EmptyStateProps {
  onChipClick: (text: string) => void;
}

const chips = [
  "What token do I use for brand color?",
  "Tag vs Badge -- what's the difference?",
  "How does dark mode work?",
  "Show me a compliant Button example",
];

export function EmptyState({ onChipClick }: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex size-10 items-center justify-center rounded-full bg-primary">
        <Binoculars className="size-5 text-inverse" aria-hidden />
      </div>
      <p className="text-sm font-medium text-foreground">
        Ask Meno anything about Folio
      </p>
      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
        Tokens, components, and the rules that hold the system together.
      </p>
      <div className="mt-1 flex flex-wrap justify-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => onChipClick(chip)}
            className="rounded-full border border-border bg-background px-4 py-1.5 text-caption transition-colors hover:border-primary hover:text-foreground"
          >
            {chip}
          </button>
        ))}
      </div>
    </div>
  );
}
