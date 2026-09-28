import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Flatten a heading's React children down to plain text so we can slugify it.
function nodeText(node: React.ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return nodeText((node as { props: { children?: React.ReactNode } }).props.children);
  }
  return "";
}

// Stable anchor id from heading text. Drops leading section numbers ("1. ") so
// "## 1. Executive Summary" → "executive-summary".
export function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/^[\d.\s]+/, "")
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Styled Markdown -- every element maps to Folio semantic tokens, so the
// rendered docs are themselves a demonstration of the system (and dark mode
// works with zero dark: classes).
export function Markdown({ content }: { content: string }) {
  return (
    <div className="folio-prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-0 mb-3 text-lead text-foreground">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              id={slug(nodeText(children))}
              className="mt-12 mb-4 scroll-mt-8 border-b border-border pb-2 text-lead text-foreground"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              id={slug(nodeText(children))}
              className="mt-8 mb-3 scroll-mt-8 text-title text-foreground"
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="my-4 text-body">{children}</p>
          ),
          a: ({ children, href }) => (
            <a
              href={href}
              className="font-bold text-primary underline decoration-[color-mix(in_srgb,var(--color-border-primary)_40%,transparent)] underline-offset-2 hover:decoration-[--color-border-primary]"
            >
              {children}
            </a>
          ),
          ul: ({ children }) => (
            <ul className="my-4 list-disc pl-6 text-list text-foreground marker:text-muted-foreground">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-4 list-decimal pl-6 text-list text-foreground marker:text-muted-foreground">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          hr: () => <hr className="my-10 border-border" />,
          blockquote: ({ children }) => (
            <blockquote className="my-6 border-l-4 border-primary bg-primary-subtle px-4 py-2 text-blockquote text-foreground">
              {children}
            </blockquote>
          ),
          code: ({ className, children }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <code className="text-code text-foreground">
                  {children}
                </code>
              );
            }
            return (
              <code className="rounded-sm border border-border-subtle bg-secondary px-1.5 py-0.5 text-inline-code text-foreground">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border border-border bg-muted p-4">
              {children}
            </pre>
          ),
          table: ({ children }) => (
            <div className="my-6 overflow-x-auto rounded-xl border border-border">
              <table className="w-full border-collapse text-sm">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-secondary">{children}</thead>
          ),
          th: ({ children }) => (
            <th className="border-b border-border px-4 py-2.5 text-left text-caption font-semibold text-foreground">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-border-subtle px-4 py-2.5 align-top text-caption text-foreground">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
