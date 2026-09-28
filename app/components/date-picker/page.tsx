import type { Metadata } from "next";
import { Calendar as CalendarIcon } from "lucide-react";
import { DatePicker, DateRangePicker } from "@/components/folio/date-picker";
import { Calendar } from "@/components/shadcn/calendar";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Date Picker",
  description:
    "Date Picker component: a compact date input that opens a Calendar in a Popover, for forms and toolbars.",
};

const props = [
  {
    name: "placeholder",
    type: "string",
    def: '"Pick a date"',
    desc: "Text shown on the trigger when no date is selected.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Disables the trigger so the calendar cannot open.",
  },
  {
    name: "align",
    type: '"start" | "center" | "end"',
    def: '"start"',
    desc: "How the popover aligns to the trigger.",
  },
  {
    name: "clearable",
    type: "boolean",
    def: "false",
    desc: "Shows a clear control on the trigger once a date is chosen.",
  },
  {
    name: "ref",
    type: "Ref<HTMLDivElement | HTMLButtonElement>",
    def: "—",
    desc: "DatePicker forwards it to its wrapper div, DateRangePicker to its trigger button.",
  },
] as const;

const doCode = `<DatePicker placeholder="Due date" />`;

const installCode = `import { DatePicker } from "@/components/folio/date-picker";

export function DueDateField() {
  return <DatePicker placeholder="Due date" clearable />;
}`;

const JUNE_12 = new Date(2026, 5, 12);

export default function DatePickerPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Date Picker</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A compact date input that opens a calendar in a popover on click. It fits
        forms and toolbars where a full inline grid would take too much room.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Date Picker is a higher-order pattern, composed from Calendar, Popover,
          and Button. The Popover holds the Calendar primitive; the Button shows
          the chosen date and opens it.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <DatePicker />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Click to open the calendar, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <DatePicker />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<DatePicker />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <DateRangePicker />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<DateRangePicker />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <DatePicker placeholder="Select your start date" />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<DatePicker placeholder="Select your start date" />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <DatePicker clearable placeholder="Pick a date" />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<DatePicker clearable />`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Single date, a date range, a custom placeholder, and a clearable input.
          Select a date in the clearable one to reveal its clear control.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <DatePicker />
            <p className="text-caption">Closed. Just the trigger.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <Button
              variant="outline"
              className="w-[240px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              June 12, 2026
            </Button>
            <p className="text-caption">
              Date selected. The trigger shows the value.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <Button
              variant="outline"
              className="w-[280px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 size-4 shrink-0" />
              Jun 09, 2026 - Jun 16, 2026
            </Button>
            <p className="text-caption">
              Range selected. Both ends are shown.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6">
            <DatePicker disabled placeholder="Pick a date" />
            <p className="text-caption">
              Disabled. The calendar cannot open.
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-6 lg:col-span-2">
            <div className="flex flex-col items-center gap-2">
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 size-4 shrink-0" />
                June 12, 2026
              </Button>
              <div className="w-fit rounded-lg border border-border bg-background shadow-md">
                <Calendar mode="single" selected={JUNE_12} defaultMonth={JUNE_12} />
              </div>
            </div>
            <p className="text-caption">
              Open. The calendar drops in a popover under the trigger (shown
              statically).
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          The trigger summarizes the selection; opening reveals the same Calendar
          grid documented on its own page.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Prop</div>
              <div>Type</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {props.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
                  </div>
                  <div className="font-mono text-caption">
                    {p.type}
                  </div>
                  <div className="font-mono text-caption">
                    {p.def}
                  </div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">DateRangePicker</code> is the range form of
          the same composition.
        </p>
      </section>

      {/* Don't and Do */}
      <section id="do-dont" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Don&apos;t and Do
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t hide date selection behind a Date Picker when choosing a
              date is the main thing the reader came to do. Making them open a
              popover to reach the grid adds a step. When date selection is the
              primary action, show a Calendar directly.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {doCode}
              </code>
            </pre>
          </div>
        </div>
        <p className="mt-2 text-small">
          Use it in forms, filter toolbars, and anywhere a compact date input is
          needed.
        </p>
      </section>

      {/* Copy-paste */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        Folio v1.2 · June 2026
      </footer>
    </div>
  );
}
