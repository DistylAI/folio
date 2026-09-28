"use client";

import { useRef, useState } from "react";
import { ArrowUp, Mic, Plus } from "lucide-react";
import { Box } from "@/components/folio/box";
import { Button } from "@/components/shadcn/button";
import { Stack } from "@/components/folio/stack";
import { Text } from "@/components/folio/text";
import { Textarea } from "@/components/shadcn/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  onAttach?: () => void;
  onVoice?: () => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  onAttach = () => {},
  onVoice = () => {},
  disabled,
  placeholder,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const ref = useRef<HTMLTextAreaElement>(null);

  const send = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSend(text);
    setValue("");
    if (ref.current) ref.current.style.height = "auto";
  };

  return (
    <Box>
      <Stack
        direction="row"
        align="end"
        gap="sm"
        className="rounded-2xl border border-border bg-muted px-2 py-2 transition-colors focus-within:border-primary"
      >
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onAttach}
          className="shrink-0 text-muted-foreground"
        >
          <Plus aria-hidden />
          <span className="sr-only">Attach</span>
        </Button>
        <Textarea
          ref={ref}
          value={value}
          rows={1}
          disabled={disabled}
          placeholder={placeholder}
          onChange={(e) => setValue(e.target.value)}
          onInput={(e) => {
            e.currentTarget.style.height = "auto";
            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          // Seamless inside the framed wrapper: strip the Textarea's own
          // border/bg/shadow/ring so the wrapper owns the focus state.
          className="min-h-0 max-h-[120px] min-w-0 flex-1 resize-none border-0 bg-transparent px-0 py-1.5 shadow-none focus-visible:border-0 focus-visible:ring-0"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onVoice}
          className="shrink-0 text-muted-foreground"
        >
          <Mic aria-hidden />
          <span className="sr-only">Voice input</span>
        </Button>
        <Button
          type="button"
          size="icon-sm"
          onClick={send}
          disabled={disabled || !value.trim()}
          className="shrink-0"
        >
          <ArrowUp aria-hidden />
          <span className="sr-only">Send message</span>
        </Button>
      </Stack>
      <Text size="xs" align="center" color="subtle" className="mt-2">
        Enter to send · Shift+Enter for newline
      </Text>
    </Box>
  );
}
