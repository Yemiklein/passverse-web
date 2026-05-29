import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { FloatingDownloadCTA } from '@/components/ui/FloatingDownloadCTA';
import WhatsAppCTA from '@/components/layout/WhatsAppCTA';

export const metadata: Metadata = {
  metadataBase: new URL('https://passverse.com.ng'),
  title: {
    template: '%s | PassVerse',
    default:  "PassVerse — Nigeria's #1 Exam Prep App",
  },
  description:
    'Practice JAMB, WAEC, GCE and Post-UTME past questions with AI explanations. ' +
    'Free Nigerian exam prep app. 10,000+ questions. Download on Android.',
  keywords: [
    'JAMB past questions',
    'WAEC past questions',
    'Nigeria exam prep',
    'JAMB app',
    'PassVerse',
    'Ìmọ́dòye',
  ],
  openGraph: {
    siteName: 'PassVerse',
    locale:   'en_NG',
    type:     'website',
  },
  verification: {
    google: 'Eoky7hUcW0-wQfKkd_b-pZyfSetl4KUmqT5vh2M5W-4',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingDownloadCTA />
        <WhatsAppCTA />
      </body>
    </html>
  );
}
