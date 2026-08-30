'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DOWNLOAD_PAGE_URL } from '@/lib/constants';
import { SEPTEMBER_PROMO } from '@/lib/promo';
import { usePromoActive } from '@/components/promo/usePromoActive';

interface PromoBannerProps {
  /** Extra classes for the outer wrapper (e.g. margins in the host layout). */
  className?: string;
}

/**
 * Date-gated September promo banner. Renders nothing outside the promo window.
 * Safe to drop into any page header — it self-hides on October 1.
 */
export function PromoBanner({ className }: PromoBannerProps) {
  const active = usePromoActive();
  const reduceMotion = useReducedMotion();

  if (!active) return null;

  return (
    <motion.aside
      aria-label="September promotion"
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div
        className="relative overflow-hidden rounded-2xl px-6 py-6 md:px-8 md:py-7 text-white shadow-lg"
        style={{
          background:
            'linear-gradient(135deg, #1D9E75 0%, #12876a 55%, #0F6E56 100%)',
        }}
      >
        {/* soft glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full"
          style={{ background: 'rgba(255,255,255,0.12)' }}
        />
        <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-white/85">
              <Sparkles size={14} aria-hidden="true" />
              {SEPTEMBER_PROMO.eyebrow}
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
              {SEPTEMBER_PROMO.title} 🎉
            </h2>
            <p className="max-w-2xl text-sm text-white/85 leading-relaxed">
              {SEPTEMBER_PROMO.subtitle}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 md:items-end">
            <Button
              href={DOWNLOAD_PAGE_URL}
              size="lg"
              variant="primary"
              className="bg-white text-[var(--color-teal-dark)] hover:bg-white/90"
              aria-label="Download PassVerse and claim free September Premium"
            >
              {SEPTEMBER_PROMO.ctaLabel}
            </Button>
            <span className="text-xs font-medium text-white/70">
              {SEPTEMBER_PROMO.endsLabel}
            </span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

export default PromoBanner;
