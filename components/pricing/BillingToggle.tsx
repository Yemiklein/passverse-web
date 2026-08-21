'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { PRICING_PLANS, savings, formatNaira, type BillingPeriod } from '@/lib/pricing';

const PERIODS: BillingPeriod[] = ['monthly', 'quarterly', 'yearly'];

interface BillingToggleProps {
  value: BillingPeriod;
  onChange: (period: BillingPeriod) => void;
  size?: 'sm' | 'md';
}

export function BillingToggle({ value, onChange, size = 'md' }: BillingToggleProps) {
  const plan = PRICING_PLANS[value];
  const save = savings(plan);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        role="tablist"
        aria-label="Billing period"
        className={cn(
          'inline-flex rounded-full bg-[var(--color-gray-100)] p-1',
          size === 'sm' ? 'text-xs' : 'text-sm',
        )}
      >
        {PERIODS.map((period) => {
          const isActive = value === period;
          return (
            <button
              key={period}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(period)}
              className={cn(
                'font-semibold rounded-full transition-colors duration-150',
                size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2',
                isActive
                  ? 'bg-white text-[var(--color-gray-900)] shadow-sm'
                  : 'text-[var(--color-gray-400)] hover:text-[var(--color-gray-600)]',
              )}
            >
              {PRICING_PLANS[period].shortLabel}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        {save > 0 && (
          <motion.span
            key={value}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full"
          >
            Save {formatNaira(save)}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
