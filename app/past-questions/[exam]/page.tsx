import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXAMS, SUBJECTS, type ExamType } from '@/lib/pastQuestions';
import { Badge } from '@/components/ui/Badge';

type Props = {
  params: Promise<{ exam: string }>;
};

const badgeVariantMap: Record<string, 'primary' | 'teal' | 'amber' | 'coral'> = {
  blue:   'primary',
  teal:   'teal',
  amber:  'amber',
  coral:  'coral',
  purple: 'primary',
};

export async function generateStaticParams() {
  return EXAMS.map((e) => ({ exam: e.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam } = await params;
  const examMeta = EXAMS.find((e) => e.key === exam);
  if (!examMeta) return { title: 'Not Found' };

  return {
    title: `${examMeta.label} Past Questions (${examMeta.yearRange}) | PassVerse`,
    description: `Practice all ${examMeta.label} past questions from ${examMeta.yearRange} with detailed answers and AI explanations. Free on PassVerse app.`,
    keywords: [`${exam} past questions`, `${examMeta.label} past questions with answers`, `${examMeta.label} past questions Nigeria`],
    alternates: {
      canonical: `https://passverse.com.ng/past-questions/${exam}`,
    },
  };
}

export default async function ExamIndexPage({ params }: Props) {
  const { exam } = await params;
  const examMeta = EXAMS.find((e) => e.key === exam);
  if (!examMeta) notFound();

  const examSubjects = SUBJECTS.filter((s) => s.examTypes.includes(exam as ExamType));
  const badgeVariant = badgeVariantMap[examMeta.color] ?? 'primary';
  const isPurple     = examMeta.color === 'purple';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://passverse.com.ng' },
      { '@type': 'ListItem', position: 2, name: 'Past Questions', item: 'https://passverse.com.ng/past-questions' },
      { '@type': 'ListItem', position: 3, name: examMeta.label,   item: `https://passverse.com.ng/past-questions/${exam}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-gray-400)]">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/past-questions" className="hover:text-[var(--color-primary)] transition-colors">Past Questions</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--color-gray-900)]" aria-current="page">{examMeta.label}</li>
            </ol>
          </nav>

          {/* Header */}
          <div className="mb-10">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="text-4xl" aria-hidden="true">{examMeta.icon}</span>
              {isPurple ? (
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800">
                  {examMeta.label}
                </span>
              ) : (
                <Badge variant={badgeVariant}>{examMeta.label}</Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-3">
              {examMeta.label} Past Questions
            </h1>
            <p className="text-[var(--color-gray-600)] text-lg max-w-2xl">
              Practice all {examMeta.fullName} past questions from {examMeta.yearRange} with
              detailed answers and AI explanations on the PassVerse app.
            </p>
          </div>

          {/* Exam info card */}
          <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
            {[
              { label: 'Total Questions', value: examMeta.totalQuestions.toLocaleString() },
              { label: 'Year Range',      value: examMeta.yearRange },
              { label: 'Subjects',        value: String(examSubjects.length) },
            ].map(({ label, value }) => (
              <div key={label} className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-4 text-center">
                <p className="text-xl font-extrabold text-[var(--color-primary)] mb-0.5">{value}</p>
                <p className="text-xs text-[var(--color-gray-400)]">{label}</p>
              </div>
            ))}
          </div>

          {/* Subject grid */}
          <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-5">Choose a Subject</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {examSubjects.map((subject) => (
              <Link
                key={subject.key}
                href={`/past-questions/${exam}/${subject.key}`}
                className="flex items-center gap-3 p-4 rounded-xl border border-[var(--color-gray-100)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-all duration-200 group"
              >
                <span className="text-xl flex-shrink-0" aria-hidden="true">{subject.icon}</span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors leading-snug truncate">
                    {subject.label}
                  </p>
                  <p className="text-xs text-[var(--color-gray-400)] mt-0.5">View questions →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
