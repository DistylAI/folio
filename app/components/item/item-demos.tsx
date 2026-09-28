"use client";

import * as React from "react";
import {
  ChevronRight,
  Folder,
  Settings,
  Star,
  Trash2,
} from "lucide-react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/shadcn/item";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/shadcn/avatar";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Checkbox } from "@/components/shadcn/checkbox";

// Interactive Item demos live here because the rows take an onClick (a
// function that cannot cross the server boundary). Rows with an interactive
// child (checkbox, action button) render as a div to avoid nesting a button
// inside a button.
const noop = () => {};

// ItemMedia moves to the top when the row has a description. A small icon
// stays centered in these rows.
const centeredMedia =
  "group-has-[[data-slot=item-description]]/item:translate-y-0 group-has-[[data-slot=item-description]]/item:self-center";

export function ItemListPreview() {
  return (
    <div className="w-full max-w-sm rounded-xl border border-border bg-background p-1">
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia className={centeredMedia}>
            <Settings />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>General</ItemTitle>
            <ItemDescription>Workspace name and defaults</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </button>
      </Item>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia className={centeredMedia}>
            <Star />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Members</ItemTitle>
            <ItemDescription>Invite and manage access</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="secondary">12</Badge>
          </ItemActions>
        </button>
      </Item>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia>
            <Avatar className="size-8">
              <AvatarImage src="/avatar-sample.jpg" alt="Derek Ho" />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Derek Ho</ItemTitle>
            <ItemDescription>derek@distyl.ai</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="secondary">Owner</Badge>
          </ItemActions>
        </button>
      </Item>
    </div>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return <div className="w-full max-w-xs">{children}</div>;
}

export function ItemDefault() {
  return (
    <Frame>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemContent>
            <ItemTitle>Overview</ItemTitle>
          </ItemContent>
        </button>
      </Item>
    </Frame>
  );
}

export function ItemWithIcon() {
  return (
    <Frame>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia>
            <Folder />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Projects</ItemTitle>
          </ItemContent>
          <ItemActions>
            <ChevronRight className="size-4 text-muted-foreground" />
          </ItemActions>
        </button>
      </Item>
    </Frame>
  );
}

export function ItemWithAvatar() {
  return (
    <Frame>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia>
            <Avatar className="size-8">
              <AvatarImage src="/avatar-sample.jpg" alt="Derek Ho" />
              <AvatarFallback>DH</AvatarFallback>
            </Avatar>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Derek Ho</ItemTitle>
            <ItemDescription>derek@distyl.ai</ItemDescription>
          </ItemContent>
        </button>
      </Item>
    </Frame>
  );
}

export function ItemWithCheckbox() {
  const [checked, setChecked] = React.useState(true);
  return (
    <Frame>
      <Item>
        <ItemMedia className={centeredMedia}>
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => setChecked(v === true)}
            aria-label="Email notifications"
          />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Email notifications</ItemTitle>
          <ItemDescription>Send a summary each morning</ItemDescription>
        </ItemContent>
      </Item>
    </Frame>
  );
}

export function ItemWithBadge() {
  return (
    <Frame>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemMedia>
            <Star />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Plan</ItemTitle>
          </ItemContent>
          <ItemActions>
            <Badge variant="secondary">Pro</Badge>
          </ItemActions>
        </button>
      </Item>
    </Frame>
  );
}

export function ItemWithAction() {
  return (
    <Frame>
      <Item>
        <ItemMedia>
          <Avatar className="size-8">
            <AvatarFallback>AP</AvatarFallback>
          </Avatar>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Arjun Prakash</ItemTitle>
          <ItemDescription>arjun@distyl.ai</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="ghost" size="icon-sm" aria-label="Remove member">
            <Trash2 />
          </Button>
        </ItemActions>
      </Item>
    </Frame>
  );
}

export function ItemWithSecondary() {
  return (
    <Frame>
      <Item asChild>
        <button type="button" onClick={noop}>
          <ItemContent>
            <ItemTitle>Billing</ItemTitle>
            <ItemDescription>Invoices, payment method, and plan</ItemDescription>
          </ItemContent>
        </button>
      </Item>
    </Frame>
  );
}

function InboxRow({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Item asChild className={className}>
      <button type="button" {...props}>
        <ItemMedia>
          <Star />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Inbox</ItemTitle>
        </ItemContent>
      </button>
    </Item>
  );
}

export function ItemStateDefault() {
  return (
    <Frame>
      <InboxRow onClick={noop} />
    </Frame>
  );
}

export function ItemStateHover() {
  return (
    <Frame>
      <InboxRow onClick={noop} className="bg-secondary" />
    </Frame>
  );
}

export function ItemStateSelected() {
  const [selected, setSelected] = React.useState(true);
  return (
    <Frame>
      <InboxRow
        aria-current={selected || undefined}
        onClick={() => setSelected((s) => !s)}
      />
    </Frame>
  );
}

export function ItemStateDisabled() {
  return (
    <Frame>
      <InboxRow disabled onClick={noop} />
    </Frame>
  );
}
