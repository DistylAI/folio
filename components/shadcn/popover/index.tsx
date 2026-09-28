'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

import { usePortalContainerProps } from '@/contexts/portal-container';
import { cn } from '@/lib/utils';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverAnchor = PopoverPrimitive.Anchor;

type PopoverPortalProps = Omit<React.ComponentProps<typeof PopoverPrimitive.Portal>, 'container'>;

const PopoverPortal = ({ children, ...props }: PopoverPortalProps) => {
  const portalContainerProps = usePortalContainerProps();
  if (portalContainerProps === null) return null;
  return (
    <PopoverPrimitive.Portal {...props} {...portalContainerProps}>
      {children}
    </PopoverPrimitive.Portal>
  );
};

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => {
  return (
    <PopoverPortal>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        sideOffset={sideOffset}
        className={cn(
          // pointer-events-auto keeps the popover clickable when opened inside a modal
          // Dialog: Radix sets pointer-events:none on <body>, which the portaled content inherits.
          'pointer-events-auto z-50 w-72 rounded-lg border border-border bg-background p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className
        )}
        {...props}
      />
    </PopoverPortal>
  );
});
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverAnchor, PopoverContent, PopoverPortal, PopoverTrigger };
