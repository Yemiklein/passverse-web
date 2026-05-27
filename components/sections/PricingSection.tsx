import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionWrapper } from '@/components/ui/SectionWrapper';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface PricingFeature {
  text:      string;
  included:  boolean;
}

const freeFeatures: PricingFeature[] = [
  { text: 'Latest 3 years of questions',  included: true  },
  { text: 'Basic quiz mode',              included: true  },
  { text: '5 AI explanations per day',    included: true  },
  { text: 'Streak tracking',              included: true  },
  { text: 'Mock exams',                   included: false },
  { text: 'Score prediction',             included: false },
  { text: 'Full archive (2001–2025)',      included: false },
];

const premiumFeatures: PricingFeature[] = [
  { text: 'Full archive 2001–2025',       included: true },
  { text: 'Unlimited mock exams',         included: true },
  { text: 'Unlimited AI explanations',    included: true },
  { text: 'Score prediction',             included: true },
  { text: 'Streak freeze tokens',         included: true },
  { text: 'Ranked leaderboard',           included: true },
  { text: 'Priority support',             included: true },
];

function FeatureItem({ text, included }: PricingFeature) {
  return (
    <li className="flex items-start gap-2.5">
      <span
        className={`mt-0.5 flex-shrink-0 font-bold text-sm ${
          included ? 'text-emerald-500' : 'text-[var(--color-gray-400)]'
        }`}
        aria-label={included ? 'Included' : 'Not included'}
      >
        {included ? '✓' : '✗'}
      </span>
      <span className={`text-sm ${
        included ? 'text-[var(--color-gray-800)]' : 'text-[var(--color-gray-400)] line-through'
      }`}>
        {text}
      </span>
    </li>
  );
}

export function PricingSection() {
  return (
    <SectionWrapper
      className="bg-gradient-to-br from-[var(--color-primary-light)] to-white"
    >
      {/* Heading */}
      <AnimatedSection className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-4">
          Simple, Affordable Pricing
        </h2>
        <p className="text-[var(--color-gray-600)]">Start free. Upgrade when you&apos;re ready.</p>
      </AnimatedSection>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl mx-auto items-stretch">

        {/* ── FREE ── */}
        <AnimatedSection direction="up" delay={0}>
          <div className="bg-white rounded-2xl border border-[var(--color-gray-100)] shadow-[var(--shadow-md)] p-8 flex flex-col gap-6 h-full">
            <div>
              <p className="text-sm font-semibold text-[var(--color-gray-600)] uppercase tracking-widest mb-2">
                Free
              </p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-[var(--color-gray-900)]">₦0</span>
              </div>
              <p className="text-sm text-[var(--color-gray-400)] mt-1">Forever free</p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {freeFeatures.map((f) => (
                <FeatureItem key={f.text} {...f} />
              ))}
            </ul>

            <Button href="#download" variant="secondary" size="md" className="w-full justify-center">
              Download Free
            </Button>
          </div>
        </AnimatedSection>

        {/* ── PREMIUM ── */}
        <AnimatedSection direction="up" delay={0.15}>
          <div className="bg-white rounded-2xl border-2 border-[var(--color-primary)] shadow-[var(--shadow-lg)] p-8 flex flex-col gap-6 h-full md:scale-105 relative">
            {/* Most Popular badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge variant="amber">Most Popular</Badge>
            </div>

            <div>
              <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-2">
                Premium
              </p>
              <div className="flex items-end gap-1">
                <span className="text-5xl font-extrabold text-[var(--color-gray-900)]">₦1,500</span>
                <span className="text-[var(--color-gray-400)] mb-1">/month</span>
              </div>
              <p className="text-sm text-[var(--color-teal)] mt-1 font-medium">
                or ₦10,000/year <span className="text-[var(--color-gray-400)] font-normal">(save ₦8,000)</span>
              </p>
            </div>

            <ul className="flex flex-col gap-3 flex-1">
              {premiumFeatures.map((f) => (
                <FeatureItem key={f.text} {...f} />
              ))}
            </ul>

            <Button href="/pricing" variant="primary" size="md" className="w-full justify-center">
              Get Premium
            </Button>
          </div>
        </AnimatedSection>

      </div>
    </SectionWrapper>
  );
}

export default PricingSection;
