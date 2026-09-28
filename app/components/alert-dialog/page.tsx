import type { Metadata } from "next";
import { TriangleAlert } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { Button } from "@/components/shadcn/button";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Alert Dialog",
  description:
    "Alert Dialog component -- a modal that interrupts the user with a critical, irreversible decision and blocks interaction until confirmed or cancelled.",
};

const composition = [
  { name: "AlertDialog", desc: "Root that controls the open state." },
  { name: "AlertDialogTrigger", desc: "The element that opens the dialog." },
  { name: "AlertDialogContent", desc: "The modal surface, with a blocking overlay." },
  { name: "AlertDialogHeader", desc: "Wraps the title and description." },
  { name: "AlertDialogFooter", desc: "Wraps the two actions, aligned right." },
  { name: "AlertDialogTitle", desc: "The required heading naming the decision." },
  { name: "AlertDialogDescription", desc: "Explains the consequence of the action." },
  { name: "AlertDialogAction", desc: "The confirm button. Takes Button props: set variant=\"destructive\" for danger, loading and loadingText while it works." },
  { name: "AlertDialogCancel", desc: "The cancel button. Takes Button props, variant defaults to outline. Always present." },
] as const;

const doCode = `<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete account</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Delete this account?</AlertDialogTitle>
      <AlertDialogDescription>
        This cannot be undone. All data is removed permanently.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="destructive">Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>`;

const installCode = `import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shadcn/alert-dialog";
import { Button } from "@/components/shadcn/button";

export function ConfirmDelete() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}`;

// Static, inline replica of AlertDialogContent for the variants and states,
// since a modal cannot be shown open at rest.
function MockAlert({
  destructive,
  hover,
}: {
  destructive?: boolean;
  hover?: "confirm" | "cancel";
}) {
  const ring = "ring-2 ring-offset-2 ring-offset-[--color-background-subtle]";
  return (
    <div className="grid w-full max-w-sm gap-4 rounded-2xl border border-border bg-background p-6 shadow-lg">
      <div className="flex flex-col gap-2">
        {destructive && (
          <span className="flex size-9 items-center justify-center rounded-full bg-destructive-subtle">
            <TriangleAlert className="size-4 text-destructive" />
          </span>
        )}
        <p className="text-lg font-semibold text-foreground">
          {destructive ? "Delete chat?" : "Discard changes?"}
        </p>
        <p className="text-description">
          {destructive
            ? "This permanently deletes the conversation and its history. This cannot be undone."
            : "Your edits will be lost if you leave without saving."}
        </p>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          className={hover === "cancel" ? `${ring} ring-ring` : ""}
        >
          Cancel
        </Button>
        <Button
          variant={destructive ? "destructive" : "default"}
          className={
            hover === "confirm"
              ? `${ring} ${destructive ? "ring-destructive" : "ring-ring"}`
              : ""
          }
        >
          {destructive ? "Delete" : "Continue"}
        </Button>
      </div>
    </div>
  );
}

export default function AlertDialogPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Alert Dialog</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A modal that interrupts the reader with a critical decision. It blocks all
        other interaction and requires an explicit confirm or cancel before
        anything else can happen.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Alert Dialog is for destructive or irreversible actions only. For
          general content, forms, and non-critical interactions, use Dialog. An
          Alert Dialog always carries two explicit actions, confirm and cancel.
          Never ship a single-button Alert Dialog.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">Show dialog</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. It permanently deletes your
                  account and removes your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Press the button to open the real
          modal, no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <MockAlert />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<AlertDialogAction>Continue</AlertDialogAction>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <MockAlert destructive />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<AlertDialogAction variant="destructive">
  Delete
</AlertDialogAction>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The default confirms a serious but neutral action. The destructive
          variant styles the confirm button with the danger token for deletes and
          removals.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <Button variant="outline">Delete account</Button>
            <p className="text-caption">Closed. Only the trigger shows.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <MockAlert />
            <p className="text-caption">Open. The modal blocks the page.</p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <MockAlert hover="confirm" />
            <p className="text-caption">
              Confirm hover (shown statically).
            </p>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-muted p-8">
            <MockAlert hover="cancel" />
            <p className="text-caption">
              Cancel hover (shown statically).
            </p>
          </div>
        </div>
        <p className="mt-2 text-small">
          The dialog traps focus while open, so the page behind it cannot be
          reached until the reader confirms or cancels.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.8fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Component</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {composition.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1.8fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {c.name}
                  </div>
                  <div className="text-description">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Compose the parts inside one{" "}
          <code className="font-mono">AlertDialog</code>. Both{" "}
          <code className="font-mono">AlertDialogAction</code> and{" "}
          <code className="font-mono">AlertDialogCancel</code> close the dialog on
          click.
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
              Don&apos;t interrupt with an Alert Dialog for something reversible
              or low-stakes. Stopping the reader to confirm a harmless, undoable
              action trains them to dismiss the dialog without reading it. Use a
              Dialog for ordinary content, or a Toast to confirm after the fact.
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
          Use it when the action cannot be undone and the consequence is
          significant, like deleting an account, removing data, or cancelling a
          subscription.
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
