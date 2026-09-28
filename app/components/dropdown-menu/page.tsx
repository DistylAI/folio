import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { AccountMenu, ViewMenu } from "./DropdownDemos";

export const metadata: Metadata = {
  title: "Dropdown Menu",
  description:
    "Dropdown Menu: a menu of actions or options triggered by a button. API matches @distylai/toolkit-ui DropdownMenu.",
};

const anatomyCode = `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Open</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="start" className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <User />
      Profile
      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`;

const installCode = `import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/shadcn/dropdown-menu";`;

export default function DropdownMenuPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Dropdown Menu</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Displays a menu of actions or options triggered by a button. Use it for
        contextual actions, account menus, and view toggles.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex min-h-[20rem] items-start justify-center rounded-xl border border-border bg-muted p-10">
          <AccountMenu />
        </div>
        <p className="mt-2 text-small">
          Live and interactive: open it, then toggle the theme. The panel,
          item focus highlight, and separators all remap from Folio tokens,
          no <code className="font-mono">dark:</code> classes. Focus is trapped
          and arrow keys navigate.
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
          <code className="font-mono">DropdownMenuLabel</code>,{" "}
          <code className="font-mono">DropdownMenuSeparator</code>, and{" "}
          <code className="font-mono">DropdownMenuShortcut</code> structure the
          panel; a leading Lucide icon in an{" "}
          <code className="font-mono">Item</code> is sized automatically.
        </p>
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">
          Checkbox &amp; radio items
        </h3>
        <div className="flex min-h-[20rem] items-start justify-center rounded-xl border border-border bg-muted p-10">
          <ViewMenu />
        </div>
        <p className="mt-2 text-small">
          <code className="font-mono">DropdownMenuCheckboxItem</code> and{" "}
          <code className="font-mono">DropdownMenuRadioGroup</code> /{" "}
          <code className="font-mono">RadioItem</code> hold selection state with
          token-driven check and dot indicators.
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
              Don&apos;t import from{" "}
              <code className="font-mono">@radix-ui/*</code>{" "}
              directly and restyle inline: that&apos;s how unstyled,
              off-token menus creep in. Use the Folio wrapper. And
              don&apos;t use it for primary navigation; that&apos;s a nav or a
              Select.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Import the Folio wrapper, not the Radix primitive
import { DropdownMenu } from "@/components/shadcn/dropdown-menu";`}
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
          Keyboard navigation, typeahead, focus trapping, and submenus come for
          free. Compose only the parts you need.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        API matches{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        DropdownMenu, the full set (
        <code className="font-mono text-foreground">DropdownMenu</code>,{" "}
        <code className="font-mono text-foreground">Trigger</code>,{" "}
        <code className="font-mono text-foreground">Content</code>,{" "}
        <code className="font-mono text-foreground">Item</code>,{" "}
        <code className="font-mono text-foreground">CheckboxItem</code>,{" "}
        <code className="font-mono text-foreground">RadioGroup</code>,{" "}
        <code className="font-mono text-foreground">Sub*</code>, …). Only the
        class strings differ: the panel uses{" "}
        <code className="font-mono text-foreground">bg-background</code> and
        items highlight with{" "}
        <code className="font-mono text-foreground">bg-secondary</code>.
      </footer>
    </div>
  );
}
