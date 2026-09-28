import type { ReactNode } from "react";
import { CircleAlert } from "lucide-react";
import { CodeBlock } from "@/components/CodeBlock";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
}

// Inline `code` spans and [label](url) markdown links within a paragraph.
const LINK_RE = /^\[([^\]]+)\]\(([^)]+)\)$/;

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text
    .split(/(`[^`]+`|\[[^\]]+\]\([^)]+\))/g)
    .map((part, i) => {
      const key = `${keyPrefix}-${i}`;
      if (part.length > 1 && part.startsWith("`") && part.endsWith("`")) {
        return (
          <code
            key={key}
            className="rounded-sm bg-secondary px-1 py-0.5 font-mono text-caption text-foreground"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      const link = LINK_RE.exec(part);
      const label = link?.[1];
      const href = link?.[2];
      if (label && href) {
        const external = /^https?:\/\//.test(href);
        return (
          <a
            key={key}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
          >
            {label}
          </a>
        );
      }
      return part;
    });
}

// Split a non-code segment into paragraphs on blank lines.
function renderProse(text: string, keyPrefix: string, out: ReactNode[]) {
  text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((para, i) => {
      const key = `${keyPrefix}-${i}`;
      out.push(
        <p key={key} className="mb-2 last:mb-0">
          {renderInline(para, key)}
        </p>,
      );
    });
}

// Parse assistant content: fenced code blocks → CodeBlock, the rest → prose.
function renderAssistant(content: string): ReactNode[] {
  const out: ReactNode[] = [];
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let block = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    renderProse(content.slice(lastIndex, match.index), `t-${block}`, out);
    const code = (match[2] ?? "").replace(/\n$/, "");
    out.push(
      <div key={`c-${block}`} className="my-2">
        <CodeBlock
          code={code}
          className="rounded-lg border border-border bg-muted"
        />
      </div>,
    );
    lastIndex = regex.lastIndex;
    block += 1;
  }
  renderProse(content.slice(lastIndex), `t-${block}`, out);
  return out;
}

export function MessageBubble({ role, content, error }: MessageBubbleProps) {
  if (role === "user") {
    return (
      <div className="flex flex-col items-end gap-1">
        <p className="px-0.5 text-caption">You</p>
        <div className="max-w-[75%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-primary-subtle px-4 py-2.5 text-sm leading-relaxed text-primary">
          {content}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-start gap-1">
        <p className="px-0.5 text-caption">Meno</p>
        <div className="flex max-w-[90%] items-start gap-2 rounded-2xl rounded-bl-sm border border-destructive bg-destructive-subtle px-4 py-2.5 text-sm leading-relaxed text-destructive">
          <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden />
          <span>{content}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <p className="px-0.5 text-caption">Meno</p>
      <div className="max-w-[90%] rounded-2xl rounded-bl-sm border border-border bg-muted px-4 py-2.5 text-sm leading-relaxed text-foreground">
        {renderAssistant(content)}
      </div>
    </div>
  );
}
