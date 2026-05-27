import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind PassVerse (Imodoye) — built for Nigerian students.',
};

export default function AboutPage() {
  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">About PassVerse</h1>
        <p className="text-[var(--color-gray-600)]">
          Built for Nigerian students, by Nigerians — our story coming soon.
        </p>
      </div>
    </SectionWrapper>
  );
}
