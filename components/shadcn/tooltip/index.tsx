'use client';

import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

import { usePortalContainerProps } from '@/contexts/portal-container';
import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;

interface TooltipProps extends TooltipPrimitive.TooltipProps {
  /** Disables tooltip. Takes precedence over `open`. */
  disabled?: boolean;
}

const Tooltip = ({ disabled = false, open, defaultOpen, onOpenChange, ...props }: TooltipProps) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen ?? false);
  const isControlled = open !== undefined;

  // Prevent tooltip from reopening if disabled and then renenabled
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

  return <TooltipPrimitive.Root open={resolvedOpen} onOpenChange={handleOpenChange} {...props} />;
};

type TooltipPortalProps = Omit<React.ComponentProps<typeof TooltipPrimitive.Portal>, 'container'>;

const TooltipPortal = ({ children, ...props }: TooltipPortalProps) => {
  const portalContainerProps = usePortalContainerProps();
  if (portalContainerProps === null) return null;
  return (
    <TooltipPrimitive.Portal {...props} {...portalContainerProps}>
      {children}
    </TooltipPrimitive.Portal>
  );
};

const TooltipTrigger = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger>
>(({ onFocus, ...props }, ref) => (
  <TooltipPrimitive.Trigger
    ref={ref}
    {...props}
    onFocus={event => {
      onFocus?.(event);
      // Open on keyboard focus only, not programmatic focus (e.g. dialog autofocus).
      // Check the focused element: an asChild trigger can wrap it (Button tooltips).
      if (!event.defaultPrevented && !event.target.matches(':focus-visible')) {
        event.preventDefault();
      }
    }}
  />
));
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => {
  return (
    <TooltipPortal>
      <TooltipPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'z-50 overflow-hidden rounded-lg bg-inverse px-3 py-1.5 text-caption text-inverse shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </TooltipPortal>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger };
export type { TooltipProps };
