'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/Badge';
import type { BlogPost } from '@/lib/blog';

const CATEGORIES = ['All', 'JAMB', 'WAEC', 'Study Tips', 'GCE', 'News'] as const;

const categoryColors: Record<string, string> = {
  JAMB: 'bg-[var(--color-primary-light)]',
  WAEC: 'bg-[var(--color-teal-light)]',
  'Study Tips': 'bg-[var(--color-amber-light)]',
  GCE: 'bg-[var(--color-coral-light)]',
  News: 'bg-[var(--color-gray-100)]',
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

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const bgColor = categoryColors[post.category] ?? 'bg-[var(--color-gray-100)]';
  const badgeVariant = categoryBadgeVariant[post.category] ?? 'primary';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
    >
      <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1 p-6">
        {/* Cover emoji circle */}
        <div
          className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl ${bgColor}`}
          aria-hidden="true"
        >
          {post.coverEmoji}
        </div>

        <Badge variant={badgeVariant} className="mb-3 self-start">
          {post.category}
        </Badge>

        <h3 className="mb-2 line-clamp-2 font-bold text-[var(--color-gray-900)] leading-snug group-hover:text-[var(--color-primary)] transition-colors">
          {post.title}
        </h3>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-[var(--color-gray-600)]">
          {post.description}
        </p>

        <div className="flex items-center justify-between text-xs text-[var(--color-gray-400)]">
          <span>{post.readTime}</span>
          <span>{formatDate(post.date)}</span>
          <span className="font-medium text-[var(--color-primary)]">Read more →</span>
        </div>
      </Link>
    </motion.article>
  );
}

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filtered =
    activeCategory === 'All' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Category filter */}
      <div
        role="tablist"
        aria-label="Filter posts by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              role="tab"
              aria-selected={isActive}
              aria-label={`Filter by ${cat}`}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                    : 'bg-gray-100 text-[var(--color-gray-600)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary-dark)]'
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Posts grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post, i) => (
          <PostCard key={post.slug} post={post} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-[var(--color-gray-400)]">
          No articles in this category yet. Check back soon.
        </p>
      )}
    </>
  );
}
