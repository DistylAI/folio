"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  Database,
  Folder,
  GitBranch,
  Globe,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Combobox } from "@/components/combobox";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shadcn/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { cn } from "@/lib/utils";

// Lucide icons are component references (functions), which cannot cross the
// server -> client boundary as props, so these option lists live here.

const environments = [
  { value: "prod-us", label: "Production US", group: "Production" },
  { value: "prod-eu", label: "Production EU", group: "Production" },
  { value: "staging", label: "Staging", group: "Non-production" },
  { value: "dev", label: "Development", group: "Non-production" },
  { value: "sandbox", label: "Sandbox", group: "Non-production" },
];

const resources: { value: string; label: string; icon: LucideIcon }[] = [
  { value: "datasets", label: "Datasets", icon: Database },
  { value: "projects", label: "Projects", icon: Folder },
  { value: "branches", label: "Branches", icon: GitBranch },
  { value: "members", label: "Members", icon: Users },
  { value: "settings", label: "Settings", icon: Settings },
];

const models = [
  { value: "sol", label: "Sol", tag: <Badge variant="secondary" size="sm">New</Badge> },
  { value: "astra", label: "Astra", tag: <Badge variant="secondary" size="sm">Default</Badge> },
  { value: "vega", label: "Vega" },
  { value: "lyra", label: "Lyra", disabled: true },
];

const regions = [
  { value: "us-east", label: "US East (Virginia)" },
  { value: "us-west", label: "US West (Oregon)" },
  { value: "eu-west", label: "EU West (Ireland)" },
  { value: "eu-central", label: "EU Central (Frankfurt)" },
];

/** Toolkit Combobox with a `tag` on some options and one disabled option. */
export function TagCombobox() {
  return <Combobox options={models} placeholder="Model..." />;
}

/** Toolkit Combobox at `size="sm"` with a leading trigger `icon`. */
export function SmallIconCombobox() {
  return (
    <Combobox
      options={regions}
      size="sm"
      icon={<Globe className="size-3.5" />}
      placeholder="Region..."
    />
  );
}

/** Toolkit Combobox while options load: the trigger is disabled. */
export function LoadingCombobox() {
  return <Combobox options={[]} isLoading placeholder="Loading regions..." />;
}

/** Popover + Command composed by hand, for group headings. */
export function GroupedCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = environments.find((env) => env.value === value);
  const groups = Array.from(new Set(environments.map((env) => env.group)));

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !selected && "text-muted-foreground",
          )}
        >
          <span className="truncate">{selected?.label ?? "Environment..."}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {groups.map((group) => (
              <CommandGroup key={group} heading={group}>
                {environments
                  .filter((env) => env.group === group)
                  .map((env) => (
                    <CommandItem
                      key={env.value}
                      value={env.value}
                      keywords={[env.label]}
                      onSelect={() => {
                        setValue(env.value === value ? "" : env.value);
                        setOpen(false);
                      }}
                    >
                      <span className="truncate">{env.label}</span>
                      <Check
                        className={cn(
                          "ml-auto shrink-0",
                          value === env.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/** Popover + Command composed by hand, for a leading icon on each option. */
export function IconCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const selected = resources.find((res) => res.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            !selected && "text-muted-foreground",
          )}
        >
          <span className="truncate">{selected?.label ?? "Resource..."}</span>
          <ChevronsUpDown className="ml-2 size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {resources.map(({ value: optionValue, label, icon: Icon }) => (
                <CommandItem
                  key={optionValue}
                  value={optionValue}
                  keywords={[label]}
                  onSelect={() => {
                    setValue(optionValue === value ? "" : optionValue);
                    setOpen(false);
                  }}
                >
                  <Icon className="text-muted-foreground" />
                  <span className="truncate">{label}</span>
                  <Check
                    className={cn(
                      "ml-auto shrink-0",
                      value === optionValue ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
