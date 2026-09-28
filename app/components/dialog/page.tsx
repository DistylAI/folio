import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { FormDialog, ShareLinkDialog, TextDialog } from "./DialogDemos";

export const metadata: Metadata = {
  title: "Dialog",
  description:
    "Dialog component: a modal window overlaid on the page, rendering the content underneath inert. API matches @distylai/toolkit-ui components/shadcn/dialog.",
};

const anatomyCode = `<Dialog>
  <DialogTrigger asChild>
    <Button>Edit profile</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes here.</DialogDescription>
    </DialogHeader>

    {/* Body: wrap in px-4 pb-4 */}
    <div className="px-4 pb-4">{/* fields */}</div>

    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button>Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`;

const doCode = `// Close from inside with DialogClose: no manual open state
<DialogFooter>
  <DialogClose asChild>
    <Button variant="outline">Cancel</Button>
  </DialogClose>
  <Button onClick={save}>Save</Button>
</DialogFooter>`;

const installCode = `import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";

export function ConfirmDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>This can't be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}`;

export default function DialogPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Dialog</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A window overlaid on the primary window or another dialog, rendering the
        content underneath inert. Use it for focused tasks and confirmations.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <ShareLinkDialog />
        </div>
        <p className="mt-2 text-small">
          Live and interactive: open it, then toggle the theme. The surface,
          border, footer tint, and overlay all remap from Folio tokens, no{" "}
          <code className="font-mono">dark:</code> classes. Focus is trapped and{" "}
          <code className="font-mono">Esc</code> closes it.
        </p>
      </section>

      {/* API */}
      <section id="anatomy" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-8">
            <FormDialog />
          </div>
          <CodeBlock
            code={anatomyCode}
            className="rounded-xl border border-border bg-muted"
          />
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">DialogHeader</code> and{" "}
          <code className="font-mono">DialogFooter</code> own their padding: the
          footer is full-bleed with a top border and subtle tint. Body content
          sits between them, wrapped in{" "}
          <code className="font-mono">px-4 pb-4</code>. Pass{" "}
          <code className="font-mono">hideCloseButton</code> to{" "}
          <code className="font-mono">DialogContent</code> to remove the
          built-in close button.
        </p>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Examples</h3>
        <div className="grid grid-cols-1 items-start gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <FormDialog />
            <p className="text-small">Form: inputs with a Cancel / Save footer.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <TextDialog />
            <p className="text-small">
              Long content: the body scrolls, header and footer stay pinned.
            </p>
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
              Don&apos;t build a modal from a raw fixed{" "}
              <code className="font-mono">div</code> with a{" "}
              <code className="font-mono">bg-black/50</code> overlay and manual
              state: you&apos;ll lose focus trapping, scroll lock, and{" "}
              <code className="font-mono">Esc</code> handling.
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
      </section>

      {/* Install */}
      <section id="copy-paste" className="mt-12 scroll-mt-8">
        <CodeBlock
          code={installCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          Focus management, scroll lock, and{" "}
          <code className="font-mono">Esc</code> / overlay-click dismissal come
          for free. Folio tokens are baked in.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui components/shadcn/dialog
        </code>{" "}
        <code className="font-mono text-foreground">Dialog</code>,{" "}
        <code className="font-mono text-foreground">DialogTrigger</code>,{" "}
        <code className="font-mono text-foreground">DialogContent</code>,{" "}
        <code className="font-mono text-foreground">DialogHeader</code>,{" "}
        <code className="font-mono text-foreground">DialogTitle</code>,{" "}
        <code className="font-mono text-foreground">DialogDescription</code>,{" "}
        <code className="font-mono text-foreground">DialogFooter</code>,{" "}
        <code className="font-mono text-foreground">DialogClose</code>. The raw
        utilities are replaced with Folio tokens and the sectioned layout.
      </footer>
    </div>
  );
}
