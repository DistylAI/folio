import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { Separator } from '@/components/shadcn/separator';
import { cn } from '@/lib/utils';

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role='list'
      data-slot='item-group'
      className={cn('group/item-group flex flex-col', className)}
      {...props}
    />
  );
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot='item-separator'
      orientation='horizontal'
      className={cn('my-0', className)}
      {...props}
    />
  );
}

const itemVariants = cva(
  'group/item flex w-full flex-wrap items-center rounded-lg text-left text-sm outline-none transition-colors duration-100 focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:opacity-50 aria-[current=true]:bg-secondary [a&]:cursor-pointer [a&]:hover:bg-secondary [button&]:cursor-pointer [button&]:hover:bg-secondary',
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline: 'border border-border',
        muted: 'bg-muted',
      },
      size: {
        default: 'gap-3 px-3 py-2',
        sm: 'gap-2.5 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp
      data-slot='item'
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  );
}

const itemMediaVariants = cva(
  'flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:translate-y-0.5 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-muted-foreground [&>svg]:size-4',
        icon: "size-8 rounded-lg border border-border bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
        image: 'size-10 overflow-hidden rounded-lg [&_img]:size-full [&_img]:object-cover',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot='item-media'
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='item-content'
      className={cn('flex min-w-0 flex-1 flex-col [&+[data-slot=item-content]]:flex-none', className)}
      {...props}
    />
  );
}

const itemTitleVariants = cva('flex w-fit max-w-full items-center gap-2 text-label', {
  variants: {
    variant: {
      default: '',
      // Identifiers: table names, ids, versions.
      mono: 'font-mono font-normal text-muted-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
});

function ItemTitle({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof itemTitleVariants>) {
  return (
    <div
      data-slot='item-title'
      className={cn(itemTitleVariants({ variant }), className)}
      {...props}
    />
  );
}

const itemDescriptionVariants = cva(
  'font-normal text-muted-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
  {
    variants: {
      size: {
        default: 'truncate text-caption',
        xs: 'flex items-center gap-1.5 whitespace-nowrap text-xs',
      },
    },
    defaultVariants: { size: 'default' },
  }
);

function ItemDescription({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'p'> & VariantProps<typeof itemDescriptionVariants>) {
  return (
    <p
      data-slot='item-description'
      className={cn(itemDescriptionVariants({ size }), className)}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot='item-actions' className={cn('flex shrink-0 items-center gap-2', className)} {...props} />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='item-header'
      className={cn('flex basis-full items-center justify-between gap-2', className)}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='item-footer'
      className={cn('flex basis-full items-center justify-between gap-2', className)}
      {...props}
    />
  );
}

export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
};
