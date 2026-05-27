import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

/* ── Step visual mockups (pure HTML/Tailwind) ── */

function Step1Visual() {
  const exams    = ['JAMB', 'WAEC', 'GCE', 'Post-UTME', 'NECO'];
  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Economics'];
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-[var(--shadow-md)] p-5">
      <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-3">
        Select Exam
      </p>
      <div className="flex flex-wrap gap-2 mb-5">
        {exams.map((e, i) => (
          <span
            key={e}
            className={`rounded-full px-3 py-1 text-xs font-semibold border ${
              i === 0
                ? 'bg-[var(--color-primary)] text-white border-[var(--color-primary)]'
                : 'bg-white text-[var(--color-gray-600)] border-[var(--color-gray-100)]'
            }`}
          >
            {e}
          </span>
        ))}
      </div>
      <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-3">
        Select Subject
      </p>
      <div className="grid grid-cols-3 gap-2">
        {subjects.map((s, i) => (
          <div
            key={s}
            className={`rounded-lg p-2 text-center border text-xs font-medium leading-tight ${
              i === 0
                ? 'bg-[var(--color-primary-light)] text-[var(--color-primary)] border-[var(--color-primary-light)]'
                : 'bg-[var(--color-gray-50)] text-[var(--color-gray-600)] border-[var(--color-gray-100)]'
            }`}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

function Step2Visual() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-[var(--shadow-md)] p-5">
      <div className="bg-blue-50 rounded-xl p-3 mb-3 border border-blue-100">
        <p className="text-[10px] text-blue-400 font-semibold uppercase mb-1">Question 7</p>
        <p className="text-xs font-semibold text-gray-800 leading-snug">
          What is the capital of Nigeria?
        </p>
      </div>
      <div className="flex flex-col gap-1.5 mb-3">
        {[
          { opt: 'Lagos', correct: false },
          { opt: 'Abuja', correct: true  },
          { opt: 'Kano',  correct: false },
          { opt: 'Ibadan',correct: false },
        ].map(({ opt, correct }, i) => (
          <div
            key={opt}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 border text-xs ${
              correct
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 font-semibold'
                : 'bg-white border-gray-100 text-gray-600'
            }`}
          >
            <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex-shrink-0 flex items-center justify-center ${
              correct ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'
            }`}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="flex-1">{opt}</span>
            {correct && <span className="text-emerald-500">✓</span>}
          </div>
        ))}
      </div>
      {/* AI explanation box */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
        <p className="text-[10px] font-bold text-emerald-700 mb-1">🤖 AI Explanation</p>
        <p className="text-[10px] text-emerald-800 leading-relaxed">
          Abuja became Nigeria&apos;s capital in 1991, replacing Lagos due to its central
          location and purpose-built design for governance.
        </p>
      </div>
    </div>
  );
}

function Step3Visual() {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-[var(--shadow-md)] p-5">
      {/* Streak + XP header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">🔥</span>
          <div>
            <p className="text-sm font-bold text-[var(--color-gray-900)]">7 Day Streak!</p>
            <p className="text-xs text-[var(--color-gray-400)]">Keep it up</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-[var(--color-primary)]">2,450 XP</p>
          <p className="text-xs text-[var(--color-gray-400)]">Level 12</p>
        </div>
      </div>

      {/* XP bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-[var(--color-gray-400)] mb-1">
          <span>Lv 12</span><span>Lv 13</span>
        </div>
        <div className="h-2 bg-[var(--color-gray-100)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--color-primary)] rounded-full"
            style={{ width: '72%' }}
          />
        </div>
        <p className="text-[10px] text-[var(--color-gray-400)] mt-1 text-right">72% to next level</p>
      </div>

      {/* Predicted score */}
      <div className="bg-[var(--color-primary-light)] rounded-xl p-4 text-center">
        <p className="text-[10px] font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-1">
          Predicted JAMB Score
        </p>
        <p className="text-3xl font-extrabold text-[var(--color-primary-dark)] tabular-nums">
          220 — 258
        </p>
        <p className="text-[10px] text-[var(--color-gray-400)] mt-1">
          Based on your last 50 practice sessions
        </p>
      </div>
    </div>
  );
}

/* ── Steps data ── */
const steps = [
  {
    number: '01',
    title:  'Choose Your Exam & Subject',
    desc:   'Select from JAMB, WAEC, GCE, Post-UTME or NECO. Pick any of 16 subjects and choose your exam year from 2001 to 2025.',
    Visual: Step1Visual,
    /* text left on desktop → visual must flex-row-reverse so it ends on right */
    reversed: true,
    textDir:  'right' as const,
    visualDir:'left'  as const,
  },
  {
    number: '02',
    title:  'Practice with AI Explanations',
    desc:   'Answer past questions and instantly see if you\'re right. Tap to get a full AI explanation of why each answer is correct.',
    Visual: Step2Visual,
    reversed: false,
    textDir:  'left'  as const,
    visualDir:'right' as const,
  },
  {
    number: '03',
    title:  'Track Progress & Predict Your Score',
    desc:   'Your streak, XP and accuracy are tracked automatically. Premium users get a predicted score range before their actual exam.',
    Visual: Step3Visual,
    reversed: true,
    textDir:  'right' as const,
    visualDir:'left'  as const,
  },
] as const;

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works">
      {/* Heading */}
      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">
          How PassVerse Works
        </h2>
        <p className="text-[var(--color-gray-600)] max-w-xl mx-auto leading-relaxed">
          Get started in minutes. No registration required to try.
        </p>
      </AnimatedSection>

      {/* Steps */}
      <div className="flex flex-col gap-20">
        {steps.map(({ number, title, desc, Visual, reversed, textDir, visualDir }) => (
          /*
           * DOM order: [Visual, Text]
           * Mobile (flex-col): Visual appears on top ✓
           * Desktop:
           *   reversed=true  → flex-row-reverse → Visual on RIGHT, Text on LEFT ✓ (steps 1, 3)
           *   reversed=false → flex-row          → Visual on LEFT,  Text on RIGHT ✓ (step 2)
           */
          <div
            key={number}
            className={`flex flex-col gap-10 items-center ${
              reversed ? 'md:flex-row-reverse' : 'md:flex-row'
            } md:gap-16`}
          >
            {/* Visual side */}
            <AnimatedSection direction={visualDir} className="w-full md:w-1/2 shrink-0">
              <Visual />
            </AnimatedSection>

            {/* Text side */}
            <AnimatedSection direction={textDir} className="w-full md:w-1/2">
              <div>
                <p
                  className="text-7xl md:text-8xl font-extrabold leading-none mb-4 select-none"
                  aria-hidden="true"
                  style={{ color: 'rgba(65,105,225,0.08)' }}
                >
                  {number}
                </p>
                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--color-gray-900)] mb-4 -mt-8">
                  {title}
                </h3>
                <p className="text-[var(--color-gray-600)] leading-relaxed">{desc}</p>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}

export default HowItWorksSection;
