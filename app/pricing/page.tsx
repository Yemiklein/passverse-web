import type { Metadata } from 'next';
import { PricingClient } from './PricingClient';
import { PromoBanner } from '@/components/promo/PromoBanner';
import { PRICING_FAQS } from '@/lib/pricingFaqs';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: PRICING_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export const metadata: Metadata = {
  title: 'Pricing — Free & Premium Plans | PassVerse',
  description:
    'PassVerse is free to download. Upgrade to Premium for ₦2,000/month to unlock the full JAMB and WAEC past questions archive, mock exams, AI explanations and score prediction.',
  keywords: ['PassVerse premium', 'JAMB app price', 'exam prep app Nigeria price', 'WAEC app subscription'],
  alternates: {
    canonical: 'https://passverse.com.ng/pricing',
  },
  openGraph: {
    title: 'Pricing — Free & Premium Plans | PassVerse',
    description: 'Start free. Upgrade to Premium for ₦2,000/month. Unlock 26,000+ questions, mock exams and AI explanations.',
    url: 'https://passverse.com.ng/pricing',
    type: 'website',
  },
};

export default function PricingPage() {
  return (
    <main className="pt-20 pb-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      {/* Header */}
      <div className="bg-white border-b border-[var(--color-gray-100)]">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-14 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Simple, Affordable Pricing
          </h1>
          <p className="text-lg text-[var(--color-gray-600)] max-w-xl mx-auto">
            Start free. Upgrade when you&apos;re ready.
            Cancel anytime — no questions asked.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-14">
        {/* Auto-shows during September 2026, hides on October 1 */}
        <PromoBanner className="mb-12 block" />
        <PricingClient />
      </div>
    </main>
  );
}
