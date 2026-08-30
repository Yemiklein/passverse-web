import type { Metadata } from 'next';
import Link from 'next/link';
import { ExamCountdown } from '@/components/countdown/ExamCountdown';

export const metadata: Metadata = {
  title: 'Nigerian Exam Countdown 2026/2027 — JAMB, WAEC, NECO | PassVerse',
  description:
    'Live countdown to JAMB UTME 2027, WAEC 2026, and NECO 2026. Know exactly how many days, hours and minutes until your exam. Practice with PassVerse CBT simulator.',
  keywords: [
    'JAMB 2027 countdown',
    'WAEC 2026 exam date',
    'NECO 2026 date',
    'Nigerian exam countdown',
    'JAMB UTME date 2027',
    'WAEC 2026 timetable',
    'JAMB exam date 2027',
    'how many days until JAMB',
  ],
  alternates: {
    canonical: 'https://passverse.com.ng/countdown',
  },
  openGraph: {
    title: 'Nigerian Exam Countdown 2026/2027 — JAMB, WAEC, NECO | PassVerse',
    description:
      'Live countdown to JAMB UTME 2027, WAEC 2026, and NECO 2026. Know exactly how many days until your exam.',
    url: 'https://passverse.com.ng/countdown',
    type: 'website',
  },
};

const tips = [
  {
    icon: '📅',
    title: 'Build a Study Plan',
    body: 'Divide your remaining days into weekly blocks. Cover 2–3 subjects per week, with the last two weeks reserved for full-length practice tests.',
  },
  {
    icon: '💻',
    title: 'Practice CBT Daily',
    body: 'JAMB and NECO are computer-based. Use the PassVerse simulator to get comfortable with the format — aim for at least one timed session every day.',
  },
  {
    icon: '📱',
    title: 'Download the App',
    body: 'Study on the go with the PassVerse app. 26,000+ questions, AI explanations, and offline mode so you can practise even without data.',
  },
];

export default function CountdownPage() {
  return (
    <main className="pt-24 pb-16">
      {/* Page header */}
      <div className="bg-[#1a1a2e] border-b border-[#1e3a5f]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 text-center">
          <p className="text-4xl mb-3" aria-hidden="true">⏰</p>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Nigerian Exam Countdown 2026/2027
          </h1>
          <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
            Live countdowns to JAMB, WAEC, and NECO. Stay ahead — know exactly
            how much time you have left to prepare.
          </p>
        </div>
      </div>

      {/* Countdown widget */}
      <div className="bg-[#1a1a2e] min-h-[360px]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
          <ExamCountdown />
        </div>
      </div>

      {/* Tips section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-2 text-center">
          How to Use Your Remaining Time Wisely
        </h2>
        <p className="text-[var(--color-gray-500)] text-center mb-10">
          Make every day count between now and exam day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-[var(--color-gray-100)] bg-white p-6"
            >
              <p className="text-4xl mb-4" aria-hidden="true">{tip.icon}</p>
              <h3 className="font-bold text-[var(--color-gray-900)] mb-2 text-lg">
                {tip.title}
              </h3>
              <p className="text-sm text-[var(--color-gray-500)] leading-relaxed">
                {tip.body}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-8 text-white text-center">
          <p className="text-3xl mb-3" aria-hidden="true">🚀</p>
          <h2 className="text-2xl font-extrabold mb-2">Start Practising Now</h2>
          <p className="text-blue-100 mb-6 max-w-xl mx-auto">
            Every minute you spend practising is one less mark you leave on the table.
            26,000+ questions with AI explanations — free to start.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/practice"
              className="rounded-full bg-white px-8 py-3 font-semibold text-[var(--color-primary)] hover:opacity-90 transition-opacity"
            >
              Practice Free →
            </Link>
            <a
              href="/download"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border-2 border-white px-8 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Download App →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
