import { X } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/shadcn/badge';
import { cn } from '@/lib/utils';

// The neutral label look: an outline Badge on the secondary surface.
const TAG_CLASS = 'bg-secondary';

export interface TagProps extends Omit<React.HTMLAttributes<HTMLElement>, 'color'> {
  /** Standard or compact chip. */
  size?: 'default' | 'sm';
  /** Renders a trailing remove button, so the Tag becomes an interactive filter chip. */
  removable?: boolean;
  /** Called when the remove button is clicked. */
  onRemove?: () => void;
  /** Renders the child element as the Tag. Ignored when `removable` is true. */
  asChild?: boolean;
}

/**
 * Neutral label chip for taxonomy (category, keyword). A wrapper over Badge with a
 * fixed look. It is the only chip that can be `removable`.
 *
 * @example
 * ```tsx
 * <Tag>Engineering</Tag>
 * <Tag removable onRemove={() => remove('react')}>React</Tag>
 * ```
 */
const Tag = React.forwardRef<HTMLElement, TagProps>(
  ({ className, size, removable = false, onRemove, asChild = false, children, ...props }, ref) => {
    if (removable) {
      return (
        <Badge
          ref={ref}
          variant='outline'
          size={size}
          className={cn(TAG_CLASS, 'pr-1', className)}
          {...props}
        >
          {children}
          <button
            type='button'
            aria-label='Remove'
            onClick={onRemove}
            className='-mr-0.5 ml-0.5 inline-flex size-4 shrink-0 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:size-3'
          >
            <X />
          </button>
        </Badge>
      );
    }

    return (
      <Badge
        ref={ref}
        variant='outline'
        size={size}
        asChild={asChild}
        className={cn(TAG_CLASS, className)}
        {...props}
      >
        {children}
      </Badge>
    );
  }
);
Tag.displayName = 'Tag';

export { Tag };
