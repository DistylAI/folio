import * as React from 'react';

import { cn } from '@/lib/utils';

type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Direction = 'row' | 'column';

type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

type Justify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stack direction */
  direction?: Direction;
  /** Gap between children */
  gap?: Space;
  /** Horizontal alignment (align-items) */
  align?: Align;
  /** Vertical alignment (justify-content) */
  justify?: Justify;
  /** Wrap children */
  wrap?: boolean;
}

const directionMap: Record<Direction, string> = {
  row: 'flex-row',
  column: 'flex-col',
};

// Full class names so Tailwind generates them; a `gap-${n}` template is invisible to the scanner.
const gapMap: Record<Space, string> = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
};

const alignMap: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const justifyMap: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

/**
 * Folio layout primitive: a flex container with a direction, token-based gap,
 * alignment, and optional wrapping.
 *
 * @example
 * <Stack direction="row" gap="sm" align="center">...</Stack>
 */
const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  (
    { direction = 'column', gap, align, justify, wrap = false, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          directionMap[direction],
          gap && gapMap[gap],
          align && alignMap[align],
          justify && justifyMap[justify],
          wrap && 'flex-wrap',
          className
        )}
        {...props}
      />
    );
  }
);
Stack.displayName = 'Stack';

export { Stack };
