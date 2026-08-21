export type BillingPeriod = 'monthly' | 'quarterly' | 'yearly';

export interface PricingPlan {
  id: BillingPeriod;
  label: string;
  shortLabel: string;
  price: number;
  displayPrice: string;
  period: string;
  /** Full price if paid monthly for the same duration, for savings comparison. */
  monthlyEquivalentTotal: number;
}

export const PRICING_PLANS: Record<BillingPeriod, PricingPlan> = {
  monthly: {
    id: 'monthly',
    label: 'Monthly',
    shortLabel: 'Monthly',
    price: 2000,
    displayPrice: '₦2,000',
    period: '/month',
    monthlyEquivalentTotal: 2000,
  },
  quarterly: {
    id: 'quarterly',
    label: 'Quarterly',
    shortLabel: '3 Months',
    price: 4500,
    displayPrice: '₦4,500',
    period: '/3 months',
    monthlyEquivalentTotal: 2000 * 3,
  },
  yearly: {
    id: 'yearly',
    label: 'Yearly',
    shortLabel: 'Yearly',
    price: 12000,
    displayPrice: '₦12,000',
    period: '/year',
    monthlyEquivalentTotal: 2000 * 12,
  },
};

export function savings(plan: PricingPlan): number {
  return plan.monthlyEquivalentTotal - plan.price;
}

export function formatNaira(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}
