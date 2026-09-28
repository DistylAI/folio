"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

// Icon-only copy button. Rest = text-subtle, success = text-primary, 2s reset.
export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      // clipboard unavailable (e.g. insecure context) -- no-op
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className={cn(
        "rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      {copied ? (
        <Check className="size-4 text-primary" aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
    </button>
  );
}

// Code container. Multi-line code gets a toolbar row above it so the copy
// button never overlaps the content. Single-line code keeps the icon inline on
// the right (no toolbar) and truncates -- a stacked toolbar over one line leaves
// odd empty space above it.
export function CodeBlock({
  code,
  size = "md",
  className,
}: {
  code: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const isSingleLine = !code.includes("\n");

  if (isSingleLine) {
    const pad = size === "sm" ? "py-1.5 pl-3 text-xs" : "py-2.5 pl-4 text-sm";
    return (
      <div className={cn("flex items-center gap-1", className)}>
        <pre className={cn("min-w-0 flex-1 overflow-hidden", pad)}>
          <code className="block truncate font-mono text-foreground">
            {code}
          </code>
        </pre>
        <CopyButton value={code} className="mr-1 shrink-0" />
      </div>
    );
  }

  const body = size === "sm" ? "px-3 pb-2 text-xs" : "px-4 pb-4 text-sm";
  return (
    <div className={className}>
      <div className="flex justify-end px-1.5 pt-1.5">
        <CopyButton value={code} />
      </div>
      <pre className={cn("overflow-x-auto", body)}>
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </div>
  );
}
