'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, X } from 'lucide-react';
import * as React from 'react';
import { type DateRange } from 'react-day-picker';

import { Button } from '@/components/shadcn/button';
import { Calendar } from '@/components/shadcn/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';
import { cn } from '@/lib/utils';

export interface DatePickerProps {
  /** Trigger text shown when no date is selected. */
  placeholder?: string;
  /** Disables the trigger so the calendar cannot open. */
  disabled?: boolean;
  /** Popover alignment relative to the trigger. */
  align?: 'start' | 'center' | 'end';
  /** Shows a clear button in the trigger after a date is picked. DatePicker only. */
  clearable?: boolean;
}

function formatRange(range: DateRange | undefined): string | undefined {
  if (!range?.from) return undefined;
  if (!range.to) return format(range.from, 'LLL dd, y');
  return `${format(range.from, 'LLL dd, y')} - ${format(range.to, 'LLL dd, y')}`;
}

/**
 * Single-date picker: an outline Button that opens a Calendar in a Popover.
 * The ref goes to the wrapper element.
 *
 * @example
 * ```tsx
 * <DatePicker placeholder="Pick a date" clearable />
 * ```
 */
const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  ({ placeholder = 'Pick a date', disabled, align = 'start', clearable }, ref) => {
    const [date, setDate] = React.useState<Date>();
    const showClear = clearable && date && !disabled;

    return (
      <div ref={ref} className='relative inline-block'>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              disabled={disabled}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                clearable && date && 'pr-9',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className='mr-2 size-4 shrink-0' />
              {date ? format(date, 'PPP') : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align={align}>
            <Calendar mode='single' selected={date} onSelect={setDate} autoFocus />
          </PopoverContent>
        </Popover>
        {showClear && (
          <button
            type='button'
            onClick={() => setDate(undefined)}
            aria-label='Clear date'
            className='absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          >
            <X className='size-4' />
          </button>
        )}
      </div>
    );
  }
);
DatePicker.displayName = 'DatePicker';

/**
 * Date-range picker: an outline Button that opens a two-month range Calendar in a Popover.
 * The ref goes to the trigger button. `clearable` has no effect here.
 *
 * @example
 * ```tsx
 * <DateRangePicker placeholder="Pick a date range" />
 * ```
 */
const DateRangePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ placeholder = 'Pick a date range', disabled, align = 'start' }, ref) => {
    const [range, setRange] = React.useState<DateRange>();
    const label = formatRange(range);

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant='outline'
            disabled={disabled}
            className={cn(
              'w-[280px] justify-start text-left font-normal',
              !label && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 size-4 shrink-0' />
            {label ?? <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align={align}>
          <Calendar
            mode='range'
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
            autoFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);
DateRangePicker.displayName = 'DateRangePicker';

export { DatePicker, DateRangePicker };
