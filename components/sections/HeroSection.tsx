'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DOWNLOAD_PAGE_URL } from '@/lib/constants';
import { usePromoActive } from '@/components/promo/usePromoActive';

const headlineContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
} as const;

const headlineLine = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const;

const quizOptions = [
  { letter: 'A', text: 'x = 2', correct: false },
  { letter: 'B', text: 'x = 4', correct: true  },
  { letter: 'C', text: 'x = 6', correct: false },
  { letter: 'D', text: 'x = 8', correct: false },
];

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const promoActive = usePromoActive();

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #1a3ab8 0%, #1230a0 40%, #0d2280 70%, #0a1f6e 100%)',
      }}
    >
      {/* Glow circles */}
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        width: 500, height: 500, borderRadius: '50%',
        background: 'rgba(99, 149, 255, 0.12)',
        top: -120, right: -100,
      }} />
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        width: 350, height: 350, borderRadius: '50%',
        background: 'rgba(255, 255, 255, 0.05)',
        bottom: 60, left: -100,
      }} />
      <div aria-hidden="true" className="absolute pointer-events-none" style={{
        width: 200, height: 200, borderRadius: '50%',
        background: 'rgba(99, 149, 255, 0.10)',
        top: '45%', right: '30%',
      }} />

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text ── */}
          <div className="flex flex-col gap-6 order-2 lg:order-1">

            {/* Badge — becomes the September promo pill while the promo is live */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {promoActive ? (
                <span
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg, #1D9E75, #0F6E56)' }}
                >
                  🎉 Premium is FREE all September — no card needed
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white">
                  Nigeria&apos;s #1 Exam Prep App
                </span>
              )}
            </motion.div>

            {/* Staggered headline */}
            <motion.h1
              className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tight"
              variants={headlineContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.span className="block" variants={headlineLine}>Pass JAMB.</motion.span>
              <motion.span className="block" variants={headlineLine}>Ace WAEC.</motion.span>
              <motion.span
                className="block"
                variants={headlineLine}
                style={{ color: '#60a5fa' }}
              >
                Get Admitted.
              </motion.span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              className="text-lg text-blue-200 max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Nigeria&apos;s smartest exam prep — 26,000+ past questions,
              AI explanations, CBT simulation &amp; daily streaks.
              Trusted by SS2, SS3 &amp; Graduate students.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Button
                href={DOWNLOAD_PAGE_URL}
                size="lg"
                variant="primary"
                aria-label="Download PassVerse free on Android"
              >
                <Smartphone size={20} aria-hidden="true" />
                Download Free on Android
              </Button>
              <Button
                href="#how-it-works"
                size="lg"
                variant="ghost"
                className="text-white border-2 border-white/30 hover:bg-white/10"
                aria-label="See how PassVerse works"
              >
                See How It Works
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex -space-x-2" aria-hidden="true">
                {[
                  { initial: 'A', bg: 'bg-blue-500'  },
                  { initial: 'B', bg: 'bg-teal-500'  },
                  { initial: 'C', bg: 'bg-amber-500' },
                ].map(({ initial, bg }) => (
                  <div
                    key={initial}
                    className={`w-8 h-8 rounded-full ${bg} border-2 border-[#1a3ab8] flex items-center justify-center text-white text-xs font-bold`}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <span className="text-sm text-blue-200">
                ★ ★ ★ ★ ★ Loved by 10,000+ Nigerian students
              </span>
            </motion.div>
          </div>

          {/* ── RIGHT: Phone mockup ── */}
          <div className="flex justify-center lg:justify-end order-1 lg:order-2">
            {/* Entrance animation wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              {/* Float loop wrapper */}
              <motion.div
                animate={reduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{
                  duration:   4,
                  ease:       'easeInOut',
                  repeat:     Infinity,
                  repeatType: 'loop',
                }}
              >
                {/* Phone outer frame */}
                <div
                  className="w-64 h-[520px] rounded-[3rem] border-4 border-gray-700 bg-gray-900 relative"
                  style={{ boxShadow: '0 25px 60px -12px rgba(65,105,225,0.4), 0 0 0 1px rgba(255,255,255,0.05)' }}
                  role="img"
                  aria-label="PassVerse app showing a JAMB Mathematics question"
                >
                  {/* Screen */}
                  <div className="absolute inset-1 rounded-[2.5rem] bg-white overflow-hidden flex flex-col">
                    {/* Notch */}
                    <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10" />

                    {/* Status bar spacer */}
                    <div className="h-5 shrink-0" />

                    {/* App header */}
                    <div className="bg-[#1a1a2e] px-3 py-2.5 shrink-0">
                      <p className="text-white text-[9px] font-semibold text-center tracking-wide">
                        JAMB &bull; Mathematics &bull; Q12 of 40
                      </p>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-gray-100 shrink-0">
                      <div className="h-full bg-[#4169E1]" style={{ width: '30%' }} />
                    </div>

                    {/* Question area */}
                    <div className="flex-1 px-3 pt-3 pb-2 flex flex-col gap-2 overflow-hidden">
                      {/* Question card */}
                      <div className="bg-blue-50 rounded-xl p-3 border border-blue-100 shrink-0">
                        <p className="text-[8px] text-blue-400 font-semibold uppercase tracking-wide mb-1.5">
                          Question 12
                        </p>
                        <p className="text-[11px] text-gray-800 font-semibold leading-snug">
                          If 2x + 3 = 11, find the value of x
                        </p>
                      </div>

                      {/* Options */}
                      <div className="flex flex-col gap-1.5 shrink-0">
                        {quizOptions.map(({ letter, text, correct }) => (
                          <div
                            key={letter}
                            className={`flex items-center gap-2 rounded-lg px-2.5 py-2 border ${
                              correct
                                ? 'bg-emerald-50 border-emerald-300'
                                : 'bg-white border-gray-100'
                            }`}
                          >
                            <span className={`w-5 h-5 rounded-full text-[9px] font-bold flex items-center justify-center flex-shrink-0 ${
                              correct ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {letter}
                            </span>
                            <span className={`text-[10px] font-medium flex-1 ${
                              correct ? 'text-emerald-700 font-semibold' : 'text-gray-600'
                            }`}>
                              {text}
                            </span>
                            {correct && <span className="text-emerald-500 text-[10px]">✓</span>}
                          </div>
                        ))}
                      </div>

                      {/* Next button */}
                      <div className="mt-auto pt-1 shrink-0">
                        <div className="w-full bg-[#4169E1] text-white text-[10px] font-semibold rounded-xl py-2.5 flex items-center justify-center gap-1.5">
                          Next Question →
                        </div>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="pb-2 flex justify-center shrink-0">
                      <div className="w-20 h-1 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
