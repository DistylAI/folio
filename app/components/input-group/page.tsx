import type { Metadata } from "next";
import { AtSign, Check, Globe, Search, Send } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/shadcn/input-group";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Input Group",
  description:
    "Input Group component -- an Input with attached leading or trailing context: icons, prefixes, suffixes, or an action, inside one visual boundary.",
};

// Gives the attached action the Folio look: a 28px outline button with a 4px
// radius that nests inside the group's 8px corner.
const actionClass =
  "h-7 gap-2 rounded-sm text-xs shadow [&_svg:not([class*='size-'])]:size-3.5";

const parts = [
  {
    name: "InputGroup",
    type: "div props",
    def: "—",
    desc: "The single visual boundary. It takes its focus, error, and disabled look from the control inside it.",
  },
  {
    name: "InputGroupAddon",
    type: '"inline-start" | "inline-end" | "block-start" | "block-end"',
    def: '"inline-start"',
    desc: "align -- where the attached context sits. Holds an icon, InputGroupText, or InputGroupButton. A click on it focuses the input.",
  },
  {
    name: "InputGroupText",
    type: "span props",
    def: "—",
    desc: "Static prefix or suffix text, for example a protocol, a unit, or a domain.",
  },
  {
    name: "InputGroupInput",
    type: "Input props",
    def: "—",
    desc: "The field. Set aria-invalid for the error state and disabled to dim the group. All native input props pass through.",
  },
  {
    name: "InputGroupTextarea",
    type: "textarea props",
    def: "—",
    desc: "A multi-line field in place of InputGroupInput. The group grows to fit it.",
  },
  {
    name: "InputGroupButton",
    type: '"xs" | "sm" | "icon-xs" | "icon-sm"',
    def: '"xs"',
    desc: "size -- an action attached inside the boundary. Takes Button variant (default \"ghost\") and type (default \"button\").",
  },
] as const;

const leadingIconCode = `<InputGroup>
  <InputGroupInput placeholder="Search..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
</InputGroup>`;

const trailingIconCode = `<InputGroup>
  <InputGroupInput defaultValue="alex@distyl.ai" />
  <InputGroupAddon align="inline-end">
    <Check className="text-success" />
  </InputGroupAddon>
</InputGroup>`;

const leadingTextCode = `<InputGroup>
  <InputGroupInput placeholder="workspace" />
  <InputGroupAddon>
    <InputGroupText>https://</InputGroupText>
  </InputGroupAddon>
</InputGroup>`;

const trailingTextCode = `<InputGroup>
  <InputGroupInput placeholder="0.00" />
  <InputGroupAddon align="inline-end">
    <InputGroupText>USD</InputGroupText>
  </InputGroupAddon>
</InputGroup>`;

const actionCode = `<InputGroup>
  <InputGroupInput placeholder="Invite by email" />
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="outline" size="sm" className="${actionClass}">
      <Send />
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

const iconActionCode = `<InputGroup>
  <InputGroupInput placeholder="username" />
  <InputGroupAddon>
    <AtSign />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="outline" size="sm" className="${actionClass}">
      Add
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

const errorCode = `<InputGroup>
  <InputGroupInput aria-invalid defaultValue="not a domain" />
  <InputGroupAddon>
    <Globe />
  </InputGroupAddon>
</InputGroup>`;

const disabledCode = `<InputGroup>
  <InputGroupInput disabled defaultValue="folio" />
  <InputGroupAddon>
    <Globe />
  </InputGroupAddon>
</InputGroup>`;

const doCode = `<InputGroup>
  <InputGroupInput placeholder="Search the workspace..." />
  <InputGroupAddon>
    <Search />
  </InputGroupAddon>
  <InputGroupAddon align="inline-end">
    <InputGroupButton variant="outline" size="sm" className="${actionClass}">
      Search
    </InputGroupButton>
  </InputGroupAddon>
</InputGroup>`;

const installCode = `import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/shadcn/input-group";
import { Globe } from "lucide-react";

export function SiteField() {
  return (
    <InputGroup>
      <InputGroupInput placeholder="workspace" />
      <InputGroupAddon>
        <Globe />
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>.distyl.ai</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}`;

