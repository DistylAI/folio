import type { Metadata } from "next";
import { Kbd, KbdGroup } from "@/components/shadcn/kbd";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Keyboard Input",
  description:
    "Keyboard Input (Kbd) -- displays textual user input from the keyboard. Built on the <kbd> element. API matches @distylai/toolkit-ui.",
};

const installCode = `import { Kbd, KbdGroup } from "@/components/shadcn/kbd";

export function CommandHint() {
  return (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  );
}`;

export default function KbdPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Keyboard Input</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Used to display textual user input from the keyboard. Use it for
        shortcut hints and key references -- not for general inline code.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          <span className="font-bold">Toolkit API.</span>{" "}
          <code className="font-mono">Kbd</code> and{" "}
          <code className="font-mono">KbdGroup</code> match{" "}
          <code className="font-mono">@distylai/toolkit-ui</code>, built on the
          semantic <code className="font-mono">&lt;kbd&gt;</code> element. Inside
          a tooltip, a key cap switches to a translucent surface automatically.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>K</Kbd>
          </KbdGroup>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- the muted surface and text remap
          on theme change, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Examples</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <div className="flex items-center gap-1">
              <Kbd>⇧</Kbd>
              <Kbd>⌘</Kbd>
              <Kbd>P</Kbd>
            </div>
            <span className="text-small">Single keys</span>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <span className="text-caption">+</span>
              <Kbd>B</Kbd>
            </KbdGroup>
            <span className="text-small">Combo</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted p-8">
            <p className="text-center text-sm text-foreground">
              Press <Kbd>Esc</Kbd> to close
            </p>
            <span className="text-small">In a sentence</span>
          </div>
        </div>
        <p className="mt-2 text-small">
          A single key uses <code className="font-mono">Kbd</code>; a sequence
          wraps them in <code className="font-mono">KbdGroup</code> for even
          spacing. Each key is at least square (
          <code className="font-mono">min-w-5</code>) so{" "}
          <Kbd>K</Kbd> and <Kbd>Esc</Kbd> sit consistently.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.6fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "Kbd", desc: "A single key cap -- wrap a key name or symbol (⌘, Shift, Enter)." },
                { name: "KbdGroup", desc: "Groups multiple Kbd keys into one shortcut, with consistent spacing." },
              ].map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.6fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">{p.name}</div>
                  <div className="text-description">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
              Don&apos;t use <code className="font-mono">Kbd</code> for inline
              code, file names, or values -- that&apos;s a{" "}
              <code className="font-mono">&lt;code&gt;</code>. Reserve it for
              actual keystrokes.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<KbdGroup>
  <Kbd>⌘</Kbd>
  <Kbd>K</Kbd>
</KbdGroup>`}
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
          Drop-in ready. Renders a real{" "}
          <code className="font-mono">&lt;kbd&gt;</code> element, so it&apos;s
          semantic and screen-reader friendly.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">@distylai/toolkit-ui</code>.
        Built on the semantic{" "}
        <code className="font-mono text-foreground">&lt;kbd&gt;</code> element
        with the muted surface mapped to the Folio{" "}
        <code className="font-mono text-foreground">background-secondary</code>{" "}
        token.
      </footer>
    </div>
  );
}
