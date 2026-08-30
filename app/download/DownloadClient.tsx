'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronDown, Download } from 'lucide-react';
import { APK_DOWNLOAD_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { BillingToggle } from '@/components/pricing/BillingToggle';
import { PRICING_PLANS, type BillingPeriod } from '@/lib/pricing';

const INSTALL_STEPS = [
  { title: 'Tap Download', desc: 'Click the button above to start the download.' },
  { title: 'Open Downloads', desc: 'Navigate to your phone’s Downloads folder.' },
  { title: 'Tap PassVerse.apk', desc: 'Find and tap the downloaded file.' },
  {
    title: 'Allow Installation',
    desc: 'If prompted, enable "Install unknown apps" for your browser: Settings → Apps & notifications → Advanced → Install unknown apps → select your browser → turn ON.',
  },
  { title: 'Install', desc: 'Tap Install and wait about 60 seconds.' },
  { title: 'Launch', desc: 'Tap Open when installation completes ✅' },
];

const FEATURES = [
  { icon: '📚', title: '26,675 Questions', desc: 'JAMB & WAEC 2001–2025' },
  { icon: '🤖', title: 'AI Explanations', desc: 'Claude AI explains every answer' },
  { icon: '⏱️', title: 'Mock Exams', desc: '40 questions × 60 min, real conditions' },
  { icon: '🔥', title: 'Daily Streaks', desc: 'Build your study consistency' },
  { icon: '🏆', title: 'Leaderboards', desc: 'Compete with students nationwide' },
  { icon: '📊', title: 'Progress Tracking', desc: 'See which topics need work' },
];

const FAQS = [
  {
    q: '⚠️ "Unknown app" warning',
    a: 'This is normal for apps installed outside the Play Store. Tap "Install anyway" to proceed.',
  },
  {
    q: '🔒 Can’t enable "Unknown Sources"',
    a: 'Go to Settings → Apps & notifications → Advanced → Install unknown apps → find your browser (e.g. Chrome) → turn the toggle ON.',
  },
  {
    q: '📥 Download stuck or slow',
    a: 'Try a different browser, switch to a WiFi connection, or refresh the page and try again.',
  },
  {
    q: '❌ Installation fails',
    a: 'Uninstall any existing PassVerse app first, then retry the install.',
  },
];

function DownloadButton({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <a
      href={APK_DOWNLOAD_URL}
      aria-label="Download PassVerse APK for Android"
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full font-bold text-white',
        'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-95',
        'shadow-[var(--shadow-glow)] transition-all duration-150',
        size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3.5 text-base',
      )}
    >
      <Download size={size === 'lg' ? 22 : 20} aria-hidden="true" />
      Download for Android
    </a>
  );
}

export function DownloadClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const premiumPlan = PRICING_PLANS[billing];

  return (
    <div className="max-w-3xl mx-auto px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors mb-8"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to Home
      </Link>

      {/* Hero */}
      <div className="text-center mb-10">
        <p className="text-6xl mb-4" aria-hidden="true">📱</p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--color-gray-900)] mb-3">
          PassVerse App
        </h1>
        <p className="text-lg text-[var(--color-gray-600)] max-w-xl mx-auto">
          Master JAMB, WAEC & NECO with AI-powered learning
        </p>
      </div>

      {/* Download card */}
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-8">
        <DownloadButton size="lg" />
        <p className="text-sm text-[var(--color-gray-400)] mt-4">
          ~78 MB &bull; Free
        </p>
      </div>

      {/* Installation steps */}
      <div className="bg-[var(--color-teal-light)] border-2 border-[var(--color-teal)]/20 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-6">
          📋 Installation Steps (5 Minutes)
        </h2>
        <ol className="space-y-5">
          {INSTALL_STEPS.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-teal)] text-white font-bold flex items-center justify-center text-sm">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--color-gray-900)]">{step.title}</p>
                <p className="text-sm text-[var(--color-gray-600)] leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-6">
          ✨ What&apos;s Inside PassVerse
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex gap-3 p-4 rounded-xl bg-[var(--color-gray-50)]">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{f.icon}</span>
              <div>
                <p className="font-semibold text-sm text-[var(--color-gray-900)]">{f.title}</p>
                <p className="text-xs text-[var(--color-gray-600)]">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-[var(--color-amber-light)] border-2 border-[var(--color-amber)]/30 rounded-2xl p-6 md:p-8 mb-8">
        <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-6">
          ❓ Having Issues?
        </h2>
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.q} className="rounded-xl border border-[var(--color-amber)]/20 bg-white overflow-hidden">
                <button
                  aria-expanded={isOpen}
                  aria-controls={`download-faq-${i}`}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-[var(--color-amber-light)] transition-colors"
                >
                  <span className="font-semibold text-[var(--color-gray-900)] text-sm">{faq.q}</span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn('flex-shrink-0 text-[var(--color-gray-400)] transition-transform duration-200', isOpen && 'rotate-180')}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`download-faq-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-[var(--color-gray-600)] leading-relaxed border-t border-[var(--color-gray-100)] pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-[var(--color-gray-600)] mt-5">
          Still need help? Email{' '}
          <a href="mailto:support@passverse.com.ng" className="text-[var(--color-primary)] font-semibold hover:underline">
            support@passverse.com.ng
          </a>
        </p>
      </div>

      {/* Pricing */}
      <div
        className="rounded-2xl p-6 md:p-8 mb-8 text-white"
        style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))' }}
      >
        <h2 className="text-xl font-bold mb-6">💡 Free vs Premium</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="font-semibold mb-1">📱 Free Forever</p>
            <p className="text-sm text-white/80">3 years of past questions &bull; 5 AI explanations/day</p>
          </div>
          <div>
            <p className="font-semibold mb-1">
              🎯 Premium &mdash; {premiumPlan.displayPrice}{premiumPlan.period}
            </p>
            <p className="text-sm text-white/80">Full archive &bull; Unlimited AI explanations</p>
          </div>
        </div>
        <BillingToggle value={billing} onChange={setBilling} size="sm" />
      </div>

      {/* Footer CTA */}
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
          Ready to ace your exams?
        </h2>
        <DownloadButton size="lg" />
        <p className="text-sm text-[var(--color-gray-400)] mt-8">
          PassVerse &copy; 2026. Made for Nigerian students.
        </p>
      </div>
    </div>
  );
}
