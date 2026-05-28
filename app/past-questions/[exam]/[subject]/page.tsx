import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EXAMS, SUBJECTS, YEARS, type ExamType } from '@/lib/pastQuestions';
import { Badge } from '@/components/ui/Badge';

type Props = {
  params: Promise<{ exam: string; subject: string }>;
};

const badgeVariantMap: Record<string, 'primary' | 'teal' | 'amber' | 'coral'> = {
  blue:   'primary',
  teal:   'teal',
  amber:  'amber',
  coral:  'coral',
  purple: 'primary',
};

export async function generateStaticParams() {
  const params: { exam: string; subject: string }[] = [];
  for (const exam of EXAMS) {
    for (const subject of SUBJECTS) {
      if (subject.examTypes.includes(exam.key)) {
        params.push({ exam: exam.key, subject: subject.key });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, subject } = await params;
  const examMeta   = EXAMS.find((e) => e.key === exam);
  const subjectMeta = SUBJECTS.find((s) => s.key === subject);

  if (!examMeta || !subjectMeta) return { title: 'Not Found' };

  const title       = `${examMeta.label} ${subjectMeta.label} Past Questions (2001-2025) | PassVerse`;
  const description = `Practice all ${examMeta.label} ${subjectMeta.label} past questions from 2001 to 2025. Detailed answers, AI explanations. Free on PassVerse app.`;

  return {
    title,
    description,
    keywords: [
      `${exam} ${subject} past questions`,
      `${examMeta.label} ${subjectMeta.label} past questions`,
      `${examMeta.label} ${subjectMeta.label} past questions with answers`,
      `${subject} past questions Nigeria`,
      `${examMeta.label} past questions`,
    ],
    alternates: {
      canonical: `https://passverse.com.ng/past-questions/${exam}/${subject}`,
    },
    openGraph: {
      title,
      description,
      url: `https://passverse.com.ng/past-questions/${exam}/${subject}`,
      type: 'website',
    },
  };
}

export default async function SubjectPage({ params }: Props) {
  const { exam, subject } = await params;

  const examMeta   = EXAMS.find((e) => e.key === exam);
  const subjectMeta = SUBJECTS.find((s) => s.key === subject);

  if (!examMeta || !subjectMeta) notFound();
  if (!subjectMeta.examTypes.includes(exam as ExamType)) notFound();

  const otherSubjects = SUBJECTS.filter(
    (s) => s.key !== subject && s.examTypes.includes(exam as ExamType),
  ).slice(0, 8);

  const badgeVariant = badgeVariantMap[examMeta.color] ?? 'primary';
  const isPurple     = examMeta.color === 'purple';

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://passverse.com.ng' },
      { '@type': 'ListItem', position: 2, name: 'Past Questions', item: 'https://passverse.com.ng/past-questions' },
      { '@type': 'ListItem', position: 3, name: examMeta.label,   item: `https://passverse.com.ng/past-questions/${exam}` },
      { '@type': 'ListItem', position: 4, name: subjectMeta.label,item: `https://passverse.com.ng/past-questions/${exam}/${subject}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-[var(--color-gray-400)]">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link href="/" className="hover:text-[var(--color-primary)] transition-colors">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/past-questions" className="hover:text-[var(--color-primary)] transition-colors">Past Questions</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`/past-questions/${exam}`} className="hover:text-[var(--color-primary)] transition-colors">{examMeta.label}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--color-gray-900)]" aria-current="page">{subjectMeta.label}</li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
            {/* Main content */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {isPurple ? (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-purple-100 text-purple-800">
                      {examMeta.label}
                    </span>
                  ) : (
                    <Badge variant={badgeVariant} aria-label={`Exam: ${examMeta.label}`}>
                      {examMeta.label}
                    </Badge>
                  )}
                  <span className="text-2xl" aria-hidden="true">{subjectMeta.icon}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-3">
                  {examMeta.label} {subjectMeta.label} Past Questions
                </h1>
                <p className="text-[var(--color-gray-600)] text-lg max-w-2xl">
                  Practice {examMeta.label} {subjectMeta.label} questions from{' '}
                  {examMeta.yearRange} with detailed answers and AI explanations on the PassVerse app.
                </p>
              </div>

              {/* Year grid */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-5">
                  Select a Year
                </h2>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {YEARS.map((year) => {
                    const isPopular = year >= 2020;
                    return (
                      <Link
                        key={year}
                        href={`/past-questions/${exam}/${subject}/${year}`}
                        className="relative flex flex-col items-center justify-center p-4 rounded-xl border border-[var(--color-gray-100)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-all duration-200 group"
                      >
                        {isPopular && (
                          <span
                            className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
                            aria-label="Popular year"
                          >
                            HOT
                          </span>
                        )}
                        <span className="text-lg font-extrabold text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors">
                          {year}
                        </span>
                        <span className="text-xs text-[var(--color-gray-400)] group-hover:text-[var(--color-primary)]/70 mt-0.5">
                          Questions
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* App download CTA */}
              <div className="rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <span className="text-4xl flex-shrink-0" aria-hidden="true">📱</span>
                  <div className="flex-1">
                    <p className="font-bold text-lg">
                      Practice all {subjectMeta.label} questions on PassVerse
                    </p>
                    <p className="text-blue-100 text-sm mt-1">
                      AI explanations for every answer. Study offline. Free to download.
                    </p>
                  </div>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.passverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-[var(--color-primary)] hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Download Free →
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Exam info card */}
                <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">{examMeta.icon}</span>
                    <div>
                      <p className="font-bold text-[var(--color-gray-900)]">{examMeta.label}</p>
                      <p className="text-xs text-[var(--color-gray-400)]">{examMeta.yearRange}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-gray-600)]">{examMeta.fullName}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--color-primary)]">
                    {examMeta.totalQuestions.toLocaleString()} total questions
                  </p>
                </div>

                {/* Related subjects */}
                {otherSubjects.length > 0 && (
                  <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5">
                    <h3 className="font-bold text-[var(--color-gray-900)] mb-4 text-sm uppercase tracking-wide">
                      Other {examMeta.label} Subjects
                    </h3>
                    <ul className="space-y-2">
                      {otherSubjects.map((s) => (
                        <li key={s.key}>
                          <Link
                            href={`/past-questions/${exam}/${s.key}`}
                            className="flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                          >
                            <span aria-hidden="true">{s.icon}</span>
                            <span>{s.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
