import * as React from 'react';

import { cn } from '@/lib/utils';

type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';
type TextColor =
  | 'default'
  | 'subtle'
  | 'disabled'
  | 'inverse'
  | 'primary'
  | 'danger'
  | 'success'
  | 'warning';
type TextAlign = 'left' | 'center' | 'right';

export interface TextProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Element to render. */
  as?: React.ElementType;
  /** Font size step. */
  size?: TextSize;
  /** Font weight. */
  weight?: TextWeight;
  /** Text color token. */
  color?: TextColor;
  /** Text alignment. */
  align?: TextAlign;
  /** Balances line lengths (text-wrap: balance). */
  balance?: boolean;
}

// Full class names, so the Tailwind scanner can see each one.
const SIZE_CLASS: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const WEIGHT_CLASS: Record<TextWeight, string> = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const COLOR_CLASS: Record<TextColor, string> = {
  default: 'text-foreground',
  subtle: 'text-muted-foreground',
  disabled: 'text-disabled',
  inverse: 'text-inverse',
  primary: 'text-primary',
  danger: 'text-destructive',
  success: 'text-success',
  warning: 'text-warning',
};

const ALIGN_CLASS: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

/**
 * Folio text primitive. Maps size, weight, color, and alignment props to token classes.
 *
 * @example
 * ```tsx
 * <Text size="sm" color="subtle">Last updated 2 hours ago</Text>
 * <Text as="span" weight="semibold">Owner</Text>
 * ```
 */
const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as: Comp = 'p',
      size = 'md',
      weight = 'normal',
      color = 'default',
      align,
      balance = false,
      className,
      ...props
    },
    ref
  ) => (
    <Comp
      ref={ref}
      className={cn(
        SIZE_CLASS[size],
        WEIGHT_CLASS[weight],
        COLOR_CLASS[color],
        align && ALIGN_CLASS[align],
        balance && 'text-balance',
        className
      )}
      {...props}
    />
  )
);
Text.displayName = 'Text';

export { Text };
