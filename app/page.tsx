import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: "PassVerse — Nigeria's #1 Exam Prep App",
};

export default function HomePage() {
  return (
    /* Full-viewport hero — sits behind Navbar (which is fixed/transparent) */
    <div
      id="home"
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, #6B8EF5 100%)',
      }}
    >
      {/* Decorative glow blob */}
      <div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Eyebrow tag */}
        <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-xs font-semibold text-white tracking-widest uppercase">
          🇳🇬 Nigeria&apos;s #1 Exam Prep App
        </span>

        {/* Wordmark */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none">
          PassVerse
        </h1>
        <p className="text-white/70 text-sm tracking-[0.3em] uppercase font-medium -mt-4">
          Imodoye
        </p>

        {/* Sub-heading */}
        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-md">
          Ace JAMB, WAEC, GCE &amp; Post-UTME with AI explanations,
          10,000+ past questions, and personalised practice.
        </p>

        {/* Download CTA */}
        <div id="download" className="flex flex-col sm:flex-row gap-4 mt-2">
          <Button
            href="https://play.google.com/store/apps/details?id=com.passverse"
            size="lg"
            variant="secondary"
          >
            📱 Download on Android
          </Button>
          <Button href="#features" size="lg" variant="ghost" className="text-white hover:bg-white/10 border-2 border-white/30">
            See Features
          </Button>
        </div>

        {/* Coming soon notice */}
        <p className="text-white/50 text-sm mt-4">
          Full website launching soon &mdash; Sprint 1 scaffold complete ✓
        </p>
      </div>
    </div>
  );
}
