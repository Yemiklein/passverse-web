import type { Metadata } from 'next';
import { DownloadClient } from './DownloadClient';

export const metadata: Metadata = {
  title: 'Download PassVerse for Android',
  description:
    'Download the PassVerse Android app and follow the 5-minute install guide. ' +
    '26,675 JAMB & WAEC questions, AI explanations, mock exams and more — free to start.',
  alternates: {
    canonical: 'https://passverse.com.ng/download',
  },
  openGraph: {
    title: 'Download PassVerse for Android',
    description: 'Free JAMB & WAEC exam prep app. Step-by-step install guide included.',
    url: 'https://passverse.com.ng/download',
    type: 'website',
  },
};

export default function DownloadPage() {
  return (
    <main className="pt-20 pb-16">
      <DownloadClient />
    </main>
  );
}
