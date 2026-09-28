// Prefer select.tsx for most use cases
// Only use this for edge cases related to mobile use, portal bugs, or performance

import * as React from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

function NativeSelect({
  className,
  size = 'default',
  ...props
}: Omit<React.ComponentProps<'select'>, 'size'> & { size?: 'sm' | 'default' }) {
  return (
    <div
      className='group/native-select relative w-fit has-[select:disabled]:opacity-50'
      data-slot='native-select-wrapper'
    >
      <select
        data-slot='native-select'
        data-size={size}
        className={cn(
          'h-9 w-full min-w-0 appearance-none rounded-lg border border-border bg-background px-3 py-2 pr-9 text-sm text-foreground shadow-sm transition-colors outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed data-[size=sm]:h-8 data-[size=sm]:py-1',
          'focus-visible:border-primary',
          'aria-[invalid=true]:border-destructive',
          className
        )}
        {...props}
      />
      <ChevronDownIcon
        className='pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted-foreground select-none'
        aria-hidden='true'
        data-slot='native-select-icon'
      />
    </div>
  );
}

function NativeSelectOption({ className, ...props }: React.ComponentProps<'option'>) {
  return (
    <option
      data-slot='native-select-option'
      className={cn('bg-background text-foreground', className)}
      {...props}
    />
  );
}

function NativeSelectOptGroup({ className, ...props }: React.ComponentProps<'optgroup'>) {
  return (
    <optgroup
      data-slot='native-select-optgroup'
      className={cn('bg-background text-foreground', className)}
      {...props}
    />
  );
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
