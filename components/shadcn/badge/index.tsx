import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 rounded-lg border font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&_svg]:pointer-events-none [&_svg]:size-3 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-transparent',
        secondary: 'border-transparent',
        outline: '',
      },
      size: {
        default: 'px-2 py-0.5 text-xs',
        sm: 'px-1.5 py-0.5 text-xs leading-none rounded-sm [&_svg]:size-2 gap-1',
      },
      color: {
        default: '',
        primary: '',
        destructive: '',
        success: '',
        warning: '',
        info: '',
        orange: '',
        amber: '',
        lime: '',
        emerald: '',
        teal: '',
        cyan: '',
        sky: '',
        fuchsia: '',
        pink: '',
        rose: '',
      },
    },
    // Folio has no raw palette, so each hue color uses the closest status token.
    compoundVariants: [
      // default variant — solid fill
      { variant: 'default', color: 'default', class: 'bg-inverse text-inverse' },
      { variant: 'default', color: 'primary', class: 'bg-primary text-primary-foreground' },
      {
        variant: 'default',
        color: 'destructive',
        class: 'bg-destructive text-destructive-foreground',
      },
      { variant: 'default', color: 'success', class: 'bg-success text-success-foreground' },
      { variant: 'default', color: 'warning', class: 'bg-warning text-warning-foreground' },
      { variant: 'default', color: 'info', class: 'bg-info text-info-foreground' },
      { variant: 'default', color: 'orange', class: 'bg-warning text-warning-foreground' },
      { variant: 'default', color: 'amber', class: 'bg-warning text-warning-foreground' },
      { variant: 'default', color: 'lime', class: 'bg-success text-success-foreground' },
      { variant: 'default', color: 'emerald', class: 'bg-success text-success-foreground' },
      { variant: 'default', color: 'teal', class: 'bg-success text-success-foreground' },
      { variant: 'default', color: 'cyan', class: 'bg-info text-info-foreground' },
      { variant: 'default', color: 'sky', class: 'bg-info text-info-foreground' },
      { variant: 'default', color: 'fuchsia', class: 'bg-primary text-primary-foreground' },
      { variant: 'default', color: 'pink', class: 'bg-destructive text-destructive-foreground' },
      { variant: 'default', color: 'rose', class: 'bg-destructive text-destructive-foreground' },
      // The secondary variant uses a soft fill and dark text.
      { variant: 'secondary', color: 'default', class: 'bg-secondary text-foreground' },
      { variant: 'secondary', color: 'primary', class: 'bg-primary-subtle text-primary' },
      { variant: 'secondary', color: 'destructive', class: 'bg-destructive-subtle text-destructive' },
      { variant: 'secondary', color: 'success', class: 'bg-success-subtle text-success' },
      { variant: 'secondary', color: 'warning', class: 'bg-warning-subtle text-warning' },
      { variant: 'secondary', color: 'info', class: 'bg-primary-subtle text-primary' },
      { variant: 'secondary', color: 'orange', class: 'bg-warning-subtle text-warning' },
      { variant: 'secondary', color: 'amber', class: 'bg-warning-subtle text-warning' },
      { variant: 'secondary', color: 'lime', class: 'bg-success-subtle text-success' },
      { variant: 'secondary', color: 'emerald', class: 'bg-success-subtle text-success' },
      { variant: 'secondary', color: 'teal', class: 'bg-success-subtle text-success' },
      { variant: 'secondary', color: 'cyan', class: 'bg-info-subtle text-info' },
      { variant: 'secondary', color: 'sky', class: 'bg-info-subtle text-info' },
      { variant: 'secondary', color: 'fuchsia', class: 'bg-primary-subtle text-primary' },
      { variant: 'secondary', color: 'pink', class: 'bg-destructive-subtle text-destructive' },
      { variant: 'secondary', color: 'rose', class: 'bg-destructive-subtle text-destructive' },
      // The outline variant uses a colored border.
      { variant: 'outline', color: 'default', class: 'border-border text-foreground' },
      { variant: 'outline', color: 'primary', class: 'border-primary text-primary' },
      { variant: 'outline', color: 'destructive', class: 'border-destructive text-destructive' },
      { variant: 'outline', color: 'success', class: 'border-success text-success' },
      { variant: 'outline', color: 'warning', class: 'border-border text-warning' },
      { variant: 'outline', color: 'info', class: 'border-primary text-primary' },
      { variant: 'outline', color: 'orange', class: 'border-border text-warning' },
      { variant: 'outline', color: 'amber', class: 'border-border text-warning' },
      { variant: 'outline', color: 'lime', class: 'border-success text-success' },
      { variant: 'outline', color: 'emerald', class: 'border-success text-success' },
      { variant: 'outline', color: 'teal', class: 'border-success text-success' },
      { variant: 'outline', color: 'cyan', class: 'border-info text-info' },
      { variant: 'outline', color: 'sky', class: 'border-info text-info' },
      { variant: 'outline', color: 'fuchsia', class: 'border-primary text-primary' },
      { variant: 'outline', color: 'pink', class: 'border-destructive text-destructive' },
      { variant: 'outline', color: 'rose', class: 'border-destructive text-destructive' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      color: 'default',
    },
  }
);

export interface BadgeProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'color'>, VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref as React.Ref<HTMLDivElement>}
        className={cn(badgeVariants({ variant, size, color }), className)}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge, badgeVariants };
