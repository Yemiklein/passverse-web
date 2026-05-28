export default function YearPageLoading() {
  return (
    <div className="pt-24 pb-16 px-4 md:px-8 animate-pulse">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb skeleton */}
        <div className="h-4 w-64 bg-[var(--color-gray-100)] rounded-full mb-6" />

        <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-[var(--color-gray-100)] rounded-full" />
              <div className="h-6 w-12 bg-[var(--color-gray-100)] rounded-full" />
              <div className="h-6 w-20 bg-[var(--color-gray-100)] rounded-full" />
            </div>
            {/* H1 */}
            <div className="h-10 w-3/4 bg-[var(--color-gray-100)] rounded-lg mb-3" />
            <div className="h-5 w-2/3 bg-[var(--color-gray-100)] rounded-lg mb-10" />

            {/* Questions skeleton */}
            <div className="space-y-3 mb-10">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-[var(--color-gray-100)] p-4 flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-[var(--color-gray-100)] flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-[var(--color-gray-100)] rounded w-full" />
                    <div className="h-4 bg-[var(--color-gray-100)] rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            {/* CTA skeleton */}
            <div className="h-28 rounded-2xl bg-[var(--color-gray-100)] mb-10" />
          </div>

          {/* Sidebar skeleton */}
          <div className="hidden lg:block space-y-4">
            <div className="h-40 rounded-xl bg-[var(--color-gray-100)]" />
            <div className="h-48 rounded-xl bg-[var(--color-gray-100)]" />
            <div className="h-36 rounded-xl bg-[var(--color-gray-100)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
