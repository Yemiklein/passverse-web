import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize    = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?:  ButtonVariant;
  size?:     ButtonSize;
  children:  ReactNode;
  href?:     string;
  onClick?:  () => void;
  className?: string;
  disabled?:  boolean;
  type?:      'button' | 'submit' | 'reset';
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] ' +
    'active:scale-95 shadow-md hover:shadow-[var(--shadow-glow)] transition-all duration-150',
  secondary:
    'bg-white text-[var(--color-primary)] border-2 border-[var(--color-primary)] ' +
    'hover:bg-[var(--color-primary-light)] transition-all duration-150',
  ghost:
    'text-[var(--color-primary)] hover:bg-[var(--color-primary-light)] ' +
    'transition-all duration-150',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:  'px-4 py-2 text-sm',
  md:  'px-6 py-3 text-base',
  lg:  'px-8 py-4 text-lg',
};

const baseClasses =
  'rounded-full font-semibold inline-flex items-center gap-2 cursor-pointer ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] ' +
  'focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

export function Button({
  variant  = 'primary',
  size     = 'md',
  children,
  href,
  onClick,
  className,
  disabled,
  type = 'button',
}: ButtonProps) {
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}

export default Button;
