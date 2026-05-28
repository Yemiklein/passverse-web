'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-md mx-auto text-center">
        <p className="text-5xl mb-4" aria-hidden="true">⚠️</p>
        <h1 className="text-2xl font-extrabold text-[var(--color-gray-900)] mb-3">
          Something went wrong
        </h1>
        <p className="text-[var(--color-gray-600)] mb-8">
          An unexpected error occurred. Please try again — if the problem persists, contact{' '}
          <a href="mailto:support@passverse.com.ng" className="text-[var(--color-primary)] hover:underline">
            support@passverse.com.ng
          </a>
          .
        </p>
        <button
          onClick={unstable_retry}
          className="rounded-full bg-[var(--color-primary)] text-white font-semibold px-6 py-3 text-sm hover:bg-[var(--color-primary-hover)] transition-colors active:scale-95"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
