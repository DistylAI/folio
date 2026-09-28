import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Table",
  description:
    "Table component -- a lightweight HTML table primitive for simple, static, structured data with no built-in interactivity.",
};

const invoices = [
  { id: "INV-1001", status: "Paid", method: "Card", amount: "$2,500.00" },
  { id: "INV-1002", status: "Pending", method: "Transfer", amount: "$1,200.00" },
  { id: "INV-1003", status: "Paid", method: "Card", amount: "$650.00" },
  { id: "INV-1004", status: "Overdue", method: "Transfer", amount: "$3,100.00" },
];

const composition = [
  { name: "Table", element: "<table>", desc: "Root, wrapped in a horizontal scroll container." },
  { name: "TableHeader", element: "<thead>", desc: "The header section." },
  { name: "TableBody", element: "<tbody>", desc: "The body section holding the rows." },
  { name: "TableFooter", element: "<tfoot>", desc: "Footer section, for totals or summaries." },
  { name: "TableRow", element: "<tr>", desc: "A single row." },
  { name: "TableHead", element: "<th>", desc: "A header cell." },
  { name: "TableCell", element: "<td>", desc: "A body cell." },
  { name: "TableCaption", element: "<caption>", desc: "An accessible caption for the table." },
] as const;

const doCode = `<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV-1001</TableCell>
      <TableCell className="text-right">$2,500.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`;

const installCode = `import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table";

export function Invoices({ rows }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.id}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}`;

export default function TablePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Table</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        A lightweight primitive for simple, static, structured data. It renders
        plain HTML table elements with Folio styling and no built-in
        interactivity.
      </p>

      <div className="mt-4 rounded-xl border border-border bg-primary-subtle p-4">
        <p className="text-small text-foreground">
          Table and Data Table serve different needs. Table is a layout
          primitive for straightforward content. Data Table is a full-featured
          datagrid with sorting, filtering, and pagination.
        </p>
      </div>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-background p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.method}</TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-small">
          Rendered with live Folio tokens. Toggle the theme and it remaps,
          no <code className="font-mono">dark:</code> classes.
        </p>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Variants</h3>
        <div className="grid grid-cols-1 gap-4">
          {/* With caption */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-background p-6">
              <Table>
                <TableCaption>A list of recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 3).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<TableCaption>A list of recent invoices.</TableCaption>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          {/* With footer */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-background p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 3).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell className="text-right">$4,350.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<TableFooter>
  <TableRow>
    <TableCell colSpan={2}>Total</TableCell>
    <TableCell className="text-right">$4,350.00</TableCell>
  </TableRow>
</TableFooter>`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
          {/* Striped rows */}
          <div className="overflow-hidden rounded-xl border border-border">
            <div className="bg-background p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="[&_tr:nth-child(even)]:bg-muted">
                  {invoices.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>{row.method}</TableCell>
                      <TableCell className="text-right">{row.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="border-t border-border p-3">
              <CodeBlock
                code={`<TableBody className="[&_tr:nth-child(even)]:bg-muted">`}
                size="sm"
                className="rounded-lg border border-border-subtle bg-muted"
              />
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          The default table, a caption, a footer for totals, and striped rows for
          scanning longer lists.
        </p>
      </section>

      {/* States */}
      <section id="states" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">States</h3>
        <div className="rounded-xl border border-border bg-background p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.slice(0, 2).map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.id}</TableCell>
                  <TableCell className="text-right">{row.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="mt-2 text-small">
          Table is non-interactive by design and has a single resting state. Rows
          show a subtle hover only to aid scanning, not to imply they are
          clickable. For selection, sorting, or pagination, use Data Table.
        </p>
      </section>

      {/* API */}
      <section id="api" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">API</h3>
        <div className="overflow-x-auto rounded-xl border border-border">
          <div className="min-w-[560px]">
            <div className="grid grid-cols-[1.4fr_1fr_3fr] gap-4 border-b border-border bg-muted px-4 py-2 text-caption font-medium">
              <div>Component</div>
              <div>Element</div>
              <div>Description</div>
            </div>
            <div className="divide-y divide-border">
              {composition.map((c) => (
                <div
                  key={c.name}
                  className="grid grid-cols-[1.4fr_1fr_3fr] gap-4 px-4 py-3"
                >
                  <div className="font-mono text-sm text-foreground">
                    {c.name}
                  </div>
                  <div className="font-mono text-caption">
                    {c.element}
                  </div>
                  <div className="text-description">{c.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p className="mt-2 text-small">
          Each component is a thin wrapper over its HTML element and accepts the
          standard attributes, including{" "}
          <code className="font-mono">colSpan</code> and{" "}
          <code className="font-mono">className</code>.
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
              Don&apos;t reach for Table when the data needs sorting, filtering,
              or pagination. Bolting that behavior onto a plain table rebuilds
              what Data Table already provides, and it tends to drift out of sync.
              Use Data Table for anything interactive.
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
          Use it for simple, static tabular data where the structure itself
          communicates the content.
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
