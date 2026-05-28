export default function BlogPostLoading() {
  return (
    <div className="px-4 pt-24 pb-16 md:px-8 animate-pulse">
      <div className="mx-auto max-w-6xl">
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
          <article>
            {/* Breadcrumb */}
            <div className="h-4 w-48 bg-[var(--color-gray-100)] rounded-full mb-6" />
            {/* Badge + meta */}
            <div className="flex gap-3 mb-4">
              <div className="h-6 w-16 rounded-full bg-[var(--color-gray-100)]" />
              <div className="h-6 w-20 rounded-full bg-[var(--color-gray-100)]" />
            </div>
            {/* Title */}
            <div className="h-10 bg-[var(--color-gray-100)] rounded-lg mb-3 w-full" />
            <div className="h-10 bg-[var(--color-gray-100)] rounded-lg mb-6 w-4/5" />
            {/* Cover */}
            <div className="w-28 h-28 rounded-full bg-[var(--color-gray-100)] mb-6" />
            {/* Author */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-[var(--color-gray-100)]" />
              <div className="space-y-1">
                <div className="h-4 w-28 bg-[var(--color-gray-100)] rounded" />
                <div className="h-3 w-20 bg-[var(--color-gray-100)] rounded" />
              </div>
            </div>
            {/* Body paragraphs */}
            <div className="space-y-3">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`h-4 bg-[var(--color-gray-100)] rounded ${i % 4 === 3 ? 'w-2/3' : 'w-full'}`} />
              ))}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="h-44 rounded-xl bg-[var(--color-gray-100)]" />
              <div className="h-52 rounded-xl bg-[var(--color-gray-100)]" />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
