import type { Metadata } from "next";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/shadcn/input-otp";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Input OTP",
  description:
    "Input OTP component -- a segmented one-time-password field for entering short numeric or alphanumeric codes, slot by slot.",
};

// Defined locally rather than imported from "input-otp": that package calls
// React.createContext at module load, which a server component cannot evaluate.
// These match the package's exported REGEXP_ONLY_* constants.
const REGEXP_ONLY_DIGITS = "^\\d+$";
const REGEXP_ONLY_DIGITS_AND_CHARS = "^[a-zA-Z0-9]+$";

const props = [
  {
    name: "maxLength",
    type: "number",
    def: "required",
    desc: "Number of slots, and the length of the code.",
  },
  {
    name: "value",
    type: "string",
    def: "undefined",
    desc: "The current code when the field is controlled.",
  },
  {
    name: "onChange",
    type: "(value: string) => void",
    def: "undefined",
    desc: "Called with the new code on every keystroke and paste.",
  },
  {
    name: "pattern",
    type: "REGEXP_ONLY_DIGITS | REGEXP_ONLY_CHARS | REGEXP_ONLY_DIGITS_AND_CHARS",
    def: "undefined",
    desc: "Restricts allowed characters. Use the exported regex constants.",
  },
  {
    name: "disabled",
    type: "boolean",
    def: "false",
    desc: "Dims the field and blocks entry.",
  },
] as const;

const doCode = `<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`;

const installCode = `import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/shadcn/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export function VerifyCode() {
  return (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}`;

export default function InputOTPPage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Input OTP</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A segmented field for entering short codes one slot at a time. It
        auto-advances as you type and handles pasting a full code at once.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="flex items-center justify-center rounded-xl border border-border bg-muted p-10">
          <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Click a slot and type, no{" "}
          <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`pattern={REGEXP_ONLY_DIGITS_AND_CHARS}`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Numeric is the common case for verification codes. Alphanumeric accepts
          letters and digits for codes that mix both.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* Default */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Default. Empty, at rest.</p>
            </div>
          </div>
          {/* Active */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot
                    index={1}
                    className="z-10 border-primary ring-1 ring-ring"
                  />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Active. The focused slot rings (shown statically here).
              </p>
            </div>
          </div>
          {/* Filled */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                defaultValue="2468"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">Filled. A complete code.</p>
            </div>
          </div>
          {/* Error */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS}
                defaultValue="1357"
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="border-destructive text-destructive"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <p className="text-caption">
                Error. The code was rejected.
              </p>
            </div>
          </div>
          {/* Disabled */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="flex items-center justify-center bg-muted p-8">
              <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} disabled>
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<InputOTP disabled>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Active highlights the slot taking input. Filled, error, and disabled
          read across the whole field.
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
          Slots are composed with{" "}
          <code className="font-mono">InputOTPGroup</code>,{" "}
          <code className="font-mono">InputOTPSlot</code>, and{" "}
          <code className="font-mono">InputOTPSeparator</code>.
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
              Don&apos;t use an OTP field for general short text. It carries a
              specific interaction contract, auto-advance and full-code paste,
              that will confuse people when applied to a name, a code word, or
              anything that is not entered slot by slot. Use a plain Input for
              those.
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
          Use it for verification codes, PIN entry, and any segmented numeric
          input where slot-by-slot entry is expected.
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
