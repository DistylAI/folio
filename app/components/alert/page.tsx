import type { Metadata } from "next";
import { CircleAlert, CircleCheck, Info, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/shadcn/alert";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Alert",
  description:
    "Alert component -- a callout for user attention. API matches toolkit-ui components/shadcn/alert.",
};

const variants = [
  {
    key: "default",
    code: `<Alert>
  <CircleAlert />
  <AlertTitle>Changes saved</AlertTitle>
  <AlertDescription>Your edits are live.</AlertDescription>
</Alert>`,
  },
  {
    key: "muted",
    code: `<Alert variant="muted">
  <Info />
  <AlertTitle>Draft</AlertTitle>
  <AlertDescription>Only you can see this page.</AlertDescription>
</Alert>`,
  },
  {
    key: "destructive",
    code: `<Alert variant="destructive">
  <CircleAlert />
  <AlertTitle>Something went wrong</AlertTitle>
  <AlertDescription>Your session has expired.</AlertDescription>
</Alert>`,
  },
  {
    key: "warning",
    code: `<Alert variant="warning">
  <TriangleAlert />
  <AlertTitle>Subscription expiring</AlertTitle>
  <AlertDescription>Renew within 3 days.</AlertDescription>
</Alert>`,
  },
  {
    key: "success",
    code: `// No success variant: color the default alert with tokens
<Alert className="border-success/30 bg-success-subtle text-success [&>svg]:text-success">
  <CircleCheck />
  <AlertTitle>Payment received</AlertTitle>
  <AlertDescription>Your plan is now active.</AlertDescription>
</Alert>`,
  },
  {
    key: "info",
    code: `// No info variant: color the default alert with tokens
<Alert className="border-info/30 bg-info-subtle text-info [&>svg]:text-info">
  <Info />
  <AlertTitle>A new version is available</AlertTitle>
  <AlertDescription>Refresh to get the latest.</AlertDescription>
</Alert>`,
  },
] as const;

const installCode = `import { Alert, AlertTitle, AlertDescription } from "@/components/shadcn/alert";
import { CircleAlert } from "lucide-react";

export function SavedAlert() {
  return (
    <Alert>
      <CircleAlert />
      <AlertTitle>Changes saved</AlertTitle>
      <AlertDescription>Your edits are live.</AlertDescription>
    </Alert>
  );
}`;

export default function AlertPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Alert</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays a callout for user attention. Use it for inline, persistent
        messages -- not for transient toasts or blocking dialogs.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <Alert className="max-w-xl">
            <CircleCheck />
            <AlertTitle>Success! Your changes have been saved.</AlertTitle>
            <AlertDescription>
              This is an alert with an icon, title, and description.
            </AlertDescription>
          </Alert>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens -- surface, border, and every
          variant color remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="space-y-4">
          {variants.map((v) => (
            <div
              key={v.key}
              className="overflow-hidden rounded-xl border border-border"
            >
              <div className="bg-muted p-8">
                {v.key === "default" && (
                  <Alert>
                    <CircleAlert />
                    <AlertTitle>Heads up</AlertTitle>
                    <AlertDescription>
                      This is the default alert -- neutral surface and text.
                    </AlertDescription>
                  </Alert>
                )}
                {v.key === "muted" && (
                  <Alert variant="muted">
                    <Info />
                    <AlertTitle>Draft</AlertTitle>
                    <AlertDescription>
                      Only you can see this page. Publish it to share it.
                    </AlertDescription>
                  </Alert>
                )}
                {v.key === "destructive" && (
                  <Alert variant="destructive">
                    <CircleAlert />
                    <AlertTitle>Something went wrong!</AlertTitle>
                    <AlertDescription>
                      Your session has expired. Please log in again.
                    </AlertDescription>
                  </Alert>
                )}
                {v.key === "warning" && (
                  <Alert variant="warning">
                    <TriangleAlert />
                    <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
                    <AlertDescription>
                      Renew now to avoid any service interruption.
                    </AlertDescription>
                  </Alert>
                )}
                {v.key === "success" && (
                  <Alert className="border-success/30 bg-success-subtle text-success [&>svg]:text-success">
                    <CircleCheck />
                    <AlertTitle>Payment received</AlertTitle>
                    <AlertDescription>
                      Your Pro plan is now active. Enjoy the new features.
                    </AlertDescription>
                  </Alert>
                )}
                {v.key === "info" && (
                  <Alert className="border-info/30 bg-info-subtle text-info [&>svg]:text-info">
                    <Info />
                    <AlertTitle>A new version is available</AlertTitle>
                    <AlertDescription>
                      Refresh the page to get the latest updates.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              <div className="border-t border-border p-3">
                <CodeBlock
                  code={v.code}
                  size="sm"
                  className="rounded-lg border border-border-subtle bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-2 text-small">
          Every status variant tints its surface, softens the border to the
          feedback color, and colors the icon and title to match -- the body
          stays default for readability. Alert has no success or info variant,
          so those two use the same recipe with a{" "}
          <code className="font-mono">className</code>. The same recipe drives the Toast, so
          the two read as one system. All via tokens, so dark mode is automatic.
        </p>
      </section>

      {/* Composition */}
      <section id="composition" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Composition</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex items-center rounded-xl border border-border bg-muted p-8">
            <Alert>
              <AlertTitle>Title only</AlertTitle>
              <AlertDescription>
                No icon -- the title and description sit flush left.
              </AlertDescription>
            </Alert>
          </div>
          <div className="flex items-center rounded-xl border border-border bg-muted p-8">
            <Alert>
              <CircleAlert />
              <AlertDescription>
                A description only. No title. Useful for terse, single-line
                notices.
              </AlertDescription>
            </Alert>
          </div>
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">AlertTitle</code> and{" "}
          <code className="font-mono">AlertDescription</code> are both optional --
          drop the icon, the title, or both. With no icon the text fills the
          full width.
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
                { name: "Alert", desc: "Root container. The variant prop (\"default\" | \"muted\" | \"destructive\" | \"warning\") sets the color." },
                { name: "AlertTitle", desc: "The bold heading line." },
                { name: "AlertDescription", desc: "Supporting body text beneath the title." },
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
              Don&apos;t color the destructive alert with{" "}
              <code className="font-mono">
                border-destructive dark:border-destructive
              </code>{" "}
              -- the legacy alert.tsx does exactly this. Hardcoded{" "}
              <code className="font-mono">dark:</code> classes drift the moment
              the brand changes.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// One variant prop, token-driven, theme-agnostic
<Alert variant="destructive">…</Alert>`}
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
          Drop the icon in as the first child -- the{" "}
          <code className="font-mono">[&amp;&gt;svg]</code> rules position it and
          pad the text. Folio tokens are baked in.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          toolkit-ui/components/shadcn/alert
        </code>{" "}
        -- <code className="font-mono text-foreground">Alert</code>,{" "}
        <code className="font-mono text-foreground">AlertTitle</code>,{" "}
        <code className="font-mono text-foreground">AlertDescription</code>{" "}
        with the <code className="font-mono text-foreground">variant</code>{" "}
        axis. The source file&apos;s <code className="font-mono text-foreground">dark:</code>{" "}
        class violations are replaced with Folio tokens.
      </footer>
    </div>
  );
}
