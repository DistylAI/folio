import type { Metadata } from "next";
import { CodeBlock } from "@/components/CodeBlock";
import { DataTableDemo } from "./DataTableDemo";

export const metadata: Metadata = {
  title: "Data Table",
  description:
    "Data Table -- powerful tables and datagrids built on TanStack Table. The canonical stack at Distyl (DataTable + @tanstack/react-table).",
};

const columnsCode = `import { type ColumnDef } from "@tanstack/react-table";

type Payment = { id: string; status: string; email: string; amount: number };

const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        Email <ArrowUpDown />
      </Button>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => formatCurrency(row.getValue("amount")),
  },
];`;

const installCode = `import { useDataTable } from "@/platform/components/DataTable/DataTable";
// (or useReactTable directly for a standalone table)

const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: { sorting, columnFilters, rowSelection },
  enableRowSelection: true,
});`;

export default function DataTablePage() {
  return (
    <div>
      <p className="mb-2 text-caption">Components</p>
      <h1 className="text-lead text-foreground">Data Table</h1>
      <p className="mt-3 max-w-2xl text-body text-foreground">
        Powerful tables and datagrids built using TanStack Table. Use it for
        sortable, filterable, selectable rows of structured data.
      </p>

      {/* Preview */}
      <section id="preview" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Preview</h3>
        <div className="rounded-xl border border-border bg-muted p-6">
          <div className="rounded-xl border border-border bg-background p-4">
            <DataTableDemo />
          </div>
        </div>
        <p className="mt-2 text-small">
          Live and interactive -- sort by Email, filter, select rows, page. Toggle
          the theme: the header, row borders, hover, and selected-row tint all
          remap from Folio tokens, no <code className="font-mono">dark:</code>{" "}
          classes.
        </p>
      </section>

      {/* Pattern */}
      <section id="pattern" className="scroll-mt-8">
        <h3 className="mt-12 mb-4 text-lead text-foreground">Pattern</h3>
        <p className="mb-4 max-w-2xl text-body text-foreground">
          A Data Table is <code className="font-mono">columns</code> +{" "}
          <code className="font-mono">data</code> fed to{" "}
          <code className="font-mono">useReactTable</code>, rendered through the
          Folio <code className="font-mono">Table</code> primitive with{" "}
          <code className="font-mono">flexRender</code>. Define columns
          declaratively:
        </p>
        <CodeBlock
          code={columnsCode}
          className="rounded-xl border border-border bg-muted"
        />
        <p className="mt-2 text-small">
          Sorting, filtering, row selection, and pagination are TanStack row
          models you opt into -- the markup stays the same.
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
                { name: "columns", desc: "A ColumnDef array defining each column's header, cell, and sorting or selection behavior." },
                { name: "useReactTable", desc: "TanStack hook that wires data, columns, and state (sorting, filters, pagination) into a table instance." },
                { name: "flexRender", desc: "Renders a column's header or cell definition, whether it is a string or a component." },
                { name: "Table parts", desc: "Table / TableHeader / TableBody / TableRow / TableCell primitives that render the instance as markup." },
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
              Don&apos;t reach for{" "}
              <code className="font-mono">MaterialReactTable</code> or the{" "}
              <code className="font-mono">MUI DataGrid</code> for new tables --
              they pull in MUI, bypass Folio tokens, and can&apos;t theme
              with the design system. TanStack Table is the canonical stack.
            </p>
          </div>
          <div className="rounded-xl border border-success bg-success-subtle p-5">
            <div className="mb-2 text-sm font-bold text-success">Do</div>
            <pre className="overflow-x-auto">
              <code className="font-mono text-caption leading-6 text-foreground">
                {`// Headless TanStack + the Folio Table primitive
const table = useReactTable({ data, columns, ... });
// render <Table> / <TableRow> / <TableCell>`}
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
          In platform, prefer{" "}
          <code className="font-mono">useDataTable</code> from{" "}
          <code className="font-mono">
            @/platform/components/DataTable
          </code>{" "}
          -- it auto-adds the selection column and wires the shared toolbar.
          Standalone tables can call <code className="font-mono">useReactTable</code>{" "}
          directly.
        </p>
      </section>

      <footer className="mt-16 border-t border-border pt-6 text-small">
        Built on{" "}
        <code className="font-mono text-foreground">@tanstack/react-table</code>{" "}
        with the Folio{" "}
        <code className="font-mono text-foreground">Table</code> primitive
        (the same code as{" "}
        <code className="font-mono text-foreground">
          @distylai/toolkit-ui
        </code>{" "}
        and the platform{" "}
        <code className="font-mono text-foreground">DataTable</code> pattern).
        Raw <code className="font-mono text-foreground">muted</code> /{" "}
        <code className="font-mono text-foreground">primary</code> utilities are
        replaced with Folio tokens.
      </footer>
    </div>
  );
}
