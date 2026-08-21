import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  EXAMS,
  SUBJECTS,
  YEARS,
  SAMPLE_QUESTIONS,
  STUDY_TIPS,
  SUBJECT_ABOUT,
  type ExamType,
} from '@/lib/pastQuestions';
import { PRACTICE_QUESTIONS } from '@/data/practiceQuestions';
import { Badge } from '@/components/ui/Badge';
import { QuestionAccordion } from './QuestionAccordion';
import { FAQAccordion } from './FAQAccordion';
import { DownloadButton } from '@/components/past-questions/DownloadButton';

export const revalidate = 86400;

type Props = {
  params: Promise<{ exam: string; subject: string; year: string }>;
};

const badgeVariantMap: Record<string, 'primary' | 'teal' | 'amber' | 'coral'> = {
  blue:   'primary',
  teal:   'teal',
  amber:  'amber',
  coral:  'coral',
  purple: 'primary',
};

export async function generateStaticParams() {
  const topSubjects = ['mathematics', 'english', 'biology', 'physics', 'chemistry', 'economics', 'government', 'commerce'];
  const recentYears = [2025, 2024, 2023, 2022, 2021];
  const allExams    = ['jamb', 'waec', 'gce', 'neco', 'post-utme'];

  const params: { exam: string; subject: string; year: string }[] = [];
  for (const exam of allExams) {
    for (const subject of topSubjects) {
      for (const year of recentYears) {
        params.push({ exam, subject, year: String(year) });
      }
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { exam, subject, year } = await params;
  const examMeta    = EXAMS.find((e) => e.key === exam);
  const subjectMeta = SUBJECTS.find((s) => s.key === subject);

  if (!examMeta || !subjectMeta) return { title: 'Not Found' };

  const title = `${examMeta.label} ${subjectMeta.label} Past Questions ${year} (With Answers) | PassVerse`;
  const description = `Practice ${examMeta.label} ${subjectMeta.label} ${year} past questions with detailed answers and AI explanations. Free on PassVerse app.`;

  return {
    title,
    description,
    keywords: [
      `${exam} ${subject} past questions ${year}`,
      `${exam} ${subject} ${year} answers`,
      `${examMeta.label} ${subjectMeta.label} ${year}`,
      `${examMeta.label} ${year} ${subjectMeta.label} questions`,
      `${subject} past questions Nigeria ${year}`,
      `${exam} past questions ${year}`,
    ],
    alternates: {
      canonical: `https://passverse.com.ng/past-questions/${exam}/${subject}/${year}`,
    },
    openGraph: {
      title: `${examMeta.label} ${subjectMeta.label} Past Questions ${year}`,
      description: `Practice with answers and AI explanations on PassVerse`,
      url: `https://passverse.com.ng/past-questions/${exam}/${subject}/${year}`,
      type: 'website',
    },
  };
}

export default async function YearPage({ params }: Props) {
  const { exam, subject, year } = await params;

  const examMeta    = EXAMS.find((e) => e.key === exam);
  const subjectMeta = SUBJECTS.find((s) => s.key === subject);
  const yearNum     = parseInt(year, 10);

  if (!examMeta || !subjectMeta) notFound();
  if (!subjectMeta.examTypes.includes(exam as ExamType)) notFound();
  if (!YEARS.includes(yearNum)) notFound();

  const examTypeKey = exam.toUpperCase().replace(/-/g, '_');
  const pdfQuestions = PRACTICE_QUESTIONS.filter(
    (q) => q.exam_type === examTypeKey && q.subject === subject && q.year === yearNum,
  );

  const sampleKey       = `${exam}-${subject}`;
  const questions       = SAMPLE_QUESTIONS[sampleKey] ?? [];
  const hasQuestions    = questions.length > 0;
  const studyTips       = STUDY_TIPS[subject] ?? STUDY_TIPS.default;
  const aboutContent    = SUBJECT_ABOUT[subject] ?? SUBJECT_ABOUT.default;
  const badgeVariant    = badgeVariantMap[examMeta.color] ?? 'primary';
  const isPurple        = examMeta.color === 'purple';

  const otherYears      = YEARS.filter((y) => y !== yearNum).slice(0, 5);
  const relatedSubjects = SUBJECTS.filter(
    (s) => s.key !== subject && s.examTypes.includes(exam as ExamType),
  ).slice(0, 4);

  const relatedPages = [
    ...YEARS.filter((y) => y !== yearNum)
      .slice(0, 3)
      .map((y) => ({
        label: `${examMeta.label} ${subjectMeta.label} ${y}`,
        href: `/past-questions/${exam}/${subject}/${y}`,
      })),
    ...SUBJECTS.filter((s) => s.key !== subject && s.examTypes.includes(exam as ExamType))
      .slice(0, 3)
      .map((s) => ({
        label: `${examMeta.label} ${s.label} ${year}`,
        href: `/past-questions/${exam}/${s.key}/${year}`,
      })),
  ];

  const faqs = [
    {
      question: `Are these real ${examMeta.label} past questions?`,
      answer: `Yes — these are authentic past questions from previous ${examMeta.label} examinations, sourced and verified for accuracy.`,
    },
    {
      question: `How many questions are in ${examMeta.label} ${subjectMeta.label}?`,
      answer:
        exam === 'jamb'
          ? `JAMB ${subjectMeta.label} has 40 questions to be answered in 60 minutes (Use of English has 60 questions).`
          : `${examMeta.label} ${subjectMeta.label} typically contains between 40 and 60 multiple-choice questions depending on the year and paper.`,
    },
    {
      question: 'Can I practise offline?',
      answer:
        'Yes — once you have opened a subject in the PassVerse app, the questions are saved to your device for offline practice. No data connection needed.',
    },
    {
      question: 'Is PassVerse free?',
      answer:
        'PassVerse is free with access to the 3 most recent years for every subject. Premium (₦2,000/month) unlocks the full archive from 2001 to 2025 with no restrictions.',
    },
    {
      question: 'How is PassVerse different from other exam prep apps?',
      answer:
        'PassVerse uses AI to explain every answer in plain language, predicts your likely exam score based on performance, and gamifies studying with daily streaks and achievement badges to keep you consistent.',
    },
  ];

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',           item: 'https://passverse.com.ng' },
      { '@type': 'ListItem', position: 2, name: 'Past Questions', item: 'https://passverse.com.ng/past-questions' },
      { '@type': 'ListItem', position: 3, name: examMeta.label,   item: `https://passverse.com.ng/past-questions/${exam}` },
      { '@type': 'ListItem', position: 4, name: subjectMeta.label,item: `https://passverse.com.ng/past-questions/${exam}/${subject}` },
      { '@type': 'ListItem', position: 5, name: year,             item: `https://passverse.com.ng/past-questions/${exam}/${subject}/${year}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
              <li><Link href={`/past-questions/${exam}`} className="hover:text-[var(--color-primary)] transition-colors">{examMeta.label}</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href={`/past-questions/${exam}/${subject}`} className="hover:text-[var(--color-primary)] transition-colors">{subjectMeta.label}</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[var(--color-gray-900)]" aria-current="page">{year}</li>
            </ol>
          </nav>

          <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-12">

            {/* ── LEFT COLUMN ── */}
            <div>
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {isPurple ? (
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide bg-purple-100 text-purple-800"
                      aria-label={`Exam: ${examMeta.label}`}>
                      {examMeta.label}
                    </span>
                  ) : (
                    <Badge variant={badgeVariant} aria-label={`Exam: ${examMeta.label}`}>
                      {examMeta.label}
                    </Badge>
                  )}
                  <Badge variant="primary" aria-label={`Year: ${year}`}>{year}</Badge>
                  <Badge variant="primary" aria-label="40 Questions">40 Questions</Badge>
                  <span className="text-2xl" aria-hidden="true">{subjectMeta.icon}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-gray-900)] mb-3">
                  {examMeta.label} {subjectMeta.label} Past Questions {year}
                </h1>
                <p className="text-[var(--color-gray-600)] text-lg">
                  Practice {examMeta.label} {year} {subjectMeta.label} questions with detailed answers and explanations.
                </p>

                {/* Action buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-5">
                  <DownloadButton
                    questions={pdfQuestions}
                    exam={exam}
                    subject={subject}
                    year={year}
                    examLabel={examMeta.label}
                    subjectLabel={subjectMeta.label}
                  />
                  <Link
                    href="/practice"
                    className="inline-flex items-center gap-2 rounded-full bg-[#f5a623] px-6 py-2.5 text-sm font-semibold text-[#1a1a2e] hover:opacity-90 transition-opacity"
                  >
                    <svg className="h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Practice Interactively
                  </Link>
                </div>
              </div>

              {/* Sample questions */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-4">
                  Sample Questions
                </h2>

                {hasQuestions ? (
                  <QuestionAccordion questions={questions} />
                ) : (
                  <div className="rounded-xl border border-[var(--color-gray-100)] bg-[var(--color-gray-50)] p-8 text-center">
                    <p className="text-4xl mb-3" aria-hidden="true">📱</p>
                    <p className="font-semibold text-[var(--color-gray-900)] mb-1">
                      Practice these questions on the PassVerse app
                    </p>
                    <p className="text-sm text-[var(--color-gray-400)]">
                      Download free to access all {examMeta.label} {subjectMeta.label} questions with AI explanations.
                    </p>
                  </div>
                )}
              </div>

              {/* Mid-page CTA */}
              <div className="rounded-2xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white mb-10">
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-3xl flex-shrink-0" aria-hidden="true">📱</span>
                  <div>
                    <p className="font-extrabold text-lg">
                      Practice all 40 {examMeta.label} {subjectMeta.label} {year} questions on PassVerse
                    </p>
                    <p className="text-blue-100 text-sm mt-1">
                      Get detailed AI explanations for every answer. Free download.
                    </p>
                  </div>
                </div>
                <a
                  href="https://play.google.com/store/apps/details?id=com.passverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-white px-7 py-2.5 font-semibold text-[var(--color-primary)] hover:opacity-90 transition-opacity text-sm"
                >
                  Download PassVerse Free →
                </a>
              </div>

              {/* About section */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-3">
                  About {examMeta.label} {subjectMeta.label} {year}
                </h2>
                <p className="text-[var(--color-gray-600)] leading-relaxed mb-4">
                  {aboutContent.description}
                </p>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-gray-900)] mb-2">Key topics covered:</p>
                  <ul className="grid grid-cols-2 gap-2">
                    {aboutContent.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm text-[var(--color-gray-600)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)] flex-shrink-0" aria-hidden="true" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Study tips */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-[var(--color-gray-900)] mb-4">
                  Study Tips for {examMeta.label} {subjectMeta.label}
                </h2>
                <ul className="space-y-3">
                  {studyTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-gray-600)]">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      {tip}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm text-[var(--color-gray-400)]">
                  More tips in our blog:{' '}
                  <Link
                    href="/blog/how-to-score-300-in-jamb"
                    className="text-[var(--color-primary)] hover:underline"
                  >
                    How to Score 300+ in JAMB →
                  </Link>
                </p>
              </div>

              {/* FAQ section */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[var(--color-gray-900)] mb-6">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={faqs} />
              </div>
            </div>

            {/* ── RIGHT COLUMN (sticky sidebar) ── */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">

                {/* Download CTA */}
                <div className="rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] p-6 text-white">
                  <p className="text-4xl mb-3" aria-hidden="true">📱</p>
                  <h3 className="font-bold text-lg mb-2">Download PassVerse</h3>
                  <p className="text-sm text-blue-100 mb-4">
                    Practice past questions on your phone. 26,000+ questions, free to download.
                  </p>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.passverse"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-full bg-white px-5 py-2.5 text-center text-sm font-semibold text-[var(--color-primary)] hover:opacity-90 transition-opacity"
                  >
                    Download Free →
                  </a>
                </div>

                {/* Other years */}
                <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5">
                  <h3 className="font-bold text-[var(--color-gray-900)] mb-4 text-sm uppercase tracking-wide">
                    Other Years
                  </h3>
                  <ul className="space-y-2">
                    {otherYears.map((y) => (
                      <li key={y}>
                        <Link
                          href={`/past-questions/${exam}/${subject}/${y}`}
                          className="flex items-center justify-between text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors py-1"
                        >
                          <span>{examMeta.label} {subjectMeta.label} {y}</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={`/past-questions/${exam}/${subject}`}
                        className="text-xs text-[var(--color-primary)] hover:underline"
                      >
                        View all years →
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Related subjects */}
                {relatedSubjects.length > 0 && (
                  <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5">
                    <h3 className="font-bold text-[var(--color-gray-900)] mb-4 text-sm uppercase tracking-wide">
                      Related Subjects
                    </h3>
                    <ul className="space-y-2">
                      {relatedSubjects.map((s) => (
                        <li key={s.key}>
                          <Link
                            href={`/past-questions/${exam}/${s.key}/${year}`}
                            className="flex items-center gap-2 text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors py-1"
                          >
                            <span aria-hidden="true">{s.icon}</span>
                            <span>{s.label} {year}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Study resources */}
                <div className="rounded-xl border border-[var(--color-gray-100)] bg-white p-5">
                  <h3 className="font-bold text-[var(--color-gray-900)] mb-4 text-sm uppercase tracking-wide">
                    Study Resources
                  </h3>
                  <ul className="space-y-2">
                    {[
                      { label: 'How to Score 300+ in JAMB', href: '/blog/how-to-score-300-in-jamb' },
                      { label: 'JAMB Mathematics Tips', href: '/blog/jamb-mathematics-past-questions-2020-2024' },
                      { label: 'WAEC Timetable 2025',   href: '/blog/waec-timetable-2025' },
                    ].map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--color-gray-600)] hover:text-[var(--color-primary)] transition-colors"
                        >
                          {link.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          {/* More past questions — full width */}
          {relatedPages.length > 0 && (
            <section className="mt-16 border-t border-[var(--color-gray-100)] pt-12" aria-labelledby="more-pq-heading">
              <h2
                id="more-pq-heading"
                className="text-2xl font-bold text-[var(--color-gray-900)] mb-6"
              >
                More Past Questions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPages.map((page) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className="flex items-center justify-between p-4 rounded-xl border border-[var(--color-gray-100)] bg-white hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-light)] hover:text-[var(--color-primary)] transition-all duration-200 group"
                  >
                    <span className="text-sm font-medium text-[var(--color-gray-900)] group-hover:text-[var(--color-primary)] transition-colors">
                      {page.label}
                    </span>
                    <span className="text-[var(--color-gray-400)] group-hover:text-[var(--color-primary)]" aria-hidden="true">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
