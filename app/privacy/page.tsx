import type { Metadata } from 'next';
import { LegalDocument, type LegalSection } from '@/components/legal/LegalDocument';

export const metadata: Metadata = {
  title: 'Privacy Policy | PassVerse',
  description:
    'How PassVerse collects, uses, and protects your personal data across the app and website.',
  alternates: { canonical: 'https://passverse.com.ng/privacy' },
  openGraph: {
    title: 'Privacy Policy | PassVerse',
    description: 'How PassVerse handles your personal data.',
    url: 'https://passverse.com.ng/privacy',
    type: 'website',
  },
};

const sections: LegalSection[] = [
  {
    heading: '1. Introduction',
    body: 'Welcome to PassVerse (also known as Ìmọ́dòye). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our mobile application and website.',
  },
  {
    heading: '2. Information We Collect',
    body: 'We collect the following information when you create an account:\n\n• Email address — used for authentication and account recovery.\n• Full name — used to personalise your in-app experience.\n• Exam type and class level — used to tailor content to your preparation goals.\n• Quiz performance data — including scores, subjects practised, and session history. This data is used to generate progress reports and score predictions.\n• Device push notification token — only collected if you opt in to daily reminders.',
  },
  {
    heading: '3. How We Use Your Information',
    body: 'Your information is used solely to:\n\n• Provide and improve the PassVerse service.\n• Personalise your learning experience.\n• Calculate XP, streaks, badges, and leaderboard rankings.\n• Generate predicted exam scores based on your quiz performance.\n• Send daily study reminders (only if you have opted in).\n• Process payments for Premium subscriptions via Paystack.',
  },
  {
    heading: '4. Data Storage',
    body: 'All user data is stored securely using Supabase (PostgreSQL), hosted on infrastructure compliant with industry security standards. Your data is protected by row-level security policies ensuring only you can access your own data.',
  },
  {
    heading: '5. Payments',
    body: "Premium subscription payments are processed by Paystack, a PCI-DSS compliant payment processor. PassVerse does not store your card details. Paystack's own Privacy Policy governs payment data. You may refer to https://paystack.com/privacy for more information.",
  },
  {
    heading: '6. Data Sharing',
    body: 'We do not sell, trade, or otherwise transfer your personal information to third parties. Your data is never shared with advertisers or data brokers. Aggregated, anonymised data (e.g., overall pass rate by subject) may be used to improve the app.',
  },
  {
    heading: '7. Data Retention',
    body: 'We retain your data for as long as your account is active. If you wish to delete your account and all associated data, please contact us at support@passverse.com.ng and we will process your request within 14 business days.',
  },
  {
    heading: '8. Your Rights',
    body: 'You have the right to:\n\n• Access the personal data we hold about you.\n• Request correction of inaccurate data.\n• Request deletion of your account and data.\n• Withdraw consent for push notifications at any time via your device Settings or the Profile screen.\n\nTo exercise these rights, contact us at support@passverse.com.ng.',
  },
  {
    heading: "9. Children's Privacy",
    body: 'PassVerse is designed for students aged 14 and above. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us information, please contact us immediately.',
  },
  {
    heading: '10. Governing Law',
    body: 'This Privacy Policy is governed by the laws of the Federal Republic of Nigeria. Any disputes arising from this policy shall be subject to the jurisdiction of Nigerian courts.',
  },
  {
    heading: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. We will notify you of significant changes via the app. Continued use of PassVerse after changes constitutes acceptance of the updated policy.',
  },
  {
    heading: '12. Contact Us',
    body: 'If you have any questions or concerns about this Privacy Policy, please contact us:\n\nEmail: support@passverse.com.ng\nPassVerse · Nigeria',
  },
];

export default function PrivacyPage() {
  return (
    <LegalDocument
      title="Privacy Policy"
      updated="August 2026"
      intro="Please read this policy carefully. It explains how PassVerse handles your personal data."
      sections={sections}
    />
  );
}
