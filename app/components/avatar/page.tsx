import type { Metadata } from "next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Avatar",
  description:
    "Avatar component: an image element with a fallback for representing the user. API matches toolkit-ui components/shadcn/avatar.",
};

const IMG = "/avatar-sample.jpg";

const parts = [
  {
    name: "Avatar",
    props: "className",
    desc: "Root. Clips children to a circle; set the size with size-6 / size-8 / size-10.",
  },
  {
    name: "AvatarImage",
    props: "src, alt",
    desc: "The image. Hidden until it loads or errors: the fallback shows instead.",
  },
  {
    name: "AvatarFallback",
    props: "delayMs",
    desc: "Shown while the image loads or if it is missing. Use initials or an icon.",
  },
] as const;

const sizeCode = `<Avatar className="size-6">…</Avatar>   {/* sm */}
<Avatar className="size-8">…</Avatar>   {/* default */}
<Avatar className="size-10">…</Avatar>  {/* lg */}`;

const imageCode = `<Avatar>
  <AvatarImage src={user.avatarUrl} alt={user.name} />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`;

const fallbackCode = `<Avatar>
  <AvatarFallback>CN</AvatarFallback>
</Avatar>`;

const statusCode = `<div className="relative inline-flex">
  <Avatar>…</Avatar>
  <span className="absolute bottom-0 right-0 size-2.5 rounded-full
    border-2 border-background bg-success" />
</div>`;

const groupCode = `<div className="flex -space-x-2">
  <Avatar className="size-8 border-2 border-muted">…</Avatar>
  <Avatar className="size-8 border-2 border-muted">…</Avatar>
  <Avatar className="size-8 border-2 border-muted">
    <AvatarFallback>+3</AvatarFallback>
  </Avatar>
</div>`;

const installCode = `import { Avatar, AvatarImage, AvatarFallback } from "@/components/shadcn/avatar";

export function UserAvatar({ user }) {
  return (
    <Avatar>
      <AvatarImage src={user.avatarUrl} alt={user.name} />
      <AvatarFallback>{initials(user.name)}</AvatarFallback>
    </Avatar>
  );
}`;

function StatusAvatar() {
  return (
    <div className="relative inline-flex">
      <Avatar className="size-8">
        <AvatarImage src={IMG} alt="Derek Ho" />
        <AvatarFallback>DH</AvatarFallback>
      </Avatar>
      <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-background bg-success" />
    </div>
  );
}

function AvatarGroup() {
  return (
    <div className="flex -space-x-2">
      <Avatar className="size-8 border-2 border-muted">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 border-2 border-muted">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 border-2 border-muted">
        <AvatarFallback>JL</AvatarFallback>
      </Avatar>
      <Avatar className="size-8 border-2 border-muted">
        <AvatarFallback>+3</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default function AvatarPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Avatar</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        An image element with a fallback for representing the user. Use it for
        people and accounts: the fallback shows initials while the image loads
        or if it is missing.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center gap-4 rounded-xl border border-border bg-muted p-10">
          <Avatar>
            <AvatarImage src={IMG} alt="Derek Ho" />
            <AvatarFallback>DH</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <StatusAvatar />
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens: the fallback surface and the
          status ring remap on theme change, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Sizes</h3>
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="flex items-center justify-center gap-6 bg-muted p-8">
            <Avatar className="size-6">
              <AvatarFallback className="text-xs">CN</AvatarFallback>
            </Avatar>
            <Avatar className="size-8">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="border-t border-border p-3">
            <CodeBlock
              code={sizeCode}
              size="sm"
              className="rounded-lg border border-border-subtle bg-muted"
            />
          </div>
        </div>
        <p className="mt-2 text-small">
          Sizing is a <code className="font-mono">className</code> on the root.{" "}
          <code className="font-mono">size-6</code> (sm),{" "}
          <code className="font-mono">size-8</code> (default),{" "}
          <code className="font-mono">size-10</code> (lg).
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Avatar>
                <AvatarImage src={IMG} alt="Derek Ho" />
                <AvatarFallback>DH</AvatarFallback>
              </Avatar>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={imageCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <Avatar>
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={fallbackCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <StatusAvatar />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={statusCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <AvatarGroup />
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={groupCode}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The image falls back to{" "}
          <code className="font-mono">AvatarFallback</code> on load or error. The
          status dot and the overlapping group are compositions: a positioned
          span and <code className="font-mono">flex -space-x-2</code> with a
          border ring.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.4fr_1.4fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Part</div>
              <div>Props</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {parts.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1.4fr_1.4fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {p.name}
                  </div>
                  <div className="font-mono text-caption">
                    {p.props}
                  </div>
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
              Don&apos;t use an Avatar as a generic image or icon container, and
              don&apos;t ship one without an{" "}
              <code className="font-mono">AvatarFallback</code>: the initials or
              icon are what render while the image loads or if it 404s.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`<Avatar>
  <AvatarImage src={src} alt={name} />
  <AvatarFallback>{initials}</AvatarFallback>
</Avatar>`}
              </code>
            </pre>
          </div>
        </div>
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
        <code className="font-mono text-foreground">
          toolkit-ui/components/shadcn/avatar
        </code>{" "}
        <code className="font-mono text-foreground">Avatar</code>,{" "}
        <code className="font-mono text-foreground">AvatarImage</code>,{" "}
        <code className="font-mono text-foreground">AvatarFallback</code>. The
        raw <code className="font-mono text-foreground">bg-muted</code> fallback
        is replaced with Folio tokens; sizes, the status badge, and groups
        are compositions.
      </footer>
    </div>
  );
}
