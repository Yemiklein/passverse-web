import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Play } from 'lucide-react';

export function DownloadCTASection() {
  return (
    <section
      id="download"
      className="py-20 px-4 md:px-8"
      style={{
        background:     'linear-gradient(135deg, #4169E1, #1D9E75, #4169E1)',
        backgroundSize: '300% 300%',
        animation:      'gradient 8s ease infinite',
      }}
    >
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">

        <AnimatedSection direction="up" delay={0}>
          <p className="text-6xl" aria-hidden="true">🚀</p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.1}>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
            Ready to Pass Your Exams?
          </h2>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.2}>
          <p className="text-white/80 text-lg leading-relaxed max-w-xl">
            Join thousands of Nigerian students already using PassVerse.
            Download free on Android today.
          </p>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.3}>
          <a
            href="https://play.google.com/store/apps/details?id=com.passverse.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get PassVerse on Google Play Store"
            className="inline-flex items-center gap-3 bg-black text-white rounded-xl px-6 py-3.5 hover:scale-105 transition-transform duration-200 hover:bg-gray-900"
          >
            {/* Play icon (triangle) */}
            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
              <Play size={16} className="text-black fill-black" aria-hidden="true" />
            </span>
            <span className="text-left">
              <span className="block text-[9px] text-white/60 uppercase tracking-widest leading-none">
                GET IT ON
              </span>
              <span className="block text-base font-semibold leading-tight mt-0.5">
                Google Play
              </span>
            </span>
          </a>
        </AnimatedSection>

        <AnimatedSection direction="up" delay={0.4}>
          <p className="text-white/50 text-sm">
            Free download &nbsp;&bull;&nbsp; No credit card required &nbsp;&bull;&nbsp; Android 6.0+
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default DownloadCTASection;
