import type { Metadata } from 'next';
import { UniversitySearch } from '@/components/cutoffs/UniversitySearch';

export const metadata: Metadata = {
  title: 'JAMB Cut-Off Marks 2025/2026 — All Nigerian Universities | PassVerse',
  description:
    'Find JAMB cut-off marks for all federal, state and private universities in Nigeria for 2025/2026. Includes departmental cut-offs for Medicine, Law, Engineering and more.',
  keywords: [
    'JAMB cut-off marks 2025',
    'Nigerian universities cut-off marks',
    'UNILAG cut-off',
    'UI cut-off mark',
    'OAU cut-off mark',
  ],
  alternates: {
    canonical: 'https://passverse.com.ng/cut-off',
  },
  openGraph: {
    title: 'JAMB Cut-Off Marks 2025/2026 — All Nigerian Universities | PassVerse',
    description:
      'Find JAMB cut-off marks for all federal, state and private universities in Nigeria for 2025/2026.',
    url: 'https://passverse.com.ng/cut-off',
    type: 'website',
  },
};

export default function CutOffIndexPage() {
  return (
    <main className="min-h-screen bg-[#1a1a2e] pt-20 pb-20">
      {/* Hero */}
      <div className="border-b border-[#1e3a5f] bg-[#16213e]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-14 text-center">
          <p className="text-4xl mb-4" aria-hidden="true">🎓</p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            JAMB Cut-Off Marks 2025/2026
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Find cut-off marks for all Nigerian universities — federal, state, and private.
            Departmental scores for Medicine, Law, Engineering and more.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4169E1] inline-block" />
              ≥ 200 Very competitive
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623] inline-block" />
              170–199 Competitive
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1D9E75] inline-block" />
              &lt; 170 Moderate
            </span>
          </div>
        </div>
      </div>

      {/* Search + grid */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <UniversitySearch />
      </div>

      {/* Bottom CTA */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="rounded-2xl bg-gradient-to-r from-[#4169E1] to-[#1E3A8A] p-8 text-white text-center">
          <p className="text-3xl mb-3" aria-hidden="true">📚</p>
          <h2 className="text-2xl font-extrabold mb-2">
            Practice JAMB Questions on PassVerse
          </h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            26,675 JAMB past questions with AI explanations. Boost your score before the exam.
          </p>
          <a
            href="/practice"
            className="inline-block rounded-full bg-white px-8 py-3 font-semibold text-[#4169E1] hover:opacity-90 transition-opacity"
          >
            Start Practising Free →
          </a>
        </div>
      </div>
    </main>
  );
}
