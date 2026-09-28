'use client';

/** Single-select combobox: a Popover + Command composition for searchable selection. */
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Button } from '@/components/shadcn/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn/popover';
import { Spinner } from '@/components/shadcn/spinner';
import { cn } from '@/lib/utils';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  /** Rendered as-is next to the label; wrap it yourself (e.g. in a Badge) to control styling. */
  tag?: ReactNode;
  /** Reserved for grouped rendering (a CommandGroup per distinct value); not yet implemented, every option still renders in one flat list regardless of this field. */
  group?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  /** by default Re-selecting the current value clears it. when true, reselection noops */
  noopOnReselect?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  size?: 'default' | 'sm';
  className?: string;
  /** Alias of `className` on the trigger; kept for back-compat with fe-distillery call sites. */
  triggerClassName?: string;
  contentClassName?: string;
  onSearchChange?: (value: string) => void;
  /** Set false to skip cmdk's client-side filtering (e.g. when searching server-side). */
  shouldFilter?: boolean;
  /** Explicit label for the current value when the selected option isn't in `options`. */
  selectedLabel?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  onLoadMore?: () => void | Promise<void>;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  /** True while a new search/systemId requery is in flight and `options` may still show the
   * previous query's results (e.g. via `keepPreviousData`). Unlike `isLoading`, the trigger stays
   * enabled; unlike `isLoadingMore`, this signals a fresh search landing, not a pagination
   * continuation. */
  isSearching?: boolean;
  'aria-label'?: string;
  'aria-required'?: boolean | undefined;
  'aria-invalid'?: boolean | undefined;
  'aria-describedby'?: string | undefined;
  /** Set true when the combobox renders inside a modal Dialog. The popover then traps
   * focus and blocks outside scroll, so keyboard navigation stays inside it. */
  modal?: boolean;
}

/**
 * Searchable single-select dropdown built from Popover + Command (cmdk).
 *
 * Supports static option lists (client-side filtering) as well as async/server-driven
 * search + infinite scroll via `onSearchChange` + `shouldFilter={false}` + `onLoadMore`/`hasMore`.
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState('');
 * <Combobox
 *   options={[{ value: 'next', label: 'Next.js' }, { value: 'remix', label: 'Remix' }]}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select framework…"
 * />
 * ```
 */
function Combobox({
  options,
  value,
  onValueChange,
  noopOnReselect = false,
  placeholder = 'Select an option…',
  searchPlaceholder = 'Search…',
  emptyText = 'No results found.',
  disabled = false,
  size = 'default',
  className,
  triggerClassName,
  contentClassName,
  onSearchChange,
  shouldFilter = true,
  selectedLabel,
  icon,
  isLoading = false,
  onLoadMore,
  hasMore = false,
  isLoadingMore = false,
  isSearching = false,
  'aria-label': ariaLabel,
  'aria-required': ariaRequired,
  'aria-invalid': ariaInvalid,
  'aria-describedby': ariaDescribedby,
  modal = false,
}: ComboboxProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState('');
  const [internalSearchValue, setInternalSearchValue] = useState('');
  const listRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Infinite scroll: load more when the sentinel scrolls into view.
  useEffect(() => {
    if (!open || !hasMore || isLoadingMore || !onLoadMore) return;

    let observer: IntersectionObserver | null = null;

    const rafId = requestAnimationFrame(() => {
      const sentinel = sentinelRef.current;
      const listContainer = listRef.current;
      if (!sentinel || !listContainer) return;

      observer = new IntersectionObserver(
        entries => {
          const [entry] = entries;
          if (entry?.isIntersecting) {
            onLoadMore();
          }
        },
        { root: listContainer, threshold: 0.1 }
      );

      observer.observe(sentinel);
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
    };
  }, [open, hasMore, isLoadingMore, onLoadMore]);

  // Controlled when `value` is provided, otherwise uncontrolled.
  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = options.find(option => option.value === currentValue);
  const displayLabel = selectedLabel ?? selectedOption?.label ?? currentValue;

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setInternalSearchValue('');
      onSearchChange?.('');
    }
  };

  const handleSelect = (selectedValue: string) => {
    const isReselectingCurrentValue = selectedValue === currentValue;
    if (isReselectingCurrentValue && noopOnReselect) {
      handleOpenChange(false);
      return;
    }

    const newValue = isReselectingCurrentValue ? '' : selectedValue;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    handleOpenChange(false);
  };

  const handleSearchChange = (searchValue: string) => {
    setInternalSearchValue(searchValue);
    if (listRef.current) listRef.current.scrollTop = 0;
    onSearchChange?.(searchValue);
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size={size}
          role='combobox'
          aria-expanded={open}
          // aria-label replaces descendant text for the accessible name, so fold the selected
          // value in here too, otherwise a screen reader announces the field name but never
          // which option is selected.
          aria-label={ariaLabel ? `${ariaLabel}: ${displayLabel || placeholder}` : undefined}
          aria-required={ariaRequired || undefined}
          aria-invalid={ariaInvalid || undefined}
          aria-describedby={ariaDescribedby}
          disabled={disabled || isLoading}
          className={cn(
            'w-full justify-between',
            !displayLabel && 'text-muted-foreground',
            className,
            triggerClassName
          )}
        >
          <span className='flex min-w-0 items-center gap-1.5'>
            {icon}
            <span className='min-w-0 truncate'>{displayLabel || placeholder}</span>
          </span>
          <ChevronsUpDown className='ml-2 size-4 shrink-0 text-muted-foreground' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn('w-[var(--radix-popover-trigger-width)] p-0', contentClassName)}
        align='start'
      >
        <Command shouldFilter={shouldFilter}>
          <CommandInput
            placeholder={searchPlaceholder}
            value={onSearchChange ? internalSearchValue : undefined}
            onValueChange={handleSearchChange}
          />
          <CommandList ref={listRef}>
            {isSearching && !isLoading && (
              <div
                role='status'
                className='flex items-center justify-center gap-2 border-b border-border px-2 py-1.5 text-xs text-muted-foreground'
              >
                <Spinner className='size-3' />
                Updating results…
              </div>
            )}
            {!isSearching && !isLoading && <CommandEmpty>{emptyText}</CommandEmpty>}
            <CommandGroup>
              {isLoading && options.length === 0 && <CommandItem disabled>Loading…</CommandItem>}
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  // value is cmdk's item identity — must be unique (labels can repeat);
                  // keywords keeps the visible label searchable by client-side filtering.
                  value={option.value}
                  keywords={[option.label]}
                  disabled={option.disabled}
                  onSelect={() => handleSelect(option.value)}
                >
                  <Check
                    className={cn(
                      'order-last ml-auto size-4 shrink-0',
                      currentValue === option.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <span className='flex min-w-0 flex-1 items-center justify-between gap-2'>
                    <span className='truncate'>{option.label}</span>
                    {option.tag}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
            {hasMore && onLoadMore && (
              <div ref={sentinelRef} className='flex items-center justify-center p-2'>
                {isLoadingMore && <Spinner className='text-muted-foreground' />}
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export { Combobox };
