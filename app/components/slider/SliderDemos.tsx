"use client";

import { useState } from "react";
import { Slider } from "@/components/shadcn/slider";

// Controlled single slider with a live value readout for the preview.
export function SliderDemo() {
  const [value, setValue] = useState([50]);
  return (
    <div className="w-full max-w-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Volume</span>
        <span className="text-sm tabular-nums text-muted-foreground">{value[0]}</span>
      </div>
      <Slider value={value} onValueChange={setValue} max={100} step={1} />
    </div>
  );
}
