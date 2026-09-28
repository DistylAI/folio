import * as React from 'react';

import { cn } from '@/lib/utils';

type Space = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

type Background =
  | 'default'
  | 'subtle'
  | 'secondary'
  | 'accent'
  | 'inverse'
  | 'danger'
  | 'success'
  | 'warning';

type BorderRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface BoxProps extends React.HTMLAttributes<HTMLElement> {
  /** Padding on all sides */
  p?: Space;
  /** Horizontal padding */
  px?: Space;
  /** Vertical padding */
  py?: Space;
  /** Background token */
  bg?: Background;
  /** Border using border-border */
  border?: boolean;
  /** Border radius */
  radius?: BorderRadius;
  /** Render as a different element */
  as?: React.ElementType;
}

// Full class names so Tailwind generates them; a `p-${n}` template is invisible to the scanner.
const pMap: Record<Space, string> = {
  none: 'p-0',
  xs: 'p-1',
  sm: 'p-2',
  md: 'p-4',
  lg: 'p-6',
  xl: 'p-8',
  '2xl': 'p-12',
};

const pxMap: Record<Space, string> = {
  none: 'px-0',
  xs: 'px-1',
  sm: 'px-2',
  md: 'px-4',
  lg: 'px-6',
  xl: 'px-8',
  '2xl': 'px-12',
};

const pyMap: Record<Space, string> = {
  none: 'py-0',
  xs: 'py-1',
  sm: 'py-2',
  md: 'py-4',
  lg: 'py-6',
  xl: 'py-8',
  '2xl': 'py-12',
};

const bgMap: Record<Background, string> = {
  default: 'bg-background',
  subtle: 'bg-muted',
  secondary: 'bg-secondary',
  accent: 'bg-primary-subtle',
  inverse: 'bg-inverse',
  danger: 'bg-destructive-subtle',
  success: 'bg-success-subtle',
  warning: 'bg-warning-subtle',
};

const radiusMap: Record<BorderRadius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  xl: 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Folio layout primitive: a container with token-based padding, background,
 * border, and radius. Renders a `div` unless `as` names another element.
 *
 * @example
 * <Box p="md" bg="subtle" border radius="md">Content</Box>
 */
const Box = React.forwardRef<HTMLElement, BoxProps>(
  ({ p, px, py, bg, border = false, radius, as: Comp = 'div', className, ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          p && pMap[p],
          px && pxMap[px],
          py && pyMap[py],
          bg && bgMap[bg],
          border && 'border border-border',
          radius && radiusMap[radius],
          className
        )}
        {...props}
      />
    );
  }
);
Box.displayName = 'Box';

export { Box };
