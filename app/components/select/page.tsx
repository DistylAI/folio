import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { FruitSelect, GroupedSelect } from "./SelectDemos";

export const metadata: Metadata = {
  title: "Select",
  description:
    "Select component: a control for choosing one option from a list. API matches @distylai/toolkit-ui.",
};

const anatomyCode = `<Select>
  <SelectTrigger className="w-[220px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectContent>
</Select>`;

const installCode = `import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectSeparator,
} from "@/components/shadcn/select";`;

export default function SelectPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Select</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays a control for choosing a single option from a list. Use it when
        options exceed a handful and a Radio Group would be too tall.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex min-h-[18rem] items-start justify-center rounded-xl border border-border bg-muted p-10">
          <FruitSelect />
        </div>
        <p className="mt-2 text-small">
          Live and interactive: open it, then toggle the theme. The trigger,
          panel, and selected-item check remap from Folio tokens, no{" "}
          <code className="font-mono">dark:</code> classes. The trigger matches
          the Input field.
        </p>
      </section>

      {/* API */}
      <section id="anatomy" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <CodeBlock
          code={anatomyCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          <code className="font-mono">SelectValue</code> renders the chosen
          label (or the <code className="font-mono">placeholder</code>);{" "}
          <code className="font-mono">SelectGroup</code> +{" "}
          <code className="font-mono">SelectLabel</code> +{" "}
          <code className="font-mono">SelectSeparator</code> organize long lists.{" "}
          <code className="font-mono">SelectTrigger</code> takes{" "}
          <code className="font-mono">size</code> (
          <code className="font-mono">&quot;default&quot;</code> 36px,{" "}
          <code className="font-mono">&quot;sm&quot;</code> 32px) and{" "}
          <code className="font-mono">variant</code> (
          <code className="font-mono">&quot;default&quot;</code> bordered field,{" "}
          <code className="font-mono">&quot;quiet&quot;</code> borderless inline
          text).
        </p>
      </section>

      {/* Grouped */}
      <section id="grouped" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Grouped options</h3>
        <div className="flex min-h-[18rem] items-start justify-center rounded-xl border border-border bg-muted p-10">
          <GroupedSelect />
        </div>
        <p className="mt-2 text-small">
          Labels and separators group related options without making them
          selectable.
        </p>
      </section>

      {/* Don't and Do */}
      <section id="do-dont" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Don&apos;t and Do</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-destructive bg-destructive-subtle p-5">
            <div className="mb-2 text-sm font-bold text-destructive">
              Don&apos;t
            </div>
            <p className="text-small text-foreground">
              Don&apos;t reach for a native{" "}
              <code className="font-mono">&lt;select&gt;</code> when you need
              token styling, groups, or icons: it can&apos;t theme with
              Folio. And don&apos;t use Select for 2–3 options; a Radio Group
              is clearer.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Select value={tz} onValueChange={setTz}>
  <SelectTrigger><SelectValue /></SelectTrigger>
  <SelectContent>…</SelectContent>
</Select>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Install */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          Typeahead, keyboard navigation, and collision handling come for free.
          Use{" "}
          <code className="font-mono">value</code> /{" "}
          <code className="font-mono">onValueChange</code> for controlled state.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        <code className="font-mono text-foreground">Select</code>,{" "}
        <code className="font-mono text-foreground">SelectTrigger</code>,{" "}
        <code className="font-mono text-foreground">SelectValue</code>,{" "}
        <code className="font-mono text-foreground">SelectContent</code>,{" "}
        <code className="font-mono text-foreground">SelectItem</code>,{" "}
        <code className="font-mono text-foreground">SelectGroup</code>,{" "}
        <code className="font-mono text-foreground">SelectLabel</code>,{" "}
        <code className="font-mono text-foreground">SelectSeparator</code>,
        plus <code className="font-mono text-foreground">SelectPortal</code>,
        the scroll buttons, and{" "}
        <code className="font-mono text-foreground">selectTriggerVariants</code>
        . The raw <code className="font-mono text-foreground">bg-popover</code> /{" "}
        <code className="font-mono text-foreground">border-input</code>{" "}
        utilities are replaced with Folio tokens.
      </footer>
    </div>
  );
}
