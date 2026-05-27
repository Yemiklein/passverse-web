import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Free and premium plans for Nigerian exam prep on PassVerse.',
};

export default function PricingPage() {
  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">Pricing</h1>
        <p className="text-[var(--color-gray-600)]">
          Free &amp; premium plans — detailed pricing coming soon.
        </p>
      </div>
    </SectionWrapper>
  );
}
