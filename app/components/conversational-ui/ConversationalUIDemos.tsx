"use client";

import { useState } from "react";
import { ChatShell } from "@/components/ConversationalUI/ChatShell";
import { ChatInput } from "@/components/ConversationalUI/ChatInput";
import { MessageBubble } from "@/components/ConversationalUI/MessageBubble";
import { LoadingBubble } from "@/components/ConversationalUI/LoadingBubble";
import { EmptyState } from "@/components/ConversationalUI/EmptyState";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs";

const panelClass =
  "overflow-hidden rounded-b-xl rounded-tr-xl border border-border";

export function VariantShell() {
  const mockSend = async () => {
    await new Promise((r) => setTimeout(r, 600));
    return "This response came from a custom API layer -- not /api/chat. Tower and Platform use this pattern to own their own model calls.";
  };

  return (
    <Tabs defaultValue="default" className="w-full">
      <TabsList variant="underline">
        <TabsTrigger variant="underline" value="default">
          Default
        </TabsTrigger>
        <TabsTrigger variant="underline" value="system">
          With system prompt
        </TabsTrigger>
        <TabsTrigger variant="underline" value="custom">
          Custom API layer
        </TabsTrigger>
      </TabsList>

      <TabsContent value="default">
        <div className={panelClass}>
          <ChatShell />
        </div>
        <p className="mt-2 text-small">
          No props. Uses /api/chat with the default system prompt.
        </p>
      </TabsContent>

      <TabsContent value="system">
        <div className={panelClass}>
          <ChatShell
            systemPrompt="You are analyzing Distyl pipeline data. Answer questions about entities, risks, and relationships in the data graph."
            placeholder="Ask about this pipeline…"
          />
        </div>
        <p className="mt-2 text-small">
          systemPrompt scopes the assistant to a specific product context.
          placeholder replaces the default input hint.
        </p>
      </TabsContent>

      <TabsContent value="custom">
        <div className={panelClass}>
          <ChatShell onSend={mockSend} placeholder="Custom API layer active…" />
        </div>
        <p className="mt-2 text-small">
          onSend bypasses /api/chat entirely. The component doesn&apos;t know or
          care where the reply comes from.
        </p>
      </TabsContent>
    </Tabs>
  );
}

export function StatesDemo() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Empty</p>
        <div
          className="overflow-hidden rounded-xl border border-border"
          style={{ height: 320 }}
        >
          <div className="flex h-full flex-col">
            <EmptyState onChipClick={() => {}} />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Loading</p>
        <div
          className="overflow-hidden rounded-xl border border-border"
          style={{ height: 320 }}
        >
          <div className="flex h-full flex-col gap-5 overflow-y-auto px-5 py-6">
            <MessageBubble
              role="user"
              content="What are the risk signals in this dataset?"
            />
            <LoadingBubble />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-foreground">Error</p>
        <div
          className="overflow-hidden rounded-xl border border-border"
          style={{ height: 320 }}
        >
          <div className="flex h-full flex-col gap-5 overflow-y-auto px-5 py-6">
            <MessageBubble role="user" content="Summarize this pipeline." />
            <MessageBubble role="assistant" error content="Error: API error: 401" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatInputDemo() {
  const [log, setLog] = useState<string[]>([]);
  return (
    <div className="flex flex-col gap-4">
      <ChatInput
        onSend={(msg) => setLog((prev) => [msg, ...prev])}
        placeholder="Type something and send…"
      />
      {log.length > 0 && (
        <div className="flex flex-col gap-2">
          {log.map((m, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-muted px-4 py-2.5 text-sm text-muted-foreground"
            >
              {m}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function MessageBubbleDemo() {
  return (
    <div className="flex flex-col gap-5">
      <MessageBubble
        role="user"
        content="What are the risk signals in this dataset?"
      />
      <MessageBubble
        role="assistant"
        content={
          "There are three primary risk signals:\n\nFirst, the counterparty exposure in the derivatives book exceeds the 15% threshold set in the risk policy.\n\nSecond, two entities flagged as high-risk are connected to the primary party via undisclosed intermediaries."
        }
      />
      <MessageBubble
        role="assistant"
        content={
          "Use the `riskScore` field on the Entity type to filter above threshold."
        }
      />
      <MessageBubble
        role="assistant"
        content={
          "Here's a query to pull flagged entities:\n\n```typescript\nconst flagged = entities.filter(\n  (e) => e.riskScore > 0.7\n);\n```"
        }
      />
      <MessageBubble role="assistant" error content="Error: API error: 401" />
    </div>
  );
}

export function EmptyStateDemo() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border"
      style={{ height: 280 }}
    >
      <div className="flex h-full flex-col">
        <EmptyState onChipClick={() => {}} />
      </div>
    </div>
  );
}
