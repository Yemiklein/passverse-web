'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

interface AnimatedSectionProps {
  children:   ReactNode;
  delay?:     number;
  direction?: Direction;
  className?: string;
}

const initialVariants: Record<Direction, { opacity: number; x?: number; y?: number }> = {
  up:    { opacity: 0, y: 40 },
  left:  { opacity: 0, x: -40 },
  right: { opacity: 0, x: 40 },
};

const animateVariant = { opacity: 1, x: 0, y: 0 };

export function AnimatedSection({
  children,
  delay     = 0,
  direction = 'up',
  className,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={initialVariants[direction]}
      whileInView={animateVariant}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedSection;
