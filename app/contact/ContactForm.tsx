'use client';

import { useState, type FormEvent } from 'react';
import { cn } from '@/lib/utils';

const SUBJECTS = [
  'General Enquiry',
  'Bug Report',
  'School Partnership',
  'Press Enquiry',
  'Other',
];

export function ContactForm() {
  const [name,    setName]    = useState('');
  const [email,   setEmail]   = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const body    = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto  = `mailto:support@passverse.com.ng?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  }

  const msgLen     = message.length;
  const msgValid   = msgLen >= 20 && msgLen <= 1000;
  const formValid  = name.trim() && email.trim() && msgValid;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-white rounded-2xl border border-[var(--color-gray-100)] p-6 md:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] px-4 py-3 text-sm text-[var(--color-gray-900)] placeholder-[var(--color-gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] px-4 py-3 text-sm text-[var(--color-gray-900)] placeholder-[var(--color-gray-400)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5">
          Subject
        </label>
        <select
          id="contact-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] px-4 py-3 text-sm text-[var(--color-gray-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition"
        >
          {SUBJECTS.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="block text-sm font-semibold text-[var(--color-gray-700)] mb-1.5">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          minLength={20}
          maxLength={1000}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          placeholder="Tell us how we can help (minimum 20 characters)..."
          className={cn(
            'w-full rounded-xl border bg-[var(--color-gray-50)] px-4 py-3 text-sm text-[var(--color-gray-900)] placeholder-[var(--color-gray-400)] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition',
            msgLen > 0 && !msgValid ? 'border-red-300' : 'border-[var(--color-gray-100)]',
          )}
        />
        <p className={cn('text-xs mt-1 text-right', msgLen > 0 && !msgValid ? 'text-red-500' : 'text-[var(--color-gray-400)]')}>
          {msgLen}/1000{msgLen > 0 && msgLen < 20 && ` — ${20 - msgLen} more characters needed`}
        </p>
      </div>

      <button
        type="submit"
        disabled={!formValid}
        className="w-full rounded-full bg-[var(--color-primary)] text-white font-semibold py-3 px-6 text-sm hover:bg-[var(--color-primary-hover)] active:scale-95 transition-all duration-150 shadow-md disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        Send Message →
      </button>
      <p className="text-xs text-center text-[var(--color-gray-400)]">
        This opens your email app with a pre-filled message.
      </p>
    </form>
  );
}
