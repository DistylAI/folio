'use client';

import { Label } from '@radix-ui/react-label';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square size-4 shrink-0 rounded-full border border-primary text-primary shadow-sm outline-none transition-[color,box-shadow] focus-visible:border-primary focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-destructive/20',
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
        <Circle className='size-3.5 fill-primary' />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

interface RadioOptionProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
  label: string;
  description?: string;
}

const RadioGroupLabeledOption = React.forwardRef<
  React.ElementRef<typeof RadioGroupItem>,
  RadioOptionProps
>(({ label, description, className, ...props }, ref) => {
  const generatedId = React.useId();
  const id = props.id ?? generatedId;

  return (
    <div className={cn('grid grid-cols-[fit-content(0)_1fr] gap-x-2 gap-y-1.5', className)}>
      <RadioGroupItem ref={ref} {...props} id={id} />
      <div className='flex items-center'>
        <Label htmlFor={id} className='text-label leading-none'>
          {label}
        </Label>
      </div>
      {description ? (
        <>
          <div />
          <p className='text-description'>{description}</p>
        </>
      ) : null}
    </div>
  );
});
RadioGroupLabeledOption.displayName = 'RadioGroupLabeledOption';

export { RadioGroup, RadioGroupItem, RadioGroupLabeledOption };
