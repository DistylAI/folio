// Custom wrapper instead of shadcn/sonner: the shadcn version depends on next-themes (useTheme)
// which requires a <ThemeProvider> not present in Vite-based apps. Sonner defaults theme to
// "system" when no theme prop is passed. This wrapper does not select the page theme.
//
// Usage: each app must mount <Toaster> once at the root of its component tree to display toasts.
// Use the following props for consistent Distyl branding:
//
//   <Toaster closeButton position="top-right" richColors />
//
// Then trigger toasts anywhere using the re-exported `toast` helper:
//
//   import { toast } from '@distylai/toolkit-ui';
//   toast.success('Saved!');
//   toast.error('Something went wrong.');
import { type ExternalToast, toast as sonnerToast, Toaster as Sonner } from 'sonner';

import { cn } from '@/lib/utils';

const errorToast: (typeof sonnerToast)['error'] = (message, data?: ExternalToast) =>
  sonnerToast.error(message, { closeButton: true, duration: Infinity, ...data });

const toast: typeof sonnerToast = Object.assign(
  (...args: Parameters<typeof sonnerToast>) => sonnerToast(...args),
  sonnerToast,
  { error: errorToast }
);

export { toast };

type ToasterProps = React.ComponentProps<typeof Sonner> & {
  /** Applies Toolkit semantic token colors. The default keeps Sonner's existing appearance. */
  variant?: 'default' | 'semantic';
};

// Sonner reads its colors from these CSS variables. Inline values win over its
// stylesheet, so the toasts keep Sonner's layout and take the Toolkit tokens.
// Folio look: tinted surface, soft in-hue stroke, contrast-tuned text.
const semanticColorVariables = {
  '--normal-bg': 'var(--color-background-default)',
  '--normal-border': 'var(--color-border-default)',
  '--normal-text': 'var(--color-text-default)',
  '--success-bg': 'var(--color-background-success)',
  '--success-border': 'color-mix(in srgb, var(--color-border-success) 30%, transparent)',
  '--success-text': 'var(--color-text-success)',
  '--warning-bg': 'var(--color-background-warning)',
  '--warning-border': 'color-mix(in srgb, var(--color-border-warning) 30%, transparent)',
  '--warning-text': 'var(--color-text-warning)',
  '--error-bg': 'var(--color-background-danger)',
  '--error-border': 'color-mix(in srgb, var(--color-border-danger) 30%, transparent)',
  '--error-text': 'var(--color-text-danger)',
  '--info-bg': 'var(--color-background-info)',
  '--info-border': 'color-mix(in srgb, var(--color-border-info) 30%, transparent)',
  '--info-text': 'var(--color-text-info)',
} as React.CSSProperties;

/**
 * Sonner Toaster. Mount once at your app root:
 * ```tsx
 * <Toaster closeButton position="top-right" richColors />
 * ```
 * Use `variant="semantic"` only after the app uses the Toolkit theme contract.
 * It keeps Sonner's layout and maps Sonner's color variables to the Toolkit tokens.
 *
 * Then trigger toasts anywhere via the re-exported `toast` helper:
 * ```tsx
 * import { toast } from '@distylai/toolkit-ui';
 * toast.success('Saved!');
 * toast.error('Something went wrong.');
 * ```
 */
const Toaster = ({
  className,
  richColors,
  style,
  toastOptions,
  variant = 'default',
  ...props
}: ToasterProps) => {
  const usesSemanticColors = variant === 'semantic';
  const usesRichColors = usesSemanticColors || richColors;

  return (
    <Sonner
      {...props}
      className={cn('toaster group', className)}
      richColors={usesRichColors}
      style={{ ...(usesSemanticColors ? semanticColorVariables : {}), ...style, zIndex: 50 }}
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn(
            toastOptions?.classNames?.toast,
            usesRichColors
              ? 'group toast group-[.toaster]:rounded-xl group-[.toaster]:shadow-lg'
              : 'group toast group-[.toaster]:rounded-xl group-[.toaster]:border group-[.toaster]:border-border group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:shadow-lg'
          ),
          description: cn(
            toastOptions?.classNames?.description,
            usesRichColors ? undefined : 'group-[.toast]:!text-foreground'
          ),
          actionButton: cn(
            toastOptions?.classNames?.actionButton,
            'group-[.toast]:bg-primary group-[.toast]:text-inverse'
          ),
          cancelButton: cn(
            toastOptions?.classNames?.cancelButton,
            'group-[.toast]:bg-secondary group-[.toast]:text-muted-foreground'
          ),
          closeButton: cn(
            toastOptions?.classNames?.closeButton,
            'group-[.toast]:!border-border group-[.toast]:!bg-background group-[.toast]:!text-foreground'
          ),
          // Same tint + soft stroke recipe as Alert.
          success: cn(
            toastOptions?.classNames?.success,
            'group-[.toaster]:!border-success/30 group-[.toaster]:!bg-success-subtle group-[.toaster]:!text-success'
          ),
          error: cn(
            toastOptions?.classNames?.error,
            'group-[.toaster]:!border-destructive/30 group-[.toaster]:!bg-destructive-subtle group-[.toaster]:!text-destructive'
          ),
          warning: cn(
            toastOptions?.classNames?.warning,
            'group-[.toaster]:!border-warning/30 group-[.toaster]:!bg-warning-subtle group-[.toaster]:!text-warning'
          ),
          info: cn(
            toastOptions?.classNames?.info,
            'group-[.toaster]:!border-info/30 group-[.toaster]:!bg-info-subtle group-[.toaster]:!text-info'
          ),
        },
      }}
    />
  );
};

export { Toaster };
