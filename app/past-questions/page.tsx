import type { Metadata } from 'next';
import { EXAMS, SUBJECTS } from '@/lib/pastQuestions';
import { PastQuestionsIndexClient } from './PastQuestionsIndexClient';

export const metadata: Metadata = {
  title: 'Past Questions — JAMB, WAEC, GCE & NECO | PassVerse',
  description:
    'Free JAMB, WAEC, GCE, NECO and Post-UTME past questions with answers. 26,000+ questions from 2001 to 2025. Practice free on PassVerse.',
  keywords: [
    'JAMB past questions',
    'WAEC past questions',
    'GCE past questions',
    'NECO past questions',
    'Nigeria exam past questions',
    'UTME past questions',
    'Post-UTME past questions',
    'free past questions Nigeria',
  ],
  alternates: {
    canonical: 'https://passverse.com.ng/past-questions',
  },
  openGraph: {
    title: 'Past Questions — JAMB, WAEC, GCE & NECO | PassVerse',
    description:
      'Free JAMB, WAEC, GCE, NECO and Post-UTME past questions with answers. 26,000+ questions from 2001 to 2025.',
    url: 'https://passverse.com.ng/past-questions',
    type: 'website',
  },
};

export default function PastQuestionsPage() {
  return (
    <main className="pt-20 pb-16">
      {/* Page header */}
      <div className="bg-white border-b border-[var(--color-gray-100)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Past Questions
          </h1>
          <p className="text-lg text-[var(--color-gray-600)] max-w-2xl mx-auto">
            Practice JAMB, WAEC, GCE, NECO and Post-UTME past questions with detailed answers.
            Free on the PassVerse app.
          </p>
        </div>
      </div>

      <PastQuestionsIndexClient exams={EXAMS} subjects={SUBJECTS} />
    </main>
  );
}
