import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

function Spinner({ className, ...props }: React.ComponentProps<'svg'>) {
  return (
    <Loader2Icon
      role='status'
      aria-label='Loading'
      className={cn(
        'size-6 animate-spin stroke-[2.5] stroke-[--color-background-primary]',
        // Neutral track under the arc: radius 9 and stroke 2.5 in the 24-unit icon box.
        'rounded-full bg-[radial-gradient(circle_closest-side,transparent_64.6%,var(--color-border-default)_64.6%_85.4%,transparent_85.4%)]',
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
