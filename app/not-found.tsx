import Link from 'next/link';

const POPULAR_LINKS = [
  { label: 'JAMB Mathematics 2023', href: '/past-questions/jamb/mathematics/2023' },
  { label: 'JAMB English 2024',     href: '/past-questions/jamb/english/2024' },
  { label: 'WAEC Biology 2023',     href: '/past-questions/waec/biology/2023' },
  { label: 'WAEC Mathematics 2024', href: '/past-questions/waec/mathematics/2024' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-24">
      <div className="max-w-lg mx-auto text-center">
        <p className="text-7xl font-extrabold text-[var(--color-primary)] mb-4">404</p>
        <h1 className="text-2xl font-extrabold text-[var(--color-gray-900)] mb-3">
          Page not found
        </h1>
        <p className="text-[var(--color-gray-600)] mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may have moved or the URL may be incorrect.
        </p>

        <div className="mb-8">
          <p className="text-sm font-semibold text-[var(--color-gray-400)] uppercase tracking-wide mb-4">
            Popular past questions
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {POPULAR_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm rounded-xl border border-[var(--color-gray-100)] bg-white px-4 py-3 text-[var(--color-gray-700)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors text-left"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="rounded-full bg-[var(--color-primary)] text-white font-semibold px-6 py-3 text-sm hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            Go to Homepage
          </Link>
          <Link
            href="/past-questions"
            className="rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-semibold px-6 py-3 text-sm hover:bg-[var(--color-primary-light)] transition-colors"
          >
            Browse Past Questions
          </Link>
        </div>
      </div>
    </div>
  );
}
