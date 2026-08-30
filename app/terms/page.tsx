import type { Metadata } from 'next';
import { LegalDocument, type LegalSection } from '@/components/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Terms of Service | PassVerse',
  description:
    'The terms that govern your use of the PassVerse exam-prep app and website, including Premium subscriptions.',
  alternates: { canonical: 'https://passverse.com.ng/terms' },
  openGraph: {
    title: 'Terms of Service | PassVerse',
    description: 'The terms that govern your use of PassVerse.',
    url: 'https://passverse.com.ng/terms',
    type: 'website',
  },
};

const sections: LegalSection[] = [
  {
    heading: '1. Acceptance of Terms',
    body: 'By downloading, installing, or using PassVerse (also known as Ìmọ́dòye), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.',
  },
  {
    heading: '2. Description of Service',
    body: 'PassVerse is a Nigerian exam preparation application that provides:\n\n• Past question practice for JAMB, WAEC, GCE, NECO, and Post-UTME examinations.\n• Mock exam simulation with timed sessions.\n• AI-powered question explanations (Premium feature).\n• Score prediction based on quiz performance (Premium feature).\n• Gamification features including XP, streaks, badges, and leaderboards.\n• Daily study reminders via push notifications (opt-in).',
  },
  {
    heading: '3. User Accounts',
    body: 'You must create an account to use PassVerse. You are responsible for:\n\n• Providing accurate and truthful registration information.\n• Maintaining the confidentiality of your account password.\n• All activity that occurs under your account.\n\nPassVerse reserves the right to suspend or terminate accounts that violate these Terms.',
  },
  {
    heading: '4. Premium Subscription',
    body: 'PassVerse offers a Premium subscription which unlocks additional features. By subscribing:\n\n• You authorise PassVerse to charge the applicable subscription fee via Paystack.\n• Subscriptions are non-refundable except as required by Nigerian consumer protection law.\n• PassVerse reserves the right to change Premium pricing with reasonable notice.\n• Access to Premium features ends immediately upon subscription expiry or cancellation.',
  },
  {
    heading: '5. Acceptable Use',
    body: 'You agree not to:\n\n• Use the app for any unlawful purpose.\n• Attempt to reverse engineer, decompile, or extract the source code.\n• Share your account credentials with others.\n• Upload or transmit any harmful, offensive, or illegal content.\n• Use automated scripts or bots to access the service.\n• Attempt to circumvent the subscription paywall.',
  },
  {
    heading: '6. Intellectual Property',
    body: 'All content within PassVerse, including but not limited to the app design, logo, gamification system, and AI explanations, is the intellectual property of PassVerse. Past examination questions are sourced from publicly available materials and third-party APIs.\n\nYou are granted a limited, non-exclusive, non-transferable licence to use the app for personal, non-commercial exam preparation purposes only.',
  },
  {
    heading: '7. Educational Content Disclaimer',
    body: 'PassVerse is an exam preparation tool. While we strive for accuracy, we make no guarantee that:\n\n• Specific questions will appear in your actual examination.\n• Score predictions are accurate indicators of your final exam result.\n• AI explanations are completely free from error.\n\nAlways cross-reference with official JAMB, WAEC, NECO, or university materials.',
  },
  {
    heading: '8. Limitation of Liability',
    body: 'To the maximum extent permitted by Nigerian law, PassVerse shall not be liable for:\n\n• Any indirect, incidental, or consequential damages.\n• Loss of data or exam performance outcomes.\n• Service interruptions or downtime.\n\nOur total liability to you shall not exceed the amount you paid for Premium in the 3 months preceding the claim.',
  },
  {
    heading: '9. Privacy',
    body: 'Your use of PassVerse is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review the Privacy Policy to understand our data practices.',
  },
  {
    heading: '10. Modifications to Service',
    body: 'PassVerse reserves the right to modify, suspend, or discontinue any part of the service at any time, with or without notice. We will make reasonable efforts to notify users of significant changes.',
  },
  {
    heading: '11. Termination',
    body: 'You may delete your account at any time by contacting support@passverse.com.ng. PassVerse may terminate your account for violations of these Terms. Upon termination, your right to use the service ceases immediately.',
  },
  {
    heading: '12. Governing Law & Disputes',
    body: 'These Terms are governed by the laws of the Federal Republic of Nigeria. Any disputes arising from these Terms or your use of PassVerse shall be resolved through good-faith negotiation first, and thereafter through the courts of competent jurisdiction in Nigeria.',
  },
  {
    heading: '13. Contact',
    body: 'For questions, complaints, or feedback regarding these Terms:\n\nEmail: support@passverse.com.ng\nPassVerse · Nigeria',
  },
];

export default function TermsPage() {
  return (
    <LegalDocument
      title="Terms of Service"
      updated="August 2026"
      intro="These terms govern your use of PassVerse. By using the app or website, you agree to them."
      sections={sections}
    />
  );
}
