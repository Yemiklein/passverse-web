'use client';

import { useRef, useEffect, useState, memo } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface StatItem {
  icon:   string;
  value:  number;
  suffix: string;
  label:  string;
}

const stats: StatItem[] = [
  { icon: '📝', value: 26675, suffix: '+', label: 'Past Questions' },
  { icon: '👨‍🎓', value: 10000,  suffix: '+', label: 'Students'       },
  { icon: '📚', value: 16,    suffix: '',  label: 'Subjects'        },
];

/* ── Animated counter ── */
function StatCounter({ to, suffix }: { to: number; suffix: string }) {
  const ref          = useRef<HTMLSpanElement>(null);
  const inView       = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) { setCount(to); return; }

    const duration  = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // cubic ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(to * eased));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, reduceMotion]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

/* ── Individual stat card (memo'd for client-side stability) ── */
const StatCard = memo(function StatCard({ icon, value, suffix, label, index }: StatItem & { index: number }) {
  return (
    <AnimatedSection delay={index * 0.15} direction="up">
      <div className="flex flex-col items-center gap-3 py-10 md:py-6 text-center">
        <span className="text-4xl" aria-hidden="true">{icon}</span>
        <p
          className="text-5xl md:text-6xl font-extrabold text-[var(--color-primary)]"
          aria-label={`${value.toLocaleString()}${suffix} ${label}`}
        >
          <StatCounter to={value} suffix={suffix} />
        </p>
        <p className="text-sm font-semibold text-[var(--color-gray-600)] uppercase tracking-widest">
          {label}
        </p>
      </div>
    </AnimatedSection>
  );
});

export function StatsSection() {
  return (
    <section className="py-16 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-center text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)] mb-10">
            Trusted by Nigerian Students
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[var(--color-gray-100)]">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
