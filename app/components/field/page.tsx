import type { Metadata } from "next";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Field",
  description:
    "Field component -- compound form-field parts that compose a label, a control, and optional helper or error text into one accessible unit.",
};

const parts = [
  {
    name: "Field",
    type: '"vertical" | "horizontal" | "responsive"',
    def: '"vertical"',
    desc: "orientation -- the wrapper for one label, control, and message. Set data-invalid or data-disabled to mark the whole field.",
  },
  {
    name: "FieldLabel",
    type: "Label props",
    def: "—",
    desc: "The field label. Set htmlFor to the control id. Put a required asterisk in it as a child span.",
  },
  {
    name: "FieldDescription",
    type: "p props",
    def: "—",
    desc: "Helper text below the control, for example a hint or a character count.",
  },
  {
    name: "FieldError",
    type: "{ message?: string }[]",
    def: "undefined",
    desc: "errors -- the validation message, from children or from an errors array. Renders nothing when empty, and has role=\"alert\".",
  },
  {
    name: "FieldContent",
    type: "div props",
    def: "—",
    desc: "Stacks a label and a description next to a control in a horizontal field.",
  },
  {
    name: "FieldGroup",
    type: "boolean",
    def: "false",
    desc: "compact -- stacks several fields with even spacing. compact tightens the gaps for every field inside it.",
  },
  {
    name: "FieldSet / FieldLegend",
    type: '"legend" | "label"',
    def: '"legend"',
    desc: "A native fieldset with a legend for a named group of fields. The legend variant sets its size.",
  },
  {
    name: "FieldTitle / FieldSeparator",
    type: "div props",
    def: "—",
    desc: "A label-styled title that is not a <label>, and a divider with optional centered text.",
  },
] as const;

const labelOnlyCode = `<Field>
  <FieldLabel htmlFor="name">Full name</FieldLabel>
  <Input id="name" />
</Field>`;

const helperCode = `<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-describedby="email-help" />
  <FieldDescription id="email-help">…</FieldDescription>
</Field>`;

const errorCode = `<Field data-invalid>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-invalid aria-describedby="email-error" />
  <FieldError id="email-error">…</FieldError>
</Field>`;

const requiredCode = `<Field>
  <FieldLabel htmlFor="workspace">
    Workspace name
    <span aria-hidden className="ml-0.5 text-destructive">*</span>
  </FieldLabel>
  <Input id="workspace" required />
</Field>`;

const textareaCode = `<Field>
  <FieldLabel htmlFor="bio">Bio</FieldLabel>
  <Textarea id="bio" aria-describedby="bio-count" />
  <FieldDescription id="bio-count">24 / 160 characters</FieldDescription>
</Field>`;

const doCode = `<Field>
  <FieldLabel htmlFor="email">Email</FieldLabel>
  <Input id="email" type="email" aria-describedby="email-help" />
  <FieldDescription id="email-help">We never share it.</FieldDescription>
</Field>`;

const installCode = `import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";

export function EmailField() {
  return (
    <Field>
      <FieldLabel htmlFor="email">Email</FieldLabel>
      <Input
        id="email"
        type="email"
        placeholder="you@distyl.ai"
        aria-describedby="email-help"
      />
      <FieldDescription id="email-help">
        We only use this for account recovery.
      </FieldDescription>
    </Field>
  );
}`;

