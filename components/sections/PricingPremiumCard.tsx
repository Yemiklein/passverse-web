'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BillingToggle } from '@/components/pricing/BillingToggle';
import { PRICING_PLANS, type BillingPeriod } from '@/lib/pricing';

interface PricingFeature {
  text:      string;
  included:  boolean;
}

function FeatureItem({ text, included }: PricingFeature) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex-shrink-0 font-bold text-sm ${
          included ? 'text-emerald-500' : 'text-[var(--color-gray-400)]'
        }`}
        aria-label={included ? 'Included' : 'Not included'}
      >
        {included ? '✓' : '✗'}
      </span>
      <span className={`text-sm ${
        included ? 'text-[var(--color-gray-800)]' : 'text-[var(--color-gray-400)] line-through'
      }`}>
        {text}
      </span>
    </li>
  );
}

export function PricingPremiumCard({ features }: { features: PricingFeature[] }) {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const plan = PRICING_PLANS[billing];

  return (
    <div className="bg-white rounded-2xl border-2 border-[var(--color-primary)] shadow-[var(--shadow-lg)] p-8 flex flex-col gap-6 h-full md:scale-105 relative">
      {/* Most Popular badge */}
      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
        <Badge variant="amber">Most Popular</Badge>
      </div>

      <div>
        <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-2">
          Premium
        </p>
        <div className="flex items-end gap-1">
          <span className="text-5xl font-extrabold text-[var(--color-gray-900)]">{plan.displayPrice}</span>
          <span className="text-[var(--color-gray-400)] mb-1">{plan.period}</span>
        </div>
      </div>

      <BillingToggle value={billing} onChange={setBilling} size="sm" />

      <ul className="flex flex-col gap-3 flex-1">
        {features.map((f) => (
          <FeatureItem key={f.text} {...f} />
        ))}
      </ul>

      <Button href="/pricing" variant="primary" size="md" className="w-full justify-center">
        Get Premium
      </Button>
    </div>
  );
}