function Cell({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
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

export default function InputGroupPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Input Group</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An Input with attached context: a leading or trailing icon, a prefix or
        suffix, or a single action, all inside one visual boundary so the field
        still reads as a single control.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Input Group is a composed pattern built on the Input primitive. It does
          not replace Input. It extends it for the cases where attached context
          is required.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <div className="w-full max-w-sm">
            <InputGroup>
              <InputGroupInput placeholder="Search the workspace..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="outline"
                  size="sm"
                  className={actionClass}
                >
                  Search
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Focus it and the whole group border
          changes color, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Cell code={leadingIconCode}>
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </Cell>
          <Cell code={trailingIconCode}>
            <InputGroup>
              <InputGroupInput defaultValue="alex@distyl.ai" />
              <InputGroupAddon align="inline-end">
                <Check className="text-success" />
              </InputGroupAddon>
            </InputGroup>
          </Cell>
          <Cell code={leadingTextCode}>
            <InputGroup>
              <InputGroupInput placeholder="workspace" />
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Cell>
          <Cell code={trailingTextCode}>
            <InputGroup>
              <InputGroupInput placeholder="0.00" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>USD</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Cell>
          <Cell code={actionCode}>
            <InputGroup>
              <InputGroupInput placeholder="Invite by email" />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="outline"
                  size="sm"
                  className={actionClass}
                >
                  <Send />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Cell>
          <Cell code={iconActionCode}>
            <InputGroup>
              <InputGroupInput placeholder="username" />
              <InputGroupAddon>
                <AtSign />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  variant="outline"
                  size="sm"
                  className={actionClass}
                >
                  Add
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Cell>
        </div>
        <p className="mt-2 text-small">
          Each <code className="font-mono">InputGroupAddon</code> holds one kind
          of context: an icon, an{" "}
          <code className="font-mono">InputGroupText</code> prefix or suffix, or
          an <code className="font-mono">InputGroupButton</code>. Set{" "}
          <code className="font-mono">align</code> to put it at the start or the
          end. Use one addon on each side to pair an icon with an action.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputGroup>
                <InputGroupInput placeholder="workspace" />
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Default. Empty and at rest.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputGroup className="border-primary ring-1 ring-ring">
                <InputGroupInput placeholder="workspace" />
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Focused. The whole group rings (shown statically here).
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputGroup>
                <InputGroupInput defaultValue="folio" />
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Filled. Holds a value.</p>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputGroup>
                <InputGroupInput aria-invalid defaultValue="not a domain" />
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={errorCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputGroup>
                <InputGroupInput disabled defaultValue="folio" />
                <InputGroupAddon>
                  <Globe />
                </InputGroupAddon>
              </InputGroup>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={disabledCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The group reads its state from the control. Focus on{" "}
          <code className="font-mono">InputGroupInput</code> changes the whole
          boundary, not only the inner field.{" "}
          <code className="font-mono">aria-invalid</code> swaps the border to the
          danger token, and <code className="font-mono">disabled</code> dims the
          whole group.
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
          Order the parts in JSX as you like: each addon places itself with{" "}
          <code className="font-mono">align</code>. Put{" "}
          <code className="font-mono">InputGroupInput</code> first so the tab
          order reaches the field before any action.
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
              Don&apos;t stack multiple trailing actions in one group. Two or
              more competing buttons crowd the field and blur which one the value
              belongs to. When more than one action is needed, move them out of
              the field into a different pattern.
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
          Use it to add contextual affordance to an input without breaking the
          field&apos;s visual boundary.
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
        -- compound parts{" "}
        <code className="font-mono text-foreground">InputGroup</code>,{" "}
        <code className="font-mono text-foreground">InputGroupAddon</code>,{" "}
        <code className="font-mono text-foreground">InputGroupText</code>,{" "}
        <code className="font-mono text-foreground">InputGroupInput</code>,{" "}
        <code className="font-mono text-foreground">InputGroupTextarea</code>,
        and <code className="font-mono text-foreground">InputGroupButton</code>
        . The classes use Folio tokens.
      </footer>
    </div>
  );
}
