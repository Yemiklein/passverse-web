import type { Metadata } from 'next';
import { HeroSection }        from '@/components/sections/HeroSection';
import { ExamCountdown }      from '@/components/countdown/ExamCountdown';
import { StatsSection }       from '@/components/sections/StatsSection';
import { FeaturesSection }    from '@/components/sections/FeaturesSection';
import { HowItWorksSection }  from '@/components/sections/HowItWorksSection';
import { TestimonialsSection }from '@/components/sections/TestimonialsSection';
import { PricingSection }     from '@/components/sections/PricingSection';
import { DownloadCTASection } from '@/components/sections/DownloadCTASection';
import { FAQSection }         from '@/components/sections/FAQSection';
import { QUESTION_COUNT_DISPLAY } from '@/lib/constants';

const HOME_DESCRIPTION = `Practice ${QUESTION_COUNT_DISPLAY} JAMB, WAEC, NECO, GCE and Post-UTME past questions with AI explanations. Free Nigerian exam prep app. Download on Android.`;

export const metadata: Metadata = {
  title:       "PassVerse — Nigeria's #1 JAMB, WAEC & Post-UTME Exam Prep App",
  description: HOME_DESCRIPTION,
  keywords: [
    'JAMB past questions',
    'WAEC past questions',
    'Nigeria exam prep app',
    'JAMB app',
    'PassVerse',
    'Ìmọ́dòye',
    'Post-UTME past questions',
    'GCE past questions',
    'NECO past questions',
  ],
  alternates: {
    canonical: 'https://passverse.com.ng',
  },
  openGraph: {
    title:       "PassVerse — Nigeria's #1 JAMB, WAEC & Post-UTME Exam Prep App",
    description: HOME_DESCRIPTION,
    url:         'https://passverse.com.ng',
    siteName:    'PassVerse',
    locale:      'en_NG',
    type:        'website',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'PassVerse',
  alternateName: 'Ìmọ́dòye',
  url: 'https://passverse.com.ng',
  logo: 'https://passverse.com.ng/icon.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'support@passverse.com.ng',
    contactType: 'customer support',
  },
  sameAs: [
    'https://twitter.com/passverseapp',
  ],
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'PassVerse',
  alternateName: 'Ìmọ́dòye',
  description: "Nigeria's #1 exam prep app for JAMB, WAEC, GCE, NECO and Post-UTME",
  operatingSystem: 'Android',
  applicationCategory: 'EducationApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'NGN',
  },
  // aggregateRating intentionally omitted — Google requires ratings to reflect
  // real, verifiable reviews shown on the page. Add it back once we have them.
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <HeroSection />
      <ExamCountdown compact={true} />
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
