import type { Metadata } from 'next';
import { ContactForm } from './ContactForm';
import { SUPPORT_WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Us | PassVerse',
  description: 'Get in touch with the PassVerse team. Support, partnerships, press enquiries — we typically respond within 24 hours.',
  alternates: {
    canonical: 'https://passverse.com.ng/contact',
  },
};

export default function ContactPage() {
  return (
    <main className="pt-24 pb-16 px-4 md:px-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-[var(--color-gray-900)] mb-3">
            Contact Us
          </h1>
          <p className="text-[var(--color-gray-600)]">
            We typically respond within 24 hours (Mon–Fri).
          </p>
        </div>

        <ContactForm />

        {/* Direct contact cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a
            href="mailto:support@passverse.com.ng"
            className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-center hover:border-[var(--color-primary)] transition-colors duration-200 block"
          >
            <span className="text-2xl mb-2 block" aria-hidden="true">📧</span>
            <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-1">Email</p>
            <p className="text-sm text-[var(--color-primary)] break-all">support@passverse.com.ng</p>
          </a>
          <a
            href={SUPPORT_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-center hover:border-[var(--color-primary)] transition-colors duration-200 block"
          >
            <span className="text-2xl mb-2 block" aria-hidden="true">💬</span>
            <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-1">WhatsApp</p>
            <p className="text-sm text-[var(--color-primary)]">Join the study group</p>
          </a>
          <div className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-center">
            <span className="text-2xl mb-2 block" aria-hidden="true">⏱️</span>
            <p className="text-xs font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-1">Response Time</p>
            <p className="text-sm text-[var(--color-gray-700)]">Within 24 hours<br />(Mon–Fri)</p>
          </div>
        </div>
      </div>
    </main>
  );
}
