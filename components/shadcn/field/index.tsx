'use client';

import { createContext, useContext, useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Label } from '@/components/shadcn/label';
import { Separator } from '@/components/shadcn/separator';

type FieldDensity = 'default' | 'compact';
const FieldDensityContext = createContext<FieldDensity>('default');
function useFieldDensity(): FieldDensity {
  return useContext(FieldDensityContext);
}

function FieldSet({
  className,
  compact,
  ...props
}: React.ComponentProps<'fieldset'> & { compact?: boolean }) {
  const parentDensity = useFieldDensity();
  const density: FieldDensity = compact ? 'compact' : parentDensity;
  return (
    <FieldDensityContext.Provider value={density}>
      <fieldset
        data-slot='field-set'
        className={cn(
          'flex flex-col',
          density === 'compact' ? 'gap-3' : 'gap-6',
          'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
          className
        )}
        {...props}
      />
    </FieldDensityContext.Provider>
  );
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot='field-legend'
      data-variant={variant}
      className={cn(
        'mb-3 font-medium text-foreground',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className
      )}
      {...props}
    />
  );
}

function FieldGroup({
  className,
  compact,
  ...props
}: React.ComponentProps<'div'> & { compact?: boolean }) {
  const parentDensity = useFieldDensity();
  const density: FieldDensity = compact ? 'compact' : parentDensity;
  return (
    <FieldDensityContext.Provider value={density}>
      <div
        data-slot='field-group'
        className={cn(
          'group/field-group @container/field-group flex w-full flex-col data-[slot=checkbox-group]:gap-3',
          density === 'compact'
            ? 'gap-3 [&>[data-slot=field-group]]:gap-2'
            : 'gap-7 [&>[data-slot=field-group]]:gap-4',
          className
        )}
        {...props}
      />
    </FieldDensityContext.Provider>
  );
}

const fieldVariants = cva('group/field flex w-full', {
  variants: {
    orientation: {
      vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
      horizontal: [
        'flex-row items-center',
        '[&>[data-slot=field-label]]:flex-auto',
        'has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px has-[>[data-slot=field-content]]:items-start',
      ],
      responsive: [
        '@md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto flex-col [&>*]:w-full [&>.sr-only]:w-auto',
        '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
        '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
      ],
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
});

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  const density = useFieldDensity();
  return (
    <div
      role='group'
      data-slot='field'
      data-orientation={orientation}
      className={cn(
        fieldVariants({ orientation }),
        density === 'compact' ? 'gap-1' : 'gap-1.5',
        className
      )}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-content'
      className={cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', className)}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  const density = useFieldDensity();
  return (
    <Label
      data-slot='field-label'
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-none group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-lg has-[>[data-slot=field]]:border has-[>[data-slot=field]]:border-border [&>[data-slot=field]]:p-4',
        'has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary-subtle',
        density === 'compact' && 'font-medium',
        className
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-label'
      className={cn(
        'flex w-fit items-center gap-2 text-sm font-medium leading-snug text-foreground group-data-[disabled=true]/field:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='field-description'
      className={cn(
        'text-xs font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance',
        '[[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot='field-separator'
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className
      )}
      {...props}
    >
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <span
          className='bg-background text-muted-foreground relative mx-auto block w-fit px-2'
          data-slot='field-separator-content'
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const density = useFieldDensity();
  const content = useMemo(() => {
    if (children) {
      return children;
    }

    if (!errors || errors.length === 0) {
      return null;
    }

    if (errors?.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }

    return (
      <ul className='ml-4 flex list-disc flex-col gap-1'>
        {errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    );
  }, [children, errors]);

  if (!content) {
    return null;
  }

  return (
    <div
      role='alert'
      data-slot='field-error'
      className={cn('text-xs font-normal text-destructive', className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
};
