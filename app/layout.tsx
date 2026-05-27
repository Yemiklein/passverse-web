import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

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
    'Imodoye',
  ],
  openGraph: {
    siteName: 'PassVerse',
    locale:   'en_NG',
    type:     'website',
  },
    verification: {
    google: 'e3cc8b395db6e652',
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
      </body>
    </html>
  );
}
