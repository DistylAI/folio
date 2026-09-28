'use client';

import * as HoverCardPrimitive from '@radix-ui/react-hover-card';
import * as React from 'react';

import { usePortalContainer } from '@/contexts/portal-container';
import { cn } from '@/lib/utils';

interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  /** Disables hover card. Takes precedence over `open`. */
  disabled?: boolean;
}

const HoverCard = ({
  disabled = false,
  open,
  defaultOpen,
  onOpenChange,
  ...props
}: HoverCardProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;

  // Prevent hover card from reopening if disabled and then re-enabled
  if (disabled && internalOpen) {
    setInternalOpen(false);
  }

  // Always pass a controlled open prop so toggling disabled never flips
  // component between controlled and uncontrolled
  const resolvedOpen = disabled ? false : isControlled ? open : internalOpen;

  const handleOpenChange = (next: boolean) => {
    if (disabled) return;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  return <HoverCardPrimitive.Root open={resolvedOpen} onOpenChange={handleOpenChange} {...props} />;
};

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  const portalContainer = usePortalContainer();
  return (
    <HoverCardPrimitive.Portal container={portalContainer}>
      <HoverCardPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'pointer-events-auto z-50 w-64 rounded-lg border border-border bg-background p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  );
});
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName;

export { HoverCard, HoverCardContent, HoverCardTrigger };
export type { HoverCardProps };
