/**
 * September 2026 "Premium free for everyone" promo.
 *
 * Single source of truth for the website. Mirrors isFreePromoActive() in the
 * mobile app (store/subscriptionStore.ts): the window is the whole of
 * September 2026 and auto-closes on October 1 — no rebuild required, because
 * every surface gates on this predicate at render time on the client.
 */
export const SEPTEMBER_PROMO = {
  /** Calendar window — keep in sync with the mobile app + edge functions. */
  year: 2026,
  monthIndex: 8, // September (0-indexed)

  eyebrow: 'September Special',
  title: 'Premium is free all September',
  subtitle:
    'Every student gets full Premium — the complete past-question archive, unlimited mock exams, unlimited AI explanations, score prediction and more. No card, no payment. Offer ends September 30.',
  shortLine: '🎉 Premium is FREE all September — no card needed.',
  ctaLabel: 'Get it free',
  endsLabel: 'Offer ends September 30, 2026',
} as const;

/** True only during September 2026, evaluated against the visitor's clock. */
export function isSeptemberPromoActive(now: Date = new Date()): boolean {
  return now.getFullYear() === SEPTEMBER_PROMO.year && now.getMonth() === SEPTEMBER_PROMO.monthIndex;
}
