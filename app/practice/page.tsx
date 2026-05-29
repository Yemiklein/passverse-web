import type { Metadata } from 'next'
import PracticeSelector from '@/components/practice/PracticeSelector'

export const metadata: Metadata = {
  title: 'Free JAMB & WAEC Practice Questions Online | PassVerse',
  description:
    'Practice JAMB, WAEC, NECO and Post-UTME past questions online free. ' +
    '26,675 questions across 16 subjects. No signup required.',
  alternates: { canonical: 'https://passverse.com.ng/practice' },
  openGraph: {
    title: 'Free JAMB & WAEC Practice Questions | PassVerse',
    description: 'Practice real past exam questions online. Instant feedback. No signup.',
    url: 'https://passverse.com.ng/practice',
    siteName: 'PassVerse',
  },
}

export default function PracticePage() {
  return <PracticeSelector />
}
