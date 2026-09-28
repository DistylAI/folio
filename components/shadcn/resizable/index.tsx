'use client';

import { GripVertical } from 'lucide-react';
import * as ResizablePrimitive from 'react-resizable-panels';

import { cn } from '@/lib/utils';

/**
 * Wraps react-resizable-panels v4: `defaultSize`/`minSize`/`maxSize` on
 * `ResizablePanel` are PIXEL values, unlike the percentage scale (0–100) used
 * by v2-based copies of this component (e.g. fe-distillery's local one).
 */
const ResizablePanelGroup = ({
  className,
  direction,
  ...props
}: Omit<React.ComponentProps<typeof ResizablePrimitive.Group>, 'orientation'> & {
  direction?: ResizablePrimitive.Orientation;
}) => (
  <ResizablePrimitive.Group
    className={cn('flex h-full w-full', className)}
    {...(direction !== undefined && { orientation: direction })}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;
const useResizableLayout = ResizablePrimitive.useDefaultLayout;
const useResizablePanelRef = ResizablePrimitive.usePanelRef;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.Separator> & {
  withHandle?: boolean;
}) => (
  <ResizablePrimitive.Separator
    className={cn(
      'relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 aria-[orientation=horizontal]:h-px aria-[orientation=horizontal]:!w-full aria-[orientation=horizontal]:after:left-0 aria-[orientation=horizontal]:after:h-1 aria-[orientation=horizontal]:after:w-full aria-[orientation=horizontal]:after:-translate-y-1/2 aria-[orientation=horizontal]:after:translate-x-0 [&[aria-orientation=horizontal]>div]:rotate-90',
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border border-border bg-primary-subtle'>
        <GripVertical className='size-2.5 text-primary' />
      </div>
    )}
  </ResizablePrimitive.Separator>
);

export {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  useResizableLayout,
  useResizablePanelRef,
};
