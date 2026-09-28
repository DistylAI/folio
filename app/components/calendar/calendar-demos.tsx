"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/shadcn/calendar";

// Interactive calendars hold their own selection state, so they live in a client
// component. None auto-focus on mount, so the demos stay inert at rest.
const JUNE_2026 = new Date(2026, 5, 1);
const cardClass =
  "rounded-lg border border-border bg-background";

export function CalendarSingle() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2026, 5, 12),
  );
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={JUNE_2026}
      className={cardClass}
    />
  );
}

export function CalendarRange() {
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 5, 9),
    to: new Date(2026, 5, 16),
  });
  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      defaultMonth={JUNE_2026}
      className={cardClass}
    />
  );
}

export function CalendarDisabled() {
  const [date, setDate] = React.useState<Date>();
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={JUNE_2026}
      disabled={{ dayOfWeek: [0, 6] }}
      className={cardClass}
    />
  );
}
