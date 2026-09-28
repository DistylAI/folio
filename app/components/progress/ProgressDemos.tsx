"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/shadcn/progress";

// Climbs to a target once on mount, so the indicator's transition is visible.
export function AnimatedProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setValue(66), 400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="w-full max-w-sm space-y-2">
      <Progress value={value} />
      <p className="text-right text-sm tabular-nums text-muted-foreground">
        {value}%
      </p>
    </div>
  );
}

// Loops 0 → 100 to stand in for an ongoing, unknown-duration task.
export function LoadingProgress() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 4));
    }, 150);
    return () => clearInterval(id);
  }, []);
  return <Progress value={value} className="w-full max-w-sm" />;
}
