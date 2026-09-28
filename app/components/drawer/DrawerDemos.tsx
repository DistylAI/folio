"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/shadcn/button";
import { Input } from "@/components/shadcn/input";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/shadcn/drawer";

// Deterministic bar heights for the statistic chart (no Math.random -- keeps
// server/client render stable).
const bars = [40, 32, 48, 36, 56, 44, 64, 52, 72, 60, 80, 68, 56, 44];

export function StatisticDrawer() {
  const [goal, setGoal] = useState(350);
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>
              Set your daily activity goal.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={() => setGoal((g) => Math.max(200, g - 10))}
                aria-label="Decrease goal"
              >
                <Minus />
              </Button>
              <div className="text-center">
                <div className="text-5xl font-bold tracking-tight text-foreground tabular-nums">
                  {goal}
                </div>
                <div className="text-[0.7rem] uppercase tracking-wide text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="size-8 shrink-0 rounded-full"
                onClick={() => setGoal((g) => Math.min(600, g + 10))}
                aria-label="Increase goal"
              >
                <Plus />
              </Button>
            </div>
            <div className="mt-4 flex h-24 items-end justify-between gap-1">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="w-full rounded-sm bg-primary/70"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <DrawerFooter>
            <Button>Set Goal</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function FormDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Save when you&apos;re done.
            </DrawerDescription>
          </DrawerHeader>
          <div className="grid gap-4 p-4">
            <div className="grid gap-2">
              <label
                htmlFor="drawer-name"
                className="text-sm font-medium text-foreground"
              >
                Name
              </label>
              <Input id="drawer-name" placeholder="Name" />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="drawer-username"
                className="text-sm font-medium text-foreground"
              >
                Username
              </label>
              <Input id="drawer-username" placeholder="@username" />
            </div>
          </div>
          <DrawerFooter>
            <Button>Save changes</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function TextDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Read more</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Title Text</DrawerTitle>
            <DrawerDescription>This is a drawer description.</DrawerDescription>
          </DrawerHeader>
          <div className="max-h-[50vh] overflow-y-auto px-4 text-sm text-muted-foreground">
            <p>
              A drawer slides content up from the bottom of the screen, keeping
              the page behind it in view. It&apos;s well suited to focused,
              touch-friendly tasks on small screens -- quick edits, confirmations,
              or a longer read like this one.
            </p>
            <p className="mt-3">
              Drag the handle down or tap outside to dismiss it. Because the
              underlying page stays mounted, a drawer is a lighter-weight choice
              than navigating away, and it preserves the user&apos;s place.
            </p>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function DismissibleDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Dismissible</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Dismissible</DrawerTitle>
            <DrawerDescription>
              Drag the handle down or tap the overlay to close.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function NonDismissibleDrawer() {
  return (
    <Drawer dismissible={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Non-dismissible</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Confirm to continue</DrawerTitle>
            <DrawerDescription>
              The overlay and drag are disabled -- only the button closes it.
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button>Got it</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
