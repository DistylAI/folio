"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/shadcn/button";
import { ChatInput } from "./ChatInput";
import { MessageBubble } from "./MessageBubble";
import { LoadingBubble } from "./LoadingBubble";
import { EmptyState } from "./EmptyState";

type Message = {
  role: "user" | "assistant";
  content: string;
  error?: boolean;
};

interface ChatShellProps {
  systemPrompt?: string;
  placeholder?: string;
  onSend?: (messages: Message[], userMessage: string) => Promise<string>;
}

export function ChatShell({
  systemPrompt,
  placeholder,
  onSend,
}: ChatShellProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // When an assistant message arrives, bring the TOP of it to the top of the
  // message container. Scoped strictly to the container's own scroll -- we never
  // call scrollIntoView (it bubbles up and scrolls the page/window too); instead
  // we adjust the container's scrollTop by the gap between the message's top and
  // the container's top. For user messages, scroll the container to the bottom.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const last = messages[messages.length - 1];
    const el = lastMessageRef.current;
    if (last?.role === "assistant" && el) {
      const delta = el.getBoundingClientRect().top - list.getBoundingClientRect().top;
      list.scrollTo({ top: list.scrollTop + delta, behavior: "smooth" });
    } else {
      list.scrollTo({ top: list.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  // Keep the loading bubble in view while a reply streams in.
  useEffect(() => {
    if (loading && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [loading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setLoading(true);
    try {
      let reply: string;
      if (onSend) {
        reply = await onSend(next, text);
      } else {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next, systemPrompt }),
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        reply = data.reply;
      }
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMessages([
        ...next,
        { role: "assistant", content: `Error: ${msg}`, error: true },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const hasContent = messages.length > 0 || loading;

  return (
    <div
      className={cn(
        "flex h-[560px] flex-col overflow-hidden rounded-2xl bg-background",
        hasContent && "border border-border",
      )}
    >
      <header
        className={cn(
          "flex shrink-0 items-center justify-between px-4 py-3",
          hasContent && "border-b border-border",
        )}
      >
        <div className="flex items-center gap-2">
          <div className="size-2 rounded-full bg-primary" />
          <span className="text-sm font-medium text-foreground">
            Context view
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMessages([])}
          className="gap-1.5 text-muted-foreground"
        >
          <Plus size={12} aria-hidden /> New chat
        </Button>
      </header>

      <div
        ref={listRef}
        className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-6"
      >
        {messages.length === 0 && !loading ? (
          <EmptyState onChipClick={handleSend} />
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              ref={i === messages.length - 1 ? lastMessageRef : undefined}
            >
              <MessageBubble role={m.role} content={m.content} error={m.error} />
            </div>
          ))
        )}
        {loading && <LoadingBubble />}
      </div>

      <div className="shrink-0 border-t border-border px-4 py-3">
        <ChatInput
          onSend={handleSend}
          disabled={loading}
          placeholder={placeholder ?? "Ask the context view…"}
        />
      </div>
    </div>
  );
}
