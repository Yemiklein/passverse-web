import type { Metadata } from 'next';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Exam tips, study strategies, and PassVerse updates.',
};

export default function BlogPage() {
  return (
    <SectionWrapper className="min-h-screen flex items-center justify-center pt-24">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">Blog</h1>
        <p className="text-[var(--color-gray-600)]">
          Exam tips, study strategies, and PassVerse updates — coming soon.
        </p>
      </div>
    </SectionWrapper>
  );
}
