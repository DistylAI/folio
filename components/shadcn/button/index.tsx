import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';

// Extends the base shadcn buttonVariants with additional Distyl-specific sizes.
// Each size owns its icon size; an explicit `size-*` class on the icon wins.
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium outline-none transition-all focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:opacity-90',
        destructive: 'bg-destructive text-destructive-foreground shadow hover:opacity-90',
        outline: 'border border-border bg-background text-foreground shadow hover:bg-secondary',
        secondary: 'bg-secondary text-secondary-foreground shadow hover:opacity-90',
        ghost: 'text-foreground hover:bg-secondary',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: "h-8 px-3 [&_svg:not([class*='size-'])]:size-4",
        xxs: "h-6 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        xs: "h-7 gap-1.5 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        sm: "h-7 px-2.5 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        icon: "size-8 [&_svg:not([class*='size-'])]:size-4",
        'icon-sm': "size-7 [&_svg:not([class*='size-'])]:size-3.5",
        'icon-xs': "size-6 [&_svg:not([class*='size-'])]:size-3",
        'icon-xxs': "size-6 [&_svg:not([class*='size-'])]:size-3",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  /** Shows a spinner and disables the button while true. */
  loading?: boolean;
  /** Label shown next to the spinner when `loading` is true. */
  loadingText?: string;
  /** Tooltip shown on hover in both enabled and disabled states. */
  tooltipText?: string;
  /** Overrides `tooltipText` when the button is disabled — use to explain why. */
  disabledTooltipText?: string;
}

/**
 * Extended shadcn Button with Distyl-specific sizes (`icon-sm`, `icon-xs`), a `loading` state,
 * and optional tooltip props that automatically wrap the button in a Tooltip.
 *
 * @example
 * ```tsx
 * <Button loading={isSaving} loadingText="Saving…">Save</Button>
 * <Button disabled disabledTooltipText="You don't have permission">Delete</Button>
 * <Button size="icon-sm" variant="ghost"><Pencil /></Button>
 * ```
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      loadingText,
      tooltipText,
      disabledTooltipText,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isDisabled = loading || props.disabled;

    const buttonElement = (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        aria-busy={loading}
        aria-disabled={isDisabled}
        {...props}
        disabled={isDisabled}
      >
        {loading ? (
          <>
            <Loader2 className='animate-spin' />
            {loadingText}
          </>
        ) : (
          children
        )}
      </Comp>
    );

    const activeTooltipText = isDisabled && disabledTooltipText ? disabledTooltipText : tooltipText;

    if (activeTooltipText) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className='inline-flex'>{buttonElement}</span>
          </TooltipTrigger>
          <TooltipContent>{activeTooltipText}</TooltipContent>
        </Tooltip>
      );
    }

    return buttonElement;
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
