'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BillingToggle } from '@/components/pricing/BillingToggle';
import { PRICING_PLANS, savings, formatNaira, type BillingPeriod } from '@/lib/pricing';
import { PRICING_FAQS as FAQS } from '@/lib/pricingFaqs';

/* ─── Features shared across all premium plans ────── */
const PREMIUM_FEATURES = [
  'Everything in Free',
  'Full archive 2001–2025',
  'Unlimited mock exams (CBT mode)',
  'Unlimited AI explanations',
  'AI follow-up questions (3 per answer)',
  'Score prediction report',
  '2 streak freeze tokens/month',
  'Ranked weekly leaderboard',
  'Priority email support',
];

const FREE_INCLUDED = [
  'Latest 3 years of past questions',
  'Basic quiz mode (Practice)',
  '5 AI explanations per day',
  'Streak tracking',
  'XP and badges',
  'Works offline (cached questions)',
];

const FREE_EXCLUDED = [
  'Mock exams (timed CBT)',
  'Full archive 2001–2025',
  'Unlimited AI explanations',
  'AI follow-up questions',
  'Score prediction',
  'Streak freeze tokens',
  'Ranked leaderboard',
];

/* ─── Comparison table rows ──────────────────────── */
const TABLE_ROWS: { feature: string; free: string; premium: string }[] = [
  { feature: 'Past questions access', free: '3 years',   premium: 'Full 2001–2025' },
  { feature: 'Mock exams',            free: '✗',         premium: 'Unlimited' },
  { feature: 'AI explanations',       free: '5/day',     premium: 'Unlimited' },
  { feature: 'AI follow-up questions',free: '✗',         premium: '✓' },
  { feature: 'Score prediction',      free: '✗',         premium: '✓' },
  { feature: 'Streak freeze tokens',  free: '✗',         premium: '2/month' },
  { feature: 'Leaderboard',          free: 'View only', premium: 'Ranked' },
  { feature: 'Offline access',        free: 'Cached only',premium: 'Full' },
  { feature: 'Badge & XP system',    free: '✓',         premium: '✓' },
  { feature: 'Priority support',      free: '✗',         premium: '✓' },
  { feature: 'Price',                 free: '₦0',        premium: '' },
];

/* ─── FAQ data ────────────────────────────────────── */
/* FAQ content lives in lib/pricingFaqs.ts so the page UI and the FAQPage
   structured data (app/pricing/page.tsx) stay in sync. */

