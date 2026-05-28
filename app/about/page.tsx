import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About PassVerse — Nigeria's Exam Prep App | Ìmọ́dòye",
  description:
    'PassVerse (Ìmọ́dòye) is a Nigerian exam prep app built by a solo developer for JAMB, WAEC and Post-UTME students. 26,000+ past questions, AI explanations, built in Nigeria.',
  keywords: ['PassVerse about', 'Ìmọ́dòye', 'Nigerian exam prep app', 'JAMB app developer', 'about PassVerse'],
  alternates: {
    canonical: 'https://passverse.com.ng/about',
  },
  openGraph: {
    title: "About PassVerse — Nigeria's Exam Prep App | Ìmọ́dòye",
    description: 'PassVerse (Ìmọ́dòye) is built by a solo Nigerian developer for JAMB, WAEC and Post-UTME students.',
    url: 'https://passverse.com.ng/about',
    type: 'website',
  },
};

const STATS = [
  { value: '26,000+', label: 'Questions in our database' },
  { value: '16',      label: 'Subjects covered' },
  { value: '25',      label: 'Years of past questions (2001–2025)' },
  { value: '5',       label: 'Exam types supported' },
];

const VALUES = [
  {
    icon: '🎯',
    title: 'Accessible',
    body: 'Free for every student. Premium features priced fairly for Nigerian incomes.',
  },
  {
    icon: '🧠',
    title: 'Effective',
    body: 'AI explanations and spaced repetition make learning stick, not just memorisation.',
  },
  {
    icon: '🇳🇬',
    title: 'Nigerian-First',
    body: 'Built specifically for Nigerian exams, Nigerian students, and Nigerian network conditions.',
  },
];

export default function AboutPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[var(--color-gray-900)] via-[#1a2f7a] to-[var(--color-primary-dark)] text-white pt-32 pb-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium text-blue-200 mb-6">
            <span aria-hidden="true">📚</span>
            PassVerse · Ìmọ́dòye
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Built for Nigerian Students,<br />
            By a Nigerian Developer
          </h1>
          <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
            PassVerse started as a simple idea: every Nigerian student deserves access to quality
            exam preparation — regardless of where they live or what they can afford.
          </p>
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] text-center mb-8">
            Our Mission
          </h2>
          <blockquote className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] text-center leading-relaxed mb-12 px-4 border-l-4 border-[var(--color-primary)] pl-6 text-left">
            "To make world-class exam preparation accessible to every Nigerian student preparing
            for JAMB, WAEC and beyond."
          </blockquote>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map(({ icon, title, body }) => (
              <div
                key={title}
                className="rounded-2xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-6 text-center"
              >
                <span className="text-4xl mb-4 block" aria-hidden="true">{icon}</span>
                <h3 className="text-lg font-bold text-[var(--color-gray-900)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--color-gray-600)] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story ── */}
      <section className="bg-[var(--color-gray-50)] py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] mb-8 text-center">
            The Story
          </h2>
          <div className="space-y-6 text-[var(--color-gray-700)] leading-relaxed text-base">
            <p>
              PassVerse (also known as{' '}
              <strong className="text-[var(--color-gray-900)]">Ìmọ́dòye</strong> — a Yoruba word meaning
              &ldquo;knowledge has value&rdquo;) was built by Adeyemi, a solo developer who saw firsthand
              how Nigerian students struggled to access quality exam preparation materials.
            </p>
            <p>
              Most exam prep resources were either too expensive, poorly designed, or simply not built
              for how Nigerian students actually study — on mobile, often with limited data, preparing
              for high-stakes exams that determine their future.
            </p>
            <p>
              PassVerse was designed from scratch to solve these problems: offline-first, mobile-first,
              AI-powered, and priced for Nigerian students. Every feature — from the timed mock exams
              to the streak system — was built with one question in mind:{' '}
              <em>&ldquo;Will this help a student in Kano, Lagos or Enugu pass their exam?&rdquo;</em>
            </p>
            <p>
              Today, PassVerse covers{' '}
              <strong className="text-[var(--color-gray-900)]">26,000+ past questions</strong> across
              JAMB, WAEC, GCE, NECO and Post-UTME, with AI explanations and a score prediction engine
              that helps students know exactly where they stand before exam day.
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] text-center mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary)] mb-2">
                  {value}
                </p>
                <p className="text-sm text-[var(--color-gray-600)] leading-snug">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="bg-[var(--color-gray-50)] py-20 px-4 md:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] mb-10">
            The Team
          </h2>
          <div className="rounded-2xl border border-[var(--color-gray-100)] bg-white p-8">
            <div
              className="w-20 h-20 rounded-full bg-[var(--color-primary)] text-white text-3xl font-extrabold flex items-center justify-center mx-auto mb-4"
              aria-hidden="true"
            >
              A
            </div>
            <h3 className="text-xl font-extrabold text-[var(--color-gray-900)] mb-1">Adeyemi</h3>
            <p className="text-sm font-semibold text-[var(--color-primary)] mb-3">
              Founder &amp; Developer
            </p>
            <p className="text-sm text-[var(--color-gray-600)] leading-relaxed mb-4">
              Full-stack mobile developer passionate about EdTech and making quality education
              accessible across Nigeria.
            </p>
            <p className="text-sm text-[var(--color-gray-400)] italic">
              &ldquo;Building PassVerse solo — with a lot of coffee and a deep belief that Nigerian
              students deserve better.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="bg-white py-20 px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-[var(--color-gray-900)] mb-4">
            Get in Touch
          </h2>
          <p className="text-[var(--color-gray-600)] mb-10">
            We&apos;d love to hear from you. Reach out for support, partnerships, or press enquiries.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: '📧', label: 'General Enquiries', email: 'hello@passverse.com.ng' },
              { icon: '🛠️', label: 'Support',           email: 'support@passverse.com.ng' },
              { icon: '🏫', label: 'Schools & Partnerships', email: 'schools@passverse.com.ng' },
            ].map(({ icon, label, email }) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-5 hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] transition-all duration-200 block text-center group"
              >
                <span className="text-2xl mb-2 block" aria-hidden="true">{icon}</span>
                <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-medium text-[var(--color-primary)] group-hover:underline break-all">
                  {email}
                </p>
              </a>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://twitter.com/passverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-10 h-10 rounded-lg border border-[var(--color-gray-100)] flex items-center justify-center text-[var(--color-gray-600)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200"
            >
              𝕏
            </a>
            <a
              href="https://linkedin.com/company/passverse"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-lg border border-[var(--color-gray-100)] flex items-center justify-center text-[var(--color-gray-600)] hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-all duration-200 text-sm font-bold"
            >
              in
            </a>
          </div>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-8 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md"
            >
              Send us a message →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
