import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'teal' | 'amber' | 'coral';

interface BadgeProps {
  children:   ReactNode;
  variant?:   BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  primary: 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]',
  teal:    'bg-[var(--color-teal-light)]    text-[var(--color-teal-dark)]',
  amber:   'bg-[var(--color-amber-light)]   text-[var(--color-amber-dark)]',
  coral:   'bg-[var(--color-coral-light)]   text-[var(--color-coral-dark)]',
};

export function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Badge;
