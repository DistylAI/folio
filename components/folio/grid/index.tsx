import * as React from 'react';

import { cn } from '@/lib/utils';

type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Columns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns (1–12) */
  cols?: Columns;
  /** Gap between cells (applies to both row and column gap) */
  gap?: Space;
  /** Column gap only */
  gapX?: Space;
  /** Row gap only */
  gapY?: Space;
}

const colsMap: Record<Columns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
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

const gapXMap: Record<Space, string> = {
  none: 'gap-x-0',
  xs: 'gap-x-1',
  sm: 'gap-x-2',
  md: 'gap-x-4',
  lg: 'gap-x-6',
  xl: 'gap-x-8',
  '2xl': 'gap-x-12',
};

const gapYMap: Record<Space, string> = {
  none: 'gap-y-0',
  xs: 'gap-y-1',
  sm: 'gap-y-2',
  md: 'gap-y-4',
  lg: 'gap-y-6',
  xl: 'gap-y-8',
  '2xl': 'gap-y-12',
};

/**
 * Folio layout primitive: a CSS grid with a fixed column count and
 * token-based gaps.
 *
 * @example
 * <Grid cols={3} gap="md">...</Grid>
 */
const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols = 1, gap, gapX, gapY, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'grid',
          colsMap[cols],
          gap && gapMap[gap],
          gapX && gapXMap[gapX],
          gapY && gapYMap[gapY],
          className
        )}
        {...props}
      />
    );
  }
);
Grid.displayName = 'Grid';

export { Grid };
