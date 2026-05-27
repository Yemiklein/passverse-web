import type { Metadata } from 'next';
import { HeroSection }        from '@/components/sections/HeroSection';
import { StatsSection }       from '@/components/sections/StatsSection';
import { FeaturesSection }    from '@/components/sections/FeaturesSection';
import { HowItWorksSection }  from '@/components/sections/HowItWorksSection';
import { TestimonialsSection }from '@/components/sections/TestimonialsSection';
import { PricingSection }     from '@/components/sections/PricingSection';
import { DownloadCTASection } from '@/components/sections/DownloadCTASection';
import { FAQSection }         from '@/components/sections/FAQSection';

export const metadata: Metadata = {
  title:       "PassVerse — Nigeria's #1 JAMB, WAEC & Post-UTME Exam Prep App",
  description: 'Practice 10,000+ JAMB, WAEC, GCE and Post-UTME past questions with AI explanations. Free Nigerian exam prep app. Download on Android.',
  keywords: [
    'JAMB past questions',
    'WAEC past questions',
    'Nigeria exam prep app',
    'JAMB app',
    'PassVerse',
    'Imodoye',
    'Post-UTME past questions',
    'GCE past questions',
    'NECO past questions',
  ],
  openGraph: {
    title:       "PassVerse — Nigeria's #1 JAMB, WAEC & Post-UTME Exam Prep App",
    description: 'Practice 10,000+ JAMB, WAEC, GCE and Post-UTME past questions with AI explanations. Free Nigerian exam prep app. Download on Android.',
    url:         'https://passverse.com.ng',
    siteName:    'PassVerse',
    locale:      'en_NG',
    type:        'website',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <PricingSection />
      <DownloadCTASection />
      <FAQSection />
    </>
  );
}
