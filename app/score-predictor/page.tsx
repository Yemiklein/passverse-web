import type { Metadata } from 'next';
import { ScorePredictor } from '@/components/predictor/ScorePredictor';

export const metadata: Metadata = {
  title: 'JAMB Score Predictor 2026 — Predict Your UTME Score | PassVerse',
  description:
    'Enter your practice scores and instantly predict your JAMB UTME score range. See which universities you qualify for based on your predicted score.',
  keywords: [
    'JAMB score predictor',
    'UTME score calculator',
    'predict JAMB score',
    'JAMB score estimator Nigeria',
  ],
  alternates: {
    canonical: 'https://passverse.com.ng/score-predictor',
  },
  openGraph: {
    title: 'JAMB Score Predictor 2026 | PassVerse',
    description:
      'Enter your practice scores and instantly predict your JAMB UTME score range.',
    url: 'https://passverse.com.ng/score-predictor',
    type: 'website',
  },
};

export default function ScorePredictorPage() {
  return (
    <main className="min-h-screen bg-[#1a1a2e] pt-20 pb-20">
      {/* Hero */}
      <div className="border-b border-[#1e3a5f] bg-[#16213e]">
        <div className="max-w-2xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-5xl mb-4" aria-hidden="true">🎯</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            JAMB Score Predictor
          </h1>
          <p className="text-slate-300 mb-5">
            Enter your practice scores to predict your UTME result and see which universities you qualify for.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {['Free', 'Instant Results', 'No Login Required'].map(badge => (
              <span
                key={badge}
                className="bg-[#1a1a2e] border border-[#1e3a5f] text-slate-300 rounded-full px-3 py-1 font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Predictor */}
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-10">
        <ScorePredictor />
      </div>
    </main>
  );
}
