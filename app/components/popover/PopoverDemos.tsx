"use client";

import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";

const dimensions = [
  { id: "width", label: "Width" },
  { id: "max-width", label: "Max. width" },
  { id: "height", label: "Height" },
  { id: "max-height", label: "Max. height" },
];

export function DimensionsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-1">
            <h4 className="font-medium leading-none text-foreground">
              Dimensions
            </h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            {dimensions.map((d) => (
              <div
                key={d.id}
                className="grid grid-cols-3 items-center gap-4"
              >
                <label
                  htmlFor={d.id}
                  className="text-sm font-medium text-foreground"
                >
                  {d.label}
                </label>
                <Input
                  id={d.id}
                  placeholder="Placeholder"
                  className="col-span-2 h-8"
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function SimplePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Show details</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-1">
          <h4 className="font-medium leading-none text-foreground">
            Activity log
          </h4>
          <p className="text-sm text-muted-foreground">
            Rich content lives in a portal above the page, dismissed by clicking
            outside or pressing Escape.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AlignPopover({
  align,
}: {
  align: "start" | "center" | "end";
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="capitalize">
          {align}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-56">
        <p className="text-sm text-muted-foreground">
          Aligned to the{" "}
          <span className="font-medium text-foreground">{align}</span> edge of
          the trigger.
        </p>
      </PopoverContent>
    </Popover>
  );
}
