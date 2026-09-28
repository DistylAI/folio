'use client';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { toggleVariants } from '@/components/shadcn/toggle';
import { cn } from '@/lib/utils';

// Single source of truth — a mismatch between size/trackHeight would compile fine and just silently drop the height class.
const TOGGLE_SIZE_TOKENS = [
  'default',
  'xxs',
  'xs',
  'sm',
  'icon',
  'icon-sm',
  'icon-xs',
  'icon-xxs',
] as const;
type ToggleSizeToken = (typeof TOGGLE_SIZE_TOKENS)[number];

const EMPTY_SIZE_VARIANTS = Object.fromEntries(
  TOGGLE_SIZE_TOKENS.map(token => [token, ''])
) as Record<ToggleSizeToken, string>;

const TRACK_HEIGHT_CLASS: Record<ToggleSizeToken, string> = {
  default: 'h-9',
  xxs: 'h-6',
  xs: 'h-7',
  sm: 'h-8',
  icon: 'h-9',
  'icon-sm': 'h-8',
  'icon-xs': 'h-7',
  'icon-xxs': 'h-6',
};

const toggleGroupVariants = cva('flex items-center justify-center', {
  variants: {
    variant: {
      default: 'gap-1',
      outline: 'gap-1',
      secondary: 'w-fit rounded-lg bg-muted p-[3px]',
    },
    size: EMPTY_SIZE_VARIANTS,
    trackHeight: EMPTY_SIZE_VARIANTS,
  },
  compoundVariants: TOGGLE_SIZE_TOKENS.map(trackHeight => ({
    variant: 'secondary' as const,
    trackHeight,
    className: TRACK_HEIGHT_CLASS[trackHeight],
  })),
  defaultVariants: {
    variant: 'default',
    size: 'default',
    trackHeight: 'default',
  },
});

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default',
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants> & {
      trackHeight?: VariantProps<typeof toggleGroupVariants>['trackHeight'];
    }
>(({ className, variant, size, trackHeight, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      toggleGroupVariants({ variant, size, trackHeight: trackHeight ?? size }),
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
