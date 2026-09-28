'use client';

import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';
import { cn } from '@/lib/utils';

// Each size owns its icon size; an explicit `size-*` class on the icon wins.
const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium outline-none transition-[color,box-shadow] hover:bg-secondary hover:text-foreground focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20 data-[state=on]:bg-secondary data-[state=on]:text-foreground [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: 'h-9 min-w-9 px-2',
        xxs: "h-6 min-w-6 px-1 text-xs [&_svg:not([class*='size-'])]:size-3",
        xs: "h-7 min-w-7 px-1 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: 'h-8 min-w-8 px-1.5',
        icon: 'size-9',
        'icon-sm': "size-8 [&_svg:not([class*='size-'])]:size-3.5",
        'icon-xs': "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        'icon-xxs': "size-6 [&_svg:not([class*='size-'])]:size-3",
      },
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border bg-transparent hover:bg-secondary hover:text-foreground',
        secondary:
          'h-[calc(100%-1px)] flex-1 gap-1.5 rounded-md border border-transparent font-normal text-muted-foreground hover:bg-transparent hover:text-muted-foreground data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm',
      },
    },
    compoundVariants: [
      // A secondary icon pill fills the track height and stays square (aspect-square),
      // rather than stretching to share the track width like a text pill.
      { variant: 'secondary', size: 'icon', className: 'aspect-square w-auto flex-none' },
      { variant: 'secondary', size: 'icon-sm', className: 'aspect-square w-auto flex-none' },
      { variant: 'secondary', size: 'icon-xs', className: 'aspect-square w-auto flex-none' },
      { variant: 'secondary', size: 'icon-xxs', className: 'aspect-square w-auto flex-none' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ToggleProps
  extends
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  tooltipText?: string;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, tooltipText, ...props }, ref) => {
    const toggleElement = (
      <TogglePrimitive.Root
        ref={ref}
        className={cn(toggleVariants({ variant, size, className }))}
        {...props}
      />
    );

    if (tooltipText) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-flex'>{toggleElement}</span>
          </TooltipTrigger>
          <TooltipContent>{tooltipText}</TooltipContent>
        </Tooltip>
      );
    }

    return toggleElement;
  }
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