function Cell({
  children,
  code,
  className,
}: {
  children: React.ReactNode;
  code: string;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-border ${className ?? ""}`}
    >
      <div className="flex items-center justify-center bg-muted p-8">
        {children}
      </div>
      <div className="border-t border-border p-3">
        <CodeBlock
          code={code}
          size="sm"
          className="rounded-lg border border-border-subtle bg-muted"
        />
      </div>
    </div>
  );
}

function StateCell({
  children,
  caption,
}: {
  children: React.ReactNode;
  caption: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className="flex items-center justify-center bg-muted p-8">
        <div className="w-full max-w-[220px]">{children}</div>
      </div>
      <div className="border-t border-border p-3">
        <p className="text-caption">{caption}</p>
      </div>
    </div>
  );
}

export default function FieldPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Field</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A form field wrapper that pairs a label and a control with optional
        helper text or a validation message, all wired together for
        accessibility.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Field is a set of compound parts. Field, FieldLabel,
          FieldDescription, and FieldError wrap a control (Input, Select,
          Textarea, and the like) and do not replace it. You link the label,
          the control id, and the message with htmlFor, id, and
          aria-describedby.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="w-full max-w-sm">
            <Field>
              <FieldLabel htmlFor="preview-email">Email</FieldLabel>
              <Input
                id="preview-email"
                type="email"
                placeholder="derek@distyl.ai"
                aria-describedby="preview-email-help"
              />
              <FieldDescription id="preview-email-help">
                We only use this for account recovery.
              </FieldDescription>
            </Field>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Type in the field, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Cell code={labelOnlyCode}>
            <div className="w-full max-w-xs">
              <Field>
                <FieldLabel htmlFor="v-name">Full name</FieldLabel>
                <Input id="v-name" placeholder="Derek Ho" />
              </Field>
            </div>
          </Cell>
          <Cell code={helperCode}>
            <div className="w-full max-w-xs">
              <Field>
                <FieldLabel htmlFor="v-email">Email</FieldLabel>
                <Input
                  id="v-email"
                  type="email"
                  placeholder="derek@distyl.ai"
                  aria-describedby="v-email-help"
                />
                <FieldDescription id="v-email-help">
                  We only use this for account recovery.
                </FieldDescription>
              </Field>
            </div>
          </Cell>
          <Cell code={errorCode}>
            <div className="w-full max-w-xs">
              <Field data-invalid>
                <FieldLabel htmlFor="v-email-error">Email</FieldLabel>
                <Input
                  id="v-email-error"
                  type="email"
                  defaultValue="derek@distyl"
                  aria-invalid
                  aria-describedby="v-email-error-message"
                />
                <FieldError id="v-email-error-message">
                  Enter a valid email address.
                </FieldError>
              </Field>
            </div>
          </Cell>
          <Cell code={requiredCode}>
            <div className="w-full max-w-xs">
              <Field>
                <FieldLabel htmlFor="v-workspace">
                  Workspace name
                  <span aria-hidden className="ml-0.5 text-destructive">
                    *
                  </span>
                </FieldLabel>
                <Input id="v-workspace" placeholder="Distyl HQ" required />
              </Field>
            </div>
          </Cell>
          <Cell code={textareaCode} className="lg:col-span-2">
            <div className="w-full max-w-md">
              <Field>
                <FieldLabel htmlFor="v-bio">Bio</FieldLabel>
                <Textarea
                  id="v-bio"
                  defaultValue="Co-founder at Distyl. Building the Folio design system."
                  aria-describedby="v-bio-count"
                />
                <FieldDescription id="v-bio-count">
                  24 / 160 characters
                </FieldDescription>
              </Field>
            </div>
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Helper text in <code className="font-mono">FieldDescription</code>, an
          error in <code className="font-mono">FieldError</code>, a required
          marker as a child of <code className="font-mono">FieldLabel</code>,
          and a character count in the description slot. For an error, also set{" "}
          <code className="font-mono">aria-invalid</code> on the control so
          assistive tech reads it as invalid.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <StateCell caption="Default. Empty and at rest.">
            <Field>
              <FieldLabel htmlFor="s-default">Email</FieldLabel>
              <Input id="s-default" type="email" placeholder="derek@distyl.ai" />
            </Field>
          </StateCell>
          <StateCell caption="Focused. The control rings (shown statically).">
            <Field>
              <FieldLabel htmlFor="s-focus">Email</FieldLabel>
              <Input
                id="s-focus"
                type="email"
                placeholder="derek@distyl.ai"
                className="border-primary ring-1 ring-ring"
              />
            </Field>
          </StateCell>
          <StateCell caption="Filled. Holds a value.">
            <Field>
              <FieldLabel htmlFor="s-filled">Email</FieldLabel>
              <Input id="s-filled" type="email" defaultValue="derek@distyl.ai" />
            </Field>
          </StateCell>
          <StateCell caption="Error. Danger border and message.">
            <Field data-invalid>
              <FieldLabel htmlFor="s-error">Email</FieldLabel>
              <Input
                id="s-error"
                type="email"
                defaultValue="derek@distyl.ai"
                aria-invalid
                aria-describedby="s-error-message"
              />
              <FieldError id="s-error-message">
                That email is already in use.
              </FieldError>
            </Field>
          </StateCell>
          <StateCell caption="Disabled. Dimmed, not editable.">
            <Field data-disabled>
              <FieldLabel htmlFor="s-disabled">Email</FieldLabel>
              <Input
                id="s-disabled"
                type="email"
                defaultValue="derek@distyl.ai"
                disabled
              />
            </Field>
          </StateCell>
        </div>
        <p className="mt-2 text-small">
          Focus and validation read on the control. Set{" "}
          <code className="font-mono">data-disabled</code> on{" "}
          <code className="font-mono">Field</code> and{" "}
          <code className="font-mono">disabled</code> on the control to dim the
          label and the control together.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[640px]">
            <div className="grid grid-cols-[1.4fr_1.8fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Key prop</div>
              <div>Default</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
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
          The parts do not wire ids for you. Give the control an{" "}
          <code className="font-mono">id</code>, point{" "}
          <code className="font-mono">FieldLabel htmlFor</code> at it, and list
          the description or error id in the control&apos;s{" "}
          <code className="font-mono">aria-describedby</code>.
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
              Don&apos;t drop a raw Input into a form without a Field and a
              FieldLabel around it.
              An input with no associated label is invisible to screen readers
              and gives sighted readers nothing to scan. Wrap form controls in a
              Field so every one carries its label and messaging.
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
          Use Field any time a control needs a label, helper text, or a
          validation message. It is the standard wrapper for form inputs in
          Folio.
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
        API matches{" "}
        <code className="font-mono text-foreground">@distylai/toolkit-ui</code>{" "}
        -- compound parts <code className="font-mono text-foreground">Field</code>,{" "}
        <code className="font-mono text-foreground">FieldLabel</code>,{" "}
        <code className="font-mono text-foreground">FieldDescription</code>,{" "}
        <code className="font-mono text-foreground">FieldError</code>,{" "}
        <code className="font-mono text-foreground">FieldContent</code>,{" "}
        <code className="font-mono text-foreground">FieldGroup</code>,{" "}
        <code className="font-mono text-foreground">FieldSet</code>,{" "}
        <code className="font-mono text-foreground">FieldLegend</code>,{" "}
        <code className="font-mono text-foreground">FieldTitle</code>, and{" "}
        <code className="font-mono text-foreground">FieldSeparator</code>. The
        classes use Folio tokens.
      </footer>
    </div>
  );
}
