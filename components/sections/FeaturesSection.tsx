import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';

const features = [
  {
    icon:  '📝',
    title: '10,000+ Past Questions',
    desc:  'JAMB, WAEC, GCE, NECO and Post-UTME questions from 2001 to 2025',
  },
  {
    icon:  '🤖',
    title: 'AI-Powered Explanations',
    desc:  'Every answer explained clearly. Ask follow-up questions with 3 preset prompts',
  },
  {
    icon:  '⏱️',
    title: 'Timed Mock Exams',
    desc:  'Simulate real CBT exam conditions with auto-submit and detailed results',
  },
  {
    icon:  '🔮',
    title: 'Score Prediction',
    desc:  'See your predicted JAMB/WAEC score range based on your practice performance',
  },
  {
    icon:  '🔥',
    title: 'Daily Streaks & XP',
    desc:  'Stay motivated with streaks, badges, XP points and weekly leaderboards',
  },
  {
    icon:  '📶',
    title: 'Works Offline',
    desc:  'Practice anywhere — cached questions work without internet connection',
  },
] as const;

function FeatureCard({
  icon, title, desc, index,
}: { icon: string; title: string; desc: string; index: number }) {
  return (
    <AnimatedSection delay={index * 0.12} direction="up">
      <div className="bg-white rounded-xl border border-[var(--color-gray-100)] shadow-[var(--shadow-sm)] hover:-translate-y-1 hover:shadow-[var(--shadow-md)] transition-all duration-200 p-6 h-full flex flex-col gap-4">
        <span className="text-4xl" aria-hidden="true">{icon}</span>
        <div>
          <h3 className="text-base font-bold text-[var(--color-gray-900)] mb-2">{title}</h3>
          <p className="text-sm text-[var(--color-gray-600)] leading-relaxed">{desc}</p>
        </div>
      </div>
    </AnimatedSection>
  );
}

export function FeaturesSection() {
  return (
    <SectionWrapper id="features" className="bg-[var(--color-primary-light)]">
      {/* Heading */}
      <AnimatedSection className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">
          Everything You Need to Pass
        </h2>
        <p className="text-[var(--color-gray-600)] max-w-2xl mx-auto leading-relaxed">
          PassVerse combines past questions, AI technology and gamification to make
          exam prep effective and enjoyable
        </p>
      </AnimatedSection>

      {/* 3×2 Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <FeatureCard key={f.title} {...f} index={i} />
        ))}
      </div>
    </SectionWrapper>
  );
}

export default FeaturesSection;
