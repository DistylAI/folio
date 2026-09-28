'use client';

import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import * as React from 'react';

import { usePortalContainerProps } from '@/contexts/portal-container';
import { cn } from '@/lib/utils';

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

type SheetPortalProps = Omit<React.ComponentProps<typeof SheetPrimitive.Portal>, 'container'>;

const SheetPortal = ({ children, ...props }: SheetPortalProps) => {
  const portalContainerProps = usePortalContainerProps();
  if (portalContainerProps === null) return null;
  return (
    <SheetPrimitive.Portal {...props} {...portalContainerProps}>
      {children}
    </SheetPrimitive.Portal>
  );
};

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    className={cn(
      'fixed inset-0 z-50 bg-inverse/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      className
    )}
    {...props}
    ref={ref}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b border-border data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right:
          'inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
);

const isHorizontalSide = (side: NonNullable<VariantProps<typeof sheetVariants>['side']>) =>
  side === 'left' || side === 'right';

const resizeHandleVariants: Record<
  NonNullable<VariantProps<typeof sheetVariants>['side']>,
  string
> = {
  right: 'inset-y-0 left-0 w-1.5 cursor-col-resize',
  left: 'inset-y-0 right-0 w-1.5 cursor-col-resize',
  top: 'inset-x-0 bottom-0 h-1.5 cursor-row-resize',
  bottom: 'inset-x-0 top-0 h-1.5 cursor-row-resize',
};

interface SheetContentProps
  extends
    React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  hideClose?: boolean;
  resizable?: boolean;
  minSize?: number;
  maxSize?: number;
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(
  (
    {
      side: sideProp,
      className,
      children,
      hideClose,
      resizable,
      minSize = 320,
      maxSize,
      style,
      ...props
    },
    ref
  ) => {
    const side = sideProp ?? 'right';
    const contentRef = React.useRef<HTMLDivElement | null>(null);
    const [size, setSize] = React.useState<number | null>(null);
    const horizontal = isHorizontalSide(side);
    const dragCleanupRef = React.useRef<(() => void) | null>(null);
    React.useEffect(() => () => dragCleanupRef.current?.(), []);

    const setRefs = React.useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [ref]
    );

    const clampSize = React.useCallback(
      (next: number) => {
        const viewport = horizontal ? window.innerWidth : window.innerHeight;
        return Math.min(maxSize ?? viewport * 0.9, Math.max(minSize, next));
      },
      [horizontal, maxSize, minSize]
    );

    const measureSize = React.useCallback(() => {
      if (size != null) return size;
      const rect = contentRef.current?.getBoundingClientRect();
      return rect ? (horizontal ? rect.width : rect.height) : minSize;
    }, [horizontal, minSize, size]);

    const growDirection = side === 'right' || side === 'bottom' ? -1 : 1;

    const handlePointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (!contentRef.current) return;
        event.preventDefault();
        event.stopPropagation();

        const rect = contentRef.current.getBoundingClientRect();
        const startPos = horizontal ? event.clientX : event.clientY;
        const startSize = horizontal ? rect.width : rect.height;

        const handleMove = (moveEvent: PointerEvent) => {
          const current = horizontal ? moveEvent.clientX : moveEvent.clientY;
          setSize(clampSize(startSize + growDirection * (current - startPos)));
        };
        const previousUserSelect = document.body.style.userSelect;
        const cleanup = () => {
          window.removeEventListener('pointermove', handleMove);
          window.removeEventListener('pointerup', cleanup);
          window.removeEventListener('pointercancel', cleanup);
          window.removeEventListener('blur', cleanup);
          document.body.style.userSelect = previousUserSelect;
          dragCleanupRef.current = null;
        };
        dragCleanupRef.current?.();
        dragCleanupRef.current = cleanup;

        document.body.style.userSelect = 'none';
        window.addEventListener('pointermove', handleMove);
        window.addEventListener('pointerup', cleanup);
        window.addEventListener('pointercancel', cleanup);
        window.addEventListener('blur', cleanup);
      },
      [clampSize, growDirection, horizontal]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 64 : 16;
        let coordDelta = 0;
        if (horizontal) {
          if (event.key === 'ArrowRight') coordDelta = step;
          else if (event.key === 'ArrowLeft') coordDelta = -step;
        } else if (event.key === 'ArrowDown') coordDelta = step;
        else if (event.key === 'ArrowUp') coordDelta = -step;

        if (coordDelta !== 0) {
          event.preventDefault();
          setSize(clampSize(measureSize() + growDirection * coordDelta));
        } else if (event.key === 'Home') {
          event.preventDefault();
          setSize(clampSize(minSize));
        } else if (event.key === 'End') {
          event.preventDefault();
          const viewport = horizontal ? window.innerWidth : window.innerHeight;
          setSize(clampSize(maxSize ?? viewport * 0.9));
        }
      },
      [clampSize, growDirection, horizontal, maxSize, measureSize, minSize]
    );

    return (
      <SheetPortal>
        <SheetOverlay />
        <SheetPrimitive.Content
          ref={setRefs}
          className={cn(sheetVariants({ side }), className)}
          style={
            resizable && size != null
              ? {
                  ...style,
                  [horizontal ? 'width' : 'height']: size,
                  ...(horizontal ? { maxWidth: 'none' } : { maxHeight: 'none' }),
                }
              : style
          }
          {...props}
        >
          {resizable && (
            <div
              role='separator'
              aria-orientation={horizontal ? 'vertical' : 'horizontal'}
              aria-label='Resize panel'
              tabIndex={0}
              onPointerDown={handlePointerDown}
              onKeyDown={handleKeyDown}
              className={cn(
                'absolute z-50 transition-colors active:bg-border/80 focus-visible:bg-border focus-visible:outline-none',
                resizeHandleVariants[side]
              )}
            />
          )}
          {!hideClose && (
            <SheetPrimitive.Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary'>
              <X className='size-4' />
              <span className='sr-only'>Close</span>
            </SheetPrimitive.Close>
          )}
          {children}
        </SheetPrimitive.Content>
      </SheetPortal>
    );
  }
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-foreground', className)}
    {...props}
  />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  sheetVariants,
};
