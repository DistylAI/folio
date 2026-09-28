import { Spinner } from "@/components/shadcn/spinner";

export function LoadingBubble() {
  return (
    <div className="flex flex-col items-start gap-1">
      <p className="px-0.5 text-caption">Meno</p>
      <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-muted px-4 py-3">
        <Spinner className="size-4" />
        <span className="text-sm text-muted-foreground">Thinking…</span>
      </div>
    </div>
  );
}
