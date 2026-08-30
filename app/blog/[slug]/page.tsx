import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPostBySlug, getRelatedPosts } from '@/lib/blog';
import { Badge } from '@/components/ui/Badge';
import { MDXComponents } from '@/components/mdx/MDXComponents';
import { ScrollProgress } from './ScrollProgress';
import { ShareButtons } from './ShareButtons';

type Props = {
  params: Promise<{ slug: string }>;
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
    month: 'long',
    day: 'numeric',
  });
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontmatter } = getPostBySlug(slug);
    return {
      title: frontmatter.title,
      description: frontmatter.description,
      keywords: frontmatter.keywords,
      alternates: {
        canonical: `https://passverse.com.ng/blog/${slug}`,
      },
      openGraph: {
        title: frontmatter.title,
        description: frontmatter.description,
        url: `https://passverse.com.ng/blog/${slug}`,
        type: 'article',
        publishedTime: frontmatter.date,
        tags: frontmatter.keywords,
        siteName: 'PassVerse',
      },
    };
  } catch {
    return { title: 'Not Found' };
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  const { frontmatter, content } = post;
  const related = getRelatedPosts(slug, frontmatter.category);
  const bgColor = categoryColors[frontmatter.category] ?? 'bg-[var(--color-gray-100)]';
  const badgeVariant = categoryBadgeVariant[frontmatter.category] ?? 'primary';

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter.title,
    description: frontmatter.description,
    datePublished: frontmatter.date,
    author: { '@type': 'Organization', name: 'PassVerse' },
    publisher: {
      '@type': 'Organization',
      name: 'PassVerse',
      url: 'https://passverse.com.ng',
    },
    url: `https://passverse.com.ng/blog/${slug}`,
    keywords: frontmatter.keywords.join(', '),
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://passverse.com.ng' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://passverse.com.ng/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: frontmatter.category,
        item: `https://passverse.com.ng/blog`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: frontmatter.title,
        item: `https://passverse.com.ng/blog/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

      <ScrollProgress />

      {/* Skip to content */}
      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <div className="px-4 pt-24 pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* ── LEFT: main content ── */}
            <article id="article-content">
              {/* Breadcrumb */}
              <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-gray-400)]">
                <ol className="flex flex-wrap items-center gap-1">
                  <li>
                    <Link href="/" className="hover:text-[var(--color-primary)]">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link href="/blog" className="hover:text-[var(--color-primary)]">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li className="text-[var(--color-gray-600)]">{frontmatter.category}</li>
                  <li aria-hidden="true">›</li>
                  <li
                    className="line-clamp-1 text-[var(--color-gray-900)]"
                    aria-current="page"
                  >
                    {frontmatter.title}
                  </li>
                </ol>
              </nav>

              {/* Meta row */}
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <Badge variant={badgeVariant}>{frontmatter.category}</Badge>
                <span className="text-sm text-[var(--color-gray-400)]">
                  {frontmatter.readTime}
                </span>
                <span className="text-sm text-[var(--color-gray-400)]">
                  {formatDate(frontmatter.date)}
                </span>
              </div>

              {/* Title */}
              <h1 className="mb-6 text-3xl font-extrabold leading-tight text-[var(--color-gray-900)] md:text-4xl">
                {frontmatter.title}
              </h1>

              {/* Cover emoji */}
              <div
                className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full text-6xl ${bgColor}`}
                aria-hidden="true"
              >
                {frontmatter.coverEmoji}
              </div>

              {/* Author row */}
              <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-8">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-sm font-bold text-white"
                  aria-hidden="true"
                >
                  PV
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-gray-900)]">
                    PassVerse Team
                  </p>
                  <p className="text-xs text-[var(--color-gray-400)]">
                    {formatDate(frontmatter.date)}
                  </p>
                </div>
              </div>

              {/* MDX content */}
              <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-a:text-[var(--color-primary)] prose-strong:text-[var(--color-gray-900)]">
                <MDXRemote source={content} components={MDXComponents} />
              </div>

              {/* Tags */}
              {frontmatter.keywords.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-6">
                  {frontmatter.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs text-[var(--color-gray-600)]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              )}

              {/* Share buttons */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <ShareButtons title={frontmatter.title} slug={slug} />
              </div>
            </article>

            {/* ── RIGHT: sticky sidebar (desktop only) ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Download CTA */}
                <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white">
                  <div className="mb-3 text-4xl">📱</div>
                  <h3 className="mb-2 font-bold text-lg">Download PassVerse</h3>
                  <p className="mb-4 text-sm text-blue-100">
                    Practice past questions on your phone. 26,675 questions, free to download.
                  </p>
                  <a
                    href="/download"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-[var(--color-primary)] transition-opacity hover:opacity-90"
                  >
                    Download Free →
                  </a>
                </div>

                {/* Related posts */}
                {related.length > 0 && (
                  <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-4 font-bold text-[var(--color-gray-900)]">Related Posts</h3>
                    <ul className="space-y-4">
                      {related.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/blog/${p.slug}`}
                            className="flex items-start gap-3 group"
                          >
                            <span className="mt-0.5 text-2xl" aria-hidden="true">
                              {p.coverEmoji}
                            </span>
                            <div>
                              <p className="text-sm font-medium text-[var(--color-gray-900)] leading-snug group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                                {p.title}
                              </p>
                              <p className="mt-1 text-xs text-[var(--color-gray-400)]">
                                {p.readTime}
                              </p>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Categories */}
                <div className="rounded-xl border border-gray-100 bg-white p-6">
                  <h3 className="mb-4 font-bold text-[var(--color-gray-900)]">Categories</h3>
                  <ul className="space-y-2">
                    {[
                      { name: 'JAMB', href: '/blog' },
                      { name: 'WAEC', href: '/blog' },
                      { name: 'Study Tips', href: '/blog' },
                      { name: 'GCE', href: '/blog' },
                    ].map((cat) => (
                      <li key={cat.name}>
                        <Link
                          href={cat.href}
                          className="flex items-center justify-between text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* More articles — full width */}
          {related.length > 0 && (
            <section className="mt-16 border-t border-gray-100 pt-12" aria-labelledby="more-heading">
              <h2
                id="more-heading"
                className="mb-6 text-2xl font-bold text-[var(--color-gray-900)]"
              >
                More Articles
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => {
                  const relBg = categoryColors[p.category] ?? 'bg-[var(--color-gray-100)]';
                  const relBadge = categoryBadgeVariant[p.category] ?? 'primary';
                  return (
                    <Link
                      key={p.slug}
                      href={`/blog/${p.slug}`}
                      className="group flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                    >
                      <div
                        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full text-2xl ${relBg}`}
                        aria-hidden="true"
                      >
                        {p.coverEmoji}
                      </div>
                      <Badge variant={relBadge} className="mb-2 self-start">
                        {p.category}
                      </Badge>
                      <h3 className="mb-1 line-clamp-2 font-bold text-sm text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-auto text-xs text-[var(--color-gray-400)]">{p.readTime}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
