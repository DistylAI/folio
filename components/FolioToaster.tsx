'use client';

import * as React from 'react';

import { Toaster } from '@/components/shadcn/sonner';
import { Spinner } from '@/components/shadcn/spinner';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

/**
 * Site-level Toaster that follows the `data-theme` attribute on `<html>`.
 * The toolkit-ui Toaster stays unchanged; this wrapper only passes `theme`.
 */
export function FolioToaster() {
  const [theme, setTheme] = React.useState<Theme>('light');

  React.useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return <Toaster theme={theme} position="bottom-right" icons={{ loading: <Spinner className="size-4" /> }} />;
}