/* ─── Accordion ──────────────────────────────────── */
function PricingFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {FAQS.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="rounded-xl border border-[var(--color-gray-100)] bg-white overflow-hidden">
            <button
              aria-expanded={isOpen}
              aria-controls={`faq-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-[var(--color-gray-50)] transition-colors"
            >
              <span className="font-semibold text-[var(--color-gray-900)] text-sm">{faq.q}</span>
              <ChevronDown size={18} aria-hidden="true" className={cn('flex-shrink-0 text-[var(--color-gray-400)] transition-transform duration-200', isOpen && 'rotate-180')} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-sm text-[var(--color-gray-600)] leading-relaxed border-t border-[var(--color-gray-100)] pt-4">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Main client component ───────────────────────── */
export function PricingClient() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const [tableExpanded, setTableExpanded] = useState(false);

  const visibleRows = tableExpanded ? TABLE_ROWS : TABLE_ROWS.slice(0, 6);

  return (
    <div>
      {/* ── Billing toggle ── */}
      <div className="flex items-center justify-center mb-12">
        <BillingToggle value={billing} onChange={setBilling} />
      </div>

      {/* ── Pricing cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

        {/* FREE */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0, duration: 0.5 }}
          className="relative rounded-2xl border border-[var(--color-gray-100)] bg-white p-7 flex flex-col"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[var(--color-gray-100)] text-[var(--color-gray-600)] mb-4 self-start">
            Free Forever
          </span>
          <div className="mb-1">
            <span className="text-4xl font-extrabold text-[var(--color-gray-900)]">₦0</span>
          </div>
          <p className="text-sm text-[var(--color-gray-400)] mb-6">No credit card required</p>

          <ul className="space-y-2 mb-6 flex-1">
            {FREE_INCLUDED.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-gray-700)]">
                <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
            {FREE_EXCLUDED.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-gray-400)] line-through">
                <span className="font-bold mt-0.5 flex-shrink-0">✗</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/download"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold py-3 px-6 text-sm hover:bg-[var(--color-primary-light)] transition-colors duration-150"
          >
            Download Free
          </a>
        </motion.div>

        {/* MONTHLY PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className={cn(
            'relative rounded-2xl border-2 border-[var(--color-primary)] bg-white p-7 flex flex-col',
            'shadow-[0_8px_40px_rgba(65,105,225,0.18)] scale-[1.02] md:scale-105 z-10',
          )}
        >
          {/* Most Popular ribbon */}
          <div className="absolute -top-3 right-5">
            <span className="bg-[var(--color-amber)] text-white text-xs font-bold px-4 py-1 rounded-full shadow">
              Most Popular
            </span>
          </div>

          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[var(--color-amber-light)] text-[var(--color-amber-dark)] mb-4 self-start">
            Monthly Premium
          </span>
          <div className="mb-1 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[var(--color-gray-900)]">{PRICING_PLANS.monthly.displayPrice}</span>
            <span className="text-[var(--color-gray-400)] text-sm">/month</span>
          </div>
          <p className="text-sm text-[var(--color-gray-400)] mb-6">Billed monthly, cancel anytime</p>

          <ul className="space-y-2 mb-6 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-gray-700)]">
                <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/download"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-6 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md"
          >
            Get Monthly Premium
          </a>
        </motion.div>

        {/* QUARTERLY PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="relative rounded-2xl border border-[var(--color-gray-100)] bg-white p-7 flex flex-col"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-[var(--color-teal-light)] text-[var(--color-teal-dark)] mb-4 self-start">
            Quarterly Premium
          </span>
          <div className="mb-1 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[var(--color-gray-900)]">{PRICING_PLANS.quarterly.displayPrice}</span>
            <span className="text-[var(--color-gray-400)] text-sm">/3 months</span>
          </div>
          <p className="text-sm text-[var(--color-gray-400)] mb-6">
            Save {formatNaira(savings(PRICING_PLANS.quarterly))} vs monthly
          </p>

          <ul className="space-y-2 mb-6 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-gray-700)]">
                <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/download"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-6 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md"
          >
            Get Quarterly Premium
          </a>
        </motion.div>

        {/* YEARLY PREMIUM */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative rounded-2xl border border-[var(--color-gray-100)] bg-white p-7 flex flex-col"
        >
          <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 mb-4 self-start">
            Best Value
          </span>
          <div className="mb-1 flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-[var(--color-gray-900)]">{PRICING_PLANS.yearly.displayPrice}</span>
            <span className="text-[var(--color-gray-400)] text-sm">/year</span>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-[var(--color-gray-400)] line-through">{formatNaira(PRICING_PLANS.yearly.monthlyEquivalentTotal)}/year</span>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">
              You save {formatNaira(savings(PRICING_PLANS.yearly))}
            </span>
          </div>
          <p className="text-sm text-[var(--color-gray-400)] mb-6">Save {formatNaira(savings(PRICING_PLANS.yearly))} vs monthly</p>

          <ul className="space-y-2 mb-6 flex-1">
            {PREMIUM_FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-[var(--color-gray-700)]">
                <span className="text-emerald-500 font-bold mt-0.5 flex-shrink-0">✓</span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href="/download"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-center rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-6 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md"
          >
            Get Yearly Premium
          </a>
        </motion.div>
      </div>

      {/* ── Comparison table ── */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] text-center mb-8">
          Compare Plans
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-[var(--color-gray-100)]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-gray-100)] bg-[var(--color-gray-50)]">
                <th className="text-left p-4 font-semibold text-[var(--color-gray-600)] w-2/5">Feature</th>
                <th className="p-4 font-semibold text-[var(--color-gray-600)] text-center">Free</th>
                <th className="p-4 font-semibold text-[var(--color-primary)] text-center">Monthly</th>
                <th className="p-4 font-semibold text-[var(--color-primary)] text-center">Quarterly</th>
                <th className="p-4 font-semibold text-[var(--color-primary)] text-center">Yearly</th>
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, i) => {
                const isPrice = row.feature === 'Price';
                return (
                  <tr
                    key={row.feature}
                    className={cn('border-b border-[var(--color-gray-100)] last:border-0', i % 2 === 0 ? 'bg-white' : 'bg-[var(--color-gray-50)]')}
                  >
                    <td className="p-4 text-[var(--color-gray-700)] font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      <TableCell value={isPrice ? '₦0' : row.free} />
                    </td>
                    <td className="p-4 text-center">
                      <TableCell value={isPrice ? `${PRICING_PLANS.monthly.displayPrice}/mo` : row.premium} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <TableCell value={isPrice ? `${PRICING_PLANS.quarterly.displayPrice}/3mo` : row.premium} highlight />
                    </td>
                    <td className="p-4 text-center">
                      <TableCell value={isPrice ? `${PRICING_PLANS.yearly.displayPrice}/yr` : row.premium} highlight />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Expand / collapse on mobile */}
        <div className="text-center mt-4">
          <button
            onClick={() => setTableExpanded((v) => !v)}
            className="text-sm text-[var(--color-primary)] font-semibold hover:underline inline-flex items-center gap-1"
          >
            {tableExpanded ? 'Show less' : `Show all ${TABLE_ROWS.length} features`}
            <ChevronDown size={14} className={cn('transition-transform duration-200', tableExpanded && 'rotate-180')} />
          </button>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="max-w-2xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] text-center mb-8">
          Frequently Asked Questions
        </h2>
        <PricingFAQ />
      </div>

      {/* ── Bottom CTA ── */}
      <div className="text-center rounded-2xl bg-[var(--color-gray-50)] border border-[var(--color-gray-100)] p-10">
        <p className="text-lg font-semibold text-[var(--color-gray-900)] mb-2">
          Still not sure? Start free — no credit card needed.
        </p>
        <p className="text-sm text-[var(--color-gray-400)] mb-6">
          Download PassVerse, practise with the latest 3 years, and upgrade whenever you&apos;re ready.
        </p>
        <a
          href="/download"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-8 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md"
        >
          Download Free →
        </a>
      </div>
    </div>
  );
}

/* ─── Helper ─────────────────────────────────────── */
function TableCell({ value, highlight = false }: { value: string; highlight?: boolean }) {
  if (value === '✓') return <span className={cn('font-bold', highlight ? 'text-emerald-500' : 'text-emerald-500')}>✓</span>;
  if (value === '✗') return <span className="font-bold text-[var(--color-gray-300)]">✗</span>;
  return <span className={cn('text-xs font-medium', highlight ? 'text-[var(--color-primary)]' : 'text-[var(--color-gray-600)]')}>{value}</span>;
}
