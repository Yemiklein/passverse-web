import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, getFeaturedPosts } from '@/lib/blog';
import { Badge } from '@/components/ui/Badge';
import { BlogClient } from './BlogClient';
import type { BlogPost } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog — JAMB, WAEC Study Tips & Past Questions | PassVerse',
  description:
    'Study tips, past questions guides, and exam preparation articles for Nigerian students. JAMB, WAEC, GCE and Post-UTME resources.',
  openGraph: {
    title: 'Blog — JAMB, WAEC Study Tips & Past Questions | PassVerse',
    description:
      'Study tips, past questions guides, and exam preparation articles for Nigerian students.',
    url: 'https://passverse.com.ng/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://passverse.com.ng/blog',
  },
};

const categoryColors: Record<string, string> = {
  JAMB: 'bg-[var(--color-primary-light)]',
  WAEC: 'bg-[var(--color-teal-light)]',
  'Study Tips': 'bg-[var(--color-amber-light)]',
  GCE: 'bg-[var(--color-coral-light)]',
  General: 'bg-[var(--color-gray-100)]',
};

const categoryBadgeVariant: Record<string, 'primary' | 'teal' | 'amber' | 'coral'> = {
  JAMB: 'primary',
  WAEC: 'teal',
  'Study Tips': 'amber',
  GCE: 'coral',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function FeaturedCard({ post }: { post: BlogPost }) {
  const bgColor = categoryColors[post.category] ?? 'bg-[var(--color-gray-100)]';
  const badgeVariant = categoryBadgeVariant[post.category] ?? 'primary';

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className={`mb-4 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${bgColor}`}
        aria-hidden="true"
      >
        {post.coverEmoji}
      </div>

      <Badge variant={badgeVariant} className="mb-3 self-start">
        {post.category}
      </Badge>

      <h3 className="mb-2 line-clamp-2 text-lg font-bold text-[var(--color-gray-900)] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
        {post.title}
      </h3>

      <p className="mb-4 line-clamp-3 flex-1 text-sm text-[var(--color-gray-600)]">
        {post.description}
      </p>

      <div className="flex items-center gap-3 text-xs text-[var(--color-gray-400)]">
        <span>{post.readTime}</span>
        <span>·</span>
        <span>{formatDate(post.date)}</span>
      </div>
    </Link>
  );
}

export default async function BlogPage() {
  const [featured, all] = await Promise.all([getFeaturedPosts(), getAllPosts()]);

  return (
    <main id="main-content">
      {/* Page header */}
      <div className="bg-white px-4 pt-28 pb-12 md:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, var(--color-gray-100) 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl text-center">
          <h1 className="mb-4 text-4xl font-extrabold text-[var(--color-gray-900)] md:text-5xl">
            PassVerse Blog
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[var(--color-gray-600)]">
            Study tips, past questions, and exam guides for Nigerian students preparing for JAMB,
            WAEC, GCE and Post-UTME.
          </p>
        </div>
      </div>

      <div className="px-4 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Featured posts */}
          {featured.length > 0 && (
            <section className="mb-16" aria-labelledby="featured-heading">
              <h2
                id="featured-heading"
                className="mb-6 text-2xl font-bold text-[var(--color-gray-900)]"
              >
                Featured Posts
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {featured.map((post) => (
                  <FeaturedCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}

          {/* All posts with category filter */}
          <section aria-labelledby="all-posts-heading">
            <h2
              id="all-posts-heading"
              className="mb-6 text-2xl font-bold text-[var(--color-gray-900)]"
            >
              All Articles
            </h2>
            <BlogClient posts={all} />
          </section>
        </div>
      </div>
    </main>
  );
}
