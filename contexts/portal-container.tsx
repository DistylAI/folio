'use client';

import * as React from 'react';

// Directs Radix portal components (Dialog, Tooltip, etc.) to render inside the
// app's scoped wrapper div instead of document.body, so that Tailwind's
// `important: '.dtk-<app>'` ancestor selector matches portal content.
//
// Shortcoming: if the wrapper div (or any ancestor) ever has `transform`,
// `opacity < 1`, `filter`, or `will-change: transform` applied — e.g. during
// a CSS animation — the browser creates a new stacking context. Portal content
// with z-50 is then confined to that context and can be painted under elements
// outside the wrapper. The portal mount point is placed at the END of the
// wrapper to mitigate same-stacking-context DOM-order issues, but the
// stacking-context-containment risk remains. The only way to avoid it entirely
// is to render to document.body, which would break per-app style isolation.
// undefined means that no app provider exists. null means that an app
// provider exists but its mount element is not ready. Portal wrappers must
// keep those states distinct so an app never leaks its first render to body.
const PortalContainerContext = React.createContext<HTMLElement | null | undefined>(undefined);

export function PortalContainerProvider({
  container,
  children,
}: {
  container: HTMLElement | null;
  children: React.ReactNode;
}) {
  return (
    <PortalContainerContext.Provider value={container}>{children}</PortalContainerContext.Provider>
  );
}

export function usePortalContainer() {
  return React.useContext(PortalContainerContext);
}

/** Returns null while an app provider is waiting for its required mount. */
export function usePortalContainerProps(): { container?: HTMLElement } | null {
  const container = usePortalContainer();
  if (container === null) return null;
  return container === undefined ? {} : { container };
}
