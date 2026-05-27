import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CardProps {
  children:   ReactNode;
  className?: string;
  hover?:     boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl border border-[var(--color-gray-100)] shadow-[var(--shadow-sm)]',
        hover && 'hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-200',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
