'use client';

import * as React from 'react';

import { TooltipProvider } from '@/components/shadcn/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import {
  SIDEBAR_COOKIE_MAX_AGE,
  SIDEBAR_COOKIE_NAME,
  SIDEBAR_KEYBOARD_SHORTCUT,
  SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_ICON,
} from './constants';

type SidebarContextValue = {
  state: 'expanded' | 'collapsed';
  sidebarAvailable: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  mobileTriggerRef: React.RefObject<HTMLButtonElement | null>;
  mobileReturnFocusRef: React.RefObject<HTMLButtonElement | null>;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function useOptionalSidebar(): SidebarContextValue | undefined {
  return React.useContext(SidebarContext);
}

export function useSidebar(): SidebarContextValue {
  const context = useOptionalSidebar();
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }
  return context;
}

export const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    sidebarAvailable?: boolean;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      sidebarAvailable = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);
    // Leaving the mobile breakpoint must not leave the drawer marked open, or
    // the sheet reopens on the next return to mobile.
    React.useEffect(() => {
      if (!isMobile) setOpenMobile(false);
    }, [isMobile]);
    const mobileTriggerRef = React.useRef<HTMLButtonElement | null>(null);
    const mobileReturnFocusRef = React.useRef<HTMLButtonElement | null>(null);
    const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
    const open = openProp ?? internalOpen;
    const setOpen = React.useCallback(
      (value: boolean | ((currentValue: boolean) => boolean)) => {
        const openState = typeof value === 'function' ? value(open) : value;
        if (setOpenProp) setOpenProp(openState);
        else setInternalOpen(openState);
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [open, setOpenProp]
    );
    const toggleSidebar = React.useCallback(() => {
      if (!sidebarAvailable) return;
      if (isMobile) setOpenMobile(currentValue => !currentValue);
      else setOpen(currentValue => !currentValue);
    }, [isMobile, setOpen, sidebarAvailable]);

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          sidebarAvailable &&
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [sidebarAvailable, toggleSidebar]);

    const state = open ? 'expanded' : 'collapsed';
    const contextValue = React.useMemo<SidebarContextValue>(
      () => ({
        state,
        sidebarAvailable,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        mobileTriggerRef,
        mobileReturnFocusRef,
        toggleSidebar,
      }),
      [state, sidebarAvailable, open, setOpen, isMobile, openMobile, toggleSidebar]
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <div
            style={
              {
                '--sidebar-width': SIDEBAR_WIDTH,
                '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              'group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar',
              className
            )}
            ref={ref}
            {...props}
          >
            {children}
          </div>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  }
);
SidebarProvider.displayName = 'SidebarProvider';
