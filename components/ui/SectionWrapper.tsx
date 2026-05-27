import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface SectionWrapperProps {
  children:   ReactNode;
  className?: string;
  id?:        string;
}

export function SectionWrapper({ children, className, id }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-20 px-4 md:px-8',
        className,
      )}
    >
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
}

export default SectionWrapper;
